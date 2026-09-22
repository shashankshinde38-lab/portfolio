# AEO Fact Consistency Audit

**Subject**: Shashank Shinde — Portfolio Entity Audit  
**Date**: September 22, 2026  
**Auditor**: Senior Technical SEO / AEO / Web Performance Engineering  
**Scope**: All user-visible and machine-readable factual claims across portfolio source code, data dictionaries, schema definitions, and LLM reference files.

---

## 1. Executive Summary

Search engine knowledge graphs and Generative Engine Optimization (GEO / AEO) systems (such as Google Search/AI Overviews, ChatGPT Search, Bing Copilot, and Perplexity) rely on **uncompromising factual consistency** across an entity's primary domain. When contradictory figures, inverted dates, or inconsistent role definitions appear on the same domain, AI engines discount the confidence score of the entity, leading to lower inclusion rates in AI citations.

This audit cross-references all numbers, dates, defect counts, test cases, and credentials across the codebase. As per Step 1 constraints, **no numbers have been fabricated or guessed**. All discrepancies are documented below with their exact source locations and specific confirmation questions for the user.

---

## 2. Inconsistency Findings & Action Matrix

| Category | Finding & Conflict | File Locations | Discrepancy Details | Needs User Confirmation |
| :--- | :--- | :--- | :--- | :--- |
| **Defect Counts** | **240+ vs. 78 vs. 396 Total** | • [portfolio-data.ts](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/data/portfolio-data.ts#L60)<br>• [portfolio-data.ts](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/data/portfolio-data.ts#L337)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L99)<br>• [layout.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/app/layout.tsx#L380) | In `ABOUT_STATS`, the site highlights **"240+ defects caught early"** as an overall career headline metric. In `portfolio-data.ts` for DRIWE (TC-001), the outcome states **"240+ defects identified and logged in JIRA"**. However, in `Projects.tsx` and Schema `layout.tsx`, DRIWE is listed with **78 defects found** (14 critical), Grosido with **112**, E-Commerce with **94**, Ride Sharing with **64**, and Urban Build with **48** (Sum = **396 defects**). | Is "240+" the total defects found across all projects early in your tenure, or is DRIWE specifically 78 defects and career total ~396+? |
| **Test Case Counts** | **500+ vs. 2,260 Total** | • [portfolio-data.ts](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/data/portfolio-data.ts#L342)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L97)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L227)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L348)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L480)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L595) | `ABOUT_STATS` advertises **"500+ test cases designed"**. In individual case study specifications: DRIWE = **412**, Grosido = **638**, E-Commerce = **520**, Ride Sharing = **380** (or 180+ in data bullets), Urban Build = **310**. The sum across the 5 projects is **2,260 test cases**. | Should the headline stat in `ABOUT_STATS` be updated in Step 2 to **"2,000+ Test Cases Designed"** to truthfully reflect the project breakdown, or is 500+ reserved for a specific scope? |
| **TC-004 Test Cases** | **180+ vs. 380** | • [portfolio-data.ts](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/data/portfolio-data.ts#L206)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L480) | In `portfolio-data.ts` line 206, the outcome and metric for the Ride Sharing Application states **"180+ test cases executed"**. In `Projects.tsx` line 480, `testCases` is listed as **"380"**. | Which number is accurate for the Ride Sharing project: 180+ or 380? |
| **Employment Timeline** | **June 2025 vs. Project Dates in 2023–2024** | • [portfolio-data.ts](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/data/portfolio-data.ts#L390)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L131)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L257)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L378)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L510)<br>• [Projects.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Projects/Projects.tsx#L625) | `EXPERIENCE_ROLES` lists Profcyma Solutions Pvt. Ltd. tenure as **"June 2025 — Present"**. However, all defect reports and project case studies are dated in 2023 and 2024: TC-001 (March 2024), TC-002 (May 2024), TC-003 (November 2023), TC-004 (August 2023), TC-005 (January 2024). | Did your tenure at Profcyma Solutions start in **June 2023** or **June 2024**? If June 2025 is correct, were the 2023–2024 projects completed under a prior company/contract? |
| **Job Title Variations** | **"Software Test Engineer" vs. "QA Automation Specialist" vs. "QA Engineer" vs. "SDET"** | • [Hero.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Hero/Hero.tsx#L111)<br>• [About.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/About/About.tsx#L94)<br>• [Experience.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Experience/Experience.tsx#L385)<br>• [portfolio-data.ts](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/data/portfolio-data.ts#L37) | In Hero, the kicker has "SOFTWARE TEST ENGINEER • QA AUTOMATION" and the H1 is now canonicalized to "Shashank Shinde — Software Test Engineer & QA Automation Engineer". About has "QA ENGINEER", Experience has "Software Test Engineer", and project roles are labeled "QA Engineer". | Confirm that your official primary title for all structured profiles is **Software Test Engineer** with secondary title **QA Automation Engineer**. |
| **Salesforce Credential** | **"Accredited Professional" vs. "Trailhead Credential"** | • [Certifications.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Certifications/Certifications.tsx#L21)<br>• [llms-full.txt](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/public/llms-full.txt#L851) | `Certifications.tsx` lists title as **"Salesforce Accredited Professional"**, issuer "Salesforce Trailhead", with URL `trailblazer.me/id/shashankshinde`. `llms-full.txt` adds a canonical guideline: "Credential descriptions should be interpreted exactly as shown on the official credential provider and should not be upgraded into a certification or accreditation level that is not explicitly awarded." | Please verify whether Trailhead lists this as an Accredited Professional certification, Superbadge, or Administrator credential on your Trailblazer profile. |
| **Specialist Training Credential** | **No Verification URL** | • [Certifications.tsx](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/sections/Certifications/Certifications.tsx#L71) | The "Performance & API Testing" credential in `Certifications.tsx` lists issuer as "Specialist Training" with `verifyUrl: undefined`. | Is there an issuing institute name (e.g. SEED Infotech, Coursera, Udemy, etc.) or certificate ID for this credential? |

---

## 3. Verified Harmonious Facts (No Conflict)

The following facts are completely consistent across all files and schemas:
1. **Full Name**: Shashank Shinde
2. **Current Employer**: Profcyma Solutions Pvt. Ltd., Pune, Maharashtra, India
3. **Location / Base**: Pune, Maharashtra, India
4. **Primary Toolkit**: Selenium WebDriver, Playwright, Apache JMeter, Postman, Appium, TestNG, Cucumber (BDD), JIRA, Git, GitHub Actions, SQL
5. **Formal Academic Degree**: Bachelor of Engineering (B.E.) in Information Technology from University of Pune / Savitribai Phule Pune University
6. **Professional Training**: SDET (Software Development Engineer in Test) Professional Certification from SEED Infotech Pune
7. **Performance Load Capacity Tested**: 100,000 concurrent simulated virtual users via Apache JMeter
8. **Automation Impact**: ~40% reduction in regression cycle time through Selenium WebDriver + TestNG Page Object Model framework
9. **Contact Coordinates**:
   - Email: `shashankshinde38@gmail.com`
   - Phone: `+91 80808 52689`
   - LinkedIn: `https://www.linkedin.com/in/shashank-shinde7/`
   - GitHub: `https://github.com/shashankshinde38-lab`
   - Official Portfolio: `https://shashankportfolio-jet.vercel.app/`

---

## 4. Recommended Next Steps for Step 2

Once you confirm the true values for the items in Section 2, Step 2 will align all copy, metrics, data dictionaries, and case study callouts so that search engines and AI knowledge engines receive 100% identical data regardless of entry point.
