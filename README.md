# Commodity Trading & Shipping Club website

Public site for the Commodity Trading & Shipping Club (CTSC) at Indiana University: <https://commoditytradingandshipping.com>

One self-contained `index.html` (React 18 + in-browser Babel from CDN). No build step, no framework, no bundler.

## Start here

| You are | Read |
|---|---|
| A contributor (human) | [CONTRIBUTING.md](CONTRIBUTING.md) — workflow, rules, how to get help |
| A contributor's Claude / any coding agent | [CLAUDE.md](CLAUDE.md) — full architecture and rules, read it entirely before editing |
| Stuck on something only the owner can fix | [Open a Help Request](../../issues/new?template=help-request.yml) |

## Run locally

```bash
bun install        # once, dev-only test tooling
bun run test       # must print "0 failed" before every PR
python3 -m http.server 8080   # then open http://localhost:8080
```

(`npm install && npm test` also works.)

## How changes ship

1. Branch off `master`: `git checkout -b yourname/short-description`
2. Edit, run `bun run test`
3. Push the branch, open a Pull Request into `master`
4. Owner reviews and merges. Cloudflare Pages deploys `master` automatically (about a minute). PRs also get a preview URL.

Never push straight to `master`.

## Layout

```
index.html        the whole site (data arrays at top of each page section)
tests/            test harness (JSX compile, assets, data integrity, render smoke)
scripts/          generate-world-paths.mjs (map geometry)
ed1-*.png         newsletter chart images, referenced by filename from repo root
images/, *.jpeg   photos, referenced by filename from repo root
commodities_primer.md, commodity_news_sources.md   source of truth for page copy
DESIGN-ferrari.md design system reference
project/          OLD design prototype from Claude Design. Reference only, not shipped.
```
