# Verification report — 18 November 2026 (IST)

## Final results

| Check | Result |
| --- | --- |
| Production build | PASS — Next.js 16.3.4, 32 static generation tasks; all listed app routes built |
| TypeScript | PASS — `tsc --noEmit --incremental false` |
| Full ESLint | PASS — zero errors, zero warnings |
| Existing security/API-client/admin tests | 16 passed, 0 failed, 1 skipped (authenticated admin requires test PIN) |
| Local routes | 23 original content routes returned HTTP 200 |
| Existing reference aliases | 5 returned HTTP 200 and rendered the correct QA project media |
| Responsive checks | 168 checks; zero detected document/body horizontal overflow |
| Browser behaviors | 24 assertions passed across main and extended suites |
| Runtime errors | Zero page errors recorded in these browser runs |
| Images | No failed completed images detected in the route sweep |
| Content preservation | 12 original collections structurally equal; 5 projects, 5 canonical doors, 3 milestones, 8 QA artifacts and all original service/timeline choices retained |

The viewport sweep covers 1440×900, 1920×1080, 1366×768, 1280×800, 1024×768, 820×1180, 768×1024, 640×900, 430×932, 390×844, 375×812, 360×800, 320×700 and 844×390 on the main presentation routes. Other original routes were checked at 1440, 390 and 320px. Screenshots were captured at representative 1440, 768, 390 and 320px widths.

## Behaviors exercised

One canonical door wall; hinged hover; fifth-door reveal; walkthrough; all five keyboard routes and browser Back/focus restoration; ability card open/keyboard flip/Escape/focus return; theme persistence across routes and standalone preview; masked monitor scrolling while its shared-stack card remains pinned; phone scroll; all timeline entries; mobile menu focus containment; fifth door in the mobile scroll area; contact validation/schema/failure handling; reduced-motion loader/calendar/media behavior; QA-lab pan/inertia/list/filter/keyboard inspector/focus return; skip links.

Measured screen scrollTop changed from 282 to 1208 while the card remained pinned. The updated assertion checks native card anchoring and content bounds; the device scales with its card during cover transitions.

## Evidence

- `artifacts/reference-upgrade/local/regression.json`, `extended-regression.json`: results and viewport details.
- `artifacts/reference-upgrade/final-checks.json`, `production-build.log`, `unit-tests.tap`, `eslint.json`, `typecheck.log`.
- `artifacts/reference-upgrade/content-preservation.json`, `source-graph.json`, source manifests and diffs.
- `artifacts/reference-upgrade/local/home-comparison.png`: reference and QA adaptation at 1440×900.
- `artifacts/reference-upgrade/local/home-overlay.png`: 50% overlay, for visual review; different identity/content precludes a meaningful pixel-equality score.
- `artifacts/reference-upgrade/reference/`: captures and browser measurements from every reference route.
- `artifacts/reference-upgrade/clips/`: actual browser-rendered WebM recordings for reference intro, door hover, ability card, contact, mobile menu, gallery drag and the local laptop scene. Screencast frame rate is variable; these are not timing-calibration recordings.

## Honest limits

The portrait, client recordings, third-party art and full reference media collection were not copied. Suitable personal cutout photography and original app recordings are absent in this source. No live contact delivery/email/WhatsApp or authenticated-admin mutation was performed. Physical touch hardware, all zoom combinations, exhaustive mid-animation comparisons, measured frame-perfect motion, a full WCAG audit and production performance profiling remain unverified. The reference photography field is represented by the existing QA-evidence canvas, not by an invented photography collection.

Reference inspection began on 17 November and final local checks completed on 18 November IST. Raw timestamps in machine logs are UTC.

## Corrected project-stack verification

The original suite did not assert overlapping cards. After the user's correction, all seven reference routes were wheel-scrolled to their page ends at 1870×950, with additional mobile traces for the web/app/UI pages. Shared sticky siblings, 14px/10px offset steps, top-center scaling and a black cover shade were observed and measured. The graphic rows and photography field were distinguished from card stacks.

The correction adds 29 passing stack checks across five QA pages, seven responsive/landscape sizes, reverse scrolling, hit-testing of the incoming foreground card, original-section/footer release, alternating media, reduced motion and clamped document progress. The full 168-viewport suite was rerun and passes, and client-side navigation from automation to mobile rebinds the new deck correctly. Production build, TypeScript, lint and the existing tests were rerun successfully. Data comparisons remain equal.

Evidence: `artifacts/project-stack-correction/local/stack-comparison.png`, `matched-measurements.json`, `reference/tour-summary.json`, `local/regression.json` and forward/reverse `.webm` clips under `clips/`. The prior ZIP has been replaced with the corrected source.
