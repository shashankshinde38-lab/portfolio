# Shashank Shinde — QA portfolio

Next.js App Router, React, TypeScript and CSS. This upgrade applies the audited editorial presentation of https://therishithakor.com/ to Shashank's existing QA content.

## Run locally

From `portfolio/`:

```sh
npm ci
npm run dev
```

The current workspace already has dependencies and a development server at http://localhost:3000. No extra packages were added. Preserve your existing environment configuration. `.env.example` documents backend configuration; secrets are excluded from the delivery ZIP.

```sh
npm run build
npm start
```

Next generates its route declarations when dev/build runs. Generate those before a standalone TypeScript check. The optional `PORTFOLIO_DIST_DIR` environment variable selects an isolated build folder; verification used `.next-reference-build` to leave the existing preview available. Ordinary dev/build commands use `.next`.

## Integration and preservation

The workspace contains the complete changes already. The ZIP is a complete source delivery; extract it into a separate review folder before applying it to another checkout. Keep your environment files and inspect `SOURCE_MANIFEST.md` and `preservation/source-diff.patch` before merging. Existing uncommitted work was treated as the source of truth; no commits, resets, pushes or deployments were performed.

The original 253 files are in the read-only source backup named in `SOURCE_MANIFEST.md`, with an integrity checksum. The delivery ZIP includes another copy at `preservation/source-backup.zip`. `web/data/portfolio-data.ts`, specialty page content, case-study pages, backend services and original assets remain intact.

## Page and component map

- `/`: loader, live-time header, QA introduction and flip calendar, ability-card launcher, native door wall, scrolling career timeline, original project list, QA lab link and footer.
- All original hero details and metrics remain in the keyboard-accessible **My QA practice** disclosure.
- `/automation-testing`, `/manual-testing`, `/api-testing`, `/performance-testing`: overlapping sticky project cards with scroll-driven, masked monitor documents and the complete original technical sections below.
- `/mobile-testing`: overlapping sticky phone presentations with scrollable QA project documentation. These are documents, not purported recordings of client apps.
- `/qa-lab`: all eight existing artifacts, bounded pointer pan with inertia, zoom/reset/filter controls, keyboard inspection, accessible list mode and an inspector with focus management.
- Existing case studies, skills, about, experience, contact, legal, work-card and admin routes are retained.
- Existing aliases `/web-developer`, `/app-developer`, `/ui-ux-designer`, `/graphic-designer`, `/photographer` retain their QA destinations and now display the correct media.
- `QADoorsFrame` is canonical on the homepage. `SkillDoorWall` and `public/qa-doors/index.html` remain available. `ProjectPreviews/` is a compatibility re-export of the retained implementation in `ProjectLaptopShowcase/`.

## Verification

```sh
npm run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
node --test tests/security-contract.test.mjs tests/whatsapp-client.test.mjs tests/admin-flow.test.mjs
node tests/reference-ui-regression.mjs
node tests/reference-interactions.mjs
node tests/project-stack-regression.mjs
```

Browser tests use the already installed Microsoft Edge via Playwright and expect the local server on port 3000; `TEST_BASE_URL` is supported by the main UI test. Contact requests in browser verification are intercepted, so tests do not send real enquiries. Authenticated admin testing requires the separately configured `ADMIN_TEST_PIN`; it was skipped.

See `REFERENCE_TEST_REPORT.md` for exact results and limits. Screenshots, comparison/overlay images, seven browser clips and machine-readable checks are in `artifacts/reference-upgrade/` in the delivery ZIP.

## Known visual differences

This is a measured adaptation, not a claim of pixel identity. The supplied portrait/profile files contain a QA sketch and a browser screenshot; the hero uses the user's QA artwork instead of Rishi's photograph. QA documents replace reference client recordings. The original QA content and three career milestones make some pages longer than the reference. Door spring/camera timing and foil materials remain approximations. Physical-device testing, exhaustive zoom combinations and a complete performance/accessibility audit remain unverified.

Onest and EB Garamond are loaded through Next's font system. Existing legacy fonts and QA-widget styles remain supported. The source backup, dependency lockfile and legal credits are retained.

## Project-stack correction ? 18 November

The project presentations now share a sticky containing block, so the second card slides over the first. Covered cards scale back by up to 6% and receive up to 28% black shading. Sticky offsets advance by 14px on desktop and 10px on narrower layouts, using the actual header height. Desktop media alternates left/right; specialty displays use monitor stands. A single frame scheduler drives both stacking and desktop document progress. Tall mobile cards remain fully readable before pinning; reduced motion uses ordinary document flow.

The full reference scroll tour, position traces, overlap screenshots and targeted test results are under `artifacts/project-stack-correction/`. These supersede the earlier separate-card presentation and its independent scene-height test.
