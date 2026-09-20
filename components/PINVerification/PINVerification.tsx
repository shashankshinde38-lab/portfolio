"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockKeyhole, AlertCircle } from "lucide-react";
import { PINVerificationProps, VerificationState, VerifyResult } from "./types";
import { PINVerificationRing } from "./PINVerificationRing";
import { PINSuccessCheck } from "./PINSuccessCheck";
import { PINParticleBurst } from "./PINParticleBurst";
import "./pin-verification.css";

export function PINVerification({
  onVerify,
  onSuccess,
  title = "Enter Security PIN",
  subtitle = "Enter your 6-digit access PIN to verify your identity.",
  successTitle = "Verified Successfully",
  successSubtitle = "Your PIN has been verified.",
  badgeText = "Verified and Secure",
  autoFocus = true,
  className = "",
}: PINVerificationProps) {
  // 6-digit PIN state
  const [pin, setPin] = useState<string[]>(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [verificationState, setVerificationState] = useState<VerificationState>("input");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showParticles, setShowParticles] = useState<boolean>(false);
  const [showSuccessHeading, setShowSuccessHeading] = useState<boolean>(false);
  const [showSuccessDesc, setShowSuccessDesc] = useState<boolean>(false);
  const [showBadge, setShowBadge] = useState<boolean>(false);

  // References to the 6 input elements and cleanup timers
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

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && verificationState === "input") {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, verificationState]);

  // Coordinate Calculations:
  // 1. Horizontal Row: center is between index 2 and 3
  const getHorizontalPos = (index: number) => {
    const spacing = 52; // Distance between centers of adjacent boxes
    return {
      x: (index - 2.5) * spacing,
      y: 0,
    };
  };

  // 2. Circular 60° Formation:
  // angle = (index * 360) / 6 - 90
  // x = radius * cos(angle), y = radius * sin(angle)
  const getCircularPos = (index: number) => {
    const radius = 65;
    const angle = (index * 360) / 6 - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
    };
  };

  // Calculate box position based on current verification state
  const getBoxTarget = (index: number): { x: number; y: number; scale: number; opacity: number } => {
    if (verificationState === "input") {
      const { x, y } = getHorizontalPos(index);
      return {
        x,
        y,
        scale: 1,
        opacity: 1,
      };
    }

    if (verificationState === "forming-circle" || verificationState === "verifying" || verificationState === "error") {
      const { x, y } = getCircularPos(index);
      return {
        x,
        y,
        scale: 1,
        opacity: verificationState === "verifying" ? 0.75 : 1,
      };
    }

    if (verificationState === "success") {
      // STEP 6: Digits collapse toward center
      const { x, y } = getCircularPos(index);
      return {
        x: x * 0.15,
        y: y * 0.15,
        scale: 0.2,
        opacity: 0,
      };
    }

    const { x, y } = getHorizontalPos(index);
    return { x, y, scale: 1, opacity: 1 };
  };

  // Handle single digit entry & advance
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

    if (digit) {
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    }

    // When 6th digit is entered, automatically trigger verification flow
    if (digit && nextPin.every((d) => d !== "")) {
      executeVerificationFlow(nextPin.join(""));
    }
  };

  // Keyboard navigation: Backspace, Left/Right arrows
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

  // Paste handling
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
      executeVerificationFlow(nextPin.join(""));
    }
  };

  // Master Verification Sequence Orchestrator
  const executeVerificationFlow = async (fullPin: string) => {
    // 1. Immediately invoke API in parallel
    const apiPromise: Promise<VerifyResult> = Promise.resolve().then(async () => {
      try {
        return await onVerify(fullPin);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Verification failed.";
        return { success: false, message: msg };
      }
    });

    // STEP 1: Keep completed PIN visible for ~250ms
    await sleep(250);

    // STEP 2: Transform from horizontal row into circle (duration: 0.6s)
    setVerificationState("forming-circle");
    await sleep(600);

    // STEP 3: Verification ring draws (duration: 0.7s)
    setVerificationState("verifying");
    await sleep(700);

    // STEP 4: Scanning effect — ring rotation & traveling bead (duration: 0.95s)
    setIsScanning(true);
    await sleep(950);
    setIsScanning(false);

    // STEP 5: Await API verification result
    const result = await apiPromise;

    if (result.success) {
      // =======================================================================
      // SUCCESS TRANSITION
      // =======================================================================
      // STEP 6: Digits collapse toward center (scale 0.2, opacity 0), ring turns green
      setVerificationState("success");

      // STEP 7: Green checkmark appears in center and draws (duration: 0.4s)
      await sleep(450);

      // STEP 8: Particle burst fires around circle (24 particles)
      setShowParticles(true);

      // STEP 9: Staggered success message reveals
      safeTimeout(() => setShowSuccessHeading(true), 100);
      safeTimeout(() => setShowSuccessDesc(true), 250);
      safeTimeout(() => setShowBadge(true), 450);

      // Remove particles after burst completes and invoke onSuccess
      safeTimeout(() => {
        setShowParticles(false);
        if (onSuccess) onSuccess();
      }, 1100);
    } else {
      // =======================================================================
      // ERROR RECOVERY TRANSITION
      // =======================================================================
      // Change ring to red, animate subtle shake, display error
      setVerificationState("error");
      setErrorMessage(result.message || "Incorrect PIN. Please try again.");

      // Wait 750ms so user sees the red error feedback
      await sleep(750);

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
    <div className={`pin-verification-root ${className}`}>
      {/* Top ambient orange lighting */}
      <div className="pin-ambient-glow" aria-hidden="true" />

      <div className="pin-card">
        {/* Dynamic Header */}
        <div className="pin-header">
          <div className="pin-kicker">
            <span className="pin-kicker-text">Security Verification</span>
            <span className="pin-kicker-badge">PIN</span>
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
                <h1 className="pin-title">{successTitle}</h1>
                <motion.p
                  className="pin-subtitle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{
                    opacity: showSuccessDesc ? 1 : 0,
                    y: showSuccessDesc ? 0 : 6,
                  }}
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
                <h1 className="pin-title">{title}</h1>
                <p className="pin-subtitle">{subtitle}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Central Animation Stage */}
        <div className="pin-stage-container">
          <div className="pin-stage-anchor" onPaste={handlePaste}>
            {/* SVG Verification Ring with Path Drawing and 360° Scanning */}
            <PINVerificationRing
              state={verificationState}
              isScanning={isScanning}
            />

            {/* Central Success State Emblem & Checkmark */}
            {verificationState === "success" && (
              <>
                <PINSuccessCheck />
                {showParticles && <PINParticleBurst count={24} />}
              </>
            )}

            {/* The 6 PIN Digit Boxes — Physical Flight between Row and Circle */}
            {pin.map((digit, idx) => {
              const target = getBoxTarget(idx);
              const isActive = verificationState === "input" && focusedIndex === idx;
              const isFilled = digit !== "";
              const isError = verificationState === "error";

              return (
                <motion.div
                  key={`pin-box-${idx}`}
                  className={`pin-digit-box ${isCircularStage ? "is-circular" : ""} ${
                    isActive ? "is-active" : ""
                  } ${isFilled ? "is-filled" : ""} ${isError ? "is-error" : ""}`}
                  initial={false}
                  animate={{
                    x: target.x,
                    y: target.y,
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
                      type="password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={2}
                      disabled={verificationState !== "input"}
                      autoComplete="one-time-code"
                      aria-label={`PIN digit ${idx + 1} of 6`}
                      className="pin-input-field"
                      value={digit}
                      onFocus={(e) => {
                        setFocusedIndex(idx);
                        e.target.select();
                      }}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                    />
                  ) : (
                    <span className="pin-digit-display">
                      {digit ? "•" : ""}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="pin-error-banner" role="alert">
            <AlertCircle size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Footer actions */}
        <div className="pin-footer">
          <AnimatePresence mode="wait">
            {verificationState === "success" ? (
              <motion.div
                key="secure-badge"
                className="pin-verified-secure-badge"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: showBadge ? 1 : 0,
                  y: showBadge ? 0 : 12,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <LockKeyhole size={15} className="pin-lock-icon" />
                <span>{badgeText}</span>
              </motion.div>
            ) : (
              <motion.div
                key="input-footer"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {pin.some((d) => d !== "") && verificationState === "input" && (
                  <button
                    type="button"
                    className="pin-clear-btn"
                    onClick={() => {
                      setPin(["", "", "", "", "", ""]);
                      setErrorMessage("");
                      setFocusedIndex(0);
                      inputRefs.current[0]?.focus();
                    }}
                  >
                    Clear PIN
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
