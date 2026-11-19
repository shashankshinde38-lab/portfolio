# Reference audit — 17 November 2026

Reference: https://therishithakor.com/. Edge / Playwright, real browser, 1440×900 and 390×844. Raw DOM measurements, CSSOM, media inventories and screenshots: `artifacts/reference-upgrade/reference/`. These are inspection evidence, not application assets. Full-page screenshots include lazy entrance states; section snapshots show rendered comparisons.

| Reference route | Browser-observed presentation | QA mapping |
| --- | --- | --- |
| `/` | Warm gray paper; fixed text navigation and live time; large Onest introduction and spiral calendar; right figure/card launcher; arched fluted doors; sticky year and vertical chronology; dark contact footer | HeroSection, FlipCalendar, SiteHeader, native QADoorsFrame, ExperienceTimeline, AbilityCard3D and contact |
| `/web-developer/` | Sundown Studio, Personal portfolio, P&L Page, Capital Gains Tax Calculator, Tax API Cost Calculator, Tax P&L Report, Capital Gains Statement; large round project panels; monitor recordings and long screenshots | Automation/API/performance documents from existing QA data; all technical sections retained |
| `/app-developer/` | Expense Tracker, Secret Vault, Brick Breaker, Dice; rounded phone frames and recordings | Mobile QA phone frames with actual project documentation; no fabricated recordings |
| `/ui-ux-designer/` | Cliq, Prime Hostel, WeBuildTech, Jordan One Take 4, P&L Page; large screen/prototype media | Existing QA evidence and case studies; no unrelated design work invented |
| `/graphic-designer/` | Qodoro Realty, Himspring, Kallisto Miorah, WeBuildTech, Posters & logos; horizontal artwork lines and selected-print overlay | QA preview strips and original ImageLightbox with keyboard/touch |
| `/photographer/` | Full viewport image field; multidirectional drag invitation; close and previous/next | No photography collection in source; QA lab remains its own interactive experience |
| `/legal/` | Narrow editorial hierarchy, privacy sections and credits | Existing legal content retained and preference storage corrected |

## Browser measurements

At 1440×900: body rgb(232,228,224), text rgb(26,24,24), Onest 16px. Hero headline 76px / 74.48px at x≈104px; hero 900px tall. Story heading 54.4px / 53.312px. Footer heading 104px / 98.8px. Text navigation above 1200px, menu below. EB Garamond supports secondary text. Per-element values are in JSON.

## Evidence status

**OBSERVED:** seven routes, project order, desktop/mobile initial and entered captures, CSSOM, door hover, ability/contact overlays and section snapshots.

**INFERRED / adaptation:** QA documentation substitutes for recordings/artwork; QA identity artwork substitutes for missing portrait. Existing QA detail remains below media.

**APPROXIMATION:** spring constants, camera timing and foil material. Retained doors use a 70° swing and 1300ms camera move; these are source-derived, not measured reference values.

**UNVERIFIED:** exhaustive frame timing, physical touch hardware, battery performance, all requested zoom combinations, all requested video states and exhaustive zoom combinations. Seven browser clips and a same-viewport comparison/overlay are supplied; see `REFERENCE_TEST_REPORT.md`.

No reference photographs, client art, biography, email, legal assertions, CSS or JavaScript are installed in the application.

## Final preservation and comparison

Twelve source data collections compare equal structurally. All 253 original input files remain present. See `SOURCE_MANIFEST.md` for complete hashes/statuses and the feature mapping. The local QA lab preserves its evidence content while using multidirectional pointer pan/inertia and an accessible list alternative. The homepage keeps its original project summaries as a compact list; detailed device scenes are on specialty pages. This intentionally retains more QA content than the reference.

## Correction: full-scroll project stacks ? 18 November 2026

The earlier inspection missed the shared project stacking behavior. A new real-browser wheel-scroll tour traversed all seven routes to their page ends at 1870?950 and sampled the web/app/UI pages at 390?844. Photography has a single-viewport canvas rather than a vertical page. Raw samples, headings, dimensions, styles and screenshots are in `artifacts/project-stack-correction/reference/`.

**Observed:** web development (7 cards), app development (4) and UI/UX (5) use sticky sibling cards in a shared container. The incoming card paints over the previous card. The covered card scales down up to 6%, with a black dim overlay up to 28%; transform origin is top center. Desktop stick positions differ by 14px per card; mobile by 10px. The base position follows the navigation height plus 16px / 10px. The measured desktop web cards were 1232px wide, 722px high at 1870?950, with a 57px gap (6vh). Alternating projects swap text and device columns. The stack releases at its own end before the footer. Graphic design has horizontal artwork lines rather than this card stack.

**Implementation correction:** ProjectStack now owns a shared native sticky deck and one scroll scheduler. Laptop/monitor and phone panels are siblings in that deck; the independent 185svh wrappers were superseded. Specialty screens use the observed monitor format and alternate columns. QA document scrolling remains functional inside the masked device. Tall-content and reduced-motion fallbacks retain complete text. Tests now assert actual geometric overlap and foreground hit-testing, shade/scale, reverse scrolling, scroll range, release into original technical content and narrow-width behavior.
