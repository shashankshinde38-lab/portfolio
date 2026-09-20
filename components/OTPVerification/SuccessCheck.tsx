"use client";

import { motion } from "framer-motion";

interface SuccessCheckProps {
  onCheckmarkComplete?: () => void;
}

export function SuccessCheck({ onCheckmarkComplete }: SuccessCheckProps) {
  return (
    <div className="otp-success-check-wrapper" aria-hidden="true">
      {/* Expanding green radial ambient glow */}
      <motion.div
        className="otp-success-glow"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.25, 1], opacity: [0, 0.8, 0.6] }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      {/* Rounded-square green container */}
      <motion.div
        className="otp-success-icon-box"
        initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <svg
          viewBox="0 0 52 52"
          className="otp-success-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle circle halo inside box */}
          <motion.circle
            cx="26"
            cy="26"
            r="22"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="1.5"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
          />

          {/* Animated SVG Checkmark */}
          <motion.path
            d="M15 26.5 L23 34.5 L37 18.5"
            stroke="#ffffff"
            strokeWidth="3.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.35,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={onCheckmarkComplete}
          />
        </svg>
      </motion.div>
    </div>
  );
}
