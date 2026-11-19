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

// Keep the exact image from your existing portfolio asset.
// Use the supplied WebP in public/images; do not stretch it to fit the art window.
const ARTWORK = "/images/portfolio_horizontal_centered_468x287.webp";

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
  const artRef = useRef<HTMLImageElement>(null);
  const progressTarget = useRef(0);
  const credentialsButton = useRef<HTMLButtonElement>(null);

  // Readiness milestones come from the actual font and image used on the card.
  // Animate between completed milestones so a cached asset does not flash a loader.
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

  // 3D Tilt and Drag Physics
  const tilt = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const drag = useRef({ isDragging: false, startX: 0, startY: 0, currentRotX: 0, currentRotY: 0 });
  const animFrameId = useRef<number | null>(null);
  const highlightTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tapStart = useRef({ x: 0, y: 0 });
  const pointerType = useRef("mouse");

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

  // Listen for custom trigger to highlight/tilt card from navbar or buttons
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
      // Graceful fallback for devices without WebGL: the CSS card still works.
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

    // Create Golden Dust Embers
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

    // Soft Circular Gold Particle Texture
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

    // Animation Loop
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
      // Read from the *stable* outer stage rather than the already rotated
      // card. Using the rotated bounds makes the pointer angle jump/flicker.
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
      // Independent parallax offsets keep the portrait and foil lively while
      // the full card tilts as one physical object.
      cardRef.current?.style.setProperty("--portrait-pan-x", `${(-x * 4).toFixed(2)}px`);
      cardRef.current?.style.setProperty("--portrait-pan-y", `${(-y * 3).toFixed(2)}px`);
      cardRef.current?.style.setProperty("--glint-rotation", `${(x * 14).toFixed(2)}deg`);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (!drag.current.isDragging) {
      tilt.current.targetX = 0;
      tilt.current.targetY = 0;
      cardRef.current?.style.setProperty("--portrait-pan-x", "0px");
      cardRef.current?.style.setProperty("--portrait-pan-y", "0px");
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
      onPointerDown={handlePointerDown}
      onPointerUp={(e) => {
        // Touchscreen users can tap once to flip. Desktop retains double-click.
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
      <div className={`ability-card-body ${isFlipped ? "flipped" : ""}`}>
        {/* FRONT FACE */}
        <div className="ability-card-face ability-card-face-front" aria-hidden={isFlipped}>
          <GiltFrame />
          {/* Dynamic Holographic Foil Sheen */}
          <div className="ability-hologram-foil" />
          <div className="ability-metal-specular" aria-hidden="true" />
          <div className="ability-print-grain" aria-hidden="true" />

          {/* Inner Card Content */}
          <div className="card-inner-frame">
            {/* 1. Ornate Nameplate Banner */}
            <div className="card-nameplate-banner">
              <h2 className="card-gold-name">Shashank Shinde</h2>
            </div>

            <div className="card-emblem-box">
              <div className="card-portrait-bokeh" aria-hidden="true" />
              <div className="card-portrait-light-leaks" aria-hidden="true" />
              {artworkFailed ? (
                <svg
                  className="card-emblem-svg"
                  viewBox="0 0 280 180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Background Circuit & Grid Traces */}
                  <path
                    d="M20 90 H260 M140 10 V170"
                    stroke="#D4AF37"
                    strokeWidth="0.5"
                    strokeOpacity="0.2"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx="140"
                    cy="90"
                    r="68"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    strokeOpacity="0.25"
                    strokeDasharray="4 2"
                  />
                  <circle
                    cx="140"
                    cy="90"
                    r="54"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeOpacity="0.45"
                  />

                  {/* Outer Laurel Garland Arc */}
                  <path
                    d="M85 110 C80 90, 85 65, 105 45 C115 35, 130 30, 140 30 C150 30, 165 35, 175 45 C195 65, 200 90, 195 110 C185 130, 165 145, 140 148 C115 145, 95 130, 85 110 Z"
                    stroke="#E6C762"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                  />

                  {/* Shield Silhouette */}
                  <path
                    d="M140 38 L170 52 V90 C170 114 156 130 140 138 C124 130 110 114 110 90 V52 L140 38 Z"
                    fill="url(#crestGoldGrad)"
                    stroke="#FFE8A3"
                    strokeWidth="1.6"
                  />

                  {/* Inner Crest Monogram / QA Insignia */}
                  <text
                    x="140"
                    y="86"
                    fill="#1C1408"
                    fontFamily="'EB Garamond', serif"
                    fontSize="24"
                    fontWeight="800"
                    textAnchor="middle"
                    letterSpacing="2"
                  >
                    SDET
                  </text>
                  <text
                    x="140"
                    y="104"
                    fill="#3D290A"
                    fontFamily="'Onest', sans-serif"
                    fontSize="8.5"
                    fontWeight="700"
                    textAnchor="middle"
                    letterSpacing="3"
                  >
                    ASSURANCE
                  </text>

                  {/* Stars / Diamonds */}
                  <polygon
                    points="140,24 142.5,29 148,30 143.5,33.5 145,39 140,36 135,39 136.5,33.5 132,30 137.5,29"
                    fill="#FFEDB3"
                  />

                  <defs>
                    <linearGradient
                      id="crestGoldGrad"
                      x1="110"
                      y1="38"
                      x2="170"
                      y2="138"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#FFF2CC" />
                      <stop offset="35%" stopColor="#D4AF37" />
                      <stop offset="70%" stopColor="#996515" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <img
                  ref={artRef}
                  src={ARTWORK}
                  alt="Professional portrait of Shashank Shinde"
                  draggable={false}
                  onError={() => setArtworkFailed(true)}
                />
              )}
              <span className="card-emblem-badge" aria-hidden="true">✦</span>
            </div>
            {/* 3. Ornate Gold Divider */}
            <div className="card-filigree-divider">
              <span className="card-filigree-line" />
              <span>✦ ❖ ✦</span>
              <span className="card-filigree-line" />
            </div>

            {/* 4. Specialization Ratings Table */}
            <div className="card-skills-table">
              <div className="card-skill-row">
                <span className="card-skill-title">QA Automation</span>
                <RatingDots score={95} />
                <span className="card-skill-score">95</span>
              </div>
              <div className="card-skill-row">
                <span className="card-skill-title">Mobile App Testing</span>
                <RatingDots score={90} />
                <span className="card-skill-score">90</span>
              </div>
              <div className="card-skill-row">
                <span className="card-skill-title">Manual QA &amp; STLC</span>
                <RatingDots score={98} />
                <span className="card-skill-score">98</span>
              </div>
              <div className="card-skill-row">
                <span className="card-skill-title">API &amp; Performance</span>
                <RatingDots score={92} />
                <span className="card-skill-score">92</span>
              </div>
            </div>

            {/* 5. Bottom Metadata Bar */}
            <div className="card-bottom-meta-bar">
              <span>
                Based: <strong>India (Pune)</strong>
              </span>
              <span>·</span>
              <span>
                Work: <strong>Remotely / Hybrid</strong>
              </span>
              <span>·</span>
              <span>
                Replies: <strong>&lt; 2 hours</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="ability-card-face ability-card-face-back" aria-hidden={!isFlipped}>
          <Compass />
          <div className="ability-hologram-foil" />
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
            {/* Back Header */}
            <div className="card-back-header">
              <h3 className="card-back-title">Verified Credentials</h3>
              <span className="card-back-subtitle">Software Development Engineer in Test</span>
            </div>

            {/* 2x2 Production Metrics */}
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

            {/* Credentials & Education */}
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

            {/* Toolchain Strip */}
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

            {/* Gilded Seal */}
            <div className="card-gold-seal">
              <Sparkles size={12} />
              <span>AUTHENTIC QA CERTIFICATION · PUNE, IN</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 1. INLINE MODE (Displayed directly inside the Hero Section stage)
  if (isInline) {
    return (
      <div
        ref={containerRef}
        className="ability-card-inline-container"
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Subtle Ambient Golden Particles Canvas */}
        <canvas ref={canvasRef} className="ability-particles-canvas ability-particles-inline" />

        {/* 3D Card Stage Wrap */}
        <div className="ability-card-stage-wrap ability-card-stage-wrap-inline">{cardMarkup}</div>

        {credentials}
        {/* Bottom Interactive HUD for Inline Stage */}
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

  // 2. MODAL MODE (Full-screen dark immersive backdrop)
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
      {/* Three.js Golden Particle Embers Canvas */}
      <canvas ref={canvasRef} className="ability-particles-canvas" />

      {/* Top HUD Bar */}
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

      {/* Bottom HUD: Interaction Instructions & Mobile Flip Action */}
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
