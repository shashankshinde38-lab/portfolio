import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bug,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  MapPin,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/projects/driwe-qa-case-study";

export const metadata: Metadata = {
  title: "DRIWE Cab & Courier QA Case Study | Shashank Shinde — Software Test Engineer",
  description:
    "Explore Shashank Shinde's QA case study for DRIWE: 100k-user distributed Apache JMeter load testing, Razorpay webhook validation, and negative fare race condition fix.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "DRIWE Cab & Courier QA Case Study | Shashank Shinde",
    description:
      "Full-cycle QA case study: 100k JMeter load simulation, Razorpay webhook verification, and negative fare race condition mitigation by Shashank Shinde.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "DRIWE QA Case Study — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRIWE Cab & Courier QA Case Study | Shashank Shinde",
    description:
      "Full-cycle QA case study: 100k JMeter load simulation and negative fare race condition mitigation by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function DriweCaseStudyPage() {
  return (
    <SubpageLayout
      title="DRIWE — Cab & Courier Booking Platform QA Case Study"
      subtitle="End-to-end quality assurance, distributed load testing under 100,000 simulated virtual users, Razorpay payment webhook validation, and race condition mitigation on a high-concurrency mobility ecosystem."
      badge="CASE STUDY · MOBILITY & LOGISTICS"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "DRIWE QA Case Study" },
      ]}
      pageUrl={pageUrl}
      description="Full-cycle QA case study: 100k JMeter load simulation, Razorpay webhook verification, and negative fare race condition mitigation by Shashank Shinde."
    >
      {/* Executive Direct Answer Summary */}
      <section className="aeo-direct-answer-card" aria-label="Executive summary">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Case Study Summary · DRIWE Platform</span>
        </div>
        <p className="aeo-direct-answer-text">
          On the DRIWE mobility and parcel logistics ecosystem, Shashank Shinde led full-cycle quality engineering across
          the Customer and Driver Android applications. He engineered distributed Apache JMeter thread groups simulating
          100,000 peak concurrent virtual users to assert server latency, database pool stability, and Razorpay webhook
          idempotency.
        </p>
        <p className="aeo-direct-answer-supporting">
          His testing uncovered a critical negative fare race condition (DRW-DEF-2024-014) where rapid promo code
          re-application during surge demand produced negative ride totals (-₹45), mistakenly crediting rider wallets.
        </p>
      </section>

      {/* Project Overview Grid */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Layers size={22} className="text-cyan-400" aria-hidden="true" />
          Project Architecture &amp; Role Overview
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Application Type</h4>
            <p className="text-white font-semibold mb-1">On-Demand Mobility &amp; Logistics</p>
            <p className="text-xs text-slate-300">Android Customer App, Android Driver App, Cloud Dispatch Engine.</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">QA Role &amp; Client</h4>
            <p className="text-white font-semibold mb-1">QA Engineer · Profcyma Solutions</p>
            <p className="text-xs text-slate-300">Full STLC test planning, load simulation, defect tracking in JIRA.</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Tools &amp; Stack</h4>
            <p className="text-white font-semibold mb-1">JMeter · Postman · JIRA · SQL</p>
            <p className="text-xs text-slate-300">Distributed thread groups, REST APIs, Razorpay webhooks, Android emulators.</p>
          </div>
        </div>
      </section>

      {/* Testing Scope & Strategy */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-indigo-400" aria-hidden="true" />
          Testing Scope &amp; Strategy
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <h3 className="feature-card-title text-cyan-300 mb-2">High-Concurrency Load Testing</h3>
            <p className="feature-card-desc">
              Configured distributed Apache JMeter master-slave thread groups generating 100,000 concurrent user requests
              against booking endpoints. Monitored database connection pool limits, queue backpressure, and 99th
              percentile response latencies under dynamic surge pricing multipliers.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Payment Gateway &amp; Webhook Reliability</h3>
            <p className="feature-card-desc">
              Validated Razorpay webhook intake endpoints against network drops, delayed callback deliveries, and
              simultaneous retry dispatches, ensuring payment status transitions occurred idempotently without double
              credits or stuck authorizations.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Defect Deep Dive */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Bug size={22} className="text-red-400" aria-hidden="true" />
          Critical Defect Deep-Dive: Negative Fare Race Condition
        </h2>
        <div className="feature-glass-card border-red-500/30">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/20 pb-3 mb-4">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold">REPORT ID: DRW-DEF-2024-014</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Negative Fare Calculation on High Velocity Bookings</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-red-500/10 text-red-300 border border-red-500/30">
              CRITICAL · SEVERITY P0
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300 mb-4">
            <p>
              <strong className="text-white">Scenario:</strong> During peak surge pricing demand, multiple simultaneous
              driver acceptances coincided with rapid client-side promo code re-applications within a 45ms window.
            </p>
            <p>
              <strong className="text-white">Symptom:</strong> Base fare was recalculated concurrently while discount
              subtractions executed out of order, resulting in negative totals (-₹45). The payment intake treated the
              negative balance as positive cashback, crediting the rider&apos;s platform wallet for taking a ride.
            </p>
            <p>
              <strong className="text-white">Engineering Fix:</strong> Enforced atomic checkout locks on the booking
              record, server-side promotional idempotency keys, and explicit non-negative boundary assertions: `Math.max(0,
              baseFare - promoDiscount)`.
            </p>
          </div>

          {/* Reproduction Assertion Snippet */}
          <div className="code-snippet-panel">
            <div className="code-snippet-header">
              <span>pricing-assertion.js · Concurrency Validation</span>
              <span>JavaScript</span>
            </div>
            <pre className="code-snippet-body">
{`// Assertion validating non-negative fare boundary under concurrency
expect(response.body.finalFare).toBeGreaterThanOrEqual(0.00);
expect(dbRiderWallet.isNegative()).toBe(false);
expect(response.status).toBe(200);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Verified Results & Outcomes */}
      <section className="content-section">
        <h2 className="content-section-title">
          <ShieldCheck size={22} className="text-emerald-400" aria-hidden="true" />
          Verified Outcomes &amp; Metrics
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h4 className="text-2xl font-bold text-white font-mono mb-1">412</h4>
            <p className="text-xs text-slate-300">Test Cases Designed &amp; Executed across customer and driver flows.</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-2xl font-bold text-cyan-300 font-mono mb-1">78</h4>
            <p className="text-xs text-slate-300">Defects Logged in JIRA (including 14 critical severity defects caught pre-release).</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-2xl font-bold text-emerald-300 font-mono mb-1">100,000</h4>
            <p className="text-xs text-slate-300">Concurrent Virtual Users Simulated in JMeter verifying 99.9% uptime SLA.</p>
          </div>
        </div>
      </section>

      {/* Related Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Zap size={22} className="text-cyan-400" aria-hidden="true" />
          Related QA Skills
        </h2>
        <div className="content-grid-3">
          <Link href="/skills/performance-testing" className="feature-glass-card hover:border-emerald-500">
            <h4 className="text-emerald-300 font-semibold mb-1">Apache JMeter Load Testing →</h4>
            <p className="text-xs text-slate-300">Distributed stress simulation, latency thresholds, and server resource monitoring.</p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h4 className="text-violet-300 font-semibold mb-1">REST API Testing →</h4>
            <p className="text-xs text-slate-300">Postman collection runs, Razorpay webhook validation, and status codes.</p>
          </Link>
          <Link href="/skills/mobile-testing" className="feature-glass-card hover:border-sky-500">
            <h4 className="text-sky-300 font-semibold mb-1">Android Mobile Testing →</h4>
            <p className="text-xs text-slate-300">Customer and driver mobile testing across real devices and emulators.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
