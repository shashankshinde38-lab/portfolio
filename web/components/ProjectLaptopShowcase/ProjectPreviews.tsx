"use client";

import Link from "next/link";
import { ArrowUpRight, Bug } from "lucide-react";
import { projectPreviews } from "@/web/data/project-previews";
import ProjectPreviewList from "../laptopshowcase/ProjectPreviewList";
import "./ProjectPreviews.css";
import ProjectLaptopShowcase from "../laptopshowcase/ProjectLaptopShowcase";

export interface FeaturedProject {
  id: string;
  number: string;
  name: string;
  industry: string;
  discipline: string;
  summary: string;
  defectTitle: string;
  defectSeverity: "CRITICAL" | "HIGH" | "MEDIUM";
  metric: string;
  metricLabel: string;
  stack: string[];
  href: string;
  previewColor: string;
  imageSrc: string;
  caption: string;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "driwe",
    number: "01",
    name: "DRIWE — Cab & Courier Logistics Platform",
    industry: "Transportation & Real-Time Logistics",
    discipline: "Performance & Concurrency QA",
    summary:
      "Distributed load and stress testing using Apache JMeter. Isolated a critical negative fare race condition when coupon re-application coincided with high booking velocity bursts.",
    defectTitle: "Negative Fare Race Condition on Velocity Surges",
    defectSeverity: "CRITICAL",
    metric: "100k Users",
    metricLabel: "Simulated concurrent virtual users at 0.00% server error SLA",
    stack: ["Apache JMeter", "Distributed Load", "Race Condition", "P99 SLA", "JIRA"],
    href: "/performance-testing",
    previewColor: "#A4552C",
    imageSrc: "/images/projects/driwe-preview.svg",
    caption: "JMeter · 100k Concurrency Triage",
  },
  {
    id: "grosido",
    number: "02",
    name: "Grosido — Multi-Module Grocery Platform",
    industry: "Grocery & Rapid E-Commerce Delivery",
    discipline: "E2E Test Automation Architecture",
    summary:
      "Engineered an automated Selenium WebDriver + TestNG framework with Page Object Model across Customer App, Admin Panel, and Delivery App. Discovered distributed cache desync between live product pricing and active shopping carts.",
    defectTitle: "Distributed Cache Desync on Admin Price Updates",
    defectSeverity: "HIGH",
    metric: "~40% Faster",
    metricLabel: "Regression cycle execution time reduction across 8+ sprints",
    stack: ["Selenium WebDriver", "Page Object Model", "TestNG", "Java", "CI/CD"],
    href: "/automation-testing",
    previewColor: "#1A1818",
    imageSrc: "/images/projects/grosido-preview.svg",
    caption: "Selenium POM · ~40% Cycle Cut",
  },
  {
    id: "ecommerce",
    number: "03",
    name: "E-Commerce Ecosystem & Marketplace",
    industry: "Multi-Vendor Marketplace",
    discipline: "Cross-Browser & Webhook QA",
    summary:
      "Cross-browser checkout suites across Chromium, WebKit, and Gecko engines. Uncovered an automated payment webhook retry flaw causing double-deductions in merchant settlement ledgers during partial order refunds.",
    defectTitle: "Refund Webhook Double-Deduction Ledger Flaw",
    defectSeverity: "CRITICAL",
    metric: "18 Bugs",
    metricLabel: "Critical defects intercepted prior to production deployment",
    stack: ["Cross-Browser", "Playwright", "Webhook Idempotency", "Payment QA"],
    href: "/automation-testing",
    previewColor: "#7A7470",
    imageSrc: "/images/projects/ecommerce-preview.svg",
    caption: "BigDecimal BVA · Double Debit Fix",
  },
  {
    id: "ride-sharing",
    number: "04",
    name: "Ride Sharing Application & Matching Engine",
    industry: "Mobility & Geolocation Services",
    discipline: "REST API & Concurrency Testing",
    summary:
      "Audited 22 REST API endpoints with automated Postman test scripts. Uncovered a concurrent seat reservation race condition where simultaneous passenger bookings over-allocated four-seat vehicle capacities to 5/4 passengers.",
    defectTitle: "Concurrent Seat Reservation Race Condition (5/4 Over-Allocation)",
    defectSeverity: "CRITICAL",
    metric: "22 APIs",
    metricLabel: "Endpoints validated for schema conformity and pessimistic locking",
    stack: ["Postman", "REST APIs", "Pessimistic Locking", "SQL Validation"],
    href: "/api-testing",
    previewColor: "#A4552C",
    imageSrc: "/images/projects/ridesharing-preview.svg",
    caption: "REST Assured · HMAC-SHA256 Gates",
  },
  {
    id: "urban-build",
    number: "05",
    name: "Urban Build — Real Estate & Construction Lead Platform",
    industry: "Construction & Contractor Marketplace",
    discipline: "Mobile Gesture & Debounce Testing",
    summary:
      "Tested Android mobile form submissions over high-latency 3G networks. Diagnosed a rapid multi-tap submission bug that fired duplicate lead entries and repeated SMS dispatches to contractor CRMs.",
    defectTitle: "Rapid Multi-Tap Duplicate Lead Generation Edge Case",
    defectSeverity: "MEDIUM",
    metric: "Zero Duplicates",
    metricLabel: "Achieved via client button debouncing and idempotency keys",
    stack: ["Appium", "Android Mobile", "Touch Debounce", "Network Throttling"],
    href: "/mobile-testing",
    previewColor: "#1A1818",
    imageSrc: "/images/projects/urbanbuild-preview.svg",
    caption: "Appium 2.0 · W3C Gesture Debounce",
  },
];

interface ProjectPreviewsProps {
  /** New reference-style laptop story by default; `list` preserves original list-only design. */
  layout?: "laptop" | "list" | "both";
}

export default function ProjectPreviews({ layout = "laptop" }: ProjectPreviewsProps = {}) {
  const previews = FEATURED_PROJECTS.map((project) => {
    const source = projectPreviews.find((preview) => preview.imageSrc === project.imageSrc);
    return { ...project, report: source?.report, href: source?.href ?? project.href };
  });

  return (
    <section
      id="projects"
      className="projects-preview-section"
      aria-label="Selected QA Projects & Case Studies"
    >
      <div className="projects-container">
        {/* Section Heading */}
        <div className="projects-header">
          <div className="projects-kicker">
            <span className="projects-kicker-dot" aria-hidden="true" />
            <span>SELECTED QA CASE STUDIES</span>
          </div>

          <div className="projects-title-row">
            <h2 className="projects-title">
              Verified <span className="font-serif italic text-terracotta">Production</span> Defects
              &amp; Case Studies.
            </h2>
            <p className="projects-lead">
              Real software breaks in the gaps between components, networks, and concurrent users.
              Here are five verified production systems where testing made the difference.
            </p>
          </div>
        </div>

        {/* Scroll-driven project laptop. All original project data and case studies are retained. */}
        {layout !== "list" && (
          <ProjectLaptopShowcase
            id="featured-laptop-projects"
            compact
            projects={previews}
          />
        )}

        {/* Project Rows */}
        {layout !== "laptop" && <ProjectPreviewList projects={previews}>
        <div className="projects-list">
          {FEATURED_PROJECTS.map((project, index) => {
            return (
              <Link
                key={project.id}
                href={project.href}
                className="project-row"
                data-preview-index={index}
                aria-label={`Explore ${project.name}`}
              >
                <div className="project-row-left">
                  <span className="project-index font-serif">{project.number}</span>
                  <div className="project-meta-wrap">
                    <span className="project-discipline-badge">{project.discipline}</span>
                    <h3 className="project-name">{project.name}</h3>
                    <p className="project-summary">{project.summary}</p>

                    {/* Defect Investigation Snippet */}
                    <div className="project-defect-chip">
                      <Bug size={13} className="text-terracotta shrink-0" />
                      <span>
                        <strong>Key Defect:</strong> {project.defectTitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="project-row-right">
                  <div className="project-metric-callout">
                    <span className="project-metric-value font-serif">{project.metric}</span>
                    <span className="project-metric-label">{project.metricLabel}</span>
                  </div>

                  <div className="project-arrow-wrap" aria-hidden="true">
                    <ArrowUpRight size={22} className="project-arrow-icon" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        </ProjectPreviewList>}

        {/* Action Link to QA Lab */}
        <div className="projects-footer-cta">
          <Link href="/qa-lab" className="qa-lab-banner-link">
            <div>
              <span className="banner-kicker">INTERACTIVE QUALITY LAB</span>
              <h3 className="banner-title font-serif italic">
                Step into the full-screen draggable QA Investigation Lab →
              </h3>
              <p className="banner-desc">
                Pan across interactive defect logs, Apache JMeter latency traces, and failed
                assertion replays on an infinite canvas.
              </p>
            </div>
            <ArrowUpRight size={24} className="banner-icon text-terracotta" />
          </Link>
        </div>
      </div>
    </section>
  );
}
