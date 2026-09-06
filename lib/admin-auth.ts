import "server-only";

import { createHash, randomBytes } from "crypto";
import type { User } from "@supabase/supabase-js";
import { ADMIN_ACCESS_COOKIE, adminAccessCookieOptions } from "@/lib/admin-cookie";
import { getSupabaseAdmin, getSupabaseAuthClient } from "@/lib/supabase";

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
    (typeof err.message === "string" &&
      (err.message.includes("schema cache") || err.message.includes(ADMIN_SESSION_TABLE)))
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
  const userId = (process.env.ADMIN_USER_ID || "").trim();
  if (!email || !userId) {
    throw new Error("Admin authentication is not configured.");
  }
  return { email, userId };
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
  const { error } = await getSupabaseAdmin()
    .from(ADMIN_SESSION_TABLE)
    .delete()
    .eq("token_hash", tokenHash);
  if (error && !isMissingTableError(error)) throw error;
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
    // The provider token is never sent to the browser or used for app authorization.
    console.warn("[admin] Supabase refresh-session revocation failed.");
  }
}

async function createAdminSession(userId: string) {
  const sessionToken = randomBytes(32).toString("base64url");
  const expiresIn = SESSION_TTL_SECONDS;
  const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
  const tokenHash = hashSessionToken(sessionToken);
  const admin = getSupabaseAdmin();

  const { error } = await admin.from(ADMIN_SESSION_TABLE).insert({
    token_hash: tokenHash,
    user_id: userId,
    expires_at: expiresAt,
  });
  if (error) {
    if (isMissingTableError(error)) {
      fallbackSessions.set(tokenHash, { user_id: userId, expires_at: expiresAt });
    } else {
      throw error;
    }
  }

  void admin
    .from(ADMIN_SESSION_TABLE)
    .delete()
    .lt("expires_at", new Date().toISOString())
    .then(({ error: cleanupError }) => {
      if (cleanupError && !isMissingTableError(cleanupError)) {
        console.warn("[admin] Expired session cleanup failed.");
      }
    });

  return { sessionToken, expiresIn };
}

export type AdminLoginResult =
  | { ok: true; sessionToken: string; expiresIn: number }
  | { ok: false; reason: "invalid" | "rate_limited" | "unavailable" };

export async function signInAdmin(pin: string): Promise<AdminLoginResult> {
  const { email, userId } = adminConfig();
  const auth = getSupabaseAuthClient();

  let authResult: Awaited<ReturnType<typeof auth.auth.signInWithPassword>>;
  try {
    authResult = await auth.auth.signInWithPassword({ email, password: pin });
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  const { data, error } = authResult;
  if (error) {
    if (!error.status || error.status >= 500) {
      return { ok: false, reason: "unavailable" };
    }
    return {
      ok: false,
      reason: error.status === 429 ? "rate_limited" : "invalid",
    };
  }

  if (!data.session || !isAllowedAdmin(data.user, userId)) {
    if (data.session?.access_token) await revokeSupabaseSession(data.session.access_token);
    return { ok: false, reason: "invalid" };
  }

  try {
    const session = await createAdminSession(userId);
    await revokeSupabaseSession(data.session.access_token);
    return { ok: true, ...session };
  } catch {
    await revokeSupabaseSession(data.session.access_token);
    return { ok: false, reason: "unavailable" };
  }
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

  let expectedUserId = "";
  try {
    expectedUserId = adminConfig().userId;
  } catch {
    return null;
  }

  const admin = getSupabaseAdmin();
  const tokenHash = hashSessionToken(token);
  let session: AdminSessionRow | null = null;

  const { data: stored, error: sessionError } = await admin
    .from(ADMIN_SESSION_TABLE)
    .select("user_id,expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (sessionError) {
    if (isMissingTableError(sessionError)) {
      session = fallbackSessions.get(tokenHash) || null;
    } else {
      throw sessionError;
    }
  } else if (stored) {
    session = stored as AdminSessionRow;
  } else {
    session = fallbackSessions.get(tokenHash) || null;
  }

  if (!session) return null;

  if (session.user_id !== expectedUserId || Date.parse(session.expires_at) <= Date.now()) {
    fallbackSessions.delete(tokenHash);
    await removeSessionQuietly(token);
    return null;
  }

  const { data, error: userError } = await admin.auth.admin.getUserById(session.user_id);
  if (userError) {
    if (userError.status === 404) {
      await removeSessionQuietly(token);
      return null;
    }
    throw userError;
  }
  if (!isAllowedAdmin(data.user, expectedUserId)) {
    await removeSessionQuietly(token);
    return null;
  }

  return { token, user: data.user };
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
    const requestHost = forwardedHost || requestUrl.host;
    if (originUrl.host === requestHost && originUrl.protocol === requestUrl.protocol) return true;

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
