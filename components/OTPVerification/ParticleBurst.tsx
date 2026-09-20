"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Particle } from "./types";

interface ParticleBurstProps {
  count?: number;
  onBurstComplete?: () => void;
}

export function ParticleBurst({ count = 28, onBurstComplete }: ParticleBurstProps) {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Polar distribution for a natural radial burst
      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      const distance = 45 + Math.random() * 55; // 45px to 100px
      const x = Math.round(Math.cos(angle) * distance);
      const y = Math.round(Math.sin(angle) * (distance * 0.85)); // slightly elliptical
      const size = 3 + Math.floor(Math.random() * 4); // 3px to 7px
      const shape: "circle" | "square" = Math.random() > 0.35 ? "circle" : "square";
      const rotate = Math.round(Math.random() * 360);
      const delay = Math.random() * 0.08; // 0 to 80ms
      const duration = 0.65 + Math.random() * 0.25; // 0.65s to 0.9s

      return {
        id: i,
        x,
        y,
        scale: [0, 1.2, 0],
        rotate,
        size,
        shape,
        delay,
        duration,
      };
    });
  }, [count]);

  return (
    <div className="otp-particle-burst-container" aria-hidden="true">
      {particles.map((p, idx) => (
        <motion.span
          key={p.id}
          className={`otp-burst-particle ${p.shape === "circle" ? "is-circle" : "is-square"}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.25, 0],
            rotate: p.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 1, 0.5, 1],
          }}
          onAnimationComplete={idx === 0 ? onBurstComplete : undefined}
        />
      ))}
    </div>
  );
}
