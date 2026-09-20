import { HelpCircle, ChevronDown } from "lucide-react";
import "./FAQ.css";

interface FaqItem {
  q: string;
  directAnswer: string;
  detail: string;
  tags?: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What does a Software Test Engineer do?",
    directAnswer:
      "A Software Test Engineer verifies that software systems meet functional, performance, and security requirements by designing test strategies, writing automated test suites, and discovering defects before code reaches production.",
    detail:
      "At Profcyma Solutions, Shashank manages quality across the full Software Testing Life Cycle (STLC) — from requirement analysis and test matrix authoring to automated regression pipeline gates, API contract verification, load testing, and release sign-off.",
    tags: ["Software Test Engineer", "Full STLC", "Quality Gates", "Defect Prevention"],
  },
  {
    q: "What testing tools do I use?",
    directAnswer:
      "My everyday testing toolkit spans Selenium WebDriver, Playwright, Apache JMeter, Postman, Appium, TestNG, and JIRA.",
    detail:
      "For web UI automation, I use Selenium WebDriver with Java and Playwright with TypeScript. For performance and stress testing, I engineer distributed thread groups in Apache JMeter. For API testing, I rely on Postman and REST Assured. For mobile automation, I use Appium across Android real devices and emulators.",
    tags: ["Selenium WebDriver", "Playwright", "Apache JMeter", "Postman", "Appium", "JIRA"],
  },
  {
    q: "What automation frameworks do I work with?",
    directAnswer:
      "I design and maintain modular test automation frameworks based on the Page Object Model (POM) pattern using Selenium WebDriver with TestNG and Cucumber BDD.",
    detail:
      "These frameworks feature parallel test execution, data-driven test configurations, automated reporting, and headless execution integrated into CI/CD build pipelines using GitHub Actions.",
    tags: ["Page Object Model (POM)", "Cucumber BDD", "TestNG", "CI/CD Pipelines"],
  },
  {
    q: "What types of applications do I test?",
    directAnswer:
      "I test high-concurrency web platforms, multi-tenant mobile applications (Android), e-commerce marketplaces, and on-demand mobility systems.",
    detail:
      "Production systems tested include DRIWE Cab & Courier (real-time geolocation and surge pricing), Grosido (grocery cart inventory and checkout synchronization), an E-Commerce Ecosystem (multi-role customer, vendor, and delivery portals), and Urban Build (lead generation platform).",
    tags: ["E-Commerce", "Mobility & Logistics", "Android Apps", "Web Applications"],
  },
  {
    q: "How do I approach regression testing?",
    directAnswer:
      "I use a multi-tiered regression strategy combining an automated smoke suite on every pull request, scheduled nightly full regression runs, and risk-based exploratory testing around modified code paths.",
    detail:
      "By automating core user journeys with Selenium WebDriver and TestNG, I reduced regression cycle execution time by ~40% and cut manual test overhead by 25% across sprint deliveries.",
    tags: ["Regression Testing", "Automated Smoke Gates", "~40% Cycle Reduction", "Continuous Testing"],
  },
  {
    q: "What API testing experience do I have?",
    directAnswer:
      "I validate RESTful web APIs for HTTP response codes, JSON schema contract conformity, payload integrity, authentication tokens, and webhook idempotency.",
    detail:
      "Using Postman collections and REST Assured assertions, I test authentication flows (OAuth 2.0 / JWT), verify database state consistency via SQL, and validate payment gateway webhooks (Razorpay) to prevent race conditions and duplicate deductions.",
    tags: ["REST API Testing", "Postman", "JSON Schema", "Webhook Idempotency", "OAuth/JWT"],
  },
  {
    q: "What performance testing tools do I use?",
    directAnswer:
      "I use Apache JMeter to conduct distributed load, stress, spike, and endurance performance testing under heavy concurrent traffic.",
    detail:
      "On the DRIWE mobility platform, I designed distributed JMeter thread groups simulating 100,000 concurrent virtual users to identify server latency thresholds, database connection pool bottlenecks, and API throughput limits under surge pricing conditions.",
    tags: ["Apache JMeter", "Performance Testing", "100k+ Concurrency", "Load & Stress Testing"],
  },
  {
    q: "How can a recruiter contact me?",
    directAnswer:
      "Recruiters and hiring managers can reach me directly by email at shashankshinde38@gmail.com, phone at +91 80808 52689, or via LinkedIn at linkedin.com/in/shashank-shinde7.",
    detail:
      "I am based in Pune, India, open to Software Test Engineer, QA Engineer, and SDET opportunities, typically respond within 24 hours, and have a downloadable PDF resume available directly on this portfolio.",
    tags: ["Email", "Phone", "LinkedIn", "Resume Download", "24h Response"],
  },
  {
    q: "Who is Shashank Shinde and what is his professional background?",
    directAnswer:
      "Shashank Shinde is a Software Test Engineer and SDET based in Pune, India, currently working at Profcyma Solutions Pvt. Ltd.",
    detail:
      "He holds a Bachelor of Engineering in Information Technology and completed professional SDET certification at SEED Infotech Pune. He has built automated regression suites, validated critical API endpoints, and led load simulations across multiple production client deployments.",
    tags: ["Shashank Shinde", "Profcyma Solutions", "SEED Infotech SDET", "B.E. IT"],
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section section-lined page-container" aria-labelledby="faq-heading">
      <div className="section-heading section-heading-split">
        <div>
          <span className="eyebrow">AEO &amp; QA INSIGHTS</span>
          <h2 id="faq-heading">
            <span className="section-title-label">Questions &amp; Answers</span>
            Clear answers.
            <br />
            <span>High-trust engineering.</span>
          </h2>
        </div>
        <p>
          Direct answers to common questions about my software testing expertise,
          <br />
          automation toolsets, API validations, and engineering background.
        </p>
      </div>

      <div className="faq-grid">
        {FAQ_ITEMS.map((item) => (
          <details className="faq-item surface-glass" key={item.q} open>
            <summary className="faq-question">
              <span className="faq-question-title">
                <HelpCircle size={16} className="faq-icon" aria-hidden="true" />
                <h3 className="faq-question-text">{item.q}</h3>
              </span>
              <ChevronDown size={16} className="faq-chevron" aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <p className="faq-direct-answer">
                <strong className="faq-answer-lead">Direct Answer:</strong> {item.directAnswer}
              </p>
              <p className="faq-supporting-detail">{item.detail}</p>
              {item.tags && (
                <div className="faq-tags-row">
                  {item.tags.map((tag) => (
                    <span className="faq-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
