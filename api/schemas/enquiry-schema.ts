import { z } from "zod";

export const enquiryStatuses = ["new", "read", "resolved"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];

export const enquiryCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  mobile: z
    .string()
    .trim()
    .max(30, "Mobile number is too long")
    .optional()
    .or(z.literal(""))
    .refine((v) => !v || /^[\d\s()+-]+$/.test(v), "Please enter a valid mobile number")
    .refine((v) => !v || (v.replace(/\D/g, "").length >= 7 && v.replace(/\D/g, "").length <= 15), "Mobile number must contain between 7 and 15 digits"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message cannot exceed 1000 characters"),
  reason: z.string().trim().max(100).optional(),
  website: z.string().trim().max(0).optional(),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(enquiryStatuses),
});

export const enquiryIdSchema = z.string().uuid();

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  mobile: string | null;
  message: string;
  reason?: string | null;
  status: EnquiryStatus;
  created_at: string;
};

export function normalizeStatus(value: unknown): EnquiryStatus {
  return enquiryStatuses.includes(value as EnquiryStatus) ? (value as EnquiryStatus) : "new";
}
