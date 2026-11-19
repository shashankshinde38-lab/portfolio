# Project-stack audit — 18 November 2026

The earlier independent project sections missed the overlap shown by the user. The new deck uses direct sticky sibling cards in one containing block. All project data and technical sections remain.

## Full reference scroll tour

| Route | Card count | Wheel-scroll samples | Reached scroll Y / page height |
| --- | --- | --- | --- |
| `/web-developer/` | 7 | 25 | 5744 / 6694 |
| `/app-developer/` | 4 | 17 | 3750 / 4700 |
| `/ui-ux-designer/` | 5 | 19 | 4186 / 5136 |
| `/graphic-designer/` | 0 | 67 | 16849 / 17799 |
| `/photographer/` | 0 | 1 | 0 / 950 |
| `/` | 0 | 18 | 3542 / 4492 |
| `/legal/` | 0 | 11 | 2146 / 3096 |

All desktop page ends were reached. Photography fills one viewport and uses a draggable field rather than vertical document scrolling. Web/app/UI mobile traces were also collected. The reference supports a shared stack in those three project page types, while graphic design uses artwork rows.

## Matched overlap comparison

Both captures use 1870×950 and place the incoming second card at y=400px.

| Property | Reference | QA portfolio |
| --- | --- | --- |
| Pinned card top (px) | `81` | `82` |
| Covered card width (px) | `1190.72802734375` | `1190.76318359375` |
| Unscaled card height (px) | `722` | `720` |
| Scale transform | `matrix(0.9665, 0, 0, 0.9665, 0, 0)` | `matrix(0.966529, 0, 0, 0.966529, 0, 0)` |
| Black shade opacity | `0.156` | `0.1562` |

The 1px pin-position and 2px card-height differences are measured; identity, text and on-device QA documentation differ intentionally. This is evidence for the corrected stacking behavior, not a claim that every page pixel matches.

## Implementation

- `ProjectStack` owns one passive native-scroll listener and frame scheduler per deck.
- Cards stay sticky in the shared parent; the next card paints above the previous one. The old independent 185svh wrappers are no longer used by the deck.
- Maximum scale reduction is 6%; black overlay opacity reaches 28%; transform origin is top center. Desktop pin steps are 14px, mobile steps 10px.
- Specialty desktop devices use monitor stands and alternating media/copy columns. Phone presentations share the deck and retain their phone geometry.
- Masked QA documents still scroll within their screen aperture; reduced motion falls back to regular document flow. Tall cards scroll fully before pinning, retaining their text.
- Focus entering an obscured card reveals it; resize, input changes, visibility changes, navigation and unmount are handled.

## Results

29 stack assertions pass; the full 168-viewport sweep and 23-route checks pass. Client-side navigation rebinds the stack. Production build, full lint, TypeScript and 16 existing tests pass; authenticated admin testing remains skipped without its test credential. Twelve original data collections remain structurally equal.

Screenshots and traces: `artifacts/project-stack-correction/`. Forward/reverse recordings: `artifacts/project-stack-correction/clips/`.
