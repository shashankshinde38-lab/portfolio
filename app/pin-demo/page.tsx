"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck, Bug, KeyRound } from "lucide-react";
import { PINVerification } from "@/components/PINVerification";

export default function PINDemoPage() {
  const [shouldFail, setShouldFail] = useState(false);
  const [key, setKey] = useState(0);

  const handleVerify = async (pinCode: string) => {
    // Simulate real network delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (shouldFail) {
      return { success: false, message: "Incorrect PIN. Please try again." };
    }

    return { success: true };
  };

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#08090d" }}>
      {/* Top Demo Control Floating Bar */}
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
          background: "rgba(17, 20, 29, 0.88)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          padding: "8px 18px",
          borderRadius: "999px",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6)",
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
            paddingRight: "10px",
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <ArrowLeft size={13} /> Portfolio
        </Link>

        <Link
          href="/admin/login"
          style={{
            color: "#94a3b8",
            fontSize: "12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
            paddingRight: "10px",
            borderRight: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <KeyRound size={13} /> Admin Login
        </Link>

        {/* Simulation toggle */}
        <button
          type="button"
          onClick={() => setShouldFail(!shouldFail)}
          style={{
            background: shouldFail ? "rgba(239, 68, 68, 0.18)" : "rgba(34, 197, 94, 0.18)",
            border: `1px solid ${shouldFail ? "rgba(239, 68, 68, 0.45)" : "rgba(34, 197, 94, 0.45)"}`,
            color: shouldFail ? "#fca5a5" : "#86efac",
            borderRadius: "999px",
            padding: "5px 12px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
        >
          {shouldFail ? <Bug size={13} /> : <ShieldCheck size={13} />}
          Mode: {shouldFail ? "Simulate Error" : "Simulate Success"}
        </button>

        {/* Reset button */}
        <button
          type="button"
          onClick={handleReset}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            color: "#ffffff",
            borderRadius: "999px",
            padding: "5px 12px",
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

      {/* 6-Digit PIN Verification Component */}
      <PINVerification
        key={key}
        onVerify={handleVerify}
        title="Admin PIN Verification"
        subtitle="Enter any 6 digits to test the reference animation."
        successTitle="Verified Successfully"
        successSubtitle="Your PIN has been verified."
        badgeText="Verified and Secure"
      />
    </div>
  );
}
