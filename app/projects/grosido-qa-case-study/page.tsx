import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  CheckCircle2,
  Code2,
  Layers,
  ShieldCheck,
  ShoppingBag,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/projects/grosido-qa-case-study";

export const metadata: Metadata = {
  title: "Grosido Grocery Delivery QA Case Study | Shashank Shinde — Software Test Engineer",
  description:
    "QA case study for Grosido by Shashank Shinde: Selenium POM framework, 40% faster regression cycles, and distributed cache desync defect mitigation.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Grosido Grocery Delivery QA Case Study | Shashank Shinde",
    description:
      "Selenium WebDriver POM automation framework, ~40% regression reduction, and distributed cache desynchronization mitigation by Shashank Shinde.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grosido QA Case Study — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grosido Grocery Delivery QA Case Study | Shashank Shinde",
    description:
      "Selenium WebDriver POM automation framework, ~40% regression reduction, and distributed cache desync fix by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function GrosidoCaseStudyPage() {
  return (
    <SubpageLayout
      title="Grosido — Grocery Delivery Platform QA Case Study"
      subtitle="Comprehensive quality assurance across three interconnected modules: Customer Mobile App, Admin Dashboard, and Delivery Boy App. Automated end-to-end regression testing using Selenium WebDriver + Page Object Model."
      badge="CASE STUDY · E-COMMERCE &amp; GROCERY"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Grosido QA Case Study" },
      ]}
      pageUrl={pageUrl}
      description="Selenium WebDriver POM automation framework, ~40% regression reduction, and distributed cache desynchronization mitigation by Shashank Shinde."
    >
      {/* Executive Direct Answer */}
      <section className="aeo-direct-answer-card" aria-label="Executive summary">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Case Study Summary · Grosido Platform</span>
        </div>
        <p className="aeo-direct-answer-text">
          For the Grosido grocery delivery platform, Shashank Shinde engineered a scalable Selenium WebDriver test
          automation framework utilizing Java, TestNG, and the Page Object Model (POM) pattern. The framework cut
          regression cycle time by ~40% across 8+ sprint deliveries.
        </p>
        <p className="aeo-direct-answer-supporting">
          His testing diagnosed a distributed cache desynchronization flaw (GRO-DEF-2024-071) where shopping carts
          retained stale baseline prices when flash promotions expired, leading to checkout billing discrepancies.
        </p>
      </section>

      {/* Project Overview */}
      <section className="content-section">
        <h2 className="content-section-title">
          <ShoppingBag size={22} className="text-emerald-400" aria-hidden="true" />
          Platform Architecture &amp; Role Scope
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Architecture</h3>
            <p className="text-white font-semibold mb-1">3 Integrated Modules</p>
            <p className="text-xs text-slate-300">Customer Android App, Web Admin Panel, and Delivery Partner App.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">QA Role &amp; Focus</h3>
            <p className="text-white font-semibold mb-1">Automation &amp; Functional QA</p>
            <p className="text-xs text-slate-300">Inventory sync, cart promotions, order dispatch, regression suites.</p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Automation Stack</h3>
            <p className="text-white font-semibold mb-1">Selenium · TestNG · Java · POM</p>
            <p className="text-xs text-slate-300">Data-driven providers, parallel runners, and JIRA defect lifecycle.</p>
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
            <h3 className="feature-card-title text-cyan-300 mb-2">The Multi-Module Synchronization Challenge</h3>
            <p className="feature-card-desc">
              Grosido coordinates real-time inventory and pricing across an e-commerce web admin dashboard, customer mobile app,
              and logistics delivery app. The key QA challenge was verifying that sudden price changes, coupon revocations, and
              limited-stock flash sales synced instantaneously across all 3 modules without serving stale cached prices during checkout.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-emerald-300 mb-2">Shashank&apos;s QA Responsibility</h3>
            <p className="feature-card-desc">
              Architected a maintainable Selenium WebDriver automation framework using Java and the Page Object Model (POM).
              Authored two-tiered CI smoke and regression suites in TestNG, designed data-driven test providers with Apache POI,
              and validated Redis cache invalidation hooks during flash sales.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Workflows Validated */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Code2 size={22} className="text-cyan-400" aria-hidden="true" />
          Critical Workflows Validated
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">Workflow 01</h3>
            <p className="text-white font-semibold mb-1">Dynamic Cart &amp; Promo Recalculation</p>
            <p className="text-xs text-slate-300">
              Verified coupon code applications, cart item quantity alterations, and tax re-evaluations across multiple product categories.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Workflow 02</h3>
            <p className="text-white font-semibold mb-1">Admin Catalog Price Mutations</p>
            <p className="text-xs text-slate-300">
              Tested immediate synchronization between web admin catalog adjustments and consumer cart subtotals to prevent stale pricing leaks.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Workflow 03</h3>
            <p className="text-white font-semibold mb-1">Delivery Dispatch &amp; Handover</p>
            <p className="text-xs text-slate-300">
              Validated customer order packing, delivery boy partner route assignment, and real-time OTP confirmation handovers.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Defect Deep Dive */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Bug size={22} className="text-red-400" aria-hidden="true" />
          Critical Defect Deep-Dive: Distributed Cache Desynchronization
        </h2>
        <div className="feature-glass-card border-red-500/30">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/20 pb-3 mb-4">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold">REPORT ID: GRO-DEF-2024-071</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Distributed Cache Desync Between Admin and Active Carts</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-red-500/10 text-red-300 border border-red-500/30">
              HIGH SEVERITY · P0
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300 mb-4">
            <p>
              <strong className="text-white">Scenario:</strong> While shoppers had promotional discount items held in active
              checkout carts, the store administrator updated catalog prices or revoked the promotion in the Admin Panel.
            </p>
            <p>
              <strong className="text-white">Reproduction:</strong>
              <br />
              1. Customer adds grocery item with active 20% discount to cart.
              <br />
              2. Store administrator revokes promotional price in Admin Dashboard and updates base price from ₹120 to ₹150.
              <br />
              3. Customer proceeds to final payment review without refreshing product listing page.
            </p>
            <p>
              <strong className="text-white">Symptom:</strong> The customer cart UI retained the stale discounted pricing,
              while the payment gateway backend billed the full updated baseline amount upon checkout authorization,
              triggering customer complaints.
            </p>
            <p>
              <strong className="text-white">Validation &amp; Engineering Fix:</strong> Added automated Redis cache eviction hooks on
              product catalog price mutations and built Selenium POM assertions verifying that active carts re-validate
              item pricing against the live inventory database before checkout authorization.
            </p>
          </div>

          <div className="code-snippet-panel">
            <div className="code-snippet-header">
              <span>cart-sync-assertion.java · Selenium POM Verification</span>
              <span>Java</span>
            </div>
            <pre className="code-snippet-body">
{`// Validating live price delta sync between customer cart and admin catalog
cartPage.refreshPriceCheck(itemId);
assertThat(cartPage.getSubtotal())
    .as("Customer cart subtotal must synchronize with live admin price")
    .isEqualTo(adminPanel.getLivePrice(itemId));`}
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
            <span className="insight-card-tag">Caching Strategy</span>
            <h3 className="insight-card-title">Cart Read-Through Validation</h3>
            <p className="insight-card-desc">
              Catalog caches optimize browsing speed, but checkout sessions must execute an atomic read-through to live inventory
              before payment tokenization to prevent pricing disparities.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Automation Architecture</span>
            <h3 className="insight-card-title">POM Locator Encapsulation</h3>
            <p className="insight-card-desc">
              Abstracting locators into dedicated Page Classes shields test logic from breaking when frontend developers update
              component styles or class selectors, reducing script maintenance overhead.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Test Reliability</span>
            <h3 className="insight-card-title">Dynamic Synchronization</h3>
            <p className="insight-card-desc">
              Eliminating arbitrary `Thread.sleep()` in favor of explicit `WebDriverWait` with expected conditions cut false-positive
              flaky test failures by over 80% across parallel CI test runs.
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
            <div className="text-2xl font-bold text-white font-mono mb-1">638</div>
            <p className="text-xs text-slate-300">Test Cases Designed &amp; Maintained across 3 application modules.</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-emerald-300 font-mono mb-1">~40%</div>
            <p className="text-xs text-slate-300">Reduction in Regression Cycle Time through Selenium + TestNG framework.</p>
          </div>

          <div className="feature-glass-card">
            <div className="text-2xl font-bold text-cyan-300 font-mono mb-1">112</div>
            <p className="text-xs text-slate-300">Defects Logged and Resolved in JIRA (including 23 critical severity issues).</p>
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
          <Link href="/skills/selenium-automation" className="feature-glass-card hover:border-cyan-500">
            <h3 className="text-cyan-300 font-semibold mb-1">Selenium WebDriver →</h3>
            <p className="text-xs text-slate-300">Page Object Model design and automated TestNG parallel suites.</p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h3 className="text-violet-300 font-semibold mb-1">REST API Testing →</h3>
            <p className="text-xs text-slate-300">Postman collection validation for order processing APIs.</p>
          </Link>
          <Link href="/skills/mobile-testing" className="feature-glass-card hover:border-sky-500">
            <h3 className="text-sky-300 font-semibold mb-1">Android Mobile Testing →</h3>
            <p className="text-xs text-slate-300">Grocery customer app and delivery boy partner mobile QA.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
