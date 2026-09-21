import { getSupabaseAdmin, supabaseServerConfigured } from "@/api/helpers/supabase";
import { noStoreJson } from "@/api/helpers/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabaseServerConfigured()) {
    return noStoreJson({ ok: false, backend: "supabase" });
  }
  try {
    const { error } = await getSupabaseAdmin()
      .from("enquiries")
      .select("id")
      .limit(1);
    return noStoreJson({ ok: !error, backend: "supabase" });
  } catch {
    return noStoreJson({ ok: false, backend: "supabase" });
  }
}
