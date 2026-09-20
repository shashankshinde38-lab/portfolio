"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck, Bug } from "lucide-react";
import { OTPVerification } from "@/components/OTPVerification";

export default function OTPDemoPage() {
  const [shouldFail, setShouldFail] = useState(false);
  const [key, setKey] = useState(0);

  const handleVerify = async (code: string) => {
    // Simulate real network request
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (shouldFail) {
      return { success: false, message: "Invalid OTP code. Please try again." };
    }

    return { success: true };
  };

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Top Demo Control Toolbar */}
      <div
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(18, 21, 29, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "8px 16px",
          borderRadius: "999px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#94a3b8",
            fontSize: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
            paddingRight: "8px",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <ArrowLeft size={13} /> Portfolio
        </Link>

        <button
          type="button"
          onClick={() => setShouldFail(!shouldFail)}
          style={{
            background: shouldFail ? "rgba(239, 68, 68, 0.15)" : "rgba(34, 197, 94, 0.15)",
            border: `1px solid ${shouldFail ? "rgba(239, 68, 68, 0.4)" : "rgba(34, 197, 94, 0.4)"}`,
            color: shouldFail ? "#fca5a5" : "#86efac",
            borderRadius: "999px",
            padding: "4px 10px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {shouldFail ? <Bug size={13} /> : <ShieldCheck size={13} />}
          Mode: {shouldFail ? "Simulate Error" : "Simulate Success"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#ffffff",
            borderRadius: "999px",
            padding: "4px 10px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <RefreshCw size={12} /> Reset
        </button>
      </div>

      {/* Reusable OTP Verification Component */}
      <OTPVerification
        key={key}
        onVerify={handleVerify}
        title="Let's verify your number"
        subtitle="We've sent a 4-digit code to your phone. It'll auto-verify once entered."
        successTitle="Verified Successfully"
        successSubtitle="Your number has been verified."
        badgeText="Verified and Secure"
      />
    </div>
  );
}
