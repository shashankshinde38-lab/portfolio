"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Terminal, Play, ChevronRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { useReducedMotion, DURATION } from "@/hooks/useReducedMotion";

/* ------------------------------------------------------------------ */
/*  Data for the three tabbed views                                    */
/* ------------------------------------------------------------------ */

interface TestLine {
  name: string;
  status: "pass" | "warn" | "fail";
  duration: string;
}

interface ConsoleView {
  tab: string;
  file: string;
  tests: TestLine[];
  summary: string;
}

const CONSOLE_VIEWS: ConsoleView[] = [
  {
    tab: "E2E Suite",
    file: "auth.spec.ts",
    tests: [
      { name: "Login flow with valid credentials", status: "pass", duration: "0.6s" },
      { name: "RBAC permission boundary check", status: "pass", duration: "0.8s" },
      { name: "Session timeout and refresh", status: "pass", duration: "0.4s" },
      { name: "Checkout payment gateway E2E", status: "pass", duration: "1.2s" },
    ],
    summary: "24/24 passed · 2.4s",
  },
  {
    tab: "Load Test",
    file: "jmeter-stress.jmx",
    tests: [
      { name: "100k concurrent users ramp-up", status: "pass", duration: "12.1s" },
      { name: "Throughput ≥ 25k req/s", status: "pass", duration: "—" },
      { name: "P99 latency < 200ms", status: "pass", duration: "42ms" },
    ],
    summary: "3/3 passed · 45.2s",
  },
  {
    tab: "API Check",
    file: "api-contract.test.ts",
    tests: [
      { name: "GET /users — schema valid", status: "pass", duration: "0.1s" },
      { name: "POST /orders — 201 created", status: "pass", duration: "0.3s" },
      { name: "Auth token expiry returns 401", status: "pass", duration: "0.2s" },
    ],
    summary: "18/18 passed · 1.8s",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TestConsole() {
  const [activeTab, setActiveTab] = useState(0);
  const [revealedLines, setRevealedLines] = useState<number>(0);
  const { prefersReduced } = useReducedMotion();
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const view = CONSOLE_VIEWS[activeTab];
  const totalLines = view.tests.length;

  /* Animate lines revealing one-by-one */
  const revealLines = useCallback(() => {
    if (prefersReduced) {
      setRevealedLines(totalLines);
      return;
    }
    setRevealedLines(0);
    let i = 0;
    const tick = () => {
      i++;
      setRevealedLines(i);
      if (i < totalLines) {
        lineTimer.current = setTimeout(tick, DURATION.MICRO + 100);
      }
    };
    lineTimer.current = setTimeout(tick, DURATION.STANDARD);
  }, [prefersReduced, totalLines]);

  /* When tab changes, start line reveal */
  useEffect(() => {
    revealLines();
    return () => {
      if (lineTimer.current) clearTimeout(lineTimer.current);
    };
  }, [activeTab, revealLines]);

  /* Auto-cycle tabs every 5s (after reveal completes) */
  useEffect(() => {
    if (prefersReduced) return;

    const scheduleNext = () => {
      autoTimer.current = setTimeout(() => {
        setActiveTab((prev) => (prev + 1) % CONSOLE_VIEWS.length);
      }, 5000);
    };

    /* Wait for all lines to reveal, then schedule */
    const revealTime = DURATION.STANDARD + totalLines * (DURATION.MICRO + 100);
    const delay = setTimeout(scheduleNext, revealTime);

    return () => {
      clearTimeout(delay);
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, [activeTab, prefersReduced, totalLines]);

  const handleTabClick = (index: number) => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (lineTimer.current) clearTimeout(lineTimer.current);
    setActiveTab(index);
  };

  return (
    <div className="test-console" role="region" aria-label="Interactive test runner console">
      {/* Chrome / title bar */}
      <div className="console-chrome">
        <div className="console-dots">
          <i />
          <i />
          <i />
        </div>
        <span className="console-title">
          <Terminal size={12} /> test-runner
        </span>
        <span className="console-run">
          <Play size={10} /> Running
        </span>
      </div>

      {/* Tab bar */}
      <div className="console-tabs" role="tablist" aria-label="Test suite views">
        {CONSOLE_VIEWS.map((v, i) => (
          <button
            key={v.tab}
            role="tab"
            aria-selected={i === activeTab}
            className={`console-tab${i === activeTab ? " console-tab--active" : ""}`}
            onClick={() => handleTabClick(i)}
          >
            {v.tab}
          </button>
        ))}
      </div>

      {/* Console body */}
      <div className="console-body" role="tabpanel" aria-label={view.tab}>
        {/* Spec file */}
        <div className="console-spec">
          <ChevronRight size={12} />
          <span>{view.file}</span>
        </div>

        {/* Test lines */}
        <div className="console-tests">
          {view.tests.map((test, i) => (
            <div
              key={`${activeTab}-${i}`}
              className={`console-test-line${i < revealedLines ? " is-visible" : ""}`}
              style={
                !prefersReduced
                  ? { transitionDelay: `${i * 80}ms` }
                  : undefined
              }
            >
              <StatusBadge status={test.status} />
              <span className="console-test-name">{test.name}</span>
              <span className="console-test-duration">{test.duration}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className={`console-summary${revealedLines >= totalLines ? " is-visible" : ""}`}
        >
          <span className="console-summary-label">Summary</span>
          <span className="console-summary-value">{view.summary}</span>
        </div>
      </div>
    </div>
  );
}
