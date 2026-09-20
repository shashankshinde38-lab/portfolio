import { isAdminRequest } from "@/api/services/admin-auth";
import { noStoreJson, publicError, safeApiMessage } from "@/api/helpers/api-response";
import { enquiryStats } from "@/api/services/enquiries";

export async function GET(req: Request) {
  try {
    if (!(await isAdminRequest(req))) return publicError("Unauthorized", 401);
    return noStoreJson({ success: true, ...(await enquiryStats()) });
  } catch (error: unknown) {
    return publicError(safeApiMessage(error, "Unable to load dashboard."), 500);
  }
}
