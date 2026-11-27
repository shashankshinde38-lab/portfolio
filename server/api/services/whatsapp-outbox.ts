import "server-only";

import { getSupabaseAdmin } from "@/api/helpers/supabase";
import { WhatsAppApiClient } from "@/api/services/whatsapp-client";
import type { WebsiteWhatsAppMessage } from "@/api/services/whatsapp-notification";

type WhatsAppJob = WebsiteWhatsAppMessage & {
  enquiry_id: string;
  attempts: number;
};

export async function processEnquiryWhatsAppJobs(enquiryId?: string) {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc("claim_enquiry_whatsapp_jobs", {
    target_enquiry_id: enquiryId ?? null,
  });
  if (error) throw error;

  const jobs = (data ?? []) as WhatsAppJob[];
  const token = process.env.WHATSAPP_API_TOKEN?.trim();
  const client = token ? new WhatsAppApiClient({ token, useTokenInstance: true }) : null;
  const outcomes = await Promise.allSettled(jobs.map(async (job) => {
    const idempotencyKey = `enquiry-${job.enquiry_id}-${job.recipient}`;
    const result = await client?.sendMessage(job.payload, idempotencyKey, 0);
    const status = result?.success === true
      ? "accepted"
      : result?.error === "SESSION_DISCONNECTED" ? "disconnected" : "pending";
    const rawError = result?.error ?? (client ? "UNCONFIRMED" : "TOKEN_NOT_CONFIGURED");
    const errorCode = /^[A-Z0-9_-]{1,80}$/.test(rawError) ? rawError : "GATEWAY_ERROR";
    const { data: updated, error: finishError } = await admin.rpc("finish_enquiry_whatsapp_job", {
      target_enquiry_id: job.enquiry_id,
      target_recipient: job.recipient,
      claimed_attempt: job.attempts,
      outcome: status,
      error_code: status === "accepted" ? null : errorCode,
    });
    if (finishError) throw finishError;
    if (updated) {
      console.info(`[whatsapp-outbox] ${job.enquiry_id} ${job.recipient} attempt ${job.attempts}: ${status}`);
    }
  }));
  if (outcomes.some((outcome) => outcome.status === "rejected")) {
    throw new Error("One or more WhatsApp jobs could not be finalized and will be retried.");
  }
  return jobs.length;
}
