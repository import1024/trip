# AGENTS.md

This repository powers `https://trip.redback.me`, Redback's personal travel log.

This file is the short operational contract for AI agents and automation. Read `docs/TRAVEL_LOG_SPEC.md` before making non-trivial changes.

## Core rules

- Treat the repository as the source of truth for the current site structure and implementation.
- Treat `trips.js` as the single canonical manifest for the current **travel plans** shown on the homepage. Do not create a second plan registry unless the architecture is intentionally migrated.
- Treat `stories.js` as the canonical manifest for published **journey records** shown on the homepage. Keep it separate from `trips.js`.
- The current journeys are plans, not post-trip records. Do not present planned activities as things that actually happened.
- Future **旅途记录 / journey records** may be added as a separate content layer for actual experiences, reflections, and photographs. Preserve the original plan rather than silently rewriting it into a record.
- Do not invent itinerary facts, times, bookings, prices, addresses, transport details, entry rules, or visited experiences. Use the user's supplied material. When historical material is only a plan, label it as a plan/archive rather than implying it happened.
- Preserve existing trip pages unless the user asks to redesign them. The site intentionally allows different page types and layouts.
- Keep `CNAME` equal to `trip.redback.me`.
- GitHub Pages deploys from `main` at repository root.

## Before changing the site

1. Read `docs/TRAVEL_LOG_SPEC.md`.
2. Read `trips.js`, root `index.html`, and the files for the trip being changed.
3. Inspect one or two nearby existing trips for current conventions instead of relying on memory.
4. Prefer the smallest coherent change. Do not restyle unrelated trips or clean up legacy files opportunistically.

## Publishing a new trip plan

When the user says "发布到旅游日志", "发表到旅游日志", "加入旅行日志", or equivalent while discussing a future or planned journey, interpret it as an execution request to publish/update a **旅途计划** when repository write access is available.

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

## Publishing a journey record

When the user says "发游记", "发布游记", "发布旅途记录", "迁移游记", or equivalent, interpret it as an execution request to publish/update a **旅途记录** under `stories/` when repository write access is available.

Journey records may enter through either workflow:

- **Collaborative creation**: work with the user from notes, facts, memories, captions, and photographs. Help structure and edit the piece, but keep factual claims grounded in supplied material and preserve the user's voice.
- **External-platform migration**: import an already-published HTML/Markdown/text post plus its original photographs. Preserve narrative order, photo placement order, intentional repeated references, and the original source link when available. Photo filenames do not need to match the post if references or attachment metadata can establish the mapping.

Default workflow:

1. Identify the source mode and collect the minimum viable materials: title/destination, date or year, narrative or notes, photographs, and any existing plan/source URL. Archives may be split across several files.
2. Create or update `stories/YYYY/<slug>/` and keep the original trip plan intact.
3. Preserve supplied facts, narrative order, photograph order, and intentional duplicate placements. Do not infer visits or experiences absent from the source.
4. Optimize local photographs for web delivery without silently re-editing their visual character. Reuse one optimized asset for repeated placements.
5. Prefer uncropped editorial layouts. Group photographs with the same orientation; when landscape and portrait images would create a large one-sided void, break the sequence into separate rows, keep landscape images wide, and center portrait images at a narrower width.
6. Add or update exactly one entry in `window.STORIES` in `stories.js`.
7. Update the homepage no-JavaScript fallback and the `stories/` collection page.
8. Link the record and its corresponding plan in both directions when a plan exists. Link the original external publication when migration provenance matters.
9. Run direct-link, responsive, accessibility, sharing, asset-integrity, and deployment checks. Verify placement count, unique asset count, missing files, and mobile/desktop composition.

## Plan vs. journey record

Treat these as different artifacts:

- **旅途计划**: what is intended before or during the trip — itinerary, transport, lodging, candidates, weather-dependent choices, photography spots, preparation notes.
- **旅途记录**: what actually happened — selected photographs, observations, reflections, changes from the plan, memorable details, and post-trip writing.

Default behavior:

- Keep plans intact as historical planning artifacts after the trip.
- Do not convert plan text into factual post-trip narrative without user-provided evidence.
- When journey records are introduced, give them a distinct navigation/section or data model rather than mixing them into `trips.js` by accident.
- A plan and its journey record may link to each other.

## Page types

Existing page types are intentionally different:

- **Archive / historical plan** — e.g. Hanoi. Preserve the original context and make clear that old prices, opening hours, requirements, and planned stops may be stale.
- **Journal / photography plan** — e.g. Yunnan. Prefer the shared journal shell, readable sections, poster, trip navigation, and responsive layout.
- **Live itinerary / travel assistant** — e.g. Indonesia. Structured time data, countdowns, "now/next" behavior, and timezone handling are appropriate when the source material supports them.

Do not force every old page into the newest template. Consistency should come from the site identity and navigation, not from erasing the character of each trip.

## Site-wide invariants

- Root page remains the travel-log hub: `Redback · 旅行日志`.
- The current collection heading is `旅途计划`; reserve `旅途记录` for actual post-trip records when that section exists.
- Brand tone is travel journal / memory archive, not a generic tourism portal.
- Mobile and desktop must both remain first-class.
- A trip URL must work when shared directly without requiring navigation through the homepage.
- Prefer semantic HTML and graceful degradation. Important itinerary information should not disappear entirely when JavaScript is unavailable.
- Shared visual primitives live under `assets/`; trip-specific assets should remain inside the trip directory unless genuinely reusable.
- Keep wording concise and observational. Avoid promotional-tourism copy unless the user's source material uses it deliberately.

For details, schemas, design constraints, and the full release checklist, see `docs/TRAVEL_LOG_SPEC.md`.
