import { isAdminRequest } from "@/lib/admin-auth";
import { noStoreJson } from "@/lib/api-response";

export async function GET(req: Request) {
  return noStoreJson({ success: true, authenticated: await isAdminRequest(req) });
}
