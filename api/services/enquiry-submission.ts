import "server-only";
import { after } from "next/server";

import { noStoreJson, publicError, safeApiMessage } from "@/api/helpers/api-response";
import { insertEnquiry } from "@/api/services/enquiries";
import { enquiryCreateSchema } from "@/api/schemas/enquiry-schema";
import { sendContactNotification } from "@/api/services/mailer";

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

function extract10DigitMobile(rawMobile?: string | null): string | null {
  if (!rawMobile) return null;
  const digits = rawMobile.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && (digits.startsWith("0") || digits.startsWith("1"))) {
    return digits.slice(-10);
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(-10);
  }
  if (digits.length >= 10) {
    return digits.slice(-10);
  }
  return null;
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
    const rawMobile = mobile?.trim() || null;
    const dbMobile = extract10DigitMobile(rawMobile);

    let storedMessage = message.trim();
    if (rawMobile && rawMobile !== dbMobile) {
      const contactNote = `\n\n[Contact: ${rawMobile}]`;
      if (storedMessage.length + contactNote.length <= 1000) {
        storedMessage += contactNote;
      }
    }

    const { id } = await insertEnquiry({
      name,
      email,
      mobile: dbMobile,
      message: storedMessage,
      reason: safeReason,
    });

    after(async () => {
      try {
        await sendContactNotification({
          full_name: name,
          email,
          mobile: rawMobile,
          reason: safeReason,
          message,
        });
      } catch (mailErr) {
        console.warn("[enquiries] Notification delivery failed after the enquiry was stored:", mailErr);
      }
    });
    return success(id);
  } catch (error: unknown) {
    console.error("[enquiries] submitEnquiry failed:", error);
    return publicError(
      safeApiMessage(error, "Unable to submit your enquiry right now."),
      500
    );
  }
}
