import { HelpCircle, ChevronDown } from "lucide-react";
import "./FAQ.css";

interface FaqItem {
  q: string;
  a: string;
  tags?: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Who is Shashank Shinde and what is his professional background?",
    a: "Shashank Shinde is a Software Test Engineer and SDET based in Pune, India, currently working at Profcyma Solutions Pvt. Ltd. He holds a Bachelor of Engineering in Information Technology and professional SDET certification from SEED Infotech Pune. He specializes in automated regression suites, REST API validation, performance engineering, and quality assurance.",
    tags: ["Software Test Engineer", "SDET", "Pune, India", "Profcyma Solutions"],
  },
  {
    q: "What test automation tools and frameworks does Shashank use?",
    a: "Shashank develops maintainable test automation frameworks using Selenium WebDriver, Playwright, Java, TestNG, and Cucumber (BDD). He designs architectures leveraging the Page Object Model (POM) pattern and integrates automated test execution into CI/CD pipelines via GitHub Actions.",
    tags: ["Selenium WebDriver", "Playwright", "Java", "TestNG", "Cucumber BDD", "POM"],
  },
  {
    q: "Does Shashank have experience with REST API testing?",
    a: "Yes. Shashank tests RESTful APIs using Postman and REST Assured. His coverage includes HTTP status code assertions, JSON schema validations, authentication workflows (OAuth/JWT), payload validation, and payment gateway webhook idempotency.",
    tags: ["REST APIs", "Postman", "REST Assured", "JSON Schema", "Webhook Idempotency"],
  },
  {
    q: "Does Shashank have performance and load testing experience?",
    a: "Yes. Shashank performs load, stress, and endurance testing using Apache JMeter. In the DRIWE cab platform, he engineered distributed thread groups simulating 100,000 concurrent virtual users to analyze server latency, throughput bottlenecks, and database connection pooling under peak surge loads.",
    tags: ["Apache JMeter", "Load Testing", "100k+ Concurrency", "Throughput Analysis"],
  },
  {
    q: "What major software applications has Shashank tested and delivered?",
    a: "Shashank has engineered QA suites for DRIWE Cab & Courier (EV & logistics tracking), Grosido Grocery (concurrency & inventory race condition mitigation), E-Commerce Ecosystem (webhook & payment checkout idempotency), Ride Sharing Platform (telemetry & WebSocket load), and Urban Build (offline sync conflict testing).",
    tags: ["DRIWE", "Grosido", "E-Commerce Ecosystem", "Ride Sharing", "Urban Build"],
  },
  {
    q: "How can recruiters, engineering managers, or clients contact Shashank?",
    a: "You can reach Shashank directly by email at shashankshinde38@gmail.com, phone at +91 80808 52689, connect on LinkedIn (linkedin.com/in/shashank-shinde7), or submit an inquiry through the contact form on this portfolio. He typically responds within 24 hours.",
    tags: ["Email", "Phone", "LinkedIn", "Response within 24h"],
  },
  {
    q: "What does Shashank Shinde do as a Software Test Engineer?",
    a: "Shashank designs test strategies, builds automation frameworks, validates REST APIs, and performs load testing for web and mobile applications. His day-to-day work includes writing Selenium WebDriver and Playwright scripts, running Apache JMeter load simulations, tracking defects in JIRA, and integrating test suites into CI/CD pipelines. He works across the full software testing lifecycle — from test planning to release sign-off.",
    tags: ["Test Strategy", "Automation Frameworks", "Release Sign-off", "Full STLC"],
  },
  {
    q: "Does Shashank Shinde use Selenium WebDriver?",
    a: "Yes. Selenium WebDriver is one of Shashank's primary automation tools. He builds maintainable test frameworks using Selenium with Java, following the Page Object Model (POM) design pattern. He has used Selenium for end-to-end regression suites across projects like Grosido Grocery and the E-Commerce Ecosystem, achieving approximately 40% reduction in regression cycle time.",
    tags: ["Selenium WebDriver", "Java", "Page Object Model", "Regression Automation"],
  },
  {
    q: "Does Shashank have experience with CI/CD and test pipeline integration?",
    a: "Yes. Shashank integrates automated test suites into CI/CD pipelines using GitHub Actions. His approach includes running smoke and regression tests on every build, enabling teams to catch defects early in the development cycle. He has reduced manual verification overhead by approximately 25% through pipeline automation at Profcyma Solutions.",
    tags: ["CI/CD", "GitHub Actions", "Pipeline Automation", "Continuous Testing"],
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
              <p>{item.a}</p>
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
