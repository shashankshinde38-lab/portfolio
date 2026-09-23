import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bug,
  Building2,
  CheckCircle2,
  Code2,
  Database,
  Layers,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/projects/urban-build-testing-case-study";

export const metadata: Metadata = {
  title: "Urban Build Lead Generation QA Case Study | Shashank Shinde — Software Test Engineer",
  description:
    "Explore Shashank Shinde's QA case study for Urban Build: Android lead generation testing, high-latency mobile networks, and rapid multi-tap duplicate lead bug fix.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Urban Build Lead Generation QA Case Study | Shashank Shinde",
    description:
      "Android mobile QA, network latency throttling, and rapid multi-tap duplicate lead generation mitigation by Shashank Shinde.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Urban Build QA Case Study — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Build Lead Generation QA Case Study | Shashank Shinde",
    description:
      "Android mobile QA and rapid multi-tap duplicate lead generation mitigation by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function UrbanBuildCaseStudyPage() {
  return (
    <SubpageLayout
      title="Urban Build — Lead Generation Platform QA Case Study"
      subtitle="Full-cycle quality testing for an Android construction and property lead-generation platform. Validating inquiry submission forms, SMS gateway dispatches, and multi-tap idempotency."
      badge="CASE STUDY · CONSTRUCTION &amp; REAL ESTATE"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Urban Build QA Case Study" },
      ]}
      pageUrl={pageUrl}
      description="Android mobile QA, network latency throttling, and rapid multi-tap duplicate lead generation mitigation by Shashank Shinde."
    >
      {/* Executive Summary */}
      <section className="aeo-direct-answer-card" aria-label="Executive summary">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Case Study Summary · Urban Build Platform</span>
        </div>
        <p className="aeo-direct-answer-text">
          On the Urban Build Android platform, Shashank Shinde validated lead-generation flows connecting customers with
          material suppliers, building contractors, and real estate properties across 4 integrated modules. He verified
          15+ REST API endpoints and performed mobile device testing under simulated high-latency network conditions.
        </p>
        <p className="aeo-direct-answer-supporting">
          His testing diagnosed a rapid multi-tap duplicate lead creation bug (URB-DEF-2024-025) that fired duplicate SMS
          dispatches and corrupted contractor CRM records under slow mobile data connections.
        </p>
      </section>

      {/* Scope Overview */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Building2 size={22} className="text-cyan-400" aria-hidden="true" />
          Platform Architecture &amp; Role Scope
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Application Scope</h3>
            <p className="text-white font-semibold mb-1">4 Integrated Modules</p>
            <p className="text-xs text-slate-300">Materials, Building Experts, Property Listings, and Contractor CRM.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Testing Conditions</h3>
            <p className="text-white font-semibold mb-1">Network Throttling QA</p>
            <p className="text-xs text-slate-300">Simulating 3G, fluctuating mobile data, and offline draft persistence.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">API Flows Verified</h3>
            <p className="text-white font-semibold mb-1">15+ REST API Flows</p>
            <p className="text-xs text-slate-300">Authentication, lead inquiry dispatch, SMS notifications, and search filters.</p>
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
            <h3 className="feature-card-title text-cyan-300 mb-2">The High-Latency Mobile Challenge</h3>
            <p className="feature-card-desc">
              Urban Build serves field contractors and property owners frequently operating on volatile 3G networks or transit dead zones.
              The primary testing challenge was preventing duplicate lead entries and repeated outbound SMS charges when impatient users
              repeatedly tapped submission buttons while waiting for network responses.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Shashank&apos;s QA Responsibility</h3>
            <p className="feature-card-desc">
              Engineered mobile testing suites across Android emulators and physical devices using Appium, simulated fluctuating network
              profiles with packet latency injectors, asserted backend lead payload deduplication, and verified outbound SMS notification gateway integrations.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Workflows Validated */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Activity size={22} className="text-cyan-400" aria-hidden="true" />
          Critical Workflows Validated
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Workflow 01</h3>
            <p className="text-white font-semibold mb-1">Multi-Step Lead Quotation Capture</p>
            <p className="text-xs text-slate-300">
              Validated material volume calculators, budget range selectors, location geocoding, and multi-step inquiry validation rules.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Workflow 02</h3>
            <p className="text-white font-semibold mb-1">Network Throttling &amp; Offline Drafts</p>
            <p className="text-xs text-slate-300">
              Simulated sudden 3G drops and complete signal loss during form submission, verifying that partial inquiries persist locally in SQLite storage.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Workflow 03</h3>
            <p className="text-white font-semibold mb-1">SMS Dispatch &amp; Contractor CRM Ingestion</p>
            <p className="text-xs text-slate-300">
              Asserted external SMS gateway notification delivery, rate limiting, and real-time CRM record propagation without duplicates.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Defect Deep Dive */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Bug size={22} className="text-red-400" aria-hidden="true" />
          Critical Defect Deep-Dive: Rapid Multi-Tap Duplicate Lead Generation
        </h2>
        <div className="feature-glass-card border-red-500/30">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/20 pb-3 mb-4">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold">REPORT ID: URB-DEF-2024-025</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Rapid Multi-Tap Duplicate Lead Creation</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-red-500/10 text-red-300 border border-red-500/30">
              MEDIUM SEVERITY · DATA INTEGRITY
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300 mb-4">
            <p>
              <strong className="text-white">Scenario:</strong> Users operating on high-latency mobile networks
              repeatedly tapped the &ldquo;Submit Enquiry&rdquo; button while waiting for the submission spinner to appear.
            </p>
            <p>
              <strong className="text-white">Reproduction:</strong>
              <br />
              1. Throttle mobile device network profile to 3G (750ms round-trip latency).
              <br />
              2. Complete construction material lead form with contractor quote inquiry.
              <br />
              3. Rapidly tap &ldquo;Submit Enquiry&rdquo; button 4 times within 400 milliseconds.
            </p>
            <p>
              <strong className="text-white">Symptom:</strong> Because the client button remained interactive during the
              initial request handshake, 3 to 5 duplicate lead entries were persisted in the database. Each duplicate
              entry triggered an outbound SMS notification via the SMS gateway and flooded contractor CRMs with identical
              inquiries.
            </p>
            <p>
              <strong className="text-white">Validation &amp; Engineering Fix:</strong> Implemented immediate client-side button debouncing
              with a disabled state on first touch, coupled with a backend SHA-256 fingerprint idempotency check on
              incoming inquiry payloads within a 30-second deduplication window.
            </p>
          </div>

          <div className="code-snippet-panel">
            <div className="code-snippet-header">
              <span>lead-deduplication-assertion.js · Debounce Verification</span>
              <span>JavaScript</span>
            </div>
            <pre className="code-snippet-body">
{`// Validating client-side button state and single lead persistence
expect(submitBtn.getAttribute('disabled')).toBe('true');
expect(await getLeadCountByFingerprint(userToken, formPayloadHash)).toBe(1);
expect(await getDispatchedSmsCount(inquiryId)).toBe(1);`}
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
            <span className="insight-card-tag">Mobile UX QA</span>
            <h3 className="insight-card-title">Instant Touch Debouncing</h3>
            <p className="insight-card-desc">
              Never wait for server acknowledgment to disable interaction. Mobile submission buttons must freeze on initial touch
              and display an immediate spinner to prevent duplicate dispatches.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Architecture</span>
            <h3 className="insight-card-title">Fingerprint Deduplication</h3>
            <p className="insight-card-desc">
              Pairing client-side debouncing with a backend SHA-256 fingerprint deduplication window provides defense-in-depth against
              retransmitted TCP packets and third-party webhook duplicates.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Network Testing</span>
            <h3 className="insight-card-title">Volatile Connection Profiles</h3>
            <p className="insight-card-desc">
              Automated testing on pristine Wi-Fi masks critical real-world failure modes. Injecting latency, packet loss, and offline transitions
              is essential for mobile lead capture workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Outcomes */}
      <section className="content-section">
        <h2 className="content-section-title">
          <ShieldCheck size={22} className="text-emerald-400" aria-hidden="true" />
          Verified Outcomes &amp; Metrics
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-white font-mono mb-1">310</div>
            <p className="text-xs text-slate-300">Test Cases Designed across materials, property, and contractor forms.</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-cyan-300 font-mono mb-1">15+</div>
            <p className="text-xs text-slate-300">API Flows Validated for authentication, lead dispatch, and SMS dispatches.</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-emerald-300 font-mono mb-1">48</div>
            <p className="text-xs text-slate-300">Defects Tracked in JIRA across 6+ complete functional test cycles.</p>
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
          <Link href="/skills/mobile-testing" className="feature-glass-card hover:border-sky-500">
            <h3 className="text-sky-300 font-semibold mb-1">Appium &amp; Android Mobile Testing →</h3>
            <p className="text-xs text-slate-300">Mobile gesture testing, network throttling, and rapid multi-tap handling.</p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h3 className="text-violet-300 font-semibold mb-1">REST API Validation →</h3>
            <p className="text-xs text-slate-300">Inquiry submission endpoints, debounce logic, and idempotency checks.</p>
          </Link>
          <Link href="/skills/playwright-automation" className="feature-glass-card hover:border-indigo-500">
            <h3 className="text-indigo-300 font-semibold mb-1">Playwright TS/JS →</h3>
            <p className="text-xs text-slate-300">Network interception, throttling simulation, and API mock assertions.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
