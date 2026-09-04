import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://tuxkcnsywuhujoddinhm.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertContactMessage(data: {
  full_name: string;
  email: string;
  mobile?: string | null;
  reason: string;
  message: string;
}) {
  const { data: result, error } = await supabase
    .from("contact_messages")
    .insert([
      {
        full_name: data.full_name,
        email: data.email,
        mobile: data.mobile || null,
        reason: data.reason,
        message: data.message,
      },
    ])
    .select("id");

  if (error) throw error;
  return { id: result?.[0]?.id || Date.now().toString() };
}
