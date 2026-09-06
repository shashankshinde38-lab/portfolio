import { NextResponse } from "next/server";
import { getSupabaseAdmin, supabaseServerConfigured } from "@/lib/supabase";

export async function GET() {
  if (!supabaseServerConfigured()) {
    return NextResponse.json({ ok: false, backend: "supabase" });
  }
  try {
    const { error } = await getSupabaseAdmin()
      .from("enquiries")
      .select("id")
      .limit(1);
    return NextResponse.json({ ok: !error, backend: "supabase" });
  } catch {
    return NextResponse.json({ ok: false, backend: "supabase" });
  }
}
