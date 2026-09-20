"use client";

import { motion } from "framer-motion";

interface VerificationConnectionsProps {
  isVisible: boolean;
}

export function VerificationConnections({ isVisible }: VerificationConnectionsProps) {
  if (!isVisible) return null;

  // Normalized coordinate paths connecting the 4 centers of the 2x2 grid:
  // Box 1 (Top-Left): (25, 25)
  // Box 2 (Top-Right): (75, 25)
  // Box 3 (Bottom-Left): (25, 75)
  // Box 4 (Bottom-Right): (75, 75)
  const paths = [
    { d: "M 25 25 L 75 25", delay: 0 }, // Top horizontal
    { d: "M 25 25 L 25 75", delay: 0.05 }, // Left vertical
    { d: "M 25 25 L 75 75", delay: 0.1 }, // Main diagonal
    { d: "M 75 25 L 75 75", delay: 0.12 }, // Right vertical
    { d: "M 25 75 L 75 75", delay: 0.15 }, // Bottom horizontal
  ];

  return (
    <div className="otp-connections-overlay" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        className="otp-connections-svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="otpLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.85" />
          </linearGradient>
          <filter id="otpGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((p, idx) => (
          <motion.path
            key={idx}
            d={p.d}
            fill="none"
            stroke="url(#otpLineGlow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 2"
            filter="url(#otpGlowFilter)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.38,
              delay: p.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Pulsing connection nodes at the 4 centers */}
        {[
          { cx: 25, cy: 25 },
          { cx: 75, cy: 25 },
          { cx: 25, cy: 75 },
          { cx: 75, cy: 75 },
        ].map((pt, idx) => (
          <motion.circle
            key={`dot-${idx}`}
            cx={pt.cx}
            cy={pt.cy}
            r="3"
            fill="#38bdf8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
}
