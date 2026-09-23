# Conversion Rate Optimization (CRO) Measurement Plan (Step 6)

**Project**: Shashank Shinde — Software Test Engineer & QA Automation Engineer Portfolio  
**Live Site**: [https://shashankportfolio-jet.vercel.app/](https://shashankportfolio-jet.vercel.app/)  
**Optimization Sequence**: Step 6 of 6 (CRO — Conversion Rate Optimization)  
**Date**: September 23, 2026  
**Status**: Active Measurement Standard  

---

## 1. Executive Summary & Conversion Definition

In a technical engineering portfolio, conversion is **not** an e-commerce checkout or SaaS subscription. The portfolio exists to turn high-intent visitors (technical recruiters, hiring managers, SDET team leads, and VP/Directors of Engineering) into engaged interview invitations and qualified consulting discussions.

### High-Intent Funnel
```
Discovery (SEO / AEO / GEO / LLMO)
   │
   ▼
Search Intent Landing (SXO/UXO)
   │
   ▼
Role & Credential Understanding (About / Experience)
   │
   ▼
Technical Proof & Defect Investigation (Case Studies / Testing Lab)
   │
   ▼
Desired Conversion Actions (Contact / Resume / LinkedIn / GitHub)
```

---

## 2. Conversion Classification

Conversions are divided into **Primary** (direct hiring intent) and **Secondary** (high-engagement evaluation):

### A. Primary Conversions (Immediate Hiring Intent)
1. **`contact_submit_success`**:
   - A recruiter or engineering manager completes and submits the contact form (`/api/enquiries`) with a validated name, email, enquiry reason, and message.
   - Purpose: Direct initiation of an interview, contract, or full-time opportunity discussion.
2. **`resume_download`**:
   - A visitor clicks and downloads Shashank Shinde's 1-page ATS-formatted resume (`/files/Shashank_Shinde_Resume.pdf`).
   - Purpose: Direct acquisition of Shashank's credentials for recruiter ATS ingestion or candidate sharing with hiring committees.

### B. Secondary Conversions (High-Engagement Technical Evaluation)
1. **`case_study_view`**:
   - A visitor clicks into a dedicated deep-dive case study (`/projects/driwe-qa-case-study`, `/projects/grosido-qa-case-study`, etc.) to review defect triage, architecture, and reproduction steps.
   - Purpose: Validating depth of engineering capability and first-hand problem-solving skills.
2. **`project_view`**:
   - A visitor clicks the primary Hero CTA ("View QA Case Studies") or explores the case studies repository (`/projects`).
   - Purpose: Exploring the full spectrum of production systems tested.
3. **`linkedin_click`**:
   - An outbound navigation event to Shashank's verified LinkedIn profile (`https://www.linkedin.com/in/shashank-shinde7/`).
   - Purpose: Professional background verification and InMail initiation.
4. **`github_click`**:
   - An outbound navigation event to Shashank's public GitHub portfolio (`https://github.com/shashankshinde38-lab`).
   - Purpose: Code review of test automation repositories and CI/CD pipelines.
5. **`contact_start`**:
   - A visitor focuses any field in the contact form or clicks a "Let's talk" navigation shortcut.
   - Purpose: Measuring form entry intent and drop-off rates.

---

## 3. Analytics Tracking Implementation

All events are handled through the zero-dependency dispatcher in [`web/utils/analytics.ts`](file:///c:/Users/shash/.vscode/Shashank/Projects/Portfolio/web/utils/analytics.ts):

| Event Name | Category | Trigger Mechanism & Element | Payload Data Parameters |
| :--- | :--- | :--- | :--- |
| `contact_submit_success` | Primary | Successful HTTP 200/201 response from `/api/enquiries` in `ContactSection.tsx`. | `{ reasonCategory: string }` |
| `resume_download` | Primary | Click on any link targeting `/files/Shashank_Shinde_Resume.pdf` with `download` attribute. | `{ location: "hero" \| "nav_desktop" \| "subpage_bottom_cta" }` |
| `case_study_view` | Secondary | Click on any case study link in `Projects.tsx`, `Skills.tsx`, or `app/projects/page.tsx`. | `{ projectId: string, location?: string }` |
| `project_view` | Secondary | Click on hero primary CTA or navigation to `/projects`. | `{ location: "hero" \| "nav" }` |
| `linkedin_click` | Secondary | Click on verified LinkedIn external links. | `{ location: "header" \| "footer" \| "subpage_header" }` |
| `github_click` | Secondary | Click on verified GitHub external links. | `{ location: "header" \| "footer" \| "subpage_header" }` |
| `contact_start` | Secondary | First user focus/input in `ContactSection.tsx` or click on "Let's talk" in navigation. | `{ location: "contact_form" \| "nav_desktop" \| "nav_mobile" }` |

> **Privacy Standard**: Zero Personally Identifiable Information (PII) is tracked. Form submissions do not transmit names, phone numbers, or email addresses to client analytics dispatchers.

---

## 4. Key Performance Indicators (KPIs) & Recommended Formulas

To avoid fabricating baseline figures, the following metrics should be calculated from real session data post-deployment:

| Metric | Calculation Formula | Business Significance |
| :--- | :--- | :--- |
| **Contact Form Completion Rate** | `contact_submit_success / contact_start` | Measures form friction and field usability. Low rates indicate unnecessary fields or confusing validation. |
| **Resume Download Rate** | `unique(resume_download) / unique_sessions` | Measures recruiter intent. High rates indicate strong hero messaging and trustworthy role positioning. |
| **Case Study Deep-Dive Rate** | `case_study_view / unique_sessions` | Measures whether visitors investigate technical proof rather than skimming the surface. |
| **Outbound Profile Verification Rate** | `(linkedin_click + github_click) / unique_sessions` | Measures external corroboration intent. |
| **Recruiter Action Index (RAI)** | `sessions_with_any_conversion / total_sessions` | Comprehensive measure of portfolio effectiveness at converting organic traffic into recruiting touchpoints. |

---

## 5. Recruiter Journey Friction Audit & Resolutions

| Touchpoint | Potential Recruiter Friction | Resolution Implemented in Step 6 |
| :--- | :--- | :--- |
| **Hero Fold** | Generic "View My Work" gave no immediate hint of QA specialization. | Replaced with explicit **"View QA Case Studies"** and **"Download Resume"** buttons. |
| **Project Cards** | Project cards had a button pointing to `#simulator` instead of the project case study. | Linked card action directly to the project's dedicated QA case study deep dive (`/projects/driwe-qa-case-study`, etc.) labeled **"View QA Case Study"**. |
| **Skill Cards** | Skills listed tools without direct links to proof, causing dead-ends. | Added **evidence footer links** to every card (e.g. Automation ➔ Grosido, API ➔ Ride Sharing, JMeter ➔ DRIWE). |
| **Contact Form** | Ambiguous purpose could discourage recruiters seeking contract or full-time roles. | Added clear professional purpose: *"Discuss QA, testing, and automation opportunities, or request detailed test artifact walkthroughs."* |
| **Subpage Mobile Navigation** | Mobile search visitors had no top navigation to reach other sections. | Added horizontally scrollable glass capsule strip with 1-tap access to Home, About, Experience, Skills, Projects, and Contact. |
