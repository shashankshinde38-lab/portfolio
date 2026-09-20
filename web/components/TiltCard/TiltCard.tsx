"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type HTMLAttributes,
} from "react";

interface TiltCardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;

  /** Maximum tilt angle in degrees */
  maxTilt?: number;

  /** Scale on hover */
  scale?: number;

  /** Perspective distance */
  perspective?: number;

  /** Reset animation duration */
  transitionSpeed?: number;

  /** Enable glare effect */
  glare?: boolean;

  /** Glare opacity */
  glareOpacity?: number;

  /** Enable tilt on touch devices */
  enableTouch?: boolean;

  /** Disable tilt below this viewport width */
  mobileBreakpoint?: number;

  /** Reduce tilt strength on tablets */
  tabletTiltMultiplier?: number;

  /** Enable hover scale */
  enableScale?: boolean;

  /** HTML element */
  as?: "div" | "article" | "section" | "button";
}

export default function TiltCard({
  children,
  className = "",

  maxTilt = 8,
  scale = 1.02,
  perspective = 900,
  transitionSpeed = 400,

  glare = true,
  glareOpacity = 0.18,

  enableTouch = false,

  mobileBreakpoint = 480,
  tabletTiltMultiplier = 0.7,

  enableScale = true,

  as: Tag = "div",

  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  const rafId = useRef<number | null>(null);

  const isActive = useRef(false);

  const pointerInside = useRef(false);

  const current = useRef({
    x: 0,
    y: 0,
    scale: 1,
    glowX: 50,
    glowY: 50,
  });

  const target = useRef({
    x: 0,
    y: 0,
    scale: 1,
    glowX: 50,
    glowY: 50,
  });

  const prefersReducedMotion = useRef(false);

  const isTouchDevice = useRef(false);

  const updateEnvironment = useCallback(() => {
    if (typeof window === "undefined") return;

    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    isTouchDevice.current =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;
  }, []);

  useEffect(() => {
    updateEnvironment();

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleChange = () => updateEnvironment();

    mediaQuery.addEventListener?.("change", handleChange);

    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
    };
  }, [updateEnvironment]);

  const setVariables = useCallback(() => {
    const element = ref.current;

    if (!element) return;

    const { x, y, scale, glowX, glowY } = current.current;

    element.style.setProperty("--tilt-x", `${x.toFixed(2)}deg`);
    element.style.setProperty("--tilt-y", `${y.toFixed(2)}deg`);
    element.style.setProperty("--tilt-scale", scale.toFixed(4));

    element.style.setProperty(
      "--tilt-glow-x",
      `${glowX.toFixed(1)}%`
    );

    element.style.setProperty(
      "--tilt-glow-y",
      `${glowY.toFixed(1)}%`
    );
  }, []);

  const stopAnimation = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const animate = useCallback(() => {
    if (prefersReducedMotion.current) {
      stopAnimation();
      return;
    }

    const currentValue = current.current;
    const targetValue = target.current;

    /*
     * Higher damping = faster response.
     * 0.15 gives a smooth but responsive movement.
     */
    const damping = 0.15;

    currentValue.x +=
      (targetValue.x - currentValue.x) * damping;

    currentValue.y +=
      (targetValue.y - currentValue.y) * damping;

    currentValue.scale +=
      (targetValue.scale - currentValue.scale) * damping;

    currentValue.glowX +=
      (targetValue.glowX - currentValue.glowX) * damping;

    currentValue.glowY +=
      (targetValue.glowY - currentValue.glowY) * damping;

    setVariables();

    const movement =
      Math.abs(targetValue.x - currentValue.x) +
      Math.abs(targetValue.y - currentValue.y) +
      Math.abs(targetValue.scale - currentValue.scale) +
      Math.abs(targetValue.glowX - currentValue.glowX) +
      Math.abs(targetValue.glowY - currentValue.glowY);

    if (movement > 0.01 || pointerInside.current) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      rafId.current = null;
    }
  }, [setVariables, stopAnimation]);

  const startAnimation = useCallback(() => {
    if (prefersReducedMotion.current) return;

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const resetCard = useCallback(() => {
    pointerInside.current = false;
    isActive.current = false;

    target.current = {
      x: 0,
      y: 0,
      scale: 1,
      glowX: 50,
      glowY: 50,
    };

    startAnimation();
  }, [startAnimation]);

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (prefersReducedMotion.current) return;

      if (
        event.pointerType !== "mouse" &&
        !enableTouch
      ) {
        return;
      }

      pointerInside.current = true;
      isActive.current = true;
    },
    [enableTouch]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (prefersReducedMotion.current) return;

      /*
       * Do not run tilt on touch devices unless explicitly enabled.
       */
      if (
        event.pointerType !== "mouse" &&
        !enableTouch
      ) {
        return;
      }

      const element = ref.current;

      if (!element) return;

      /*
       * Disable tilt on very small screens.
       * This prevents unwanted movement while scrolling.
       */
      if (
        typeof window !== "undefined" &&
        window.innerWidth < mobileBreakpoint &&
        event.pointerType !== "mouse"
      ) {
        return;
      }

      const rect = element.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      const x = Math.max(0, Math.min(1, px));
      const y = Math.max(0, Math.min(1, py));

      /*
       * Responsive tilt strength.
       */
      let tiltMultiplier = 1;

      if (
        typeof window !== "undefined" &&
        window.innerWidth < 1024
      ) {
        tiltMultiplier = tabletTiltMultiplier;
      }

      /*
       * Mobile/touch gets a much softer effect.
       */
      if (event.pointerType !== "mouse") {
        tiltMultiplier *= 0.5;
      }

      const effectiveTilt =
        maxTilt * tiltMultiplier;

      target.current.x =
        (0.5 - y) * effectiveTilt * 2;

      target.current.y =
        (x - 0.5) * effectiveTilt * 2;

      target.current.scale =
        enableScale ? scale : 1;

      target.current.glowX = x * 100;
      target.current.glowY = y * 100;

      pointerInside.current = true;
      isActive.current = true;

      startAnimation();
    },
    [
      enableTouch,
      mobileBreakpoint,
      tabletTiltMultiplier,
      maxTilt,
      scale,
      enableScale,
      startAnimation,
    ]
  );

  const onPointerLeave = useCallback(() => {
    resetCard();
  }, [resetCard]);

  const onPointerCancel = useCallback(() => {
    resetCard();
  }, [resetCard]);

  /*
   * Clean animation when component unmounts.
   */
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, [stopAnimation]);

  /*
   * Reset when viewport changes.
   *
   * This prevents cards from remaining tilted after
   * switching between mobile/tablet/desktop sizes.
   */
  useEffect(() => {
    const handleResize = () => {
      resetCard();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resetCard]);

  const Component = Tag as React.ElementType;

  const styles = {
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
    "--tilt-scale": "1",
    "--tilt-glow-x": "50%",
    "--tilt-glow-y": "50%",

    "--tilt-perspective": `${perspective}px`,
    "--tilt-transition": `${transitionSpeed}ms`,
    "--tilt-glare-opacity": glare
      ? Math.max(0, Math.min(1, glareOpacity))
      : 0,

    /*
     * Responsive rendering hints.
     */
    "--tilt-will-change": "transform",

    transform:
      "perspective(var(--tilt-perspective)) " +
      "rotateX(var(--tilt-x)) " +
      "rotateY(var(--tilt-y)) " +
      "scale3d(var(--tilt-scale), var(--tilt-scale), 1)",

    transformStyle: "preserve-3d",

    willChange: "transform",

    /*
     * Prevent the 3D card from causing horizontal overflow.
     */
    maxWidth: "100%",
    boxSizing: "border-box",
  } as CSSProperties;

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={`tilt-card ${className}`.trim()}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
      style={styles}
      {...rest}
    >
      <div
        className="tilt-card__content"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>

      {glare && (
        <div
          className="tilt-card__glare"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            overflow: "hidden",
          }}
        />
      )}
    </Component>
  );
}