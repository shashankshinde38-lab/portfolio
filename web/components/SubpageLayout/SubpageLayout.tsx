"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ChevronRight,
  Home,
  FileText,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";
import AbilityCard3D from "@/web/components/AbilityCard3D/AbilityCard3D";
import "./SubpageLayout.css";

const siteUrl = "https://shashankportfolio-jet.vercel.app";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SubpageLayoutProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs: BreadcrumbItem[];
  pageUrl: string;
  description: string;
  children: ReactNode;
}

export default function SubpageLayout({
  title,
  subtitle,
  badge = "QA ENGINEERING",
  breadcrumbs,
  pageUrl,
  description,
  children,
}: SubpageLayoutProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);

  // Breadcrumb schema list
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumbs`,
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label,
      item: crumb.href
        ? crumb.href.startsWith("http")
          ? crumb.href
          : `${siteUrl}${crumb.href}`
        : pageUrl,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: title,
    description: description,
    inLanguage: "en-US",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#person`,
    },
    author: {
      "@id": `${siteUrl}/#person`,
    },
    creator: {
      "@id": `${siteUrl}/#person`,
    },
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };

  return (
    <div className="subpage-shell">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbListSchema, webPageSchema],
          }),
        }}
      />

      {/* Skip Link */}
      <a href="#subpage-content" className="skip-link">
        Skip to content
      </a>

      {/* Global Fixed Header (Replica of therishithakor.com with live clock, bulb toggle & routing) */}
      <SiteHeader
        onOpenContact={() => setIsContactOpen(true)}
        onOpenCard={() => setIsCardOpen(true)}
      />

      {/* Main Content Area */}
      <main id="subpage-content" className="subpage-main">
        {/* Breadcrumb Navigation Bar */}
        <div className="subpage-breadcrumbs-wrapper">
          <nav aria-label="Breadcrumbs" className="subpage-breadcrumbs">
            <ol className="breadcrumb-list">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={crumb.label} className="breadcrumb-item">
                    {idx === 0 && <Home size={13} className="breadcrumb-home-icon" aria-hidden="true" />}
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href} className="breadcrumb-link">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="breadcrumb-current" aria-current={isLast ? "page" : undefined}>
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && <ChevronRight size={13} className="breadcrumb-sep" aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Page Hero Header (Rishi Thakor Editorial Typography) */}
        <section className="subpage-hero">
          <div className="subpage-kicker">
            <Sparkles size={14} className="subpage-kicker-icon" aria-hidden="true" />
            <span>{badge}</span>
          </div>

          <h1 className="subpage-title">{title}</h1>
          {subtitle && <p className="subpage-subtitle font-serif">{subtitle}</p>}

          <div className="subpage-author-bar">
            <span className="subpage-author-name">
              By <strong>Shashank Shinde</strong>
            </span>
            <span className="subpage-author-sep" aria-hidden="true">
              •
            </span>
            <span className="subpage-author-role">Software Test Engineer &amp; QA Specialist</span>
            <span className="subpage-author-sep" aria-hidden="true">
              •
            </span>
            <span className="subpage-author-location">Pune, Maharashtra, India</span>
          </div>
        </section>

        {/* Case Study Body Content */}
        <div className="subpage-body">{children}</div>

        {/* Recruiter Bottom CTA Banner */}
        <section className="subpage-cta-banner">
          <div className="subpage-cta-content">
            <div className="subpage-cta-header">
              <span className="subpage-cta-badge">
                <ShieldCheck size={14} aria-hidden="true" />
                AVAILABLE FOR QA &amp; SDET ROLES
              </span>
              <h2>Ready to build high-confidence releases?</h2>
              <p>
                Whether you need scalable Selenium or Playwright automation frameworks, Postman REST API contract
                suites, or Apache JMeter 100k-user distributed stress testing, let&apos;s talk.
              </p>
            </div>
            <div className="subpage-cta-actions">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="btn-primary"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
              <a
                href="/files/Shashank_Shinde_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Shashank_Shinde_Resume.pdf"
                className="btn-secondary"
              >
                <FileText size={15} aria-hidden="true" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Global Site Footer */}
      <SiteFooter onOpenContact={() => setIsContactOpen(true)} />

      {/* 5-Step Project Enquiry & Contact Overlay */}
      <MultiStepContactOverlay
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 3D Holographic Ability Card */}
      <AbilityCard3D
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />
    </div>
  );
}
