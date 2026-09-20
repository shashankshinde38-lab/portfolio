"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, LockKeyhole, AlertCircle, Eye, EyeOff } from "lucide-react";
import { AdminVerificationState } from "./components/types";
import { AdminVerificationRing } from "./components/AdminVerificationRing";
import { AdminSuccessCheck } from "./components/AdminSuccessCheck";
import { AdminParticleBurst } from "./components/AdminParticleBurst";

export default function AdminLoginPage() {
  const router = useRouter();

  // 6-digit PIN state
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [verificationState, setVerificationState] = useState<AdminVerificationState>("input");
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showParticles, setShowParticles] = useState<boolean>(false);
  const [showSuccessHeading, setShowSuccessHeading] = useState<boolean>(false);
  const [showSuccessDesc, setShowSuccessDesc] = useState<boolean>(false);
  const [showBadge, setShowBadge] = useState<boolean>(false);

  // References and cleanup timers
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const safeTimeout = useCallback((fn: () => void, delayMs: number) => {
    const t = setTimeout(fn, delayMs);
    timeoutsRef.current.push(t);
    return t;
  }, []);

  const sleep = useCallback(
    (delayMs: number) => {
      return new Promise<void>((resolve) => {
        safeTimeout(() => resolve(), delayMs);
      });
    },
    [safeTimeout]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // Autofocus box 0
  useEffect(() => {
    if (verificationState === "input") {
      inputRefs.current[0]?.focus();
    }
  }, [verificationState]);

  // Coordinate Calculations:
  // 1. Horizontal Row: centers spaced by 52px, centered around 0
  const getHorizontalPos = (index: number) => {
    const spacing = 52;
    return {
      x: (index - 2.5) * spacing,
      y: 0,
    };
  };

  // 2. Circular 60° Formation:
  // angle = (index * 360) / 6 - 90
  // x = radius * cos(angle), y = radius * sin(angle)
  // radius = 66px
  const getCircularPos = (index: number) => {
    const radius = 66;
    const angle = (index * 360) / 6 - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
    };
  };

  // Target coordinates and dimensions for each box based on state
  const getBoxTarget = (index: number) => {
    if (verificationState === "input") {
      const { x, y } = getHorizontalPos(index);
      return {
        x,
        y,
        width: 48,
        height: 56,
        borderRadius: 14,
        scale: 1,
        opacity: 1,
      };
    }

    if (
      verificationState === "forming-circle" ||
      verificationState === "verifying" ||
      verificationState === "error"
    ) {
      const { x, y } = getCircularPos(index);
      return {
        x,
        y,
        width: 42,
        height: 42,
        borderRadius: 21,
        scale: 1,
        opacity: verificationState === "verifying" ? 0.8 : 1,
      };
    }

    if (verificationState === "success") {
      // STEP 6: Digits collapse toward center
      const { x, y } = getCircularPos(index);
      return {
        x: x * 0.15,
        y: y * 0.15,
        width: 30,
        height: 30,
        borderRadius: 15,
        scale: 0.2,
        opacity: 0,
      };
    }

    const { x, y } = getHorizontalPos(index);
    return {
      x,
      y,
      width: 48,
      height: 56,
      borderRadius: 14,
      scale: 1,
      opacity: 1,
    };
  };

  // Handle single digit change
  const handleChange = (index: number, val: string) => {
    if (verificationState !== "input") return;

    const digitsOnly = val.replace(/\D/g, "");

    // Handle paste of multiple digits
    if (digitsOnly.length > 1) {
      handlePasteData(digitsOnly, index);
      return;
    }

    const digit = digitsOnly ? digitsOnly.slice(-1) : "";
    const nextPin = [...pin];
    nextPin[index] = digit;
    setPin(nextPin);

    if (errorMessage) setErrorMessage("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }

    // Automatically trigger verification when 6th digit is entered
    if (digit && nextPin.every((d) => d !== "")) {
      executeVerification(nextPin.join(""));
    }
  };

  // Keyboard navigation: Backspace & Arrow keys
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (verificationState !== "input") return;

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

  // Clipboard paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (verificationState !== "input") return;

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
      executeVerification(nextPin.join(""));
    }
  };

  // Master Verification Sequence Orchestrator
  const executeVerification = async (pinCode: string) => {
    // 1. Immediately invoke real API in background
    const apiPromise = fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin: pinCode }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        return { ok: res.ok, data };
      })
      .catch(() => ({
        ok: false,
        data: { message: "Authentication service unavailable. Please try again." },
      }));

    // STEP 1: Keep completed PIN visible in horizontal layout for ~250ms
    await sleep(250);

    // STEP 2: Physical glide into 60° circular arrangement (duration: 0.6s)
    setVerificationState("forming-circle");
    await sleep(600);

    // STEP 3: Circular verification ring draws around 6 digits (duration: 0.7s)
    setVerificationState("verifying");
    await sleep(700);

    // STEP 4: Scanning effect — ring rotation & traveling glowing bead (duration: 0.95s)
    setIsScanning(true);
    await sleep(950);
    setIsScanning(false);

    // STEP 5: Await API verification confirmation
    const { ok, data } = await apiPromise;

    if (ok) {
      // =======================================================================
      // SUCCESS TRANSITION (PIN: 752002)
      // =======================================================================
      // STEP 6: Digits collapse toward center (scale 0.2, opacity 0), ring turns green
      setVerificationState("success");

      // STEP 7: Green checkmark appears in center and draws (duration: 0.4s)
      await sleep(450);

      // STEP 8: Particle burst fires around circle (24 green particles)
      setShowParticles(true);

      // STEP 9: Staggered success message reveals
      safeTimeout(() => setShowSuccessHeading(true), 100);
      safeTimeout(() => setShowSuccessDesc(true), 250);
      safeTimeout(() => setShowBadge(true), 450);

      // Smooth redirect to admin dashboard
      safeTimeout(() => {
        router.replace("/admin/dashboard");
        router.refresh();
      }, 1100);
    } else {
      // =======================================================================
      // ERROR RECOVERY TRANSITION (Incorrect PIN)
      // =======================================================================
      // Change ring to red, animate subtle shake, display error
      setVerificationState("error");
      setErrorMessage(data.message || data.error || "Incorrect password. Please try again.");

      // Wait 700ms so user sees the red feedback
      await sleep(700);

      // Animate the six numbers from the circle BACK into the horizontal PIN input positions
      setVerificationState("input");
      setPin(["", "", "", "", "", ""]);
      setFocusedIndex(0);

      // Focus PIN box 1 for immediate retry
      safeTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 350);
    }
  };

  const isCircularStage =
    verificationState === "forming-circle" ||
    verificationState === "verifying" ||
    verificationState === "error";

  return (
    <main className="admin-pin-screen" role="main">
      {/* Top subtle amber ambient glow */}
      <div className="admin-pin-ambient-glow" aria-hidden="true" />

      <div className="admin-pin-card">
        {/* Header */}
        <div className="admin-pin-header">
          <div className="admin-pin-kicker">
            <span className="admin-pin-kicker-text">ADMIN ACCESS</span>
            <span className="admin-pin-kicker-badge">PIN</span>
          </div>

          <AnimatePresence mode="wait">
            {verificationState === "success" ? (
              <motion.div
                key="success-headers"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{
                  opacity: showSuccessHeading ? 1 : 0,
                  y: showSuccessHeading ? 0 : 10,
                  scale: 1,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="admin-pin-title">Verified Successfully</h1>
                <motion.p
                  className="admin-pin-desc"
                  style={{ color: "#22c55e", fontWeight: 500 }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: showSuccessDesc ? 1 : 0,
                    y: showSuccessDesc ? 0 : 6,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  Access granted. Redirecting to dashboard...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="input-headers"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="admin-pin-title">Let&apos;s verify your access</h1>
                <p className="admin-pin-desc">Enter your 6-digit security PIN to continue.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Central Animation Stage */}
        <div className="admin-pin-stage">
          <div className="admin-pin-stage-center" onPaste={handlePaste}>
            {/* SVG Verification Ring with Path Drawing, Scanner, and Colors */}
            <AdminVerificationRing
              state={verificationState}
              isScanning={isScanning}
            />

            {/* Success Emblem & Checkmark & Green Particle Burst */}
            {verificationState === "success" && (
              <>
                <AdminSuccessCheck />
                {showParticles && <AdminParticleBurst count={24} />}
              </>
            )}

            {/* The 6 PIN Digit Boxes — Physical Flight between Row and Circle */}
            {pin.map((digit, idx) => {
              const target = getBoxTarget(idx);
              const isActive = verificationState === "input" && focusedIndex === idx;
              const isFilled = digit !== "";
              const isError = verificationState === "error";

              // Display digit: if showPin is true, show digit; if false, show bullet '•' or digit
              const displayChar = digit
                ? showPin
                  ? digit
                  : isCircularStage
                  ? digit
                  : "•"
                : "";

              return (
                <motion.div
                  key={`admin-pin-box-${idx}`}
                  className={`admin-pin-box ${isActive ? "is-active" : ""} ${
                    isFilled ? "is-filled" : ""
                  } ${isError ? "is-error-box" : ""}`}
                  initial={false}
                  animate={{
                    x: target.x - target.width / 2,
                    y: target.y - target.height / 2,
                    width: target.width,
                    height: target.height,
                    borderRadius: target.borderRadius,
                    scale: target.scale,
                    opacity: target.opacity,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => {
                    if (verificationState === "input") {
                      inputRefs.current[idx]?.focus();
                      inputRefs.current[idx]?.select();
                    }
                  }}
                >
                  {verificationState === "input" ? (
                    <input
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      type={showPin ? "text" : "password"}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      disabled={verificationState !== "input"}
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
                  ) : (
                    <span className="admin-pin-digit-display">
                      {displayChar}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="admin-pin-error-banner" role="alert">
            <AlertCircle size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Footer / Actions */}
        <div className="admin-pin-footer">
          <AnimatePresence mode="wait">
            {verificationState === "success" ? (
              <motion.div
                key="secure-badge"
                className="admin-verified-secure-badge"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: showBadge ? 1 : 0,
                  y: showBadge ? 0 : 12,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <LockKeyhole size={15} className="admin-lock-icon" />
                <span>Verified and Secure</span>
              </motion.div>
            ) : (
              <motion.div
                key="input-actions"
                className="admin-pin-actions"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Mask / Unmask Toggle */}
                <button
                  type="button"
                  className="admin-pin-eye-toggle"
                  onClick={() => setShowPin((prev) => !prev)}
                  aria-label={showPin ? "Mask PIN digits" : "Show PIN digits"}
                  disabled={verificationState !== "input"}
                >
                  {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
                  <span>{showPin ? "Hide digits" : "Show digits"}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Back to Portfolio Link */}
      <Link href="/" className="admin-pin-back-link">
        <ArrowLeft size={14} /> Back to portfolio
      </Link>
    </main>
  );
}