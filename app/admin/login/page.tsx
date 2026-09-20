"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Loader2,
  AlertCircle,
} from "lucide-react";

// 20 particles radiating outward for the green success explosion
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const angle = (i / 20) * 2 * Math.PI + (Math.random() * 0.3 - 0.15);
  const distance = 48 + Math.random() * 45; // 48px to 93px
  const tx = Math.round(Math.cos(angle) * distance);
  const ty = Math.round(Math.sin(angle) * distance);
  const size = 3 + Math.floor(Math.random() * 4); // 3px to 6px
  const delay = Math.round(Math.random() * 100);
  return { id: i, tx, ty, size, delay };
});

export default function AdminLoginPage() {
  const router = useRouter();

  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [showPin, setShowPin] = useState(false);
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle single digit change
  const handleChange = (index: number, val: string) => {
    if (status === "verifying" || status === "success") return;

    const digitsOnly = val.replace(/\D/g, "");

    // Handle paste or multiple digits
    if (digitsOnly.length > 1) {
      // If user typed into a box that had 1 digit, digitsOnly will have length 2 (old digit + new digit)
      // If length > 2, it's a paste
      if (digitsOnly.length > 2) {
        handlePasteData(digitsOnly, index);
        return;
      }
    }

    const digit = digitsOnly ? digitsOnly.slice(-1) : "";
    const nextPin = [...pin];
    nextPin[index] = digit;
    setPin(nextPin);

    if (errorMessage) setErrorMessage("");

    if (digit) {
      setAnimatingIndex(index);
      setTimeout(() => setAnimatingIndex(null), 250);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    }

    if (digit && nextPin.every((d) => d !== "")) {
      verifyPin(nextPin.join(""));
    }
  };

  // Keyboard navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (status === "verifying" || status === "success") return;

    if (e.key === "Backspace") {
      if (pin[index] !== "") {
        const nextPin = [...pin];
        nextPin[index] = "";
        setPin(nextPin);
      } else if (index > 0) {
        const nextPin = [...pin];
        nextPin[index - 1] = "";
        setPin(nextPin);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle clipboard paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (status === "verifying" || status === "success") return;

    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    handlePasteData(pasted, 0);
  };

  const handlePasteData = (pastedDigits: string, startIndex = 0) => {
    const chars = pastedDigits.slice(0, 6).split("");
    const nextPin = [...pin];
    chars.forEach((c, i) => {
      if (startIndex + i < 6) {
        nextPin[startIndex + i] = c;
      }
    });
    setPin(nextPin);

    if (errorMessage) setErrorMessage("");

    const nextFocus = Math.min(startIndex + chars.length, 5);
    inputRefs.current[nextFocus]?.focus();

    if (nextPin.every((d) => d !== "")) {
      verifyPin(nextPin.join(""));
    }
  };

  // Verify PIN with server endpoint
  const verifyPin = async (pinCode: string) => {
    if (status === "verifying") return;
    setStatus("verifying");
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinCode }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.message || "Incorrect PIN. Please try again.");

        setTimeout(() => {
          setPin(["", "", "", "", "", ""]);
          setStatus("idle");
          setFocusedIndex(0);
          inputRefs.current[0]?.focus();
        }, 900);
        return;
      }

      // Success transition matching reference video
      setStatus("success");

      setTimeout(() => {
        router.replace("/admin/dashboard");
        router.refresh();
      }, 950);
    } catch {
      setStatus("error");
      setErrorMessage("Authentication failed. Please try again.");
      setTimeout(() => {
        setPin(["", "", "", "", "", ""]);
        setStatus("idle");
        setFocusedIndex(0);
        inputRefs.current[0]?.focus();
      }, 900);
    }
  };

  return (
    <main className="admin-pin-screen" role="main">
      {/* Top subtle ambient glow matching video */}
      <div className="admin-pin-ambient-glow" aria-hidden="true" />

      <div
        className={`admin-pin-card ${status === "success" ? "is-success" : ""} ${
          status === "error" ? "is-error" : ""
        }`}
      >
        {status === "success" ? (
          /* ========================================================== */
          /* SUCCESS STATE — Recreating Reference Video 00:03 - 00:04   */
          /* ========================================================== */
          <div className="admin-pin-success-content" aria-live="polite">
            <h1 className="admin-pin-title">Verified Successfully</h1>
            <p className="admin-pin-desc success-desc">Access granted</p>

            <div className="admin-success-emblem-wrap">
              <div className="admin-success-aura" aria-hidden="true" />

              <div className="admin-success-badge" aria-hidden="true">
                <Check size={36} strokeWidth={3} className="admin-success-check-icon" />
              </div>

              <div className="admin-particle-field" aria-hidden="true">
                {PARTICLES.map((p) => (
                  <span
                    key={p.id}
                    className="admin-particle-dot"
                    style={
                      {
                        "--tx": `${p.tx}px`,
                        "--ty": `${p.ty}px`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDelay: `${p.delay}ms`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>

            <div className="admin-verified-tag">
              <LockKeyhole size={14} className="admin-verified-tag-icon" />
              <span>Verified and Secure</span>
            </div>
          </div>
        ) : (
          /* ========================================================== */
          /* DEFAULT & VERIFYING & ERROR STATE — 6 PIN BOXES            */
          /* ========================================================== */
          <div className="admin-pin-form-content">
            <div className="admin-pin-header">
              <span className="admin-pin-kicker">ADMIN ACCESS</span>
              <h1 className="admin-pin-title">Let&apos;s verify your access</h1>
              <p className="admin-pin-desc">Enter your 6-digit security PIN to continue.</p>
            </div>

            {/* 6 Individual PIN Boxes */}
            <div
              className={`admin-pin-grid ${status === "error" ? "admin-pin-shake" : ""}`}
              onPaste={handlePaste}
            >
              {pin.map((digit, idx) => {
                const isPop = animatingIndex === idx;
                const isFilled = digit !== "";
                const isCurrentActive = status !== "verifying" && focusedIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`admin-pin-box ${isFilled ? "is-filled" : ""} ${
                      isCurrentActive ? "is-active" : ""
                    } ${isPop ? "is-popping" : ""} ${status === "error" ? "is-error-box" : ""}`}
                    onClick={() => {
                      inputRefs.current[idx]?.focus();
                      inputRefs.current[idx]?.select();
                    }}
                  >
                    <input
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type={showPin ? "text" : "password"}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      disabled={status === "verifying"}
                      autoComplete="one-time-code"
                      aria-label={`Security PIN digit ${idx + 1} of 6`}
                      className="admin-pin-input-field"
                      value={digit}
                      onFocus={(e) => {
                        setFocusedIndex(idx);
                        e.target.select();
                      }}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Loading / Error status */}
            <div className="admin-pin-status-area" aria-live="polite">
              {status === "verifying" && (
                <div className="admin-pin-verifying-row">
                  <Loader2 size={16} className="admin-pin-spinner" />
                  <span>Verifying PIN…</span>
                </div>
              )}

              {status === "error" && errorMessage && (
                <div className="admin-pin-error-row" role="alert">
                  <AlertCircle size={15} className="admin-pin-error-icon" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Mask / Unmask toggle */}
            <div className="admin-pin-actions">
              <button
                type="button"
                className="admin-pin-eye-toggle"
                onClick={() => setShowPin((prev) => !prev)}
                aria-label={showPin ? "Mask PIN digits" : "Show PIN digits"}
                disabled={status === "verifying"}
              >
                {showPin ? <EyeOff size={15} /> : <Eye size={15} />}
                <span>{showPin ? "Hide digits" : "Show digits"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Back to Portfolio navigation link */}
      <a href="/" className="admin-pin-back-link">
        <ArrowLeft size={14} /> Back to portfolio
      </a>
    </main>
  );
}