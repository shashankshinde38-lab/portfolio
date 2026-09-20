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
      <motion.div
        className="admin-success-glow-aura"
        initial={{
          scale: 0.2,
          opacity: 0,
        }}
        animate={{
          scale: [
            0.2,
            1.4,
            1.05,
          ],

          opacity: [
            0,
            0.78,
            0.42,
          ],
        }}
        transition={{
          duration: 0.72,

          times: [
            0,
            0.68,
            1,
          ],

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      />

      <motion.div
        className="admin-success-ring-pulse"
        initial={{
          scale: 0.45,
          opacity: 0.72,
        }}
        animate={{
          scale: 1.8,
          opacity: 0,
        }}
        transition={{
          duration: 0.82,
          delay: 0.03,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="
          admin-success-ring-pulse
          admin-success-ring-pulse-secondary
        "
        initial={{
          scale: 0.4,
          opacity: 0.42,
        }}
        animate={{
          scale: 2.15,
          opacity: 0,
        }}
        transition={{
          duration: 0.92,
          delay: 0.12,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="admin-success-icon-badge"
        initial={{
          scale: 0.38,
          opacity: 0,
          rotate: -6,
        }}
        animate={{
          scale: [
            0.38,
            1.12,
            0.97,
            1,
          ],

          opacity: 1,

          rotate: [
            -6,
            1.5,
            -0.5,
            0,
          ],
        }}
        transition={{
          duration: 0.58,

          times: [
            0,
            0.62,
            0.82,
            1,
          ],

          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
      >
        <motion.div
          className="admin-success-badge-shine"
          initial={{
            x: "-130%",
            opacity: 0,
          }}
          animate={{
            x: "130%",

            opacity: [
              0,
              0.4,
              0,
            ],
          }}
          transition={{
            duration: 0.75,
            delay: 0.15,
            ease: "easeInOut",
          }}
        />

        <svg
          viewBox="0 0 52 52"
          className="admin-success-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="26"
            cy="26"
            r="20.5"
            fill="rgba(34,197,94,0.045)"
            stroke="rgba(34,197,94,0.22)"
            strokeWidth="1"
            initial={{
              scale: 0.7,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.32,
              delay: 0.08,
              ease: "easeOut",
            }}
          />

          <motion.circle
            cx="26"
            cy="26"
            r="20.5"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.15"
            strokeLinecap="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              delay: 0.1,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          />

          <motion.path
            d="
              M 15.5 26.8
              L 23 34
              L 37 18.5
            "
            stroke="rgba(34,197,94,0.38)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,

              opacity: [
                0,
                0.55,
                0.15,
              ],
            }}
            transition={{
              duration: 0.48,
              delay: 0.2,
              ease: "easeOut",
            }}
          />

          <motion.path
            d="
              M 15.5 26.8
              L 23 34
              L 37 18.5
            "
            stroke="#ffffff"
            strokeWidth="3.6"
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
              duration: 0.44,
              delay: 0.23,

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

        {[
          "dot-one",
          "dot-two",
          "dot-three",
          "dot-four",
        ].map(
          (
            dotClass,
            index
          ) => (
            <motion.span
              key={dotClass}
              className={`admin-success-mini-dot ${dotClass}`}
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [
                  0,
                  1,
                  0,
                ],

                opacity: [
                  0,
                  1,
                  0,
                ],
              }}
              transition={{
                duration: 0.55,

                delay:
                  0.22 +
                  index * 0.06,
              }}
            />
          )
        )}
      </motion.div>
    </div>
  );
}