import "server-only";

import crypto from "node:crypto";

export interface SendMessagePayload {
  to: string;
  message?: string;
  type?: "text" | "image" | "video" | "audio" | "document" | string;
  mediaUrl?: string;
  sessionId?: string;
  fileName?: string;
  delayMs?: number;
}

export interface SendBulkRecipient {
  to: string;
  name?: string;
  variables?: Record<string, string>;
}

export interface SendBulkPayload {
  recipients: SendBulkRecipient[];
  message: string;
  sessionId?: string;
  delayBetweenMessagesMs?: number;
}

export interface WhatsAppApiResponse<T = unknown> {
  success: boolean;
  messageId?: string;
  batchId?: string;
  status?: string;
  to?: string;
  timestamp?: string;
  sessionId?: string;
  data?: T;
  error?: string;
  message?: string;
  sessions?: unknown[];
  session?: unknown;
  templates?: unknown[];
  contacts?: unknown[];
  webhooks?: unknown[];
}

export interface WhatsAppSession {
  sessionId: string;
  name?: string;
  status: "CONNECTED" | "DISCONNECTED" | "CONNECTING" | "SCAN_QR" | string;
  isConnected: boolean;
  phone?: string | null;
  provider?: string;
  messagesCount?: number;
  contactsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export class WhatsAppApiError extends Error {
  public status: number;
  public errorCode?: string;
  public details?: unknown;

  constructor(message: string, status: number, errorCode?: string, details?: unknown) {
    super(message);
    this.name = "WhatsAppApiError";
    this.status = status;
    this.errorCode = errorCode;
    this.details = details;
  }
}

const DEFAULT_BASE_URL = "https://whatsapp-new-panel.vercel.app/api/v1";
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1_000;
const MAX_RETRY_DELAY_MS = 10_000;

export class WhatsAppApiClient {
  private baseURL: string;
  private token: string;
  private defaultSessionId?: string;

  constructor(options?: { baseURL?: string; token?: string; defaultSessionId?: string }) {
    this.baseURL = (
      options?.baseURL ||
      process.env.WHATSAPP_API_BASE_URL ||
      DEFAULT_BASE_URL
    ).replace(/\/+$/, "");

    const token = options?.token || process.env.WHATSAPP_API_TOKEN;
    if (!token) {
      throw new Error(
        "[WhatsAppApiClient] WHATSAPP_API_TOKEN is required in server environment variables."
      );
    }
    this.token = token;
    this.defaultSessionId = options?.defaultSessionId || process.env.WHATSAPP_SESSION_ID;
  }

  /**
   * Safe headers factory. Sends Authorization header, x-api-key, and optional Idempotency-Key.
   * Authorization secrets are NEVER logged.
   */
  private buildHeaders(idempotencyKey?: string): Headers {
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${this.token}`);
    headers.set("x-api-key", this.token);
    headers.set("Content-Type", "application/json");
    if (idempotencyKey) {
      headers.set("Idempotency-Key", idempotencyKey);
    }
    return headers;
  }

  private calculateDelay(attempt: number): number {
    const expDelay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt);
    // Bounded with +/- 20% jitter
    const jitter = expDelay * (Math.random() * 0.4 - 0.2);
    return Math.min(MAX_RETRY_DELAY_MS, Math.round(expDelay + jitter));
  }

  private isRetryable(status: number): boolean {
    return status === 429 || status === 502 || status === 503 || status === 504;
  }

  /**
   * Internal HTTP execution with timeout, exponential backoff, and idempotency protection.
   */
  private async request<T = unknown>(
    endpoint: string,
    options: {
      method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
      body?: unknown;
      idempotencyKey?: string;
    }
  ): Promise<WhatsAppApiResponse<T>> {
    const url = `${this.baseURL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    let attempt = 0;

    while (attempt <= MAX_RETRIES) {
      const startTime = Date.now();
      const headers = this.buildHeaders(options.idempotencyKey);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        const response = await fetch(url, {
          method: options.method,
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: controller.signal,
          cache: "no-store",
        });

        clearTimeout(timeoutId);
        const latencyMs = Date.now() - startTime;

        let payload: Record<string, unknown> = {};
        const rawText = await response.text();
        if (rawText) {
          try {
            payload = JSON.parse(rawText);
          } catch {
            payload = { raw: rawText };
          }
        }

        const isSuccess = response.ok && payload.success !== false;

        // Structured sanitary logging (never log credentials or sensitive PII)
        console.log(
          `[WhatsAppApiClient] ${options.method} ${endpoint} -> ${response.status} (${latencyMs}ms)`
        );

        if (isSuccess) {
          return payload as unknown as WhatsAppApiResponse<T>;
        }

        const errorCode =
          (payload.error as string) ||
          (payload.code as string) ||
          `HTTP_${response.status}`;
        const errorMessage =
          (payload.message as string) ||
          (typeof payload.error === "string" ? payload.error : "") ||
          `WhatsApp API error (${response.status})`;

        if (this.isRetryable(response.status) && attempt < MAX_RETRIES) {
          attempt++;
          const waitTime = this.calculateDelay(attempt);
          console.warn(
            `[WhatsAppApiClient] Retryable error ${response.status} (${errorCode}). Retrying attempt ${attempt}/${MAX_RETRIES} in ${waitTime}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }

        throw new WhatsAppApiError(
          errorMessage,
          response.status,
          errorCode,
          payload
        );
      } catch (err: unknown) {
        if (err instanceof WhatsAppApiError) throw err;

        const isAbort =
          err &&
          typeof err === "object" &&
          ("name" in err && (err as { name: string }).name === "AbortError");

        if (attempt < MAX_RETRIES) {
          attempt++;
          const waitTime = this.calculateDelay(attempt);
          console.warn(
            `[WhatsAppApiClient] Network/Timeout error (${isAbort ? "Request timed out after 20s" : "Network error"}). Retrying attempt ${attempt}/${MAX_RETRIES} in ${waitTime}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }

        throw new WhatsAppApiError(
          isAbort
            ? "WhatsApp API request timed out after 20 seconds."
            : (err as Error)?.message || "Failed to communicate with WhatsApp Gateway.",
          isAbort ? 408 : 500
        );
      }
    }

    throw new WhatsAppApiError("Max retry attempts reached for WhatsApp Gateway request.", 504);
  }

  /**
   * Normalizes recipient phone number to digits-only string with country code.
   * e.g., "+91 80808 52689" -> "918080852689"
   * e.g., "8080852689" (10-digit Indian) -> "918080852689"
   */
  public static normalizePhone(phone: string, defaultCountryPrefix = "91"): string {
    const cleaned = phone.replace(/[^\d]/g, "");
    if (!cleaned) return "";

    // 10 digits assumed local (default to Indian prefix 91 if matching)
    if (cleaned.length === 10) {
      return `${defaultCountryPrefix}${cleaned}`;
    }
    // 11 digits starting with 0
    if (cleaned.length === 11 && cleaned.startsWith("0")) {
      return `${defaultCountryPrefix}${cleaned.slice(1)}`;
    }
    return cleaned;
  }

  /**
   * Generates a unique idempotency key for requests.
   */
  public static generateIdempotencyKey(prefix = "req"): string {
    return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
  }

  /**
   * Dispatches a single WhatsApp message. Supports text, image, document, etc.
   */
  public async sendMessage(
    payload: SendMessagePayload,
    idempotencyKey?: string
  ): Promise<WhatsAppApiResponse> {
    const to = WhatsAppApiClient.normalizePhone(payload.to);
    if (!to) {
      throw new WhatsAppApiError("A valid recipient phone number is required.", 400, "VALIDATION_ERROR");
    }

    const key = idempotencyKey || WhatsAppApiClient.generateIdempotencyKey("msg");
    const body: SendMessagePayload = {
      ...payload,
      to,
      sessionId: payload.sessionId || this.defaultSessionId,
    };

    return this.request("/send", {
      method: "POST",
      body,
      idempotencyKey: key,
    });
  }

  /**
   * Dispatches bulk messages with anti-ban delay protection.
   */
  public async sendBulk(
    payload: SendBulkPayload,
    idempotencyKey?: string
  ): Promise<WhatsAppApiResponse> {
    const key = idempotencyKey || WhatsAppApiClient.generateIdempotencyKey("bulk");
    const sanitizedRecipients = payload.recipients.map((r) => ({
      ...r,
      to: WhatsAppApiClient.normalizePhone(r.to),
    }));

    const body: SendBulkPayload = {
      ...payload,
      recipients: sanitizedRecipients,
      sessionId: payload.sessionId || this.defaultSessionId,
    };

    return this.request("/send-bulk", {
      method: "POST",
      body,
      idempotencyKey: key,
    });
  }

  /**
   * Queries connected WhatsApp sessions and connection status.
   */
  public async getSessions(): Promise<WhatsAppApiResponse<{ sessions: WhatsAppSession[] }>> {
    return this.request("/sessions", { method: "GET" });
  }

  /**
   * Inspects metadata for a single session.
   */
  public async getSession(sessionId: string): Promise<WhatsAppApiResponse<{ session: WhatsAppSession }>> {
    return this.request(`/sessions/${encodeURIComponent(sessionId)}`, { method: "GET" });
  }

  /**
   * Queries gateway operational status.
   */
  public async getStatus(): Promise<WhatsAppApiResponse> {
    return this.request("/status", { method: "GET" });
  }

  /**
   * Lists message templates.
   */
  public async getTemplates(): Promise<WhatsAppApiResponse> {
    return this.request("/templates", { method: "GET" });
  }

  /**
   * Creates a reusable message template.
   */
  public async createTemplate(payload: {
    name: string;
    content: string;
    category?: "TRANSACTIONAL" | "MARKETING" | "SUPPORT" | string;
    sessionId?: string;
  }): Promise<WhatsAppApiResponse> {
    return this.request("/templates", {
      method: "POST",
      body: {
        ...payload,
        sessionId: payload.sessionId || this.defaultSessionId,
      },
    });
  }

  /**
   * Queries contacts synchronized for a session.
   */
  public async getContacts(sessionId?: string): Promise<WhatsAppApiResponse> {
    const targetSession = sessionId || this.defaultSessionId;
    if (!targetSession) {
      throw new WhatsAppApiError("Session ID is required to fetch contacts.", 400);
    }
    return this.request(`/contacts/${encodeURIComponent(targetSession)}`, {
      method: "GET",
    });
  }

  /**
   * Lists registered webhooks.
   */
  public async getWebhooks(): Promise<WhatsAppApiResponse> {
    return this.request("/webhooks", { method: "GET" });
  }

  /**
   * Registers a webhook callback URL.
   */
  public async registerWebhook(payload: {
    url: string;
    events?: string[];
    secret?: string;
  }): Promise<WhatsAppApiResponse> {
    return this.request("/webhooks", {
      method: "POST",
      body: payload,
    });
  }
}

// Global cached client instance helper
let cachedClient: WhatsAppApiClient | null = null;

export function getWhatsAppClient(): WhatsAppApiClient | null {
  if (!process.env.WHATSAPP_API_TOKEN) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = new WhatsAppApiClient();
  }
  return cachedClient;
}
