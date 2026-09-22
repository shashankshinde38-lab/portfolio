import Link from "next/link";
import {
  BadgeCheck,
  ChevronDown,
  CircleHelp,
  HelpCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import "./FAQ.css";

interface FaqItem {
  q: string;
  directAnswer: string;
  detail: string;
  tags?: string[];
  link?: { text: string; href: string };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What does a Software Test Engineer do?",
    directAnswer:
      "A Software Test Engineer verifies that software systems meet functional, performance, and security requirements by designing test strategies, writing automated test suites, and discovering defects before code reaches production.",
    detail:
      "At Profcyma Solutions, Shashank manages quality across the full Software Testing Life Cycle (STLC) — from requirement analysis and test matrix authoring to automated regression pipeline gates, API contract verification, load testing, and release sign-off.",
    tags: [
      "Software Test Engineer",
      "Full STLC",
      "Quality Gates",
      "Defect Prevention",
    ],
    link: {
      text: "Read Shashank's full QA role & engineering track record",
      href: "/experience",
    },
  },
  {
    q: "What testing tools do I use?",
    directAnswer:
      "My everyday testing toolkit spans Selenium WebDriver, Playwright, Apache JMeter, Postman, Appium, TestNG, and JIRA.",
    detail:
      "For web UI automation, I use Selenium WebDriver with Java and Playwright with TypeScript. For performance and stress testing, I engineer distributed thread groups in Apache JMeter. For API testing, I rely on Postman and REST Assured. For mobile automation, I use Appium across Android real devices and emulators.",
    tags: [
      "Selenium WebDriver",
      "Playwright",
      "Apache JMeter",
      "Postman",
      "Appium",
      "JIRA",
    ],
    link: {
      text: "Explore complete QA technical skills & automation tools",
      href: "/skills",
    },
  },
  {
    q: "What automation frameworks do I work with?",
    directAnswer:
      "I design and maintain modular test automation frameworks based on the Page Object Model (POM) pattern using Selenium WebDriver with TestNG and Cucumber BDD.",
    detail:
      "These frameworks feature parallel test execution, data-driven test configurations, automated reporting, and headless execution integrated into CI/CD build pipelines using GitHub Actions.",
    tags: [
      "Page Object Model (POM)",
      "Cucumber BDD",
      "TestNG",
      "CI/CD Pipelines",
    ],
    link: {
      text: "Deep dive into Selenium WebDriver & POM framework architecture",
      href: "/skills/selenium-automation",
    },
  },
  {
    q: "What types of applications do I test?",
    directAnswer:
      "I test high-concurrency web platforms, multi-tenant mobile applications (Android), e-commerce marketplaces, and on-demand mobility systems.",
    detail:
      "Production systems tested include DRIWE Cab & Courier (real-time geolocation and surge pricing), Grosido (grocery cart inventory and checkout synchronization), an E-Commerce Ecosystem (multi-role customer, vendor, and delivery portals), and Urban Build (lead generation platform).",
    tags: [
      "E-Commerce",
      "Mobility & Logistics",
      "Android Apps",
      "Web Applications",
    ],
    link: {
      text: "Browse all 5 production software testing case studies",
      href: "/projects",
    },
  },
  {
    q: "How do I approach regression testing?",
    directAnswer:
      "I use a multi-tiered regression strategy combining an automated smoke suite on every pull request, scheduled nightly full regression runs, and risk-based exploratory testing around modified code paths.",
    detail:
      "By automating core user journeys with Selenium WebDriver and TestNG, I reduced regression cycle execution time by ~40% and cut manual test overhead by 25% across sprint deliveries.",
    tags: [
      "Regression Testing",
      "Automated Smoke Gates",
      "~40% Cycle Reduction",
      "Continuous Testing",
    ],
    link: {
      text: "Inspect Playwright E2E automation & regression workflows",
      href: "/skills/playwright-automation",
    },
  },
  {
    q: "What API testing experience do I have?",
    directAnswer:
      "I validate RESTful web APIs for HTTP response codes, JSON schema contract conformity, payload integrity, authentication tokens, and webhook idempotency.",
    detail:
      "Using Postman collections and REST Assured assertions, I test authentication flows (OAuth 2.0 / JWT), verify database state consistency via SQL, and validate payment gateway webhooks (Razorpay) to prevent race conditions and duplicate deductions.",
    tags: [
      "REST API Testing",
      "Postman",
      "JSON Schema",
      "Webhook Idempotency",
      "OAuth/JWT",
    ],
    link: {
      text: "Review REST API testing, Postman assertions & webhook validation",
      href: "/skills/api-testing",
    },
  },
  {
    q: "What performance testing tools do I use?",
    directAnswer:
      "I use Apache JMeter to conduct distributed load, stress, spike, and endurance performance testing under heavy concurrent traffic.",
    detail:
      "On the DRIWE mobility platform, I designed distributed JMeter thread groups simulating 100,000 concurrent virtual users to identify server latency thresholds, database connection pool bottlenecks, and API throughput limits under surge pricing conditions.",
    tags: [
      "Apache JMeter",
      "Performance Testing",
      "100k+ Concurrency",
      "Load & Stress Testing",
    ],
    link: {
      text: "Inspect Apache JMeter 100,000 user concurrency case study",
      href: "/skills/performance-testing",
    },
  },
  {
    q: "How can a recruiter contact me?",
    directAnswer:
      "Recruiters and hiring managers can reach me directly by email at shashankshinde38@gmail.com, phone at +91 80808 52689, or via LinkedIn at linkedin.com/in/shashank-shinde7.",
    detail:
      "I am based in Pune, India, open to Software Test Engineer, QA Engineer, and SDET opportunities, typically respond within 24 hours, and have a downloadable PDF resume available directly on this portfolio.",
    tags: [
      "Email",
      "Phone",
      "LinkedIn",
      "Resume Download",
      "24h Response",
    ],
    link: {
      text: "Jump to contact channels & recruiter information",
      href: "/#contact",
    },
  },
  {
    q: "Who is Shashank Shinde and what is his professional background?",
    directAnswer:
      "Shashank Shinde is a Software Test Engineer and SDET based in Pune, India, currently working at Profcyma Solutions Pvt. Ltd.",
    detail:
      "He holds a Bachelor of Engineering in Information Technology and completed professional SDET certification at SEED Infotech Pune. He has built automated regression suites, validated critical API endpoints, and led load simulations across multiple production client deployments.",
    tags: [
      "Shashank Shinde",
      "Profcyma Solutions",
      "SEED Infotech SDET",
      "B.E. IT",
    ],
    link: {
      text: "Read Shashank's full biography, education & testing certifications",
      href: "/about",
    },
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section section-lined faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="faq-container">
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="faq-section-heading">
          <div className="faq-heading-copy">
            <div className="faq-kicker">
              <span
                className="faq-kicker-icon"
                aria-hidden="true"
              >
                <CircleHelp
                  size={16}
                  strokeWidth={1.8}
                />
              </span>

              <span>
                AEO &amp; QA INSIGHTS
              </span>
            </div>

            <h2 id="faq-heading">
              <span className="faq-title-label">
                Questions &amp; Answers
              </span>

              <span className="faq-title-main">
                Clear answers.
              </span>

              <span className="faq-title-accent">
                High-trust engineering.
              </span>
            </h2>
          </div>

          {/* =================================================
              RIGHT INTRO CARD
          ================================================= */}

          <div className="faq-heading-side">
            <span
              className="faq-heading-side-icon"
              aria-hidden="true"
            >
              <Sparkles size={16} />
            </span>

            <div>
              <strong>
                QA Knowledge Base
              </strong>

              <p>
                Direct answers about my testing experience,
                automation stack, API validation,
                performance engineering and professional
                background.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            STATUS / CONTEXT BAR
        ===================================================== */}

        <div className="faq-status-bar">
          <div className="faq-status-left">
            <span className="faq-status-pill">
              <span
                className="faq-status-dot"
                aria-hidden="true"
              />

              QA KNOWLEDGE ACTIVE
            </span>

            <span className="faq-status-copy">
              <SearchCheck
                size={13}
                aria-hidden="true"
              />

              Direct answers · Supporting context · Technical topics
            </span>
          </div>

          <div className="faq-status-right">
            <ShieldCheck
              size={14}
              aria-hidden="true"
            />

            <span>
              Structured for quick understanding
            </span>
          </div>
        </div>

        {/* =====================================================
            FAQ LIST
        ===================================================== */}

        <div className="faq-grid">
          {FAQ_ITEMS.map(
            (item, index) => (
              <details
                className="faq-item"
                key={item.q}
                open
              >
                <summary className="faq-question">
                  <span className="faq-question-left">
                    <span
                      className="faq-question-icon"
                      aria-hidden="true"
                    >
                      <HelpCircle
                        size={16}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="faq-question-copy">
                      <span className="faq-question-meta">
                        QUESTION{" "}
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <h3 className="faq-question-text">
                        {item.q}
                      </h3>
                    </span>
                  </span>

                  <span className="faq-question-actions">
                    <span className="faq-answer-status">
                      <BadgeCheck
                        size={12}
                        aria-hidden="true"
                      />

                      ANSWERED
                    </span>

                    <span
                      className="faq-chevron-wrap"
                      aria-hidden="true"
                    >
                      <ChevronDown
                        size={16}
                        className="faq-chevron"
                      />
                    </span>
                  </span>
                </summary>

                <div className="faq-answer">
                  {/* =========================================
                      DIRECT ANSWER
                  ========================================= */}

                  <div className="faq-direct-answer-box">
                    <div className="faq-direct-answer-heading">
                      <span
                        className="faq-direct-answer-dot"
                        aria-hidden="true"
                      />

                      <span>
                        Direct Answer:
                      </span>
                    </div>

                    <p className="faq-direct-answer">
                      {item.directAnswer}
                    </p>
                  </div>

                  {/* =========================================
                      SUPPORTING DETAIL
                  ========================================= */}

                  <div className="faq-supporting-block">
                    <span className="faq-supporting-label">
                      CONTEXT &amp; EXPERIENCE
                    </span>

                    <p className="faq-supporting-detail">
                      {item.detail}
                    </p>
                  </div>

                  {/* =========================================
                      EVIDENCE & CITATION LINK
                  ========================================= */}

                  {item.link && (
                    <div
                      className="faq-link-area"
                      style={{
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(110, 124, 251, 0.12)",
                      }}
                    >
                      <Link
                        href={item.link.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#93c5fd",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        <span>{item.link.text}</span>
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  )}

                  {/* =========================================
                      TAGS
                  ========================================= */}

                  {item.tags &&
                    item.tags.length >
                    0 && (
                      <div className="faq-tags-area">
                        <span className="faq-tags-label">
                          RELATED TOPICS
                        </span>

                        <div className="faq-tags-row">
                          {item.tags.map(
                            (tag) => (
                              <span
                                className="faq-tag"
                                key={tag}
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </details>
            )
          )}
        </div>

        {/* FAQPage JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQ_ITEMS.map((item) => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${item.directAnswer} ${item.detail}`,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}