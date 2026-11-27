import { createHash, timingSafeEqual } from "node:crypto";
import { noStoreJson } from "@/api/helpers/api-response";
import { processEnquiryWhatsAppJobs } from "@/api/services/whatsapp-outbox";

export const maxDuration = 45;

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export async function POST(request: Request) {
  const secret = process.env.WHATSAPP_RETRY_SECRET;
  const supplied = request.headers.get("authorization");
  if (!secret || !supplied || !timingSafeEqual(digest(supplied), digest(`Bearer ${secret}`))) {
    return noStoreJson({ success: false }, { status: 401 });
  }

  try {
    const processed = await processEnquiryWhatsAppJobs();
    return noStoreJson({ success: true, processed });
  } catch (error) {
    console.error("[whatsapp-outbox] Retry worker failed:", error);
    return noStoreJson({ success: false }, { status: 500 });
  }
}
