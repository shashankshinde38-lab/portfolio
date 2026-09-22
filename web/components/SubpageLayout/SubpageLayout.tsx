import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Home,
  Mail,
  FileText,
  Github,
  Linkedin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AmbientBackdrop from "@/web/components/AmbientBackdrop/AmbientBackdrop";
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
  // Breadcrumb schema list
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumbs`,
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.label,
      item: crumb.href ? (crumb.href.startsWith("http") ? crumb.href : `${siteUrl}${crumb.href}`) : pageUrl,
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
      {/* Background Volumetric Glows */}
      <AmbientBackdrop />

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

      {/* Top Navigation */}
      <header className="subpage-header">
        <div className="subpage-header-inner">
          <Link href="/" className="subpage-brand" aria-label="Shashank Shinde Homepage">
            <span className="subpage-brand-mark">
              S<span>.</span>
            </span>
            <span className="subpage-brand-name">
              shashank<span className="subpage-brand-last"> shinde</span>
              <span className="subpage-brand-period">.</span>
            </span>
          </Link>

          <nav className="subpage-nav-links" aria-label="Secondary navigation">
            <Link href="/" className="subpage-nav-link">
              Home
            </Link>
            <Link href="/about" className="subpage-nav-link">
              About
            </Link>
            <Link href="/experience" className="subpage-nav-link">
              Experience
            </Link>
            <Link href="/skills" className="subpage-nav-link">
              Skills
            </Link>
            <Link href="/projects" className="subpage-nav-link">
              Projects
            </Link>
            <Link href="/#contact" className="subpage-nav-link subpage-contact-pill">
              <Mail size={13} aria-hidden="true" />
              <span>Contact</span>
            </Link>
          </nav>

          <div className="subpage-social-actions">
            <a
              href="https://github.com/shashankshinde38-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="subpage-icon-btn"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/shashank-shinde7/"
              target="_blank"
              rel="noopener noreferrer"
              className="subpage-icon-btn"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin size={15} />
            </a>
          </div>
        </div>
      </header>

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

        {/* Page Hero Header */}
        <section className="subpage-hero">
          <div className="subpage-kicker">
            <Sparkles size={14} className="subpage-kicker-icon" aria-hidden="true" />
            <span>{badge}</span>
          </div>

          <h1 className="subpage-title">{title}</h1>
          {subtitle && <p className="subpage-subtitle">{subtitle}</p>}
        </section>

        {/* Children Slots */}
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
              <Link href="/#contact" className="btn-primary btn-3d-glow">
                <span>Get in Touch</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="/files/Shashank_Shinde_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FileText size={15} aria-hidden="true" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Subpage Footer */}
      <footer className="subpage-footer">
        <div className="subpage-footer-inner">
          <div className="subpage-footer-brand">
            <Link href="/" className="brand">
              <span className="brand-mark">
                s<span>.</span>
              </span>
              <span>
                shashank shinde<span className="brand-period">.</span>
              </span>
            </Link>
            <p>Thoughtful testing. Resilient software. Continuous release confidence.</p>
          </div>

          <div className="subpage-footer-links">
            <div className="subpage-footer-col">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <Link href="/">Home Overview</Link>
                </li>
                <li>
                  <Link href="/about">About Shashank</Link>
                </li>
                <li>
                  <Link href="/experience">Work Experience</Link>
                </li>
                <li>
                  <Link href="/skills">All QA Skills</Link>
                </li>
                <li>
                  <Link href="/projects">Case Studies</Link>
                </li>
              </ul>
            </div>

            <div className="subpage-footer-col">
              <h4>Skill Deep-Dives</h4>
              <ul>
                <li>
                  <Link href="/skills/selenium-automation">Selenium WebDriver</Link>
                </li>
                <li>
                  <Link href="/skills/playwright-automation">Playwright TS/JS</Link>
                </li>
                <li>
                  <Link href="/skills/api-testing">REST API Validation</Link>
                </li>
                <li>
                  <Link href="/skills/performance-testing">JMeter Performance</Link>
                </li>
                <li>
                  <Link href="/skills/mobile-testing">Appium Mobile Testing</Link>
                </li>
              </ul>
            </div>

            <div className="subpage-footer-col">
              <h4>QA Case Studies</h4>
              <ul>
                <li>
                  <Link href="/projects/driwe-qa-case-study">DRIWE Mobility Platform</Link>
                </li>
                <li>
                  <Link href="/projects/grosido-qa-case-study">Grosido Grocery Platform</Link>
                </li>
                <li>
                  <Link href="/projects/ecommerce-testing-case-study">E-Commerce Marketplace</Link>
                </li>
                <li>
                  <Link href="/projects/ride-sharing-testing-case-study">Ride Sharing Concurrency</Link>
                </li>
                <li>
                  <Link href="/projects/urban-build-testing-case-study">Urban Build Mobile Lead Gen</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="subpage-footer-bottom">
          <p>
            Written &amp; maintained by <strong>Shashank Shinde</strong> · Software Test Engineer &amp; QA Automation Engineer — Pune, Maharashtra, India.
          </p>
          <div className="subpage-footer-bottom-links">
            <Link href="/#faq">FAQ &amp; Insights</Link>
            <span className="sep">•</span>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
