"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Play, RotateCcw, CheckCircle2, AlertTriangle, XCircle, Terminal, Check } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

interface TestLog {
  text: string;
  type: "info" | "pass" | "warn" | "fail" | "cmd";
  delay: number;
}

interface TestSuite {
  id: string;
  name: string;
  command: string;
  targetDuration: string;
  logs: TestLog[];
  finalStatus: "pass" | "fail";
  triageNote?: string;
}

const TEST_SUITES: Record<string, TestSuite> = {
  playwright: {
    id: "playwright",
    name: "Playwright E2E",
    command: "npx playwright test tests/e2e/checkout-flow.spec.ts --headed",
    targetDuration: "2.4s",
    finalStatus: "pass",
    logs: [
      { text: "> npx playwright test tests/e2e/checkout-flow.spec.ts", type: "cmd", delay: 80 },
      { text: "⚡ [BrowserLaunch] Chromium v124 initialized in isolated context", type: "info", delay: 260 },
      { text: "✓ [Auth] Bearer session token validated (200 OK)", type: "pass", delay: 480 },
      { text: "✓ [Navigation] Route /checkout loaded and interactive in 380ms", type: "pass", delay: 720 },
      { text: "✓ [CartState] Multi-vendor item quantity & price checksums verified", type: "pass", delay: 960 },
      { text: "✓ [Payment] Razorpay webhook response validated (payload signature OK)", type: "pass", delay: 1200 },
      { text: "✓ [OrderConfirmation] Invoice generated, inventory atomically decremented", type: "pass", delay: 1440 },
      { text: "═════════════════════════════════════════════════════════════════", type: "info", delay: 1600 },
      { text: "✨ 6 passed in 2.41s — All regression assertions satisfied", type: "pass", delay: 1780 },
    ],
  },
  triage: {
    id: "triage",
    name: "Failure Triage Lab",
    command: "npx playwright test tests/e2e/dashboard-auth.spec.ts",
    targetDuration: "3.1s",
    finalStatus: "fail",
    triageNote: "Diagnosed whitespace discrepancy between DOM textContent and API payload. Normalized assertion regex resolved flaky test.",
    logs: [
      { text: "> npx playwright test tests/e2e/dashboard-auth.spec.ts", type: "cmd", delay: 80 },
      { text: "⚡ [Setup] Mounting authenticated session fixture on Grid node #3", type: "info", delay: 260 },
      { text: "✓ [Route] Dashboard endpoint reached (HTTP 200)", type: "pass", delay: 480 },
      { text: "❌ [ASSERTION FAILED] Heading text assertion mismatch:", type: "fail", delay: 750 },
      { text: "   Expected: \"Welcome, Shashank\"", type: "fail", delay: 920 },
      { text: "   Received: \"Welcome, Shashank \" (trailing whitespace in DOM node)", type: "fail", delay: 1100 },
      { text: "⚡ [QA TRIAGE ENGINE] Inspecting failure context...", type: "warn", delay: 1350 },
      { text: "→ Compared DOM textContent vs innerText: identified unstripped backend template token", type: "info", delay: 1600 },
      { text: "→ Applied whitespace-normalizing assertion: expect(heading).toHaveText(/Welcome,\\s*Shashank/)", type: "info", delay: 1850 },
      { text: "→ Hot re-run with normalized assertion: PASS (0.18s)", type: "pass", delay: 2100 },
      { text: "═════════════════════════════════════════════════════════════════", type: "info", delay: 2280 },
      { text: "🔧 Defect diagnosed and assertion fix validated successfully", type: "pass", delay: 2450 },
    ],
  },
  jmeter: {
    id: "jmeter",
    name: "JMeter 100k Load",
    command: "jmeter -n -t distributed_stress_plan.jmx -l results.jtl",
    targetDuration: "2.8s",
    finalStatus: "pass",
    logs: [
      { text: "> jmeter -n -t distributed_stress_plan.jmx -l results.jtl", type: "cmd", delay: 80 },
      { text: "⚡ [RampUp] Distributed threads initializing across load engines", type: "info", delay: 260 },
      { text: "✓ [PeakThroughput] 25,000 req/s sustained — Avg Latency: 42ms", type: "pass", delay: 520 },
      { text: "✓ [DB Pool] Connection pool healthy (14% active, 0 queued timeouts)", type: "pass", delay: 780 },
      { text: "⚠ [Cache] Redis hit ratio 98.2% — Memory buffer utilization stable", type: "warn", delay: 1040 },
      { text: "✓ [ErrorRate] 0.00% 5xx server errors during peak concurrent load", type: "pass", delay: 1300 },
      { text: "═════════════════════════════════════════════════════════════════", type: "info", delay: 1500 },
      { text: "✨ Load Test Complete: 99.9% uptime SLA verified under peak pressure", type: "pass", delay: 1700 },
    ],
  },
};

type State = "STANDBY" | "RUNNING" | "PASSED" | "FAILED";

export default function InteractiveTestRunner() {
  const [activeTab, setActiveTab] = useState<string>("playwright");
  const [state, setState] = useState<State>("STANDBY");
  const [displayedLogs, setDisplayedLogs] = useState<TestLog[]>([]);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>("Test simulator ready.");
  const timeoutIds = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  const suite = TEST_SUITES[activeTab];

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timeoutIds.current.forEach(clearTimeout);
      timeoutIds.current = [];
    };
  }, []);

  // Auto-scroll logs as they appear
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  const switchTab = (tabKey: string) => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setActiveTab(tabKey);
    setState("STANDBY");
    setDisplayedLogs([]);
    setLiveAnnouncement(`Switched to ${TEST_SUITES[tabKey].name}. Press Run Test Suite to execute.`);
  };

  const runSuite = () => {
    if (state === "RUNNING") return;

    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setState("RUNNING");
    setDisplayedLogs([]);
    setLiveAnnouncement(`Test execution started for ${suite.name}...`);

    suite.logs.forEach((log) => {
      const tid = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, log]);
      }, log.delay);
      timeoutIds.current.push(tid);
    });

    const maxDelay = suite.logs[suite.logs.length - 1].delay;
    const finishTid = setTimeout(() => {
      if (suite.finalStatus === "pass" || suite.id === "triage") {
        setState("PASSED");
        setLiveAnnouncement(`Test execution passed. All checks satisfied.`);
        confetti({
          particleCount: 22,
          disableForReducedMotion: true,
          spread: 55,
          origin: { y: 0.7 },
          colors: ["#6E7CFB", "#35D48A", "#EDF1F4"],
        });
      } else {
        setState("FAILED");
        setLiveAnnouncement(`Assertion failed on ${suite.name}. Triage available.`);
      }
    }, maxDelay + 220);

    timeoutIds.current.push(finishTid);
  };

  const resetSimulator = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setState("STANDBY");
    setDisplayedLogs([]);
    setLiveAnnouncement("Simulator reset to standby.");
  };

  return (
    <div className="simulator-console-frame">
      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" role="status">
        {liveAnnouncement}
      </div>

      {/* Terminal Toolbar */}
      <div className="simulator-toolbar">
        <div className="simulator-window-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="simulator-terminal-name">shashank@qa-automation-lab:~</span>
        </div>

        {/* Accessible Tab List */}
        <div className="simulator-tabs" role="tablist" aria-label="Testing suites">
          {Object.values(TEST_SUITES).map((s) => {
            const isSelected = activeTab === s.id;
            return (
              <button
                key={s.id}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${s.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => switchTab(s.id)}
                className={`simulator-tab ${isSelected ? "is-active" : ""}`}
                disabled={state === "RUNNING"}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Console Subheader Bar */}
      <div className="simulator-subbar">
        <div className="simulator-command-wrap">
          <span className="simulator-prompt">$</span>
          <code className="simulator-command-text">{suite.command}</code>
        </div>
        <div className="simulator-status-indicator">
          {state === "STANDBY" && (
            <span className="simulator-state-chip standby">STANDBY</span>
          )}
          {state === "RUNNING" && (
            <span className="simulator-state-chip running">
              <span className="status-dot animate-pulse" /> RUNNING...
            </span>
          )}
          {state === "PASSED" && (
            <StatusBadge status="pass" label="SUITE PASSED" />
          )}
          {state === "FAILED" && (
            <StatusBadge status="fail" label="ASSERTION FAILED" />
          )}
        </div>
      </div>

      {/* Console Output Display */}
      <div
        id={`panel-${suite.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${suite.id}`}
        ref={logContainerRef}
        className="simulator-screen"
      >
        {state === "STANDBY" && (
          <div className="simulator-standby-screen">
            <Terminal size={32} className="text-accent opacity-50 mb-2" />
            <p className="simulator-standby-title">Interactive Test Suite: {suite.name}</p>
            <p className="simulator-standby-desc">
              Click “Run Test Suite” to trigger a live sequential test run with realistic assertions.
            </p>
            {suite.id === "triage" && (
              <div className="simulator-triage-badge">
                <AlertTriangle size={13} className="text-warn" />
                <span>Simulates real diagnostic triage of a failing assertion</span>
              </div>
            )}
          </div>
        )}

        {displayedLogs.map((log, index) => (
          <div key={index} className={`simulator-log-line log-${log.type}`}>
            {log.text}
          </div>
        ))}
      </div>

      {/* Triage Note (if completed on Triage tab) */}
      {suite.triageNote && state === "PASSED" && (
        <div className="simulator-triage-card">
          <div className="simulator-triage-title">
            <CheckCircle2 size={15} />
            <span>QA Root Cause Diagnosis &amp; Resolution</span>
          </div>
          <p className="simulator-triage-desc">{suite.triageNote}</p>
        </div>
      )}

      {/* Controls Bar */}
      <div className="simulator-actions-bar">
        <div className="simulator-meta-info">
          <span>Target Runtime: ~{suite.targetDuration}</span>
          <span className="separator">·</span>
          <span>Assertions: {suite.logs.filter((l) => l.type === "pass" || l.type === "fail").length} total</span>
        </div>

        <div className="simulator-btn-group">
          {state !== "STANDBY" && (
            <button
              type="button"
              onClick={resetSimulator}
              disabled={state === "RUNNING"}
              className="simulator-btn secondary"
              aria-label="Reset simulator"
            >
              <RotateCcw size={14} /> Reset
            </button>
          )}

          <button
            type="button"
            onClick={runSuite}
            disabled={state === "RUNNING"}
            className="simulator-btn primary"
          >
            {state === "RUNNING" ? (
              <>
                <span className="loading-spinner" /> Running suite…
              </>
            ) : state === "PASSED" ? (
              <>
                <Check size={14} /> Re-run Suite
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" /> Run Test Suite
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
