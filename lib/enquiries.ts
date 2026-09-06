import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase";
import type { Enquiry, EnquiryStatus } from "@/lib/enquiry-schema";

type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  mobile: string | null;
  message: string;
  reason: string | null;
  status: EnquiryStatus;
  created_at: string;
};

const TABLE = "enquiries";
const FIELDS = "id,name,email,mobile,message,reason,status,created_at";

function mapRow(row: EnquiryRow): Enquiry {
  return {
    id: String(row.id),
    name: row.name,
    email: row.email,
    mobile: row.mobile || null,
    message: row.message,
    reason: row.reason || null,
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
}) {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .insert({
      name: input.name,
      email: input.email,
      mobile: input.mobile || null,
      message: input.message,
      reason: input.reason || null,
      status: "new",
    })
    .select("id")
    .single();
  if (error) throw error;
  return { id: String(data.id) };
}

export async function listEnquiries() {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select(FIELDS)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => mapRow(row as EnquiryRow));
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .update({ status })
    .eq("id", id)
    .select(FIELDS)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as EnquiryRow) : null;
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
