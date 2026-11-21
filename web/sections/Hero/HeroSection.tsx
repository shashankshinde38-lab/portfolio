"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import FlipCalendar from "@/web/components/FlipCalendar/FlipCalendar";
import LiquidReveal from "@/web/components/LiquidReveal/LiquidReveal";
import "./HeroSection.css";

interface HeroSectionProps {
  onOpenCard?: () => void;
  onOpenIntro?: () => void;
}

const QA_ROLES = [
  "QA Automation Engineer",
  "Software Test Engineer",
  "Mobile QA Engineer",
  "Manual Test Engineer",
  "Performance QA Engineer",
];

const METRICS = [
  [
    "~40%",
    "Automation",
    "Regression Cycle Cut",
    "Selenium & Appium POM Test Frameworks",
  ],
  [
    "100k+",
    "Performance",
    "Virtual Concurrency",
    "Distributed JMeter Stress & Spike Testing",
  ],
  [
    "240+",
    "STLC Rigor",
    "Defects Isolated",
    "Zero Severity-1 Leaks into Production",
  ],
  [
    "99.4%",
    "CI/CD Gates",
    "Pipeline Pass Rate",
    "Flake-Free Jenkins & GitHub Actions",
  ],
];

const DISCIPLINES = [
  ["/automation-testing", "Automation Testing"],
  ["/mobile-testing", "Mobile Testing"],
  ["/manual-testing", "Manual QA"],
  ["/performance-testing", "Performance Testing"],
  ["/api-testing", "API Testing"],
];

export default function HeroSection({
  onOpenCard,
  onOpenIntro,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="sh-hero"
      aria-labelledby="sh-introduction"
    >
      <div className="sh-hero__layout">
        <div className="sh-hero__intro">
          <div className="sh-hero__availability">
            <i aria-hidden="true" />
            Available for QA Projects &amp; SDET Roles
          </div>

          <p className="sh-hero__location">
            Profcyma Solutions · Pune, MH, India
          </p>

          <h1 id="sh-introduction">
            Hi, I’m <em>Shashank Shinde.</em>
          </h1>

          <p className="sh-hero__summary">
            Software test engineer in Pune. I test web apps, mobile apps, and APIs, build automated
            regression suites, and investigate defects before release.
          </p>

          <div className="sh-hero__calendar" aria-hidden="true">
            <FlipCalendar skills={QA_ROLES} />
          </div>
        </div>

        <div className="sh-hero__portrait">
          <LiquidReveal
            baseSrc="/images/hero-figure-cream.webp"
            colorSrc="/images/hero-figure-color.webp"
            alt="Shashank Shinde · Software Test Engineer"
            onOpenCard={onOpenCard}
          />
        </div>

        <div className="sh-hero__actions">
          <Link href="/projects" className="sh-hero__primary">
            View QA case studies
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <Link href="/contact">Contact Shashank</Link>

          {onOpenCard && (
            <button
              type="button"
              className="sh-hero__card-trigger"
              onClick={onOpenCard}
            >
              <Sparkles size={15} aria-hidden="true" />
              3D Ability Card
            </button>
          )}
        </div>

        <details className="sh-hero__notes" open>
          <summary>My QA practice</summary>

          <div className="sh-hero__notes-body">
            <p>
              In the <Link href="/projects/grosido-qa-case-study">Grosido case study</Link>, I describe the
              inventory and checkout regression coverage I built. The <Link href="/projects/driwe-qa-case-study">DRIWE case study</Link>{" "}
              covers booking flows and JMeter load testing. The <Link href="/qa-lab">QA Lab</Link> shows
              how I document test results and investigate defects.
            </p>

            <div className="sh-hero__metrics">
              {METRICS.map(([value, category, title, detail]) => (
                <div key={title}>
                  <span className="sh-hero__metric-tag">{category}</span>
                  <strong>{value}</strong>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              ))}
            </div>

            <nav
              className="sh-hero__disciplines"
              aria-label="Key QA disciplines"
            >
              {DISCIPLINES.map(([href, label]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </details>
      </div>

      <footer className="sh-hero__footer">
        {onOpenIntro && <button type="button" onClick={onOpenIntro}>Play portfolio intro</button>}
        <a href="#doors">
          Explore QA disciplines
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </footer>
    </section>
  );
}
