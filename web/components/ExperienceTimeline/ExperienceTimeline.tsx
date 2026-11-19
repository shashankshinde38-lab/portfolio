"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import "./ExperienceTimeline.css";

interface CareerMilestone {
  id: string;
  year: string;
  step: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  highlight: string;
  responsibilities: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
}

const MILESTONES: CareerMilestone[] = [
  {
    id: "profcyma",
    year: "2025",
    step: "01",
    period: "June 2025 — Present",
    role: "Software Test Engineer",
    organization: "Profcyma Solutions Pvt. Ltd.",
    location: "Pune, Maharashtra, India",
    highlight:
      "Joined Profcyma Solutions, spearheading full Software Testing Life Cycle (STLC) across production platforms.",
    responsibilities: [
      "Engineered maintainable Selenium WebDriver & Playwright Page Object Model (POM) regression test suites, slashing full regression turn-around time by ~40%.",
      "Conducted distributed Apache JMeter load tests scaling to 100,000 concurrent simulated virtual users, uncovering critical negative fare race conditions under booking bursts.",
      "Authored automated Postman API collections with strict JSON schema conformity checks, webhook idempotency assertions, and database ledger consistency checks.",
      "Tracked and resolved 240+ defects in JIRA with reproduction steps, network HAR captures, and verified automated regression test coverage.",
    ],
    stack: [
      "Selenium WebDriver",
      "Playwright",
      "TestNG",
      "JMeter",
      "Postman",
      "Java",
      "TypeScript",
      "JIRA",
      "CI/CD",
    ],
    metrics: [
      { value: "~40%", label: "Regression Cycle Cut" },
      { value: "240+", label: "Production Defects Isolated" },
      { value: "100k+", label: "Virtual Concurrency Simulated" },
    ],
  },
  {
    id: "abet-tech",
    year: "2024",
    step: "02",
    period: "Oct 2024 — Jan 2025",
    role: "Software Testing & QA Intern",
    organization: "ABET Technology",
    location: "Pune, Maharashtra, India",
    highlight:
      "Hands-on software quality engineering, exploratory edge-case hunting, and functional test suite design.",
    responsibilities: [
      "Authored and executed exhaustive manual test suites for web applications, including smoke, sanity, and boundary value regression sweeps.",
      "Constructed detailed Requirement Traceability Matrices (RTM) guaranteeing 100% test coverage against functional specifications.",
      "Collaborated with developers in daily agile standups, triaging defects with concise reproduction steps and console logs.",
    ],
    stack: [
      "Manual Testing",
      "STLC",
      "Boundary Value Analysis",
      "Postman",
      "JIRA",
      "Defect Triage",
    ],
    metrics: [
      { value: "100+", label: "Test Cases Authored" },
      { value: "0", label: "Missed Acceptance Criteria" },
      { value: "100%", label: "Requirement Traceability" },
    ],
  },
  {
    id: "pune-university",
    year: "2020",
    step: "03",
    period: "Graduation 2020",
    role: "Bachelor of Engineering in Information Technology",
    organization: "University of Pune",
    location: "Pune, Maharashtra, India",
    highlight:
      "Graduated with core academic grounding in computer systems, relational database architecture, algorithms, and networks.",
    responsibilities: [
      "Comprehensive study of Software Engineering, Database Management Systems (DBMS), Operating Systems, and Distributed Networks.",
      "Hands-on laboratory work in relational database design (PostgreSQL/MySQL), SQL queries, data structures, and computer networking protocols.",
      "Built rigorous theoretical foundations in testing methodologies (Black-box, White-box, Boundary Value Analysis, Equivalence Partitioning).",
    ],
    stack: [
      "Information Technology",
      "Relational Databases",
      "SQL",
      "Computer Networks",
      "Algorithms",
    ],
    metrics: [
      { value: "B.E. IT", label: "Engineering Degree" },
      { value: "Pune", label: "University Accredited" },
      { value: "STLC/SDLC", label: "Core Theoretical Mastery" },
    ],
  },
];

// Rolling Odometer Single Digit Column
function RollingDigit({ digit }: { digit: string }) {
  const num = parseInt(digit, 10);
  const offset = isNaN(num) ? 0 : num * 10;

  return (
    <div className="digit-roller-col">
      <div className="digit-strip" style={{ transform: `translateY(-${offset}%)` }}>
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
      </div>
    </div>
  );
}

// 4-Digit Rolling Year Display
function RollingYearDisplay({ year }: { year: string }) {
  const digits = year.padStart(4, "0").split("");

  return (
    <div className="rolling-year-wrap font-serif" aria-label={`Year ${year}`}>
      {digits.map((d, i) => (
        <RollingDigit key={i} digit={d} />
      ))}
    </div>
  );
}

export default function ExperienceTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const current = MILESTONES[activeStep];
  const sectionRef = useRef<HTMLElement>(null);

  const total = MILESTONES.length;
  const progressPercent = ((activeStep + 1) / total) * 100;

  const goTo = (index: number) => {
    setActiveStep(index);
    sectionRef.current?.querySelector<HTMLElement>(`[data-milestone="${index}"]`)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "center",
    });
  };
  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll<HTMLElement>("[data-milestone]");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - innerHeight * 0.4) -
              Math.abs(b.boundingClientRect.top - innerHeight * 0.4),
          );
        if (visible[0]) setActiveStep(Number((visible[0].target as HTMLElement).dataset.milestone));
      },
      { rootMargin: "-18% 0px -35% 0px", threshold: 0 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="timeline-section-root"
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(Math.min(total - 1, activeStep + 1));
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(Math.max(0, activeStep - 1));
          }
        }
      }}
      aria-label="Career Journey and Software Testing Timeline"
    >
      <div className="timeline-container">
        {/* Header: Section Eyebrow, Main Title, and Subtitle */}
        <div className="timeline-header">
          <span className="timeline-eyebrow">MY STORY</span>
          <h2 className="timeline-main-title">Let&apos;s go back in time.</h2>
          <p className="timeline-subtitle font-serif italic">
            From university foundations to production-grade SDET leadership.
          </p>
        </div>

        {/* Timeline Interactive Layout Grid */}
        <div className="timeline-interactive-grid">
          {/* Left Column: Rolling Big Year, Counter & Steppers */}
          <div className="timeline-left-column">
            {/* Rolling Odometer Year Display */}
            <RollingYearDisplay year={current.year} />

            {/* Step Counter & Progress Track */}
            <div className="timeline-counter-group">
              <div className="timeline-counter-text">
                <span className="timeline-counter-cur">{current.step}</span>
                <span>/</span>
                <span>0{total}</span>
                <span
                  style={{ marginLeft: "0.5rem", color: "var(--text-muted)", fontSize: "0.75rem" }}
                >
                  CAREER MILESTONE
                </span>
              </div>

              <div className="timeline-progress-track">
                <div className="timeline-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="timeline-steppers">
              <button
                type="button"
                className="timeline-step-btn"
                onClick={() => goTo(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                aria-label="Previous Career Milestone"
                title="Go to earlier milestone"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="timeline-step-btn"
                onClick={() => goTo(Math.min(total - 1, activeStep + 1))}
                disabled={activeStep === total - 1}
                aria-label="Next Career Milestone"
                title="Go to next milestone"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick Milestone Selection Dots */}
            <div className="timeline-milestone-dots" role="tablist">
              {MILESTONES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`timeline-dot ${idx === activeStep ? "active" : ""}`}
                  onClick={() => goTo(idx)}
                  aria-label={`Jump to ${item.year}: ${item.role}`}
                  role="tab"
                  aria-selected={idx === activeStep}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Active Milestone Presentation Card */}
          <div className="timeline-chronology">
            {MILESTONES.map((current, index) => (
              <article
                key={current.id}
                data-milestone={index}
                className={`timeline-card-presentation ${activeStep === index ? "is-current" : ""}`}
                aria-label={`${current.period}: ${current.role}`}
              >
                <span className="timeline-period-badge">{current.period}</span>
                <h3 className="timeline-card-role">{current.role}</h3>
                <p className="timeline-card-org">
                  {current.organization} · {current.location}
                </p>
                <p className="timeline-card-highlight">{current.highlight}</p>

                <h4 className="timeline-responsibilities-title">
                  Testing Contributions &amp; Scope
                </h4>
                <ul className="timeline-responsibilities-list">
                  {current.responsibilities.map((resp, i) => (
                    <li key={i}>
                      <CheckCircle2
                        size={16}
                        className="text-[#A4552C] flex-shrink-0"
                        style={{ marginTop: "3px" }}
                      />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                <div className="timeline-card-footer">
                  <div className="timeline-metrics-strip">
                    {current.metrics.map((m, i) => (
                      <div key={i} className="timeline-metric-item">
                        <div className="timeline-metric-val">{m.value}</div>
                        <div className="timeline-metric-lbl">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="timeline-tech-tags">
                    {current.stack.map((tech) => (
                      <span key={tech} className="timeline-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
