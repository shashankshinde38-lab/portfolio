import "server-only";

import { getWhatsAppClient } from "@/api/services/whatsapp-client";

export interface EnquiryNotificationParams {
  name: string;
  email: string;
  mobile?: string | null;
  reason?: string;
  message: string;
  imageUrl?: string | null;
}

export interface WhatsAppNotificationResult {
  adminDelivered: boolean;
  senderDelivered: boolean;
  adminError?: string;
  senderError?: string;
}

const DEFAULT_ADMIN_PHONE = "918999246557";

function formatISTTimestamp(): string {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Sends synchronized WhatsApp notifications to both:
 * 1. The Admin (instant alert with full details & attached image)
 * 2. The Sender (polite, branded confirmation acknowledging receipt)
 */
export async function sendEnquiryWhatsAppNotifications(
  params: EnquiryNotificationParams
): Promise<WhatsAppNotificationResult> {
  const client = getWhatsAppClient();
  if (!client) {
    console.log("[whatsapp-notification] WHATSAPP_API_TOKEN is not configured; skipping WhatsApp dispatch.");
    return { adminDelivered: false, senderDelivered: false };
  }

  const result: WhatsAppNotificationResult = {
    adminDelivered: false,
    senderDelivered: false,
  };

  const adminPhone = process.env.ADMIN_WHATSAPP_PHONE || DEFAULT_ADMIN_PHONE;
  const safeReason = params.reason?.trim() || "General Enquiry";
  const timestamp = formatISTTimestamp();

  // 1. ADMIN NOTIFICATION DISPATCH
  try {
    const adminCaption = [
      "🔔 *New Portfolio Enquiry*",
      "━━━━━━━━━━━━━━━━━━━",
      `👤 *Name:* ${params.name.trim()}`,
      `📧 *Email:* ${params.email.trim()}`,
      `📱 *Mobile:* ${params.mobile?.trim() || "Not provided"}`,
      `🏷️ *Topic:* ${safeReason}`,
      "━━━━━━━━━━━━━━━━━━━",
      "📝 *Message:*",
      params.message.trim(),
      ...(params.imageUrl ? ["", `🖼️ *Attachment:* ${params.imageUrl}`] : []),
      "━━━━━━━━━━━━━━━━━━━",
      `⏰ *Received:* ${timestamp}`,
      "📂 *Admin Portal:* https://shashankportfolio-jet.vercel.app/admin/enquiries",
    ].join("\n");

    let adminSent = false;

    // If an image URL is attached, attempt to send as media message first
    if (params.imageUrl && /^https?:\/\//i.test(params.imageUrl)) {
      try {
        await client.sendMessage({
          to: adminPhone,
          message: adminCaption,
          type: "image",
          mediaUrl: params.imageUrl,
        });
        adminSent = true;
      } catch (mediaErr) {
        console.warn(
          "[whatsapp-notification] Media send to admin failed, falling back to text dispatch:",
          mediaErr
        );
      }
    }

    if (!adminSent) {
      const adminRes = await client.sendMessage({
        to: adminPhone,
        message: adminCaption,
        type: "text",
      });
      if (adminRes.success) {
        result.adminDelivered = true;
        console.log(`[whatsapp-notification] Successfully alerted admin on WhatsApp (${adminPhone}).`);
      } else {
        result.adminError = adminRes.error || adminRes.message || "Delivery skipped";
        console.warn(`[whatsapp-notification] Admin alert skipped or unconfirmed: ${result.adminError}`);
      }
    }
  } catch (err: unknown) {
    const msg = (err as Error)?.message || String(err);
    result.adminError = msg;
    console.warn("[whatsapp-notification] Failed to send WhatsApp alert to admin:", msg);
  }

  // 2. SENDER CONFIRMATION DISPATCH (if sender supplied a phone number)
  if (params.mobile && params.mobile.trim()) {
    try {
      const firstName = params.name.trim().split(" ")[0] || params.name.trim();

      const senderText = [
        `Hey *${firstName}*,`,
        "",
        "Your message has been sent to *Shashank*! He will respond back to you shortly. 🚀",
        "",
        "You can continue the conversation right here if you have any questions or want to share more details.",
        "",
        "Best regards,",
        "*Shashank Shinde*",
        "🌐 https://shashankportfolio-jet.vercel.app",
      ].join("\n");

      const senderRes = await client.sendMessage({
        to: params.mobile.trim(),
        message: senderText,
        type: "text",
      });

      if (senderRes.success) {
        result.senderDelivered = true;
        console.log(`[whatsapp-notification] Successfully sent confirmation to sender on WhatsApp (${params.mobile}).`);
      } else {
        result.senderError = senderRes.error || senderRes.message || "Delivery skipped";
        console.warn(`[whatsapp-notification] Sender confirmation skipped or unconfirmed: ${result.senderError}`);
      }
    } catch (err: unknown) {
      const msg = (err as Error)?.message || String(err);
      result.senderError = msg;
      console.warn("[whatsapp-notification] Failed to send WhatsApp confirmation to sender:", msg);
    }
  }

  return result;
}
