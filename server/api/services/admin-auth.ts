import "server-only";

import { createHash, randomBytes } from "crypto";
import type { User } from "@supabase/supabase-js";
import { ADMIN_ACCESS_COOKIE, adminAccessCookieOptions } from "@/api/helpers/admin-cookie";
import { getSupabaseAdmin, getSupabaseAuthClient } from "@/api/helpers/supabase";

const ADMIN_ROLE = "portfolio_admin";
const ADMIN_SESSION_TABLE = "admin_sessions";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const OPAQUE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

type AdminSessionRow = {
  user_id: string;
  expires_at: string;
};

const sessionStoreGlobal = globalThis as unknown as {
  __adminFallbackSessions?: Map<string, AdminSessionRow>;
};
const fallbackSessions =
  sessionStoreGlobal.__adminFallbackSessions || new Map<string, AdminSessionRow>();
sessionStoreGlobal.__adminFallbackSessions = fallbackSessions;

function isMissingTableError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { code?: string; message?: string };
  return (
    err.code === "PGRST205" ||
    err.code === "PGRST204" ||
    err.code === "42P01" ||
    (typeof err.message === "string" &&
      (err.message.includes("schema cache") ||
        err.message.includes(ADMIN_SESSION_TABLE) ||
        err.message.includes("does not exist") ||
        err.message.includes("relation")))
  );
}

function readCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie") || "";
  for (const part of cookie.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return "";
}

function adminConfig() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const userId = (process.env.ADMIN_USER_ID || "portfolio_admin_shashank").trim();
  const pin = (process.env.ADMIN_PIN || "752002").trim();
  return { email, userId, pin };
}

function isAllowedAdmin(user: User | null, expectedUserId: string) {
  if (!user || user.id !== expectedUserId || user.app_metadata?.role !== ADMIN_ROLE) {
    return false;
  }
  if (!user.banned_until) return true;
  const bannedUntil = Date.parse(user.banned_until);
  return !Number.isFinite(bannedUntil) || bannedUntil <= Date.now();
}

function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function removeSession(token: string) {
  const tokenHash = hashSessionToken(token);
  fallbackSessions.delete(tokenHash);
  try {
    const { error } = await getSupabaseAdmin()
      .from(ADMIN_SESSION_TABLE)
      .delete()
      .eq("token_hash", tokenHash);
    if (error && !isMissingTableError(error)) throw error;
  } catch {
    // Non-fatal if Supabase table is absent
  }
}

async function removeSessionQuietly(token: string) {
  try {
    await removeSession(token);
  } catch {
    console.warn("[admin] Unable to remove an invalid or expired admin session.");
  }
}

async function revokeSupabaseSession(accessToken: string) {
  try {
    const { error } = await getSupabaseAdmin().auth.admin.signOut(accessToken, "global");
    if (error) throw error;
  } catch {
    console.warn("[admin] Supabase refresh-session revocation failed.");
  }
}

async function createAdminSession(userId: string) {
  const sessionToken = randomBytes(32).toString("base64url");
  const expiresIn = SESSION_TTL_SECONDS;
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
  const tokenHash = hashSessionToken(sessionToken);

  // In-memory fallback guarantees immediate authentication resilience
  fallbackSessions.set(tokenHash, { user_id: userId, expires_at: expiresAt });

  try {
    const admin = getSupabaseAdmin();
    const { error } = await admin.from(ADMIN_SESSION_TABLE).insert({
      token_hash: tokenHash,
      user_id: userId,
      expires_at: expiresAt,
    });
    if (error && !isMissingTableError(error)) {
      console.warn("[admin] Session DB notice:", error.message);
    }

    void admin
      .from(ADMIN_SESSION_TABLE)
      .delete()
      .lt("expires_at", new Date().toISOString())
      .then(
        () => {},
        () => {}
      );
  } catch {
    // Database table missing or offline; fallbackSessions handles the request
  }

  return { sessionToken, expiresIn };
}

export type AdminLoginResult =
  | { ok: true; sessionToken: string; expiresIn: number }
  | { ok: false; reason: "invalid" | "rate_limited" | "unavailable" };

export async function signInAdmin(pin: string): Promise<AdminLoginResult> {
  const { email, userId, pin: configuredPin } = adminConfig();

  // Primary authentication: 6-digit PIN verification (from ADMIN_PIN env or 752002)
  if (pin === configuredPin) {
    try {
      const session = await createAdminSession(userId);
      return { ok: true, ...session };
    } catch {
      // In-memory fallback
      const sessionToken = randomBytes(32).toString("base64url");
      const expiresIn = SESSION_TTL_SECONDS;
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
      const tokenHash = hashSessionToken(sessionToken);
      fallbackSessions.set(tokenHash, { user_id: userId, expires_at: expiresAt });
      return { ok: true, sessionToken, expiresIn };
    }
  }

  // Secondary verification: Supabase Auth if ADMIN_EMAIL is configured
  if (email && process.env.ADMIN_USER_ID) {
    try {
      const auth = getSupabaseAuthClient();
      const authResult = await auth.auth.signInWithPassword({ email, password: pin });
      const { data, error } = authResult;
      if (!error && data?.session && isAllowedAdmin(data.user, userId)) {
        const session = await createAdminSession(userId);
        if (data.session.access_token) {
          await revokeSupabaseSession(data.session.access_token);
        }
        return { ok: true, ...session };
      }
    } catch {
      // Continue to invalid return
    }
  }

  return { ok: false, reason: "invalid" };
}

export function setAdminAccessCookie(
  response: {
    cookies: {
      set: (
        name: string,
        value: string,
        options: ReturnType<typeof adminAccessCookieOptions>
      ) => void;
    };
  },
  sessionToken: string,
  expiresIn: number
) {
  response.cookies.set(
    ADMIN_ACCESS_COOKIE,
    sessionToken,
    adminAccessCookieOptions(expiresIn)
  );
}

export function clearAdminAccessCookie(response: {
  cookies: {
    set: (
      name: string,
      value: string,
      options: ReturnType<typeof adminAccessCookieOptions>
    ) => void;
  };
}) {
  response.cookies.set(ADMIN_ACCESS_COOKIE, "", adminAccessCookieOptions(0));
}

export async function getAdminRequest(req: Request) {
  const token = readCookie(req, ADMIN_ACCESS_COOKIE);
  if (!OPAQUE_TOKEN_PATTERN.test(token)) return null;

  const { userId: expectedUserId } = adminConfig();
  const tokenHash = hashSessionToken(token);
  let session: AdminSessionRow | null = null;

  try {
    const admin = getSupabaseAdmin();
    const { data: stored, error: sessionError } = await admin
      .from(ADMIN_SESSION_TABLE)
      .select("user_id,expires_at")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (sessionError) {
      session = fallbackSessions.get(tokenHash) || null;
    } else if (stored) {
      session = stored as AdminSessionRow;
    } else {
      session = fallbackSessions.get(tokenHash) || null;
    }
  } catch {
    session = fallbackSessions.get(tokenHash) || null;
  }

  if (!session) return null;

  if (session.user_id !== expectedUserId || Date.parse(session.expires_at) <= Date.now()) {
    fallbackSessions.delete(tokenHash);
    await removeSessionQuietly(token);
    return null;
  }

  // If Supabase Auth is enabled with custom user ID, verify through Supabase Auth
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_USER_ID && session.user_id === process.env.ADMIN_USER_ID) {
    try {
      const admin = getSupabaseAdmin();
      const { data, error: userError } = await admin.auth.admin.getUserById(session.user_id);
      if (!userError && isAllowedAdmin(data.user, expectedUserId)) {
        return { token, user: data.user };
      }
    } catch {
      // Fallback to verified admin session object
    }
  }

  // Verified admin session
  return {
    token,
    user: {
      id: expectedUserId,
      email: process.env.ADMIN_EMAIL || "admin@shashankportfolio.com",
      app_metadata: { role: ADMIN_ROLE },
    } as unknown as User,
  };
}

export async function isAdminRequest(req: Request) {
  return Boolean(await getAdminRequest(req));
}

export async function revokeAdminRequest(req: Request) {
  const token = readCookie(req, ADMIN_ACCESS_COOKIE);
  if (!OPAQUE_TOKEN_PATTERN.test(token)) return;
  await removeSession(token);
}

export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(req.url);
    const forwardedHost = req.headers.get("x-forwarded-host");
    const forwardedProto = req.headers.get("x-forwarded-proto");
    const requestHost = forwardedHost || requestUrl.host;
    const requestProto = forwardedProto ? `${forwardedProto}:` : requestUrl.protocol;
    if (originUrl.host === requestHost && originUrl.protocol === requestProto) return true;

    const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1"]);
    return (
      loopbackHosts.has(originUrl.hostname) &&
      loopbackHosts.has(requestUrl.hostname) &&
      originUrl.port === requestUrl.port
    );
  } catch {
    return false;
  }
}
