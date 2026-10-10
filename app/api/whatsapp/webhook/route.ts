import { NextResponse } from "next/server";
import { after } from "next/server";
import { insertEnquiry } from "@/api/services/enquiries";
import { sendEnquiryWhatsAppNotifications } from "@/api/services/whatsapp-notification";
import { WhatsAppApiClient } from "@/api/services/whatsapp-client";

export const dynamic = "force-dynamic";

interface InboundWebhookPayload {
  event?: string;
  type?: string;
  from?: string;
  to?: string;
  message?: string;
  body?: string;
  text?: string;
  mediaUrl?: string;
  url?: string;
  pushName?: string;
  senderName?: string;
  data?: {
    from?: string;
    body?: string;
    text?: string;
    caption?: string;
    mediaUrl?: string;
    pushName?: string;
    type?: string;
  };
}

export async function GET() {
  return NextResponse.json({
    success: true,
    service: "whatsapp-webhook",
    status: "active",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const payload: InboundWebhookPayload = await req.json().catch(() => ({}));

    // Normalize incoming fields across different webhook payload flavors
    const rawFrom =
      payload.data?.from ||
      payload.from ||
      "";

    const senderDigits = WhatsAppApiClient.normalizePhone(rawFrom.split("@")[0] || "");
    const rawMessage =
      payload.data?.body ||
      payload.data?.text ||
      payload.data?.caption ||
      payload.message ||
      payload.body ||
      payload.text ||
      "";

    const mediaUrl =
      payload.data?.mediaUrl ||
      payload.mediaUrl ||
      payload.url ||
      null;

    const senderName =
      payload.data?.pushName ||
      payload.pushName ||
      payload.senderName ||
      (senderDigits ? `WhatsApp (${senderDigits})` : "WhatsApp Contact");

    if (!senderDigits && !rawMessage && !mediaUrl) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const finalMessage = rawMessage.trim() || (mediaUrl ? "[Image attachment received via WhatsApp]" : "Direct message via WhatsApp");

    // Insert enquiry into database
    const { id } = await insertEnquiry({
      name: senderName.slice(0, 120),
      email: `${senderDigits || "inbound"}@whatsapp.contact`,
      mobile: senderDigits ? senderDigits.slice(-10) : null,
      message: finalMessage.slice(0, 1000),
      reason: "WhatsApp Message",
      image_url: mediaUrl,
    });

    after(async () => {
      try {
        await sendEnquiryWhatsAppNotifications({
          name: senderName,
          email: `${senderDigits}@whatsapp.contact`,
          mobile: senderDigits,
          reason: "WhatsApp Direct Inbound",
          message: finalMessage,
          imageUrl: mediaUrl,
        });
      } catch (err) {
        console.warn("[whatsapp-webhook] Notification dispatch failed:", err);
      }
    });

    return NextResponse.json({
      success: true,
      enquiryId: id,
      received: true,
    });
  } catch (error: unknown) {
    console.error("[whatsapp-webhook] Error processing incoming webhook:", error);
    return NextResponse.json(
      { success: false, error: (error as Error)?.message || "Internal error" },
      { status: 500 }
    );
  }
}
