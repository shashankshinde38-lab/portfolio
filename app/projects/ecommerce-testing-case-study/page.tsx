import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  CheckCircle2,
  Code2,
  Globe,
  Layers,
  ShieldCheck,
  ShoppingBag,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/projects/ecommerce-testing-case-study";

export const metadata: Metadata = {
  title: "E-Commerce Marketplace QA Case Study | Shashank Shinde — Software Test Engineer",
  description:
    "Explore Shashank Shinde's QA case study for an E-Commerce marketplace: 5-browser cross-browser testing, payment checkout regression, and refund webhook double-deduction fix.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "E-Commerce Marketplace QA Case Study | Shashank Shinde",
    description:
      "Cross-browser testing across 5 browser engines, payment checkout validation, and refund webhook idempotency mitigation by Shashank Shinde.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "E-Commerce QA Case Study — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Marketplace QA Case Study | Shashank Shinde",
    description:
      "Cross-browser testing across 5 browser engines and refund webhook idempotency mitigation by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function EcommerceCaseStudyPage() {
  return (
    <SubpageLayout
      title="E-Commerce Ecosystem — Marketplace QA Case Study"
      subtitle="Complete order-to-delivery quality assurance across 4 user roles: Customer, Seller, Admin, and Delivery modules. Cross-browser parity across 5 major engines and payment webhook idempotency engineering."
      badge="CASE STUDY · MULTI-VENDOR MARKETPLACE"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "E-Commerce QA Case Study" },
      ]}
      pageUrl={pageUrl}
      description="Cross-browser testing across 5 browser engines, payment checkout validation, and refund webhook idempotency mitigation by Shashank Shinde."
    >
      {/* Executive Summary */}
      <section className="aeo-direct-answer-card" aria-label="Executive summary">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Case Study Summary · E-Commerce Marketplace</span>
        </div>
        <p className="aeo-direct-answer-text">
          On an enterprise multi-vendor e-commerce marketplace ecosystem, Shashank Shinde validated complex workflows
          interacting across 4 distinct systems: Seller Web Panel, Admin Web Dashboard, Customer Android App, and
          Delivery Partner App. He designed automated cross-browser test suites across 5 major browser engines.
        </p>
        <p className="aeo-direct-answer-supporting">
          His testing prevented financial discrepancies by discovering a critical refund webhook double-deduction defect
          (ECO-DEF-2024-032) where seller commissions were subtracted twice during partial order return retries.
        </p>
      </section>

      {/* Platform Architecture */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Globe size={22} className="text-cyan-400" aria-hidden="true" />
          Marketplace Architecture &amp; Role Scope
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">User Roles Tested</h4>
            <p className="text-white font-semibold mb-1">4 Distinct Roles</p>
            <p className="text-xs text-slate-300">Customer shoppers, vendor sellers, warehouse dispatchers, and system administrators.</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">Cross-Browser Scope</h4>
            <p className="text-white font-semibold mb-1">5 Major Browsers</p>
            <p className="text-xs text-slate-300">Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari, and Opera parity.</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">Critical Defect Scope</h4>
            <p className="text-white font-semibold mb-1">18 Critical Bugs</p>
            <p className="text-xs text-slate-300">Caught and mitigated prior to production launch, including payment and returns defects.</p>
          </div>
        </div>
      </section>

      {/* Critical Defect Deep Dive */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Bug size={22} className="text-red-400" aria-hidden="true" />
          Critical Defect Deep-Dive: Refund Webhook Double-Deduction
        </h2>
        <div className="feature-glass-card border-red-500/30">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/20 pb-3 mb-4">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold">REPORT ID: ECO-DEF-2024-032</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Multi-Role Refund Webhook Double-Deduction</h3>
            </div>
            <span className="px-2.5 py-1 rounded text-xs font-mono bg-red-500/10 text-red-300 border border-red-500/30">
              CRITICAL · FINANCIAL INTEGRITY
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300 mb-4">
            <p>
              <strong className="text-white">Scenario:</strong> When a customer initiated a partial return on a multi-item
              order, the return microservice dispatched webhook callbacks to update the seller&apos;s settlement ledger. Due to
              network latency spikes, the payment gateway retried the webhook callback.
            </p>
            <p>
              <strong className="text-white">Symptom:</strong> The receiving webhook endpoint lacked idempotency
              fingerprinting. It processed the retry receipt as a new event, deducting the seller commission fee a second
              time and producing negative settlement ledger balances for merchants.
            </p>
            <p>
              <strong className="text-white">Engineering Fix:</strong> Implemented distributed Redis transaction locking
              using <code>tx:&#123;transactionId&#125;</code> idempotency keys and built automated payment regression assertions verifying that
              each refund transaction commits exactly once.
            </p>
          </div>

          <div className="code-snippet-panel">
            <div className="code-snippet-header">
              <span>webhook-idempotency-assertion.js · Idempotency Verification</span>
              <span>JavaScript</span>
            </div>
            <pre className="code-snippet-body">
{`// Validating webhook deduplication under rapid retry dispatches
assertWebhookProcessedOnce(transactionId);
expect(sellerLedger.getDeductionsCount(transactionId)).toBe(1);
expect(sellerLedger.getBalance(sellerId)).toBeGreaterThanOrEqual(0.00);`}
            </pre>
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
            <h4 className="text-2xl font-bold text-white font-mono mb-1">520</h4>
            <p className="text-xs text-slate-300">Test Cases Designed across complete order-to-delivery workflow.</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-2xl font-bold text-cyan-300 font-mono mb-1">18</h4>
            <p className="text-xs text-slate-300">Critical Severity Bugs caught and mitigated prior to production launch.</p>
          </div>

          <div className="feature-glass-card">
            <h4 className="text-2xl font-bold text-emerald-300 font-mono mb-1">5 Browsers</h4>
            <p className="text-xs text-slate-300">Cross-Browser Parity verified across desktop Chrome, Edge, Firefox, Safari.</p>
          </div>
        </div>
      </section>

      {/* Related Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Zap size={22} className="text-cyan-400" aria-hidden="true" />
          Related QA Skills
        </h2>
        <div className="content-grid-2">
          <Link href="/skills/selenium-automation" className="feature-glass-card hover:border-cyan-500">
            <h4 className="text-cyan-300 font-semibold mb-1">Selenium WebDriver →</h4>
            <p className="text-xs text-slate-300">Automating cross-browser e-commerce checkout and returns flows.</p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h4 className="text-violet-300 font-semibold mb-1">REST API Validation →</h4>
            <p className="text-xs text-slate-300">Webhook idempotency, payment signatures, and schema conformity.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
