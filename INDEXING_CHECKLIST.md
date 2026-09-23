# Search Engine Submission & Indexing Checklist — Shashank Shinde

**Target Domain**: [https://shashankportfolio-jet.vercel.app/](https://shashankportfolio-jet.vercel.app/)  
**Sitemap**: [https://shashankportfolio-jet.vercel.app/sitemap.xml](https://shashankportfolio-jet.vercel.app/sitemap.xml)  
**IndexNow Key**: [https://shashankportfolio-jet.vercel.app/91285c30ae1a43bdada96ae3b552634f.txt](https://shashankportfolio-jet.vercel.app/91285c30ae1a43bdada96ae3b552634f.txt)

This document provides exact, manual steps to register, verify, submit, and monitor the portfolio in Google Search Console, Bing Webmaster Tools, and the IndexNow protocol.

---

## 1. Google Search Console (GSC) Setup

Google Search Console is the primary tool for indexing verification and monitoring search performance.

### Step 1.1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Sign in with your primary Google account (`shashankshinde38@gmail.com`).
3. Click **Add Property** in the left-hand navigation.
4. Select **URL prefix** and enter:
   `https://shashankportfolio-jet.vercel.app/`
5. Click **Continue**.

### Step 1.2: Verify Ownership
Choose one of the following verification methods:
- **Option A (HTML Tag — Recommended)**:
  - Copy the meta tag provided by Google (e.g. `<meta name="google-site-verification" content="..." />`).
  - Add this tag to `app/layout.tsx` inside the metadata `verification: { google: '...' }` block.
  - Deploy to Vercel and click **Verify**.
- **Option B (Domain Name Provider)**:
  - If using a custom domain in the future, add a TXT record in your DNS settings.

### Step 1.3: Submit Sitemap
1. Navigate to **Indexing > Sitemaps** in the left sidebar.
2. In the **Add a new sitemap** input field, enter:
   `sitemap.xml`
3. Click **Submit**.
4. Confirm that the status shows **Success** and that 15 discovered URLs are detected.

### Step 1.4: Priority URL Inspection & Indexing Request
Googlebot will automatically crawl submitted URLs, but you can expedite initial indexing by inspecting primary URLs:
1. Paste the URL into the top search bar (**Inspect any URL**).
2. Click **Test Live URL** to confirm that Googlebot can crawl the page without errors.
3. Click **Request Indexing**.

**Submit in this order of priority:**
1. `https://shashankportfolio-jet.vercel.app/` (Home)
2. `https://shashankportfolio-jet.vercel.app/about` (About Profile)
3. `https://shashankportfolio-jet.vercel.app/experience` (Experience)
4. `https://shashankportfolio-jet.vercel.app/skills` (Skills Hub)
5. `https://shashankportfolio-jet.vercel.app/projects` (Projects Hub)
6. `https://shashankportfolio-jet.vercel.app/skills/selenium-automation`
7. `https://shashankportfolio-jet.vercel.app/skills/playwright-automation`
8. `https://shashankportfolio-jet.vercel.app/skills/api-testing`
9. `https://shashankportfolio-jet.vercel.app/skills/performance-testing`
10. `https://shashankportfolio-jet.vercel.app/skills/mobile-testing`
11. `https://shashankportfolio-jet.vercel.app/projects/driwe-qa-case-study`
12. `https://shashankportfolio-jet.vercel.app/projects/grosido-qa-case-study`
13. `https://shashankportfolio-jet.vercel.app/projects/ecommerce-testing-case-study`
14. `https://shashankportfolio-jet.vercel.app/projects/ride-sharing-testing-case-study`
15. `https://shashankportfolio-jet.vercel.app/projects/urban-build-testing-case-study`

### Step 1.5: Ongoing Monitoring
- **Page Indexing**: Check weekly to verify all 15 URLs show as "Indexed". Ensure no pages have "Duplicate without user-selected canonical" or "Excluded by noindex tag".
- **Core Web Vitals**: Monitor mobile and desktop metrics (LCP < 2.5s, CLS < 0.1, INP < 200ms).
- **Security & Manual Actions**: Confirm "No issues detected".

---

## 2. Bing Webmaster Tools & Microsoft Copilot

Bing Webmaster Tools feeds Microsoft Bing and Copilot search results.

### Step 2.1: Add & Verify Property
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Sign in with your Microsoft or Google account.
3. Choose **Import from Google Search Console** (fastest—imports ownership and sitemaps automatically) OR manually add `https://shashankportfolio-jet.vercel.app/`.

### Step 2.2: Submit Sitemap
1. Navigate to **Sitemaps** in the left menu.
2. Click **Submit sitemap** and enter:
   `https://shashankportfolio-jet.vercel.app/sitemap.xml`
3. Click **Submit**.

### Step 2.3: URL Inspection & Submit URLs
1. Go to **URL Submission**.
2. Click **Submit URLs** and paste all 15 canonical URLs to trigger rapid indexing.

---

## 3. IndexNow Instant Notification Protocol

IndexNow allows search engines (Bing, Yandex, Naver, Seznam) to immediately discover new and updated pages without waiting for standard crawl cycles.

### Step 3.1: Verification Key Verification
Confirm that your IndexNow key file is accessible publicly:
👉 Open in browser: `https://shashankportfolio-jet.vercel.app/91285c30ae1a43bdada96ae3b552634f.txt`  
It should display: `91285c30ae1a43bdada96ae3b552634f`

### Step 3.2: Submitting URLs via Script
Whenever you push a significant update to your portfolio or deploy to Vercel, run the submission script:

```bash
# 1. Test payload formation locally
node scripts/submit_indexnow.js --dry-run

# 2. Dispatch live notification to IndexNow API
node scripts/submit_indexnow.js
```

Expected output:
```
Response Status: 200 OK (or 202 Accepted)
✅ Successfully submitted URLs to IndexNow! Search engines notified.
```

---

## 4. Post-Submission Indexing Timeline Expectations

| Timeline | Milestone | What to Expect |
|---|---|---|
| **Day 1–3** | Crawl Initiation | Search engine bots (Googlebot, Bingbot, OAI-SearchBot) fetch `robots.txt`, `sitemap.xml`, and the homepage. |
| **Day 4–10** | Initial Indexing | Homepage and core pages appear in `site:shashankportfolio-jet.vercel.app` search queries. |
| **Day 11–25** | Full Subpage Ingestion | All 15 URLs become discoverable; Schema.org Person, WebPage, and BreadcrumbList structured data graphs are parsed. |
| **Day 25–45+** | Entity Resolution & AI Mentions | AI engines (ChatGPT Search, Perplexity, Gemini) begin citing specific case studies, defect IDs, and testing toolkits when queried. |
