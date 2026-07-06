# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-file static website for the **Commodity Trading & Shipping Club (CTSC)** at Indiana University. The deliverable is `/Users/seva/Downloads/commodity-club-website/index.html` — one self-contained HTML file that runs entirely in the browser with no build step.

To preview: open `index.html` directly in a browser, or run a local server:
```
cd /Users/seva/Downloads/commodity-club-website
python3 -m http.server 8080
```

The site has **zero runtime dependencies**. The only tooling is a dev-only test harness (see Testing below).

## Testing

```
bun install   # once
bun run test  # runs tests/run-tests.mjs
```

(The machine has bun, not node; the script also runs under `node tests/run-tests.mjs` if node is ever installed.)

`tests/run-tests.mjs` checks, in order:
1. **JSX compile** — every `<script type="text/babel">` block compiles with Babel. A syntax error in this file ships a blank page, so this is the most important check.
2. **Asset existence** — every local image referenced in `index.html` exists on disk (catches filename case/space typos like `dump truck.jpeg` / `houston_trip.JPG`).
3. **Fictional-content regression** — placeholder copy that was removed (e.g. "The Dispatch", "Vol. VII") stays removed; no dead `href="#"` links.
4. **Render smoke test** — all pages render in jsdom with `fetch` rejected (offline fallback path); the About calendar shows the current month.
5. **Data integrity** — `EDITIONS`, `COMMODITIES`, `EVENTS`, `DESK_MAPS` have required fields (all six desks, 8+ points each, unique ids, in-frame lon/lat); every newsletter chart file exists; `WORLD_PATHS` stays generated and under budget.
6. **Window exports** — every component the router needs is on `window`.

Run the tests after any change to `index.html`.

## Architecture

The entire application is a single `index.html` using **React 18 + in-browser Babel** loaded from CDN. All JSX lives in **one** `<script type="text/babel" data-presets="env,react">` block, organized with `// ======== pages/X.jsx ========` section comments. Components and data arrays are exposed on `window` via:
```js
Object.assign(window, { ComponentName });
```
The router (`App`) and `boot()` look components up on `window` — keep these exports when adding pages. Do not use ES module `import/export`.

### Loading skeleton
`<div id="root">` contains static skeleton markup (`.skel` class + `skel-pulse` shimmer, defined in the second `<style>` block) that displays while React/Babel load and compile. React's first render replaces it automatically — nothing to clean up. It mirrors the About hero (dark header bar + headline blocks); keep its shape roughly in sync if that hero changes materially.

### Routing
Client-side routing is a single `useState` in the root `App` component (no persistence). Navigation happens by calling `onNav('pagename')` passed as a prop.

### Auth
There are **no password gates** — the old site-wide `SiteLock` and the newsletter `NewsletterGate` were both removed deliberately. Every page is public.

### Pages
| Key | Component | Notes |
|-----|-----------|-------|
| `about` | `AboutPage` | hero, mission, pillars, Houston trip, **Events month calendar (`EventsCalendar` + `EVENTS` array)**, stats, leadership |
| `commodities` | `CommoditiesPage` | **Commodity Atlas (persistent interactive world map, `DESK_MAPS`)** with 6 desk tabs, live-price tables with sparklines, key spreads per desk, market overviews, news sources |
| `newsletter` | `NewsletterPage` | "Weekly Energy Insights" — real editions from the `EDITIONS` array |
| `membership` | `MembershipPage` | application info + form |

### Events calendar (`EVENTS` array)
The About page renders a month-grid calendar (`EventsCalendar`, prev/next month navigation, defaults to the current month). It is intentionally empty until the club schedules events. To add one, append to `EVENTS`:
```js
{ date: '2026-09-10', title: 'Guest speaker — Vitol', type: 'SPEAKER', where: 'Hodge Hall' }
```
`date` must be `YYYY-MM-DD` (the tests enforce this). Events render as navy chips on desktop and brass dots on mobile.

### Newsletter editions (`EDITIONS` array)
The newsletter page renders entirely from the `EDITIONS` array (top of the NewsletterPage section). **To publish a new edition**: add an object to the FRONT of the array — `EDITIONS[0]` renders as the current edition, all entries appear in the archive table. Each edition has `no`, `title`, `date`, `cat`, `authors[]`, `tradeIdeas[]` (`dir` must be `BULLISH`/`BEARISH`), and `sections[]` (`desk`, `call`, `paras[]`, `charts[]`). Chart images go in the repo root named `ed<N>-<slug>.png`.

Known pending item: Edition 1's Natural Gas section contains a literal `$X` (unfilled figure from the source doc) — `renderNewsPara()` renders it visibly flagged. Replace `$X` in the `EDITIONS` data when the real number is known.

**Do not create a `newsletter/` directory** — the untracked `Newsletter/` folder (source .docx) in the main checkout would collide on macOS's case-insensitive filesystem.

### Live prices & sparklines
`useLivePrices` fetches Alpha Vantage (commodities) and Finnhub (ETF proxies), cached in `localStorage` (`ctsc-live-prices-v3`, 6h TTL). `fetchAVCommodity` also returns a `series` array (30 daily / 12 monthly points) rendered by the `Sparkline` component in the price tables. Static prices in `COMMODITIES` are the offline fallback — keep them realistic. Bump the cache key suffix whenever the cached shape changes.

`LiveSpreadStrip` (next to `Sparkline`) computes the Brent–WTI front spread from the BRN/WTI daily series (tail-aligned — both follow the EIA publication calendar) and renders a value + sparkline card above the descriptive "Key spreads & benchmarks" list on the Crude & Refined desk. It renders nothing until both series are live, so there is no fake fallback number.

### Commodity Atlas (the map)
The Commodities page is built around one persistent world map (`CommodityMap`) that sits directly under the desk tab bar; switching tabs cross-fades its layers (220ms). Six desks: CRUDE & REFINED · NAT GAS · POWER · METALS · AGRICULTURE · FREIGHT — the desk keys in `DESK_MAPS` must exactly match `COMMODITIES[].cat`.

- **Geometry**: `WORLD_PATHS` is generated from Natural Earth 110m land outlines (public domain) by `scripts/generate-world-paths.mjs` (`bun scripts/generate-world-paths.mjs`). It injects between `/* WORLD_PATHS:BEGIN */` and `/* WORLD_PATHS:END */` sentinels — never hand-edit that blob (~32KB; tests guard <60KB).
- **Projection**: `x = 2.778 * (lon + 180)`, `y = 3.69 * (75 - lat)`, viewBox `0 0 1000 480` (crop 75°N–55°S). Points store real lon/lat and project at render via `projX`/`projY`.
- **`DESK_MAPS` schema** per desk: `points` (`kind: 'hub' | 'port' | 'chokepoint'`, `primary`, `stat`, `detail` for the pinned card, optional label hints `anchor: 'end'` / `dy`), `routes` (`waypoints: [[lon,lat],…]` smoothed by `routePath()`; must not cross land or the antimeridian — no transpacific routes), `regions` (tinted ellipses; for POWER they're grid-market footprints in navy).
- **Interactions**: hover tooltip (desktop), click pins a detail card below the map, animated dash-flow + travelling cargo dots on routes, legend adapts to the marker kinds present.
- When adding a point in a crowded cluster (NW Europe, Singapore strait, US Gulf, Middle East), set `anchor`/`dy` and check overlaps — the browser console trick: compare `getBBox()` of the 13px `<text>` labels.

### Local image assets
All images live alongside `index.html`, referenced by filename only. Photos are pre-compressed (~200–500KB; originally up to 9.7MB — keep them small):
- `Oil_cargo_about_cover.jpeg` — About hero · `houston_trip.JPG` (uppercase .JPG) — Houston trip
- `refinery.jpeg`, `dump truck.jpeg` (space in name) — Commodities tabs · `Trading_floor.jpeg` — Commodities hero
- `LNG_Tanker.jpeg` — Membership hero + newsletter subscribe band · `club_logo_clear.png` — header/footer sprite + favicon
- `ship_aerial.jpeg` — About page "Interested in the field?" CTA band
- `ed1-*.png` ×10 — Edition 1 newsletter charts (extracted from the source .docx; **leave their styling as-is** — the user wants them to read like a newsletter, not a web feature)

### Design system
CSS variables are defined in the `<style>` block at the top of the file. Key colors:
- `--c-navy-ink: #132531` — primary brand navy
- `--c-signal: #C8321E` — signal red (used sparingly for CTAs and accents)
- `--c-brass: #C49A3E` — brass/gold accent
- `--c-ivory: #F8F7F3` — primary light surface
- Up/down market colors: `#2E6B3E` / `#C8321E` on light, `#6ED08B` / `#E85E4A` on dark.

Full design rationale is in `DESIGN-ferrari.md`. The aesthetic is Ferrari editorial — chiaroscuro alternation between dark navy/black sections and ivory panels.

### Shared components (defined early, used everywhere)
`Button`, `Label`, `BrassRule`, `Chip`, `EditorialImage`, `ArrowIcon`, `Header`, `Footer`, `useIsMobile`, `Sparkline` — defined in the design-system portion of the script and exposed on `window`.

### Motion system
CSS classes in the second `<style>` block + React helpers: `Reveal` (IntersectionObserver scroll-reveal; falls back to instantly-visible without IO — this keeps jsdom tests passing), `HeroLines` (line-by-line hero headline mask reveal), `CountUp` (stats count up on scroll), `ReadingProgress` (brass bar on the newsletter), `.kenburns` (slow hero-photo drift), `.page-enter` (route/tab transition), ticker hover-pause + edge masks. All honor `prefers-reduced-motion`.
**Gotcha:** `.page-enter` must keep `animation-fill-mode: backwards` (NOT `both`/`forwards`) — a retained transform makes the page wrapper the containing block for `position: fixed` children (lightbox, progress bar), pinning them to the document instead of the viewport.

## Key content files
- `Newsletter/Commodity Club Newsletter.docx` (main checkout, untracked) — source document for Edition 1
- `commodities_primer.md` — source of truth for commodity market descriptions, firms, instruments, and the "key spreads" lists
- `commodity_news_sources.md` — source of truth for the News & Data Sources section
- `DESIGN-ferrari.md` — full color palette, typography rules, and component styling reference
