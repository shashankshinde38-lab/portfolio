"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";
import { canonicalPortfolioPath } from "@/web/utils/routes";
import type { DoorJourney } from "./SpecialtyDoorNavigation";
import "./QADoorsFrame.css";

type DoorData = {
  id: string;
  title: string;
  plate: string;
  tagline: string;
  points: string[];
  href: string;
  color: string;
  darkColor: string;
  glow: string;
};

const DOORS: DoorData[] = [
  {
    id: "automation",
    title: "QA Automation",
    plate: "QA AUTOMATION",
    tagline: "ROBUST CI/CD AUTOMATION & FRAMEWORKS",
    points: [
      "Playwright, Selenium & Appium",
      "TypeScript & Java Test Frameworks",
      "Page Object Model Architecture",
      "GitHub Actions & Jenkins CI/CD",
      "Automated Regression & Smoke Suites",
    ],
    href: "/automation-testing",
    color: "#22304a",
    darkColor: "#1c2840",
    glow: "255,196,128",
  },
  {
    id: "mobile",
    title: "Mobile Testing",
    plate: "MOBILE TESTING",
    tagline: "CROSS-PLATFORM ANDROID & IOS VALIDATION",
    points: [
      "Real Device Lab Testing (BrowserStack)",
      "Appium 2.0 Gesture & Touch Validation",
      "Memory Leak & Battery Profiling",
      "APK & IPA Release Sign-Off",
      "Offline Mode & Network Throttling",
    ],
    href: "/mobile-testing",
    color: "#4a3540",
    darkColor: "#3f2d37",
    glow: "220,155,180",
  },
  {
    id: "manual",
    title: "Manual QA",
    plate: "MANUAL QA",
    tagline: "DEEP STLC & EDGE-CASE INVESTIGATION",
    points: [
      "Test Case Design & Matrix Modeling",
      "Equivalence & Boundary Value Analysis",
      "Exploratory & Ad-Hoc Bug Hunting",
      "Jira Defect Lifecycle Tracking",
      "Production Readiness Sign-Off",
    ],
    href: "/manual-testing",
    color: "#7a8670",
    darkColor: "#66705d",
    glow: "190,215,160",
  },
  {
    id: "api",
    title: "API Testing",
    plate: "API TESTING",
    tagline: "COMPREHENSIVE BACKEND & CONTRACT AUDITS",
    points: [
      "Postman Collections & Automated Runs",
      "REST Assured Framework Architecture",
      "JSON Schema & Payload Validation",
      "JWT, OAuth2 & Auth Flow Testing",
      "Database State & SQL Verification",
    ],
    href: "/api-testing",
    color: "#a4552c",
    darkColor: "#8c4826",
    glow: "255,190,130",
  },
  {
    id: "performance",
    title: "Performance Testing",
    plate: "PERFORMANCE QA",
    tagline: "LOAD & CONCURRENCY BENCHMARKING",
    points: [
      "Apache JMeter Distributed Load Tests",
      "Stress & Spike Traffic Simulation",
      "Response Time & Latency Benchmarks",
      "Throughput & Bottleneck Profiling",
      "Production Scalability Reports",
    ],
    href: "/performance-testing",
    color: "#262523",
    darkColor: "#201f1d",
    glow: "210,190,155",
  },
];

type Spring = { set(target: number, immediate?: boolean, onRest?: () => void): void; stop(): void };

/** Frame-rate-independent damped spring. Matches the supplied door's 70-degree swing. */
function makeSpring(render: (value: number) => void, reduced: () => boolean): Spring {
  let x = 0;
  let onRest: (() => void) | undefined;
  let velocity = 0;
  let target = 0;
  let frame = 0;
  let last = 0;
  const tension = 120;
  const friction = 14;
  render(0);

  function step(now: number) {
    if (!last) last = now;
    // Substeps make motion consistent on 60/90/120Hz displays and after tab switches.
    const elapsed = Math.min((now - last) / 1000, 0.05);
    last = now;
    const n = Math.max(1, Math.ceil(elapsed / (1 / 120)));
    const dt = elapsed / n;
    for (let i = 0; i < n; i++) {
      const acceleration = tension * (target - x) - friction * velocity;
      velocity += acceleration * dt;
      x += velocity * dt;
    }
    if ((target === 0 && x <= 0) || (Math.abs(target - x) < 0.001 && Math.abs(velocity) < 0.001)) {
      x = target;
      velocity = 0;
      frame = 0;
      render(x);
      const done = onRest;
      onRest = undefined;
      done?.();
      return;
    }
    render(x);
    frame = requestAnimationFrame(step);
  }

  return {
    set(next, immediate = false, done) {
      target = next;
      onRest = done;
      if (immediate || reduced()) {
        cancelAnimationFrame(frame);
        frame = 0;
        x = next;
        velocity = 0;
        last = 0;
        render(x);
        onRest = undefined;
        done?.();
        return;
      }
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(step);
      }
    },
    stop() {
      onRest = undefined;
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

function doorwayCamera(frame: HTMLElement, opening: HTMLElement, door: HTMLElement) {
  const openingRect = opening.getBoundingClientRect();
  const doorRect = door.getBoundingClientRect();
  const gapLeft = Math.min(Math.max(doorRect.right, openingRect.left), openingRect.right - 6);
  const gapWidth = Math.max(openingRect.right - gapLeft, 10);
  const cx = (gapLeft + openingRect.right) / 2;
  const cy = openingRect.top + openingRect.height / 2;
  const frameRect = frame.getBoundingClientRect();
  const tx = window.innerWidth / 2 - cx;
  const ty = window.innerHeight / 2 - cy;
  const scaleEnd = Math.min(
    45,
    Math.max(window.innerWidth / gapWidth, window.innerHeight / openingRect.height) * 1.15,
  );

  const origin = `${cx - frameRect.left}px ${cy - frameRect.top}px`;
  return { frameRect, tx, ty, scaleEnd, origin };
}

interface QADoorsFrameProps {
  id?: string;
  journey?: DoorJourney;
  onNavigate?: () => void;
}

type InfoPosition = { left: number; top: number; width: number };

/** Native React version: no iframe clipping, with touch and keyboard support. */
export default function QADoorsFrame({ id = "doors", journey, onNavigate }: QADoorsFrameProps) {
  const router = useRouter();
  const frameRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const unitRefs = useRef<(HTMLLIElement | null)[]>([]);
  const doorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const springRefs = useRef<Spring[]>([]);
  const timersRef = useRef<number[]>([]);
  const walkthroughRef = useRef(0);
  const flightRef = useRef<HTMLElement | null>(null);
  const busyRef = useRef(false);
  const reduceRef = useRef(false);
  const mobileRef = useRef(false);
  const sourceDoor = DOORS.findIndex(
    (door) => door.href === canonicalPortfolioPath(journey?.origin ?? ""),
  );
  const targetDoor = DOORS.findIndex((door) => door.href === journey?.destination);
  const [ready, setReady] = useState(!!journey);
  const [active, setActive] = useState<number | null>(null);
  const [reveal, setReveal] = useState((sourceDoor >= 0 ? sourceDoor : targetDoor) === 4);
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null);
  const [through, setThrough] = useState(false);
  const [infoPosition, setInfoPosition] = useState<InfoPosition | null>(null);

  const schedule = useCallback((fn: () => void, delay: number) => {
    timersRef.current.push(window.setTimeout(fn, delay));
  }, []);

  useEffect(() => {
    const syncTheme = () => setDark(document.documentElement.classList.contains("dark-theme"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const size = window.matchMedia("(max-width: 899.98px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncSize = () => {
      mobileRef.current = size.matches;
      setMobile(size.matches);
    };
    const syncMotion = () => {
      reduceRef.current = motion.matches;
    };
    syncSize();
    syncMotion();
    size.addEventListener("change", syncSize);
    motion.addEventListener("change", syncMotion);
    const springs = DOORS.map((_, i) =>
      makeSpring(
        (value) => {
          const door = doorRefs.current[i];
          const unit = unitRefs.current[i];
          if (door) door.style.transform = `rotateY(${Math.max(0, value) * 70}deg)`;
          if (unit) unit.style.setProperty("--o", Math.max(0, value).toFixed(4));
        },
        () => reduceRef.current,
      ),
    );
    springRefs.current = springs;
    // Start the staggered entrance when the section enters view, not before the user scrolls to it.
    const entryObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.intersectionRatio >= 0.18)) {
          setReady(true);
          entryObserver.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    if (frameRef.current) entryObserver.observe(frameRef.current);
    const restoreTimer = window.setTimeout(() => {
      if (frameRef.current?.id !== "doors" || location.hash !== "#doors") return;
      let last: string | null = null;
      try {
        last = sessionStorage.getItem("ss_last_door");
      } catch {
        /* Storage may be disabled. */
      }
      const index = DOORS.findIndex((door) => door.id === last);
      if (index === 4) setReveal(true);
      if (index >= 0) {
        unitRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center" });
        unitRefs.current[index]
          ?.querySelector<HTMLButtonElement>("button")
          ?.focus({ preventScroll: true });
      }
    }, 450);
    const timers = timersRef.current;
    return () => {
      clearTimeout(restoreTimer);
      observer.disconnect();
      size.removeEventListener("change", syncSize);
      motion.removeEventListener("change", syncMotion);
      entryObserver.disconnect();
      springs.forEach((s) => s.stop());
      timers.forEach(clearTimeout);
      cancelAnimationFrame(walkthroughRef.current);
      flightRef.current?.remove();
      flightRef.current = null;
    };
  }, []);

  // Position hover information in the space occupied by inactive doors.
  useLayoutEffect(() => {
    if (active === null || mobile || busyRef.current) {
      setInfoPosition(null);
      return;
    }
    const wall = wallRef.current;
    const card = infoRef.current;
    const rect = unitRefs.current[active]?.getBoundingClientRect();
    if (!wall || !card || !rect) return;
    const update = () => {
      const visible = unitRefs.current.filter(
        (el): el is HTMLLIElement => !!el && getComputedStyle(el).visibility !== "hidden",
      );
      const selected = unitRefs.current[active];
      const vi = selected ? visible.indexOf(selected) : -1;
      if (vi < 0) return;
      const other = visible.filter((el) => el !== selected);
      const targets =
        vi < 2
          ? other.slice(Math.max(0, vi), Math.max(0, vi) + 2)
          : other.slice(Math.max(0, vi - 2), vi);
      const group = targets.length ? targets : other;
      if (!group.length) return;
      const bounds = group.map((el) => el.getBoundingClientRect());
      const left = Math.min(...bounds.map((b) => b.left));
      const right = Math.max(...bounds.map((b) => b.right));
      const w = Math.min(right - left, 352);
      const wr = wall.getBoundingClientRect();
      const curr = selected!.getBoundingClientRect();
      setInfoPosition({
        left: left - wr.left + (right - left - w) / 2,
        top: curr.top - wr.top + curr.height / 2,
        width: w,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wall);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [active, mobile, reveal]);

  const endHover = useCallback((i: number) => {
    if (busyRef.current) return;
    springRefs.current[i]?.set(0);
    setActive((old) => (old === i ? null : old));
    cursorRef.current?.classList.remove("on");
  }, []);

  const hover = useCallback((i: number, event?: ReactPointerEvent<HTMLButtonElement>) => {
    if (busyRef.current || mobileRef.current) return;
    if (event && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    setActive(i);
    springRefs.current.forEach((spring, j) => spring.set(j === i ? 0.36 : 0));
    if (event && cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursorRef.current.classList.add("on");
    }
  }, []);

  const navigate = useCallback(
    (i: number) => {
      if (onNavigate) onNavigate();
      else router.push(DOORS[i].href);
    },
    [onNavigate, router],
  );

  const walkthrough = useCallback(
    (i: number) => {
      const frame = frameRef.current;
      const unit = unitRefs.current[i];
      const opening = unit?.querySelector<HTMLElement>(".opening");
      const door = doorRefs.current[i];
      if (!frame || !opening || !door) {
        navigate(i);
        return;
      }

      const { frameRect, tx, ty, scaleEnd, origin } = doorwayCamera(frame, opening, door);

      // Render a noninteractive copy above the entire site. Unlike an iframe or
      // a transformed descendant, this cannot be clipped by the page shell.
      const clone = frame.cloneNode(true) as HTMLElement;
      clone.removeAttribute("id");
      clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("inert", "");
      clone.classList.add("qa-doors-flight");
      Object.assign(clone.style, {
        top: `${frameRect.top}px`,
        left: `${frameRect.left}px`,
        width: `${frameRect.width}px`,
        height: `${frameRect.height}px`,
        transformOrigin: origin,
        willChange: "transform",
      });
      const originalViewport = frame.querySelector<HTMLElement>(".doors__viewport");
      const clonedViewport = clone.querySelector<HTMLElement>(".doors__viewport");
      const originalWall = frame.querySelector<HTMLElement>(".doors");
      const clonedWall = clone.querySelector<HTMLElement>(".doors");
      if (originalWall && clonedWall) {
        const wallHeight = originalWall.getBoundingClientRect().height;
        clonedWall.style.height = `${wallHeight}px`;
        clonedWall.style.minHeight = `${wallHeight}px`;
        clonedWall.classList.add("through");
      }
      (frame.closest("dialog") ?? document.body).appendChild(clone);
      flightRef.current = clone;
      if (
        originalViewport &&
        clonedViewport &&
        originalViewport.scrollWidth > originalViewport.clientWidth
      ) {
        clonedViewport.style.overflow = "hidden";
        clonedViewport.style.scrollSnapType = "none";
        clonedViewport.scrollLeft = originalViewport.scrollLeft;
      }
      frame.style.visibility = "hidden";
      setThrough(true);

      const start = performance.now();
      const duration = reduceRef.current ? 1 : 1300;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
        const scale = Math.exp(Math.log(scaleEnd) * eased);
        const shift = Math.min(1, eased * 1.6);
        clone.style.transform = `translate3d(${tx * shift}px, ${ty * shift}px, 0) scale(${scale})`;
        if (p < 1) {
          walkthroughRef.current = requestAnimationFrame(tick);
        } else {
          navigate(i);
          if (onNavigate) return;
          // If a destination is missing or navigation fails, restore interaction.
          schedule(() => {
            if (!frame.isConnected) return;
            clone.remove();
            if (flightRef.current === clone) flightRef.current = null;
            frame.style.visibility = "";
            busyRef.current = false;
            setEnteringIndex(null);
            setThrough(false);
            springRefs.current.forEach((s) => s.set(0, true));
          }, 3500);
        }
      };
      walkthroughRef.current = requestAnimationFrame(tick);
    },
    [navigate, onNavigate, schedule],
  );

  const enter = useCallback(
    (i: number) => {
      if (busyRef.current) return;
      try {
        sessionStorage.setItem("ss_last_door", DOORS[i].id);
      } catch {
        /* Storage may be disabled. */
      }
      router.prefetch(DOORS[i].href);
      busyRef.current = true;
      setActive(null);
      setEnteringIndex(i);
      cursorRef.current?.classList.remove("on");
      springRefs.current.forEach((s, index) => {
        if (i !== index) s.set(0);
      });
      if (reduceRef.current) {
        navigate(i);
        return;
      }
      const unit = unitRefs.current[i];
      unit?.classList.add("press");
      schedule(() => unit?.classList.remove("press"), 380);
      schedule(() => springRefs.current[i]?.set(1), reduceRef.current ? 0 : 170);
      schedule(() => walkthrough(i), reduceRef.current ? 0 : 760);
    },
    [navigate, router, schedule, walkthrough],
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!journey || !frame || targetDoor < 0) return;
    const viewport = frame.querySelector<HTMLElement>(".doors__viewport");
    const centerDoor = (index: number, behavior: ScrollBehavior) => {
      const unit = unitRefs.current[index];
      if (!unit || !viewport || !mobileRef.current) return;
      const box = unit.getBoundingClientRect();
      viewport.scrollTo({
        left:
          viewport.scrollLeft +
          box.left -
          viewport.getBoundingClientRect().left -
          (viewport.clientWidth - box.width) / 2,
        behavior,
      });
    };

    if (reduceRef.current) {
      enter(targetDoor);
      return;
    }
    const dialog = frame.closest("dialog");
    const firstDoor = sourceDoor >= 0 ? sourceDoor : targetDoor;
    centerDoor(firstDoor, "instant");
    let cancelled = false;
    let camera: Animation | undefined;
    let timer = 0;
    let enterTimer = 0;
    const moveToTarget = () => {
      if (cancelled) return;
      setReveal(targetDoor === 4);
      centerDoor(targetDoor, "smooth");
      const switching = sourceDoor >= 0;
      const pan = switching && (mobileRef.current || (sourceDoor === 4) !== (targetDoor === 4));
      enterTimer = window.setTimeout(() => enter(targetDoor), pan ? 650 : 85);
    };
    if (sourceDoor >= 0) {
      const unit = unitRefs.current[sourceDoor];
      const opening = unit?.querySelector<HTMLElement>(".opening");
      const leaf = doorRefs.current[sourceDoor];
      springRefs.current[sourceDoor]?.set(1, true);
      if (opening && leaf) {
        const { tx, ty, scaleEnd, origin } = doorwayCamera(frame, opening, leaf);
        frame.style.transformOrigin = origin;
        camera = frame.animate(
          [
            {
              transform: `translate3d(${tx}px,${ty}px,0) scale(${Math.min(3, scaleEnd)})`,
              opacity: 0.4,
            },
            { transform: "none", opacity: 1 },
          ],
          { duration: 540, easing: "cubic-bezier(.2,.75,.28,1)" },
        );
      }
      const closeSource = () => {
        if (!cancelled) springRefs.current[sourceDoor]?.set(0, false, moveToTarget);
      };
      if (camera) camera.finished.then(closeSource, () => {});
      else closeSource();
    } else {
      timer = window.setTimeout(moveToTarget, 130);
    }
    // A newly mounted wall starts closed. Reveal the dialog only after the
    // source leaf, camera and touch viewport are in their starting positions.
    dialog?.setAttribute("data-prepared", "");
    return () => {
      dialog?.removeAttribute("data-prepared");
      cancelled = true;
      camera?.cancel();
      clearTimeout(timer);
      clearTimeout(enterTimer);
    };
  }, [enter, journey, sourceDoor, targetDoor]);

  return (
    <section
      id={id}
      ref={frameRef}
      data-walking={enteringIndex !== null || undefined}
      className={`qa-doors-frame ${journey ? "" : "portfolio-door-wall"} ${through ? "is-through" : ""}`}
      data-mode={dark ? "dark" : "light"}
      aria-label="Explore QA engineering specializations through interactive doors"
    >
      <div
        className={`doors ${ready ? "in" : "pre"} ${active !== null ? "focus" : ""} ${reveal && !mobile ? "reveal" : ""} ${through ? "through" : ""} ${enteringIndex !== null ? "is-entering" : ""}`}
      >
        <div className="doors__tex" aria-hidden="true" />
        <div className="doors__pin">
          <div className="doors__wall" ref={wallRef}>
            <h2 className="paint">
              Magic happens<span className="paint__break"> </span>behind the doors
            </h2>
            <div
              className={`dinfo ${active !== null && infoPosition ? "on" : ""}`}
              ref={infoRef}
              style={
                infoPosition
                  ? { left: infoPosition.left, top: infoPosition.top, width: infoPosition.width }
                  : undefined
              }
              aria-hidden="true"
            >
              {active !== null && (
                <>
                  <h3 className="dinfo__h">{DOORS[active].title}</h3>
                  <p className="dinfo__t">{DOORS[active].tagline}</p>
                  <ul className="dinfo__p">
                    {DOORS[active].points.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div
              className="doors__viewport"
              aria-label="QA testing doors — swipe horizontally on a narrow screen"
            >
              <ul className="doors__row">
                {DOORS.map((item, i) => {
                  const secret = i === 4;
                  const interactive = !secret || reveal || mobile;
                  const variables = {
                    "--i": i,
                    "--door": item.color,
                    "--door-dk": item.darkColor,
                    "--glow": item.glow,
                  } as CSSProperties;
                  return (
                    <li
                      key={item.id}
                      data-door={item.id}
                      ref={(el) => {
                        unitRefs.current[i] = el;
                      }}
                      className={`unit ${secret ? "unit--secret" : ""} ${active === i ? "on" : ""} ${enteringIndex === i ? "press-target" : ""}`}
                      style={variables}
                      aria-hidden={!interactive}
                      inert={!interactive}
                    >
                      <button
                        type="button"
                        className="doorway"
                        disabled={!interactive}
                        aria-label={`Open ${item.title} door`}
                        onPointerEnter={(e) => hover(i, e)}
                        onPointerMove={(e) => {
                          if (
                            e.pointerType === "mouse" &&
                            cursorRef.current &&
                            !busyRef.current &&
                            !mobileRef.current
                          )
                            cursorRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
                        }}
                        onPointerLeave={() => endHover(i)}
                        onFocus={() => {
                          if (!busyRef.current && !mobileRef.current) {
                            setActive(i);
                            springRefs.current[i]?.set(0.36);
                          }
                        }}
                        onBlur={() => endHover(i)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            endHover(i);
                            e.currentTarget.blur();
                          }
                        }}
                        onClick={() => enter(i)}
                      >
                        <span className="casing" aria-hidden="true" />
                        <span className="opening" aria-hidden="true">
                          <span className="room" />
                          <span
                            ref={(el) => {
                              doorRefs.current[i] = el;
                            }}
                            className="door"
                          >
                            <span className="door__flute" />
                            <span className="plate">{item.plate.replace(" ", "\n")}</span>
                            <span className="handle">
                              <span className="handle__lever" />
                              <span className="handle__lock" />
                            </span>
                            <span className="door__shade" />
                          </span>
                          <span className="sill" />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="doors__foot">
        <span className="doors__mobile-instruction">Swipe to explore all five QA doors</span>
        <button
          className="doors__reveal-btn"
          type="button"
          onClick={() => {
            setReveal((r) => !r);
            setActive(null);
          }}
          disabled={busyRef.current}
          aria-expanded={reveal}
        >
          {reveal ? "Back to first four doors" : "Discover the fifth door"}
          <span aria-hidden="true">{reveal ? "←" : "→"}</span>
        </button>
      </div>
      <div ref={cursorRef} className="door-cursor" aria-hidden="true">
        Click to enter
      </div>
    </section>
  );
}
