"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { BurstParticle } from "./types";

interface AdminParticleBurstProps {
  count?: number;
  onBurstComplete?: () => void;
}

export function AdminParticleBurst({
  count = 24,
  onBurstComplete,
}: AdminParticleBurstProps) {
  const particles: BurstParticle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const baseAngle = (i / count) * 2 * Math.PI;

      const jitter = (Math.random() - 0.5) * 0.35;
      const angle = baseAngle + jitter;

      /*
       * Slightly wider premium burst.
       */
      const distance = 48 + Math.random() * 52;

      const x = Math.round(
        Math.cos(angle) * distance
      );

      const y = Math.round(
        Math.sin(angle) * distance
      );

      const rotate = Math.round(
        Math.random() * 360
      );

      const size =
        3 + Math.floor(Math.random() * 4);

      const shapeType = Math.random();

      const shape:
        | "circle"
        | "square"
        | "dot" =
        shapeType > 0.65
          ? "circle"
          : shapeType > 0.3
            ? "square"
            : "dot";

      const delay = Math.random() * 0.1;

      const duration =
        0.7 + Math.random() * 0.3;

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

  /*
   * Find which particle will actually
   * finish last.
   *
   * This prevents the particle container
   * from disappearing too early.
   */
  const lastParticleIndex = useMemo(() => {
    let latestFinishTime = 0;
    let latestIndex = 0;

    particles.forEach(
      (particle, index) => {
        const finishTime =
          particle.delay +
          particle.duration;

        if (
          finishTime >
          latestFinishTime
        ) {
          latestFinishTime =
            finishTime;

          latestIndex = index;
        }
      }
    );

    return latestIndex;
  }, [particles]);

  return (
    <div
      className="admin-particle-burst-container"
      aria-hidden="true"
    >
      {particles.map(
        (particle, index) => (
          <motion.span
            key={particle.id}
            className={`admin-burst-particle is-${particle.shape}`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{
              x: 0,
              y: 0,

              scale: 0,
              opacity: 0,

              rotate: 0,
            }}
            animate={{
              x: particle.x,
              y: particle.y,

              /*
               * Small expansion followed
               * by a natural disappearance.
               */
              scale: [
                0,
                1.25,
                0.9,
                0,
              ],

              opacity: [
                0,
                1,
                0.85,
                0,
              ],

              rotate:
                particle.rotate,
            }}
            transition={{
              duration:
                particle.duration,

              delay:
                particle.delay,

              ease: [
                0.25,
                1,
                0.5,
                1,
              ],
            }}
            onAnimationComplete={
              index ===
                lastParticleIndex
                ? onBurstComplete
                : undefined
            }
          />
        )
      )}
    </div>
  );
}