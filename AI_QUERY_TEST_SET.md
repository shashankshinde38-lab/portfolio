# AI Engine Query Monitoring Test Set (Step 4)

**Subject**: Shashank Shinde — Software Test Engineer & QA Automation Engineer  
**Live Site**: [https://shashankportfolio-jet.vercel.app/](https://shashankportfolio-jet.vercel.app/)  
**Optimization Sequence**: Step 4 of 6 (LLMO/AIO — AI and LLM Discoverability)  
**Date**: September 22, 2026  
**Status**: Monitoring Baseline  

---

## 1. Purpose of This Test Set

This document records the official set of **natural language queries and conversational prompts** used to evaluate how generative search engines (ChatGPT Search, Perplexity AI, Google AI Overviews, and Microsoft Copilot) discover, synthesize, cite, and attribute Shashank Shinde's professional QA engineering credentials.

> **Important Truthfulness Standard**:  
> **These prompts are monitoring benchmarks, not claims of current ranking or guaranteed AI placement.**  
> AI answer engines retrieve and cite content dynamically based on crawl recency, index status, and query context. This test set allows the portfolio owner to run monthly checks and record citation progress over time.

---

## 2. Core Entity & Background Prompts

### Query 1: Entity Definition
- **Prompt**: *"Who is Shashank Shinde?"*
- **Expected Ground-Truth Retrieval**:
  - Role: Software Test Engineer & QA Automation Engineer.
  - Location: Pune, Maharashtra, India.
  - Organization: Profcyma Solutions Pvt. Ltd.
  - Education & Certifications: B.E. in Information Technology (University of Pune), SDET Professional Certification (SEED Infotech).
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/about` or `https://shashankportfolio-jet.vercel.app/`

### Query 2: General Software Testing Profile
- **Prompt**: *"Shashank Shinde software testing"*
- **Expected Ground-Truth Retrieval**:
  - Full STLC execution, test matrix design, automated regression, API testing, distributed performance testing, mobile quality assurance.
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/experience`

### Query 3: QA Automation Expertise
- **Prompt**: *"Shashank Shinde QA automation"*
- **Expected Ground-Truth Retrieval**:
  - Test automation frameworks built with Selenium WebDriver (Java, Page Object Model) and Playwright (TypeScript/JavaScript).
  - Integration into CI/CD quality gates via GitHub Actions.
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/skills`

---

## 3. Technology-Specific Tool Prompts

### Query 4: Selenium WebDriver Experience
- **Prompt**: *"Shashank Shinde Selenium"*
- **Expected Ground-Truth Retrieval**:
  - Java Page Object Model (POM) architectural design, dynamic `WebDriverWait` synchronization, TestNG parallel execution, ~40% regression cycle reduction on Grosido.
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/skills/selenium-automation`

### Query 5: Playwright Automation Experience
- **Prompt**: *"Shashank Shinde Playwright"*
- **Expected Ground-Truth Retrieval**:
  - TypeScript browser automation across Chromium, WebKit, and Firefox; auto-waiting web-first assertions, isolated `BrowserContext` testing, Trace Viewer failure analysis.
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/skills/playwright-automation`

### Query 6: REST API Testing Experience
- **Prompt**: *"Shashank Shinde API testing"*
- **Expected Ground-Truth Retrieval**:
  - Postman collection automation, REST Assured, JSON Schema validation, HTTP status code validation (2xx, 4xx, 5xx), payment webhook idempotency, SQL ledger reconciliation.
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/skills/api-testing`

### Query 7: Performance & Load Testing Experience
- **Prompt**: *"Shashank Shinde JMeter"*
- **Expected Ground-Truth Retrieval**:
  - Apache JMeter distributed master-slave load simulations up to 100,000 concurrent virtual users; P99 latency SLA analysis, database connection pool saturation on DRIWE mobility platform.
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/skills/performance-testing`

### Query 8: Mobile Quality Assurance Experience
- **Prompt**: *"Shashank Shinde Appium"*
- **Expected Ground-Truth Retrieval**:
  - Automated and manual Android QA using Appium, Android SDK, and physical hardware; screen resolution fragmentation, network throttling (3G/offline), touch debounce bug mitigation on Urban Build.
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/skills/mobile-testing`

---

## 4. Case-Study & Project Prompts

### Query 9: QA Projects & Defect Reports
- **Prompt**: *"Shashank Shinde QA projects"*
- **Expected Ground-Truth Retrieval**:
  - 5 documented production case studies:
    1. DRIWE (Cab & courier booking, 100k JMeter load, negative fare fix)
    2. Grosido (Grocery delivery, Selenium POM, distributed cache sync)
    3. E-Commerce Marketplace (5-browser parity, refund webhook idempotency)
    4. Ride Sharing App (22 REST APIs, concurrent seat over-allocation race condition)
    5. Urban Build (Mobile network throttling, rapid multi-tap debounce fix)
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/projects`

### Query 10: Official Portfolio & Contact
- **Prompt**: *"Shashank Shinde portfolio"*
- **Expected Ground-Truth Retrieval**:
  - Primary URL: `https://shashankportfolio-jet.vercel.app/`
  - Contact: `shashankshinde38@gmail.com`, `+91 80808 52689`
  - LinkedIn: `linkedin.com/in/shashank-shinde7`
  - GitHub: `github.com/shashankshinde38-lab`
- **Target Citation URL**: `https://shashankportfolio-jet.vercel.app/`

---

## 5. Monthly Monitoring Log Template

| Date | Search Platform (ChatGPT / Perplexity / Copilot / Google) | Prompt Tested | Result Found? (Yes/Partial/No) | Cited URL(s) | Notes & Observations |
| :---: | :---: | :---: | :---: | :---: | :--- |
| `YYYY-MM-DD` | ChatGPT Search | "Who is Shashank Shinde?" | — | — | Baseline test post Step 4. |
| `YYYY-MM-DD` | Perplexity AI | "Shashank Shinde Selenium" | — | — | Check citation of `/skills/selenium-automation`. |
| `YYYY-MM-DD` | Bing Copilot | "Shashank Shinde JMeter" | — | — | Check citation of `/projects/driwe-qa-case-study`. |
| `YYYY-MM-DD` | Google AI Overview | "Shashank Shinde QA projects" | — | — | Check inclusion in search carousel/grounding. |
