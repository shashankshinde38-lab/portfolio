"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import "./LiquidReveal.css";

interface LiquidRevealProps {
  baseSrc: string;
  colorSrc: string;
  alt?: string;
  onOpenCard?: () => void;
}

export default function LiquidReveal({
  baseSrc,
  colorSrc,
  alt = "Shashank Shinde · QA Specialist",
  onOpenCard,
}: LiquidRevealProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const base = baseImgRef.current;
    if (!stage || !canvas || !base) return;

    const canReveal = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!canReveal) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mk = (): [HTMLCanvasElement, CanvasRenderingContext2D] => {
      const c = document.createElement("canvas");
      const x = c.getContext("2d")!;
      return [c, x];
    };

    const [bwC, bwX] = mk();
    const [colC, colX] = mk();
    const [mask, mX] = mk();
    const [tmp, tX] = mk();

    const colImg = new Image();

    const brushRadius = 140;
    let radius = brushRadius * dpr;
    const decay = 0.016;

    let W = 1;
    let H = 1;
    const points: Array<{ x: number; y: number }> = [];
    let last: { x: number; y: number } | null = null;
    let idle = 999;
    let running = false;
    let showing = false;
    let animId: number = 0;

    function fitDraw(x: CanvasRenderingContext2D, img: HTMLImageElement) {
      x.clearRect(0, 0, W, H);
      if (!img.naturalWidth || !img.naturalHeight) return;
      // object-fit: contain + object-position: 50% 100%
      const s = Math.min(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      x.drawImage(img, (W - dw) / 2, H - dh, dw, dh);
    }

    function render() {
      if (!ctx) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(bwC, 0, 0);
      ctx.globalCompositeOperation = "destination-out";
      ctx.drawImage(mask, 0, 0); // bw * (1 - mask)

      tX.globalCompositeOperation = "source-over";
      tX.clearRect(0, 0, W, H);
      tX.drawImage(colC, 0, 0);
      tX.globalCompositeOperation = "destination-in";
      tX.drawImage(mask, 0, 0); // color * mask

      ctx.globalCompositeOperation = "lighter";
      ctx.drawImage(tmp, 0, 0);
      ctx.globalCompositeOperation = "source-over";
    }

    function show() {
      if (!showing) {
        showing = true;
        render();
        if (base) base.style.visibility = "hidden";
      }
    }

    function hide() {
      showing = false;
      if (base) base.style.visibility = "";
      if (ctx) ctx.clearRect(0, 0, W, H);
      mX.clearRect(0, 0, W, H);
    }

    function measure() {
      if (!stage || !base) return;
      const r = stage.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width * dpr));
      H = Math.max(1, Math.round(r.height * dpr));
      for (const c of [canvas, bwC, colC, mask, tmp]) {
        if (c) {
          c.width = W;
          c.height = H;
        }
      }
      radius = brushRadius * dpr;
      fitDraw(bwX, base);
      fitDraw(colX, colImg);
      hide();
    }

    const drawBase = () => fitDraw(bwX, base);
    base.addEventListener("load", drawBase);
    colImg.onload = () => fitDraw(colX, colImg);

    function stamp(x: number, y: number) {
      const g = mX.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.55, "rgba(255,255,255,0.85)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      mX.globalCompositeOperation = "source-over";
      mX.fillStyle = g;
      mX.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    function frame() {
      const drawing = points.length > 0;
      if (drawing) {
        idle = 0;
      } else {
        idle++;
      }

      if (idle >= 120) {
        hide();
        running = false;
        return;
      }

      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      mX.globalCompositeOperation = "destination-out";
      mX.fillStyle = `rgba(0,0,0,${fade})`;
      mX.fillRect(0, 0, W, H);

      if (drawing) {
        for (const p of points) {
          stamp(p.x, p.y);
        }
        points.length = 0;
      }

      render();
      show();
      animId = requestAnimationFrame(frame);
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
      if (!colImg.getAttribute("src")) colImg.src = colorSrc;
      if (!colImg.naturalWidth || !base.naturalWidth) return;
      const x = (e.clientX - r.left) * dpr;
      const y = (e.clientY - r.top) * dpr;

      if (x < -radius || y < -radius || x > W + radius || y > H + radius) {
        last = null;
        return;
      }

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) {
          points.push({ x: last.x + (dx * i) / n, y: last.y + (dy * i) / n });
        }
      } else {
        points.push({ x, y });
      }
      last = { x, y };

      if (!running) {
        running = true;
        idle = 0;
        animId = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    measure();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      base.removeEventListener("load", drawBase);
      ro.disconnect();
      cancelAnimationFrame(animId);
      hide();
    };
  }, [baseSrc, colorSrc]);

  return (
    <div className="hero-fig-stage" aria-label="Interactive QA specialist portrait">
      <div
        className="fig"
        id="fig"
        ref={stageRef}
        onClick={onOpenCard}
      >
        <img
          id="figBase"
          ref={baseImgRef}
          src={baseSrc}
          srcSet="/images/hero-figure-cream-320.webp 320w, /images/hero-figure-cream-480.webp 480w, /images/hero-figure-cream-640.webp 640w, /images/hero-figure-cream.webp 766w"
          sizes="(max-width: 560px) 180px, (max-width: 780px) 220px, 400px"
          alt={alt}
          width={766}
          height={1024}
          fetchPriority="high"
          decoding="async"
        />
        <canvas id="figCanvas" ref={canvasRef} aria-hidden="true" />
        {onOpenCard && (
          <button
            type="button"
            className="fig__card"
            id="holoOpen"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCard();
            }}
            aria-label="Open 3D Ability Card"
          >
            <Sparkles size={14} className="fig__card-sparkle" />
            <span>My ability card</span>
          </button>
        )}
      </div>
    </div>
  );
}
