"use client";

import { motion } from "framer-motion";
import { AdminVerificationState } from "./types";

interface AdminVerificationRingProps {
  state: AdminVerificationState;
  isScanning: boolean;
  onScanComplete?: () => void;
}

export function AdminVerificationRing({
  state,
  isScanning,
  onScanComplete,
}: AdminVerificationRingProps) {
  if (state === "input") return null;

  const ringColor =
    state === "success"
      ? "#22c55e"
      : state === "error"
      ? "#ef4444"
      : "#f97316";

  const filterId =
    state === "success"
      ? "url(#adminRingGreenGlow)"
      : state === "error"
      ? "url(#adminRingRedGlow)"
      : "url(#adminRingOrangeGlow)";

  return (
    <div className="admin-ring-wrapper" aria-hidden="true">
      <motion.svg
        viewBox="-110 -110 220 220"
        className="admin-ring-svg"
        animate={
          state === "error"
            ? { x: [0, -6, 6, -4, 4, -2, 2, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.42 }}
      >
        <defs>
          {/* Orange glow */}
          <filter id="adminRingOrangeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Green glow */}
          <filter id="adminRingGreenGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red glow */}
          <filter id="adminRingRedGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Scanner bead trailing arc gradient */}
          <linearGradient id="adminScanTrail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Faint guide track circle */}
        <circle
          cx={0}
          cy={0}
          r={88}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1.5"
        />

        {/* STEP 3: Animate circular verification ring drawing */}
        <motion.circle
          cx={0}
          cy={0}
          r={88}
          fill="none"
          stroke={ringColor}
          strokeWidth="2"
          strokeLinecap="round"
          filter={filterId}
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
            style={{ originX: "0px", originY: "0px" }}
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
              cx={0}
              cy={-88}
              r={4.5}
              fill="#ffffff"
              filter="url(#adminRingOrangeGlow)"
            />
            <circle
              cx={0}
              cy={-88}
              r={8}
              fill="rgba(249, 115, 22, 0.5)"
            />

            {/* Glowing sweep trail arc behind the bead */}
            <path
              d="M 0 -88 A 88 88 0 0 0 -45 -75"
              fill="none"
              stroke="url(#adminScanTrail)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
}
