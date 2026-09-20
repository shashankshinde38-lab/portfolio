"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, AlertCircle } from "lucide-react";
import { OTPVerificationProps, VerificationState } from "./types";
import { VerificationConnections } from "./VerificationConnections";
import { SuccessCheck } from "./SuccessCheck";
import { ParticleBurst } from "./ParticleBurst";
import "./otp-verification.css";

export function OTPVerification({
  onVerify,
  onSuccess,
  title = "Let's verify your number",
  subtitle = "We've sent a 4-digit code to your phone. It'll auto-verify once entered.",
  successTitle = "Verified Successfully",
  successSubtitle = "Your number has been verified.",
  badgeText = "Verified and Secure",
  autoFocus = true,
  className = "",
}: OTPVerificationProps) {
  // 4-digit OTP state
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [verificationState, setVerificationState] = useState<VerificationState>("input");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isErrorShake, setIsErrorShake] = useState<boolean>(false);
  const [showParticles, setShowParticles] = useState<boolean>(false);
  const [showSuccessText, setShowSuccessText] = useState<boolean>(false);
  const [showSuccessDesc, setShowSuccessDesc] = useState<boolean>(false);
  const [showBadge, setShowBadge] = useState<boolean>(false);

  // References to the 4 input elements
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && verificationState === "input") {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, verificationState]);

  // Handle single digit entry & advance
  const handleChange = (index: number, val: string) => {
    if (verificationState !== "input") return;

    const numericOnly = val.replace(/\D/g, "");

    // Handle paste of multiple digits
    if (numericOnly.length > 1) {
      handlePasteDigits(numericOnly, index);
      return;
    }

    const digit = numericOnly ? numericOnly.slice(-1) : "";
    const next = [...digits];
    next[index] = digit;
    setDigits(next);

    if (errorMessage) setErrorMessage("");

    if (digit) {
      // Auto-advance to next input
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    }

    // When all 4 digits are entered, trigger verification
    if (digit && next.every((d) => d !== "")) {
      executeVerification(next.join(""));
    }
  };

  // Keyboard navigation: Backspace, Left/Right arrows
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (verificationState !== "input") return;

    if (e.key === "Backspace") {
      if (digits[index] !== "") {
        const next = [...digits];
        next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        const next = [...digits];
        next[index - 1] = "";
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Clipboard paste handler
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (verificationState !== "input") return;

    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;

    handlePasteDigits(pasted, 0);
  };

  const handlePasteDigits = (pasted: string, startIdx = 0) => {
    const chars = pasted.slice(0, 4).split("");
    const next = [...digits];
    chars.forEach((c, i) => {
      if (startIdx + i < 4) {
        next[startIdx + i] = c;
      }
    });
    setDigits(next);
    if (errorMessage) setErrorMessage("");

    const targetFocus = Math.min(startIdx + chars.length, 3);
    inputRefs.current[targetFocus]?.focus();

    if (next.every((d) => d !== "")) {
      executeVerification(next.join(""));
    }
  };

  // Verification & Sequencing Logic matching specified timeline
  const executeVerification = async (otpCode: string) => {
    let isSuccess = true;
    let customError = "Invalid verification code. Please try again.";

    if (onVerify) {
      try {
        const res = await onVerify(otpCode);
        isSuccess = res.success;
        if (res.message) customError = res.message;
      } catch {
        isSuccess = false;
      }
    }

    if (!isSuccess) {
      // Failed verification: error shake + red highlight
      setIsErrorShake(true);
      setErrorMessage(customError);

      setTimeout(() => {
        setIsErrorShake(false);
        setDigits(["", "", "", ""]);
        setFocusedIndex(0);
        inputRefs.current[0]?.focus();
      }, 850);
      return;
    }

    // =========================================================================
    // EXACT ANIMATION TIMELINE AS SPECIFIED:
    // 0ms: API success
    // 100ms: OTP layout transformation starts (horizontal -> 2x2)
    // 700ms: 2x2 layout complete
    // 800ms: SVG connector paths start drawing
    // 1200ms: Connections complete
    // 1350ms: OTP grid begins compressing (scale 1 -> 0.75, opacity 1 -> 0)
    // 1650ms: Grid disappears
    // 1700ms: Green success container appears
    // 1900ms: Checkmark starts drawing
    // 2150ms: Checkmark finishes & particle burst fires
    // 2250ms: "Verified Successfully" appears
    // 2450ms: Description appears
    // 2700ms: "Verified and Secure" appears
    // 3200ms: Particles disappear
    // =========================================================================

    // 100ms: Begin rearranging to 2x2
    setTimeout(() => {
      setVerificationState("rearranging");
    }, 100);

    // 800ms: Draw connector lines
    setTimeout(() => {
      setVerificationState("connecting");
    }, 800);

    // 1350ms: Compress toward center
    setTimeout(() => {
      setVerificationState("processing");
    }, 1350);

    // 1700ms: Switch to success state (displays green checkmark container)
    setTimeout(() => {
      setVerificationState("success");
    }, 1700);

    // 2150ms: Trigger particle burst
    setTimeout(() => {
      setShowParticles(true);
    }, 2150);

    // 2250ms: Show "Verified Successfully" heading
    setTimeout(() => {
      setShowSuccessText(true);
    }, 2250);

    // 2450ms: Show description text
    setTimeout(() => {
      setShowSuccessDesc(true);
    }, 2450);

    // 2700ms: Show "Verified and Secure" badge
    setTimeout(() => {
      setShowBadge(true);
    }, 2700);

    // 3200ms: Remove particles
    setTimeout(() => {
      setShowParticles(false);
      if (onSuccess) onSuccess();
    }, 3200);
  };

  const isGridFormation =
    verificationState === "rearranging" ||
    verificationState === "connecting" ||
    verificationState === "processing";

  return (
    <div className={`otp-verification-root ${className}`}>
      {/* Top ambient orange lighting matching reference video */}
      <div className="otp-ambient-glow" aria-hidden="true" />

      <div className="otp-card">
        {/* Dynamic Header */}
        <div className="otp-header">
          <div className="otp-kicker">
            <span className="otp-kicker-text">Otp Verification</span>
            <span className="otp-kicker-badge">V7</span>
          </div>

          <AnimatePresence mode="wait">
            {verificationState === "success" ? (
              <motion.div
                key="success-headers"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: showSuccessText ? 1 : 0, y: showSuccessText ? 0 : 10, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="otp-title">{successTitle}</h1>
                <motion.p
                  className="otp-subtitle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: showSuccessDesc ? 1 : 0, y: showSuccessDesc ? 0 : 6 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {successSubtitle}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="input-headers"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="otp-title">{title}</h1>
                <p className="otp-subtitle">{subtitle}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Central Animation Stage */}
        <div className="otp-stage-container">
          <AnimatePresence mode="wait">
            {verificationState === "success" ? (
              /* ====================================================== */
              /* SUCCESS EMBLEM & CHECKMARK & PARTICLES                 */
              /* ====================================================== */
              <motion.div
                key="success-emblem"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: "relative" }}
              >
                <SuccessCheck />
                {showParticles && <ParticleBurst count={28} />}
              </motion.div>
            ) : (
              /* ====================================================== */
              /* OTP 4 BOXES — PHYSICAL FLIP TRANSITION ROW -> 2x2 GRID */
              /* ====================================================== */
              <motion.div
                key="otp-boxes-wrapper"
                className={`otp-boxes-container ${
                  isGridFormation ? "layout-grid" : "layout-row"
                }`}
                animate={
                  verificationState === "processing"
                    ? {
                        scale: 0.75,
                        opacity: 0,
                        filter: "blur(3px)",
                        transition: { duration: 0.35, ease: "easeInOut" },
                      }
                    : { scale: 1, opacity: 1, filter: "blur(0px)" }
                }
                onPaste={handlePaste}
              >
                {/* SVG Connections Overlay drawn when in 2x2 formation */}
                <VerificationConnections isVisible={verificationState === "connecting"} />

                {digits.map((digit, idx) => {
                  const isFilled = digit !== "";
                  const isActive =
                    verificationState === "input" && focusedIndex === idx;

                  return (
                    <motion.div
                      key={`otp-box-${idx}`}
                      layout
                      layoutId={`otp-box-${idx}`}
                      transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`otp-digit-box ${isActive ? "is-active" : ""} ${
                        isFilled ? "is-filled" : ""
                      } ${isErrorShake ? "is-error" : ""}`}
                      animate={
                        isErrorShake
                          ? {
                              x: [0, -8, 8, -6, 6, -3, 3, 0],
                              transition: { duration: 0.42 },
                            }
                          : {}
                      }
                      onClick={() => {
                        if (verificationState === "input") {
                          inputRefs.current[idx]?.focus();
                          inputRefs.current[idx]?.select();
                        }
                      }}
                    >
                      <input
                        ref={(el) => {
                          inputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={2}
                        disabled={verificationState !== "input"}
                        autoComplete="one-time-code"
                        aria-label={`Digit ${idx + 1} of 4`}
                        className="otp-input-field"
                        value={digit}
                        onFocus={(e) => {
                          setFocusedIndex(idx);
                          e.target.select();
                        }}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error message if verification fails */}
        {errorMessage && (
          <div className="otp-error-banner" role="alert">
            <AlertCircle size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Footer actions */}
        <div className="otp-footer">
          <AnimatePresence mode="wait">
            {verificationState === "success" ? (
              <motion.div
                key="secure-badge"
                className="otp-verified-secure-badge"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: showBadge ? 1 : 0, y: showBadge ? 0 : 12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <LockKeyhole size={15} className="otp-lock-icon" />
                <span>{badgeText}</span>
              </motion.div>
            ) : (
              <motion.p
                key="resend-text"
                className="otp-resend-prompt"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Didn&apos;t receive the code?
                <button
                  type="button"
                  className="otp-resend-btn"
                  onClick={() => {
                    setDigits(["", "", "", ""]);
                    setErrorMessage("");
                    setFocusedIndex(0);
                    inputRefs.current[0]?.focus();
                  }}
                >
                  Resend
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
