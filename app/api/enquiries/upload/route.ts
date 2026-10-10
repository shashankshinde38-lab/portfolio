import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSupabaseAdmin } from "@/api/helpers/supabase";
import { noStoreJson, publicError } from "@/api/helpers/api-response";

export const dynamic = "force-dynamic";

const BUCKET_NAME = "enquiry-images";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return publicError("Please select a valid image file to upload.", 400);
    }

    if (file.size > MAX_FILE_BYTES) {
      return publicError("Image size exceeds the 5MB limit. Please choose a smaller image.", 400);
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return publicError(
        "Invalid file type. Only JPEG, PNG, WebP, and GIF images are supported.",
        400
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const uniqueName = `enquiry_${Date.now()}_${crypto.randomBytes(6).toString("hex")}.${ext}`;

    const admin = getSupabaseAdmin();

    const { error: uploadError } = await admin.storage
      .from(BUCKET_NAME)
      .upload(uniqueName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("[upload] Failed to upload image to Supabase Storage:", uploadError);
      return publicError("Failed to store image attachment. Please try again.", 500);
    }

    const { data: publicData } = admin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uniqueName);

    return noStoreJson(
      {
        success: true,
        url: publicData.publicUrl,
        name: file.name,
        size: file.size,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[upload] Unexpected error during image upload:", error);
    return publicError("An error occurred while uploading the image.", 500);
  }
}
