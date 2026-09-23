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
    q: "Who is Shashank Shinde and what does he do?",
    directAnswer:
      "Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, Maharashtra, India. He specializes in automated web testing, mobile application QA, REST API validation, and performance load testing.",
    detail:
      "Working at Profcyma Solutions Pvt. Ltd., he manages quality across the full Software Testing Life Cycle (STLC) — from test strategy and test matrix design to automated regression pipeline gates, API schema validation, and 100,000-user distributed load simulations.",
    tags: [
      "Shashank Shinde",
      "Software Test Engineer",
      "QA Automation Engineer",
      "Pune, India",
    ],
    link: {
      text: "Read Shashank's full professional background & qualifications",
      href: "/about",
    },
  },
  {
    q: "What testing tools does Shashank Shinde use?",
    directAnswer:
      "Shashank Shinde uses Selenium WebDriver, Playwright, Apache JMeter, Postman, Appium, TestNG, and JIRA for comprehensive software quality assurance.",
    detail:
      "For web UI automation, he uses Selenium WebDriver with Java and Playwright with TypeScript. For performance and stress testing, he engineers distributed thread groups in Apache JMeter. For API validation, he relies on Postman and REST Assured assertions. For mobile QA, he uses Appium across physical Android devices and emulators.",
    tags: [
      "Selenium WebDriver",
      "Playwright",
      "Apache JMeter",
      "Postman",
      "Appium",
      "JIRA",
    ],
    link: {
      text: "Explore Shashank's complete QA skills & automation directory",
      href: "/skills",
    },
  },
  {
    q: "What Selenium automation experience does Shashank Shinde have?",
    directAnswer:
      "Shashank Shinde has hands-on experience designing modular Page Object Model (POM) test automation frameworks in Java using Selenium WebDriver and TestNG.",
    detail:
      "His Selenium frameworks incorporate dynamic explicit waits, TestNG parallel execution, data-driven test configurations, and Cucumber BDD integration. On the Grosido grocery platform, his automation framework reduced regression cycle execution time by ~40%.",
    tags: [
      "Selenium WebDriver",
      "Page Object Model (POM)",
      "TestNG",
      "Cucumber BDD",
      "~40% Regression Gain",
    ],
    link: {
      text: "Inspect Selenium WebDriver framework architecture & case studies",
      href: "/skills/selenium-automation",
    },
  },
  {
    q: "What Playwright testing experience does Shashank Shinde have?",
    directAnswer:
      "Shashank Shinde implements modern end-to-end browser automation suites using Playwright with TypeScript across Chromium, WebKit, and Firefox rendering engines.",
    detail:
      "His Playwright test suites leverage auto-waiting web-first assertions, isolated browser contexts for multi-role workflows, network request interception for backend validation, and Trace Viewer artifacts for rapid defect isolation without flaky sleep timeouts.",
    tags: [
      "Playwright",
      "TypeScript",
      "Auto-Waiting",
      "BrowserContext",
      "Trace Viewer",
    ],
    link: {
      text: "Inspect Playwright E2E browser automation & test execution",
      href: "/skills/playwright-automation",
    },
  },
  {
    q: "What API testing experience does Shashank Shinde have?",
    directAnswer:
      "Shashank Shinde validates RESTful web APIs for HTTP status codes, JSON schema contract conformity, payload integrity, authentication tokens, and webhook idempotency using Postman and REST Assured.",
    detail:
      "His API testing includes verifying authentication mechanisms (OAuth 2.0 / JWT), validating 20+ endpoints on platforms like the Ride Sharing Application, reconciling database states via SQL queries, and testing payment webhooks to prevent duplicate deductions.",
    tags: [
      "REST API Testing",
      "Postman",
      "JSON Schema",
      "Webhook Idempotency",
      "OAuth/JWT",
    ],
    link: {
      text: "Review REST API validation, Postman collections & webhook tests",
      href: "/skills/api-testing",
    },
  },
  {
    q: "How does Shashank Shinde use Apache JMeter for performance testing?",
    directAnswer:
      "Shashank Shinde uses Apache JMeter to conduct distributed load, stress, spike, and endurance performance testing for high-traffic web applications and REST APIs.",
    detail:
      "On the DRIWE mobility and logistics platform, he designed distributed JMeter thread groups simulating up to 100,000 concurrent virtual users to evaluate server response latencies (P99), throughput capacity, and database connection pool saturation under peak surge pricing.",
    tags: [
      "Apache JMeter",
      "Performance Testing",
      "100k+ Concurrency",
      "Load & Stress Testing",
    ],
    link: {
      text: "Inspect Apache JMeter 100,000 concurrent user performance case study",
      href: "/skills/performance-testing",
    },
  },
  {
    q: "What mobile testing experience does Shashank Shinde have?",
    directAnswer:
      "Shashank Shinde performs automated and manual mobile quality assurance for Android applications using Appium, Android SDK emulators, and physical devices.",
    detail:
      "His mobile QA covers screen resolution fragmentation, OS version differences, touch gestures, background lifecycle interrupts, and network throttling (3G, offline draft persistence). On the Urban Build platform, he diagnosed and resolved a rapid multi-tap duplicate lead submission bug.",
    tags: [
      "Appium",
      "Android Testing",
      "Device Fragmentation",
      "Network Throttling",
      "Mobile QA",
    ],
    link: {
      text: "Inspect Appium & Android mobile testing case studies",
      href: "/skills/mobile-testing",
    },
  },
  {
    q: "What QA projects and real-world case studies has Shashank Shinde worked on?",
    directAnswer:
      "Shashank Shinde has tested 5 major production platforms covering on-demand mobility, online grocery delivery, multi-role e-commerce marketplaces, ride sharing, and lead generation.",
    detail:
      "His verified case studies include DRIWE (100k-user JMeter load simulation), Grosido (Selenium POM regression cutting cycle time by ~40%), E-Commerce (cross-browser webhook idempotency), Ride Sharing (concurrency seat race condition), and Urban Build (mobile form debounce verification).",
    tags: [
      "DRIWE",
      "Grosido",
      "E-Commerce Ecosystem",
      "Ride Sharing",
      "Urban Build",
    ],
    link: {
      text: "Browse all 5 production QA case studies & defect reports",
      href: "/projects",
    },
  },
  {
    q: "How does Shashank Shinde approach regression testing and defect prevention?",
    directAnswer:
      "Shashank Shinde implements a multi-tiered quality strategy combining automated smoke gates on every pull request, scheduled nightly regression sweeps, and risk-based exploratory testing.",
    detail:
      "By participating early in sprint backlog grooming and automating high-risk user journeys in Selenium and Playwright, he prevents defects before release, reducing regression execution cycles by ~40% and cutting manual testing overhead by 25%.",
    tags: [
      "Regression Testing",
      "Automated Smoke Gates",
      "Early Defect Detection",
      "Quality Strategy",
    ],
    link: {
      text: "Read Shashank's STLC engineering processes & quality gates",
      href: "/experience",
    },
  },
  {
    q: "How can recruiters and engineering teams contact Shashank Shinde?",
    directAnswer:
      "Shashank Shinde can be reached directly via email at shashankshinde38@gmail.com, telephone at +91 80808 52689, or through LinkedIn at linkedin.com/in/shashank-shinde7.",
    detail:
      "Based in Pune, Maharashtra, India, he is available for Software Test Engineer, QA Automation Engineer, and SDET opportunities, typically responds within 24 hours, and offers a verified downloadable PDF resume on his portfolio.",
    tags: [
      "Email",
      "Phone",
      "LinkedIn",
      "Resume Download",
      "Pune, India",
    ],
    link: {
      text: "Open contact form and direct communication channels",
      href: "/#contact",
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