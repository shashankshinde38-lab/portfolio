import Link from "next/link";
import { ChevronDown } from "lucide-react";
import JsonLd from "@/web/seo/JsonLd";
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
      href: "/contact",
    },
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-container">
        <header className="faq-section-heading">
          <p className="faq-eyebrow">Questions &amp; answers</p>
          <h2 id="faq-heading">
            Clear answers. <em>High-trust engineering.</em>
          </h2>
        </header>

        <div className="faq-grid">
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.q} className="faq-item" open={index === 0}>
              <summary className="faq-question">
                <span>{item.q}</span>
                <ChevronDown size={20} className="faq-chevron" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p className="faq-direct-answer">{item.directAnswer}</p>
                <p>{item.detail}</p>
                {item.link && (
                  <Link href={item.link.href} className="faq-answer-link" prefetch={false}>
                    {item.link.text}
                  </Link>
                )}
                {item.tags && item.tags.length > 0 && (
                  <ul className="faq-tags" aria-label="Related topics">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>

        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${item.directAnswer} ${item.detail}`,
            },
          })),
        }} />
      </div>
    </section>
  );
}
