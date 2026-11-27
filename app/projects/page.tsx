import { pageMetadata, siteOrigin } from "@/web/seo/site";
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
import { projectPreviews } from "@/web/data/project-previews";
import ProjectPreviewList from "@/web/components/laptopshowcase/ProjectPreviewList";

const pageUrl = `${siteOrigin}/projects`;

export const metadata = pageMetadata("/projects");

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
      title="Software Testing Portfolio"
      subtitle="Five software testing projects showing how I designed tests, reproduced defects, and verified fixes across web apps, Android apps, and APIs."
      badge="CASE STUDIES DIRECTORY"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      pageUrl={pageUrl}
      description="Explore five software testing case studies by QA engineer Shashank Shinde, covering test automation, API validation, mobile QA, and JMeter load testing."
    >
      <section className="aeo-direct-answer-card" aria-label="Testing portfolio highlights">
        <p className="aeo-direct-answer-text">
          See how I tested checkout prices and inventory in the{" "}
          <Link href={CASE_STUDY_ROUTES["TC-002"]}>Grosido checkout regression case study</Link>, investigated duplicate
          refund events in the{" "}
          <Link href={CASE_STUDY_ROUTES["TC-003"]}>e-commerce marketplace testing case study</Link>, and used Apache
          JMeter to test concurrent bookings in the{" "}
          <Link href={CASE_STUDY_ROUTES["TC-001"]}>DRIWE load testing case study</Link>.
        </p>
      </section>

      {/* Projects Showcase List */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-cyan-400" aria-hidden="true" />
          Production QA Case Studies
        </h2>
        <ProjectPreviewList projects={projectPreviews}>
        <div className="space-y-6">
          {ALL_PROJECTS.map((proj, index) => {
            const dedicatedUrl = CASE_STUDY_ROUTES[proj.id] || "/projects";

            return (
              <article key={proj.id} className="feature-glass-card" data-preview-index={index}>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-[rgba(164,85,44,0.1)] text-terracotta border border-[rgba(164,85,44,0.25)]">
                      {proj.id}
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase">{proj.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--surface-alt)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{proj.name}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">{proj.summary}</p>

                {/* Key Defect Highlight */}
                <div className="p-3.5 rounded-lg bg-[rgba(164,85,44,0.08)] dark:bg-[rgba(164,85,44,0.18)] border border-[rgba(164,85,44,0.25)] dark:border-[rgba(164,85,44,0.4)] mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-terracotta font-semibold mb-1">
                    <Bug size={14} />
                    <span>CRITICAL DEFECT RESOLVED: {proj.defect.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{proj.defect.symptom}</p>
                </div>

                {/* Bottom Bar with Link to Dedicated Deep Dive */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
                    {proj.metrics.map((m) => (
                      <span key={m.k}>
                        <strong className="text-[var(--text-primary)]">{m.v}</strong> {m.k}
                      </span>
                    ))}
                  </div>

                  <Link href={dedicatedUrl} className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:underline">
                    <span>Read Full QA Case Study</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        </ProjectPreviewList>
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
