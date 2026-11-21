"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GraduationCap, Award, Briefcase, Target, ShieldCheck } from "lucide-react";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";
import AbilityCard3D from "@/web/components/AbilityCard3D/AbilityCard3D";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";
import "./my-story.css";

export default function MyStoryPage() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="story-page-root">
      {/* Fixed Site Header */}
      <SiteHeader
        onOpenCard={() => setIsCardOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main id="main-content" className="story-main">
        {/* Navigation / Breadcrumb */}
        <div className="specialty-nav-bar">
          <div className="specialty-container specialty-nav-inner">
            <Link href="/" className="specialty-back-btn">
              <ArrowLeft size={15} />
              <span>RETURN HOME</span>
            </Link>
            <nav className="specialty-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">INDEX</Link>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">MY STORY & CAREER</span>
            </nav>
          </div>
        </div>

        {/* Hero Narrative */}
        <section className="story-hero-section">
          <div className="specialty-container">
            <span className="specialty-tag-badge">PROFESSIONAL JOURNEY · SDET</span>
            <h1 className="story-hero-title font-serif">
              Engineering release confidence where failure is not an option.
            </h1>
            <p className="story-hero-lead">
              I am Shashank Shinde, a Software Test Engineer and QA Automation Specialist based in Pune, India.
              My work sits at the intersection of developer intent, architecture stress, and authentic user protection.
            </p>

            <div className="story-hero-stats">
              <div className="story-stat-item">
                <span className="story-stat-num font-serif">240+</span>
                <span className="story-stat-label">Production Defects Prevented</span>
              </div>
              <div className="story-stat-item">
                <span className="story-stat-num font-serif">~40%</span>
                <span className="story-stat-label">Regression Cycle Acceleration</span>
              </div>
              <div className="story-stat-item">
                <span className="story-stat-num font-serif">100k+</span>
                <span className="story-stat-label">Virtual Concurrency Tested</span>
              </div>
            </div>
          </div>
        </section>

        {/* Narrative Chapters */}
        <section className="story-body-section">
          <div className="specialty-container">
            {/* Chapter 1: The Core Philosophy */}
            <article className="story-chapter">
              <div className="story-chapter-aside">
                <span className="story-chapter-num font-serif">01</span>
                <span className="story-chapter-tag">PHILOSOPHY</span>
              </div>
              <div className="story-chapter-content">
                <h2 className="story-chapter-title">Quality is not an afterthought; it is code in itself.</h2>
                <div className="story-prose">
                  <p>
                    Throughout my engineering career, I have observed that most software failures are not caused by simple syntax mistakes. They occur at the seams: where microservices exchange contracts, where network latency disrupts double-click expectations, where database pools starve under unexpected concurrency surges, and where boundary assumptions break silently.
                  </p>
                  <p>
                    Automated tests are not secondary scripts—they are deterministic production software designed to safeguard customer trust. When I build a test suite with Playwright, Selenium, or REST Assured, I architect it with the same rigor, clean design patterns, and zero-sleep policies that guide any world-class microservice.
                  </p>
                </div>
              </div>
            </article>

            {/* Chapter 2: Professional Tenure at Profcyma Solutions */}
            <article className="story-chapter">
              <div className="story-chapter-aside">
                <span className="story-chapter-num font-serif">02</span>
                <span className="story-chapter-tag">WORK EXPERIENCE</span>
              </div>
              <div className="story-chapter-content">
                <h2 className="story-chapter-title">Software Test Engineer · Profcyma Solutions</h2>
                <div className="story-role-meta">
                  <Briefcase size={16} className="text-[#A4552C]" />
                  <span>Pune, India · Full-Time Software Testing & Automation</span>
                </div>
                <div className="story-prose">
                  <p>
                    At Profcyma Solutions, I spearhead end-to-end testing architectures across multiple client-facing production applications, including high-traffic grocery e-commerce, mobility ride-dispatch platforms, and field construction systems.
                  </p>
                  <ul className="story-highlights-list">
                    <li>
                      <ShieldCheck size={18} className="text-[#A4552C] flex-shrink-0" />
                      <span>
                        <strong>Grosido E-Commerce Platform:</strong> Authored 120+ modular Selenium Java TestNG regression scenarios with Apache POI data providers, slashing sprint regression time by ~40%.
                      </span>
                    </li>
                    <li>
                      <ShieldCheck size={18} className="text-[#A4552C] flex-shrink-0" />
                      <span>
                        <strong>DRIWE Mobility Cluster:</strong> Conducted distributed Apache JMeter load tests scaling to 15,000+ concurrent simulated users, uncovering fatal HikariCP connection leaks that caused negative fare balances.
                      </span>
                    </li>
                    <li>
                      <ShieldCheck size={18} className="text-[#A4552C] flex-shrink-0" />
                      <span>
                        <strong>Ride Sharing API Suite:</strong> Built automated REST Assured verification for 22 microservice endpoints, enforcing HMAC-SHA256 webhook signatures and strict JSON Schema validation.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* Chapter 3: SDET Immersion & Academic Foundation */}
            <article className="story-chapter">
              <div className="story-chapter-aside">
                <span className="story-chapter-num font-serif">03</span>
                <span className="story-chapter-tag">EDUCATION & TRAINING</span>
              </div>
              <div className="story-chapter-content">
                <h2 className="story-chapter-title">Rigorous Foundation in Computer Science & SDET</h2>
                <div className="story-prose">
                  <div className="story-edu-card">
                    <Award size={24} className="text-[#A4552C]" />
                    <div>
                      <h3 className="story-edu-title">SEED Infotech Pune · Certified SDET Program</h3>
                      <p className="story-edu-desc">
                        Intensive certification in Software Development Engineer in Test (SDET). Deep mastery of Java OOP, Page Object Model design patterns, Selenium WebDriver 4, TestNG, Postman API collections, and Maven build pipelines.
                      </p>
                    </div>
                  </div>

                  <div className="story-edu-card">
                    <GraduationCap size={24} className="text-[#A4552C]" />
                    <div>
                      <h3 className="story-edu-title">University of Pune · Bachelor&apos;s Degree</h3>
                      <p className="story-edu-desc">
                        Core grounding in operating systems, computer networking, relational database design (PostgreSQL/MySQL), algorithm analysis, and discrete mathematics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Interactive Callout */}
            <div className="story-cta-box">
              <div>
                <h3 className="story-cta-title">Explore My Interactive 3D Ability Card</h3>
                <p className="story-cta-desc">
                  Inspect my complete toolchain, verified metrics, and SDET credentials rendered on a Three.js holographic WebGL card.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="specialty-cta-primary"
                  onClick={() => setIsCardOpen(true)}
                >
                  <span>LAUNCH 3D CARD</span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  type="button"
                  className="story-cta-secondary"
                  onClick={() => setIsContactOpen(true)}
                >
                  <span>START A CONVERSATION</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3D Ability Card Modal */}
      <AbilityCard3D
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

      {/* 5-Step Contact Overlay */}
      <MultiStepContactOverlay
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Site Footer */}
      <SiteFooter onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}

