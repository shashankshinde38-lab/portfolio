"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variant } from "framer-motion";

type AnimationVariant = "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "fadeIn";

const variants: Record<AnimationVariant, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.4, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container for child elements */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
  amount = 0.15,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Individual stagger item */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  duration?: number;
}

export function StaggerItem({
  children,
  className = "",
  variant = "fadeUp",
  duration = 0.5,
}: StaggerItemProps) {
  const v = variants[variant];
  return (
    <motion.div
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration, ease: [0.25, 0.4, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
