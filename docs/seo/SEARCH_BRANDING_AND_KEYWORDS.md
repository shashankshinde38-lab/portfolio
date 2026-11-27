# Search branding and keyword map

Canonical property · [Shashank Shinde Portfolio](https://shashankportfolio-jet.vercel.app/)

## Search and social presentation

- **Site name** · Shashank Shinde Portfolio
- **Homepage title** · Shashank Shinde | QA Automation Engineer & Software Testing Portfolio
- **Homepage description** · Explore Shashank Shinde's professional QA and software testing portfolio, featuring Playwright, Selenium, automation testing, manual testing, API testing, mobile testing and performance testing.
- **Search and browser icon** · The cream-and-terracotta SS monogram already in the site header. The primary HTML reference stays at `/android-chrome-192x192.png`. The favicon set includes 16, 32, 48, 96, 192 and 512 px PNGs, a 16/32/48 px ICO at `/favicon.ico`, and a 180 px Apple Touch Icon. The manifest uses the matching 192 and 512 px versions. The legacy SVG URL remains accessible for existing links.
- **Social previews** · The homepage and overview pages use the existing 1200 × 630 portrait card. Each case study has its own 1200 × 630 preview. The homepage portrait is the primary content image in structured data and the image sitemap.
- **Structured data** · The homepage connects WebSite, WebPage and Person. About uses ProfilePage with the same Person identifier. Pages with breadcrumb navigation expose BreadcrumbList. Case studies retain Article markup with their visible artwork. Contact, QA Lab, My Story and Legal use applicable page types.

Google chooses the actual site name, title link, snippet, favicon and thumbnail after crawling. The icon and content image are separate assets. [Google favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search) · [Google site name guidance](https://developers.google.com/search/docs/appearance/site-names) · [Google title link guidance](https://developers.google.com/search/docs/appearance/title-link)

## All 100 keyword assignments

Numbers match the supplied list. Primary terms guide page intent. Supporting terms include aliases, location and long-tail variants. The map is editorial guidance and documents where people can find the relevant evidence.

| Preferred page | Intent | Primary terms | Supporting or long-tail terms |
| --- | --- | --- | --- |
| `/` | Branded navigation and portfolio overview | 1 Shashank Shinde; 3 Shashank Shinde Portfolio; 19 Software Testing Portfolio | 2 Shashank Portfolio; 5 Shashank Shinde Testing; 11 Shashank Shinde Website; 12 Shashank Shinde Professional Portfolio; 16 Testing Portfolio; 18 QA Portfolio; 20 Software Tester Portfolio; 21 QA Engineer Portfolio; 22 Tester Portfolio Website; 25 Professional QA Portfolio; 26 Software Test Engineer Portfolio; 27 QA Automation Engineer Portfolio; 28 SDET Portfolio; 29 Quality Assurance Portfolio; 30 Software Quality Assurance Portfolio; 31 Testing Engineer Portfolio Website; 33 Software Testing Portfolio India; 34 Automation Engineer Portfolio; 35 Professional Testing Portfolio |
| `/about` | Identity, role and location | 10 Shashank Shinde QA Automation Engineer; 81 QA Engineer Pune | 4 Shashank Shinde QA; 6 Shashank Shinde Automation; 7 Shashank Shinde Software Tester; 8 Shashank Shinde QA Engineer; 9 Shashank Shinde Pune; 13 Shashank Shinde Test Engineer; 14 Shashank Shinde Quality Assurance; 15 Shashank Shinde SDET; 37 QA Automation Engineer; 82 Software Tester Pune; 83 Automation Tester Pune; 84 QA Automation Engineer India; 85 Software Testing Engineer India; 95 Quality Assurance Engineer India; 97 QA Automation Specialist Pune; 98 Software Testing Professional Pune; 99 Web and Mobile Testing Engineer |
| `/projects` | Evidence and case-study browsing | 32 QA Testing Projects Portfolio | 42 End-to-End Testing Portfolio; 44 Automation Testing Projects |
| `/automation-testing` | Web automation methods | 23 Automation Testing Portfolio; 45 Automation Testing Framework | 36 Automation Testing Engineer; 43 Test Automation Engineer Portfolio; 46 Automated Software Testing; 47 UI Automation Testing; 48 Regression Automation Testing; 49 Web Automation Testing; 54 E2E Testing Engineer; 55 Test Automation Specialist |
| `/skills/playwright-automation` | Playwright implementation | 38 Playwright Automation Testing; 51 TypeScript Automation Testing | 39 Playwright Automation Portfolio; 50 JavaScript Automation Testing; 52 Playwright Test Engineer |
| `/skills/selenium-automation` | Selenium implementation | 40 Selenium Automation Testing | 41 Selenium Tester Portfolio; 53 Selenium Test Engineer |
| `/manual-testing` | Functional and exploratory methods | 24 Manual Testing Portfolio; 61 Exploratory Testing; 64 Test Case Design | 56 Manual QA Engineer; 57 Manual Software Tester; 58 Manual QA Portfolio; 59 Functional Testing Portfolio; 60 Regression Testing; 62 STLC Testing Portfolio; 63 Software Defect Analysis |
| `/projects/ecommerce-testing-case-study` | Applied e-commerce QA | 65 E-commerce Website Testing | 92 E-commerce QA Specialist, treated as a search intent for the case study |
| `/api-testing` | REST API testing methods | 66 API Testing Portfolio | 69 REST API Testing Engineer |
| `/skills/api-testing` | API tools and assertions | 67 Postman Testing Portfolio; 68 REST Assured Testing | — |
| `/mobile-testing` | Mobile QA and device strategy | 70 Mobile Testing Portfolio | 72 Android Application Testing; 73 iOS Application Testing, covered as technique; 74 Mobile QA Engineer |
| `/skills/mobile-testing` | Appium implementation | 71 Appium Testing Portfolio | 75 Mobile Automation Testing |
| `/performance-testing` | Performance test design | 76 Performance Testing Portfolio | 78 Load Testing Engineer; 79 Stress Testing Engineer; 80 Application Performance Testing |
| `/skills/performance-testing` | JMeter implementation | 77 JMeter Performance Testing | — |
| `/experience` | Work history and responsibilities | 93 Software Quality Engineer | 91 Website Testing Specialist; 94 End-to-End QA Specialist, used as role-intent variants |
| `/contact` | Recruiter and project enquiries | 87 Freelance QA Engineer; 100 Freelance Test Automation Engineer | 86 SDET Engineer Pune; 88 Freelance Software Tester; 89 Freelance Automation Tester; 90 QA Testing Services India; 96 Freelance QA Tester India. The contact form accepts these enquiry types. |
| Deferred | Ambiguous query | — | 17 Portfolio Testing can refer to financial portfolios. The website uses the clearer software-testing phrasing. |

The general pages explain methods, the skill pages explain tools, and project pages show applied work. The five existing case-study URLs each retain their own focus. DRIWE covers JMeter load and payment webhooks. Grosido covers grocery checkout regression. E-Commerce covers marketplace checkout, refunds and roles. Ride Sharing covers concurrent booking and API behavior. Urban Build covers Android lead forms and CRM updates. `/skills` is the tools directory, `/qa-lab` is the interactive project exploration page, `/my-story` is the career story, and `/legal` covers privacy and credits. The interactive ability card at `/work` intentionally stays outside the sitemap.

## Files and scope

| Files | Change |
| --- | --- |
| `web/seo/site.ts`, `app/layout.tsx`, `app/sitemap.ts`, `public/robots.txt` | Homepage preferences, page-specific metadata, canonical image signals, structured-data helpers and image-crawler access |
| `public/site.webmanifest`, `public/favicon.ico`, `public/favicon-{16x16,32x32,48x48,96x96}.png`, `public/apple-touch-icon.png` | One active logo family across browser and installation assets |
| `web/components/SpecialtyLayout/SpecialtyLayout.tsx`, `web/components/SubpageLayout/SubpageLayout.tsx`, `app/{automation-testing,manual-testing,api-testing,mobile-testing,performance-testing}/page.tsx` | Breadcrumb markup, descriptive headings and relevant links in existing introduction blocks |
| `web/sections/Hero/HeroSection.tsx`, `app/{about,contact,projects,qa-lab}/page.tsx`, `app/{legal,my-story}/layout.tsx` | Profile and project wording, descriptive links and page-specific schema |
| `app/projects/{driwe-qa-case-study,ecommerce-testing-case-study,grosido-qa-case-study,ride-sharing-testing-case-study,urban-build-testing-case-study}/page.tsx` | Descriptive alt text for the artwork already displayed |
| `artifacts/seo-launch/journeys.mjs` | Updated browser test selectors to match the existing homepage CTA |
| `docs/seo/SEARCH_BRANDING_AND_KEYWORDS.md`, `docs/seo/VERIFICATION.md` | Keyword assignments, release verification and links to prior observations |

## Search Console baseline

On 28 November 2026 IST the read-only Search Console connection returned the exact URL-prefix property `https://shashankportfolio-jet.vercel.app/` with `siteFullUser` permission. Google reported the homepage as submitted and indexed, with the same user-declared and Google-selected canonical. Its last recorded crawl was 23 November 2026 at 03:25 IST. [Homepage URL Inspection](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=sGkpPpH0bIvB1EHo7mkGQg&utm_medium=link&utm_source=api)

The Search Analytics web-query sample for 30 October through 25 November PT returned five rows. It included one impression for `shashank shinde` at an average position of 9 and 19 impressions for `sdet qa.vercel.app` at an average position of 7.42. These are reported top rows. Missing terms do not establish zero demand.

The connected Search Console tool reads Google's indexed snapshot. Sitemap submission, live inspection and a new homepage indexing request require authenticated access to the relevant screens. Use the same URL-prefix property in **Sitemaps** and **URL Inspection**. [Search Console property](https://search.google.com/search-console?resource_id=https://shashankportfolio-jet.vercel.app/) · [Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)

## Validation

- The Next.js 16.3.4 production build and repository lint passed. The automated WhatsApp and security contracts passed 17 checks.
- The local production crawl verified 24 index-eligible sitemap pages. Each returned HTTP 200 with one H1, unique title and description, the expected canonical, Open Graph and Twitter metadata, and parseable structured data. The crawler found zero broken internal links or image references. The logo and Apple icon decoded in light and dark Microsoft Edge at desktop, Pixel 7 and iPad emulated widths. Light and dark render checks also covered the small raster sizes.
