import { isAdminRequest } from "@/api/services/admin-auth";
import { noStoreJson } from "@/api/helpers/api-response";

export async function GET(req: Request) {
  return noStoreJson({ success: true, authenticated: await isAdminRequest(req) });
}
