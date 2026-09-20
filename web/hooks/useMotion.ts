"use client";

import { useReducedMotion, DURATION } from "./useReducedMotion";

type DurationToken = keyof typeof DURATION;

/**
 * Convenience wrapper over `useReducedMotion` that returns
 * framer-motion-compatible transition objects.
 *
 * Usage:
 *   const { transition } = useMotion();
 *   <motion.div transition={transition("STANDARD")} />
 */
export function useMotion() {
  const { prefersReduced, duration } = useReducedMotion();

  /**
   * Build a transition config from a named duration token.
   * Automatically sets `duration: 0` when reduced-motion is active.
   */
  const transition = (token: DurationToken = "STANDARD") => ({
    duration: duration(DURATION[token]) / 1000,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  });

  return { prefersReduced, duration, transition } as const;
}
