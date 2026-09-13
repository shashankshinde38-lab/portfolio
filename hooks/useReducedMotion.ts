"use client";

import { useEffect, useState } from "react";

/** CSS-variable–aligned motion timing constants (ms). */
export const DURATION = {
  MICRO: 150,
  STANDARD: 300,
  HERO: 600,
} as const;

/**
 * Reactive hook that tracks the user's `prefers-reduced-motion` media query.
 *
 * Returns:
 *  - `prefersReduced`  – `true` when the user prefers reduced motion.
 *  - `duration(ms)`    – pass-through when motion is allowed, `0` otherwise.
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  /** Returns `0` when reduced-motion is active, otherwise the original value. */
  const duration = (ms: number) => (prefersReduced ? 0 : ms);

  return { prefersReduced, duration } as const;
}
