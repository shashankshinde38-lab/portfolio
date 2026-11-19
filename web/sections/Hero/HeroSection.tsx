"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import FlipCalendar from "@/web/components/FlipCalendar/FlipCalendar";
import LiquidReveal from "@/web/components/LiquidReveal/LiquidReveal";
import "./HeroSection.css";

interface HeroSectionProps {
  onOpenCard?: () => void;
  onOpenContact?: () => void;
}

// Grammatically correct roles matching "I am a ...":
// "I am a QA Automation Engineer"
// "I am a Software Test Engineer"
// "I am a Mobile QA Engineer"
// "I am a Manual Test Engineer"
// "I am a Performance QA Engineer"
const QA_ROLES = [
  "QA Automation Engineer",
  "Software Test Engineer",
  "Mobile QA Engineer",
  "Manual Test Engineer",
  "Performance QA Engineer",
];

export default function HeroSection({ onOpenCard, onOpenContact }: HeroSectionProps) {
  const scrollToDoors = () => {
    const el = document.getElementById("doors");
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    }
  };

  return (
    <section id="home" className="hero-section" aria-label="Introduction & Identity">
      <div className="hero-main-container">
        <div className="hero-copy">
          {/* TOP STATUS & IDENTITY EYEBROW */}
          <div className="hero-eyebrow-container">
            <div className="hero-status-pill">
              <span className="hero-status-dot" aria-hidden="true" />
              <span className="hero-status-text">Available for QA Projects &amp; SDET Roles</span>
            </div>
            <span className="hero-eyebrow-sep">/</span>
            <span className="hero-eyebrow-role">Profcyma Solutions &bull; Pune, MH, India</span>
          </div>

          {/* GRAND EDITORIAL HEADLINE WITH EXACT 3D DESK FLIP CALENDAR */}
          <h1 className="hero-h1">
            <span className="hero-h1-line">Hi, I&apos;m Shashank.</span>
            <span className="hero-h1-line">
              <span className="soft">I am a</span>
            </span>
            <span className="hero-calendar-wrap">
              <FlipCalendar skills={QA_ROLES} />
            </span>
          </h1>

          {/* HERO CALLS TO ACTION */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="pill pill--dark pill--arrow"
              onClick={onOpenContact}
              aria-label="Start an enquiry"
            >
              <span className="pill__in">
                <span>Hire me</span>
                <span className="pill__badge" aria-hidden="true">
                  <ArrowRight size={14} />
                </span>
              </span>
            </button>

            <button
              type="button"
              className="pill pill--outline"
              onClick={scrollToDoors}
              aria-label="See my QA work"
            >
              <span className="pill__in">See my work</span>
            </button>

            {onOpenCard && (
              <button
                type="button"
                className="pill pill--card-trigger"
                onClick={onOpenCard}
                aria-label="View interactive 3D Ability Card"
              >
                <span className="pill__in">
                  <Sparkles size={14} className="pill__sparkle-icon" />
                  <span>3D Ability Card</span>
                </span>
              </button>
            )}
          </div>
          <details className="hero-practice-notes">
            <summary>
              My QA practice <span aria-hidden="true">↗</span>
            </summary>
            <div className="hero-practice-body">
              {" "}
              {/* COMPELLING QA MANIFESTO & VALUE PROPOSITION */}
              <p className="hero-description">
                Quality isn&apos;t an afterthought &mdash; it&apos;s engineered into every release.
                I design, automate, and execute comprehensive software testing strategies to deliver
                high-confidence, zero-defect production web, mobile, and API systems.
              </p>
              {/* LARGE & ATTRACTIVE EDITORIAL QA METRICS SHOWCASE */}
              <div className="hero-metrics-grid" role="region" aria-label="Key QA Impact Metrics">
                <div className="hero-metric-card">
                  <div className="hero-metric-top">
                    <span className="hero-metric-num font-serif">~40%</span>
                    <span className="hero-metric-tag">Automation</span>
                  </div>
                  <span className="hero-metric-title">Regression Cycle Cut</span>
                  <span className="hero-metric-desc">
                    Selenium &amp; Appium POM Test Frameworks
                  </span>
                </div>

                <div className="hero-metric-card">
                  <div className="hero-metric-top">
                    <span className="hero-metric-num font-serif">100k+</span>
                    <span className="hero-metric-tag">Performance</span>
                  </div>
                  <span className="hero-metric-title">Virtual Concurrency</span>
                  <span className="hero-metric-desc">
                    Distributed JMeter Stress &amp; Spike Testing
                  </span>
                </div>

                <div className="hero-metric-card">
                  <div className="hero-metric-top">
                    <span className="hero-metric-num font-serif">240+</span>
                    <span className="hero-metric-tag">STLC Rigor</span>
                  </div>
                  <span className="hero-metric-title">Defects Isolated</span>
                  <span className="hero-metric-desc">Zero Severity-1 Leaks into Production</span>
                </div>

                <div className="hero-metric-card">
                  <div className="hero-metric-top">
                    <span className="hero-metric-num font-serif">99.4%</span>
                    <span className="hero-metric-tag">CI/CD Gates</span>
                  </div>
                  <span className="hero-metric-title">Pipeline Pass Rate</span>
                  <span className="hero-metric-desc">Flake-Free Jenkins &amp; GitHub Actions</span>
                </div>
              </div>
              {/* CORE QA DISCIPLINES PILLS */}
              <div className="hero-doors-preview">
                <span className="hero-doors-label">Key QA Disciplines:</span>
                <div className="hero-doors-pills">
                  <Link href="/automation-testing" className="hero-door-chip">
                    <span className="door-chip-dot door-navy" />
                    <span>Automation Testing</span>
                  </Link>
                  <Link href="/mobile-testing" className="hero-door-chip">
                    <span className="door-chip-dot door-burgundy" />
                    <span>Mobile Testing</span>
                  </Link>
                  <Link href="/manual-testing" className="hero-door-chip">
                    <span className="door-chip-dot door-sage" />
                    <span>Manual QA</span>
                  </Link>
                  <Link href="/performance-testing" className="hero-door-chip">
                    <span className="door-chip-dot door-terracotta" />
                    <span>Performance Testing</span>
                  </Link>
                  <Link href="/api-testing" className="hero-door-chip">
                    <span className="door-chip-dot door-terracotta" />
                    <span>API Testing</span>
                  </Link>
                </div>
              </div>
            </div>
          </details>
        </div>
        <LiquidReveal
          baseSrc="/images/hero-figure-cream.webp"
          colorSrc="/images/hero-figure-color.webp"
          alt="Shashank Shinde · Software Test Engineer"
          onOpenCard={onOpenCard}
        />
      </div>

      {/* HERO BOTTOM STATUS BAR */}
      <div className="hero-bottom-bar">
        <span>AVAILABLE FOR WORK</span>
        <span>PUNE, MAHARASHTRA, INDIA</span>
        <button type="button" className="hero-bottom-scroll-trigger" onClick={scrollToDoors}>
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={13} />
        </button>
      </div>
    </section>
  );
}
