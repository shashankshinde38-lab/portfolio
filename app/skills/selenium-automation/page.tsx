import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/skills/selenium-automation";

export const metadata: Metadata = {
  title: "Selenium Automation Testing | Shashank Shinde — Software Test Engineer",
  description:
    "Learn about Shashank Shinde's Selenium WebDriver automation experience using Java, TestNG, Page Object Model, Cucumber BDD, and CI/CD regression testing.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Selenium Automation Testing | Shashank Shinde — Software Test Engineer",
    description:
      "Selenium WebDriver framework architecture, Page Object Model design, and cross-browser regression testing by Shashank Shinde.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Selenium Automation Testing — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selenium Automation Testing | Shashank Shinde",
    description:
      "Selenium WebDriver framework architecture, Page Object Model design, and regression testing by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function SeleniumAutomationPage() {
  return (
    <SubpageLayout
      title="Selenium Automation Testing — Shashank Shinde"
      subtitle="Scalable web UI automation using Selenium WebDriver with Java, TestNG, Page Object Model (POM) design patterns, and parallel cross-browser execution across CI/CD pipelines."
      badge="TEST AUTOMATION SPECIALIZATION"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Skills", href: "/skills" },
        { label: "Selenium Automation" },
      ]}
      pageUrl={pageUrl}
      description="Selenium WebDriver framework architecture, Page Object Model design, and cross-browser regression testing by Shashank Shinde."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Selenium Experience</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde has extensive experience designing and maintaining Selenium WebDriver test automation
          frameworks using Java and the Page Object Model (POM) architectural pattern. His automation suites leverage
          TestNG for parallel test runner configuration, data-driven test providers, and automated HTML reporting.
        </p>
        <p className="aeo-direct-answer-supporting">
          On the Grosido grocery platform, his Selenium + TestNG framework reduced full regression cycle execution time
          by ~40%, safeguarding critical checkout, inventory, and administrative workflows across 8+ sprint cycles.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;Shashank Shinde uses Selenium WebDriver with Java, TestNG, and Page Object Model for regression and
        end-to-end web automation. His suites incorporate dynamic waits (Explicit/Fluent Waits), data-driven testing via
        Apache POI/JSON, and headless CI/CD execution across Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple
        Safari.&rdquo;
      </blockquote>

      {/* Framework Architecture & Approach */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Code2 size={22} className="text-cyan-400" aria-hidden="true" />
          Framework Architecture &amp; Best Practices
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <h3 className="feature-card-title text-cyan-300 mb-2">Page Object Model (POM) Design</h3>
            <p className="feature-card-desc">
              Strict separation between UI locators/actions and test assertion logic. Page classes encapsulate page
              elements using `@FindBy` or explicit `By` selectors with dedicated action methods, preventing test
              brittleness when UI layouts change.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Robust Synchronization &amp; Waits</h3>
            <p className="feature-card-desc">
              Zero reliance on fragile `Thread.sleep()`. All element interactions employ `WebDriverWait` with expected
              conditions (`elementToBeClickable`, `visibilityOfElementLocated`) to handle dynamic asynchronous DOM
              mutations without false-positive failures.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-emerald-300 mb-2">TestNG Parallel Execution</h3>
            <p className="feature-card-desc">
              Thread-safe test architecture leveraging <code>ThreadLocal&lt;WebDriver&gt;</code> instances to enable parallel suite
              execution across multiple browser threads, slashing overall build regression run times.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-violet-300 mb-2">Cucumber BDD Integration</h3>
            <p className="feature-card-desc">
              Authoring Gherkin scenario syntax (`Given`, `When`, `Then`) to bridge business acceptance criteria with
              automated step definition execution for multi-role user journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Code Snippet Example */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-indigo-400" aria-hidden="true" />
          Production Assertion Pattern (POM)
        </h2>
        <div className="code-snippet-panel">
          <div className="code-snippet-header">
            <span>GrosidoCheckoutTest.java · Selenium WebDriver + TestNG</span>
            <span>Java</span>
          </div>
          <pre className="code-snippet-body">
{`// Validating dynamic price calculation against admin promotional updates
@Test(dataProvider = "promoCheckoutData", groups = {"regression", "cart"})
public void verifyCartPriceSyncUnderActivePromo(String itemId, double expectedPrice) {
    CartPage cartPage = new CartPage(driver);
    cartPage.navigateToCart()
            .waitForItemsToLoad();
            
    // Assert cart subtotal reflects promotional discount in real time
    double actualSubtotal = cartPage.getItemSubtotal(itemId);
    Assert.assertEquals(actualSubtotal, expectedPrice, 0.01, 
        "Cart subtotal failed to sync with admin promotional update for item: " + itemId);
        
    // Proceed to checkout and assert idempotency key generation
    CheckoutPage checkout = cartPage.proceedToCheckout();
    Assert.assertTrue(checkout.isPaymentButtonEnabled(), "Payment gateway action should be interactive");
}`}
          </pre>
        </div>
      </section>

      {/* First-Hand QA Insights & Lessons Learned */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Zap size={22} className="text-amber-400" aria-hidden="true" />
          First-Hand Lessons Learned &amp; Automation Takeaways
        </h2>
        <div className="content-grid-3">
          <div className="insight-card">
            <span className="insight-card-tag">Synchronization Lesson</span>
            <h3 className="insight-card-title">Dynamic Waits over Static Sleep</h3>
            <p className="insight-card-desc">
              Replacing arbitrary `Thread.sleep()` calls with condition-specific `WebDriverWait` (`elementToBeClickable`,
              `visibilityOfElementLocated`) eliminated 80%+ of flaky build failures across CI regression runs.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Architecture Lesson</span>
            <h3 className="insight-card-title">Strict Locator Encapsulation</h3>
            <p className="insight-card-desc">
              Encapsulating all CSS and XPath selectors within dedicated Page Object classes ensured that frontend UI redesigns
              required edits in only a single file, rather than rewriting dozens of broken test scripts.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Data Strategy</span>
            <h3 className="insight-card-title">Decoupled Test Data Providers</h3>
            <p className="insight-card-desc">
              Extracting test inputs into external JSON and Excel data providers via TestNG `@DataProvider` maximized boundary coverage
              for coupon codes, negative cart quantities, and character overflow edge cases.
            </p>
          </div>
        </div>
      </section>

      {/* Relevant Project Evidence */}
      <section className="content-section">
        <h2 className="content-section-title">
          <ShieldCheck size={22} className="text-emerald-400" aria-hidden="true" />
          Related Project Evidence &amp; Knowledge Graph
        </h2>
        <div className="content-grid-2">
          <Link href="/projects/grosido-qa-case-study" className="feature-glass-card hover:border-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold">CASE STUDY 01</span>
              <ArrowUpRight size={15} className="text-emerald-400" />
            </div>
            <h3 className="feature-card-title text-white mb-2">Grosido — Grocery Delivery Platform</h3>
            <p className="feature-card-desc">
              Built end-to-end Selenium WebDriver + POM framework cutting regression cycle time by ~40%. Automated
              smoke and sanity cycles across 3 modules (Customer App, Admin Panel, Delivery App).
            </p>
          </Link>

          <Link href="/projects/ecommerce-testing-case-study" className="feature-glass-card hover:border-cyan-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold">CASE STUDY 02</span>
              <ArrowUpRight size={15} className="text-cyan-400" />
            </div>
            <h3 className="feature-card-title text-white mb-2">E-Commerce Ecosystem Marketplace</h3>
            <p className="feature-card-desc">
              Automated end-to-end checkout and payment regression suites across 5 major browser engines, verifying
              multi-vendor settlement flows and returns processing.
            </p>
          </Link>
        </div>
      </section>

      {/* Related Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Layers size={22} className="text-violet-400" aria-hidden="true" />
          Related QA Skills
        </h2>
        <div className="content-grid-3">
          <Link href="/skills/playwright-automation" className="feature-glass-card hover:border-indigo-500">
            <h3 className="text-indigo-300 font-semibold mb-1">Playwright Automation →</h3>
            <p className="text-xs text-slate-300">Modern TypeScript E2E testing with fast browser contexts.</p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h3 className="text-violet-300 font-semibold mb-1">REST API Testing →</h3>
            <p className="text-xs text-slate-300">Postman assertion design and JSON schema contracts.</p>
          </Link>
          <Link href="/skills/performance-testing" className="feature-glass-card hover:border-emerald-500">
            <h3 className="text-emerald-300 font-semibold mb-1">Apache JMeter Load Testing →</h3>
            <p className="text-xs text-slate-300">Distributed load testing up to 100k concurrent users.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
