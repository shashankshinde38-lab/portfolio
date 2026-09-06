import { isAdminRequest } from "@/lib/admin-auth";
import { noStoreJson, publicError, safeApiMessage } from "@/lib/api-response";
import { enquiryStats } from "@/lib/enquiries";

export async function GET(req: Request) {
  try {
    if (!(await isAdminRequest(req))) return publicError("Unauthorized", 401);
    return noStoreJson({ success: true, ...(await enquiryStats()) });
  } catch (error: unknown) {
    return publicError(safeApiMessage(error, "Unable to load dashboard."), 500);
  }
}
