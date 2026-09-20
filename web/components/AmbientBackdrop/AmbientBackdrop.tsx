"use client";

import { useEffect, useRef } from "react";
import "./AmbientBackdrop.css";

export default function AmbientBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Create a curated set of subtle floating glowing particles
    const particleCount = prefersReducedMotion ? 0 : Math.min(36, Math.floor(width / 35));
    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    const colors = [
      "rgba(167, 139, 250, ", // soft violet
      "rgba(124, 108, 255, ", // electric indigo
      "rgba(34, 211, 238, ",  // soft cyan
      "rgba(192, 132, 252, ", // light purple
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.2, // gentle upward drift
        alpha: Math.random() * 0.4 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: 0.015 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset));

        // Draw particle with soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha.toFixed(3)})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      render();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ambient-backdrop-container" aria-hidden="true">
      {/* Deep spatial volumetric light glows */}
      <div className="volumetric-ray top-right-ray" />
      <div className="volumetric-glow hero-glow" />
      <div className="volumetric-glow center-cyan-glow" />
      <div className="volumetric-glow projects-indigo-glow" />
      <div className="subtle-perspective-grid" />
      <canvas ref={canvasRef} className="ambient-particle-canvas" />
    </div>
  );
}
