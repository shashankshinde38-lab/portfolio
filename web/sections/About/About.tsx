import Link from "next/link";
import {
  Microscope,
  ArrowUpRight,
  User,
  Check,
  ShieldCheck,
  Bug,
  ListChecks,
  TrendingUp,
  Activity,
} from "lucide-react";

import TiltCard from "@/web/components/TiltCard/TiltCard";

import "./About.css";

/* =========================================================
   STATS
========================================================= */

const STATS = [
  {
    title: "DEFECTS CAUGHT EARLY",
    status: "QA TRACKING",
    value: "240+",
    description: "before production release",
    footer: "QUALITY SIGNAL",
    tone: "violet",
    icon: Bug,
  },
  {
    title: "TEST CASES DESIGNED",
    status: "TEST COVERAGE",
    value: "500+",
    description: "designed & executed",
    footer: "TEST MATRIX",
    tone: "cyan",
    icon: ListChecks,
  },
  {
    title: "VIRTUAL USERS",
    status: "JMETER LOAD TESTS",
    value: "100k+",
    description: "simulated concurrent load",
    footer: "PERFORMANCE GATE",
    tone: "blue",
    icon: Activity,
  },
  {
    title: "AUTOMATION IMPACT",
    status: "EFFICIENCY",
    value: "~40%",
    description: "reduction in regression time",
    footer: "AUTOMATION GAIN",
    tone: "indigo",
    icon: TrendingUp,
  },
] as const;

/* =========================================================
   ABOUT
========================================================= */

export default function About() {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-heading"
    >
      <div className="about-container">
        {/* =====================================================
            MAIN ABOUT LAYOUT
        ===================================================== */}

        <div className="about-main-grid">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="about-left-column">
            {/* HEADING */}

            <header className="about-heading-row">
              <div className="about-kicker-wrap">
                <span
                  className="about-icon-badge"
                  aria-hidden="true"
                >
                  <Microscope size={17} />
                </span>

                <span className="about-eyebrow">
                  QA ENGINEER
                </span>
              </div>

              <h2
                id="about-heading"
                className="about-heading"
              >
                <span className="section-title-label">
                  ABOUT SHASHANK SHINDE
                </span>

                <span className="about-heading-main">
                  Curious by nature.
                </span>

                <span className="about-heading-accent">
                  Precise by practice.
                </span>
              </h2>

              <div
                className="accent-bar-line"
                aria-hidden="true"
              />

              <p className="about-standout-lead">
                I break things down to build confidence in what
                ships.
              </p>
            </header>

            {/* =================================================
                ABOUT COPY
            ================================================= */}

            <div className="about-copy">
              <div className="about-copy-content">
                <p>
                  I&apos;m Shashank, a Software Test Engineer
                  based in{" "}
                  <strong>Pune, India</strong>. I turn
                  &ldquo;it should work&rdquo; into software
                  people can count on.
                </p>

                <p>
                  At{" "}
                  <strong>Profcyma Solutions</strong>, I build
                  automation frameworks, validate APIs, and put
                  applications under real pressure. From a
                  customer&apos;s first tap to the final
                  payment, I look for what could go wrong—and
                  make sure it goes right.
                </p>

                <p>
                  My foundation is a B.E. in Information
                  Technology and SDET training at SEED Infotech.
                  My approach is simple: stay curious,
                  understand the user, and make quality part of
                  every release.
                </p>
              </div>

              {/* ACTIONS */}

              <div className="about-actions-row">
                <Link
                  className="about-link about-link-primary"
                  href="/about"
                  aria-label="Read full profile and testing philosophy of Shashank Shinde"
                >
                  <span>
                    READ FULL PROFILE
                  </span>

                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                  />
                </Link>

                <a
                  className="about-link about-link-secondary"
                  href="#cases"
                  aria-label="Explore featured software testing projects"
                >
                  <span>
                    Explore my work
                  </span>

                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT PROFILE
          ================================================= */}

          <div className="profile-panel-column">
            <TiltCard
              as="div"
              className="profile-panel-3d"
              maxTilt={5}
            >
              {/* GLOW */}

              <div
                className="profile-panel-glow"
                aria-hidden="true"
              />

              {/* =============================================
                  PROFILE HEADER
              ============================================= */}

              <div className="profile-top-header">
                <div className="profile-identity">
                  <div
                    className="profile-avatar-circle"
                    aria-hidden="true"
                  >
                    <User
                      size={22}
                      strokeWidth={1.8}
                    />

                    <span className="profile-avatar-pulse" />
                  </div>

                  <div className="profile-title-block">
                    <h3>
                      Shashank Shinde
                    </h3>

                    <p className="profile-subtext">
                      Software Test Engineer · QA Automation
                    </p>
                  </div>
                </div>

                <span className="status-pill-live">
                  <span
                    className="profile-status-dot"
                    aria-hidden="true"
                  />

                  <span>
                    Open to opportunities
                  </span>
                </span>
              </div>

              {/* =============================================
                  CIRCUIT DIAGRAM
              ============================================= */}

              <div
                className="profile-circuit-diagram"
                aria-hidden="true"
              >
                <div className="circuit-grid-lines" />

                <span className="circuit-line circuit-line-horizontal" />

                <span className="circuit-line circuit-line-vertical" />

                <div className="circuit-target-ring">
                  <div className="circuit-inner-ring">
                    <Check
                      size={19}
                      strokeWidth={2.5}
                      className="circuit-check-icon"
                    />
                  </div>
                </div>

                <span className="circuit-node node-left" />

                <span className="circuit-node node-right" />

                <span className="circuit-node node-top" />
              </div>

              {/* =============================================
                  QUOTE
              ============================================= */}

              <blockquote className="profile-quote-block">
                <p>
                  &ldquo;I don&apos;t just find bugs,
                </p>

                <p className="quote-highlight">
                  I protect user trust.&rdquo;
                </p>
              </blockquote>

              {/* =============================================
                  DETAILS
              ============================================= */}

              <dl className="profile-details-mini">
                <div>
                  <dt>
                    Role
                  </dt>

                  <dd>
                    Software Test Engineer
                  </dd>
                </div>

                <div>
                  <dt>
                    Company
                  </dt>

                  <dd>
                    Profcyma Solutions
                  </dd>
                </div>

                <div>
                  <dt>
                    Location
                  </dt>

                  <dd>
                    Pune, Maharashtra, India
                  </dd>
                </div>

                <div>
                  <dt>
                    Specializations
                  </dt>

                  <dd>
                    Automation · API · Load QA
                  </dd>
                </div>

                <div>
                  <dt>
                    Primary Tools
                  </dt>

                  <dd>
                    Selenium · Playwright · JMeter
                  </dd>
                </div>

                <div>
                  <dt>
                    Credentials
                  </dt>

                  <dd>
                    B.E. IT · SEED SDET
                  </dd>
                </div>
              </dl>

              {/* =============================================
                  FOOTER
              ============================================= */}

              <div className="profile-panel-footer">
                <ShieldCheck
                  size={15}
                  className="profile-shield-icon"
                  aria-hidden="true"
                />

                <span>
                  Quality is a mindset, not a final step.
                </span>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div
          className="stats-row-3d"
          aria-label="Software testing achievements"
        >
          {STATS.map(
            ({
              title,
              status,
              value,
              description,
              footer,
              tone,
              icon: Icon,
            }) => (
              <TiltCard
                key={title}
                as="div"
                className={`stat-card-3d tone-${tone}`}
                maxTilt={4}
              >
                <div
                  className="stat-card-orb"
                  aria-hidden="true"
                />

                {/* HEADER */}

                <div className="stat-card-header">
                  <span
                    className="stat-icon-wrap"
                    aria-hidden="true"
                  >
                    <Icon size={17} />
                  </span>

                  <div className="stat-card-heading">
                    <span className="stat-category-label">
                      {title}
                    </span>

                    <span className="stat-mini-status">
                      {status}
                    </span>
                  </div>
                </div>

                {/* VALUE */}

                <div className="stat-value-row">
                  <strong className="stat-value-glow">
                    {value}
                  </strong>

                  <span
                    className="stat-live-dot"
                    aria-hidden="true"
                  />
                </div>

                <p className="stat-subtext">
                  {description}
                </p>

                {/* FOOTER */}

                <div className="stat-card-footer">
                  <span
                    className="stat-progress-track"
                    aria-hidden="true"
                  >
                    <span className="stat-progress-fill" />
                  </span>

                  <span className="stat-footer-label">
                    {footer}
                  </span>
                </div>
              </TiltCard>
            )
          )}
        </div>
      </div>
    </section>
  );
}