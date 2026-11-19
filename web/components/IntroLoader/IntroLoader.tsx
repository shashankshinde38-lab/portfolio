"use client";

import { useEffect, useRef, useState } from "react";
import "./IntroLoader.css";

interface IntroLoaderProps {
  onComplete?: () => void;
}

const INTRO_CAPSULES = [
  {
    id: "identity",
    title: "Shashank Shinde",
    badge: "QA Specialist",
    bg: "#2A2726",
    border: "rgba(255,255,255,0.06)",
    color: "#F5F2EE",
  },
  {
    id: "automation",
    title: "Automation testing",
    badge: "Playwright · Selenium",
    bg: "#1E2A3A",
    border: "rgba(255,255,255,0.05)",
    color: "#F5F2EE",
  },
  {
    id: "mobile",
    title: "Mobile testing",
    badge: "Appium · Android · iOS",
    bg: "#3A2A33",
    border: "rgba(255,255,255,0.05)",
    color: "#F5F2EE",
  },
  {
    id: "manual",
    title: "Manual QA",
    badge: "STLC · Defect Analysis",
    bg: "#4A5648",
    border: "rgba(255,255,255,0.05)",
    color: "#F5F2EE",
  },
  {
    id: "api",
    title: "API testing",
    badge: "REST Assured · Postman",
    bg: "#7A3F28",
    border: "rgba(255,255,255,0.05)",
    color: "#F5F2EE",
  },
  {
    id: "performance",
    title: "Performance QA",
    badge: "JMeter · 100k+ Concurrency",
    bg: "#6B5F5E",
    border: "rgba(255,255,255,0.05)",
    color: "#F5F2EE",
  },
];

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const callback = useRef(onComplete);
  callback.current = onComplete;

  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      location.hash
    ) {
      setHidden(true);
      callback.current?.();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Small delay so the entrance animation can play
    const enterTimer = setTimeout(() => setEntered(true), 40);

    let animFrame = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const duration = 1650;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Soft cubic ease-out
      const eased = 1 - Math.pow(1 - t, 2.6);
      const currentVal = Math.min(Math.floor(eased * 100), 100);
      setProgress(currentVal);

      if (t < 1) {
        animFrame = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        timers.push(
          setTimeout(() => {
            setExiting(true);
            timers.push(
              setTimeout(() => {
                setHidden(true);
                document.body.style.overflow = previousOverflow;
                callback.current?.();
              }, 780),
            );
          }, 180),
        );
      }
    };

    animFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(enterTimer);
      timers.forEach(clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (hidden) return null;

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
      callback.current?.();
    }, 320);
  };

  return (
    <div
      className={`intro-loader-backdrop ${exiting ? "intro-loader-exit" : ""} ${entered ? "is-entered" : ""}`}
      aria-hidden="true"
      onClick={handleSkip}
    >
      {/* Soft edge vignette */}
      <div className="intro-vignette" />

      <div className="intro-loader-content">
        {/* Top Header */}
        <header className="intro-loader-header">
          <span className="intro-loader-brand">SHASHANK SHINDE · PORTFOLIO</span>
          <span className="intro-loader-disciplines">
            AUTOMATION · MOBILE · MANUAL · API · PERFORMANCE
          </span>
        </header>

        {/* Center stack */}
        <div className="intro-capsules-center">
          <div
            className={`intro-capsules-stack ${exiting ? "stack-scattered" : ""}`}
          >
            {INTRO_CAPSULES.map((capsule, index) => (
              <div
                key={capsule.id}
                className={`intro-capsule-pill pill-pos-${index}`}
                style={{
                  backgroundColor: capsule.bg,
                  borderColor: capsule.border,
                  color: capsule.color,
                  zIndex: INTRO_CAPSULES.length - index,
                  ["--i" as string]: index,
                }}
              >
                <span className="intro-capsule-title">{capsule.title}</span>
                <span className="intro-capsule-badge">{capsule.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <footer className="intro-loader-footer">
          <div className="intro-footer-left">
            <span className="intro-loader-indicator">OPENING UP THE WORK</span>
            <div className="intro-loader-counter">
              <span className="intro-loader-num">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </div>

          <div className="intro-footer-right">
            <span className="intro-loader-location">PUNE, IN · IST</span>
            <div className="intro-loader-bar-wrap">
              <div className="intro-loader-bar">
                <div
                  className="intro-loader-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}