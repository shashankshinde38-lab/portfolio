import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Braces,
  CheckCircle2,
  Database,
  Layers,
  Plug,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/skills/api-testing";

export const metadata: Metadata = {
  title: "REST API Testing & Postman Validation | Shashank Shinde — Software Test Engineer",
  description:
    "Learn about Shashank Shinde's REST API testing experience using Postman and REST Assured. JSON schema validation, webhook idempotency, and status code verification.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "REST API Testing & Postman Validation | Shashank Shinde — Software Test Engineer",
    description:
      "RESTful API test architectures, Postman collections, schema assertions, and webhook idempotency engineering by Shashank Shinde in Pune, India.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "REST API Testing — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REST API Testing & Postman Validation | Shashank Shinde",
    description:
      "RESTful API test architectures, Postman collections, and webhook idempotency engineering by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function ApiTestingPage() {
  return (
    <SubpageLayout
      title="REST API Testing & Postman Validation — Shashank Shinde"
      subtitle="Ensuring API contract integrity, status code resilience, JSON schema conformity, and payment webhook idempotency across multi-service web and mobile architectures."
      badge="API CONTRACT TESTING"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Skills", href: "/skills" },
        { label: "API Testing" },
      ]}
      pageUrl={pageUrl}
      description="RESTful API test architectures, Postman collections, schema assertions, and webhook idempotency engineering by Shashank Shinde in Pune, India."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · API Testing Experience</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde validates RESTful web APIs for payload structure, HTTP response status codes (2xx success, 4xx
          client validation, 5xx server fault handling), JSON Schema conformity, authentication tokens (OAuth 2.0, JWT),
          and webhook idempotency.
        </p>
        <p className="aeo-direct-answer-supporting">
          He authors automated Postman collections with JavaScript test assertions and pre-request scripts, paired with
          SQL database verification queries to ensure backend transactional consistency.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;Shashank Shinde tests RESTful APIs using Postman and REST Assured, asserting contract integrity through
        JSON schema validation, status code boundary tests, and SQL data layer reconciliation. His testing identified
        critical defects including double-deduction flaws in refund webhooks and race conditions in concurrent seat
        reservations.&rdquo;
      </blockquote>

      {/* Core API Testing Methodology */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Plug size={22} className="text-violet-400" aria-hidden="true" />
          API Validation Scope &amp; Methodology
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <h3 className="feature-card-title text-violet-300 mb-2">Schema &amp; Contract Verification</h3>
            <p className="feature-card-desc">
              Asserting that API response bodies conform strictly to predefined JSON schemas (Ajv / tv4 validators),
              guaranteeing required keys, exact data types (integer, string, boolean), regex pattern formats, and null
              safety.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-cyan-300 mb-2">Status Code &amp; Negative Edge Testing</h3>
            <p className="feature-card-desc">
              Testing beyond happy paths: verifying proper HTTP error codes (e.g. 400 Bad Request, 401 Unauthorized,
              403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity) when invalid payloads, expired
              tokens, or duplicate keys are submitted.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Webhook Idempotency &amp; Payment Verification</h3>
            <p className="feature-card-desc">
              Simulating rapid network retries and duplicate webhook receipts (e.g. Razorpay payment receipts, refund
              dispatches) to ensure server-side deduplication prevents duplicate account credits or balance deductions.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-emerald-300 mb-2">Data State Consistency via SQL</h3>
            <p className="feature-card-desc">
              Reconciling API response payloads directly against database records (PostgreSQL, Supabase, MySQL) to
              verify that transactions commit atomically without orphan states or stale cache residues.
            </p>
          </div>
        </div>
      </section>

      {/* Code Snippet */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Braces size={22} className="text-cyan-400" aria-hidden="true" />
          Production Postman Test Assertion Script
        </h2>
        <div className="code-snippet-panel">
          <div className="code-snippet-header">
            <span>TripBookingAssertions.js · Postman JavaScript Tests</span>
            <span>JavaScript</span>
          </div>
          <pre className="code-snippet-body">
{`// Validating Trip Reservation API response & capacity invariants
pm.test("Status code is 200 OK or 409 Conflict under capacity ceiling", function () {
    pm.expect([200, 409]).to.include(pm.response.code);
});

pm.test("Response adheres to TripReservation JSON Schema", function () {
    const schema = {
        type: "object",
        required: ["tripId", "status", "passengerCount", "maxSeats"],
        properties: {
            tripId: { type: "string" },
            status: { type: "string", enum: ["CONFIRMED", "SEAT_UNAVAILABLE"] },
            passengerCount: { type: "integer", minimum: 1 },
            maxSeats: { type: "integer", minimum: 1 }
        }
    };
    pm.response.to.have.jsonSchema(schema);
});

pm.test("Vehicle occupancy invariant: passenger count never exceeds physical capacity", function () {
    const json = pm.response.json();
    pm.expect(json.passengerCount).to.be.at.most(json.maxSeats);
});

pm.test("Webhook signature matches expected cryptographic header", function () {
    pm.response.to.have.header("X-Signature-Sha256");
});`}
          </pre>
        </div>
      </section>

      {/* Project Evidence */}
      <section className="content-section">
        <h2 className="content-section-title">
          <ShieldCheck size={22} className="text-emerald-400" aria-hidden="true" />
          Related Project Evidence
        </h2>
        <div className="content-grid-3">
          <Link href="/projects/ecommerce-testing-case-study" className="feature-glass-card hover:border-cyan-500">
            <h3 className="feature-card-title text-white mb-2">E-Commerce Ecosystem</h3>
            <p className="feature-card-desc">
              Discovered and resolved refund webhook double-deduction flaw across multi-vendor settlement ledgers.
            </p>
          </Link>

          <Link href="/projects/ride-sharing-testing-case-study" className="feature-glass-card hover:border-indigo-500">
            <h3 className="feature-card-title text-white mb-2">Ride Sharing Application</h3>
            <p className="feature-card-desc">
              Validated 22 REST API endpoints; resolved concurrent seat reservation race condition causing 5/4
              over-allocation.
            </p>
          </Link>

          <Link href="/projects/driwe-qa-case-study" className="feature-glass-card hover:border-violet-500">
            <h3 className="feature-card-title text-white mb-2">DRIWE Logistics Platform</h3>
            <p className="feature-card-desc">
              Validated Razorpay webhook retry schedules and server-side promo idempotency keys during surge pricing.
            </p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
