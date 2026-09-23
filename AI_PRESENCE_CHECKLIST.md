# AI Search Engine Presence & Indexing Checklist (Step 4)

**Subject**: Shashank Shinde — Software Test Engineer & QA Automation Engineer  
**Live Site**: [https://shashankportfolio-jet.vercel.app/](https://shashankportfolio-jet.vercel.app/)  
**Optimization Sequence**: Step 4 of 6 (LLMO/AIO — AI and LLM Discoverability)  
**Date**: September 22, 2026  
**Status**: Active Audit Checklist  

---

## 1. Public Indexed URLs Inventory (15 Canonical Routes)

All 15 public URLs are configured with self-referencing canonical URLs, prerendered static HTML, unique metadata, and interconnected Schema.org JSON-LD structured data:

| # | Route | Canonical URL | Indexability | Sitemap Presence |
| :-: | :--- | :--- | :---: | :---: |
| 1 | `/` | `https://shashankportfolio-jet.vercel.app/` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 2 | `/about` | `https://shashankportfolio-jet.vercel.app/about` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 3 | `/experience` | `https://shashankportfolio-jet.vercel.app/experience` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 4 | `/skills` | `https://shashankportfolio-jet.vercel.app/skills` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 5 | `/projects` | `https://shashankportfolio-jet.vercel.app/projects` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 6 | `/skills/selenium-automation` | `https://shashankportfolio-jet.vercel.app/skills/selenium-automation` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 7 | `/skills/playwright-automation` | `https://shashankportfolio-jet.vercel.app/skills/playwright-automation` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 8 | `/skills/api-testing` | `https://shashankportfolio-jet.vercel.app/skills/api-testing` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 9 | `/skills/performance-testing` | `https://shashankportfolio-jet.vercel.app/skills/performance-testing` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 10 | `/skills/mobile-testing` | `https://shashankportfolio-jet.vercel.app/skills/mobile-testing` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 11 | `/projects/driwe-qa-case-study` | `https://shashankportfolio-jet.vercel.app/projects/driwe-qa-case-study` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 12 | `/projects/grosido-qa-case-study` | `https://shashankportfolio-jet.vercel.app/projects/grosido-qa-case-study` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 13 | `/projects/ecommerce-testing-case-study` | `https://shashankportfolio-jet.vercel.app/projects/ecommerce-testing-case-study` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 14 | `/projects/ride-sharing-testing-case-study` | `https://shashankportfolio-jet.vercel.app/projects/ride-sharing-testing-case-study` | `index, follow` | ✅ Verified in `sitemap.xml` |
| 15 | `/projects/urban-build-testing-case-study` | `https://shashankportfolio-jet.vercel.app/projects/urban-build-testing-case-study` | `index, follow` | ✅ Verified in `sitemap.xml` |

---

## 2. Crawler & Engine Status Matrix

| Engine / Crawler | User-Agent | Robots.txt Access | Middleware / Edge Status | Sitemap Declared | Verification Status |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **OpenAI ChatGPT Search** | `OAI-SearchBot` | **ALLOWED** (`Allow: /`) | Allowed (only `/admin/:path*` protected) | Yes (`/sitemap.xml`) | ✅ Configured for discovery & citation |
| **Microsoft Bing / Copilot** | `Bingbot` | **ALLOWED** (`Allow: /`) | Allowed (only `/admin/:path*` protected) | Yes (`/sitemap.xml`) | ✅ Configured & IndexNow key active |
| **Google Search & AI Overviews** | `Googlebot` | **ALLOWED** (`Allow: /`) | Allowed (only `/admin/:path*` protected) | Yes (`/sitemap.xml`) | ✅ Configured & verified |
| **OpenAI Model Scraper** | `GPTBot` | **Default** (covered under `*`) | Allowed | Yes | Kept separate from `OAI-SearchBot` |
| **IndexNow Protocol** | IndexNow API | **VERIFIED** | Public key file deployed at root | Yes | ✅ Dry run verified (`scripts/submit_indexnow.js`) |

---

## 3. Crawler Safety Verification

To protect sensitive and internal administration data while maximizing public discovery:
- **Disallowed Directories in robots.txt**:
  - `Disallow: /admin/` (Blocks administrative dashboard, session cookies, and login panels)
  - `Disallow: /api/` (Blocks internal serverless endpoints, authentication callbacks, and email dispatchers)
- **Middleware Proxy Guard (`proxy.ts`)**:
  - Restricts `/admin/:path*` to authenticated session cookies (`ADMIN_ACCESS_COOKIE`).
  - Completely bypasses all 15 public static routes, ensuring zero crawl latency for search and AI bots.
- **Environment & Credential Safety**:
  - Supabase service role keys, SMTP credentials, and admin tokens remain strictly in server-side environment variables and are never exposed in client bundles or public HTML.

---

## 4. Current Citation & Discovery Status

- **Baseline Status**: Newly structured in Steps 1–4.
- **Observable Citations**: Pending search engine crawl cycles. OpenAI and Bing process newly updated sitemaps over several crawl passes.
- **IndexNow Readiness**: Complete. 15 canonical URLs are packaged and ready for automated push via `scripts/submit_indexnow.js`.

---

## 5. Outstanding Manual Actions for the Portfolio Owner

The following actions require direct owner execution in external webmaster portals:

1. **Google Search Console**:
   - Log into [Google Search Console](https://search.google.com/search-console).
   - Submit sitemap URL: `https://shashankportfolio-jet.vercel.app/sitemap.xml`.
   - Request indexing for `https://shashankportfolio-jet.vercel.app/` using the URL Inspection tool.

2. **Bing Webmaster Tools**:
   - Log into [Bing Webmaster Tools](https://www.bing.com/webmasters).
   - Add site: `https://shashankportfolio-jet.vercel.app/`.
   - Submit sitemap URL: `https://shashankportfolio-jet.vercel.app/sitemap.xml`.
   - Verify that the IndexNow key (`e5d7a8c4f9214b7bb901b0b5c1638210.txt`) is recognized.

3. **Submit IndexNow Live**:
   - Once DNS/production deployment is confirmed on Vercel, run:
     ```bash
     node scripts/submit_indexnow.js
     ```
     This sends an immediate HTTP POST request notifying Bing, Yandex, and participating search engines of all 15 refreshed URLs without waiting for scheduled crawl cycles.
