# Travel Log Specification

This document defines the durable conventions for `https://trip.redback.me`.

The goal is not to freeze the site into one template. The goal is to preserve a coherent identity, a stable publishing workflow, and enough project-specific context that future AI or human edits do not have to reconstruct decisions from old chats.

## 1. Site purpose

`trip.redback.me` is Redback's personal travel log: a place to preserve travel plans, practical itineraries, photography notes, archived guides, and eventually post-trip memories.

It is not a commercial travel portal and should not read like one. The site should feel personal, concise, visual, and functional.

The homepage copy currently establishes the tone:

- `Redback · 旅行日志`
- `走过的路，记在这里。`
- `记录沿途的风景、见闻，也收藏下一次出发的期待。`

Preserve this direction unless the user explicitly asks for a brand redesign.

## 2. Source of truth hierarchy

When information conflicts, use this order:

1. The user's current explicit instruction.
2. Current repository implementation and trip content.
3. `trips.js` for homepage trip metadata.
4. This specification and `AGENTS.md` for project invariants.
5. Historical chat context / model memory only as supporting context.

Do not overwrite current repository facts because an old conversation remembered something differently.

## 3. Repository structure

Current structure is intentionally simple and static:

```text
/
├─ index.html              # travel-log hub
├─ hub.css                 # homepage styles
├─ hub.js                  # homepage rendering and status logic
├─ trips.js                # canonical trip manifest
├─ stories.js              # canonical journey-record manifest
├─ CNAME                   # trip.redback.me
├─ assets/
│  ├─ favicon.svg
│  └─ journal.css          # shared trip-page visual primitives
├─ 2026/
│  ├─ hanoi/
│  ├─ shangri-la/
│  └─ indonesia/
├─ stories/
│  ├─ index.html           # journey-record collection
│  └─ 2026/
│     └─ guiyang/
├─ AGENTS.md
└─ docs/
   └─ TRAVEL_LOG_SPEC.md
```

Future trips should normally follow `YYYY/<slug>/`.

Examples:

```text
2027/japan/
2027/xinjiang/
```

Use lowercase ASCII slugs, short enough to be shareable.

## 4. Canonical trip manifest: `trips.js`

`trips.js` is the single source of truth for trips displayed on the homepage.

Do not introduce `trips.json`, YAML, or another parallel registry unless the whole site is intentionally migrated.

Current shape:

```js
{
  id: 'yunnan-2026',
  title: '香格里拉',
  dates: '2026.09.25—09.30',
  start: '2026-09-25T09:06:00+08:00',
  end: '2026-10-01T00:00:00+08:00',
  path: '2026/shangri-la/',
  image: '2026/shangri-la/poster-v2.jpg',
  summary: '...',
  people: '1 人独行',
  type: '摄影行程',
  note: '9 月 25 日 09:06 从科韵路出发'
}
```

### Field rules

- `id`: stable unique identifier. Recommended `<slug>-<year>`.
- `title`: the trip's editorial title, not necessarily the destination name.
- `dates`: human-readable display range.
- `start`: ISO-8601 timestamp with timezone offset.
- `end`: ISO-8601 timestamp with timezone offset. Use the final arrival/end of the trip when known.
- `path`: relative path to directly shareable trip page; normally `YYYY/<slug>/`.
- `image`: optional cover/poster path.
- `summary`: one concise descriptive sentence; avoid generic tourism marketing copy.
- `people`: e.g. `1 人独行`, `3 人同行`.
- `type`: concise content type, such as `攻略归档`, `摄影行程`, `实时行程`.
- `note`: short timing or status context shown in the featured card.

### Time semantics

The homepage automatically classifies trips as:

- `即将出发`: now < start
- `旅途中`: start <= now < end
- `已结束`: now >= end

Therefore time values are operational data, not decoration.

Rules:

- Always include a timezone offset.
- Do not invent precise times when only a date is known.
- For historical plans without exact transport timing, a date-boundary value is acceptable if clearly treated as coarse metadata.
- `end` should not prematurely mark a journey as finished merely because the final flight/train has departed; use final arrival or a sensible end-of-trip boundary.

### Journey-record manifest: `stories.js`

`stories.js` is the separate source of truth for actual post-trip writing shown in the homepage `旅途记录` section. Records normally live under `stories/YYYY/<slug>/`; their existing trip plans remain at their original URLs.

Required fields are `id`, `title`, `dates`, `path`, `summary`, and `type`. `image`, `meta`, and `planPath` are optional. When `planPath` exists, link the plan and record in both directions. Do not place records in `trips.js`, because its dates drive live plan status and countdown behavior.

When photographs come from local originals, preserve their order and visual character, optimize them for web delivery, use lazy loading below the first meaningful image, and record intentional repeated placements without duplicating the underlying asset.

## 5. Page types and when to use them

The site deliberately supports multiple presentation models.

### 5.1 Archive / historical plan

Reference: `2026/hanoi/`.

Use when preserving an old guide or plan after the trip has already passed, especially when the content was written before travel and has not been reconciled with what actually happened.

Requirements:

- Clearly label the page as an archive / historical plan.
- Do not imply every planned place was actually visited.
- Warn that old prices, opening hours, addresses, policies, visas, and transportation details may now be stale.
- Preserve the original artifact when useful (`original.html` is an example).

### 5.2 Journal / photography plan

Reference: `2026/shangri-la/`.

Use for a narrative but practical travel page centered on route, visual experience, weather choices, or photography.

Preferred elements when relevant:

- shared `assets/journal.css`
- hero / editorial title
- travel poster
- concise route overview
- day-by-day itinerary
- photography locations / time / focal-length notes
- practical transport anchors
- packing or decision notes
- return-to-log navigation
- share action

Do not force all these modules when the trip does not need them.

### 5.3 Live itinerary / travel assistant

Reference: `2026/indonesia/`.

Use only when the source itinerary contains enough structured timing to justify it.

Possible features:

- current activity
- next important time point
- countdown
- automatic day selection
- time simulation for testing
- structured day data in a separate JS file
- map/search links

Requirements:

- Timezone handling must be explicit and tested.
- The page must say that the schedule is plan-based and does not automatically sync live flight/ship status unless a real data source is added.
- Do not create fake “real time” by inventing data.

### 5.4 Journey record / photo essay

Reference: `stories/2026/guiyang/`.

Use for post-trip writing, photographs, observations, and memories. A record is separate from its corresponding plan and normally lives under `stories/YYYY/<slug>/`.

Two source modes are supported:

- **Collaborative creation**: the user supplies facts, memories, rough notes, captions, and/or photographs; the text and structure are developed together. Editorial help may improve pacing and clarity, but must not manufacture experiences or flatten the user's voice.
- **External-platform migration**: the user supplies an existing post (HTML, Markdown, text export, or saved webpage) and original photographs. Treat the published post as the narrative/order source and the photograph archives as the asset source. Use references, attachment blocks, metadata, or other deterministic evidence to map placements; filenames need not already match.

Material intake should establish, when available:

- editorial title and destination
- trip date/year and relationship to an existing plan
- narrative source or working notes
- original photographs, which may arrive in multiple archives
- original publication URL and whether it should be linked
- any requested omissions, privacy constraints, or people who should not be shown

Migration and media rules:

- Preserve narrative sequence and photograph placement order.
- Preserve intentional repeated placements while storing only one optimized underlying asset.
- Do not silently reorder photographs by filename, capture time, or aesthetic preference when the source already defines order.
- Optimize for web delivery while retaining the original crop, tone, and visual character unless the user requests re-editing.
- Use meaningful dimensions, lazy loading below the first meaningful image, and direct asset paths that work on GitHub Pages.
- Prefer no-crop editorial composition. Same-orientation photographs may share a row. Mixed landscape/portrait sequences should normally break at the orientation change: landscape images remain wide; single portrait images are narrower and centered. Avoid one-sided empty areas and avoid `object-fit: cover` merely to force equal boxes.
- Keep mobile and desktop layouts first-class; a dense desktop grid may become a simpler phone sequence.
- Record the original source link and an archive/provenance note when migrating another publication.

Publishing requirements:

- Add/update exactly one `stories.js` entry.
- Update the `stories/` collection and homepage fallback/discovery paths.
- Cross-link plan and record when a plan exists.
- Verify narrative order, placement count, unique asset count, missing assets, repeated references, direct URLs, sharing, and responsive composition.

## 6. Shared visual identity

The site should be consistent without making every journey look identical.

### Stable identity

- Brand: `Redback · 旅行日志`
- Personal journal rather than tourism product
- Strong editorial title + concise copy
- Useful information density
- Posters / photography can carry emotion; UI chrome should remain restrained
- Mobile-first readability while preserving a good desktop composition
- Avoid excessive decorative cards, gradients, icons, or app-dashboard aesthetics unless the page's function calls for them

### Shared components

Use `assets/journal.css` when a trip benefits from the journal-style shell.

Common elements include:

- `.journal-nav`
- `.share-button`
- `.container`
- `.info-bar`
- `.section-title`
- `.section-nav`
- trip/day chips and timeline primitives

Trip-specific presentation may extend these with a local CSS file.

### Typography

Current journal pages use Noto Serif SC and Noto Sans SC via Google Fonts. Preserve gracefully if available, but the content should remain readable with system fallback fonts.

### Color

Do not impose one destination color on every page. Destination-specific color systems are allowed, but retain restrained contrast and readable body text.

## 7. Poster / cover convention

A poster is a preferred but not mandatory trip artifact.

When present:

- Store it inside the trip directory.
- Reference it from `trips.js` via `image`.
- Make it accessible from the trip page when appropriate.
- Use descriptive `alt` text.
- Avoid stretching/cropping it incorrectly in the homepage card.

Typical current poster aspect ratio is approximately 4:5 (`1122 × 1402`), but this is a convention, not a hard requirement.

Do not silently generate or substitute a new poster when the user asked only to update text/content.

## 8. Navigation and sharing

Every new trip page should normally include:

- a clear route back to the travel-log homepage
- a direct URL that works when opened/shared by itself
- a share action when consistent with the page

Current share behavior is conceptually “分享行程” while the underlying implementation may simply copy the current URL and show a success toast. Preserve the user-facing concept rather than labeling it mechanically as “复制链接”.

Do not require geolocation for normal itinerary navigation unless the user explicitly wants location-aware behavior.

## 9. Homepage behavior

Root `index.html` + `hub.js` render the travel hub from `window.TRIPS`.

Expected behavior:

- Trips sorted by start time descending in the archive list.
- Featured section shows a current trip if one exists; otherwise the nearest future trip.
- Status labels derive from `start` and `end`.
- If every recorded trip is over, show an archive-style finished message.
- Homepage remains useful on both desktop and mobile.

### No-JavaScript fallback

`index.html` contains direct trip links in `<noscript>`.

Whenever trips are added or removed, update these links so the major journeys remain discoverable without JavaScript.

## 10. Content integrity rules

This is one of the most important constraints.

### Never silently invent

Do not fabricate:

- flight/train numbers or times
- hotel names or addresses
- booking status
- entry/visa rules
- opening hours
- prices
- trail closures/open status
- whether a planned activity actually happened
- weather observations from a trip that has not happened yet

If missing information prevents an exact feature, use a neutral placeholder, omit the feature, or state the uncertainty.

### Plan vs. memory

A pre-trip plan and a post-trip journal are different artifacts.

Before departure, wording should reflect intention:

- `计划`
- `候选`
- `视天气决定`
- `以现场为准`

After the trip, do not automatically rewrite those into factual experience. Only do that from user-provided post-trip information.

## 11. Responsive and accessibility baseline

At minimum:

- include `<meta name="viewport">`
- no horizontal overflow at common phone widths
- readable text without zoom
- tap targets large enough for mobile
- meaningful images have `alt`
- buttons have understandable labels
- active tabs should have visible state; use ARIA roles/attributes where practical
- information hidden by interactive tabs should have a reasonable no-JS fallback where important

Do not optimize only for one desktop screenshot.

## 12. Asset and cache-busting convention

The site currently uses query-string versions such as:

```html
<link rel="stylesheet" href="hub.css?v=3">
<script src="trips.js?v=5" defer></script>
```

When changing a referenced JS/CSS asset, bump its version in relevant HTML so GitHub Pages/browser caches do not preserve stale behavior.

Do not bump versions when the underlying asset did not change.

Shared assets belong in `assets/`; destination-specific assets belong in the destination directory.

## 13. Legacy files

Some root-level files may be historical remnants from an earlier single-trip version (`app.js`, `data.js`, `style.css`, `poster.png`).

Do not delete them opportunistically while publishing a trip. Cleanup should be a separate explicit task because similarly named files inside destination directories may still be active.

## 14. Default publishing workflow

When asked to publish a trip:

1. Inspect current repo state.
2. Identify whether the request is a new trip, update, archive, or redesign.
3. Read the source material supplied by the user.
4. Choose the most appropriate existing page model rather than blindly cloning the newest page.
5. Create/update `YYYY/<slug>/`.
6. Ensure the page's title, description, favicon, back navigation, and share behavior are correct.
7. Add/update the `trips.js` manifest entry.
8. Update root `<noscript>` links if trip membership changed.
9. Bump cache versions only for changed referenced assets.
10. Verify relative asset links and direct-share path.
11. Check phone and desktop layout.
12. Check JS-disabled readability for essential content.
13. Commit to `main` (GitHub Pages deploys from `main` root) unless the user requests a branch/PR.

### Journey-record workflow

When the destination is `stories/`:

1. Determine whether the source is collaborative creation or external migration.
2. Inventory narrative sources, photograph archives, source links, dates, and any privacy/omission requirements.
3. Build a deterministic placement map before renaming or optimizing assets. When an exported post contains attachment references, prefer those references over perceptual guessing.
4. Draft or migrate the narrative without inventing completed-trip facts.
5. Create/update `stories/YYYY/<slug>/`, `stories.js`, the record collection, homepage fallback, and plan cross-links.
6. Optimize photographs, preserve repeated placements, and apply orientation-aware editorial grouping without cropping by default.
7. Validate text order, photograph placement count, unique asset count, missing paths, lazy loading, direct URLs, mobile/desktop layout, and sharing.
8. Commit to `main` unless the user requests a branch/PR.

## 15. Pre-commit checklist

### Content

- [ ] No invented itinerary facts.
- [ ] Plan vs. completed-trip wording is correct.
- [ ] Dates and times match the supplied source.
- [ ] Timezones are explicit in structured timestamps.
- [ ] Historical operational information is labeled appropriately.

### Manifest

- [ ] Unique `id`.
- [ ] Valid `path`.
- [ ] `image` exists if specified.
- [ ] `start < end`.
- [ ] `summary`, `people`, `type`, `note` are concise and accurate.

### Page

- [ ] Direct URL opens independently.
- [ ] Back-to-log link works.
- [ ] Share action works when present.
- [ ] Poster/cover aspect is not visibly broken.
- [ ] Relative CSS/JS/image paths work.
- [ ] Favicon path is correct.
- [ ] Mobile layout is readable.
- [ ] Desktop layout remains coherent.
- [ ] Important content remains accessible without JS when feasible.

### Site

- [ ] Root homepage still renders all trips.
- [ ] Featured trip logic remains valid.
- [ ] `<noscript>` fallback is current.
- [ ] `CNAME` remains exactly `trip.redback.me`.
- [ ] Cache-busting versions changed only where necessary.

## 16. Change philosophy

Prefer evolution over redesign.

Each journey can develop its own visual identity and functionality, while the repository-level contract preserves continuity. A stronger model in the future should need less procedural prompting, but it will still need these project-specific facts: what the site means, where canonical state lives, what must not be invented, and which behaviors count as correct.
