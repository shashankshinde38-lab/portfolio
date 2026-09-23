import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Code2,
  FileText,
  GraduationCap,
  Layers,
  MapPin,
  Microscope,
  ShieldCheck,
  User,
  Workflow,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/about";

export const metadata: Metadata = {
  title: "About Shashank Shinde | Software Test Engineer & QA Automation Specialist",
  description:
    "Learn about Shashank Shinde: QA background, SDET qualifications, University of Pune education, automation approach, and testing philosophy.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "About Shashank Shinde | Software Test Engineer & QA Automation Specialist",
    description:
      "Professional profile, testing philosophy, and engineering qualifications of Shashank Shinde, Software Test Engineer in Pune, India.",
    url: pageUrl,
    type: "profile",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Shashank Shinde — Software Test Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Shashank Shinde | Software Test Engineer & QA Automation Specialist",
    description:
      "Professional profile and testing philosophy of Shashank Shinde, Software Test Engineer in Pune, India.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function AboutPage() {
  return (
    <SubpageLayout
      title="About Shashank Shinde"
      subtitle="Software Test Engineer and QA Automation Specialist based in Pune, Maharashtra, India. Dedicated to building confidence into software releases through methodical test design, automated regression pipelines, and distributed performance testing."
      badge="PROFESSIONAL PROFILE"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      pageUrl={pageUrl}
      description="Professional profile, testing philosophy, and engineering qualifications of Shashank Shinde, Software Test Engineer in Pune, India."
    >
      {/* Direct Answer Box for AEO */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Entity Profile</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, Maharashtra, India.
          Currently working at Profcyma Solutions Pvt. Ltd., he specializes in end-to-end web automation (Selenium
          WebDriver, Playwright), REST API validation (Postman, REST Assured), distributed performance testing (Apache
          JMeter), and mobile application testing (Appium).
        </p>
        <p className="aeo-direct-answer-supporting">
          He holds a Bachelor of Engineering in Information Technology from the University of Pune and a professional
          Software Development Engineer in Test (SDET) certification from SEED Infotech Pune.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Fact Statement</span>
        &ldquo;Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, Maharashtra, India,
        specializing in web, mobile, API, automation and performance testing. His testing frameworks incorporate
        Selenium WebDriver with Java, TestNG, Cucumber BDD, and Playwright with TypeScript.&rdquo;
      </blockquote>

      {/* Engineering Philosophy */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Microscope size={22} className="text-cyan-400" aria-hidden="true" />
          Testing Philosophy: Quality as a Core Architecture
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <div className="feature-card-header">
              <span className="feature-card-icon">
                <CheckCircle2 size={18} />
              </span>
              <h3 className="feature-card-title">Preventing Defects Early</h3>
            </div>
            <p className="feature-card-desc">
              Testing is not an afterthought run just before release. By participating in sprint requirement grooming,
              writing test matrices early, and catching edge cases during API contract definition, defects are mitigated
              before reaching production code.
            </p>
          </div>

          <div className="feature-glass-card">
            <div className="feature-card-header">
              <span className="feature-card-icon">
                <Workflow size={18} />
              </span>
              <h3 className="feature-card-title">Automation for Repeatability</h3>
            </div>
            <p className="feature-card-desc">
              Manual exploratory testing explores user risk, while automated test suites ensure repeatable regression
              safety. Designing scalable Page Object Model (POM) architectures with Selenium and Playwright allows
              continuous validation across every pull request.
            </p>
          </div>
        </div>
      </section>

      {/* Education & Verified Credentials */}
      <section className="content-section">
        <h2 className="content-section-title">
          <GraduationCap size={22} className="text-indigo-400" aria-hidden="true" />
          Education &amp; Professional Credentials
        </h2>
        <div className="content-grid-3">
          <div className="feature-glass-card">
            <div className="feature-card-header">
              <span className="feature-card-icon">
                <GraduationCap size={18} />
              </span>
              <h3 className="feature-card-title">B.E. Information Technology</h3>
            </div>
            <p className="feature-card-desc">
              <strong>University of Pune</strong> (Savitribai Phule Pune University). Built foundational knowledge in
              computer systems, relational databases (SQL), data structures, operating systems, and software
              engineering lifecycles.
            </p>
          </div>

          <div className="feature-glass-card">
            <div className="feature-card-header">
              <span className="feature-card-icon">
                <Award size={18} />
              </span>
              <h3 className="feature-card-title">SDET Professional Certification</h3>
            </div>
            <p className="feature-card-desc">
              <strong>SEED Infotech Pune</strong>. Comprehensive hands-on program covering Core Java, Selenium
              WebDriver, TestNG, Cucumber BDD framework architecture, Page Object Model design, and CI/CD pipelines.
            </p>
          </div>

          <div className="feature-glass-card">
            <div className="feature-card-header">
              <span className="feature-card-icon">
                <ShieldCheck size={18} />
              </span>
              <h3 className="feature-card-title">Salesforce Accredited Professional</h3>
            </div>
            <p className="feature-card-desc">
              <strong>Salesforce Trailhead</strong> (
              <a
                href="https://trailblazer.me/id/shashankshinde"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                trailblazer.me/id/shashankshinde
              </a>
              ). Platform configuration, data validation rules, security governance, and role permissions testing.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Links to Deeper Architecture */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Layers size={22} className="text-violet-400" aria-hidden="true" />
          Explore Shashank&apos;s Engineering Work
        </h2>
        <div className="content-grid-3">
          <Link href="/experience" className="feature-glass-card hover:border-indigo-500">
            <h3 className="feature-card-title text-indigo-300">Professional Experience →</h3>
            <p className="feature-card-desc">
              Detailed breakdown of QA roles, client project delivery, and testing processes at Profcyma Solutions.
            </p>
          </Link>

          <Link href="/skills" className="feature-glass-card hover:border-cyan-500">
            <h3 className="feature-card-title text-cyan-300">Technical QA Skills →</h3>
            <p className="feature-card-desc">
              Deep dive into Selenium, Playwright, Postman API validation, Apache JMeter load tests, and Appium.
            </p>
          </Link>

          <Link href="/projects" className="feature-glass-card hover:border-emerald-500">
            <h3 className="feature-card-title text-emerald-300">Case Studies &amp; Evidence →</h3>
            <p className="feature-card-desc">
              Real defect discoveries, reproduction assertion snippets, and verified test outcomes.
            </p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
