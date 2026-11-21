import { pageMetadata } from "@/web/seo/site";
import SpecialtyLayout from "@/web/components/SpecialtyLayout/SpecialtyLayout";
import ProjectHoverPreviewList from "@/web/components/ProjectHoverPreviewList/ProjectHoverPreviewList";
import { CheckCircle2, ShieldCheck, Zap, Layers, Terminal, Sparkles } from "lucide-react";

export const metadata = pageMetadata("/automation-testing");

export default function AutomationTestingPage() {
  return (
    <SpecialtyLayout
      disciplineNumber="01"
      tag="DISCIPLINE 01 · AUTOMATION TESTING"
      title="Deterministic Test Automation Engineering"
      subtitle="Page Object Model, Playwright & Selenium Architectures with ~40% Regression Reductions"
      description="Designing resilient, non-flaky automated test frameworks across complex web applications. Leveraging custom fixtures, intelligent auto-waiting locators, and parallel cloud grid execution to deliver fast, deterministic CI/CD release confidence."
      breadcrumbs={[
        { label: "INDEX", href: "/" },
        { label: "DISCIPLINES", href: "/#doors" },
        { label: "AUTOMATION TESTING" },
      ]}
    >
      {/* Metrics Grid */}
      <div className="spec-stats-grid">
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">~40%</div>
          <div className="spec-stat-label">Regression Cycle Reduction</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">120+</div>
          <div className="spec-stat-label">Automated E2E Scenarios</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">99.4%</div>
          <div className="spec-stat-label">Test Suite Determinism</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">3x</div>
          <div className="spec-stat-label">Parallel Execution Speedup</div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">I.</span>
            <h2 className="spec-section-title">Framework Architecture & Philosophy</h2>
          </div>
          <span className="spec-card-eyebrow">DESIGN PRINCIPLES</span>
        </div>
        <p className="spec-section-desc">
          Automated tests should run like reliable production code. Flaky tests erode team trust.
          My frameworks enforce strict auto-waiting mechanisms, explicit assertions, and zero arbitrary sleep calls.
        </p>

        <div className="spec-grid-3">
          <div className="spec-card">
            <Layers className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">MODULARITY</span>
            <h3 className="spec-card-title">Page Object Model (POM)</h3>
            <p className="spec-card-desc">
              Decoupling UI locators from test logic. When DOM structures evolve, only single-page selector repositories require maintenance, preventing cascading suite failures.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Reusability</span>
              <span className="spec-tag">Single Responsibility</span>
              <span className="spec-tag">Clean Code</span>
            </div>
          </div>

          <div className="spec-card">
            <Zap className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">SPEED & SCALE</span>
            <h3 className="spec-card-title">Parallel Cloud Execution</h3>
            <p className="spec-card-desc">
              Distributing test shards across parallel worker threads in GitHub Actions and Jenkins. Running 100+ critical path user journeys in under 6 minutes.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">GitHub Actions</span>
              <span className="spec-tag">Docker Grids</span>
              <span className="spec-tag">Headless</span>
            </div>
          </div>

          <div className="spec-card">
            <ShieldCheck className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">RELIABILITY</span>
            <h3 className="spec-card-title">Zero-Sleep Resiliency</h3>
            <p className="spec-card-desc">
              Replacing volatile `Thread.sleep` calls with intelligent polling condition guards, network response interception, and WebSocket connection listeners.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Network Idle</span>
              <span className="spec-tag">DOM Observers</span>
              <span className="spec-tag">Explicit Waits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Production Case Study */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">II.</span>
            <h2 className="spec-section-title">Verified Case Study: Grosido Web Application</h2>
          </div>
          <span className="spec-badge-resolved">PRODUCTION VERIFIED</span>
        </div>

        <div className="spec-case-study">
          <div className="spec-case-header">
            <div>
              <span className="spec-card-eyebrow">ECOMMERCE & GROCERY PLATFORM</span>
              <h3 className="spec-case-title">Automating 120+ Complex Multi-Step Checkout Journeys</h3>
            </div>
            <span className="spec-badge-severe">CRITICAL REGRESSION PREVENTED</span>
          </div>

          <p className="spec-card-desc" style={{ marginBottom: "1.5rem" }}>
            The Grosido web platform suffered from frequent regression defects in cart calculations, promo code application, and delivery time slot scheduling during weekly sprints. Manual regression took over 14 hours per release.
          </p>

          <div className="spec-grid-2">
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Engineering Intervention</h4>
              <ul className="spec-card-list">
                <li>
                  <span className="spec-bullet">›</span>
                  Built a modular Java-Selenium & TestNG framework integrated with Maven and ExtentReports.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Implemented dynamic data providers reading synthetic edge-case product inventories via Apache POI Excel utilities.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Configured headless multi-browser regression matrix (Chrome, Edge, Firefox) in the CI pipeline.
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Measurable Impact</h4>
              <ul className="spec-card-list">
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span><strong>~40% reduction</strong> in total regression cycle turn-around time.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span><strong>Zero critical checkout bugs</strong> slipped into production across 8 consecutive deployment sprints.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Automated HTML dashboards generated with execution video captures and stack trace artifacts.</span>
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
          <span className="spec-card-eyebrow">TYPE-SAFE ASSERTIONS</span>
        </div>

        <div className="spec-code-block">
          <div className="spec-code-header">
            <span className="spec-code-lang">Playwright · TypeScript</span>
            <span>CartCheckoutFixture.spec.ts</span>
          </div>
          <pre className="spec-code-body">
{`import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('E-Commerce Deterministic Checkout Pipeline', () => {
  test('should validate tiered volume discount & inventory lock idempotency', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const checkout = new CheckoutPage(page);

    // 1. Intercept inventory reservation endpoint to verify payload
    const reservationPromise = page.waitForResponse(
      res => res.url().includes('/api/v2/cart/reserve') && res.status() === 200
    );

    await inventory.navigateTo('cat_fresh_produce');
    await inventory.addBatchItems([
      { sku: 'GRO-ORG-092', qty: 3 },
      { sku: 'GRO-DRY-114', qty: 1 }
    ]);

    const reservationResponse = await reservationPromise;
    const body = await reservationResponse.json();
    expect(body.reservationExpiresInSeconds).toBeGreaterThan(600);

    // 2. Execute POM atomic transition
    await inventory.proceedToCheckout();
    await checkout.applyPromoCode('WEEKEND_SAVE_20');

    // 3. Explicit assertions on calculated tax, subtotal and net payable
    await expect(checkout.subtotalLabel).toHaveText('$64.50');
    await expect(checkout.discountLabel).toHaveText('-$12.90');
    await expect(checkout.netPayableLabel).toHaveText('$51.60');

    // 4. Verify no unhandled console errors or fatal telemetry logs occurred
    expect(checkout.getCapturedConsoleErrors()).toHaveLength(0);
  });
});`}
          </pre>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">IV.</span>
            <h2 className="spec-section-title">Automation Technology Stack</h2>
          </div>
          <span className="spec-card-eyebrow">TOOLCHAIN</span>
        </div>

        <div className="spec-grid-3">
          <div className="spec-card">
            <Terminal size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Core Drivers</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Playwright (TypeScript/JavaScript)</li>
              <li><span className="spec-bullet">›</span> Selenium WebDriver 4 (Java)</li>
              <li><span className="spec-bullet">›</span> Cypress (Modern Component Testing)</li>
              <li><span className="spec-bullet">›</span> Chrome DevTools Protocol (CDP)</li>
            </ul>
          </div>

          <div className="spec-card">
            <Sparkles size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Test Runners & Reporters</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> TestNG with parallel thread suites</li>
              <li><span className="spec-bullet">›</span> JUnit 5 & Cucumber BDD Gherkin</li>
              <li><span className="spec-bullet">›</span> Allure & ExtentReports Rich HTML</li>
              <li><span className="spec-bullet">›</span> Playwright Trace Viewer & Video Artifacts</li>
            </ul>
          </div>

          <div className="spec-card">
            <Layers size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Build & CI Pipeline</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Maven & Gradle Build Automations</li>
              <li><span className="spec-bullet">›</span> GitHub Actions Workflow Runners</li>
              <li><span className="spec-bullet">›</span> Jenkins Declarative Pipelines</li>
              <li><span className="spec-bullet">›</span> Dockerized Headless Grid Containers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Project Media Previews (Reference Pattern) */}
      <ProjectHoverPreviewList
        title="Production QA Automation Projects & Case Studies"
        items={[
          {
            id: "proj-1",
            num: "01",
            name: "Grosido Multi-Module E-Commerce",
            domain: "GROCERY DELIVERY · WEB & ADMIN",
            metric: "~40% Regression Cut",
            href: "/projects/grosido-qa-case-study",
            imageSrc: "/images/projects/grosido-preview.svg",
            caption: "Selenium POM · 120+ Scenarios",
          },
          {
            id: "proj-2",
            num: "02",
            name: "DRIWE High-Concurrency Mobility",
            domain: "CAB & COURIER LOGISTICS",
            metric: "100k Virtual Users",
            href: "/projects/driwe-qa-case-study",
            imageSrc: "/images/projects/driwe-preview.svg",
            caption: "JMeter · Race Condition Triage",
          },
          {
            id: "proj-3",
            num: "03",
            name: "Ride Sharing API Microservices",
            domain: "DISPATCH & SURGE PRICING",
            metric: "22 Endpoints Verified",
            href: "/projects/ride-sharing-testing-case-study",
            imageSrc: "/images/projects/ridesharing-preview.svg",
            caption: "REST Assured · HMAC SHA-256",
          },
          {
            id: "proj-4",
            num: "04",
            name: "Urban Build Construction App",
            domain: "ENTERPRISE FIELD INSPECTION",
            metric: "100% Offline Sync",
            href: "/projects/urban-build-testing-case-study",
            imageSrc: "/images/projects/urbanbuild-preview.svg",
            caption: "Appium 2.0 · W3C Touch Debounce",
          },
          {
            id: "proj-5",
            num: "05",
            name: "Multi-Vendor Marketplace Ledger",
            domain: "FINANCIAL RECONCILIATION",
            metric: "240+ Defects Found",
            href: "/projects/ecommerce-testing-case-study",
            imageSrc: "/images/projects/ecommerce-preview.svg",
            caption: "BVA · Floating-Point Drift Fix",
          },
        ]}
      />
    </SpecialtyLayout>
  );
}

