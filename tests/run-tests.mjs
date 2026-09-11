// Test harness for the CTSC single-file site (index.html).
//
// The site is React 18 + in-browser Babel with no build step, which means a
// single typo ships a blank page. These checks compile every JSX block, render
// every page in jsdom, and validate the data arrays and asset references that
// experience says are the things that actually break.
//
// Run: npm install (once), then npm test

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from '@babel/core';
import { JSDOM } from 'jsdom';
import React from 'react';
import { createRoot } from 'react-dom/client';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let failures = 0;
let passes = 0;
function ok(cond, label, detail = '') {
  if (cond) { passes++; console.log(`  ✓ ${label}`); }
  else { failures++; console.error(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`); }
}
function section(name) { console.log(`\n${name}`); }

// ---------------------------------------------------------------------------
section('1. JSX compile check (every <script type="text/babel"> block)');
const blocks = [...html.matchAll(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
ok(blocks.length >= 1, `found ${blocks.length} babel script block(s)`);

const compiled = [];
blocks.forEach((code, i) => {
  try {
    const out = transformSync(code, {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react'],
      filename: `index-block-${i}.jsx`,
      babelrc: false, configFile: false,
    });
    compiled.push(out.code);
    ok(true, `block ${i + 1} compiles`);
  } catch (e) {
    compiled.push(null);
    ok(false, `block ${i + 1} compiles`, e.message.split('\n')[0]);
  }
});

// ---------------------------------------------------------------------------
section('2. Local asset existence (filename typos, case, spaces)');
// Local image refs: src="x.png", src: 'x.jpeg', url(x.png), backgroundImage etc.
const assetRefs = new Set();
for (const m of html.matchAll(/(?:src=["'{]+|src:\s*['"]|url\()([^"'()}{]+\.(?:png|jpe?g|JPG|webp|svg|gif))["')}]/gi)) {
  const ref = m[1].trim();
  if (!/^https?:/i.test(ref)) assetRefs.add(ref);
}
ok(assetRefs.size > 0, `found ${assetRefs.size} local asset references`);
for (const ref of [...assetRefs].sort()) {
  ok(fs.existsSync(path.join(ROOT, ref)), `asset exists: ${ref}`);
}

// ---------------------------------------------------------------------------
section('3. Fictional-content regression (removed placeholder copy stays removed)');
for (const banned of ['Vol. VII', '142 issues', 'The Dispatch', 'since 2019', 'EST. 2019', 'SiteLock', 'PAST_ISSUES', 'NewsletterGate', 'Analyst3']) {
  ok(!html.includes(banned), `index.html does not contain "${banned}"`);
}
ok(!/href="#"/.test(html), 'no dead href="#" links');

// ---------------------------------------------------------------------------
section('4. Render smoke test (jsdom + React 18, offline price APIs)');

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});
const win = dom.window;
win.React = React;
win.ReactDOM = { createRoot };
// Offline: every price fetch rejects so pages must render from fallback data.
win.fetch = () => Promise.reject(new Error('network disabled in tests'));
win.scrollTo = () => {};
// React's scheduler and the site's boot() retry loop live on the main global.
global.window = win;
global.document = win.document;
global.localStorage = win.localStorage;
global.navigator = win.navigator;

// Execute each compiled block with the browser globals injected as function
// parameters (window.eval is unreliable under bun's partial vm support).
let evalError = null;
try {
  for (const code of compiled) {
    if (!code) continue;
    const run = new Function(
      'window', 'document', 'localStorage', 'navigator', 'React', 'ReactDOM', 'fetch',
      code
    );
    run(win, win.document, win.localStorage, win.navigator, React, { createRoot }, win.fetch);
  }
} catch (e) {
  evalError = e;
}
ok(!evalError, 'script blocks evaluate without throwing', evalError && evalError.message);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await wait(200); // let boot() retry loop and initial render settle

ok(win.document.getElementById('root').textContent.length > 0, 'App boots and renders into #root');

async function renderPage(name, props, expects) {
  const div = win.document.createElement('div');
  win.document.body.appendChild(div);
  let err = null;
  try {
    const root = createRoot(div);
    root.render(React.createElement(win[name], props));
    await wait(120);
  } catch (e) { err = e; }
  ok(!err, `${name} renders without throwing`, err && err.message);
  const text = div.textContent;
  for (const ex of expects) {
    ok(text.includes(ex), `${name} shows "${ex}"`);
  }
  return text;
}

const noop = () => {};
const monthName = new Date().toLocaleString('en-US', { month: 'long' });
await renderPage('AboutPage', { onNav: noop }, ['Houston', 'Events', monthName]);
await renderPage('CommoditiesPage', { onNav: noop }, ['Product Groups', 'Brent Crude', 'FREIGHT', 'POWER', 'Cushing']);
await renderPage('MembershipPage', { onNav: noop }, []);
// Newsletter content is temporarily behind a "coming soon" cover (NEWSLETTER_COMING_SOON) — verify the cover, not the hidden edition.
await renderPage('NewsletterPage', { onNav: noop }, [
  'Weekly Energy Insights', 'is coming soon',
]);

// ---------------------------------------------------------------------------
section('5. Data integrity (EDITIONS, COMMODITIES, EVENTS, GAS_HUBS)');

const { EDITIONS, COMMODITIES, EVENTS, DESK_MAPS } = win;
ok(Array.isArray(EDITIONS) && EDITIONS.length >= 1, 'EDITIONS is a non-empty array');
for (const ed of EDITIONS || []) {
  const id = `edition ${ed.no}`;
  ok(ed.title && ed.date && ed.cat, `${id} has title/date/cat`);
  ok(Array.isArray(ed.authors) && ed.authors.every((a) => a.name && /@/.test(a.email)), `${id} authors have names and emails`);
  ok(Array.isArray(ed.tradeIdeas) && ed.tradeIdeas.every((t) => ['BULLISH', 'BEARISH'].includes(t.dir) && t.title && t.thesis), `${id} trade ideas are well-formed`);
  ok(Array.isArray(ed.sections) && ed.sections.length > 0, `${id} has sections`);
  for (const s of ed.sections || []) {
    ok(s.desk && s.call && Array.isArray(s.paras) && s.paras.length > 0, `${id} section "${s.desk}" has desk/call/paras`);
    for (const c of s.charts || []) {
      ok(fs.existsSync(path.join(ROOT, c.src)) && c.caption, `${id} chart exists with caption: ${c.src}`);
    }
  }
}

ok(Array.isArray(COMMODITIES) && COMMODITIES.length === 6, 'COMMODITIES has all six product groups');
for (const g of COMMODITIES || []) {
  ok(g.items.every((it) => it.sym && it.name && it.unit && it.price && /^[+−-]/.test(it.chg)),
    `COMMODITIES "${g.cat}" items have sym/name/unit/price and signed chg`);
}

ok(Array.isArray(EVENTS) && EVENTS.every((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date) && e.title && e.type),
  'EVENTS entries (if any) have YYYY-MM-DD date, title, and type');
// Commodity Atlas: every desk has a complete, well-formed map layer.
const REQUIRED_DESKS = ['CRUDE & REFINED', 'NAT GAS', 'POWER', 'METALS', 'AGRICULTURE', 'FREIGHT'];
ok(DESK_MAPS && REQUIRED_DESKS.every((d) => DESK_MAPS[d]), 'DESK_MAPS covers all six desks');
for (const d of REQUIRED_DESKS) {
  const m = (DESK_MAPS && DESK_MAPS[d]) || { points: [], routes: [], regions: [] };
  ok(m.points.length >= 8, `${d} map has 8+ points (${m.points.length})`);
  ok(m.points.every((p) =>
    p.name && p.detail && p.stat && ['hub', 'port', 'chokepoint'].includes(p.kind) &&
    p.lon >= -180 && p.lon <= 180 && p.lat >= -55 && p.lat <= 75),
    `${d} points have name/detail/stat/kind and in-frame lon/lat`);
  ok(new Set(m.points.map((p) => p.id)).size === m.points.length, `${d} point ids are unique`);
  ok(m.routes.every((r) => r.label && Array.isArray(r.waypoints) && r.waypoints.length >= 3), `${d} routes have labels and 3+ waypoints`);
}
ok((COMMODITIES || []).every((g) => DESK_MAPS && DESK_MAPS[g.cat]), 'every COMMODITIES tab has a matching map layer');
const wp = html.match(/\/\* WORLD_PATHS:BEGIN \*\/([\s\S]*?)\/\* WORLD_PATHS:END \*\//);
ok(wp && wp[1].length > 10000 && wp[1].length < 60000,
  `WORLD_PATHS geometry is generated and within budget (${wp ? Math.round(wp[1].length / 1024) : 0}KB)`);

// ---------------------------------------------------------------------------
section('6. Cross-script exports (window registry the router depends on)');
for (const name of ['AboutPage', 'CommoditiesPage', 'NewsletterPage', 'MembershipPage', 'Header', 'Footer', 'useIsMobile']) {
  ok(typeof win[name] === 'function', `window.${name} is exported`);
}

// ---------------------------------------------------------------------------
console.log(`\n${passes} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
