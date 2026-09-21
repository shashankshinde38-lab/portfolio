"use client";

import {
  Activity,
  Braces,
  CheckCircle2,
  CircleGauge,
  Clock3,
  Gauge,
  Play,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube2,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useReducedMotion } from "@/web/hooks/useReducedMotion";

import "./TestConsole.css";

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

    command:
      "test-suite run --all",

    suite:
      "regression",

    env:
      "staging",

    browser:
      "Chrome 125 | headless",

    total: 124,

    passed: 124,

    skipped: 2,

    failed: 0,

    duration:
      "18.42s",

    coverage:
      "96.7%",

    details: [
      "✓ Auth & RBAC boundary checks",
      "✓ Multi-cart checkout concurrency",
      "✓ Payment gateway webhook assertions",
      "✓ Geospatial route calculation & dispatch",
    ],
  },

  {
    title:
      "Load & Stress",

    command:
      "jmeter -n -t stress-suite.jmx",

    suite:
      "distributed-stress",

    env:
      "pre-production",

    browser:
      "JMeter Engine (100k VUs)",

    total: 3,

    passed: 3,

    skipped: 0,

    failed: 0,

    duration:
      "45.20s",

    coverage:
      "99.9% uptime",

    details: [
      "✓ 100k concurrent users ramp-up",
      "✓ Sustained throughput ≥ 25k req/s",
      "✓ P99 latency threshold < 180ms",
    ],
  },

  {
    title:
      "API Contract",

    command:
      "pytest tests/api/ -v",

    suite:
      "rest-contract",

    env:
      "staging",

    browser:
      "REST Assured / Postman",

    total: 58,

    passed: 58,

    skipped: 0,

    failed: 0,

    duration:
      "4.15s",

    coverage:
      "100% schema match",

    details: [
      "✓ JSON Schema & OpenAPI 3.1 validation",
      "✓ JWT revocation & expired token 401s",
      "✓ Idempotency key race-condition checks",
    ],
  },
];

const SUITE_ICONS = [
  TestTube2,
  Gauge,
  Braces,
];

export default function TestConsole() {
  const [
    activeTab,
    setActiveTab,
  ] = useState(0);

  const [
    revealed,
    setRevealed,
  ] = useState(false);

  const [
    isRunning,
    setIsRunning,
  ] = useState(false);

  const {
    prefersReduced,
  } = useReducedMotion();

  const currentSuite =
    SUITES[activeTab];

  const cycleTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);

  const revealTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);

  const ActiveSuiteIcon =
    SUITE_ICONS[
    activeTab %
    SUITE_ICONS.length
    ];

  /* =========================================================
     REVEAL ACTIVE SUITE
  ========================================================= */

  useEffect(() => {
    if (
      revealTimer.current
    ) {
      clearTimeout(
        revealTimer.current
      );
    }

    if (prefersReduced) {
      setRevealed(true);
      setIsRunning(false);

      return;
    }

    setRevealed(false);
    setIsRunning(true);

    revealTimer.current =
      setTimeout(() => {
        setRevealed(true);
        setIsRunning(false);
      }, 380);

    return () => {
      if (
        revealTimer.current
      ) {
        clearTimeout(
          revealTimer.current
        );
      }
    };
  }, [
    activeTab,
    prefersReduced,
  ]);

  /* =========================================================
     AUTO-CYCLE
  ========================================================= */

  useEffect(() => {
    if (prefersReduced) {
      return;
    }

    cycleTimer.current =
      setTimeout(() => {
        setActiveTab(
          (previous) =>
            (previous + 1) %
            SUITES.length
        );
      }, 7000);

    return () => {
      if (
        cycleTimer.current
      ) {
        clearTimeout(
          cycleTimer.current
        );
      }
    };
  }, [
    activeTab,
    prefersReduced,
  ]);

  /* =========================================================
     SELECT SUITE
  ========================================================= */

  const handleSelectTab = (
    index: number
  ) => {
    if (
      cycleTimer.current
    ) {
      clearTimeout(
        cycleTimer.current
      );
    }

    setActiveTab(index);
  };

  /* =========================================================
     RE-RUN CURRENT SUITE
  ========================================================= */

  const handleRunSuite = () => {
    if (
      revealTimer.current
    ) {
      clearTimeout(
        revealTimer.current
      );
    }

    if (prefersReduced) {
      setRevealed(true);
      setIsRunning(false);

      return;
    }

    setRevealed(false);
    setIsRunning(true);

    revealTimer.current =
      setTimeout(() => {
        setRevealed(true);
        setIsRunning(false);
      }, 650);
  };

  return (
    <div
      className="sdet-console-wrapper"
      role="region"
      aria-label="Interactive SDET test execution console"
    >
      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        className="sdet-console-glow"
        aria-hidden="true"
      />

      <div className="sdet-console-window">
        {/* =================================================
            TOP WINDOW BAR
        ================================================= */}

        <header className="sdet-window-header">
          <div
            className="sdet-window-controls"
            aria-hidden="true"
          >
            <span className="control-dot control-blue" />
            <span className="control-dot control-cyan" />
            <span className="control-dot control-green" />
          </div>

          <div className="sdet-window-title">
            <Terminal
              size={13}
              aria-hidden="true"
            />

            <span>
              SDET Execution Console
            </span>
          </div>

          <div className="sdet-header-status">
            <span
              className="sdet-header-status-dot"
              aria-hidden="true"
            />

            ONLINE
          </div>
        </header>

        {/* =================================================
            SUITE NAVIGATION
        ================================================= */}

        <div
          className="sdet-suite-tabs"
          role="tablist"
          aria-label="QA test suites"
        >
          {SUITES.map(
            (suite, index) => {
              const Icon =
                SUITE_ICONS[
                index %
                SUITE_ICONS.length
                ];

              const isActive =
                index === activeTab;

              return (
                <button
                  key={
                    suite.title
                  }
                  type="button"
                  role="tab"
                  aria-selected={
                    isActive
                  }
                  aria-controls="sdet-suite-panel"
                  tabIndex={
                    isActive
                      ? 0
                      : -1
                  }
                  className={`sdet-suite-tab ${isActive
                    ? "is-active"
                    : ""
                    }`}
                  onClick={() =>
                    handleSelectTab(
                      index
                    )
                  }
                >
                  <Icon
                    size={13}
                    strokeWidth={
                      1.8
                    }
                    aria-hidden="true"
                  />

                  <span>
                    {suite.title}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* =================================================
            COMMAND BAR
        ================================================= */}

        <div className="sdet-command-bar">
          <div className="sdet-command-copy">
            <span
              className="sdet-command-symbol"
              aria-hidden="true"
            >
              $
            </span>

            <code>
              {
                currentSuite.command
              }
            </code>
          </div>

          <span
            className={`sdet-execution-state ${isRunning
              ? "is-running"
              : "is-passed"
              }`}
            aria-live="polite"
          >
            {isRunning ? (
              <>
                <Activity
                  size={12}
                  aria-hidden="true"
                />

                RUNNING
              </>
            ) : (
              <>
                <CheckCircle2
                  size={12}
                  aria-hidden="true"
                />

                PASSED
              </>
            )}
          </span>
        </div>

        {/* =================================================
            MAIN PANEL
        ================================================= */}

        <div
          id="sdet-suite-panel"
          className="sdet-console-body"
          role="tabpanel"
        >
          {/* ===============================================
              SUITE IDENTITY
          =============================================== */}

          <div className="sdet-suite-heading">
            <div className="sdet-suite-heading-left">
              <span
                className="sdet-suite-heading-icon"
                aria-hidden="true"
              >
                <ActiveSuiteIcon
                  size={18}
                  strokeWidth={
                    1.7
                  }
                />
              </span>

              <div>
                <span className="sdet-suite-eyebrow">
                  ACTIVE TEST
                  EXECUTION
                </span>

                <h3>
                  {
                    currentSuite.title
                  }
                </h3>
              </div>
            </div>

            <div className="sdet-verified-chip">
              <ShieldCheck
                size={13}
                aria-hidden="true"
              />

              VERIFIED
            </div>
          </div>

          {/* ===============================================
              TELEMETRY
          =============================================== */}

          <div className="sdet-telemetry-grid">
            <div className="sdet-telemetry-item">
              <ServerCog
                size={13}
                aria-hidden="true"
              />

              <span>
                Suite
              </span>

              <strong>
                {
                  currentSuite.suite
                }
              </strong>
            </div>

            <div className="sdet-telemetry-item">
              <Activity
                size={13}
                aria-hidden="true"
              />

              <span>
                Environment
              </span>

              <strong>
                {
                  currentSuite.env
                }
              </strong>
            </div>

            <div className="sdet-telemetry-item sdet-telemetry-wide">
              <Terminal
                size={13}
                aria-hidden="true"
              />

              <span>
                Runtime
              </span>

              <strong>
                {
                  currentSuite.browser
                }
              </strong>
            </div>
          </div>

          {/* ===============================================
              METRICS
          =============================================== */}

          <div
            className={`sdet-result-grid ${revealed
              ? "is-visible"
              : ""
              }`}
          >
            <div className="sdet-result-card result-pass">
              <span>
                PASSED
              </span>

              <strong>
                {
                  currentSuite.passed
                }
              </strong>

              <CheckCircle2
                size={14}
                aria-hidden="true"
              />
            </div>

            <div className="sdet-result-card result-skip">
              <span>
                SKIPPED
              </span>

              <strong>
                {
                  currentSuite.skipped
                }
              </strong>

              <CircleGauge
                size={14}
                aria-hidden="true"
              />
            </div>

            <div className="sdet-result-card result-fail">
              <span>
                FAILED
              </span>

              <strong>
                {
                  currentSuite.failed
                }
              </strong>

              <Activity
                size={14}
                aria-hidden="true"
              />
            </div>

            <div className="sdet-result-card result-coverage">
              <span>
                COVERAGE
              </span>

              <strong>
                {
                  currentSuite.coverage
                }
              </strong>

              <Gauge
                size={14}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* ===============================================
              EXECUTION SUMMARY
          =============================================== */}

          <div
            className={`sdet-execution-summary ${revealed
              ? "is-visible"
              : ""
              }`}
          >
            <div>
              <Clock3
                size={13}
                aria-hidden="true"
              />

              <span>
                Duration
              </span>

              <strong>
                {
                  currentSuite.duration
                }
              </strong>
            </div>

            <div>
              <TestTube2
                size={13}
                aria-hidden="true"
              />

              <span>
                Checks
              </span>

              <strong>
                {
                  currentSuite.total
                }
              </strong>
            </div>

            <div>
              <ShieldCheck
                size={13}
                aria-hidden="true"
              />

              <span>
                Gate
              </span>

              <strong className="summary-gate-pass">
                PASS
              </strong>
            </div>
          </div>

          {/* ===============================================
              ASSERTION / COVERAGE DETAILS
          =============================================== */}

          <div
            className={`sdet-assertions ${revealed
              ? "is-visible"
              : ""
              }`}
          >
            <div className="sdet-assertions-header">
              <span>
                AUTOMATED ASSERTIONS
              </span>

              <span>
                {
                  currentSuite
                    .details
                    .length
                }{" "}
                checks
              </span>
            </div>

            <div className="sdet-assertion-list">
              {currentSuite.details.map(
                (
                  detail,
                  index
                ) => (
                  <div
                    className="sdet-assertion-row"
                    key={`${currentSuite.suite}-${index}`}
                    style={{
                      animationDelay:
                        prefersReduced
                          ? "0ms"
                          : `${index *
                          65
                          }ms`,
                    }}
                  >
                    <CheckCircle2
                      size={13}
                      aria-hidden="true"
                    />

                    <span>
                      {detail.replace(
                        /^✓\s*/,
                        ""
                      )}
                    </span>

                    <code>
                      PASS
                    </code>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ===============================================
              QUALITY GATE FOOTER
          =============================================== */}

          <div className="sdet-quality-gate">
            <div className="sdet-quality-message">
              <span
                className="sdet-quality-icon"
                aria-hidden="true"
              >
                <Sparkles
                  size={14}
                />
              </span>

              <div>
                <span>
                  QUALITY GATE
                </span>

                <strong>
                  Quality assured.
                  Shipping with
                  confidence.
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="sdet-run-button"
              onClick={
                handleRunSuite
              }
              disabled={
                isRunning
              }
              aria-label={`Run ${currentSuite.title} test suite`}
            >
              <Play
                size={13}
                fill="currentColor"
                aria-hidden="true"
              />

              <span>
                {isRunning
                  ? "Running"
                  : "Run suite"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}