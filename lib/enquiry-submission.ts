import "server-only";
import { after } from "next/server";

import { noStoreJson, publicError, safeApiMessage } from "@/lib/api-response";
import { insertEnquiry } from "@/lib/enquiries";
import { enquiryCreateSchema } from "@/lib/enquiry-schema";
import { sendContactNotification } from "@/lib/mailer";

const MAX_REQUEST_BYTES = 16_384;

function success(id?: string) {
  return noStoreJson(
    {
      success: true,
      message: "Thank you! Your enquiry has been submitted successfully.",
      ...(id ? { data: { id } } : {}),
    },
    { status: 201 }
  );
}

export async function submitEnquiry(req: Request) {
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > MAX_REQUEST_BYTES) return publicError("Request is too large.", 413);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return publicError("Please provide valid enquiry details.", 400);
    }
    if (typeof body.website === "string" && body.website.trim()) return success();

    const parsed = enquiryCreateSchema.safeParse({
      name: body.name ?? body.full_name,
      email: body.email,
      mobile: body.mobile,
      message: body.message,
      reason: body.reason,
      website: body.website,
    });
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] || "form");
        if (!errors[key]) errors[key] = issue.message;
      }
      return publicError("Please check the highlighted fields.", 400, { errors });
    }

    const { name, email, mobile, message, reason } = parsed.data;
    const safeReason = reason || "General Inquiry";
    const { id } = await insertEnquiry({
      name,
      email,
      mobile: mobile || null,
      message,
      reason: safeReason,
    });

    after(async () => {
      try {
        await sendContactNotification({
          full_name: name,
          email,
          mobile: mobile || null,
          reason: safeReason,
          message,
        });
      } catch {
        console.warn("[enquiries] Notification delivery failed after the enquiry was stored.");
      }
    });
    return success(id);
  } catch (error: unknown) {
    return publicError(
      safeApiMessage(error, "Unable to submit your enquiry right now."),
      500
    );
  }
}
