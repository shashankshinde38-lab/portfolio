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
  /*
   * IMPORTANT:
   *
   * Do not display ring while:
   *
   * 1. User is entering PIN.
   * 2. Six PIN digits are moving
   *    into circular formation.
   *
   * The ring appears only AFTER
   * the circle formation is complete.
   */
  if (
    state === "input" ||
    state === "forming-circle"
  ) {
    return null;
  }

  /*
   * ======================================
   * RING COLOR
   * ======================================
   */

  const ringColor =
    state === "success"
      ? "#22c55e"
      : state === "error"
        ? "#ef4444"
        : "#f97316";

  /*
   * ======================================
   * GLOW FILTER
   * ======================================
   */

  const filterId =
    state === "success"
      ? "url(#adminRingGreenGlow)"
      : state === "error"
        ? "url(#adminRingRedGlow)"
        : "url(#adminRingOrangeGlow)";

  return (
    <div
      className="admin-ring-wrapper"
      aria-hidden="true"
    >
      <motion.svg
        viewBox="-110 -110 220 220"
        className="admin-ring-svg"
        /*
         * Red shake when PIN is incorrect.
         */
        animate={
          state === "error"
            ? {
              x: [
                0,
                -6,
                6,
                -5,
                5,
                -3,
                3,
                0,
              ],
            }
            : {
              x: 0,
            }
        }
        transition={{
          duration: 0.45,
        }}
      >
        <defs>
          {/* ==================================
              ORANGE GLOW
          ================================== */}

          <filter
            id="adminRingOrangeGlow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
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

          {/* ==================================
              GREEN GLOW
          ================================== */}

          <filter
            id="adminRingGreenGlow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur
              stdDeviation="3.5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />

              <feMergeNode
                in="SourceGraphic"
              />
            </feMerge>
          </filter>

          {/* ==================================
              RED GLOW
          ================================== */}

          <filter
            id="adminRingRedGlow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur
              stdDeviation="3.5"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />

              <feMergeNode
                in="SourceGraphic"
              />
            </feMerge>
          </filter>

          {/* ==================================
              SCANNER TRAIL
          ================================== */}

          <linearGradient
            id="adminScanTrail"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#ffffff"
              stopOpacity="1"
            />

            <stop
              offset="30%"
              stopColor="#fb923c"
              stopOpacity="0.9"
            />

            <stop
              offset="65%"
              stopColor="#f97316"
              stopOpacity="0.45"
            />

            <stop
              offset="100%"
              stopColor="#f97316"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* ==================================
            BACKGROUND GUIDE TRACK
        ================================== */}

        <circle
          cx={0}
          cy={0}
          r={88}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1.5"
        />

        {/* ==================================
            MAIN RING DRAW
        ================================== */}

        <motion.circle
          cx={0}
          cy={0}
          r={88}
          fill="none"
          stroke={ringColor}
          strokeWidth="2"
          strokeLinecap="round"
          filter={filterId}
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            pathLength: {
              duration: 0.65,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            },

            opacity: {
              duration: 0.18,
            },
          }}
        />

        {/* ==================================
            INNER SUBTLE RING
        ================================== */}

        <motion.circle
          cx={0}
          cy={0}
          r={81}
          fill="none"
          stroke={ringColor}
          strokeWidth="0.75"
          strokeOpacity="0.22"
          initial={{
            scale: 0.92,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
            delay: 0.15,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />

        {/* ==================================
            VERIFICATION SCANNER
        ================================== */}

        {isScanning &&
          state === "verifying" && (
            <motion.g
              style={{
                transformOrigin:
                  "0px 0px",
              }}
              initial={{
                rotate: 0,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 0.95,

                ease: [
                  0.25,
                  0.1,
                  0.25,
                  1,
                ],
              }}
              onAnimationComplete={
                onScanComplete
              }
            >
              {/* Scanner outer aura */}

              <circle
                cx={0}
                cy={-88}
                r={10}
                fill="rgba(249,115,22,0.12)"
              />

              {/* Scanner medium aura */}

              <circle
                cx={0}
                cy={-88}
                r={6.5}
                fill="rgba(249,115,22,0.35)"
              />

              {/* Scanner white center */}

              <circle
                cx={0}
                cy={-88}
                r={3.8}
                fill="#ffffff"
                filter="url(#adminRingOrangeGlow)"
              />

              {/* ==================================
                  TRAILING ARC
              ================================== */}

              <path
                d="
                  M 0 -88
                  A 88 88
                  0 0 0
                  -51.7 -71.2
                "
                fill="none"
                stroke="url(#adminScanTrail)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </motion.g>
          )}

        {/* ==================================
            SUCCESS GREEN PULSE
        ================================== */}

        {state === "success" && (
          <motion.circle
            cx={0}
            cy={0}
            r={88}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            initial={{
              opacity: 0.85,
              scale: 0.96,
            }}
            animate={{
              opacity: [
                0.85,
                0,
              ],

              scale: [
                0.96,
                1.12,
              ],
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
          />
        )}

        {/* ==================================
            ERROR RED PULSE
        ================================== */}

        {state === "error" && (
          <motion.circle
            cx={0}
            cy={0}
            r={88}
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            initial={{
              opacity: 0.75,
              scale: 0.96,
            }}
            animate={{
              opacity: [
                0.75,
                0,
              ],

              scale: [
                0.96,
                1.08,
              ],
            }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
            }}
          />
        )}
      </motion.svg>
    </div>
  );
}