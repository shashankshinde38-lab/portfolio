import {
  Sparkles,
  ArrowUpRight,
  ArrowDownToLine,
  Code2,
  Layers,
  Activity,
  Braces,
  GitBranch,
  Bug,
  TestTube2,
  Database,
  GitPullRequest,
  Smartphone,
} from "lucide-react";

import TestConsole from "@/web/components/TestConsole/TestConsole";

import "./Hero.css";

/* =========================================================
   TOOLKIT
========================================================= */

const TOOLKIT = [
  {
    label: "Selenium",
    icon: Code2,
  },
  {
    label: "Playwright",
    icon: Layers,
  },
  {
    label: "JMeter",
    icon: Activity,
  },
  {
    label: "Postman",
    icon: Braces,
  },
  {
    label: "Appium",
    icon: Smartphone,
  },
  {
    label: "CI/CD",
    icon: GitBranch,
  },
  {
    label: "JIRA",
    icon: Bug,
  },
  {
    label: "TestNG",
    icon: TestTube2,
  },
  {
    label: "SQL",
    icon: Database,
  },
  {
    label: "GitHub Actions",
    icon: GitPullRequest,
  },
];

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="hero-section"
        aria-label="Introduction and professional overview"
      >
        {/* Ambient background effects */}

        <div
          className="hero-ambient hero-ambient-left"
          aria-hidden="true"
        />

        <div
          className="hero-ambient hero-ambient-right"
          aria-hidden="true"
        />

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="hero-copy">
          {/* KICKER */}

          <div className="hero-kicker-badge">
            <Sparkles
              size={14}
              className="hero-kicker-icon"
              aria-hidden="true"
            />

            <span>
              SOFTWARE TEST ENGINEER
              <span className="hero-kicker-separator">
                •
              </span>
              QA AUTOMATION
            </span>
          </div>

          {/* ROLE & PRIMARY H1 */}

          <h1 className="hero-role-title">
            Shashank Shinde — Software Test Engineer &amp; QA Automation Engineer
          </h1>

          {/* VISUAL HEADLINE */}

          <div
            className="hero-headline"
            aria-hidden="true"
          >
            <span className="hero-headline-main">
              Great software.
            </span>

            <span className="hero-headline-gradient">
              Tested to the
              <br className="hero-desktop-break" />
              {" "}
              last detail.
            </span>
          </div>

          {/* FACTUAL ENTITY STATEMENT & DESCRIPTION */}

          <p className="hero-description">
            <strong>Shashank Shinde</strong> is a Software Test Engineer and QA
            Automation Engineer based in Pune, Maharashtra, India, specializing
            in web, mobile, API, automation and performance testing. Working as an
            Automation Tester and SDET, I design, automate and execute comprehensive
            test suites that improve reliability, performance and overall product quality.
          </p>

          {/* AVAILABILITY */}

          <div className="availability">
            <span
              className="status-dot"
              aria-hidden="true"
            />

            <span>
              Available for QA &amp; SDET opportunities
            </span>
          </div>

          {/* CTA */}

          <div className="hero-actions">
            <a
              className="btn-primary btn-3d-glow hero-primary-action"
              href="#cases"
              data-track-event="project_view"
              data-track-location="hero"
              aria-label="View featured software testing projects and QA case studies"
            >
              <span>
                View QA Case Studies
              </span>

              <ArrowUpRight
                size={17}
                aria-hidden="true"
              />
            </a>

            <a
              className="btn-secondary btn-3d-glass hero-secondary-action"
              href="/files/Shashank_Shinde_Resume.pdf"
              download="Shashank_Shinde_Resume.pdf"
              data-track-event="resume_download"
              data-track-location="hero"
              aria-label="Download Shashank Shinde Software Test Engineer Resume PDF"
            >
              <ArrowDownToLine
                size={16}
                aria-hidden="true"
              />

              <span>
                Download Resume
              </span>
            </a>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE — TEST CONSOLE
        ================================================= */}

        <div className="hero-console-column">
          <div
            className="hero-console-background"
            aria-hidden="true"
          />

          <div
            className="hero-console-glow"
            aria-hidden="true"
          />

          <div className="hero-console-wrap">
            <TestConsole />
          </div>
        </div>
      </section>

      {/* =====================================================
          TOOLKIT STRIP
      ===================================================== */}

      <section
        className="expertise-strip"
        aria-label="Everyday testing toolkit"
      >
        <div className="expertise-strip-inner">
          {/* LABEL */}

          <div className="strip-heading">
            <span
              className="strip-dot"
              aria-hidden="true"
            />

            <span className="strip-label">
              MY EVERYDAY TOOLKIT
            </span>
          </div>

          {/* MARQUEE */}

          <div className="tool-names">
            <div className="tool-track">
              {/* ORIGINAL */}

              <div className="tool-group">
                {TOOLKIT.map(({ label, icon: Icon }) => (
                  <span
                    className="tool-pill"
                    key={label}
                  >
                    <Icon aria-hidden="true" />

                    <span>
                      {label}
                    </span>
                  </span>
                ))}
              </div>

              {/* DUPLICATE FOR SEAMLESS LOOP */}

              <div
                className="tool-group"
                aria-hidden="true"
              >
                {TOOLKIT.map(({ label, icon: Icon }) => (
                  <span
                    className="tool-pill"
                    key={`duplicate-${label}`}
                  >
                    <Icon />

                    <span>
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}