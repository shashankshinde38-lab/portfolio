import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const clientOptions = {
  auth: { persistSession: false, autoRefreshToken: false },
};

let adminClient: SupabaseClient | null = null;

function requireSupabaseUrl() {
  const value = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) throw new Error("Supabase URL is not configured.");
  return value;
}

export function getSupabaseAdmin() {
  if (adminClient) return adminClient;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Supabase service role is not configured.");
  adminClient = createClient(requireSupabaseUrl(), key, clientOptions);
  return adminClient;
}

export function getSupabaseAuthClient(accessToken?: string) {
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("Supabase Auth is not configured.");
  return createClient(requireSupabaseUrl(), key, {
    ...clientOptions,
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : undefined,
  });
}

export function supabaseServerConfigured() {
  return Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
