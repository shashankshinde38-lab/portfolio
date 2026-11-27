import "server-only";

import { createHash, randomBytes, timingSafeEqual } from "crypto";
import type { User } from "@supabase/supabase-js";
import { ADMIN_ACCESS_COOKIE, adminAccessCookieOptions } from "@/api/helpers/admin-cookie";
import { getSupabaseAdmin, getSupabaseAuthClient } from "@/api/helpers/supabase";

const ADMIN_ROLE = "portfolio_admin";
const ADMIN_SESSION_TABLE = "admin_sessions";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const OPAQUE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

function readCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie") || "";
  for (const part of cookie.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return value.join("=");
  }
  return "";
}

function adminConfig() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const userId = (process.env.ADMIN_USER_ID || "portfolio_admin_shashank").trim();
  const pin = process.env.ADMIN_PIN?.trim();
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
  const { error } = await getSupabaseAdmin()
    .from(ADMIN_SESSION_TABLE)
    .delete()
    .eq("token_hash", hashSessionToken(token));
  if (error) throw error;
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

  const admin = getSupabaseAdmin();
  const { error } = await admin.from(ADMIN_SESSION_TABLE).insert({
    token_hash: tokenHash,
    user_id: userId,
    expires_at: expiresAt,
  });
  if (error) throw error;

  const cleanup = await admin.from(ADMIN_SESSION_TABLE).delete()
    .lt("expires_at", new Date().toISOString());
  if (cleanup.error) console.warn("[admin] Unable to remove expired sessions.");

  return { sessionToken, expiresIn };
}

export type AdminLoginResult =
  | { ok: true; sessionToken: string; expiresIn: number }
  | { ok: false; reason: "invalid" | "rate_limited" | "unavailable" };

export async function signInAdmin(pin: string): Promise<AdminLoginResult> {
  const { email, userId, pin: configuredPin } = adminConfig();

  if (
    configuredPin && /^\d{6}$/.test(configuredPin) && /^\d{6}$/.test(pin) &&
    timingSafeEqual(Buffer.from(pin), Buffer.from(configuredPin))
  ) {
    try {
      const session = await createAdminSession(userId);
      return { ok: true, ...session };
    } catch (error) {
      console.error("[admin] Unable to persist the admin session:", error);
      return { ok: false, reason: "unavailable" };
    }
  }

  // Secondary verification: Supabase Auth if ADMIN_EMAIL is configured
  if (email && process.env.ADMIN_USER_ID) {
    try {
      const auth = getSupabaseAuthClient();
      const authResult = await auth.auth.signInWithPassword({ email, password: pin });
      const { data, error } = authResult;
      if (!error && data?.session && isAllowedAdmin(data.user, userId)) {
        if (data.session.access_token) {
          await revokeSupabaseSession(data.session.access_token);
        }
        const session = await createAdminSession(userId);
        return { ok: true, ...session };
      }
    } catch (error) {
      console.error("[admin] Supabase admin sign-in failed:", error);
      return { ok: false, reason: "unavailable" };
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

export async function isAdminRequest(req: Request) {
  const token = readCookie(req, ADMIN_ACCESS_COOKIE);
  if (!OPAQUE_TOKEN_PATTERN.test(token)) return false;

  const { userId } = adminConfig();
  const { data, error } = await getSupabaseAdmin()
    .from(ADMIN_SESSION_TABLE)
    .select("token_hash")
    .eq("token_hash", hashSessionToken(token))
    .eq("user_id", userId)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
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
