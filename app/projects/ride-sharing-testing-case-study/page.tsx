import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bug,
  CheckCircle2,
  Code2,
  Database,
  Layers,
  MapPin,
  Route,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/projects/ride-sharing-testing-case-study";

export const metadata: Metadata = {
  title: "Ride Sharing Application QA Case Study | Shashank Shinde — Software Test Engineer",
  description:
    "Explore Shashank Shinde's QA case study for an Android Ride Sharing app: 22 REST API endpoints, real-time seat matching, and concurrent over-allocation race condition fix.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Ride Sharing Application QA Case Study | Shashank Shinde",
    description:
      "REST API testing, geospatial coordinate validation, and concurrent seat allocation race condition fix by Shashank Shinde.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ride Sharing QA Case Study — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ride Sharing Application QA Case Study | Shashank Shinde",
    description:
      "REST API testing and concurrent seat reservation race condition mitigation by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function RideSharingCaseStudyPage() {
  return (
    <SubpageLayout
      title="Ride Sharing Application — Geolocation QA Case Study"
      subtitle="Comprehensive functional and API quality testing for an Android ride-sharing platform. Validating real-time route posting, seat allocation algorithms, and 22 RESTful CRUD endpoints."
      badge="CASE STUDY · ON-DEMAND MOBILITY"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Ride Sharing QA Case Study" },
      ]}
      pageUrl={pageUrl}
      description="REST API testing, geospatial coordinate validation, and concurrent seat allocation race condition fix by Shashank Shinde."
    >
      {/* Executive Direct Answer */}
      <section className="aeo-direct-answer-card" aria-label="Executive summary">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Case Study Summary · Ride Sharing Platform</span>
        </div>
        <p className="aeo-direct-answer-text">
          On an Android ride-sharing mobility platform, Shashank Shinde validated the complete trip lifecycle across
          driver route publishing and passenger seat reservation flows. He tested 22 RESTful API endpoints for trip
          creation, geofenced matching, and booking updates using Postman collections.
        </p>
        <p className="aeo-direct-answer-supporting">
          His concurrency testing discovered a critical race condition (RDS-DEF-2024-019) where simultaneous seat requests
          within a 12ms window caused vehicle over-allocation beyond physical capacity (5 passengers confirmed in a 4-seat
          vehicle).
        </p>
      </section>

      {/* Scope Overview */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Route size={22} className="text-cyan-400" aria-hidden="true" />
          Mobility Architecture &amp; Role Scope
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Application Type</h3>
            <p className="text-white font-semibold mb-1">Android Mobile Application</p>
            <p className="text-xs text-slate-300">Real-time driver route publishing and rider seat booking on Android.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">API Testing Scope</h3>
            <p className="text-white font-semibold mb-1">22 REST Endpoints</p>
            <p className="text-xs text-slate-300">Trip CRUD, seat inventory allocation, cancellation, driver telemetry.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Defect Management</h3>
            <p className="text-white font-semibold mb-1">JIRA Lifecycle Tracking</p>
            <p className="text-xs text-slate-300">Authored reproducible steps, network payload logs, and database snapshots.</p>
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
            <h3 className="feature-card-title text-cyan-300 mb-2">The Race Condition Contention Challenge</h3>
            <p className="feature-card-desc">
              When drivers post rides with limited seating capacity, high demand leads to multiple riders attempting to claim
              the final seat within milliseconds of each other. The core QA challenge was proving that simultaneous booking
              bursts could not bypass inventory limits or leave seat counts in an inconsistent state.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Shashank&apos;s QA Responsibility</h3>
            <p className="feature-card-desc">
              Formulated the API testing matrix across 22 REST endpoints using Postman, engineered concurrency burst test scenarios
              to stress transactional isolation, reconciled post-booking SQL database state records, and logged reproducible defect
              reports in JIRA with exact network timing payloads.
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
            <p className="text-white font-semibold mb-1">Driver Route Publishing &amp; Geofencing</p>
            <p className="text-xs text-slate-300">
              Verified driver trip departure times, pickup waypoint geofencing, seat pricing rules, and route activation state transitions.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Workflow 02</h3>
            <p className="text-white font-semibold mb-1">Concurrent Seat Booking Contention</p>
            <p className="text-xs text-slate-300">
              Tested simultaneous rider seat booking requests against limited capacity inventories, verifying atomic inventory decrement and conflict responses.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Workflow 03</h3>
            <p className="text-white font-semibold mb-1">Trip Cancellation &amp; Seat Release</p>
            <p className="text-xs text-slate-300">
              Asserted instant inventory replenishment, waitlist notifications, and automatic fee refund calculations when passengers cancel reservations.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Defect Deep Dive */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Bug size={22} className="text-red-400" aria-hidden="true" />
          Critical Defect Deep-Dive: Concurrent Seat Reservation Race Condition
        </h2>
        <div className="feature-glass-card border-red-500/30">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/20 pb-3 mb-4">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold">REPORT ID: RDS-DEF-2024-019</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Vehicle Over-Allocation Race Condition (5/4 Capacity)</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-red-500/10 text-red-300 border border-red-500/30">
              HIGH SEVERITY · CAPACITY INTEGRITY
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300 mb-4">
            <p>
              <strong className="text-white">Scenario:</strong> A driver posted an active trip with 4 total seats, of
              which 3 were already booked. Two riders simultaneously submitted seat reservations for the final remaining
              seat within a 12-millisecond window.
            </p>
            <p>
              <strong className="text-white">Reproduction:</strong>
              <br />
              1. Driver publishes ride with max physical capacity of 4 seats; 3 seats are booked.
              <br />
              2. Two passenger test clients simultaneously fire POST `/api/v1/trips/:tripId/book` within a 12ms window.
              <br />
              3. Microservice executes non-locking `SELECT available_seats FROM trips` in parallel threads.
            </p>
            <p>
              <strong className="text-white">Symptom:</strong> Both client requests read the available seat count as 1
              before either write transaction committed. Both reservations received HTTP 200 OK confirmations, pushing
              total passenger occupancy to 5 in a physical 4-passenger vehicle.
            </p>
            <p>
              <strong className="text-white">Validation &amp; Engineering Fix:</strong> Enforced database-level pessimistic locking
              (`SELECT FOR UPDATE`) on the seat inventory table during checkout, rejecting conflicting concurrent
              requests with an HTTP 409 Conflict.
            </p>
          </div>

          <div className="code-snippet-panel">
            <div className="code-snippet-header">
              <span>capacity-invariant-assertion.js · Postman API Assertion</span>
              <span>JavaScript</span>
            </div>
            <pre className="code-snippet-body">
{`// Validating seat allocation invariant under high-concurrency requests
pm.test("Vehicle capacity invariant: confirmed passengers <= max physical seats", function () {
    const trip = pm.response.json();
    pm.expect(trip.passengerCount).to.be.at.most(4);
});`}
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
            <span className="insight-card-tag">Concurrency QA</span>
            <h3 className="insight-card-title">Row-Level Database Locking</h3>
            <p className="insight-card-desc">
              Checking available seat counts in application memory (`if (seats &gt; 0)`) always breaks under load.
              Pessimistic row locking (`SELECT FOR UPDATE`) or optimistic versioning is essential to guarantee inventory integrity.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">API Design</span>
            <h3 className="insight-card-title">Semantic HTTP Status Codes</h3>
            <p className="insight-card-desc">
              When a seat is seized by another user during checkout, the API must return HTTP 409 Conflict with an actionable
              explanation, allowing the mobile client to prompt the user to re-select without crashing.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Telemetry QA</span>
            <h3 className="insight-card-title">Token Lifecycle During Long-Polling</h3>
            <p className="insight-card-desc">
              Continuous GPS telemetry streaming requires automated token refresh logic to prevent background location pings
              from dropping silently when JWT sessions expire during active trips.
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
            <div className="text-2xl font-bold text-white font-mono mb-1">180+</div>
            <p className="text-xs text-slate-300">Test Cases Designed across driver trip creation and rider matching.</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-cyan-300 font-mono mb-1">22</div>
            <p className="text-xs text-slate-300">REST API Endpoints validated for request contracts and status codes.</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-emerald-300 font-mono mb-1">64</div>
            <p className="text-xs text-slate-300">Defects Logged in JIRA (including 12 critical concurrency &amp; UI flaws).</p>
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
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h3 className="text-violet-300 font-semibold mb-1">REST API Validation →</h3>
            <p className="text-xs text-slate-300">Postman assertion design, status codes, and schema validation.</p>
          </Link>
          <Link href="/skills/mobile-testing" className="feature-glass-card hover:border-sky-500">
            <h3 className="text-sky-300 font-semibold mb-1">Android Mobile Testing →</h3>
            <p className="text-xs text-slate-300">Real-time driver route matching and touch interaction validation.</p>
          </Link>
          <Link href="/skills/performance-testing" className="feature-glass-card hover:border-emerald-500">
            <h3 className="text-emerald-300 font-semibold mb-1">Apache JMeter Load Testing →</h3>
            <p className="text-xs text-slate-300">Stress testing API endpoints under simulated user concurrency.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
