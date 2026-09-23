import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CheckCircle2,
  GitBranch,
  Layers,
  Rocket,
  ShieldCheck,
  Terminal,
  Workflow,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/experience";

export const metadata: Metadata = {
  title: "Work Experience | Shashank Shinde — Software Test Engineer",
  description:
    "Explore Shashank Shinde's QA work history at Profcyma Solutions in Pune: STLC test execution, CI/CD gates, automated regression, and release sign-offs.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Work Experience | Shashank Shinde — Software Test Engineer",
    description:
      "Professional software testing work experience, STLC responsibilities, and client project engineering delivered by Shashank Shinde in Pune, India.",
    url: pageUrl,
    type: "profile",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Work Experience — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work Experience | Shashank Shinde — Software Test Engineer",
    description:
      "Professional software testing work experience, STLC responsibilities, and client project engineering delivered by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function ExperiencePage() {
  return (
    <SubpageLayout
      title="Professional QA Work Experience"
      subtitle="Hands-on engineering across production web and mobile platforms. From designing automation suites and validating REST APIs to simulating heavy concurrent loads and managing release sign-offs."
      badge="WORK HISTORY"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work Experience" }]}
      pageUrl={pageUrl}
      description="Professional software testing work experience, STLC responsibilities, and client project engineering delivered by Shashank Shinde in Pune, India."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Professional Experience</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde is currently a Software Test Engineer at Profcyma Solutions Pvt. Ltd. in Pune, Maharashtra,
          India. He is responsible for managing quality across the complete Software Testing Life Cycle (STLC),
          including automated regression framework design (Selenium WebDriver, Playwright), REST API validation
          (Postman), distributed load testing (Apache JMeter), and sprint defect management in JIRA.
        </p>
        <p className="aeo-direct-answer-supporting">
          His testing contributions span 5+ production client ecosystems across on-demand mobility, grocery delivery,
          multi-vendor e-commerce, and real estate lead generation platforms.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;At Profcyma Solutions Pvt. Ltd., Shashank Shinde designs and executes end-to-end automated and manual test
        suites. He integrated automated regression gates into GitHub Actions CI/CD pipelines, cutting manual verification
        overhead by 25% and reducing regression cycle times by ~40%.&rdquo;
      </blockquote>

      {/* Role Deep-Dive Container */}
      <section className="content-section">
        <div className="feature-glass-card border-indigo-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Current Employment</span>
              <h2 className="text-2xl font-bold text-white mt-1">Software Test Engineer</h2>
              <p className="text-sm text-slate-300 font-medium">Profcyma Solutions Pvt. Ltd. · Pune, Maharashtra, India</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                June 2025 — Present · Full-time
              </span>
            </div>
          </div>

          {/* Three Clusters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cluster 01 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm font-semibold">
                <Workflow size={16} aria-hidden="true" />
                <h3 className="text-sm font-semibold text-indigo-400 font-mono">01 · PLAN &amp; BUILD</h3>
              </div>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-white">Modular Automation:</strong> Designed Page Object Model (POM) test
                  frameworks using Selenium WebDriver with Java and TestNG.
                </li>
                <li>
                  <strong className="text-white">CI/CD Quality Gates:</strong> Integrated automated smoke and sanity suites
                  into GitHub Actions pipelines, reducing verification overhead by 25%.
                </li>
                <li>
                  <strong className="text-white">Agile Ceremonies:</strong> Active participant in sprint planning,
                  backlog refinement, and defect triage meetings across 5+ client applications.
                </li>
              </ul>
            </div>

            {/* Cluster 02 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-semibold">
                <CheckCircle2 size={16} aria-hidden="true" />
                <h3 className="text-sm font-semibold text-cyan-400 font-mono">02 · TEST &amp; VALIDATE</h3>
              </div>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-white">Full-Journey Coverage:</strong> Executed functional, UI, regression,
                  smoke, and exploratory test cycles across web apps and Android native apps.
                </li>
                <li>
                  <strong className="text-white">API Contract Testing:</strong> Validated 20+ REST API endpoints in
                  Postman, asserting response schemas, token authentication, and status codes.
                </li>
                <li>
                  <strong className="text-white">Cross-Browser Parity:</strong> Verified UI consistency and responsive
                  rendering across 5 major browser engines and multiple Android viewports.
                </li>
              </ul>
            </div>

            {/* Cluster 03 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-violet-400 font-mono text-sm font-semibold">
                <Rocket size={16} aria-hidden="true" />
                <h3 className="text-sm font-semibold text-violet-400 font-mono">03 · SHIP &amp; VERIFY</h3>
              </div>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-white">Load Resilience:</strong> Conducted distributed load and stress tests
                  using Apache JMeter simulating up to 100k concurrent virtual users.
                </li>
                <li>
                  <strong className="text-white">Defect Lifecycle:</strong> Authored reproducible bug reports in JIRA with
                  assertion snippets, network telemetry, and database states.
                </li>
                <li>
                  <strong className="text-white">Release Sign-off:</strong> Conducted pre-flight release sanity tests and
                  post-deployment smoke checks to safeguard production launches.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Production Systems Tested Links */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-cyan-400" aria-hidden="true" />
          Production Systems Tested During Career
        </h2>
        <div className="content-grid-2">
          <Link href="/projects/driwe-qa-case-study" className="feature-glass-card hover:border-indigo-500">
            <h3 className="feature-card-title text-indigo-300">DRIWE — Cab &amp; Courier Booking Platform →</h3>
            <p className="feature-card-desc">
              100,000-user distributed JMeter load simulation, Razorpay payment webhook validation, and negative fare
              concurrency bug fix.
            </p>
          </Link>

          <Link href="/projects/grosido-qa-case-study" className="feature-glass-card hover:border-emerald-500">
            <h3 className="feature-card-title text-emerald-300">Grosido — Online Grocery Delivery Platform →</h3>
            <p className="feature-card-desc">
              Multi-module cart &amp; checkout synchronization; Selenium WebDriver POM framework cutting regression
              time by ~40%.
            </p>
          </Link>

          <Link href="/projects/ecommerce-testing-case-study" className="feature-glass-card hover:border-cyan-500">
            <h3 className="feature-card-title text-cyan-300">E-Commerce Ecosystem — Marketplace QA →</h3>
            <p className="feature-card-desc">
              Cross-browser checkout testing across 5 browsers; caught and mitigated refund webhook double-deduction
              flaw.
            </p>
          </Link>

          <Link href="/projects/ride-sharing-testing-case-study" className="feature-glass-card hover:border-violet-500">
            <h3 className="feature-card-title text-violet-300">Ride Sharing Application — Geolocation QA →</h3>
            <p className="feature-card-desc">
              22 REST API endpoints tested; uncovered concurrent seat reservation race condition causing 5/4
              over-allocation.
            </p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
