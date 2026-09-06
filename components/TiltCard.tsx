"use client";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  as?: "div" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--tilt-scale", "1");
    el.style.setProperty("--tilt-glow-x", "50%");
    el.style.setProperty("--tilt-glow-y", "50%");
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (event.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      el.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      el.style.setProperty("--tilt-scale", "1.015");
      el.style.setProperty("--tilt-glow-x", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--tilt-glow-y", `${(py * 100).toFixed(1)}%`);
    },
    [maxTilt]
  );

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      className={`tilt-card ${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={
        {
          "--tilt-x": "0deg",
          "--tilt-y": "0deg",
          "--tilt-scale": "1",
          "--tilt-glow-x": "50%",
          "--tilt-glow-y": "50%",
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
