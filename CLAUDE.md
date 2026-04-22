# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-file static website for the **Commodity Trading & Shipping Club (CTSC)** at Indiana University. The deliverable is `/Users/seva/Downloads/commodity-club-website/index.html` — one self-contained HTML file that runs entirely in the browser with no build step.

To preview: open `index.html` directly in a browser, or run a local server:
```
cd /Users/seva/Downloads/commodity-club-website
python3 -m http.server 8080
```

There are no dependencies to install, no build commands, and no test suite.

## Architecture

The entire application is a single `index.html` file using **React 18 + in-browser Babel** loaded from CDN. All JSX is written inside `<script type="text/babel" data-presets="env,react">` blocks. There is no bundler.

### Multi-script pattern
The file is split into multiple `<script type="text/babel">` blocks, each representing a logical module (design system, shared components, individual pages). Because Babel compiles each block in isolation, components defined in one block are exposed to later blocks via:
```js
Object.assign(window, { ComponentName });
```
This is the only way components cross script boundaries — do not use ES module `import/export`.

### Routing
Client-side routing uses a single `useState` in the root `App` component. The current page is persisted to `localStorage` under the key `ctsc-iu-page`. Navigation happens by calling `onNav('pagename')` passed as a prop.

### Auth gates
- **Site-wide password gate**: `SiteLock` component checks `localStorage.getItem('ctsc-unlocked') === '1'`. Password: `PeaceAndQuiet`. The logout button in the footer clears this key and reloads.
- **Newsletter gate**: `NewsletterGate` uses session `useState` only (resets on close). Password: `Analyst3`.

### Pages
| Key | Component | File section |
|-----|-----------|--------------|
| `about` | `AboutPage` | `// ======== pages/AboutPage.jsx ========` |
| `commodities` | `CommoditiesPage` | `// ======== pages/CommoditiesPage.jsx ========` |
| `newsletter` | `NewsletterGate` → `NewsletterPage` | both inline |
| `membership` | `MembershipPage` | `// ======== pages/MembershipPage.jsx ========` |

### Local image assets
All images live alongside `index.html` and are referenced by filename only (no path prefix):
- `Oil_cargo_about_cover.jpeg` — About page hero
- `houston_trip.JPG` — Houston trip section (note uppercase .JPG)
- `refinery.jpeg` — Commodities: Crude & Refined tab
- `dump truck.jpeg` — Commodities: Metals tab (note space in filename)
- `LNG_Tanker.jpeg` — Membership page hero
- `Trading_floor.jpeg` — Commodities page hero

### Design system
CSS variables are defined in the `<style>` block at the top of the file. Key colors:
- `--c-navy-ink: #132531` — primary brand navy
- `--c-signal: #C8321E` — signal red (used sparingly for CTAs and accents)
- `--c-brass: #C49A3E` — brass/gold accent
- `--c-ivory: #F8F7F3` — primary light surface

Full design rationale is in `DESIGN-ferrari.md`. The aesthetic is Ferrari editorial — chiaroscuro alternation between dark navy/black sections and ivory panels.

### Shared components (defined early, used everywhere)
`Button`, `Label`, `BrassRule`, `Chip`, `EditorialImage`, `ArrowIcon`, `Header`, `Footer` — all defined in the design system script block and exposed on `window`.

## Key content files
- `commodities_primer.md` — source of truth for all commodity market descriptions, firms, and instruments on the Commodities page
- `commodity_news_sources.md` — source of truth for the News & Data Sources section
- `DESIGN-ferrari.md` — full color palette, typography rules, and component styling reference
