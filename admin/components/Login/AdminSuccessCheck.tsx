"use client";

import { motion } from "framer-motion";

interface AdminSuccessCheckProps {
  onCheckmarkComplete?: () => void;
}

export function AdminSuccessCheck({
  onCheckmarkComplete,
}: AdminSuccessCheckProps) {
  return (
    <div
      className="admin-success-check-wrapper"
      aria-hidden="true"
    >
      {/* ======================================
          GREEN AMBIENT SUCCESS AURA
      ====================================== */}

      <motion.div
        className="admin-success-glow-aura"
        initial={{
          scale: 0.35,
          opacity: 0,
        }}
        animate={{
          scale: [
            0.35,
            1.35,
            1,
          ],

          opacity: [
            0,
            0.8,
            0.55,
          ],
        }}
        transition={{
          duration: 0.6,

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      />

      {/* ======================================
          MAIN GREEN SUCCESS BADGE
      ====================================== */}

      <motion.div
        className="admin-success-icon-badge"
        initial={{
          scale: 0.45,
          opacity: 0,
        }}
        animate={{
          scale: [
            0.45,
            1.08,
            1,
          ],

          opacity: 1,
        }}
        transition={{
          duration: 0.48,

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      >
        <svg
          viewBox="0 0 52 52"
          className="admin-success-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ==================================
              SUBTLE INNER CIRCLE
          ================================== */}

          <motion.circle
            cx="26"
            cy="26"
            r="21"
            stroke="rgba(255,255,255,0.20)"
            strokeWidth="1.4"
            fill="none"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.35,
              delay: 0.08,
              ease: "easeOut",
            }}
          />

          {/* ==================================
              WHITE CHECKMARK DRAW
          ================================== */}

          <motion.path
            d="
              M 15 26.5
              L 23 34.5
              L 37 18.5
            "
            stroke="#ffffff"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.42,
              delay: 0.2,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            onAnimationComplete={
              onCheckmarkComplete
            }
          />
        </svg>
      </motion.div>
    </div>
  );
}