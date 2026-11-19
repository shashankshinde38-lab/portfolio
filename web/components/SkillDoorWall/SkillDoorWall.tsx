"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, KeyRound, Sparkles } from "lucide-react";
import "./SkillDoorWall.css";

interface SkillDoor {
  id: string;
  doorNumber: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  metric: string;
  metricLabel: string;
  href: string;
  status: string;
}

const DOORS: SkillDoor[] = [
  {
    id: "door-automation",
    doorNumber: "01",
    tag: "E2E BROWSER AUTOMATION",
    title: "Automation Testing",
    subtitle: "Selenium WebDriver & Playwright Suites",
    description:
      "Architecting scalable Page Object Model frameworks across Java and TypeScript. Parallel cross-browser CI/CD suites eliminating flaky assertions and manual regression overhead.",
    tools: ["Selenium WebDriver", "Playwright", "Java", "TypeScript", "TestNG", "Cucumber BDD"],
    metric: "~40%",
    metricLabel: "Regression cycle execution time reduction",
    href: "/automation-testing",
    status: "SUITE VERIFIED",
  },
  {
    id: "door-api",
    doorNumber: "02",
    tag: "INTEGRATION & WEBHOOKS",
    title: "REST API Validation",
    subtitle: "Postman Collections & Contract Assurance",
    description:
      "Validating JSON Schemas, status code resilience (2xx, 4xx, 5xx), payment webhook idempotency, and SQL database ledger reconciliation to eliminate backend race conditions.",
    tools: ["Postman", "REST Assured", "JSON Schema", "OAuth 2.0 / JWT", "PostgreSQL", "SQL"],
    metric: "22 Endpoints",
    metricLabel: "Audited across trip booking & payment lifecycles",
    href: "/api-testing",
    status: "CONTRACT SECURED",
  },
  {
    id: "door-performance",
    doorNumber: "03",
    tag: "DISTRIBUTED LOAD ENGINEERING",
    title: "Apache JMeter Testing",
    subtitle: "100k Concurrent Virtual User Stress",
    description:
      "Designing distributed master-slave thread groups in Apache JMeter. Stressing server latency boundaries, P99 SLA compliance, and HikariCP database pool saturation under high booking velocity.",
    tools: ["Apache JMeter", "Distributed Engines", "P99 SLA", "Throughput Analysis", "Thread Groups"],
    metric: "100,000",
    metricLabel: "Simulated concurrent virtual users under peak traffic",
    href: "/performance-testing",
    status: "99.9% UPTIME SLA",
  },
  {
    id: "door-mobile",
    doorNumber: "04",
    tag: "ANDROID & REAL HARDWARE",
    title: "Mobile Quality Testing",
    subtitle: "Appium Automation & Device Fragmentation",
    description:
      "Validating Android native applications across real physical hardware and emulators. Multi-tap debounce enforcement, fluctuating network latency, and offline SQLite synchronization.",
    tools: ["Appium", "Android Studio", "ADB", "UIAutomator2", "Device Fragmentation", "Offline Sync"],
    metric: "4 OS Versions",
    metricLabel: "Cross-tested with zero touch-input lead duplication",
    href: "/mobile-testing",
    status: "DEBOUNCE ENFORCED",
  },
  {
    id: "door-manual",
    doorNumber: "05",
    tag: "STLC & DEFECT LIFECYCLE",
    title: "Manual & Functional",
    subtitle: "Exploratory Scenarios & Release Sign-Off",
    description:
      "Meticulous exploratory testing, smoke, sanity, and boundary edge assertions. Documenting high-fidelity reproducible bug reports in JIRA with exact logs and environment footprints.",
    tools: ["JIRA", "STLC / SDLC", "Defect Management", "Cross-Browser Parity", "Agile / Scrum"],
    metric: "240+",
    metricLabel: "Pre-production defects identified and tracked to resolution",
    href: "/manual-testing",
    status: "ZERO P0 ESCAPES",
  },
];

export default function SkillDoorWall() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDoor, setActiveDoor] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse Drag Tracking
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScrollBounds = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active door based on scroll position
    const cardWidth = 360; // approximate
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDoor(Math.min(Math.max(index, 0), DOORS.length - 1));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    checkScrollBounds();
    return () => el.removeEventListener("scroll", checkScrollBounds);
  }, [checkScrollBounds]);

  const scrollToDirection = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = 380;
    trackRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftStart.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.4; // multiplier
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  return (
    <section id="skill-doors" className="door-wall-section" aria-label="Interactive QA Skill Doors">
      <div className="door-wall-header-container">
        <div className="door-wall-heading">
          <div className="door-wall-kicker">
            <span className="door-wall-kicker-dot" aria-hidden="true" />
            <span>THE QA DISCIPLINES</span>
          </div>

          <h2 className="door-wall-title">
            My work, <span className="font-serif italic text-terracotta">one door</span> per skill.
          </h2>

          <p className="door-wall-tagline font-serif italic">
            &ldquo;Magic happens behind the doors. Swipe along the wall to step into each testing domain.&rdquo;
          </p>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="door-wall-controls" aria-label="Door Wall Navigation">
          <button
            type="button"
            className="door-control-btn"
            onClick={() => scrollToDirection("left")}
            disabled={!canScrollLeft}
            aria-label="Previous door"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="door-counter font-serif">
            {String(activeDoor + 1).padStart(2, "0")} / {String(DOORS.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="door-control-btn"
            onClick={() => scrollToDirection("right")}
            disabled={!canScrollRight}
            aria-label="Next door"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Door Track (Swipeable / Draggable) */}
      <div
        ref={trackRef}
        className="door-track"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div className="door-track-inner">
          {DOORS.map((door, index) => {
            const isSelected = activeDoor === index;
            return (
              <article
                key={door.id}
                className={`skill-door-panel ${isSelected ? "is-active-door" : ""}`}
                aria-label={`Door ${door.doorNumber}: ${door.title}`}
              >
                {/* 3D Door Construction */}
                <div className="door-frame">
                  {/* Door Number Plaque */}
                  <div className="door-header">
                    <span className="door-num font-serif">{door.doorNumber}</span>
                    <span className="door-tag">{door.tag}</span>
                    <span className="door-status-pill">{door.status}</span>
                  </div>

                  {/* Door Leaf (The actual opening surface) */}
                  <div className="door-leaf">
                    <div className="door-wood-grain" aria-hidden="true" />

                    <div className="door-leaf-content">
                      <div className="door-brass-knocker">
                        <KeyRound size={20} className="text-terracotta" />
                        <span className="knocker-ring" />
                      </div>

                      <h3 className="door-title">{door.title}</h3>
                      <p className="door-subtitle">{door.subtitle}</p>

                      <div className="door-metric-box">
                        <span className="door-metric-val font-serif">{door.metric}</span>
                        <span className="door-metric-desc">{door.metricLabel}</span>
                      </div>

                      <p className="door-desc">{door.description}</p>

                      <div className="door-tools-list">
                        {door.tools.slice(0, 4).map((tool) => (
                          <span key={tool} className="door-tool-badge">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Step Through Door CTA */}
                    <Link
                      href={door.href}
                      className="door-enter-btn"
                      aria-label={`Enter ${door.title} specialty architecture page`}
                    >
                      <span>STEP THROUGH DOOR</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

