"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BurstParticle } from "./types";

interface PINParticleBurstProps {
  count?: number;
  onBurstComplete?: () => void;
}

export function PINParticleBurst({
  count = 24,
  onBurstComplete,
}: PINParticleBurstProps) {
  const particles: BurstParticle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Polar dispersion to achieve a radial burst around the circle
      const baseAngle = (i / count) * 2 * Math.PI;
      const jitter = (Math.random() - 0.5) * 0.4;
      const angle = baseAngle + jitter;
      const distance = 40 + Math.random() * 55; // 40px to 95px outward
      const x = Math.round(Math.cos(angle) * distance);
      const y = Math.round(Math.sin(angle) * distance);
      const rotate = Math.round(Math.random() * 360);
      const size = 3 + Math.floor(Math.random() * 4); // 3px to 6px
      const shapeType = Math.random();
      const shape: "circle" | "square" | "dot" =
        shapeType > 0.65 ? "circle" : shapeType > 0.3 ? "square" : "dot";
      const delay = Math.random() * 0.08;
      const duration = 0.65 + Math.random() * 0.25;

      return {
        id: i,
        x,
        y,
        rotate,
        size,
        shape,
        delay,
        duration,
      };
    });
  }, [count]);

  return (
    <div className="pin-particle-burst-container" aria-hidden="true">
      {particles.map((p, idx) => (
        <motion.span
          key={p.id}
          className={`pin-burst-particle is-${p.shape}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            rotate: p.rotate,
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
