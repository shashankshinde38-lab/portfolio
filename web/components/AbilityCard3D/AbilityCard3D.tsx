"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Compass, GiltFrame } from "./CardEngravings";
import { X, RotateCw, Sparkles, ShieldCheck, Award, GraduationCap, Maximize2 } from "lucide-react";
import { useDialogFocus } from "./useDialogFocus";
import "./AbilityCard3D.css";

interface AbilityCard3DProps {
  isOpen?: boolean;
  isInline?: boolean;
  onClose?: () => void;
  onExpand?: () => void;
}

// Use the premium portrait — the high-quality professional headshot.
const PORTRAIT = "/images/premium_portfolio_portrait.webp";
const PORTRAIT_FALLBACK = "/images/hero-figure-color.webp";

/** Ten engraved diamonds, reflecting the score printed on each row. */
function RatingDots({ score }: { score: number }) {
  const filledCount = Math.round(score / 10);
  return (
    <span className="card-skill-dots" aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => (
        <i key={index} data-filled={index < filledCount} />
      ))}
    </span>
  );
}

/** QA-themed emblem for the card back face */
function QAEmblemBack() {
  return (
    <svg
      className="ability-qa-emblem"
      viewBox="0 0 280 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="qaGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2cc" />
          <stop offset="30%" stopColor="#e6c655" />
          <stop offset="60%" stopColor="#b8860b" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
        <linearGradient id="qaShield" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a1f0e" />
          <stop offset="100%" stopColor="#1a1208" />
        </linearGradient>
        <filter id="qaGlow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring */}
      <circle cx="140" cy="180" r="110" stroke="url(#qaGold)" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 3" />
      <circle cx="140" cy="180" r="98" stroke="url(#qaGold)" strokeWidth="0.75" strokeOpacity="0.3" />

      {/* Shield */}
      <path
        d="M140 68 L195 90 V172 C195 212 170 240 140 254 C110 240 85 212 85 172 V90 L140 68 Z"
        fill="url(#qaShield)"
        stroke="url(#qaGold)"
        strokeWidth="2"
        filter="url(#qaGlow)"
      />

      {/* Inner shield bevel */}
      <path
        d="M140 80 L183 98 V170 C183 206 161 231 140 244 C119 231 97 206 97 170 V98 L140 80 Z"
        fill="none"
        stroke="url(#qaGold)"
        strokeWidth="0.75"
        strokeOpacity="0.5"
      />

      {/* QA monogram */}
      <text
        x="140"
        y="162"
        fill="url(#qaGold)"
        fontFamily="'EB Garamond', Georgia, serif"
        fontSize="38"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="4"
        filter="url(#qaGlow)"
      >
        QA
      </text>

      {/* Subtitle */}
      <text
        x="140"
        y="184"
        fill="#c8a84b"
        fontFamily="'Onest', sans-serif"
        fontSize="7.5"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="4"
        opacity="0.85"
      >
        QUALITY ASSURANCE
      </text>

      {/* Magnifier icon (manual paths) */}
      <circle cx="134" cy="207" r="8" stroke="url(#qaGold)" strokeWidth="1.5" fill="none" opacity="0.7" />
      <line x1="140" y1="213" x2="146" y2="219" stroke="url(#qaGold)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* Checkmark */}
      <path d="M151 203 L154 206 L160 199" stroke="url(#qaGold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />

      {/* Stars at top of shield */}
      <polygon points="140,60 142,65.5 148,65.5 143.5,69 145.5,74.5 140,71 134.5,74.5 136.5,69 132,65.5 138,65.5" fill="#ffe8a3" opacity="0.9" />

      {/* Bottom decorative arc */}
      <path d="M80 265 Q140 290 200 265" stroke="url(#qaGold)" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <path d="M90 272 Q140 295 190 272" stroke="url(#qaGold)" strokeWidth="0.6" strokeOpacity="0.25" fill="none" />

      {/* Bottom text */}
      <text
        x="140"
        y="310"
        fill="#d4af37"
        fontFamily="'Onest', sans-serif"
        fontSize="6.5"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="5"
        opacity="0.65"
      >
        SHASHANK SHINDE
      </text>
      <text
        x="140"
        y="323"
        fill="#a07a3a"
        fontFamily="'Onest', sans-serif"
        fontSize="5.5"
        fontWeight="600"
        textAnchor="middle"
        letterSpacing="4"
        opacity="0.5"
      >
        PUNE · INDIA
      </text>

      {/* Corner flourishes */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
        <g key={i} transform={`translate(140 180) scale(${sx} ${sy}) translate(-140 -180)`}>
          <path d={`M ${140 + sx * 115} ${180 + sy * 100} L ${140 + sx * 105} ${180 + sy * 100}`}
            stroke="#d4af37" strokeWidth="0.75" strokeOpacity="0.35" />
          <path d={`M ${140 + sx * 115} ${180 + sy * 100} L ${140 + sx * 115} ${180 + sy * 90}`}
            stroke="#d4af37" strokeWidth="0.75" strokeOpacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

export default function AbilityCard3D(props: AbilityCard3DProps) {
  if (!props.isOpen && !props.isInline) return null;
  return <AbilityCardSession {...props} />;
}

function AbilityCardSession({
  isOpen = false,
  isInline = false,
  onClose,
  onExpand,
}: AbilityCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(isInline);
  const [artworkFailed, setArtworkFailed] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  // Track which reveal phase we're in: 'edge' | 'sweeping' | 'settling' | 'resting'
  const [revealPhase, setRevealPhase] = useState<"edge" | "sweeping" | "settling" | "resting">(
    isInline ? "resting" : "edge"
  );
  const artRef = useRef<HTMLImageElement>(null);
  const progressTarget = useRef(0);
  const credentialsButton = useRef<HTMLButtonElement>(null);

  // Readiness milestones
  useEffect(() => {
    if (isInline) return;
    let active = true;
    let frame = 0;
    let mark = 1;
    progressTarget.current = 0;
    const completed = () => {
      if (active) progressTarget.current = Math.round((++mark / 3) * 100);
    };
    progressTarget.current = 33;
    const art = artRef.current;
    const decode = art ? art.decode() : Promise.resolve();
    decode
      .catch(() => {
        if (active) setArtworkFailed(true);
      })
      .finally(completed);
    document.fonts.ready.then(completed, completed);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let shown = 0;
    let last = performance.now();
    const advance = (now: number) => {
      const step = Math.min(50, now - last) / 8;
      last = now;
      shown = motion.matches
        ? progressTarget.current
        : Math.min(progressTarget.current, shown + step);
      setProgress(Math.floor(shown));
      if (shown >= 100) setReady(true);
      else frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, [isInline]);

  // Fiery reveal sequence — fires once when ready
  useEffect(() => {
    if (!ready || isInline) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setRevealPhase("resting");
      return;
    }
    // Phase schedule: edge(0ms) → sweeping(80ms) → settling(700ms) → resting(1500ms)
    setRevealPhase("edge");
    const t1 = setTimeout(() => setRevealPhase("sweeping"), 80);
    const t2 = setTimeout(() => setRevealPhase("settling"), 700);
    const t3 = setTimeout(() => setRevealPhase("resting"), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [ready, isInline]);

  // 3D Tilt and Drag Physics
  const tilt = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const drag = useRef({ isDragging: false, startX: 0, startY: 0, currentRotX: 0, currentRotY: 0 });
  const animFrameId = useRef<number | null>(null);
  const highlightTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tapStart = useRef({ x: 0, y: 0 });
  const pointerType = useRef("mouse");
  // Portrait parallax CSS vars
  const portraitRef = useRef<HTMLDivElement>(null);

  const isActive = isInline || isOpen;
  const dialogRef = useDialogFocus(isOpen && !isInline);

  // Close on Escape key (modal mode only)
  useEffect(() => {
    if (!isOpen || isInline || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isInline, onClose]);

  // Listen for custom trigger to highlight/tilt card
  useEffect(() => {
    const timers = highlightTimers.current;
    const handleHighlight = () => {
      tilt.current.targetY = 18;
      tilt.current.targetX = -12;
      timers.push(
        setTimeout(() => {
          tilt.current.targetY = -18;
          tilt.current.targetX = 12;
          timers.push(
            setTimeout(() => {
              tilt.current.targetY = 0;
              tilt.current.targetX = 0;
            }, 320),
          );
        }, 320),
      );
    };
    window.addEventListener("highlight-ability-card", handleHighlight);
    return () => {
      window.removeEventListener("highlight-ability-card", handleHighlight);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Three.js Golden Ambient Embers Particle Field
  useEffect(() => {
    if (!ready || !canvasRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const width =
      isInline && canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const height =
      isInline && canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 12;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const handleResize = () => {
      if (!canvas) return;
      const w =
        isInline && canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      const h =
        isInline && canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const particleCount = isInline ? 95 : 170;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 19;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      speeds[i * 3] = (Math.random() - 0.5) * 0.006;
      speeds[i * 3 + 1] = 0.006 + Math.random() * 0.01;
      speeds[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 32;
    particleCanvas.height = 32;
    const ctx = particleCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 230, 150, 1)");
      grad.addColorStop(0.3, "rgba(220, 175, 55, 0.8)");
      grad.addColorStop(0.7, "rgba(164, 85, 44, 0.3)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const material = new THREE.PointsMaterial({
      size: isInline ? 0.4 : 0.35,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;
      animFrameId.current = requestAnimationFrame(animate);

      if (document.hidden) return;
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += speeds[i * 3 + 1];
        pos[i * 3] += speeds[i * 3];

        if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
        if (pos[i * 3] > 12) pos[i * 3] = -12;
        if (pos[i * 3] < -12) pos[i * 3] = 12;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isRunning = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, [ready, isInline]);

  // Pointer Interaction Handlers for Tilt & Drag
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (drag.current.isDragging) {
      const deltaX = e.clientX - drag.current.startX;
      const deltaY = e.clientY - drag.current.startY;
      drag.current.currentRotY += deltaX * 0.42;
      drag.current.currentRotX = Math.max(
        -45,
        Math.min(45, drag.current.currentRotX - deltaY * 0.42),
      );
      drag.current.startX = e.clientX;
      drag.current.startY = e.clientY;
    } else {
      const rect = cardRef.current?.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);
      cardRef.current?.style.setProperty(
        "--foil-x",
        `${Math.round(Math.max(0, Math.min(100, 50 + normX * 32)))}%`,
      );
      cardRef.current?.style.setProperty(
        "--foil-y",
        `${Math.round(Math.max(0, Math.min(100, 50 + normY * 32)))}%`,
      );
      const x = Math.max(-1, Math.min(1, normX));
      const y = Math.max(-1, Math.min(1, normY));
      tilt.current.targetX = x * 11.5;
      tilt.current.targetY = -y * 10;
      // 3D portrait parallax — bg layer moves less than subject layer
      cardRef.current?.style.setProperty("--portrait-pan-x", `${(-x * 4).toFixed(2)}px`);
      cardRef.current?.style.setProperty("--portrait-pan-y", `${(-y * 3).toFixed(2)}px`);
      cardRef.current?.style.setProperty("--portrait-subject-x", `${(-x * 7).toFixed(2)}px`);
      cardRef.current?.style.setProperty("--portrait-subject-y", `${(-y * 5.5).toFixed(2)}px`);
      cardRef.current?.style.setProperty("--glint-rotation", `${(x * 14).toFixed(2)}deg`);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!drag.current.isDragging) {
      tilt.current.targetX = 0;
      tilt.current.targetY = 0;
      cardRef.current?.style.setProperty("--portrait-pan-x", "0px");
      cardRef.current?.style.setProperty("--portrait-pan-y", "0px");
      cardRef.current?.style.setProperty("--portrait-subject-x", "0px");
      cardRef.current?.style.setProperty("--portrait-subject-y", "0px");
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerType.current = e.pointerType;
    e.currentTarget.setPointerCapture(e.pointerId);
    tapStart.current = { x: e.clientX, y: e.clientY };
    drag.current.isDragging = true;
    cardRef.current?.classList.add("is-dragging");
    drag.current.startX = e.clientX;
    drag.current.startY = e.clientY;
  };

  const handlePointerUp = () => {
    drag.current.isDragging = false;
    cardRef.current?.classList.remove("is-dragging");
  };

  // Card transform update loop (smoothing tilt & drag)
  useEffect(() => {
    if (!ready) return;

    let frameId = 0,
      last = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateCard = (now: number) => {
      if (document.hidden || motion.matches) return;
      const elapsed = last ? Math.min(now - last, 50) / 16.667 : 1;
      last = now;
      const tiltBlend = 1 - Math.pow(0.88, elapsed),
        dragBlend = 1 - Math.pow(0.94, elapsed);
      tilt.current.x += (tilt.current.targetX - tilt.current.x) * tiltBlend;
      tilt.current.y += (tilt.current.targetY - tilt.current.y) * tiltBlend;
      if (!drag.current.isDragging) {
        drag.current.currentRotX *= 1 - dragBlend;
        drag.current.currentRotY *= 1 - dragBlend;
      }
      if (cardRef.current)
        cardRef.current.style.transform = `rotateX(${(tilt.current.y + drag.current.currentRotX).toFixed(2)}deg) rotateY(${(tilt.current.x + drag.current.currentRotY).toFixed(2)}deg)`;
      frameId = requestAnimationFrame(updateCard);
    };
    const resume = () => {
      cancelAnimationFrame(frameId);
      last = 0;
      if (!motion.matches && !document.hidden) frameId = requestAnimationFrame(updateCard);
      else if (cardRef.current) cardRef.current.style.transform = "none";
    };
    resume();
    document.addEventListener("visibilitychange", resume);
    motion.addEventListener("change", resume);
    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", resume);
      motion.removeEventListener("change", resume);
    };
  }, [ready]);

  if (!isActive) return null;

  const cardMarkup = (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`ability-card-stage ${drag.current.isDragging ? "is-dragging" : ""}`}
      data-reveal={revealPhase}
      onPointerDown={handlePointerDown}
      onPointerUp={(e) => {
        if (
          e.pointerType !== "mouse" &&
          Math.hypot(e.clientX - tapStart.current.x, e.clientY - tapStart.current.y) < 9
        ) {
          setIsFlipped((prev) => !prev);
        }
        handlePointerUp();
      }}
      onPointerCancel={handlePointerUp}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
      onDoubleClick={() => {
        if (pointerType.current !== "mouse") return;
        setIsFlipped((prev) => !prev);
      }}
      role="button"
      tabIndex={0}
      aria-label="3D Ability Card of Shashank Shinde. Press Enter or Space to flip."
      aria-pressed={isFlipped}
    >
      {/* Fiery burn sweep overlay — appears during reveal only */}
      <div className="ability-burn-sweep" aria-hidden="true" />
      {/* Ember sparks — trail along the burn edge */}
      <div className="ability-ember-sparks" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="ability-ember" style={{ "--ember-i": i } as React.CSSProperties} />
        ))}
      </div>
      {/* Rim pulse — single warm pulse after card settles */}
      <div className="ability-rim-pulse" aria-hidden="true" />

      <div className={`ability-card-body ${isFlipped ? "flipped" : ""}`}>
        {/* FRONT FACE */}
        <div className="ability-card-face ability-card-face-front" aria-hidden={isFlipped}>
          <GiltFrame />
          <div className="ability-hologram-foil" />
          <div className="ability-metal-specular" aria-hidden="true" />
          <div className="ability-print-grain" aria-hidden="true" />

          <div className="card-inner-frame">
            {/* 1. Ornate Nameplate Banner */}
            <div className="card-nameplate-banner">
              <span className="card-role-tag">QA Specialist</span>
              <h2 className="card-gold-name">Shashank Shinde</h2>
            </div>

            {/* 2. Portrait window — real photo with parallax */}
            <div className="card-emblem-box" ref={portraitRef}>
              <div className="card-portrait-bokeh" aria-hidden="true" />
              <div className="card-portrait-light-leaks" aria-hidden="true" />

              {artworkFailed ? (
                <div className="card-portrait-fallback">
                  <span>SS</span>
                </div>
              ) : (
                <>
                  <img
                    ref={artRef}
                    src={PORTRAIT}
                    alt="Professional portrait of Shashank Shinde"
                    draggable={false}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.src.indexOf("premium") === -1) {
                        img.src = PORTRAIT_FALLBACK;
                      } else {
                        setArtworkFailed(true);
                      }
                    }}
                    className="card-portrait-img"
                  />
                  <div className="card-portrait-rim-light" aria-hidden="true" />
                </>
              )}
              <div className="card-portrait-overlay" aria-hidden="true" />
            </div>

            {/* 3. Bio Plaque in the ornate middle slot */}
            <div className="card-bio-plate">
              <span className="card-bio-sparkle">✦</span>
              <p className="card-bio-text">I test web and mobile flows, document defects, and verify fixes before release.</p>
              <span className="card-bio-sparkle">✦</span>
            </div>

            {/* 4. Specialization Ratings Table */}
            <div className="card-skills-table">
              <div className="card-skill-row">
                <span className="card-skill-title">Web &amp; Mobile Testing</span>
                <RatingDots score={90} />
                <span className="card-skill-score">90</span>
              </div>
              <div className="card-skill-row">
                <span className="card-skill-title">End-to-End Testing</span>
                <RatingDots score={85} />
                <span className="card-skill-score">85</span>
              </div>
              <div className="card-skill-row">
                <span className="card-skill-title">API Testing</span>
                <RatingDots score={88} />
                <span className="card-skill-score">88</span>
              </div>
              <div className="card-skill-row">
                <span className="card-skill-title">Regression &amp; Bug Reverification</span>
                <RatingDots score={85} />
                <span className="card-skill-score">85</span>
              </div>
            </div>

            {/* 6. Bottom Metadata Bar */}
            <div className="card-bottom-meta-bar">
              <span>Pune, India</span>
              <span>·</span>
              <span>Remote / Hybrid</span>
              <span>·</span>
              <span>Replies &lt; 2h</span>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="ability-card-face ability-card-face-back" aria-hidden={!isFlipped}>
          <div className="ability-hologram-foil" />
          <QAEmblemBack />
        </div>
      </div>
    </div>
  );

  const credentials = isFlipped && ready && (
    <div className="ability-credentials">
      <button
        type="button"
        className="ability-credentials-trigger"
        ref={credentialsButton}
        aria-expanded={showCredentials}
        onClick={() => setShowCredentials((open) => !open)}
      >
        {showCredentials ? "Hide credentials" : "Verified credentials"}
      </button>
      {showCredentials && (
        <div
          className="ability-credentials-panel"
          role="region"
          aria-label="Verified credentials"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            event.stopPropagation();
            setShowCredentials(false);
            credentialsButton.current?.focus();
          }}
        >
          <div className="ability-credentials-content">
            <div className="card-back-header">
              <h3 className="card-back-title">Verified Credentials</h3>
              <span className="card-back-subtitle">QA Specialist</span>
            </div>

            <div className="card-metrics-grid-2x2">
              <div className="card-metric-cell">
                <span className="card-metric-val">240+</span>
                <span className="card-metric-lbl">Defects Isolated</span>
              </div>
              <div className="card-metric-cell">
                <span className="card-metric-val">~40%</span>
                <span className="card-metric-lbl">Regression Cut</span>
              </div>
              <div className="card-metric-cell">
                <span className="card-metric-val">100k+</span>
                <span className="card-metric-lbl">Virtual Concurrency</span>
              </div>
              <div className="card-metric-cell">
                <span className="card-metric-val">99.4%</span>
                <span className="card-metric-lbl">Suite Determinism</span>
              </div>
            </div>

            <div className="card-credentials-box">
              <div className="card-cred-row">
                <Award size={14} className="text-[#D4AF37]" />
                <span>
                  <strong>Certified SDET:</strong> SEED Infotech Pune
                </span>
              </div>
              <div className="card-cred-row">
                <GraduationCap size={14} className="text-[#D4AF37]" />
                <span>
                  <strong>B.E. Information Technology:</strong> Univ. of Pune
                </span>
              </div>
              <div className="card-cred-row">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span>
                  <strong>Current Role:</strong> Profcyma Solutions Pvt. Ltd.
                </span>
              </div>
            </div>

            <div className="card-tech-chips">
              <span className="card-tech-chip">Selenium 4</span>
              <span className="card-tech-chip">Playwright</span>
              <span className="card-tech-chip">JMeter</span>
              <span className="card-tech-chip">REST Assured</span>
              <span className="card-tech-chip">Appium</span>
              <span className="card-tech-chip">TestNG</span>
              <span className="card-tech-chip">Java</span>
              <span className="card-tech-chip">TypeScript</span>
            </div>

            <div className="card-gold-seal">
              <Sparkles size={12} />
              <span>AUTHENTIC QA CERTIFICATION · PUNE, IN</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 1. INLINE MODE
  if (isInline) {
    return (
      <div
        ref={containerRef}
        className="ability-card-inline-container"
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <canvas ref={canvasRef} className="ability-particles-canvas ability-particles-inline" />
        <div className="ability-card-stage-wrap ability-card-stage-wrap-inline">{cardMarkup}</div>
        {credentials}
        <div className="ability-inline-hud">
          <span className="ability-instructions">
            MOVE TO TILT · DRAG TO ROTATE · TAP OR ENTER TO FLIP
          </span>
          <div className="ability-inline-actions">
            <button
              type="button"
              className="ability-flip-pill-btn"
              onClick={() => setIsFlipped((prev) => !prev)}
              aria-label="Flip Ability Card"
            >
              <RotateCw size={13} />
              <span>FLIP TO {isFlipped ? "FRONT" : "BACK"}</span>
            </button>

            {onExpand && (
              <button
                type="button"
                className="ability-expand-pill-btn"
                onClick={onExpand}
                aria-label="Expand Ability Card to Fullscreen"
              >
                <Maximize2 size={13} />
                <span>EXPAND</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. MODAL MODE
  return (
    <div
      ref={dialogRef}
      className="ability-card-modal-backdrop"
      data-card-ready={ready}
      role="dialog"
      aria-modal="true"
      aria-label="3D Ability Card of Shashank Shinde"
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <canvas ref={canvasRef} className="ability-particles-canvas" />

      <div className="ability-hud-top">
        <div className="ability-brand-group" aria-hidden={!ready}>
          <span className="ability-brand-name">SHASHANK SHINDE</span>
          <span className="ability-brand-subtitle">Ability Card</span>
        </div>

        {onClose && (
          <button
            type="button"
            className="ability-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close Ability Card"
          >
            <X size={16} />
            <span>Close</span>
          </button>
        )}
      </div>

      {!ready && (
        <div className="ability-loader">
          <div className="ability-loader-inner">
            <span className="ability-loader-name">Shashank Shinde</span>
            <div
              className="ability-loader-track"
              role="progressbar"
              aria-label="Loading the card"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <div className="ability-loader-label">
              <span>Loading the card</span>
              <b>{progress}%</b>
            </div>
          </div>
        </div>
      )}
      <div className="ability-card-stage-wrap" inert={!ready}>
        {cardMarkup}
      </div>
      {credentials}

      <div className="ability-hud-bottom" inert={!ready}>
        <span className="ability-instructions ability-desktop-instructions">
          Hover to tilt · Drag to rotate · Double-click to flip
        </span>
        <span className="ability-instructions ability-touch-instructions">
          Drag to rotate · Tap to flip
        </span>
        <button
          type="button"
          className="ability-mobile-flip-btn"
          onClick={() => setIsFlipped((prev) => !prev)}
        >
          <RotateCw size={13} />
          <span>FLIP TO {isFlipped ? "FRONT" : "BACK"}</span>
        </button>
      </div>
    </div>
  );
}
