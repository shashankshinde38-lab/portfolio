"use client";
import { useEffect, useRef, type ReactNode } from "react";
import "./ProjectStack.css";
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Page scroll controls the overlap between cards. Each monitor scrolls independently. */
export default function ProjectStack({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-project-card]"));
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = matchMedia("(max-width: 900px)");
    const header = document.querySelector<HTMLElement>(".site-header");
    let frame = 0,
      disposed = false;
    const update = () => {
      frame = 0;
      if (disposed || document.hidden) return;
      const mobile = narrow.matches,
        reduced = motion.matches;
      root.dataset.stackMotion = reduced ? "reduced" : "full";
      const headerHeight = header?.getBoundingClientRect().height ?? 66;
      const firstTop = (mobile ? Math.max(70, headerHeight) : headerHeight) + (mobile ? 10 : 16);
      const step = mobile ? 10 : 14;
      // Read all geometry before committing styles. Tall content can scroll completely
      // through the viewport before pinning, so no QA detail becomes unreachable.
      const bounds = cards.map((card) => card.getBoundingClientRect());
      const heights = cards.map((card) => card.offsetHeight);
      cards.forEach((card, index) => {
        const top = Math.min(firstTop + index * step, innerHeight - heights[index] - 24);
        const incoming = bounds[index + 1];
        const covered =
          incoming && !reduced
            ? clamp((top + heights[index] - incoming.top) / Math.max(1, heights[index]))
            : 0;
        card.style.setProperty("--project-sticky-top", `${top}px`);
        card.style.setProperty("--project-scale", String(1 - covered * 0.06));
        card.style.setProperty("--project-shade", String(covered * 0.28));
        card.dataset.coverProgress = covered.toFixed(4);
      });
    };
    const schedule = () => {
      if (!frame && !disposed) frame = requestAnimationFrame(update);
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    };
    const revealFocusedCard = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>("[data-project-card]");
      if (!card || !root.contains(card) || Number(card.dataset.coverProgress) < 0.1) return;
      let offset = 0;
      for (const item of cards) {
        if (item === card) break;
        offset += item.offsetHeight + (parseFloat(getComputedStyle(item).marginBottom) || 0);
      }
      const top = parseFloat(getComputedStyle(card).top) || firstHeaderTop();
      window.scrollTo({
        top: root.getBoundingClientRect().top + scrollY + offset - top,
        behavior: "instant",
      });
      schedule();
    };
    const firstHeaderTop = () => (header?.getBoundingClientRect().height ?? 66) + 16;
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    cards.forEach((card) => observer.observe(card));
    if (header) observer.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", visibility);
    root.addEventListener("focusin", revealFocusedCard);
    [motion, narrow].forEach((query) => query.addEventListener("change", schedule));
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", visibility);
      root.removeEventListener("focusin", revealFocusedCard);
      [motion, narrow].forEach((query) => query.removeEventListener("change", schedule));
    };
  }, [children]);
  return (
      <div ref={rootRef} className={`project-stack ${className}`} data-project-stack>
        {children}
      </div>
  );
}
