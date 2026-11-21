"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Code2, Heart, Scale } from "lucide-react";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";
import AbilityCard3D from "@/web/components/AbilityCard3D/AbilityCard3D";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";
import "./legal.css";

export default function LegalPage() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="legal-page-root">
      {/* Fixed Site Header */}
      <SiteHeader
        onOpenCard={() => setIsCardOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main id="main-content" className="legal-main">
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
              <span className="breadcrumb-current">LEGAL, PRIVACY & CREDITS</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="legal-hero-section">
          <div className="specialty-container">
            <span className="specialty-tag-badge">TERMS & ATTRIBUTIONS</span>
            <h1 className="legal-hero-title font-serif">Legal Notice & Open Source Credits</h1>
            <p className="legal-hero-lead">
              A transparent breakdown of privacy commitments, local session storage usage, and open
              source software licensing powering this portfolio.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="legal-body-section">
          <div className="specialty-container">
            <div className="legal-grid">
              {/* Privacy Principles */}
              <div className="legal-card">
                <div className="legal-card-header">
                  <Shield size={24} className="text-[#A4552C]" />
                  <h2 className="legal-card-title">Zero Tracking & Privacy by Design</h2>
                </div>
                <div className="legal-card-content">
                  <p>
                    This portfolio does not utilize third-party tracking pixels, invasive cookies,
                    or advertising trackers. Any preference data (such as having already viewed the
                    introductory animation or dismissed a modal) is stored in your browser: the
                    theme choice persists in <code>localStorage</code> under <code>theme</code>, and
                    the introductory animation preference uses <code>sessionStorage</code> under{" "}
                    <code>ss_intro_viewed</code>. You can clear these in your browser settings.
                  </p>
                  <p>
                    When you submit an enquiry through the 5-step modal, your input (name, work
                    email, project timeline, and testing scope) is transmitted securely over HTTPS
                    directly to our internal intake API. Information is used exclusively to evaluate
                    engineering engagements and is never shared, marketed, or sold.
                  </p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="legal-card">
                <div className="legal-card-header">
                  <Scale size={24} className="text-[#A4552C]" />
                  <h2 className="legal-card-title">Professional Verification & Case Studies</h2>
                </div>
                <div className="legal-card-content">
                  <p>
                    All testing case studies (including Grosido, DRIWE, Urban Build, and Ride
                    Sharing) describe genuine engineering investigations, defect reproductions, and
                    test framework implementations performed by Shashank Shinde.
                  </p>
                  <p>
                    Proprietary business secrets, internal infrastructure secrets, API keys, and
                    customer PII have been anonymized, redacted, or represented with synthetic
                    datasets to safeguard contractual non-disclosure agreements while demonstrating
                    authentic technical methodology.
                  </p>
                </div>
              </div>

              {/* Open Source Attributions */}
              <div className="legal-card full-width">
                <div className="legal-card-header">
                  <Code2 size={24} className="text-[#A4552C]" />
                  <h2 className="legal-card-title">Open Source Frameworks & Font Attributions</h2>
                </div>
                <div className="legal-card-content">
                  <p>
                    This digital experience is built with modern, accessible web standards and
                    stands on the shoulders of remarkable open-source engineering:
                  </p>
                  <div className="legal-credits-grid">
                    <div className="legal-credit-item">
                      <span className="credit-name">Next.js & React 19</span>
                      <span className="credit-license">MIT License · Vercel Inc.</span>
                      <p className="credit-note">
                        High-performance server rendering, streaming, and edge caching.
                      </p>
                    </div>

                    <div className="legal-credit-item">
                      <span className="credit-name">Three.js (r185)</span>
                      <span className="credit-license">MIT License · Mr.doob & Contributors</span>
                      <p className="credit-note">
                        Real-time WebGL rendering, custom holographic shaders, and 3D card tilt
                        geometry.
                      </p>
                    </div>

                    <div className="legal-credit-item">
                      <span className="credit-name">Onest Typeface</span>
                      <span className="credit-license">
                        SIL Open Font License · Dmitry Rastvortsev
                      </span>
                      <p className="credit-note">
                        Primary user interface typography designed for maximum readability across
                        modern displays.
                      </p>
                    </div>

                    <div className="legal-credit-item">
                      <span className="credit-name">EB Garamond</span>
                      <span className="credit-license">SIL Open Font License · Georg Duffner</span>
                      <p className="credit-note">
                        Classic humanist serif typeface for elegant editorial numbers and decorative
                        headings.
                      </p>
                    </div>

                    <div className="legal-credit-item">
                      <span className="credit-name">Lucide Icons</span>
                      <span className="credit-license">ISC License · Lucide Project</span>
                      <p className="credit-note">
                        Clean, accessible vector iconography for technical interface cues.
                      </p>
                    </div>

                    <div className="legal-credit-item">
                      <span className="credit-name">Framer Motion & Canvas Confetti</span>
                      <span className="credit-license">MIT License</span>
                      <p className="credit-note">
                        Declarative animation primitives and celebration particle physics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Design System Reference Tribute */}
              <div className="legal-card full-width">
                <div className="legal-card-header">
                  <Heart size={24} className="text-[#A4552C]" />
                  <h2 className="legal-card-title">Design System & Architecture Reference</h2>
                </div>
                <div className="legal-card-content">
                  <p>
                    The visual architecture, horizontal door wall interaction paradigm, and 3D
                    ability card layout of this portfolio are inspired by the exceptional creative
                    engineering of Rishi Thakor&apos;s portfolio. Shashank Shinde has faithfully
                    adapted these aesthetic patterns to showcase rigorous Software Test Engineering,
                    defect triage, and automated verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3D Ability Card Modal */}
      <AbilityCard3D isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />

      {/* 5-Step Contact Overlay */}
      <MultiStepContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Site Footer */}
      <SiteFooter onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
