import { clearAdminAccessCookie, isSameOrigin, revokeAdminRequest } from "@/api/services/admin-auth";
import { noStoreJson, publicError } from "@/api/helpers/api-response";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return publicError("Request origin is not allowed.", 403);
  try {
    await revokeAdminRequest(req);
  } catch {
    console.warn("[admin] Supabase session revocation failed; clearing the local cookie.");
  }
  const response = noStoreJson({ success: true });
  clearAdminAccessCookie(response);
  return response;
}
