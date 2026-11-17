# Contributing

Welcome. This repo is a small static site. The owner (Seva) controls hosting, DNS, domain, and API accounts. You control content and code via pull requests.

## Ground rules

1. **Never push to `master`.** Branch, push, open a PR. Owner merges.
2. **Run `bun run test` before every push.** A JSX syntax error ships a blank page to the whole club. Tests must show `0 failed`.
3. **One topic per PR.** Small PRs get merged fast.
4. **Do not commit secrets.** No new API keys, passwords, or tokens in any file. If a feature needs one, file a Help Request.
5. **Do not touch** hosting config, DNS, the three API-key constants (`AV_KEY`, `FH_KEY`, `OP_KEY`), or the `WORLD_PATHS` blob between its sentinels. Ask first.
6. Keep the site dependency-free. No bundler, no npm runtime packages, no ES module `import`. See CLAUDE.md "Architecture".
7. Watch image size. Compress photos to ~200-500KB before adding.
8. Filenames are case- and space-sensitive on the host (macOS hides this). `houston_trip.JPG` and `dump truck.jpeg` are correct as written. Tests check asset existence.

## Common tasks

| Task | Where | Notes |
|---|---|---|
| Add an event | `EVENTS` array | `date: 'YYYY-MM-DD'`. Calendar is currently hidden; ask owner before un-hiding |
| Publish newsletter edition | `EDITIONS` array | add to FRONT. Charts go in repo root as `ed<N>-<slug>.png`. Full schema in CLAUDE.md |
| Edit commodity copy | `COMMODITIES`, `DESK_MAPS` | update `commodities_primer.md` too |
| Edit leadership / membership copy | page sections in `index.html` | no em dashes in visible copy (house style) |
| Add map point | `DESK_MAPS` | check label overlaps, see CLAUDE.md |

## Using Claude Code on this repo

Point your Claude at this repo and say: "Read CLAUDE.md fully, then help me with X." CLAUDE.md contains the architecture, gotchas, and the help-request protocol below, so it can work without extra context. Tell it to run the tests and to open a PR, not push to `master`.

## Help Request protocol (when you or your Claude are stuck)

Use this when the problem is outside the repo's code: deploy failed, preview broken, domain/DNS, email forwarding, API quota or key errors, Cloudflare settings, repo permissions, merge needs a hosting-side change, or you tried the fix twice and it still fails.

1. Open a GitHub Issue using the **Help Request** template (Issues > New issue > Help Request). If your Claude has `gh`: `gh issue create --template help-request.yml` or `gh issue create --label help-request --title "..." --body "..."`.
2. Fill in: what you wanted, what happened, exact error text, branch/PR link, what you already tried. Paste logs, not paraphrases. **Never paste keys or passwords.**
3. Continue other work on a different branch. Do not retry the same failing action in a loop.
4. Owner checks the `help-request` label, fixes the hosting side, and replies on the issue. Reopen or comment if it is not resolved.

Urgent (live site down or showing a blank page): open the Issue with `URGENT` at the start of the title, and also message the owner directly. Owner can roll back from Cloudflare Pages in one click.

For your Claude: when you hit a failure you cannot resolve from this repo's files after two attempts, stop, summarize it, and draft the Help Request instead of working around it.

## Owner-only (for reference)

- Hosting: Cloudflare Pages project `commodity-club-website`, production branch `master`
- DNS: Cloudflare (apex and `www` CNAME to `commodity-club-website.pages.dev`); email forwarding via Namecheap (MX records)
- Live-price APIs: Alpha Vantage, Finnhub, OilPriceAPI (free tiers; keys are in client code, so assume public)
- Rollback: Cloudflare dashboard > Pages > Deployments > previous deployment > Rollback
