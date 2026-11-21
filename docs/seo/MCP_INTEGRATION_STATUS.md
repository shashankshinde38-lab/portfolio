# MCP Integrations & Tool Connectivity Status

**Environment**: Google Antigravity IDE  
**Host System**: Windows x64  
**Date**: November 22, 2026  

---

## 1. Integration Status Matrix

| Integration / MCP Server | Provider / Catalog ID | Purpose & Capabilities | Connection State | Required Action |
| :--- | :--- | :--- | :--- | :--- |
| **Semrush Plugin** | `antigravity-plugins-partners/plugin/semrush` | Live Semrush keyword research, technical site audits, backlink analysis, competitor SERP tracking, and AI brand visibility | Available in Agent Marketplace | Add from UI plugin card (`<plugin-card catalog-id="antigravity-plugins-partners/plugin/semrush"></plugin-card>`) & authenticate OAuth |
| **Google Developer Knowledge MCP** | `antigravity-plugins-official/plugin/google-developer-knowledge` | Official real-time documentation retrieval across Google Search Central, indexing rules, structured data guidelines, and Core Web Vitals | Available in Agent Marketplace | Add from UI plugin card (`<plugin-card catalog-id="antigravity-plugins-official/plugin/google-developer-knowledge"></plugin-card>`) & authenticate ADC/API Key |
| **Google Search Console** | Google Search Console Web & API | Live indexing status, search queries, impressions, CTR, average search position, and sitemap crawling | Direct Verification Active | Submit live sitemap `/sitemap.xml` in verified Search Console property |
| **IndexNow Protocol** | Bing / Yandex IndexNow Engine | Instant automated URL submission upon deployment | Configured in `scripts/submit_indexnow.js` | Automated ping active |
| **Google Analytics 4** | GA4 Global Tag Engine | Real-time traffic, landing page sessions, user engagement, and custom conversion events | Client Code Active | Provide `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel environment variables |

---

## 2. Priority 1: Semrush Antigravity Plugin

- **Catalog ID**: `antigravity-plugins-partners/plugin/semrush`
- **Official MCP Endpoint**: `https://mcp.semrush.com/antigravity/v2/mcp`
- **Capabilities Provided**:
  - Live keyword volume & difficulty metrics
  - SERP feature competitor tracking
  - Backlink quality scores and toxic link auditing
  - Technical crawl errors and schema validation
- **Authentication**: Uses official OAuth 2.0 authentication workflow in Antigravity Plugins Manager.
- **Limitation Note**: Full keyword metrics require an active Semrush Pro/Guru subscription with API access. If subscription access is not present, standard technical SEO, on-page optimization, and structured data tools remain fully functional locally.

---

## 3. Priority 2: Google Developer Knowledge MCP

- **Catalog ID**: `antigravity-plugins-official/plugin/google-developer-knowledge`
- **Official Documentation**: `https://developers.google.com/knowledge/mcp`
- **Capabilities Provided**:
  - Authoritative retrieval of Google Search Central guidelines
  - Verified JSON-LD schema syntax references
  - Core Web Vitals optimization best practices
- **Authentication**: Requires Google Cloud Application Default Credentials (ADC) or a valid Google Developer API Key.

---

## 4. Priority 3: Google Search Console

- **Domain Property**: `https://search.google.com/search-console?resource_id=https://shashankportfolio-jet.vercel.app/`
- **Verification Token**: `googlebcc3fd247517937d`
  - Active in HTML `<head>`: `<meta name="google-site-verification" content="googlebcc3fd247517937d"/>`
  - Active static file: `https://shashankportfolio-jet.vercel.app/googlebcc3fd247517937d.html`
- **Data Availability**: Once the sitemap is submitted and Google indexes the pages, actual queries, impressions, and average positions will populate in the Search Console performance reports.
