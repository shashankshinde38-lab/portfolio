import { isAdminRequest, isSameOrigin } from "@/lib/admin-auth";
import { noStoreJson, publicError, safeApiMessage } from "@/lib/api-response";
import { updateEnquiryStatus } from "@/lib/enquiries";
import { enquiryIdSchema, enquiryStatusSchema } from "@/lib/enquiry-schema";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!isSameOrigin(req)) return publicError("Request origin is not allowed.", 403);
    if (!(await isAdminRequest(req))) return publicError("Unauthorized", 401);

    const id = enquiryIdSchema.safeParse((await context.params).id);
    if (!id.success) return publicError("Invalid enquiry ID", 400);
    const parsed = enquiryStatusSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return publicError("Invalid status", 400);

    const updated = await updateEnquiryStatus(id.data, parsed.data.status);
    if (!updated) return publicError("Enquiry not found", 404);
    return noStoreJson({ success: true, data: updated });
  } catch (error: unknown) {
    return publicError(safeApiMessage(error, "Unable to update enquiry."), 500);
  }
}
