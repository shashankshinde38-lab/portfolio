import { isAdminRequest } from "@/api/services/admin-auth";
import { noStoreJson, publicError, safeApiMessage } from "@/api/helpers/api-response";
import { listEnquiries } from "@/api/services/enquiries";
import { submitEnquiry } from "@/api/services/enquiry-submission";

export async function POST(req: Request) {
  return submitEnquiry(req);
}

export async function GET(req: Request) {
  try {
    if (!(await isAdminRequest(req))) return publicError("Unauthorized", 401);
    const rows = await listEnquiries();
    return noStoreJson({ success: true, count: rows.length, data: rows });
  } catch (error: unknown) {
    return publicError(safeApiMessage(error, "Unable to load enquiries."), 500);
  }
}
