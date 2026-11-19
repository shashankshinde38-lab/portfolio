"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global smooth scroll provider that enhances anchor link navigation
 * and handles smooth scrolling to page sections like #story and #doors.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const enabled = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (pathname.startsWith("/admin")) return;
    let frame = 0;
    let target = 0;
    let lastPosition = 0;
    let lastTime = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const advance = (now: number) => {
      const y = window.scrollY;
      if (Math.abs(y - lastPosition) > 2 || !enabled.matches || document.hidden) {
        stop();
        return;
      }
      const remaining = target - y;
      const blend = 1 - Math.exp(-Math.max(1, now - lastTime) / 95);
      const done = Math.abs(remaining) < 2;
      const step = Math.sign(remaining) * Math.max(1, Math.abs(remaining) * blend);
      window.scrollTo({ top: done ? target : y + step, behavior: "instant" });
      lastPosition = window.scrollY;
      lastTime = now;
      frame = done || lastPosition === y ? 0 : requestAnimationFrame(advance);
    };
    const wheel = (event: WheelEvent) => {
      const el = event.target;
      if (
        !enabled.matches ||
        !event.cancelable ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        !(el instanceof Element) ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL && Math.abs(event.deltaY) < 45) ||
        el.closest(
          '[role="dialog"],dialog,input,textarea,select,[contenteditable="true"],.lp-screen-scroll,.qa-lab-viewport',
        ) ||
        document.body.style.overflow === "hidden" ||
        document.documentElement.style.overflow === "hidden"
      ) {
        stop();
        return;
      }
      for (
        let parent = el;
        parent && parent !== document.body && parent !== document.documentElement;
        parent = parent.parentElement!
      ) {
        if (
          parent.scrollHeight > parent.clientHeight + 1 &&
          /auto|scroll/.test(getComputedStyle(parent).overflowY)
        ) {
          stop();
          return;
        }
      }
      const height = document.documentElement.scrollHeight - innerHeight;
      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? innerHeight
            : 1;
      const base = frame ? target : window.scrollY;
      target = Math.max(0, Math.min(height, base + event.deltaY * unit));
      if (!frame && target === window.scrollY) return;
      event.preventDefault();
      if (!frame) {
        lastPosition = window.scrollY;
        lastTime = performance.now();
        frame = requestAnimationFrame(advance);
      }
    };
    // Touch and precision-delta scrolling use the browser's own momentum.
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop, true);
    document.addEventListener("visibilitychange", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop, true);
      document.removeEventListener("visibilitychange", stop);
    };
  }, [pathname]);

  useEffect(() => {
    let arrivalTimer: ReturnType<typeof setTimeout> | undefined;
    const behavior = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? ("instant" as const)
        : ("smooth" as const);
    // 1. Handle anchor clicks smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Check if it's an on-page hash link
      if (href.startsWith("#") && href.length > 1) {
        const id = href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: behavior(), block: "start" });
          window.history.pushState(null, "", href);
        }
      } else if (href.startsWith("/#") && pathname === "/") {
        const id = href.slice(2);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: behavior(), block: "start" });
          window.history.pushState(null, "", `/#${id}`);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // 2. Handle hash on initial mount or route arrival
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      arrivalTimer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: behavior(), block: "start" });
        }
      }, 250);
    }

    return () => {
      clearTimeout(arrivalTimer);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [pathname]);

  return null;
}
