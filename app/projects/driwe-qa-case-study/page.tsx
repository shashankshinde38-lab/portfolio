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
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Application Type</h3>
            <p className="text-white font-semibold mb-1">On-Demand Mobility &amp; Logistics</p>
            <p className="text-xs text-slate-300">Android Customer App, Android Driver App, Cloud Dispatch Engine.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">QA Role &amp; Client</h3>
            <p className="text-white font-semibold mb-1">QA Engineer · Profcyma Solutions</p>
            <p className="text-xs text-slate-300">Full STLC test planning, load simulation, defect tracking in JIRA.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Tools &amp; Stack</h3>
            <p className="text-white font-semibold mb-1">JMeter · Postman · JIRA · SQL</p>
            <p className="text-xs text-slate-300">Distributed thread groups, REST APIs, Razorpay webhooks, Android emulators.</p>
          </div>
        </div>
      </section>

      {/* Testing Challenge & QA Responsibility */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-indigo-400" aria-hidden="true" />
          Testing Challenge &amp; QA Responsibility
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <h3 className="feature-card-title text-cyan-300 mb-2">The High-Concurrency Challenge</h3>
            <p className="feature-card-desc">
              During surge demand spikes, thousands of riders simultaneously request cabs while hundreds of drivers stream GPS telemetry.
              The primary QA challenge was validating server latency thresholds, preventing database connection pool starvation, and ensuring
              that fast-moving ride status updates never permitted payment calculation anomalies or double-booking.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Shashank&apos;s QA Responsibility</h3>
            <p className="feature-card-desc">
              Led complete quality engineering from test matrix creation to production sign-off. Formulated distributed Apache JMeter
              thread group configurations simulating up to 100,000 concurrent users, designed Postman REST API collection assertions,
              verified Razorpay webhook idempotency, and authored reproducible JIRA defect logs.
            </p>
          </div>
        </div>
      </section>

      {/* Important Workflows Validated */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Activity size={22} className="text-cyan-400" aria-hidden="true" />
          Critical Workflows Validated
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Workflow 01</h3>
            <p className="text-white font-semibold mb-1">Driver Trip Dispatch &amp; Handshake</p>
            <p className="text-xs text-slate-300">
              Validated real-time geofence matching, driver broadcast notifications, trip accept timeouts, and automatic reroute handshakes
              across simultaneous dispatch threads.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Workflow 02</h3>
            <p className="text-white font-semibold mb-1">Surge Pricing &amp; Promo Computation</p>
            <p className="text-xs text-slate-300">
              Verified dynamic surge multipliers combined with promotional discount coupons, asserting that total fare calculations maintain
              strict non-negative bounds under high-frequency recalculations.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Workflow 03</h3>
            <p className="text-white font-semibold mb-1">Razorpay Webhook &amp; Wallet Settlement</p>
            <p className="text-xs text-slate-300">
              Asserted asynchronous payment status transitions, network disconnect retries, webhook signature verifications, and wallet balance
              adjustments without duplicate credits.
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
              <strong className="text-white">Reproduction:</strong>
              <br />
              1. Rider creates booking request with active ₹100 discount coupon applied.
              <br />
              2. System initiates surge pricing adjustment (+1.5x) while rider rapidly toggles promo codes in mobile client.
              <br />
              3. Dispatch microservice calculates base fare concurrently with coupon subtraction in separate asynchronous database calls.
            </p>
            <p>
              <strong className="text-white">Symptom:</strong> Base fare was recalculated concurrently while discount
              subtractions executed out of order, resulting in negative totals (-₹45). The payment intake treated the
              negative balance as positive cashback, crediting the rider&apos;s platform wallet for taking a ride.
            </p>
            <p>
              <strong className="text-white">Validation &amp; Engineering Fix:</strong> Enforced atomic checkout locks on the booking
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

      {/* First-Hand QA Insights & Lessons Learned */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Zap size={22} className="text-amber-400" aria-hidden="true" />
          First-Hand Lessons Learned &amp; QA Takeaways
        </h2>
        <div className="content-grid-3">
          <div className="insight-card">
            <span className="insight-card-tag">Concurrency Insight</span>
            <h3 className="insight-card-title">Atomic Fare Calculations</h3>
            <p className="insight-card-desc">
              Dynamic surge multipliers and promotional deductions must never execute as detached asynchronous DB writes.
              Enforcing atomic transaction blocks prevents out-of-order balance calculations under concurrency.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Webhook Architecture</span>
            <h3 className="insight-card-title">Strict Idempotency Keys</h3>
            <p className="insight-card-desc">
              Payment gateway callbacks must be deduplicated using unique event IDs. When network lags trigger gateway retries,
              the system must return HTTP 200 without executing duplicate wallet balance adjustments.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Performance Testing</span>
            <h3 className="insight-card-title">JMeter Concurrency Ramp-Up</h3>
            <p className="insight-card-desc">
              Testing 100,000 virtual users requires balanced ramp-up pacing across distributed master-slave nodes to prevent
              artificial client-side socket starvation from masquerading as backend server latency.
            </p>
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
            <div className="text-2xl font-bold text-white font-mono mb-1">412</div>
            <p className="text-xs text-slate-300">Test Cases Designed &amp; Executed across customer and driver flows.</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-cyan-300 font-mono mb-1">78</div>
            <p className="text-xs text-slate-300">Defects Logged in JIRA (including 14 critical severity defects caught pre-release).</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-emerald-300 font-mono mb-1">100,000</div>
            <p className="text-xs text-slate-300">Concurrent Virtual Users Simulated in JMeter verifying 99.9% uptime SLA.</p>
          </div>
        </div>
      </section>

      {/* Related Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Zap size={22} className="text-cyan-400" aria-hidden="true" />
          Related QA Skills &amp; Knowledge Graph
        </h2>
        <div className="content-grid-3">
          <Link href="/skills/performance-testing" className="feature-glass-card hover:border-emerald-500">
            <h3 className="text-emerald-300 font-semibold mb-1">Apache JMeter Load Testing →</h3>
            <p className="text-xs text-slate-300">Distributed stress simulation, latency thresholds, and server resource monitoring.</p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h3 className="text-violet-300 font-semibold mb-1">REST API Testing →</h3>
            <p className="text-xs text-slate-300">Postman collection runs, Razorpay webhook validation, and status codes.</p>
          </Link>
          <Link href="/skills/mobile-testing" className="feature-glass-card hover:border-sky-500">
            <h3 className="text-sky-300 font-semibold mb-1">Android Mobile Testing →</h3>
            <p className="text-xs text-slate-300">Customer and driver mobile testing across real devices and emulators.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
