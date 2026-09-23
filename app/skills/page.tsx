import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Braces,
  CheckSquare,
  Code2,
  Database,
  Gauge,
  Layers,
  Plug,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/skills";

export const metadata: Metadata = {
  title: "QA Automation & Software Testing Skills | Shashank Shinde",
  description:
    "Comprehensive QA skills directory of Shashank Shinde in Pune. Deep-dive into Selenium WebDriver, Playwright, Postman API validation, JMeter, and Appium.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "QA Automation & Software Testing Skills | Shashank Shinde",
    description:
      "Technical testing capabilities, automation frameworks, API validation, and performance load engineering by Shashank Shinde in Pune, India.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "QA Skills — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QA Automation & Software Testing Skills | Shashank Shinde",
    description:
      "Technical testing capabilities, automation frameworks, API validation, and performance load engineering by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function SkillsPage() {
  return (
    <SubpageLayout
      title="Technical QA Skills & Testing Toolkit"
      subtitle="From automated browser regression suites to distributed server load simulations and mobile device validation—an engineering toolkit focused on software reliability, data consistency, and release confidence."
      badge="CORE COMPETENCIES"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Skills" }]}
      pageUrl={pageUrl}
      description="Technical testing capabilities, automation frameworks, API validation, and performance load engineering by Shashank Shinde in Pune, India."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Testing Capabilities</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde&apos;s testing toolkit centers on Selenium WebDriver (Java) and Playwright (TypeScript) for
          web UI automation, Postman and REST Assured for RESTful API testing, Apache JMeter for distributed performance
          load simulation, and Appium for Android mobile testing.
        </p>
        <p className="aeo-direct-answer-supporting">
          He leverages the Page Object Model (POM) pattern, TestNG, Cucumber BDD, SQL database validations, and GitHub
          Actions CI/CD integration to make quality verification scalable and continuous.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;Shashank Shinde is proficient in Selenium WebDriver, Playwright, Apache JMeter, Postman, Appium, TestNG,
        Cucumber BDD, Java, TypeScript, and SQL. His automation frameworks emphasize maintainability through Page Object
        Model design and automated CI/CD pipeline quality gates.&rdquo;
      </blockquote>

      {/* Deep-Dive Skill Hub Cards */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Wrench size={22} className="text-cyan-400" aria-hidden="true" />
          Dedicated Skill Architecture Pages
        </h2>
        <div className="content-grid-2">
          {/* Selenium Automation */}
          <Link href="/skills/selenium-automation" className="feature-glass-card hover:border-cyan-500">
            <div className="feature-card-header">
              <span className="feature-card-icon text-cyan-400">
                <Code2 size={20} />
              </span>
              <div>
                <h3 className="feature-card-title text-cyan-300">Selenium WebDriver Automation →</h3>
                <span className="text-xs font-mono text-slate-400">Java · TestNG · Page Object Model · Cucumber</span>
              </div>
            </div>
            <p className="feature-card-desc">
              Building modular, maintainable web UI regression frameworks. Parallel test execution, cross-browser
              compatibility across 5 browsers, and automated CI/CD regression suites reducing test cycle time by ~40%.
            </p>
          </Link>

          {/* Playwright Automation */}
          <Link href="/skills/playwright-automation" className="feature-glass-card hover:border-indigo-500">
            <div className="feature-card-header">
              <span className="feature-card-icon text-indigo-400">
                <Layers size={20} />
              </span>
              <div>
                <h3 className="feature-card-title text-indigo-300">Playwright E2E Automation →</h3>
                <span className="text-xs font-mono text-slate-400">TypeScript · Isolated Contexts · Fast Assertions</span>
              </div>
            </div>
            <p className="feature-card-desc">
              Modern end-to-end browser testing with auto-waiting, network request interception, isolated browser
              contexts, and rapid assertion triage for checkout workflows and authentication gates.
            </p>
          </Link>

          {/* API Testing */}
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <div className="feature-card-header">
              <span className="feature-card-icon text-violet-400">
                <Plug size={20} />
              </span>
              <div>
                <h3 className="feature-card-title text-violet-300">REST API &amp; Webhook Validation →</h3>
                <span className="text-xs font-mono text-slate-400">Postman · REST Assured · JSON Schema · OAuth</span>
              </div>
            </div>
            <p className="feature-card-desc">
              Validating RESTful endpoints for schema contract conformity, HTTP 2xx/4xx/5xx status code resilience,
              payload integrity, and payment webhook idempotency to prevent race conditions.
            </p>
          </Link>

          {/* Performance Testing */}
          <Link href="/skills/performance-testing" className="feature-glass-card hover:border-emerald-500">
            <div className="feature-card-header">
              <span className="feature-card-icon text-emerald-400">
                <Gauge size={20} />
              </span>
              <div>
                <h3 className="feature-card-title text-emerald-300">Apache JMeter Performance Testing →</h3>
                <span className="text-xs font-mono text-slate-400">Distributed Load · 100k Virtual Users · Latency SLA</span>
              </div>
            </div>
            <p className="feature-card-desc">
              Designing distributed thread groups in JMeter to assert server latency thresholds, database connection pool
              saturation, throughput bottlenecks, and 0.00% error rate SLAs under peak traffic.
            </p>
          </Link>

          {/* Mobile Testing */}
          <Link href="/skills/mobile-testing" className="feature-glass-card hover:border-sky-500">
            <div className="feature-card-header">
              <span className="feature-card-icon text-sky-400">
                <Smartphone size={20} />
              </span>
              <div>
                <h3 className="feature-card-title text-sky-300">Appium &amp; Android Mobile Testing →</h3>
                <span className="text-xs font-mono text-slate-400">Real Devices · Emulators · Gesture Validation</span>
              </div>
            </div>
            <p className="feature-card-desc">
              Automated and manual testing across physical Android devices and emulators, handling screen resolution
              fragmentation, network throttling, offline persistence, and rapid multi-tap handling.
            </p>
          </Link>
        </div>
      </section>

      {/* Languages, Tools & Supporting Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Database size={22} className="text-indigo-400" aria-hidden="true" />
          Supporting Technologies &amp; Methodologies
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <h3 className="text-white font-semibold mb-2">Languages &amp; Runtimes</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-cyan-300">Java:</strong> Core language for Selenium POM suites and TestNG.
              <br />
              <strong className="text-indigo-300">TypeScript &amp; JavaScript:</strong> Scripting for Playwright and web
              test utilities.
              <br />
              <strong className="text-violet-300">SQL:</strong> Database validation queries across PostgreSQL and MySQL.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-white font-semibold mb-2">DevOps &amp; Quality Gates</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-emerald-300">GitHub Actions:</strong> Automated build pipeline quality triggers.
              <br />
              <strong className="text-sky-300">JIRA:</strong> Complete defect lifecycle tracking with logs and steps.
              <br />
              <strong className="text-slate-200">Git:</strong> Branching strategy, pull request test reviews.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="text-white font-semibold mb-2">QA Methodologies</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-cyan-300">Regression Testing:</strong> Smoke, sanity, and full regression sweeps.
              <br />
              <strong className="text-indigo-300">Cross-Browser Testing:</strong> Chrome, Edge, Firefox, Safari parity.
              <br />
              <strong className="text-violet-300">Agile/Scrum:</strong> Active participant in sprint ceremonies.
            </p>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
