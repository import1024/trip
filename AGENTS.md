# AGENTS.md

This repository powers `https://trip.redback.me`, Redback's personal travel log.

This file is the short operational contract for AI agents and automation. Read `docs/TRAVEL_LOG_SPEC.md` before making non-trivial changes.

## Core rules

- Treat the repository as the source of truth for the current site structure and implementation.
- Treat `trips.js` as the single canonical manifest for trips shown on the homepage. Do not create a second trip registry unless the architecture is intentionally migrated.
- Do not invent itinerary facts, times, bookings, prices, addresses, transport details, entry rules, or visited experiences. Use the user's supplied material. When historical material is only a plan, label it as a plan/archive rather than implying it happened.
- Preserve existing trip pages unless the user asks to redesign them. The site intentionally allows different page types and layouts.
- Keep `CNAME` equal to `trip.redback.me`.
- GitHub Pages deploys from `main` at repository root.

## Before changing the site

1. Read `docs/TRAVEL_LOG_SPEC.md`.
2. Read `trips.js`, root `index.html`, and the files for the trip being changed.
3. Inspect one or two nearby existing trips for current conventions instead of relying on memory.
4. Prefer the smallest coherent change. Do not restyle unrelated trips or clean up legacy files opportunistically.

## Publishing a new trip

When the user says "发布到旅游日志", "发表到旅游日志", "加入旅行日志", or equivalent, interpret it as an execution request when repository write access is available.

Default workflow:

1. Create or update `YYYY/<slug>/`.
2. Ensure the trip has a directly shareable `index.html`.
3. Add or update exactly one entry in `window.TRIPS` in `trips.js`.
4. Keep `start` and `end` timezone-aware. `end` means the final arrival/end of the journey, not merely the last departure.
5. Add a poster/cover when one exists; do not fabricate one silently.
6. Update root `index.html` no-JavaScript fallback links when a trip is added or removed.
7. If a referenced JS/CSS file changed and the page uses query-string cache busting, bump the corresponding `?v=` value.
8. Check relative links, favicon, return-to-log navigation, share behavior, mobile layout, desktop layout, and basic no-JavaScript readability.
9. Commit the complete change to `main` unless the user asks for a branch/PR.

## Page types

Existing page types are intentionally different:

- **Archive / historical plan** — e.g. Hanoi. Preserve the original context and make clear that old prices, opening hours, requirements, and planned stops may be stale.
- **Journal / photography plan** — e.g. Yunnan. Prefer the shared journal shell, readable sections, poster, trip navigation, and responsive layout.
- **Live itinerary / travel assistant** — e.g. Indonesia. Structured time data, countdowns, "now/next" behavior, and timezone handling are appropriate when the source material supports them.

Do not force every old page into the newest template. Consistency should come from the site identity and navigation, not from erasing the character of each trip.

## Site-wide invariants

- Root page remains the travel-log hub: `Redback · 旅行日志`.
- Brand tone is travel journal / memory archive, not a generic tourism portal.
- Mobile and desktop must both remain first-class.
- A trip URL must work when shared directly without requiring navigation through the homepage.
- Prefer semantic HTML and graceful degradation. Important itinerary information should not disappear entirely when JavaScript is unavailable.
- Shared visual primitives live under `assets/`; trip-specific assets should remain inside the trip directory unless genuinely reusable.
- Keep wording concise and observational. Avoid promotional-tourism copy unless the user's source material uses it deliberately.

For details, schemas, design constraints, and the full release checklist, see `docs/TRAVEL_LOG_SPEC.md`.
