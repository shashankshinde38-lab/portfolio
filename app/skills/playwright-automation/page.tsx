import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/skills/playwright-automation";

export const metadata: Metadata = {
  title: "Playwright E2E Automation Testing | Shashank Shinde — Software Test Engineer",
  description:
    "Explore Shashank Shinde's Playwright test automation engineering in TypeScript. Auto-waiting assertions, isolated browser contexts, network mocking, and CI/CD gates.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Playwright E2E Automation Testing | Shashank Shinde — Software Test Engineer",
    description:
      "Playwright end-to-end browser automation architecture, TypeScript test runner, and failure triage engineering by Shashank Shinde in Pune, India.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Playwright Automation Testing — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playwright Automation Testing | Shashank Shinde",
    description:
      "Playwright end-to-end browser automation architecture and TypeScript test runner by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function PlaywrightAutomationPage() {
  return (
    <SubpageLayout
      title="Playwright E2E Automation Testing — Shashank Shinde"
      subtitle="Modern, fast, and deterministic web application testing using Playwright with TypeScript. Eliminating test flakiness through auto-waiting locators, isolated browser contexts, and real-time failure triage."
      badge="MODERN E2E AUTOMATION"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Skills", href: "/skills" },
        { label: "Playwright Automation" },
      ]}
      pageUrl={pageUrl}
      description="Playwright end-to-end browser automation architecture, TypeScript test runner, and failure triage engineering by Shashank Shinde in Pune, India."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Playwright Experience</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde utilizes Playwright with TypeScript and JavaScript for modern end-to-end browser automation.
          He designs test suites that take advantage of Playwright&apos;s auto-waiting web-first assertions, isolated
          browser contexts (`BrowserContext`), network request inspection, and headless CI/CD execution.
        </p>
        <p className="aeo-direct-answer-supporting">
          His Playwright workflows focus on high-speed checkout regression verification, session authentication token
          handling, and automated defect triage through trace analysis.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;Shashank Shinde implements Playwright automation suites in TypeScript across Chromium, WebKit, and Firefox
        rendering engines. He applies Playwright&apos;s request routing to validate API payloads, inspect HTTP status
        responses, and verify client-side DOM states with zero synthetic sleep delays.&rdquo;
      </blockquote>

      {/* Core Architectural Capabilities */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Zap size={22} className="text-indigo-400" aria-hidden="true" />
          Playwright Engineering Capabilities
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Isolated Browser Contexts</h3>
            <p className="feature-card-desc">
              Each test executes within an independent `BrowserContext` with dedicated cookies, localStorage, and cache.
              This provides complete test isolation, allowing simultaneous multi-user role testing (e.g. customer vs.
              admin) without cross-session pollution.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-cyan-300 mb-2">Auto-Waiting &amp; Web-First Assertions</h3>
            <p className="feature-card-desc">
              Leveraging locators that automatically perform actionability checks (visible, stable, enabled) prior to
              clicking or typing. Coupled with `expect(locator).toBeVisible()` assertions, flaky test failures are
              virtually eliminated.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-emerald-300 mb-2">Network Interception &amp; API Validation</h3>
            <p className="feature-card-desc">
              Using `page.route()` and `page.waitForResponse()` to assert backend API payload structures, verify webhook
              signatures, and inject controlled network error states (e.g. HTTP 500, gateway timeouts) to test UI fault
              tolerance.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-violet-300 mb-2">Failure Triage &amp; Trace Artifacts</h3>
            <p className="feature-card-desc">
              Utilizing Playwright Trace Viewer snapshots, DOM inspection logs, and video recordings to diagnose root
              causes when discrepancies arise between rendered DOM innerText and API response contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Production Code Snippet */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-cyan-400" aria-hidden="true" />
          Production E2E Checkout Assertion Snippet
        </h2>
        <div className="code-snippet-panel">
          <div className="code-snippet-header">
            <span>checkout-flow.spec.ts · Playwright + TypeScript</span>
            <span>TypeScript</span>
          </div>
          <pre className="code-snippet-body">
{`import { test, expect } from '@playwright/test';

test.describe('E-Commerce Multi-Vendor Checkout Suite', () => {
  test('authenticates session and asserts payment webhook idempotency', async ({ page }) => {
    // Navigate with auto-waiting
    await page.goto('/checkout');
    await expect(page.getByRole('heading', { name: /Review Order/i })).toBeVisible();

    // Verify multi-item cart calculation and price integrity
    const subtotalText = await page.locator('[data-testid="cart-subtotal"]').textContent();
    expect(subtotalText).toContain('₹');

    // Intercept payment gateway webhook confirmation
    const [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/payment/verify') && resp.status() === 200),
      page.getByRole('button', { name: /Authorize Payment/i }).click()
    ]);

    const body = await response.json();
    expect(body.status).toBe('SUCCESS');
    expect(body.idempotencyKey).toBeTruthy();

    // Assert order confirmation screen rendered within SLA
    await expect(page.locator('.order-success-confirmation')).toBeVisible({ timeout: 5000 });
  });
});`}
          </pre>
        </div>
      </section>

      {/* Live Demonstration Link */}
      <section className="content-section">
        <div className="feature-glass-card border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Interactive Demonstration</span>
            <h3 className="text-lg font-bold text-white mt-1">See Playwright Running in the Testing Lab</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Experience the interactive browser runner and failure triage simulator in action directly on the homepage
              testing simulator.
            </p>
          </div>
          <Link href="/#simulator" className="btn-primary">
            <span>Open Testing Lab</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* Related Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Layers size={22} className="text-violet-400" aria-hidden="true" />
          Related Testing Capabilities
        </h2>
        <div className="content-grid-3">
          <Link href="/skills/selenium-automation" className="feature-glass-card hover:border-cyan-500">
            <h4 className="text-cyan-300 font-semibold mb-1">Selenium WebDriver →</h4>
            <p className="text-xs text-slate-300">Java Page Object Model frameworks for cross-browser enterprise testing.</p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h4 className="text-violet-300 font-semibold mb-1">REST API Testing →</h4>
            <p className="text-xs text-slate-300">Postman collections and JSON schema validation contracts.</p>
          </Link>
          <Link href="/skills/performance-testing" className="feature-glass-card hover:border-emerald-500">
            <h4 className="text-emerald-300 font-semibold mb-1">Apache JMeter Load Testing →</h4>
            <p className="text-xs text-slate-300">Distributed load simulations up to 100,000 concurrent virtual users.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
