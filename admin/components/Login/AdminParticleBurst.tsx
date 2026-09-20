"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { BurstParticle } from "./types";

interface AdminParticleBurstProps {
  count?: number;
  onBurstComplete?: () => void;
}

function seededRandom(seed: number) {
  const value =
    Math.sin(
      seed * 12.9898 + 78.233
    ) * 43758.5453123;

  return (
    value -
    Math.floor(value)
  );
}

export function AdminParticleBurst({
  count = 32,
  onBurstComplete,
}: AdminParticleBurstProps) {
  const particles: BurstParticle[] =
    useMemo(() => {
      return Array.from(
        { length: count },
        (_, index) => {
          const randomAngle =
            seededRandom(
              index * 11 + 17
            );

          const randomDistance =
            seededRandom(
              index * 17 + 39
            );

          const randomRotate =
            seededRandom(
              index * 23 + 67
            );

          const randomSize =
            seededRandom(
              index * 31 + 91
            );

          const randomShape =
            seededRandom(
              index * 41 + 137
            );

          const randomDelay =
            seededRandom(
              index * 47 + 173
            );

          const randomDuration =
            seededRandom(
              index * 59 + 223
            );

          const baseAngle =
            (index / count) *
            Math.PI *
            2;

          const jitter =
            (randomAngle - 0.5) *
            0.42;

          const angle =
            baseAngle +
            jitter;

          const distance =
            60 +
            randomDistance *
            80;

          const x =
            Math.round(
              Math.cos(angle) *
              distance
            );

          const y =
            Math.round(
              Math.sin(angle) *
              distance
            );

          const rotate =
            Math.round(
              randomRotate *
              540
            );

          let size = 3;

          if (
            randomSize >
            0.88
          ) {
            size = 7;
          } else if (
            randomSize >
            0.65
          ) {
            size = 5;
          } else if (
            randomSize >
            0.32
          ) {
            size = 4;
          }

          const shape:
            | "circle"
            | "square"
            | "dot" =
            randomShape >
              0.68
              ? "square"
              : randomShape >
                0.34
                ? "circle"
                : "dot";

          return {
            id: index,

            x,
            y,

            rotate,

            size,

            shape,

            delay:
              randomDelay *
              0.085,

            duration:
              0.8 +
              randomDuration *
              0.38,
          };
        }
      );
    }, [count]);

  const lastParticleIndex =
    useMemo(() => {
      let longestFinishTime =
        -1;

      let finalIndex = 0;

      particles.forEach(
        (
          particle,
          index
        ) => {
          const finishTime =
            particle.delay +
            particle.duration;

          if (
            finishTime >
            longestFinishTime
          ) {
            longestFinishTime =
              finishTime;

            finalIndex =
              index;
          }
        }
      );

      return finalIndex;
    }, [particles]);

  return (
    <div
      className="admin-particle-burst-container"
      aria-hidden="true"
    >
      {particles.map(
        (
          particle,
          index
        ) => {
          const midX =
            particle.x *
            0.55;

          const midY =
            particle.y *
            0.48;

          return (
            <motion.span
              key={
                particle.id
              }
              className={`admin-burst-particle is-${particle.shape}`}
              style={{
                width:
                  particle.size,

                height:
                  particle.size,
              }}
              initial={{
                x: 0,
                y: 0,

                scale: 0,

                opacity: 0,

                rotate: 0,
              }}
              animate={{
                x: [
                  0,
                  midX,
                  particle.x,
                ],

                y: [
                  0,
                  midY,
                  particle.y,
                ],

                scale: [
                  0,
                  1.35,
                  1,
                  0.2,
                ],

                opacity: [
                  0,
                  1,
                  0.9,
                  0,
                ],

                rotate: [
                  0,
                  particle.rotate *
                  0.45,
                  particle.rotate,
                ],
              }}
              transition={{
                duration:
                  particle.duration,

                delay:
                  particle.delay,

                times: [
                  0,
                  0.18,
                  0.72,
                  1,
                ],

                ease: [
                  0.16,
                  1,
                  0.3,
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
          );
        }
      )}
    </div>
  );
}