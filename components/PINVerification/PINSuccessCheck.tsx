"use client";

import { motion } from "framer-motion";

interface PINSuccessCheckProps {
  onCheckmarkComplete?: () => void;
}

export function PINSuccessCheck({ onCheckmarkComplete }: PINSuccessCheckProps) {
  return (
    <div className="pin-success-check-wrapper" aria-hidden="true">
      {/* Soft emerald ambient aura */}
      <motion.div
        className="pin-success-glow-aura"
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.3, 1], opacity: [0, 0.75, 0.5] }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      />

      {/* STEP 7: Green rounded success container */}
      <motion.div
        className="pin-success-icon-box"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <svg
          viewBox="0 0 52 52"
          className="pin-success-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle inner decorative circle */}
          <motion.circle
            cx="26"
            cy="26"
            r="21"
            stroke="rgba(34, 197, 94, 0.35)"
            strokeWidth="1.5"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />

          {/* Animated SVG white checkmark path */}
          <motion.path
            d="M15 26.5 L23 34.5 L37 18.5"
            stroke="#ffffff"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={onCheckmarkComplete}
          />
        </svg>
      </motion.div>
    </div>
  );
}
