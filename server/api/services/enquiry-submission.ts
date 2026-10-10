import "server-only";
import { after } from "next/server";
import crypto from "node:crypto";

import { noStoreJson, publicError, safeApiMessage } from "@/api/helpers/api-response";
import { insertEnquiry } from "@/api/services/enquiries";
import { enquiryCreateSchema } from "@/api/schemas/enquiry-schema";
import { sendContactNotification } from "@/api/services/mailer";
import { sendEnquiryWhatsAppNotifications } from "@/api/services/whatsapp-notification";
import { getSupabaseAdmin } from "@/api/helpers/supabase";

const MAX_REQUEST_BYTES = 524_288; // 512 KB

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

async function uploadBase64Image(dataUrl: string): Promise<string | null> {
  try {
    const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) return null;
    const mimeType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, "base64");
    const ext = mimeType.split("/")[1] || "jpg";
    const fileName = `enquiry_${Date.now()}_${crypto.randomBytes(4).toString("hex")}.${ext}`;

    const admin = getSupabaseAdmin();
    const { error } = await admin.storage
      .from("enquiry-images")
      .upload(fileName, buffer, { contentType: mimeType, upsert: true });

    if (error) {
      console.warn("[enquiry-submission] Base64 upload failed:", error);
      return null;
    }

    const { data } = admin.storage.from("enquiry-images").getPublicUrl(fileName);
    return data.publicUrl;
  } catch (err) {
    console.warn("[enquiry-submission] uploadBase64Image error:", err);
    return null;
  }
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

    const rawImageUrl = body.image_url || body.imageUrl || null;
    const rawImageData = body.image_data || body.imageData || null;

    const parsed = enquiryCreateSchema.safeParse({
      name: body.name ?? body.full_name,
      email: body.email,
      mobile: body.mobile,
      message: body.message,
      reason: body.reason,
      website: body.website,
      image_url: rawImageUrl,
      image_data: rawImageData,
    });
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] || "form");
        if (!errors[key]) errors[key] = issue.message;
      }
      return publicError("Please check the highlighted fields.", 400, { errors });
    }

    const { name, email, mobile, message, reason, image_url, image_data } = parsed.data;
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

    let resolvedImageUrl = image_url?.trim() || null;
    if (!resolvedImageUrl && image_data) {
      resolvedImageUrl = await uploadBase64Image(image_data);
    }

    const { id } = await insertEnquiry({
      name,
      email,
      mobile: dbMobile,
      message: storedMessage,
      reason: safeReason,
      image_url: resolvedImageUrl,
    });

    after(async () => {
      // 1. Send Email Notification
      try {
        await sendContactNotification({
          full_name: name,
          email,
          mobile: rawMobile,
          reason: safeReason,
          message,
        });
      } catch (mailErr) {
        console.warn("[enquiries] Email notification delivery failed:", mailErr);
      }

      // 2. Send WhatsApp Notifications (both sender & admin)
      try {
        await sendEnquiryWhatsAppNotifications({
          name,
          email,
          mobile: rawMobile || dbMobile,
          reason: safeReason,
          message,
          imageUrl: resolvedImageUrl,
        });
      } catch (waErr) {
        console.warn("[enquiries] WhatsApp notification delivery failed:", waErr);
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
