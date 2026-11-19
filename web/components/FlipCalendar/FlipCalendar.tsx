"use client";

import { useEffect, useRef } from "react";
import "./FlipCalendar.css";

interface FlipCalendarProps {
  skills?: string[];
}

const DEFAULT_SKILLS = [
  "QA Automation",
  "Mobile Testing",
  "Manual QA",
  "API Testing",
  "Performance QA",
];

export default function FlipCalendar({ skills = DEFAULT_SKILLS }: FlipCalendarProps) {
  const calRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const leafRef = useRef<HTMLSpanElement>(null);
  const faceRef = useRef<HTMLSpanElement>(null);
  const rearRef = useRef<HTMLSpanElement>(null);
  const underRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const ringsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cal = calRef.current;
    const body = bodyRef.current;
    const leaf = leafRef.current;
    const face = faceRef.current;
    const rear = rearRef.current;
    const under = underRef.current;
    const measure = measureRef.current;
    const rings = ringsRef.current;

    if (!cal || !body || !leaf || !face || !rear || !under || !measure || !rings) return;

    const HOLD = 1800;
    const FLIP = 1250;
    const n = skills.length;
    if (!n) return;
    let disposed = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let i = 0;
    let timer: NodeJS.Timeout | number = 0;

    const paint = (page: HTMLElement, k: number) => {
      const word = page.querySelector<HTMLElement>(".cal__word");
      const no = page.querySelector<HTMLElement>(".cal__no");
      if (word) word.textContent = skills[k];
      if (no) no.textContent = `${String(k + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    };

    paint(face, 0);
    paint(under, 1 % n);

    // Dynamically size the calendar to the longest skill and set ring/hole count
    const fit = () => {
      if (disposed) return;
      cal.style.fontSize = "";
      const fs = parseFloat(getComputedStyle(cal).fontSize) || 16;
      let max = 0;
      for (const w of skills) {
        measure.textContent = w;
        max = Math.max(max, measure.getBoundingClientRect().width);
      }
      const wEm = max / fs + 1.25;
      body.style.setProperty("--cal-w", wEm.toFixed(3) + "em");
      cal.style.setProperty("--cal-w", wEm.toFixed(3) + "em");

      const parentEl = cal.parentElement;
      if (parentEl) {
        const avail = parentEl.getBoundingClientRect().width - fs * 0.25;
        const need = wEm * fs;
        if (need > avail && avail > 0) {
          cal.style.fontSize = ((fs * avail) / need).toFixed(2) + "px";
        }
      }

      // Spiral rings + punched holes, spaced roughly every 0.7em
      const count = Math.max(5, Math.round((wEm - 0.64) / 0.7) + 1);
      rings.innerHTML = "<i></i>".repeat(count);
      cal.querySelectorAll<HTMLElement>(".cal__holes").forEach((h) => {
        h.innerHTML = "<i></i>".repeat(count);
      });
    };

    fit();
    document.fonts?.ready?.then(fit);
    window.addEventListener("resize", fit);

    const faceShade = face.querySelector<HTMLElement>(".cal__shade");
    const underShade = under.querySelector<HTMLElement>(".cal__shade");

    const flip = () => {
      if (disposed || motion.matches || n < 2) return;
      if (document.hidden) {
        timer = setTimeout(flip, 600);
        return;
      }
      const next = (i + 1) % n;

      const timing: KeyframeAnimationOptions = {
        duration: FLIP,
        easing: "cubic-bezier(.5,.05,.2,1)",
        fill: "forwards",
      };

      // 1. Face fade as it flips over the top
      face.animate(
        [
          { opacity: 1 },
          { opacity: 1, offset: 0.285 },
          { opacity: 0, offset: 0.295 },
          { opacity: 0 },
        ],
        { duration: FLIP, easing: "linear", fill: "forwards" },
      );

      // 2. Rear lighting shift as page goes behind the calendar
      rear.animate(
        [
          { filter: "brightness(1)" },
          { filter: "brightness(1.02)", offset: 0.29 },
          { filter: "brightness(.96)", offset: 0.45 },
          { filter: "brightness(.9)" },
        ],
        { duration: FLIP, easing: "linear", fill: "forwards" },
      );

      // 3. 3D leaf rotation: 0deg -> 352deg
      const a = leaf.animate(
        [
          { transform: "translateZ(.004em) rotateX(0deg)" },
          { transform: "translateZ(.004em) rotateX(352deg)" },
        ],
        timing,
      );

      // 4. Subtle ambient lighting shadows
      if (faceShade) {
        faceShade.animate(
          [
            { opacity: 0 },
            { opacity: 0.45, offset: 0.2 },
            { opacity: 0, offset: 0.275 },
            { opacity: 0 },
          ],
          { duration: FLIP, easing: "linear", fill: "forwards" },
        );
      }

      if (underShade) {
        underShade.animate([{ opacity: 0.7 }, { opacity: 0 }], {
          duration: FLIP * 0.9,
          easing: "cubic-bezier(.3,.6,.4,1)",
          fill: "forwards",
        });
      }

      a.onfinish = () => {
        i = next;
        paint(face, i);
        leaf.getAnimations({ subtree: true }).forEach((x) => x.cancel());
        cal.querySelectorAll<HTMLElement>(".cal__shade").forEach((sh) => {
          sh.getAnimations().forEach((x) => x.cancel());
        });
        paint(under, (i + 1) % n);
        timer = setTimeout(flip, HOLD);
      };
    };

    if (!motion.matches && n > 1) timer = setTimeout(flip, 1300);

    return () => {
      disposed = true;
      cal.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      clearTimeout(timer as NodeJS.Timeout);
      window.removeEventListener("resize", fit);
    };
  }, [skills]);

  return (
    <span className="cal-line" role="img" aria-label={skills.join(", ")}>
      <span className="cal" aria-hidden="true" id="cal" ref={calRef}>
        <span className="cal__body" ref={bodyRef}>
          <span className="cal__stand" aria-hidden="true"></span>
          <span className="cal__stack">
            <span className="cal__back" aria-hidden="true">
              <span className="cal__holes"></span>
            </span>
            <span className="cal__page" data-under ref={underRef}>
              <span className="cal__holes" aria-hidden="true"></span>
              <span className="cal__word">{skills[0] ?? "Software Test Engineer"}</span>
              <span className="cal__no"></span>
              <span className="cal__shade" aria-hidden="true"></span>
            </span>
            <span className="cal__leaf" ref={leafRef}>
              <span className="cal__face" ref={faceRef}>
                <span className="cal__holes" aria-hidden="true"></span>
                <span className="cal__word">{skills[0] ?? "Software Test Engineer"}</span>
                <span className="cal__no"></span>
                <span className="cal__shade" aria-hidden="true"></span>
              </span>
              <span className="cal__rear" ref={rearRef} aria-hidden="true">
                <span className="cal__holes"></span>
              </span>
            </span>
          </span>
          <span className="cal__rings" ref={ringsRef} aria-hidden="true"></span>
        </span>
        <span className="cal__measure" ref={measureRef} aria-hidden="true"></span>
      </span>
    </span>
  );
}
