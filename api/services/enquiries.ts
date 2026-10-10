import "server-only";

import { getSupabaseAdmin } from "@/api/helpers/supabase";
import type { Enquiry, EnquiryStatus } from "@/api/schemas/enquiry-schema";

type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  mobile: string | null;
  message: string;
  reason: string | null;
  image_url?: string | null;
  status: EnquiryStatus;
  created_at: string;
};

const TABLE = "enquiries";
const FIELDS_WITH_IMAGE = "id,name,email,mobile,message,reason,image_url,status,created_at";
const FIELDS_FALLBACK = "id,name,email,mobile,message,reason,status,created_at";

function mapRow(row: EnquiryRow): Enquiry {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    mobile: row.mobile || null,
    message: row.message,
    reason: row.reason || null,
    image_url: row.image_url || null,
    status: row.status,
    created_at: row.created_at,
  };
}

export async function insertEnquiry(input: {
  name: string;
  email: string;
  mobile?: string | null;
  message: string;
  reason?: string;
  image_url?: string | null;
}) {
  const safeMobile =
    input.mobile && /^[0-9]{10}$/.test(input.mobile) ? input.mobile : null;
  const safeName = input.name.slice(0, 120).trim();
  const safeEmail = input.email.slice(0, 160).trim();
  const safeMessage = input.message.slice(0, 1000).trim();
  const safeReason = (input.reason || "").slice(0, 120).trim() || null;
  const safeImageUrl = input.image_url?.trim() || null;

  const basePayload = {
    name: safeName,
    email: safeEmail,
    mobile: safeMobile,
    message: safeMessage,
    reason: safeReason,
    status: "new",
  };

  // Attempt insert with image_url first
  if (safeImageUrl) {
    const { data, error } = await getSupabaseAdmin()
      .from(TABLE)
      .insert({
        ...basePayload,
        image_url: safeImageUrl,
      })
      .select("id")
      .single();

    if (!error && data) {
      return { id: String(data.id) };
    }

    // If column doesn't exist yet (Postgres code 42703), retry without image_url
    if (error && (error.code === "42703" || error.message?.includes("image_url"))) {
      console.warn(
        "[enquiries] Table column 'image_url' not yet present in Supabase. Storing enquiry without image column until migration is applied."
      );
    } else if (error) {
      console.error("[enquiries] insertEnquiry failed:", error);
      throw error;
    }
  }

  // Insert without image_url (fallback or when no image provided)
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .insert(basePayload)
    .select("id")
    .single();

  if (error) {
    console.error("[enquiries] insertEnquiry failed:", error);
    throw error;
  }
  return { id: String(data.id) };
}

export async function listEnquiries() {
  // Try selecting with image_url column
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select(FIELDS_WITH_IMAGE)
    .order("created_at", { ascending: false });

  if (!error) {
    return (data || []).map((row) => mapRow(row as EnquiryRow));
  }

  // If column doesn't exist yet, fallback to FIELDS_FALLBACK
  if (error.code === "42703" || error.message?.includes("image_url")) {
    const fallbackResult = await getSupabaseAdmin()
      .from(TABLE)
      .select(FIELDS_FALLBACK)
      .order("created_at", { ascending: false });
    if (fallbackResult.error) throw fallbackResult.error;
    return (fallbackResult.data || []).map((row) => mapRow(row as EnquiryRow));
  }

  throw error;
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .update({ status })
    .eq("id", id)
    .select(FIELDS_WITH_IMAGE)
    .maybeSingle();

  if (!error) {
    return data ? mapRow(data as EnquiryRow) : null;
  }

  // Fallback if image_url column doesn't exist
  if (error.code === "42703" || error.message?.includes("image_url")) {
    const fallbackResult = await getSupabaseAdmin()
      .from(TABLE)
      .update({ status })
      .eq("id", id)
      .select(FIELDS_FALLBACK)
      .maybeSingle();
    if (fallbackResult.error) throw fallbackResult.error;
    return fallbackResult.data ? mapRow(fallbackResult.data as EnquiryRow) : null;
  }

  throw error;
}

async function countEnquiries(status?: EnquiryStatus) {
  let query = getSupabaseAdmin()
    .from(TABLE)
    .select("id", { count: "exact" })
    .limit(1);
  if (status) query = query.eq("status", status);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

export async function enquiryStats() {
  const [total, fresh, read, resolved] = await Promise.all([
    countEnquiries(),
    countEnquiries("new"),
    countEnquiries("read"),
    countEnquiries("resolved"),
  ]);
  return {
    total_enquiries: total,
    new_enquiries: fresh,
    read_enquiries: read,
    resolved_enquiries: resolved,
  };
}
