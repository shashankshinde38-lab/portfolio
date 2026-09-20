"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PINVerification } from "@/components/PINVerification";

export default function AdminLoginPage() {
  const router = useRouter();

  // Verify PIN with server endpoint
  const handleVerify = async (pinCode: string) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinCode }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return {
          success: false,
          message: data.message || data.error || "Incorrect PIN. Please try again.",
        };
      }

      return { success: true };
    } catch {
      return {
        success: false,
        message: "Authentication service unavailable. Please try again.",
      };
    }
  };

  // On successful verification sequence completion
  const handleSuccess = () => {
    setTimeout(() => {
      router.replace("/admin/dashboard");
      router.refresh();
    }, 400);
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "#08090d" }}>
      {/* Top Demo Link banner */}
      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "20px",
          zIndex: 50,
        }}
      >
        <Link
          href="/pin-demo"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(249, 115, 22, 0.12)",
            border: "1px solid rgba(249, 115, 22, 0.35)",
            color: "#f97316",
            padding: "6px 14px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 600,
            textDecoration: "none",
            backdropFilter: "blur(8px)",
          }}
        >
          <Sparkles size={13} /> Animation Sandbox
        </Link>
      </div>

      {/* Reusable 6-Digit PIN Verification Component */}
      <PINVerification
        onVerify={handleVerify}
        onSuccess={handleSuccess}
        title="Let's verify your access"
        subtitle="Enter your 6-digit security PIN to continue."
        successTitle="Verified Successfully"
        successSubtitle="Access granted. Redirecting to dashboard..."
        badgeText="Verified and Secure"
      />

      {/* Back to Portfolio Link */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#64748b",
            fontSize: "13px",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>
      </div>
    </main>
  );
}