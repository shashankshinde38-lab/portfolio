"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Terminal, CheckCircle2, Play, Sparkles, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SuiteDetail {
  title: string;
  command: string;
  suite: string;
  env: string;
  browser: string;
  total: number;
  passed: number;
  skipped: number;
  failed: number;
  duration: string;
  coverage: string;
  details: string[];
}

const SUITES: SuiteDetail[] = [
  {
    title: "Regression",
    command: "test-suite run --all",
    suite: "regression",
    env: "staging",
    browser: "Chrome 125 | headless",
    total: 124,
    passed: 124,
    skipped: 2,
    failed: 0,
    duration: "18.42s",
    coverage: "96.7%",
    details: [
      "✓ Auth & RBAC boundary checks",
      "✓ Multi-cart checkout concurrency",
      "✓ Payment gateway webhook assertions",
      "✓ Geospatial route calculation & dispatch",
    ],
  },
  {
    title: "Load & Stress",
    command: "jmeter -n -t stress-suite.jmx",
    suite: "distributed-stress",
    env: "pre-production",
    browser: "JMeter Engine (100k VUs)",
    total: 3,
    passed: 3,
    skipped: 0,
    failed: 0,
    duration: "45.20s",
    coverage: "99.9% uptime",
    details: [
      "✓ 100k concurrent users ramp-up",
      "✓ Sustained throughput ≥ 25k req/s",
      "✓ P99 latency threshold < 180ms",
    ],
  },
  {
    title: "API Contract",
    command: "pytest tests/api/ -v",
    suite: "rest-contract",
    env: "staging",
    browser: "REST Assured / Postman",
    total: 58,
    passed: 58,
    skipped: 0,
    failed: 0,
    duration: "4.15s",
    coverage: "100% schema match",
    details: [
      "✓ JSON Schema & OpenAPI 3.1 validation",
      "✓ JWT revocation & expired token 401s",
      "✓ Idempotency key race-condition checks",
    ],
  },
];

export default function TestConsole() {
  const [activeTab, setActiveTab] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const { prefersReduced } = useReducedMotion();
  const currentSuite = SUITES[activeTab];
  const cycleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, [activeTab]);

  // Auto-cycle through test suites every 7 seconds if not reduced motion
  useEffect(() => {
    if (prefersReduced) return;
    cycleTimer.current = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % SUITES.length);
    }, 7000);

    return () => {
      if (cycleTimer.current) clearTimeout(cycleTimer.current);
    };
  }, [activeTab, prefersReduced]);

  const handleSelectTab = (index: number) => {
    if (cycleTimer.current) clearTimeout(cycleTimer.current);
    setActiveTab(index);
  };

  return (
    <div className="hero-terminal-3d-wrapper" role="region" aria-label="Interactive QA test runner terminal">
      {/* Soft volumetric glow backing the 3D window */}
      <div className="terminal-volumetric-glow" aria-hidden="true" />

      {/* Floating 3D Glass Window Container */}
      <div className="terminal-3d-window">
        {/* macOS-style Chrome Header matching Image 2 */}
        <div className="terminal-window-header">
          <div className="terminal-window-dots" aria-hidden="true">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="terminal-window-title">
            <code>test-suite run --all</code>
          </div>

          <div className="terminal-header-spacer" aria-hidden="true" />
        </div>

        {/* Terminal Body matching Image 2 */}
        <div className="terminal-window-body">
          {/* Telemetry execution lines */}
          <div className="terminal-telemetry-lines">
            <p className="terminal-line log-env">
              <span className="term-arrow">&gt;</span> Running test suite:{" "}
              <span className="term-highlight">{currentSuite.suite}</span>
            </p>
            <p className="terminal-line log-env">
              <span className="term-arrow">&gt;</span> Environment:{" "}
              <span className="term-value">{currentSuite.env}</span>
            </p>
            <p className="terminal-line log-env">
              <span className="term-arrow">&gt;</span> Browser:{" "}
              <span className="term-value">{currentSuite.browser}</span>
            </p>
          </div>

          {/* Test results with pass checkmarks matching Image 2 */}
          <div className={`terminal-results-block${revealed ? " is-visible" : ""}`}>
            <div className="terminal-log-line pass-title">
              <span className="term-check">✓</span>
              <span>All tests passed ({currentSuite.total})</span>
            </div>

            <div className="terminal-log-line">
              <span className="term-check">✓</span>
              <span>{currentSuite.passed} passed</span>
            </div>

            <div className="terminal-log-line">
              <span className="term-check">✓</span>
              <span>{currentSuite.skipped} skipped</span>
            </div>

            <div className="terminal-log-line">
              <span className="term-check">✓</span>
              <span>{currentSuite.failed} failed</span>
            </div>

            <div className="terminal-log-stat indented">
              Test duration: {currentSuite.duration}
            </div>

            <div className="terminal-log-stat indented">
              Coverage: {currentSuite.coverage}
            </div>

            {/* Quality assured footer matching Image 2 */}
            <div className="terminal-quality-assured">
              <span className="term-sparkle-symbol">✨</span>
              <span>Quality assured. Shipping with confidence.</span>
            </div>

            <div className="terminal-blinking-cursor" aria-hidden="true">|</div>
          </div>
        </div>
      </div>
    </div>
  );
}
