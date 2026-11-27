import Link from "next/link";
import { pageMetadata } from "@/web/seo/site";
import SpecialtyLayout from "@/web/components/SpecialtyLayout/SpecialtyLayout";
import ProjectHoverPreviewList from "@/web/components/ProjectHoverPreviewList/ProjectHoverPreviewList";
import { CheckCircle2, ShieldCheck, KeyRound, Network, RefreshCw, FileCode } from "lucide-react";

const path = "/api-testing";
export const metadata = pageMetadata(path);

export default function ApiTestingPage() {
  return (
    <SpecialtyLayout
      path={path}
      disciplineNumber="02"
      tag="DISCIPLINE 02 · API & CONTRACT TESTING"
      title="REST API and Contract Testing"
      subtitle="Postman Collections, REST Assured Frameworks, HMAC-SHA256 Signatures & JSON Schema Guardrails"
      description={<>I test REST API contracts, authentication, webhook retries, and duplicate requests. See <Link className="underline underline-offset-2" href="/skills/api-testing">API test automation with Postman and REST Assured</Link> for examples of repeatable assertions and schema validation.</>}
      breadcrumbs={[
        { label: "INDEX", href: "/" },
        { label: "DISCIPLINES", href: "/#doors" },
        { label: "API TESTING" },
      ]}
    >
      {/* Metrics Grid */}
      <div className="spec-stats-grid">
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">22</div>
          <div className="spec-stat-label">Microservice Endpoints Automated</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">100%</div>
          <div className="spec-stat-label">JSON Schema Contract Conformance</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">&lt;120ms</div>
          <div className="spec-stat-label">P95 SLA Response Assertion</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">0</div>
          <div className="spec-stat-label">Webhook Duplicate Charges Slipped</div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">I.</span>
            <h2 className="spec-section-title">Backend Validation Methodology</h2>
          </div>
          <span className="spec-card-eyebrow">API ARCHITECTURE</span>
        </div>
        <p className="spec-section-desc">
          APIs outlive individual UI interfaces. Validating endpoints requires testing beyond happy-path 200 OKs:
          negative status codes, boundary payloads, malformed JSON structures, and security authorization boundaries.
        </p>

        <div className="spec-grid-3">
          <div className="spec-card">
            <ShieldCheck className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">CONTRACT INTEGRITY</span>
            <h3 className="spec-card-title">JSON Schema Validation</h3>
            <p className="spec-card-desc">
              Every automated request asserts against strict JSON schema definitions. Breaking field deprecations, nullability shifts, or unexpected type changes are trapped immediately in CI.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Draft-07</span>
              <span className="spec-tag">OpenAPI 3.0</span>
              <span className="spec-tag">Type Safety</span>
            </div>
          </div>

          <div className="spec-card">
            <RefreshCw className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">FINANCIAL SAFETY</span>
            <h3 className="spec-card-title">Idempotency & Replays</h3>
            <p className="spec-card-desc">
              Verifying that repeated calls with identical `Idempotency-Key` headers never duplicate transactions or double-charge debit accounts during network timeout retries.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">UUID v4</span>
              <span className="spec-tag">Redis Mutex</span>
              <span className="spec-tag">Double Submit</span>
            </div>
          </div>

          <div className="spec-card">
            <KeyRound className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">SECURITY BOUNDARIES</span>
            <h3 className="spec-card-title">Auth & Tenant Isolation</h3>
            <p className="spec-card-desc">
              Automating BOLA/IDOR (Broken Object Level Authorization) test sweeps: verifying User A cannot access or mutate User B&apos;s trip logs by forging GUID URL parameters.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">OAuth 2.0</span>
              <span className="spec-tag">JWT Expiry</span>
              <span className="spec-tag">IDOR Prevention</span>
            </div>
          </div>
        </div>
      </section>

      {/* Production Case Study */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">II.</span>
            <h2 className="spec-section-title">Verified Case Study: Ride Sharing Microservices</h2>
          </div>
          <span className="spec-badge-resolved">PRODUCTION VERIFIED</span>
        </div>

        <div className="spec-case-study">
          <div className="spec-case-header">
            <div>
              <span className="spec-card-eyebrow">DISTRIBUTED MOBILITY SYSTEM</span>
              <h3 className="spec-case-title">22 High-Throughput REST Endpoints Automated</h3>
            </div>
            <span className="spec-badge-severe">CRITICAL FLAW PREVENTED</span>
          </div>

          <p className="spec-card-desc" style={{ marginBottom: "1.5rem" }}>
            The Ride Sharing platform handled live driver dispatching, dynamic surge pricing calculations, and webhook notifications from external payment gateways. During peak hours, race conditions in booking acceptance caused phantom rides and payment callback discrepancies.
          </p>

          <div className="spec-grid-2">
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Engineering Intervention</h4>
              <ul className="spec-card-list">
                <li>
                  <span className="spec-bullet">›</span>
                  Authored comprehensive Postman collection with dynamic pre-request scripts generating HMAC-SHA256 signatures for payment webhooks.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Built a REST Assured Java framework with automatic token refresh hooks and response time assertion interceptors.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Executed concurrent request stress injections targeting driver lock endpoints to uncover distributed lock leaks.
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Measurable Impact</h4>
              <ul className="spec-card-list">
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Uncovered and patched a <strong>race condition allowing duplicate booking accepts</strong> under 50ms latency windows.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Prevented payment callback replay vulnerabilities via cryptographic signature validation.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Integrated Newman CLI runner into GitHub Actions to block breaking API changes prior to staging merge.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Code Architecture Sample */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">III.</span>
            <h2 className="spec-section-title">Production Code Pattern</h2>
          </div>
          <span className="spec-card-eyebrow">REST ASSURED ASSERTIONS</span>
        </div>

        <div className="spec-code-block">
          <div className="spec-code-header">
            <span className="spec-code-lang">Java · REST Assured</span>
            <span>RideBookingContractTest.java</span>
          </div>
          <pre className="spec-code-body">
{`package com.profcyma.qa.tests.api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.module.jsv.JsonSchemaValidator;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import static org.hamcrest.Matchers.*;

public class RideBookingContractTest extends BaseApiTest {

    @BeforeClass
    public void setupConfig() {
        RestAssured.baseURI = "https://api.mobility-cluster.internal/v2";
    }

    @Test(description = "Assert dynamic surge rate calculation and JSON Schema adherence")
    public void testRideDispatchContractAndIdempotency() {
        String idempotencyKey = java.util.UUID.randomUUID().toString();

        RestAssured.given()
            .header("Authorization", "Bearer " + getValidRiderToken())
            .header("Idempotency-Key", idempotencyKey)
            .header("X-Client-Version", "3.4.1")
            .contentType(ContentType.JSON)
            .body(buildBookingPayload(37.7749, -122.4194, 37.7891, -122.4014))
        .when()
            .post("/rides/dispatch")
        .then()
            .statusCode(201)
            .time(lessThan(180L), java.util.concurrent.TimeUnit.MILLISECONDS)
            .body(JsonSchemaValidator.matchesJsonSchemaInClasspath("schemas/ride-dispatch-response.json"))
            .body("status", equalTo("DRIVER_MATCHING"))
            .body("estimatedFare.currency", equalTo("INR"))
            .body("estimatedFare.baseAmount", greaterThan(0.0f))
            .body("estimatedFare.surgeMultiplier", greaterThanOrEqualTo(1.0f));
    }
}`}
          </pre>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">IV.</span>
            <h2 className="spec-section-title">API Testing Toolchain</h2>
          </div>
          <span className="spec-card-eyebrow">PROTOCOLS & TOOLS</span>
        </div>

        <div className="spec-grid-3">
          <div className="spec-card">
            <Network size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Automation Frameworks</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> REST Assured (Java)</li>
              <li><span className="spec-bullet">›</span> Postman & Newman CLI</li>
              <li><span className="spec-bullet">›</span> Playwright APIRequestContext (TS)</li>
              <li><span className="spec-bullet">›</span> cURL & HTTPie diagnostic scripts</li>
            </ul>
          </div>

          <div className="spec-card">
            <FileCode size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Specification & Schemas</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> JSON Schema (Draft 04/07/2020-12)</li>
              <li><span className="spec-bullet">›</span> Swagger / OpenAPI Spec 3.0</li>
              <li><span className="spec-bullet">›</span> GraphQL queries & mutations</li>
              <li><span className="spec-bullet">›</span> XML / SOAP WSDL validations</li>
            </ul>
          </div>

          <div className="spec-card">
            <KeyRound size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Security & Mocking</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> WireMock & Postman Mock Servers</li>
              <li><span className="spec-bullet">›</span> OAuth 2.0 PKCE & Bearer Tokens</li>
              <li><span className="spec-bullet">›</span> HMAC-SHA256 Webhook Signatures</li>
              <li><span className="spec-bullet">›</span> OWASP API Security Top 10 Audits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Project Media Previews */}
      <ProjectHoverPreviewList
        title="API Contract & Microservice Projects"
        items={[
          {
            id: "api-proj-1",
            num: "01",
            name: "Ride Sharing Mobility Microservices",
            domain: "DISPATCH & PRICING APIS",
            metric: "22 Endpoints Verified",
            href: "/projects/ride-sharing-testing-case-study",
            imageSrc: "/images/projects/ridesharing-preview.svg",
            caption: "HMAC-SHA256 & Schema Gates",
          },
          {
            id: "api-proj-2",
            num: "02",
            name: "Razorpay Webhook Financial Pipeline",
            domain: "PAYMENT RECONCILIATION",
            metric: "0 Duplicate Debits",
            href: "/projects/driwe-qa-case-study",
            imageSrc: "/images/projects/driwe-preview.svg",
            caption: "Idempotency-Key Mutex",
          },
          {
            id: "api-proj-3",
            num: "03",
            name: "WireMock Contract Gate & Gateway Mocks",
            domain: "E-COMMERCE CATALOG & WIREMOCK",
            metric: "Sub-120ms P95 SLA",
            href: "/projects/grosido-qa-case-study",
            imageSrc: "/images/projects/microservices-preview.svg",
            caption: "REST Assured & WireMock Stubs",
          },
        ]}
      />
    </SpecialtyLayout>
  );
}

