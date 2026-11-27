import Link from "next/link";
import { pageMetadata } from "@/web/seo/site";
import SpecialtyLayout from "@/web/components/SpecialtyLayout/SpecialtyLayout";
import ProjectHoverPreviewList from "@/web/components/ProjectHoverPreviewList/ProjectHoverPreviewList";
import { CheckCircle2, Search, FileCheck, ClipboardList, ShieldAlert, GitBranch } from "lucide-react";

const path = "/manual-testing";
export const metadata = pageMetadata(path);

export default function ManualTestingPage() {
  return (
    <SpecialtyLayout
      path={path}
      disciplineNumber="05"
      tag="DISCIPLINE 05 · MANUAL, EXPLORATORY & STLC"
      title="Manual QA and Exploratory Testing"
      subtitle="Boundary Value Analysis, Equivalence Partitioning, JIRA Defect Lifecycle & Production Release Gates"
      description={<>I design test cases, investigate defects, and verify fixes across functional and exploratory test cycles. The <Link className="underline underline-offset-2" href="/projects/ecommerce-testing-case-study">e-commerce QA case study</Link> shows how these methods apply to checkout and refunds.</>}
      breadcrumbs={[
        { label: "INDEX", href: "/" },
        { label: "DISCIPLINES", href: "/#doors" },
        { label: "MANUAL & EXPLORATORY TESTING" },
      ]}
    >
      {/* Metrics Grid */}
      <div className="spec-stats-grid">
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">240+</div>
          <div className="spec-stat-label">Production Defects Isolated</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">100%</div>
          <div className="spec-stat-label">Requirement Traceability (RTM)</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">0</div>
          <div className="spec-stat-label">Critical Post-Launch Escapes</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">100+</div>
          <div className="spec-stat-label">Exhaustive Test Suites Authored</div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">I.</span>
            <h2 className="spec-section-title">Cognitive Heuristics & Test Design Techniques</h2>
          </div>
          <span className="spec-card-eyebrow">STLC GOVERNANCE</span>
        </div>
        <p className="spec-section-desc">
          Quality assurance is not passive bug checking. It is the active exploration of failure modes,
          stressing unexpected user behavior patterns, and validating complex business domain rules.
        </p>

        <div className="spec-grid-3">
          <div className="spec-card">
            <Search className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">HEURISTICS</span>
            <h3 className="spec-card-title">Boundary Value & Partitioning</h3>
            <p className="spec-card-desc">
              Systematic stress testing of extrema: min/max limits, zero-values, negative inputs, null bytes, and non-ASCII character injection across form fields and API parameters.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">BVA</span>
              <span className="spec-tag">Equivalence Classes</span>
              <span className="spec-tag">Edge Cases</span>
            </div>
          </div>

          <div className="spec-card">
            <ClipboardList className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">SYSTEMATIC AUDIT</span>
            <h3 className="spec-card-title">Requirement Traceability Matrix</h3>
            <p className="spec-card-desc">
              Mapping every user story and acceptance criterion directly to test scenarios. Ensuring complete functional coverage and zero orphaned specification requirements.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">RTM</span>
              <span className="spec-tag">Acceptance Criteria</span>
              <span className="spec-tag">Coverage Audit</span>
            </div>
          </div>

          <div className="spec-card">
            <ShieldAlert className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">DEFECT ENGINEERING</span>
            <h3 className="spec-card-title">Deterministic Defect Triage</h3>
            <p className="spec-card-desc">
              Logging bugs that developers love: exact minimal reproduction steps, network HAR files, console stack traces, video recordings, and precise expected vs. actual outcomes.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">JIRA</span>
              <span className="spec-tag">Severity vs Priority</span>
              <span className="spec-tag">Root Cause</span>
            </div>
          </div>
        </div>
      </section>

      {/* Production Case Study */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">II.</span>
            <h2 className="spec-section-title">Verified Case Study: E-Commerce Settlement Ledger</h2>
          </div>
          <span className="spec-badge-resolved">PRODUCTION VERIFIED</span>
        </div>

        <div className="spec-case-study">
          <div className="spec-case-header">
            <div>
              <span className="spec-card-eyebrow">FINANCIAL RECONCILIATION ENGINE</span>
              <h3 className="spec-case-title">Catching Silent Floating-Point Rounding Drift in Monthly Payouts</h3>
            </div>
            <span className="spec-badge-severe">SILENT FINANCIAL CORRUPTION</span>
          </div>

          <p className="spec-card-desc" style={{ marginBottom: "1.5rem" }}>
            During exploratory financial reconciliation testing of vendor payouts, Shashank uncovered a subtle penny drift. When aggregating 10,000+ line-item orders with fractional tax rates, IEEE 754 floating-point arithmetic caused a cumulative discrepancy of several thousand rupees between order totals and merchant settlements.
          </p>

          <div className="spec-grid-2">
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Testing Intervention</h4>
              <ul className="spec-card-list">
                <li>
                  <span className="spec-bullet">›</span>
                  Executed precision boundary testing with fractional percentage discount vouchers (e.g. 13.75%).
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Constructed synthetic 5,000-order batch datasets to observe cumulative ledger rounding behaviors.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Flagged defect with complete mathematical proof and recommended migration to BigDecimal / integer-cent representations.
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Measurable Impact</h4>
              <ul className="spec-card-list">
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Eliminated ledger audit discrepancies before quarterly financial filing.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Engineered automated regression guard asserting zero decimal rounding drift across 50,000 transactions.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Saved estimated 40+ engineering hours in manual monthly financial reconciliation disputes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Production Defect Ticket Sample */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">III.</span>
            <h2 className="spec-section-title">Anatomy of a High-Impact Defect Ticket</h2>
          </div>
          <span className="spec-card-eyebrow">JIRA BEST PRACTICE</span>
        </div>

        <div className="spec-code-block">
          <div className="spec-code-header">
            <span className="spec-code-lang">JIRA · DEF-419</span>
            <span>CRITICAL · SEV-1 / PRI-HIGH</span>
          </div>
          <pre className="spec-code-body">
{`ISSUE SUMMARY:
[Cart/Checkout] Double submission during network latency creates duplicate debit authorization

ENVIRONMENT:
- Chrome 128.0.6613 / macOS Sonoma 14.6
- Build: release-v2.18.4 (commit: 91af3b8)
- Network Profile: Slow 3G Emulation (RTT: 400ms, Down: 400kbps)

PRECONDITIONS:
1. User logged in with saved credit card (Token: tok_visa_4242).
2. Cart contains items worth > $100.

STEPS TO REPRODUCE:
1. Navigate to /checkout/review.
2. Throttle network to 'Slow 3G' via DevTools.
3. Click 'Confirm & Pay' button.
4. Immediately click 'Confirm & Pay' a second time within 250ms before loading spinner disables button.

EXPECTED RESULT:
- Button is immediately disabled on first click (pointer-events: none).
- Only 1 POST /api/v2/orders request dispatched. Single debit charge created.

ACTUAL RESULT:
- Button remains clickable for ~380ms before UI transitions.
- 2 identical POST requests dispatched with different request IDs.
- User bank account charged twice for the same order cart.`}
          </pre>
        </div>
      </section>

      {/* Methodology & Tools */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">IV.</span>
            <h2 className="spec-section-title">STLC Tools & Ecosystem</h2>
          </div>
          <span className="spec-card-eyebrow">QUALITY GOVERNANCE</span>
        </div>

        <div className="spec-grid-3">
          <div className="spec-card">
            <ClipboardList size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Test Management</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Atlassian JIRA & Confluence</li>
              <li><span className="spec-bullet">›</span> Zephyr Scale & Xray Test Management</li>
              <li><span className="spec-bullet">›</span> TestRail Enterprise Test Suites</li>
              <li><span className="spec-bullet">›</span> Markdown Git-backed Test Plans</li>
            </ul>
          </div>

          <div className="spec-card">
            <GitBranch size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Agile & Release Gates</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Sprint Planning & Grooming Reviews</li>
              <li><span className="spec-bullet">›</span> Smoke & Sanity Deployment Checklists</li>
              <li><span className="spec-bullet">›</span> Go / No-Go Staging Release Sign-offs</li>
              <li><span className="spec-bullet">›</span> Production Post-Deployment Verification</li>
            </ul>
          </div>

          <div className="spec-card">
            <FileCheck size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Diagnostic Utilities</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Chrome DevTools (Network, Memory, Console)</li>
              <li><span className="spec-bullet">›</span> Charles Proxy & Fiddler HTTP Capture</li>
              <li><span className="spec-bullet">›</span> ScreenToGif & OBS High-Res Capture</li>
              <li><span className="spec-bullet">›</span> SQL query verification (Postgres/MySQL)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Project Media Previews */}
      <ProjectHoverPreviewList
        title="Manual QA, Defect Triage & Exploratory Case Studies"
        items={[
          {
            id: "man-proj-1",
            num: "01",
            name: "Multi-Vendor Marketplace Ledger",
            domain: "SETTLEMENT RECONCILIATION",
            metric: "240+ Defects Found",
            href: "/projects/ecommerce-testing-case-study",
            imageSrc: "/images/projects/ecommerce-preview.svg",
            caption: "Floating-Point Drift Isolation",
          },
          {
            id: "man-proj-2",
            num: "02",
            name: "Grosido Multi-Module Checkout",
            domain: "ONLINE GROCERY DELIVERY",
            metric: "0 Escaped Blocker Bugs",
            href: "/projects/grosido-qa-case-study",
            imageSrc: "/images/projects/grosido-preview.svg",
            caption: "Smoke, Sanity & Regression Gates",
          },
          {
            id: "man-proj-3",
            num: "03",
            name: "Enterprise Requirement Traceability & Defect Triage",
            domain: "STLC & BOUNDARY VALUE AUDIT",
            metric: "100% RTM Coverage",
            href: "/projects/urban-build-testing-case-study",
            imageSrc: "/images/projects/manualtriage-preview.svg",
            caption: "JIRA Triage · Zero Critical Escapades",
          },
        ]}
      />
    </SpecialtyLayout>
  );
}

