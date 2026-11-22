"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./IntroLoader.css";

interface IntroLoaderProps {
  onComplete?: () => void;
}

const INTRO_CAPSULES = [
  { id: "identity", title: "Shashank Shinde", detail: "QA Specialist" },
  { id: "automation", title: "Automation Testing", detail: "Playwright · Selenium" },
  { id: "mobile", title: "Mobile Testing", detail: "Appium · Android · iOS" },
  { id: "manual", title: "Manual QA", detail: "STLC · Defect Analysis" },
  { id: "api", title: "API Testing", detail: "REST Assured · Postman" },
  { id: "performance", title: "Performance QA", detail: "JMeter · 100k+ Concurrency" },
] as const;

const PROGRESS_MS = 1380;
const HOLD_MS = 160;
const EXIT_MS = 680;
const SKIP_MS = 320;

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);
  const skipRef = useRef<(() => void) | null>(null);

  const [entered, setEntered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exitDuration, setExitDuration] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || completedRef.current) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let timer = 0;
    let leaving = false;
    let restoreScroll: (() => void) | undefined;

    const release = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      motion.removeEventListener("change", handleMotionChange);
      skipRef.current = null;
      if (dialog.open) dialog.close();
      restoreScroll?.();
      restoreScroll = undefined;
    };

    const complete = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      release();
      setHidden(true);
      onCompleteRef.current?.();
    };

    function handleMotionChange(event: MediaQueryListEvent) {
      if (event.matches) complete();
    }

    if (motion.matches) {
      complete();
      return;
    }

    const bodyStyle = document.body.style;
    const previousOverflow = bodyStyle.getPropertyValue("overflow");
    const previousPriority = bodyStyle.getPropertyPriority("overflow");
    restoreScroll = () => bodyStyle.setProperty("overflow", previousOverflow, previousPriority);
    bodyStyle.setProperty("overflow", "hidden", "important");
    try {
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    } catch {
      if (dialog) dialog.setAttribute("open", "");
    }

    const beginExit = (duration: number) => {
      if (leaving) return;
      leaving = true;
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      setExitDuration(duration);
      timer = window.setTimeout(complete, duration + 40);
    };

    skipRef.current = () => {
      if (leaving) {
        complete();
        return;
      }
      beginExit(SKIP_MS);
    };

    // A frame boundary keeps the initial capsule positions available for the CSS transition.
    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame((start) => {
        setEntered(true);
        const tick = (now: number) => {
          const elapsed = Math.min((now - start) / PROGRESS_MS, 1);
          setProgress(Math.floor((1 - (1 - elapsed) ** 1.6) * 100));

          if (elapsed < 1) {
            frame = window.requestAnimationFrame(tick);
          } else {
            timer = window.setTimeout(() => beginExit(EXIT_MS), HOLD_MS);
          }
        };
        tick(start);
      });
    });

    return release;
  }, []);

  if (hidden) return null;

  return (
    <dialog
      ref={dialogRef}
      className="qa-intro"
      aria-labelledby={titleId}
      data-entered={entered}
      data-exiting={exitDuration > 0}
      style={{ "--qa-exit": `${exitDuration || EXIT_MS}ms` } as CSSProperties}
      onCancel={(event) => {
        event.preventDefault();
        skipRef.current?.();
      }}
    >
      <div className="qa-intro__curtain" aria-hidden="true" />

      <div className="qa-intro__layout">
        <header className="qa-intro__header">
          <span className="qa-intro__label">Portfolio</span>
          <button className="qa-intro__skip" type="button" onClick={() => skipRef.current?.()}>
            Skip intro <span aria-hidden="true">→</span>
          </button>
        </header>

        <div className="qa-intro__stage">
          <h2 className="qa-intro__title" id={titleId}>
            Quality <em>Assurance</em>
          </h2>

          <ul className="qa-intro__capsules" aria-label="QA specializations" role="list">
            {INTRO_CAPSULES.map(({ id, title, detail }) => (
              <li className={`qa-intro__capsule qa-intro__capsule--${id}`} key={id}>
                <span className="qa-intro__capsule-title">{title}</span>
                <span className="qa-intro__capsule-detail">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <footer className="qa-intro__footer">
          <p className="qa-intro__status">
            Opening portfolio <span aria-hidden="true">{String(progress).padStart(3, "0")}</span>
          </p>
          <div className="qa-intro__track" aria-hidden="true">
            <div className="qa-intro__fill" style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <span className="qa-intro__location">Pune, IN · IST</span>
        </footer>
      </div>
    </dialog>
  );
}
