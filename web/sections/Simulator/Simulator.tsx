import Link from "next/link";
import {
  Activity,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

import InteractiveTestRunner from "@/web/components/InteractiveTestRunner/InteractiveTestRunner";
import BugSpotterLab from "@/web/sections/BugSpotterLab/BugSpotterLab";

import "./Simulator.css";

export default function Simulator() {
  return (
    <section
      id="simulator"
      className="section section-lined simulator-section"
      aria-labelledby="simulator-heading"
    >
      <div className="simulator-container">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="simulator-section-heading">
          <div className="simulator-heading-copy">
            <div className="simulator-kicker">
              <span
                className="simulator-kicker-icon"
                aria-hidden="true"
              >
                <Terminal size={16} strokeWidth={1.8} />
              </span>

              <span>THE TESTING LAB</span>
            </div>

            <h2 id="simulator-heading">
              <span className="simulator-title-label">
                Testing Simulator
              </span>

              <span className="simulator-title-main">
                Don&apos;t just read about it.
              </span>

              <span className="simulator-title-accent">
                Put quality to the test.
              </span>
            </h2>
          </div>

          <div className="simulator-heading-side">
            <span
              className="simulator-heading-side-icon"
              aria-hidden="true"
            >
              <Sparkles size={16} />
            </span>

            <div className="simulator-heading-side-copy">
              <strong>Interactive QA Playground</strong>

              <p>
                Run simulated test suites, inspect failures and
                investigate edge cases that can hide in real
                production workflows.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            LAB STATUS BAR
        ===================================================== */}

        <div className="simulator-lab-intro">
          <div className="simulator-lab-intro-left">
            <span className="simulator-online-badge">
              <span
                className="simulator-online-dot"
                aria-hidden="true"
              />

              LAB ONLINE
            </span>

            <span className="simulator-demo-badge">
              <Terminal size={13} aria-hidden="true" />

              Interactive demonstrations
            </span>
          </div>

          <div className="simulator-lab-intro-right">
            <span>
              <ShieldCheck size={13} aria-hidden="true" />
              Safe simulation
            </span>

            <span
              className="simulator-lab-divider"
              aria-hidden="true"
            />

            <span>No production systems affected</span>
          </div>
        </div>

        {/* =====================================================
            LAB GRID
        ===================================================== */}

        <div className="simulator-testing-grid">
          {/* =================================================
              INTERACTIVE TEST RUNNER
          ================================================= */}

          <article className="simulator-tool-panel simulator-runner-panel">
            <div
              className="simulator-panel-glow"
              aria-hidden="true"
            />

            <header className="simulator-tool-header">
              <div className="simulator-tool-title">
                <span
                  className="simulator-tool-icon"
                  aria-hidden="true"
                >
                  <Activity size={17} strokeWidth={1.8} />
                </span>

                <div>
                  <span className="simulator-tool-eyebrow">
                    TEST EXECUTION &amp; AUTOMATION
                  </span>

                  <h3>Playwright &amp; JMeter Test Demonstrations</h3>
                </div>
              </div>

              <span className="simulator-ready-badge">
                <span
                  className="simulator-ready-dot"
                  aria-hidden="true"
                />

                READY
              </span>
            </header>

            <div className="simulator-semantic-desc">
              <p>
                <strong>
                  <Link href="/skills/playwright-automation" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Playwright End-to-End Testing
                  </Link>{" "}
                  &amp;{" "}
                  <Link href="/skills/performance-testing" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Apache JMeter Load Testing
                  </Link>{" "}
                  Demonstrations:
                </strong>{" "}
                This interactive simulator demonstrates automated browser regression execution and distributed load testing in real time. It represents Shashank Shinde&apos;s core QA skills in Playwright (browser E2E automation) and Apache JMeter (distributed concurrency simulation). The workflows validate Chromium multi-role checkout journeys, token authentication handshakes, and 100,000-user concurrency thresholds with latency SLA monitoring.
              </p>
            </div>

            <div className="simulator-tool-body">
              <InteractiveTestRunner />
            </div>
          </article>

          {/* =================================================
              BUG SPOTTER
          ================================================= */}

          <article className="simulator-tool-panel simulator-bug-panel">
            <div
              className="simulator-panel-glow"
              aria-hidden="true"
            />

            <header className="simulator-tool-header">
              <div className="simulator-tool-title">
                <span
                  className="simulator-tool-icon"
                  aria-hidden="true"
                >
                  <FlaskConical size={17} strokeWidth={1.8} />
                </span>

                <div>
                  <span className="simulator-tool-eyebrow">
                    DEFECT INVESTIGATION
                  </span>

                  <h3>Edge-Case Analysis &amp; Defect Triage</h3>
                </div>
              </div>

              <span className="simulator-ready-badge">
                <span
                  className="simulator-ready-dot"
                  aria-hidden="true"
                />

                READY
              </span>
            </header>

            <div className="simulator-semantic-desc">
              <p>
                <strong>Defect Investigation &amp; Concurrency Edge-Case Analysis:</strong>{" "}
                This defect triage simulator demonstrates pre-production root-cause analysis and automated assertion verification. It represents Shashank Shinde&apos;s QA capabilities in race condition isolation, webhook idempotency, and database state integrity. Workflows validated include{" "}
                <Link href="/projects/driwe-qa-case-study" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  negative fare calculations during booking velocity surges
                </Link>
                ,{" "}
                <Link href="/projects/ride-sharing-testing-case-study" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  inventory reservation race conditions
                </Link>
                , and distributed cache desynchronization.
              </p>
            </div>

            <div className="simulator-tool-body">
              <BugSpotterLab />
            </div>
          </article>
        </div>

        {/* =====================================================
            FOOTER INFORMATION
        ===================================================== */}

        <div className="simulator-info-grid">
          <div className="simulator-info-card">
            <span
              className="simulator-info-icon"
              aria-hidden="true"
            >
              <FlaskConical size={15} />
            </span>

            <div>
              <strong>Controlled Environment</strong>

              <p>
                Purpose-built scenarios for demonstrating testing
                strategy and QA investigation.
              </p>
            </div>
          </div>

          <div className="simulator-info-card">
            <span
              className="simulator-info-icon"
              aria-hidden="true"
            >
              <ShieldCheck size={15} />
            </span>

            <div>
              <strong>Zero Production Impact</strong>

              <p>
                All demonstrations use simulated data, controlled
                states and isolated test cases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}