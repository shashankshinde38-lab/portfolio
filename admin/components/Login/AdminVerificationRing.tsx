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
  if (
    state === "input" ||
    state === "forming-circle"
  ) {
    return null;
  }

  /* =========================================================
     ORBIT / VERIFY

     No large outer ring.
     Only premium security core.
  ========================================================= */

  if (
    state === "orbiting" ||
    state === "verifying"
  ) {
    return (
      <div
        className="admin-ring-wrapper"
        aria-hidden="true"
      >
        <motion.svg
          viewBox="-110 -110 220 220"
          className="admin-ring-svg"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <defs>
            <radialGradient id="adminOrbitCoreGlow">
              <stop
                offset="0%"
                stopColor="#67e8f9"
                stopOpacity="0.26"
              />

              <stop
                offset="45%"
                stopColor="#38bdf8"
                stopOpacity="0.08"
              />

              <stop
                offset="100%"
                stopColor="#38bdf8"
                stopOpacity="0"
              />
            </radialGradient>

            <filter
              id="adminOrbitCoreBlur"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                stdDeviation="3"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />

                <feMergeNode
                  in="SourceGraphic"
                />
              </feMerge>
            </filter>
          </defs>

          <motion.circle
            cx="0"
            cy="0"
            r="34"
            fill="url(#adminOrbitCoreGlow)"
            initial={{
              scale: 0.65,
              opacity: 0,
            }}
            animate={{
              scale:
                isScanning
                  ? [
                    0.9,
                    1.08,
                    0.9,
                  ]
                  : 1,

              opacity: 1,
            }}
            transition={{
              scale: {
                duration: 1.05,

                repeat:
                  isScanning
                    ? Infinity
                    : 0,

                ease:
                  "easeInOut",
              },

              opacity: {
                duration: 0.3,
              },
            }}
          />

          <motion.circle
            cx="0"
            cy="0"
            r="20"
            fill="none"
            stroke="rgba(103,232,249,0.24)"
            strokeWidth="0.8"
            strokeDasharray="2.5 5.5"
            animate={{
              rotate:
                isScanning
                  ? 360
                  : 0,
            }}
            transition={{
              duration: 4.5,

              repeat:
                isScanning
                  ? Infinity
                  : 0,

              ease: "linear",
            }}
            style={{
              transformOrigin:
                "0px 0px",
            }}
          />

          <motion.circle
            cx="0"
            cy="0"
            r="4.2"
            fill="#dff7ff"
            filter="url(#adminOrbitCoreBlur)"
            animate={{
              scale:
                isScanning
                  ? [
                    0.85,
                    1.2,
                    0.85,
                  ]
                  : 1,

              opacity:
                isScanning
                  ? [
                    0.7,
                    1,
                    0.7,
                  ]
                  : 0.85,
            }}
            transition={{
              duration: 0.95,

              repeat:
                isScanning
                  ? Infinity
                  : 0,

              ease:
                "easeInOut",
            }}
            onAnimationComplete={
              !isScanning
                ? onScanComplete
                : undefined
            }
          />
        </motion.svg>
      </div>
    );
  }

  /* =========================================================
     SUCCESS WAVES
  ========================================================= */

  if (
    state === "success"
  ) {
    return (
      <div
        className="admin-ring-wrapper"
        aria-hidden="true"
      >
        <svg
          viewBox="-110 -110 220 220"
          className="admin-ring-svg"
        >
          <motion.circle
            cx="0"
            cy="0"
            r="44"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            initial={{
              scale: 0.4,
              opacity: 0.65,
            }}
            animate={{
              scale: 1.8,
              opacity: 0,
            }}
            transition={{
              duration: 0.72,
              ease: "easeOut",
            }}
          />

          <motion.circle
            cx="0"
            cy="0"
            r="34"
            fill="none"
            stroke="#4ade80"
            strokeWidth="1"
            initial={{
              scale: 0.35,
              opacity: 0.4,
            }}
            animate={{
              scale: 2,
              opacity: 0,
            }}
            transition={{
              duration: 0.84,
              delay: 0.07,
              ease: "easeOut",
            }}
          />

          <motion.circle
            cx="0"
            cy="0"
            r="12"
            fill="rgba(34,197,94,0.18)"
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [
                0,
                1.6,
                0.8,
              ],

              opacity: [
                0,
                0.8,
                0,
              ],
            }}
            transition={{
              duration: 0.5,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          />
        </svg>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (
    state === "error"
  ) {
    return (
      <div
        className="admin-ring-wrapper"
        aria-hidden="true"
      >
        <motion.svg
          viewBox="-110 -110 220 220"
          className="admin-ring-svg"
          animate={{
            x: [
              0,
              -5,
              5,
              -4,
              4,
              -2,
              2,
              0,
            ],
          }}
          transition={{
            duration: 0.42,
          }}
        >
          <motion.circle
            cx="0"
            cy="0"
            r="74"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            initial={{
              scale: 0.8,
              opacity: 0.65,
            }}
            animate={{
              scale: 1.15,
              opacity: 0,
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
          />
        </motion.svg>
      </div>
    );
  }

  return null;
}