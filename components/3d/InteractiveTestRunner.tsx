"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

interface TestLog {
  text: string;
  type: "info" | "pass" | "warn" | "cmd";
  delay: number;
}

const TEST_SUITES = {
  playwright: {
    name: "Playwright E2E",
    command: "npx playwright test tests/e2e/driwe-booking.spec.ts --headed",
    logs: [
      { text: "> npx playwright test tests/e2e/driwe-booking.spec.ts", type: "cmd", delay: 100 },
      { text: "⚡ [BrowserLaunch] Initialized Chromium instance (v124.0.6367)", type: "info", delay: 400 },
      { text: "✓ [Navigation] Route /book-ride loaded in 420ms", type: "pass", delay: 700 },
      { text: "✓ [Geolocation] Pickup & Dropoff coordinates calculated", type: "pass", delay: 1000 },
      { text: "✓ [FareEstimate] Fare API validated against surge matrix [1.2x]", type: "pass", delay: 1300 },
      { text: "✓ [Payment] Razorpay mock gateway checkout completed [200 OK]", type: "pass", delay: 1700 },
      { text: "✓ [DriverMatch] Webhook dispatched to Driver App via WebSocket", type: "pass", delay: 2100 },
      { text: "═══════════════════════════════════════════════════", type: "info", delay: 2400 },
      { text: "✨ 6 passed, 0 failed (2.41s) — Zero regressions detected!", type: "pass", delay: 2600 },
    ] as TestLog[],
  },
  jmeter: {
    name: "JMeter 100k Load",
    command: "jmeter -n -t driwe_stress_plan.jmx -l results.jtl -e -o ./report",
    logs: [
      { text: "> jmeter -n -t driwe_stress_plan.jmx -l results.jtl", type: "cmd", delay: 100 },
      { text: "⚡ [Thread Group] Spawning 100,000 virtual users over 60s ramp-up", type: "info", delay: 400 },
      { text: "✓ [Target: /api/v1/ride/request] 25,000 req/s — Avg Latency: 42ms", type: "pass", delay: 800 },
      { text: "✓ [Database Pool] PostgreSQL connection pool stable (12% CPU)", type: "pass", delay: 1200 },
      { text: "⚠ [Redis Cache] Cache hit ratio 98.4% — Memory usage 4.2GB", type: "warn", delay: 1600 },
      { text: "✓ [Stress Assertion] Zero 5xx server errors detected during peak load", type: "pass", delay: 2000 },
      { text: "═══════════════════════════════════════════════════", type: "info", delay: 2300 },
      { text: "✨ Load Test Complete: 100,000 users sustained with 99.9% uptime!", type: "pass", delay: 2600 },
    ] as TestLog[],
  },
  selenium: {
    name: "Selenium Grid",
    command: "pytest tests/regression/grosido_cart.py --workers 4",
    logs: [
      { text: "> pytest tests/regression/grosido_cart.py --workers 4", type: "cmd", delay: 100 },
      { text: "⚡ [Selenium Grid Hub] 4 parallel nodes registered (Chrome, Edge, Firefox)", type: "info", delay: 400 },
      { text: "✓ [Chrome] Test multi-vendor cart item combination: PASS (1.8s)", type: "pass", delay: 800 },
      { text: "✓ [Firefox] Test discount coupon apply & tax computation: PASS (2.1s)", type: "pass", delay: 1200 },
      { text: "✓ [Edge] Test guest checkout with address autofill: PASS (1.9s)", type: "pass", delay: 1600 },
      { text: "✓ [Cross-Browser] Responsive layout verified on 3 viewports: PASS", type: "pass", delay: 2000 },
      { text: "═══════════════════════════════════════════════════", type: "info", delay: 2300 },
      { text: "✨ 12 passed in 6.42s — Cross-browser parity confirmed!", type: "pass", delay: 2600 },
    ] as TestLog[],
  },
};

type SuiteKey = keyof typeof TEST_SUITES;

export default function InteractiveTestRunner() {
  const [selectedSuite, setSelectedSuite] = useState<SuiteKey>("playwright");
  const [isRunning, setIsRunning] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState<TestLog[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeSuite = TEST_SUITES[selectedSuite];

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setDisplayedLogs([]);

    const suiteLogs = activeSuite.logs;
    suiteLogs.forEach((log) => {
      setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, log]);
      }, log.delay);
    });

    const maxDelay = suiteLogs[suiteLogs.length - 1].delay;
    setTimeout(() => {
      setIsRunning(false);
      setIsCompleted(true);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#22C55E", "#38BDF8", "#F8FAFC"],
      });
    }, maxDelay + 200);
  };

  return (
    <div className="w-full glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="bg-[#0E1726] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#EF4444]/80" />
          <div className="size-3 rounded-full bg-[#F59E0B]/80" />
          <div className="size-3 rounded-full bg-[#22C55E]/80" />
          <span className="font-mono text-xs text-[#94A3B8] ml-2">
            shashank@qa-command-center:~
          </span>
        </div>

        {/* Suite Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#070B14] p-1 rounded-lg border border-white/5">
          {(Object.keys(TEST_SUITES) as SuiteKey[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                if (!isRunning) {
                  setSelectedSuite(key);
                  setDisplayedLogs([]);
                  setIsCompleted(false);
                }
              }}
              disabled={isRunning}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                selectedSuite === key
                  ? "bg-[#38BDF8]/20 text-[#38BDF8] font-bold border border-[#38BDF8]/30"
                  : "text-[#94A3B8] hover:text-[#F8FAFC]"
              } disabled:opacity-50`}
            >
              {TEST_SUITES[key].name}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="inline-flex items-center gap-2 bg-[#22C55E] text-[#052E16] px-4 py-1.5 rounded-lg text-xs font-mono font-bold hover:bg-[#22C55E]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,197,94,0.4)]"
        >
          {isRunning ? (
            <>
              <span className="size-3 border-2 border-[#052E16] border-t-transparent rounded-full animate-spin" />
              EXECUTING...
            </>
          ) : (
            <>
              <span>▶ RUN TEST SUITE</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 sm:p-6 bg-[#070B14]/90 min-h-[260px] max-h-[360px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed space-y-1.5">
        <div className="text-[#94A3B8]/60 pb-2 border-b border-white/5 flex items-center justify-between">
          <span>Active Command: {activeSuite.command}</span>
          <span className="text-xs text-[#38BDF8]">
            {isRunning ? "● Running" : isCompleted ? "✓ Finished" : "Ready"}
          </span>
        </div>

        {displayedLogs.length === 0 && !isRunning && (
          <div className="py-12 text-center text-[#94A3B8]">
            <p className="text-[#38BDF8] font-mono text-sm mb-1">
              [QA Test Engine Idle]
            </p>
            <p className="text-xs text-[#94A3B8]/80">
              Click &quot;▶ RUN TEST SUITE&quot; above to simulate real-time Playwright, JMeter, or Selenium test runs.
            </p>
          </div>
        )}

        {displayedLogs.map((log, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              log.type === "cmd"
                ? "text-[#F8FAFC] font-bold"
                : log.type === "pass"
                ? "text-[#22C55E]"
                : log.type === "warn"
                ? "text-[#F59E0B]"
                : "text-[#38BDF8]"
            }`}
          >
            <span className="text-[#94A3B8]/40 select-none">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <span className="break-all">{log.text}</span>
          </div>
        ))}

        {isRunning && (
          <div className="flex items-center gap-2 text-[#38BDF8] pt-1">
            <span className="animate-pulse">▍</span>
            <span className="text-xs text-[#94A3B8]">Processing assertions...</span>
          </div>
        )}
      </div>

      {/* Terminal Footer Metrics Bar */}
      <div className="bg-[#0E1726]/80 px-4 py-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#94A3B8]">
        <div className="flex items-center gap-4">
          <span>
            STATUS: <strong className={isCompleted ? "text-[#22C55E]" : "text-[#38BDF8]"}>{isCompleted ? "PASSED" : isRunning ? "RUNNING" : "STANDBY"}</strong>
          </span>
          <span>COVERAGE: <strong className="text-[#F8FAFC]">100%</strong></span>
          <span>ASSERTIONS: <strong className="text-[#22C55E]">24/24 PASS</strong></span>
        </div>
        <div className="text-[#38BDF8]">
          STACK: Playwright · Selenium · JMeter · Postman
        </div>
      </div>
    </div>
  );
}
