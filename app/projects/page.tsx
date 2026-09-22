import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  Building2,
  Car,
  CheckCircle2,
  Layers,
  Route,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Terminal,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";
import { ALL_PROJECTS } from "@/web/data/portfolio-data";

const pageUrl = "https://shashankportfolio-jet.vercel.app/projects";

export const metadata: Metadata = {
  title: "Software Testing Projects & QA Case Studies | Shashank Shinde",
  description:
    "Explore 5 real-world QA case studies by Shashank Shinde. End-to-end automation, distributed JMeter load testing, API validation, and critical defect discoveries.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Software Testing Projects & QA Case Studies | Shashank Shinde",
    description:
      "Explore 5 real-world QA case studies by Shashank Shinde. End-to-end automation, distributed JMeter load testing, API validation, and critical defect discoveries.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "QA Projects & Case Studies — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Testing Projects & QA Case Studies | Shashank Shinde",
    description:
      "Explore 5 real-world QA case studies by Shashank Shinde. End-to-end automation, distributed JMeter load testing, API validation, and critical defect discoveries.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

const CASE_STUDY_ROUTES: Record<string, string> = {
  "TC-001": "/projects/driwe-qa-case-study",
  "TC-002": "/projects/grosido-qa-case-study",
  "TC-003": "/projects/ecommerce-testing-case-study",
  "TC-004": "/projects/ride-sharing-testing-case-study",
  "TC-005": "/projects/urban-build-testing-case-study",
};

export default function ProjectsIndexPage() {
  return (
    <SubpageLayout
      title="QA Projects & Test Automation Case Studies"
      subtitle="Detailed production case studies covering end-to-end test automation, REST API contract validation, high-concurrency performance engineering, and verified pre-production defect mitigations."
      badge="CASE STUDIES DIRECTORY"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      pageUrl={pageUrl}
      description="Explore 5 real-world QA case studies by Shashank Shinde. End-to-end automation, distributed JMeter load testing, API validation, and critical defect discoveries."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Project Portfolio</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde has led quality assurance across five major production applications: DRIWE (on-demand cab and
          courier logistics), Grosido (multi-module online grocery delivery), an E-Commerce Ecosystem (multi-vendor
          marketplace), an Android Ride Sharing Application (real-time geolocation matching), and Urban Build (lead
          generation platform).
        </p>
        <p className="aeo-direct-answer-supporting">
          His project contributions focus on isolating severe pre-production defects such as payment webhook
          double-deductions, booking velocity negative fare race conditions, inventory cache desynchronization, and seat
          over-allocations.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;Shashank Shinde has tested mission-critical production platforms across logistics, e-commerce, mobility,
        and lead generation. His QA work combines functional regression testing with Selenium and Playwright, 100k-user
        load testing with Apache JMeter, and REST API contract verification with Postman.&rdquo;
      </blockquote>

      {/* Projects Showcase List */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-cyan-400" aria-hidden="true" />
          Production QA Case Studies
        </h2>
        <div className="space-y-6">
          {ALL_PROJECTS.map((proj) => {
            const dedicatedUrl = CASE_STUDY_ROUTES[proj.id] || "/projects";

            return (
              <article key={proj.id} className="feature-glass-card border-white/10 hover:border-cyan-500/40">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {proj.id}
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase">{proj.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{proj.name}</h3>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">{proj.summary}</p>

                {/* Key Defect Highlight */}
                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-500/20 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold mb-1">
                    <Bug size={14} />
                    <span>CRITICAL DEFECT RESOLVED: {proj.defect.title}</span>
                  </div>
                  <p className="text-xs text-slate-300">{proj.defect.symptom}</p>
                </div>

                {/* Bottom Bar with Link to Dedicated Deep Dive */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    {proj.metrics.map((m) => (
                      <span key={m.k}>
                        <strong className="text-white">{m.v}</strong> {m.k}
                      </span>
                    ))}
                  </div>

                  <Link href={dedicatedUrl} className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline">
                    <span>Read Full QA Case Study</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Cross-Link to Technical Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Layers size={22} className="text-indigo-400" aria-hidden="true" />
          Explore Technical QA Skills
        </h2>
        <div className="content-grid-3">
          <Link href="/skills/selenium-automation" className="feature-glass-card hover:border-cyan-500">
            <h3 className="feature-card-title text-cyan-300">Selenium Automation →</h3>
            <p className="feature-card-desc">
              TestNG, Page Object Model design, and ~40% regression cycle time reduction.
            </p>
          </Link>
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h3 className="feature-card-title text-violet-300">REST API Validation →</h3>
            <p className="feature-card-desc">
              Postman collections, payload schemas, and webhook idempotency assertions.
            </p>
          </Link>
          <Link href="/skills/performance-testing" className="feature-glass-card hover:border-emerald-500">
            <h3 className="feature-card-title text-emerald-300">Performance Testing →</h3>
            <p className="feature-card-desc">
              Apache JMeter 100,000-user distributed simulations and latency benchmarks.
            </p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
