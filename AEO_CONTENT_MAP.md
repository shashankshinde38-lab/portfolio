# AEO Content Architecture Map (Step 2)

**Subject**: Shashank Shinde — Software Test Engineer & QA Automation Engineer  
**Live Site**: [https://shashankportfolio-jet.vercel.app/](https://shashankportfolio-jet.vercel.app/)  
**Optimization Sequence**: Step 2 of 6 (Answer Engine Optimization)  
**Date**: September 22, 2026  
**Status**: `STEP_2_AEO: COMPLETE`  

---

## 1. Executive Overview

This document records the exact mapping between **user and AI answer engine queries** (Google AI Overviews, Perplexity, ChatGPT Search, Bing Copilot) and the **verified direct answers, supporting evidence, DOM locations, and internal citation links** across Shashank Shinde's portfolio.

All answers follow the **Answer-First** principle:
1. Immediate concise direct statement directly addressing the question.
2. Factually supported technical elaboration without unverified superlatives or marketing filler.
3. Concrete evidence from documented client projects and case studies.
4. Crawlable internal HTML link pointing to deep technical proof.
5. Strict adherence to `AEO_FACT_CHECK.md` (no unconfirmed aggregate statistics).

---

## 2. Core Entity & Technical Q&A Mapping Matrix

| # | Target Question | Primary Answer Location | Supporting Page / Section | Concrete Evidence | Internal Citation Link | Factual Status |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Who is Shashank Shinde?** | Homepage Hero (`#home`), About Section (`#about`), FAQ Item 1 | `/about` (Entity Bio), `app/layout.tsx` (Person Schema) | B.E. in Information Technology (Univ of Pune), SDET Certification (SEED Infotech), Software Test Engineer at Profcyma Solutions | [`/about`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/about/page.tsx) | Verified Fact |
| **2** | **What does Shashank Shinde do?** | Homepage Hero (`#home`), FAQ Item 1, Experience (`#experience`) | `/experience` (Full STLC & Quality Gates) | Full STLC ownership: test matrix design, automated regression pipeline gates, API schema validation, and 100k-user JMeter load simulations | [`/experience`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/experience/page.tsx) | Verified Fact |
| **3** | **What testing tools does Shashank Shinde use?** | Hero Toolkit Strip, FAQ Item 2, Skills Hub (`#skills`) | `/skills` (Core Testing Stack Directory) | Selenium WebDriver, Playwright, Apache JMeter, Postman, Appium, TestNG, JIRA, SQL, Git, GitHub Actions | [`/skills`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/page.tsx) | Verified Fact |
| **4** | **What Selenium automation experience does Shashank Shinde have?** | FAQ Item 3, Skills Deep Dive | `/skills/selenium-automation`, `/projects/grosido-qa-case-study` | Java Page Object Model (POM), TestNG parallel execution, Cucumber BDD, dynamic waits; ~40% regression cycle time reduction on Grosido | [`/skills/selenium-automation`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/selenium-automation/page.tsx) | Verified Fact |
| **5** | **What Playwright testing experience does Shashank Shinde have?** | FAQ Item 4, Skills Deep Dive, Testing Lab (`#simulator`) | `/skills/playwright-automation`, Testing Lab Runner | Playwright with TypeScript across Chromium, WebKit, and Firefox; auto-waiting assertions, isolated browser contexts, Trace Viewer triage | [`/skills/playwright-automation`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/playwright-automation/page.tsx) | Verified Fact |
| **6** | **What API testing experience does Shashank Shinde have?** | FAQ Item 5, Skills Deep Dive | `/skills/api-testing`, `/projects/ride-sharing-testing-case-study` | RESTful API validation for status codes (2xx, 4xx, 5xx), JSON Schema conformity, OAuth 2.0 / JWT tokens, webhook idempotency | [`/skills/api-testing`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/api-testing/page.tsx) | Verified Fact |
| **7** | **How does Shashank Shinde use Postman?** | FAQ Item 5, Skills Deep Dive | `/skills/api-testing`, `/projects/ride-sharing-testing-case-study` | Automated collection runs, JavaScript assertions, pre-request token generation, and SQL database state reconciliation across 20+ endpoints | [`/skills/api-testing`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/api-testing/page.tsx) | Verified Fact |
| **8** | **How does Shashank Shinde use Apache JMeter for performance testing?** | FAQ Item 6, Skills Deep Dive, Testing Lab (`#simulator`) | `/skills/performance-testing`, `/projects/driwe-qa-case-study` | Distributed load, stress, and spike testing; thread groups simulating up to 100,000 concurrent virtual users; P99 latency & throughput analysis | [`/skills/performance-testing`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/performance-testing/page.tsx) | Verified Fact |
| **9** | **What mobile testing experience does Shashank Shinde have?** | FAQ Item 7, Skills Deep Dive | `/skills/mobile-testing`, `/projects/urban-build-testing-case-study` | Appium on physical Android devices & emulators; screen fragmentation, touch gestures, network throttling (3G/offline), multi-tap debounce bug mitigation | [`/skills/mobile-testing`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/mobile-testing/page.tsx) | Verified Fact |
| **10** | **Which test automation frameworks does Shashank Shinde use?** | FAQ Items 3 & 4, Skills Hub | `/skills`, `/skills/selenium-automation`, `/skills/playwright-automation` | Modular Page Object Model (POM) with Selenium + TestNG + Java, Cucumber BDD framework, and TypeScript-based Playwright test runner | [`/skills/selenium-automation`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/selenium-automation/page.tsx) | Verified Fact |
| **11** | **What types of applications has Shashank Shinde tested?** | FAQ Item 8, Projects Hub (`#cases`) | `/projects` (5 Case Studies) | On-demand mobility & logistics (DRIWE), online grocery delivery (Grosido), multi-role e-commerce marketplace, ride-sharing, contractor lead generation (Urban Build) | [`/projects`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/projects/page.tsx) | Verified Fact |
| **12** | **What real-world QA case studies are available?** | Projects Section (`#cases`), Projects Hub | `/projects`, 5 Dedicated Case Study Pages | DRIWE (100k-user JMeter load test), Grosido (POM regression), E-Commerce (webhook idempotency), Ride Sharing (seat race condition), Urban Build (debounce QA) | [`/projects`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/projects/page.tsx) | Verified Fact |
| **13** | **How does Shashank Shinde approach regression testing and defect prevention?** | FAQ Item 9, Experience Section (`#experience`) | `/experience` (Quality Gates & CI/CD Pipelines) | Multi-tiered strategy: automated smoke gate on every PR, nightly regression sweeps, early backlog grooming, ~40% cycle reduction, 25% overhead cut | [`/experience`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/experience/page.tsx) | Verified Fact |
| **14** | **How can recruiters and engineering teams contact Shashank Shinde?** | FAQ Item 10, Contact Section (`#contact`) | Homepage `#contact`, Footer | Email: `shashankshinde38@gmail.com`, Phone: `+91 80808 52689`, LinkedIn: `linkedin.com/in/shashank-shinde7`, Resume download | [`/#contact`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/page.tsx#contact) | Verified Fact |

---

## 3. Testing Lab Crawlable Context Integration

Answer engines require crawlable semantic markup around interactive JavaScript applications. The Testing Lab (`web/sections/Simulator/Simulator.tsx`) provides crawlable DOM statements:

1. **Test Runner Panel**:
   - **Heading (H3)**: `Playwright & JMeter Test Demonstrations`
   - **What it demonstrates**: Automated browser regression test execution and distributed performance load testing in real time.
   - **Skill represented**: Core technical competencies in Playwright (browser E2E testing) and Apache JMeter (distributed concurrency simulation).
   - **Workflows validated**: Chromium multi-role checkout journeys, token authentication handshakes, and 100,000-user concurrency thresholds with latency SLA monitoring.
   - **Evidence Links**: [`/skills/playwright-automation`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/playwright-automation/page.tsx) and [`/skills/performance-testing`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/skills/performance-testing/page.tsx).

2. **Defect Triage Panel**:
   - **Heading (H3)**: `Edge-Case Analysis & Defect Triage`
   - **What it demonstrates**: Pre-production root-cause analysis and automated assertion verification for severe software defects.
   - **Skill represented**: Edge-case detection, concurrency defect mitigation, and race-condition isolation.
   - **Workflows validated**: Booking velocity negative fare calculations, vehicle seat over-allocation (5/4 capacity), and distributed cache desynchronization.
   - **Evidence Links**: [`/projects/driwe-qa-case-study`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/projects/driwe-qa-case-study/page.tsx) and [`/projects/ride-sharing-testing-case-study`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/projects/ride-sharing-testing-case-study/page.tsx).

---

## 4. Entity Profile Card Extraction

The profile card in `web/sections/About/About.tsx` provides clean tabular definition-list (`<dl>`) attributes:
- **Name**: Shashank Shinde
- **Role**: Software Test Engineer
- **Company**: Profcyma Solutions Pvt. Ltd.
- **Location**: Pune, Maharashtra, India
- **Core Specializations**: Automation · API · Load QA
- **Primary Tools**: Selenium · Playwright · JMeter · Postman
- **Credentials**: B.E. IT (Univ of Pune) · SEED SDET Certification

---

## 5. Fact Safety Verification

In accordance with `AEO_FACT_CHECK.md`:
- **No Unresolved Statistics in Answers**: Direct answers avoid blending aggregate metrics with individual project scopes.
- **Specific Scopes Documented**:
  - Grosido: `~40% regression cycle time reduction`.
  - DRIWE: `100,000 concurrent virtual users simulated in JMeter`.
  - Ride Sharing: `20+ REST API endpoints validated`.
  - E-Commerce: `5 major browsers cross-browser parity`.
- **Zero Fabrication**: Every claim in the AEO content map is verified against active source code and case study deliverables.
