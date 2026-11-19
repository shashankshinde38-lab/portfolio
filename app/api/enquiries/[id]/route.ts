import { isAdminRequest, isSameOrigin } from "@/api/services/admin-auth";
import { noStoreJson, publicError, safeApiMessage } from "@/api/helpers/api-response";
import { updateEnquiryStatus, deleteEnquiry } from "@/api/services/enquiries";
import { enquiryIdSchema, enquiryStatusSchema } from "@/api/schemas/enquiry-schema";

export const dynamic = "force-dynamic";

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

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!isSameOrigin(req)) return publicError("Request origin is not allowed.", 403);
    if (!(await isAdminRequest(req))) return publicError("Unauthorized", 401);

    const id = enquiryIdSchema.safeParse((await context.params).id);
    if (!id.success) return publicError("Invalid enquiry ID", 400);

    const deleted = await deleteEnquiry(id.data);
    if (!deleted) return publicError("Enquiry not found", 404);
    return noStoreJson({ success: true, message: "Enquiry deleted successfully", data: deleted });
  } catch (error: unknown) {
    return publicError(safeApiMessage(error, "Unable to delete enquiry."), 500);
  }
}
