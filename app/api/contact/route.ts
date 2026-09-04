import { NextResponse } from "next/server";
import { insertContactMessage } from "@/lib/supabase";
import { sendContactNotification } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, email, mobile, reason, message } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!full_name || !full_name.trim()) {
      errors.full_name = "Full name is required";
    }

    if (!email || !email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (mobile && mobile.trim()) {
      const digits = mobile.replace(/\D/g, "");
      if (digits.length !== 10) {
        errors.mobile = "Mobile number must be exactly 10 digits";
      }
    }

    if (!reason || !reason.trim()) {
      errors.reason = "Please select a reason for contact";
    }

    if (!message || !message.trim()) {
      errors.message = "Message is required";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors },
        { status: 400 }
      );
    }

    // 1. Insert into Supabase
    const { id: insertedId } = await insertContactMessage({
      full_name: full_name.trim(),
      email: email.trim(),
      mobile: mobile ? mobile.trim() : null,
      reason: reason.trim(),
      message: message.trim(),
    });

    // 2. Send email notification (non-blocking)
    try {
      await sendContactNotification({
        full_name: full_name.trim(),
        email: email.trim(),
        mobile: mobile ? mobile.trim() : null,
        reason: reason.trim(),
        message: message.trim(),
      });
    } catch (emailErr: any) {
      console.error("[Next.js API] Email dispatch failed:", emailErr?.message);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully!",
        data: { id: insertedId },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[Next.js API] Contact error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
