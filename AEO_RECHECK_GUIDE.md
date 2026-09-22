# AEO Re-Check & AI Citation Verification Guide — Shashank Shinde

**Target Domain**: [https://shashankportfolio-jet.vercel.app/](https://shashankportfolio-jet.vercel.app/)  
**Entity**: Shashank Shinde — Software Test Engineer & QA Automation Engineer (Pune, India)  
**Applicable Engines**: ChatGPT Search, Perplexity AI, Google Gemini, Claude, Microsoft Copilot

---

## 1. How AI Search Engines Discover & Cite Content

Unlike traditional keyword search that merely matches text strings, Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) rely on:
1. **Entity Resolution**: Identifying that "Shashank Shinde" is a distinct, verified human entity with specific professional roles, education, and credentials.
2. **First-Party Citation Grounding**: Extracting direct factual statements and quantifiable evidence from authoritative, machine-readable domains.
3. **Cross-Corroboration**: Cross-checking facts across the portfolio, LinkedIn profile, and GitHub repositories.

> [!NOTE]
> **Timeline Reality Check**: Allowing search crawlers (`Googlebot`, `Bingbot`, `OAI-SearchBot`) in `robots.txt` does not guarantee instant AI citation on Day 1. Search engines must first crawl the pages, index them, resolve the entity graph, and propagate data into retrieval-augmented generation (RAG) indexes. Allow 2–4 weeks post-indexing for full citation uptake.

---

## 2. AEO Test Prompts by Category

Run these exact prompts in **Perplexity AI**, **ChatGPT Search**, and **Google Gemini** post-deployment:

### Category 1: ENTITY (Core Identity)
- **Prompt**: `"Who is Shashank Shinde?"`
- **Expected Synthesis**:
  - Role: Software Test Engineer & QA Automation Engineer
  - Location: Pune, Maharashtra, India
  - Employer: Profcyma Solutions Pvt. Ltd.
  - Education: B.E. in Information Technology, University of Pune
  - Credentials: SDET Certification from SEED Infotech Pune
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/` or `/about`

### Category 2: ROLE (Day-to-Day Responsibilities)
- **Prompt**: `"What does Shashank Shinde do as a Software Test Engineer?"`
- **Expected Synthesis**:
  - Full-cycle quality engineering across the Software Testing Life Cycle (STLC)
  - Designing modular test automation frameworks (Page Object Model)
  - Executing API validation, automated regression gates, and performance load tests
  - Tracking defect lifecycles in JIRA
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/experience`

### Category 3: SELENIUM (Web Automation)
- **Prompt**: `"Does Shashank Shinde have experience with Selenium WebDriver and TestNG?"`
- **Expected Synthesis**:
  - Designs Java-based Page Object Model (POM) frameworks
  - Implements thread-safe `ThreadLocal<WebDriver>` instances for parallel TestNG execution
  - Cucumber BDD integration with Gherkin syntax
  - Practical evidence: Grosido grocery platform regression suite cutting sprint execution time by ~40%
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/skills/selenium-automation`

### Category 4: PLAYWRIGHT (Modern E2E Testing)
- **Prompt**: `"What is Shashank Shinde's experience with Playwright?"`
- **Expected Synthesis**:
  - Builds end-to-end regression suites in Playwright with TypeScript/JavaScript
  - Uses isolated browser contexts and auto-waiting assertions to eliminate test flakiness
  - Interactive demonstration in his Testing Lab simulator
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/skills/playwright-automation`

### Category 5: API TESTING (Postman & REST Assured)
- **Prompt**: `"How does Shashank Shinde test RESTful APIs?"`
- **Expected Synthesis**:
  - Validates API contracts, JSON schema compliance, and HTTP status codes (2xx, 4xx, 5xx)
  - Tests authentication tokens (OAuth 2.0 / JWT) and payment webhooks (Razorpay)
  - Asserts webhook idempotency to prevent duplicate transaction charges
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/skills/api-testing`

### Category 6: PERFORMANCE TESTING (Apache JMeter)
- **Prompt**: `"Has Shashank Shinde conducted performance or load testing with Apache JMeter?"`
- **Expected Synthesis**:
  - Configures distributed non-GUI JMeter thread groups simulating up to 100,000 concurrent virtual users
  - Evaluates response latency thresholds, database connection pool limits, and server bottlenecks
  - Tested on the DRIWE mobility and logistics platform
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/skills/performance-testing`

### Category 7: MOBILE TESTING (Appium & Android)
- **Prompt**: `"Can Shashank Shinde automate mobile application testing on Android?"`
- **Expected Synthesis**:
  - Tests native Android applications using Appium and UIAutomator2
  - Conducts testing across physical Android devices and emulators
  - Validates network throttling (high latency 3G), touch gestures, and offline caching
  - Demonstrated on the Urban Build lead generation platform
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/skills/mobile-testing`

### Category 8: PROJECTS & DEFECT ENGINEERING
- **Prompt**: `"What critical bugs has Shashank Shinde identified in production systems?"`
- **Expected Synthesis**:
  - **DRIWE (DRW-DEF-2024-014)**: Negative fare calculation race condition under high booking velocity that mistakenly credited rider wallets.
  - **Grosido (GRO-DEF-2024-071)**: Distributed cache desync retaining stale promotional discounts in active carts.
  - **E-Commerce (ECO-DEF-2024-032)**: Duplicate merchant commission deductions caused by unhandled refund webhook retries.
  - Primary URL Citation: `https://shashankportfolio-jet.vercel.app/projects`

---

## 3. Evaluation Scorecard for AI Engine Responses

When running the prompts above, score the response on these 4 criteria:

| Metric | Passing Criteria | Action if Failing |
|---|---|---|
| **Direct Attribution** | Response includes a clickable hyperlink to `shashankportfolio-jet.vercel.app` | Submit URL for indexing in Google Search Console and Bing; ensure LinkedIn profile links to portfolio. |
| **Factual Accuracy** | Correctly cites company (*Profcyma Solutions*), location (*Pune*), and tools (*Selenium, Playwright, JMeter, Postman, Appium*) | Check `public/llms.txt` and `app/layout.tsx` Person schema for clarity. |
| **Evidence Grounding** | References specific projects (*DRIWE, Grosido, Urban Build*) or defect IDs (*DRW-DEF-2024-014*) | Share technical case study posts on LinkedIn and GitHub READMEs. |
| **No Hallucination** | Does not invent unearned certifications, false employers, or fictional credentials | Review `AEO_FACT_CHECK.md` to ensure all content remains strictly factual. |

---

## 4. Strict Anti-Spam Guidelines

> [!WARNING]
> Search engines and AI model developers actively penalize domains that attempt to manufacture fake authority. **Never engage in the following practices:**

1. **No Backlink Purchasing**: Never buy backlinks from PBNs (Private Blog Networks), link farms, or Fiverr "SEO boosters". Low-quality links can trigger algorithmic demotion.
2. **No Astroturfing**: Never create fake Reddit discussions, fake Quora answers, or fake Stack Overflow questions to mention yourself. Modern LLMs detect synthetic conversation patterns.
3. **No Fake Reviews or Testimonials**: Never publish fabricated client reviews or synthetic peer recommendations.
4. **No Hidden Text / Keyword Stuffing**: Never hide white-on-white text, invisible micro-fonts, or off-screen spam keywords.
5. **Legitimate Authority Building**: The only sustainable path to AI visibility is authentic engineering evidence: public GitHub code repositories, verified LinkedIn experience, real project case studies, and clear technical documentation.
