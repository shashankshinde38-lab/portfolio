# Current search verification

November 22, 2026 IST · [Shashank Shinde Portfolio](https://shashankportfolio-jet.vercel.app/)

| Repository report | Verification and action |
| --- | --- |
| Initial audit | The release crawl covers the 24 sitemap URLs, the permanent redirects and source HTML. HTTP eligibility and observed search visibility are recorded separately. |
| Technical SEO | Self-referencing canonicals, indexable public pages, private route exclusions, sitemap and favicon checked through the release crawl. The site serves the Google HTML verification file. Ownership, selected canonicals and sitemap processing require the property dashboard. |
| On-page SEO | The homepage browser title adds the QA role and Pune while the public site name stays exact. Five case studies expose their author, canonical URLs and visible images as Article JSON-LD. |
| AEO and GEO | Homepage answers and case-study links are in source HTML. The public text reference files link to QA Lab and contact. Google does not require AI-specific plugins or text files. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) |
| Keyword research and competitor analysis | Tested branded, project-specific, and exact-domain queries. The public search sample returned the verified LinkedIn profile and no portfolio return for the exact-domain queries. This sample has no fixed geography, device or Google average position. |
| Backlink strategy | The public GitHub profile has an empty website field. The owner can add the canonical link via GitHub **Edit profile → Website** and independently check profile links on LinkedIn and Trailblazer. Publishing, outreach and directory submissions require the owner’s external account access. |
| Performance | Previous cold mobile runs found DRIWE, QA Lab and contact below three seconds. The homepage recheck was 3.029 seconds. Public CrUX data was unavailable. The latest metadata changes add no browser script or font download. |
| MCP integration | Google returned HTTP 403 with reason `SERVICE_DISABLED` for Cloud project `780743819914`. Enable the Search Console API in that project and rerun `portfolio-gsc` `list_sites` to establish accessible properties. OpenSEO is available for installation and still needs its own account connection. [Cloud API settings](https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview?project=780743819914) |
| Final implementation | IndexNow returned HTTP 200 for 24 URLs in the earlier release. Google Search Console, Bing Webmaster Tools and GA4 dashboard confirmation still require their respective accounts. |

## Repeatable visibility checks

Record the date, country, device, search surface, selected URL, observed title and snippet. For an AI answer, record whether the result cited the site with a clickable URL. Track these exact queries over time.

- Branded · `Shashank Shinde Portfolio`
- Branded role · `Shashank Shinde QA engineer Pune`
- Project · `Shashank Shinde DRIWE QA case study`
- Project · `Shashank Shinde Grosido QA case study`
- Non-branded · `JMeter distributed load testing QA case study`

The public search sample from this pass provides no confirmed current Google rank or AI citation. Google may select title links and snippets based on the query. [Google search appearance guidance](https://developers.google.com/search/help/site-appearance-faq)
