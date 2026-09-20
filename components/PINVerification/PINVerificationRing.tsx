"use client";

import { motion } from "framer-motion";
import { VerificationState } from "./types";

interface PINVerificationRingProps {
  state: VerificationState;
  isScanning: boolean;
  onScanComplete?: () => void;
}

export function PINVerificationRing({
  state,
  isScanning,
  onScanComplete,
}: PINVerificationRingProps) {
  // Only display once we reach forming-circle or beyond
  if (state === "input") return null;

  // Determine ring stroke color based on state
  const ringColor =
    state === "success"
      ? "#22c55e"
      : state === "error"
      ? "#ef4444"
      : "#f97316";

  const glowId =
    state === "success"
      ? "url(#pinGreenGlow)"
      : state === "error"
      ? "url(#pinRedGlow)"
      : "url(#pinOrangeGlow)";

  return (
    <div className="pin-ring-container" aria-hidden="true">
      <motion.svg
        viewBox="0 0 220 220"
        className="pin-ring-svg"
        animate={
          state === "error"
            ? { x: [0, -5, 5, -4, 4, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.4 }}
      >
        <defs>
          {/* Orange glow filter */}
          <filter id="pinOrangeGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Green glow filter */}
          <filter id="pinGreenGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red glow filter */}
          <filter id="pinRedGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Scanning bead trail gradient */}
          <linearGradient id="pinScannerHead" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Faint subtle background guide ring */}
        <circle
          cx="110"
          cy="110"
          r="86"
          fill="none"
          stroke="rgba(255, 255, 255, 0.07)"
          strokeWidth="1.5"
        />

        {/* STEP 3: Animate circular verification ring drawing */}
        <motion.circle
          cx="110"
          cy="110"
          r="86"
          fill="none"
          stroke={ringColor}
          strokeWidth="2"
          strokeLinecap="round"
          filter={glowId}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
        />

        {/* STEP 4: Scanning effect — ring rotation & traveling glowing bead */}
        {isScanning && state === "verifying" && (
          <motion.g
            style={{ originX: "110px", originY: "110px" }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.95,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onAnimationComplete={onScanComplete}
          >
            {/* Glowing bead traveling along circumference */}
            <circle
              cx="110"
              cy="24"
              r="4.5"
              fill="#ffffff"
              filter="url(#pinOrangeGlow)"
            />
            <circle
              cx="110"
              cy="24"
              r="8"
              fill="rgba(249, 115, 22, 0.45)"
            />

            {/* Glowing sweep trail arc behind the bead */}
            <path
              d="M 110 24 A 86 86 0 0 0 65 38"
              fill="none"
              stroke="url(#pinScannerHead)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
}
