"use client";

import { useEffect, useRef, useState } from "react";
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
      {
        text: "⚡ [BrowserLaunch] Initialized Chromium instance (v124.0.6367)",
        type: "info",
        delay: 400,
      },
      { text: "✓ [Navigation] Route /book-ride loaded in 420ms", type: "pass", delay: 700 },
      {
        text: "✓ [Geolocation] Pickup & Dropoff coordinates calculated",
        type: "pass",
        delay: 1000,
      },
      {
        text: "✓ [FareEstimate] Fare API validated against surge matrix [1.2x]",
        type: "pass",
        delay: 1300,
      },
      {
        text: "✓ [Payment] Razorpay mock gateway checkout completed [200 OK]",
        type: "pass",
        delay: 1700,
      },
      {
        text: "✓ [DriverMatch] Webhook dispatched to Driver App via WebSocket",
        type: "pass",
        delay: 2100,
      },
      { text: "═══════════════════════════════════════════════════", type: "info", delay: 2400 },
      {
        text: "✨ 6 passed, 0 failed (2.41s) — Zero regressions detected!",
        type: "pass",
        delay: 2600,
      },
    ] as TestLog[],
  },
  jmeter: {
    name: "JMeter 100k Load",
    command: "jmeter -n -t driwe_stress_plan.jmx -l results.jtl -e -o ./report",
    logs: [
      { text: "> jmeter -n -t driwe_stress_plan.jmx -l results.jtl", type: "cmd", delay: 100 },
      {
        text: "⚡ [Thread Group] Spawning 100,000 virtual users over 60s ramp-up",
        type: "info",
        delay: 400,
      },
      {
        text: "✓ [Target: /api/v1/ride/request] 25,000 req/s — Avg Latency: 42ms",
        type: "pass",
        delay: 800,
      },
      {
        text: "✓ [Database Pool] PostgreSQL connection pool stable (12% CPU)",
        type: "pass",
        delay: 1200,
      },
      {
        text: "⚠ [Redis Cache] Cache hit ratio 98.4% — Memory usage 4.2GB",
        type: "warn",
        delay: 1600,
      },
      {
        text: "✓ [Stress Assertion] Zero 5xx server errors detected during peak load",
        type: "pass",
        delay: 2000,
      },
      { text: "═══════════════════════════════════════════════════", type: "info", delay: 2300 },
      {
        text: "✨ Load Test Complete: 100,000 users sustained with 99.9% uptime!",
        type: "pass",
        delay: 2600,
      },
    ] as TestLog[],
  },
  selenium: {
    name: "Selenium Grid",
    command: "pytest tests/regression/grosido_cart.py --workers 4",
    logs: [
      { text: "> pytest tests/regression/grosido_cart.py --workers 4", type: "cmd", delay: 100 },
      {
        text: "⚡ [Selenium Grid Hub] 4 parallel nodes registered (Chrome, Edge, Firefox)",
        type: "info",
        delay: 400,
      },
      {
        text: "✓ [Chrome] Test multi-vendor cart item combination: PASS (1.8s)",
        type: "pass",
        delay: 800,
      },
      {
        text: "✓ [Firefox] Test discount coupon apply & tax computation: PASS (2.1s)",
        type: "pass",
        delay: 1200,
      },
      {
        text: "✓ [Edge] Test guest checkout with address autofill: PASS (1.9s)",
        type: "pass",
        delay: 1600,
      },
      {
        text: "✓ [Cross-Browser] Responsive layout verified on 3 viewports: PASS",
        type: "pass",
        delay: 2000,
      },
      { text: "═══════════════════════════════════════════════════", type: "info", delay: 2300 },
      {
        text: "✨ 12 passed in 6.42s — Cross-browser parity confirmed!",
        type: "pass",
        delay: 2600,
      },
    ] as TestLog[],
  },
};

type SuiteKey = keyof typeof TEST_SUITES;

export default function InteractiveTestRunner() {
  const [selectedSuite, setSelectedSuite] = useState<SuiteKey>("playwright");
  const [isRunning, setIsRunning] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState<TestLog[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const timeoutIds = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const activeSuite = TEST_SUITES[selectedSuite];

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutIds.current = [];
    };
  }, []);

  const handleRun = () => {
    if (isRunning) return;

    timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutIds.current = [];
    setIsRunning(true);
    setIsCompleted(false);
    setDisplayedLogs([]);

    const suiteLogs = activeSuite.logs;
    suiteLogs.forEach((log) => {
      const timeoutId = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, log]);
      }, log.delay);
      timeoutIds.current.push(timeoutId);
    });

    const maxDelay = suiteLogs[suiteLogs.length - 1].delay;
    const completionTimeoutId = setTimeout(() => {
      setIsRunning(false);
      setIsCompleted(true);
      confetti({
        particleCount: 20,
        disableForReducedMotion: true,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#a6d9c5", "#c9d9d3", "#f1f3f0"],
      });
    }, maxDelay + 200);
    timeoutIds.current.push(completionTimeoutId);
  };

  return (
    <div className="w-full glass-card rounded-2xl border border-[rgba(127,255,212,0.2)] overflow-hidden shadow-2xl backdrop-blur-xl" style={{
      background: 'linear-gradient(145deg, rgba(20, 35, 38, 0.8), rgba(8, 14, 16, 0.9))',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(127, 255, 212, 0.1), 0 0 40px rgba(0, 245, 255, 0.08)'
    }}>
      {/* Terminal Title Bar */}
      <div className="runner-toolbar bg-[#0a1418]/90 px-4 py-3 border-b border-[rgba(127,255,212,0.15)] flex flex-wrap items-center justify-between gap-3 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-[#EF4444]/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
          <div className="size-3 rounded-full bg-[#F59E0B]/80 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
          <div className="size-3 rounded-full bg-[#22C55E]/80 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
          <span className="font-mono text-xs text-[#b8c9c2] ml-2">
            shashank@holographic-qa-lab:~
          </span>
        </div>

        {/* Suite Selector Tabs */}
        <div className="runner-tabs flex items-center gap-1 bg-[#060c0e]/80 p-1 rounded-lg border border-[rgba(127,255,212,0.1)] backdrop-blur-md">
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
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                selectedSuite === key
                  ? "bg-[rgba(0,245,255,0.15)] text-[#00f5ff] font-bold border border-[rgba(0,245,255,0.3)] shadow-[0_0_15px_rgba(0,245,255,0.2)]"
                  : "text-[#aabbb4] hover:text-[#f8fcf9] hover:bg-[rgba(127,255,212,0.05)]"
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
          className="inline-flex items-center gap-2 bg-[rgba(127,255,212,0.9)] text-[#0a1a16] px-4 py-1.5 rounded-lg text-xs font-mono font-bold hover:bg-[#7fffd4] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(127,255,212,0.3),0_0_40px_rgba(0,245,255,0.15)]"
        >
          {isRunning ? (
            <>
              <span className="size-3 border-2 border-[#0a1a16] border-t-transparent rounded-full animate-spin" />
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
      <div className="runner-screen p-4 sm:p-6 bg-[#060c0e]/95 min-h-[260px] max-h-[360px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed space-y-1.5 backdrop-blur-xl">
        <div className="text-[#aabbb4]/60 pb-2 border-b border-[rgba(127,255,212,0.1)] flex items-center justify-between">
          <span>Active Command: {activeSuite.command}</span>
          <span
            className="text-xs text-[#00f5ff]"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={{ textShadow: '0 0 10px rgba(0,245,255,0.5)' }}
          >
            {isRunning ? "● Running" : isCompleted ? "✓ Finished" : "Ready"}
          </span>
        </div>

        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-busy={isRunning}
          aria-label={`${activeSuite.name} execution log`}
        >
          {displayedLogs.length === 0 && !isRunning && (
            <div className="py-12 text-center text-[#aabbb4]">
              <p className="text-[#00f5ff] font-mono text-sm mb-1" style={{ textShadow: '0 0 15px rgba(0,245,255,0.4)' }}>[Holographic QA Engine Idle]</p>
              <p className="text-xs text-[#aabbb4]/80">
                Click &quot;▶ RUN TEST SUITE&quot; above to simulate real-time Playwright, JMeter,
                or Selenium test runs with holographic visualization.
              </p>
            </div>
          )}

          {displayedLogs.map((log, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                log.type === "cmd"
                  ? "text-[#f8fcf9] font-bold"
                  : log.type === "pass"
                    ? "text-[#7fffd4]"
                    : log.type === "warn"
                      ? "text-[#f59e0b]"
                      : "text-[#00f5ff]"
              }`}
              style={log.type === "pass" ? { textShadow: '0 0 8px rgba(127,255,212,0.3)' } : log.type === "warn" ? { textShadow: '0 0 8px rgba(245,158,11,0.3)' } : log.type !== "cmd" ? { textShadow: '0 0 8px rgba(0,245,255,0.3)' } : {}}
            >
              <span className="text-[#aabbb4]/40 select-none" aria-hidden="true">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="break-all">{log.text}</span>
            </div>
          ))}

          {isRunning && (
            <div className="flex items-center gap-2 text-[#00f5ff] pt-1">
              <span className="animate-pulse" aria-hidden="true" style={{ textShadow: '0 0 10px rgba(0,245,255,0.6)' }}>
                ▍
              </span>
              <span className="text-xs text-[#aabbb4]">Processing holographic assertions...</span>
            </div>
          )}
        </div>
      </div>

      {/* Terminal Footer Metrics Bar */}
      <div className="runner-footer bg-[#0a1418]/90 px-4 py-2.5 border-t border-[rgba(127,255,212,0.1)] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#aabbb4] backdrop-blur-lg">
        <div className="runner-stats flex items-center gap-4">
          <span>
            STATUS:{" "}
            <strong className={isCompleted ? "text-[#7fffd4]" : "text-[#00f5ff]"} style={isCompleted ? { textShadow: '0 0 10px rgba(127,255,212,0.4)' } : { textShadow: '0 0 10px rgba(0,245,255,0.4)' }}>
              {isCompleted ? "PASSED" : isRunning ? "RUNNING" : "STANDBY"}
            </strong>
          </span>
          <span>
            COVERAGE: <strong className="text-[#f8fcf9]">100%</strong>
          </span>
          <span>
            ASSERTIONS: <strong className="text-[#7fffd4]" style={{ textShadow: '0 0 8px rgba(127,255,212,0.3)' }}>24/24 PASS</strong>
          </span>
        </div>
        <div className="text-[#00f5ff]" style={{ textShadow: '0 0 8px rgba(0,245,255,0.3)' }}>STACK: Playwright · Selenium · JMeter · Postman</div>
      </div>
    </div>
  );
}
