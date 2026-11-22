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
| MCP integration | Search Console is connected with full-user access. URL Inspection covers all 24 sitemap URLs below. OpenSEO still needs installation and its own account connection. |
| Final implementation | IndexNow returned HTTP 200 for 24 URLs in the earlier release. Google indexing status is verified below. Bing Webmaster Tools and GA4 dashboard confirmation still require their respective accounts. |

## Repeatable visibility checks

Record the date, country, device, search surface, selected URL, observed title and snippet. For an AI answer, record whether the result cited the site with a clickable URL. Track these exact queries over time.

- Branded · `Shashank Shinde Portfolio`
- Branded role · `Shashank Shinde QA engineer Pune`
- Project · `Shashank Shinde DRIWE QA case study`
- Project · `Shashank Shinde Grosido QA case study`
- Non-branded · `JMeter distributed load testing QA case study`

The public search sample from this pass provides no confirmed current Google rank or AI citation. Google may select title links and snippets based on the query. [Google search appearance guidance](https://developers.google.com/search/help/site-appearance-faq)

## Search Console URL inspection

The URL-prefix property is `https://shashankportfolio-jet.vercel.app/`. The connected account has full-user access. On 22 November 2026, URL Inspection reported 15 of the 24 sitemap URLs indexed, eight discovered and awaiting indexing, and one unknown to Google. The index reports reflect Google’s stored data. The connection supports read-only inspection.

| Sitemap URL | Google status | URL Inspection |
| --- | --- | --- |
| [`/`](https://shashankportfolio-jet.vercel.app/) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=22H2jVH13l4CsmkTmg4NMw&utm_medium=link&utm_source=api) |
| [`/about`](https://shashankportfolio-jet.vercel.app/about) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=6Zb-0M43c3-lR4RD53h8xg&utm_medium=link&utm_source=api) |
| [`/experience`](https://shashankportfolio-jet.vercel.app/experience) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=9CN87EobK8cpvMgtTlO-sg&utm_medium=link&utm_source=api) |
| [`/my-story`](https://shashankportfolio-jet.vercel.app/my-story) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=MoTCclOoTu_CyIAHSjF8EQ&utm_medium=link&utm_source=api) |
| [`/projects`](https://shashankportfolio-jet.vercel.app/projects) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=ztHZYn8JhtjoGlilsMlCMw&utm_medium=link&utm_source=api) |
| [`/qa-lab`](https://shashankportfolio-jet.vercel.app/qa-lab) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=5Il04Wr1_-vXEuu-quBmjg&utm_medium=link&utm_source=api) |
| [`/contact`](https://shashankportfolio-jet.vercel.app/contact) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=LbDddfxMoGQlMBq9zzcjUA&utm_medium=link&utm_source=api) |
| [`/skills`](https://shashankportfolio-jet.vercel.app/skills) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=XdMEA5vLYVBkMW11_fjbjA&utm_medium=link&utm_source=api) |
| [`/automation-testing`](https://shashankportfolio-jet.vercel.app/automation-testing) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=HdzJi93vRDfUsCgJj4dPIA&utm_medium=link&utm_source=api) |
| [`/manual-testing`](https://shashankportfolio-jet.vercel.app/manual-testing) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=kp8rpQ7GOZ4444Wgfac1lw&utm_medium=link&utm_source=api) |
| [`/api-testing`](https://shashankportfolio-jet.vercel.app/api-testing) | URL is unknown to Google | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=Rd3-aw5A--CxUrr6YN4ADQ&utm_medium=link&utm_source=api) |
| [`/mobile-testing`](https://shashankportfolio-jet.vercel.app/mobile-testing) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=PnUMQXbVdY9riJY3gWgjUg&utm_medium=link&utm_source=api) |
| [`/performance-testing`](https://shashankportfolio-jet.vercel.app/performance-testing) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=JusXqb1go4AdImu2f-P2KA&utm_medium=link&utm_source=api) |
| [`/skills/selenium-automation`](https://shashankportfolio-jet.vercel.app/skills/selenium-automation) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=v4abPnTqcTc64xPlpXZzmA&utm_medium=link&utm_source=api) |
| [`/skills/playwright-automation`](https://shashankportfolio-jet.vercel.app/skills/playwright-automation) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=U9EAV3BxA0Q8cZcqJmdxJg&utm_medium=link&utm_source=api) |
| [`/skills/api-testing`](https://shashankportfolio-jet.vercel.app/skills/api-testing) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=PqDSpVtqTeeOa8A8lSbazA&utm_medium=link&utm_source=api) |
| [`/skills/performance-testing`](https://shashankportfolio-jet.vercel.app/skills/performance-testing) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=x9JrHIeJN03Umb4Jq-Rylw&utm_medium=link&utm_source=api) |
| [`/skills/mobile-testing`](https://shashankportfolio-jet.vercel.app/skills/mobile-testing) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=wZ2k6OiRLe4LNyctCX-NeQ&utm_medium=link&utm_source=api) |
| [`/projects/driwe-qa-case-study`](https://shashankportfolio-jet.vercel.app/projects/driwe-qa-case-study) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=M26JG_gUNwUMkC10J517sw&utm_medium=link&utm_source=api) |
| [`/projects/grosido-qa-case-study`](https://shashankportfolio-jet.vercel.app/projects/grosido-qa-case-study) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=21LV7ZBJocgKicb9X2fKTg&utm_medium=link&utm_source=api) |
| [`/projects/ecommerce-testing-case-study`](https://shashankportfolio-jet.vercel.app/projects/ecommerce-testing-case-study) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=xh-TCi5RM6ooQtsYdaS-Cg&utm_medium=link&utm_source=api) |
| [`/projects/ride-sharing-testing-case-study`](https://shashankportfolio-jet.vercel.app/projects/ride-sharing-testing-case-study) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=6On5C2Uz3iHG6B_xf08xKA&utm_medium=link&utm_source=api) |
| [`/projects/urban-build-testing-case-study`](https://shashankportfolio-jet.vercel.app/projects/urban-build-testing-case-study) | Submitted and indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=vCB_ThBuMK_xGQxTArNh_Q&utm_medium=link&utm_source=api) |
| [`/legal`](https://shashankportfolio-jet.vercel.app/legal) | Discovered - currently not indexed | [Open](https://search.google.com/search-console/inspect?resource_id=https://shashankportfolio-jet.vercel.app/&id=1q1q6pSNQTR9Wg_iBcbKYg&utm_medium=link&utm_source=api) |

Start with the projects hub, QA Lab and contact. The homepage is already indexed. Request it again after the thumbnail update goes live. The SS favicon artwork is the homepage’s preferred image in structured data. Google chooses the thumbnails that it displays. [Google image guidance](https://developers.google.com/search/docs/appearance/google-images)
