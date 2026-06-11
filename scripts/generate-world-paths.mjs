// Generates the WORLD_PATHS array in index.html from Natural Earth 110m land
// outlines (public domain). Run with: bun scripts/generate-world-paths.mjs
//
// Projection must match the map renderer in index.html:
//   x = 2.778 * (lon + 180),  y = 3.69 * (75 - lat),  viewBox 0 0 1000 480
// (crop 75°N–55°S; Antarctica and sub-55°S polygons are dropped, points above
// 75°N keep negative y and are clipped by the viewBox).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson';
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const INDEX = path.join(ROOT, 'index.html');

// Tuning knobs (chosen to land the payload around ~30KB):
const MIN_BBOX_DEG2 = 8;   // drop islands with bounding box smaller than this (deg²)
const MIN_PX_STEP = 1.8;   // drop consecutive points closer than this (px, chebyshev)

const px = (lon) => 2.778 * (lon + 180);
const py = (lat) => 3.69 * (75 - lat);
const r1 = (n) => Math.round(n * 10) / 10;

const res = await fetch(SOURCE);
if (!res.ok) { console.error(`download failed: ${res.status}`); process.exit(1); }
const geo = await res.json();

let kept = 0, dropped = 0;
const paths = [];

for (const feature of geo.features) {
  const polys = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  for (const poly of polys) {
    const ring = poly[0]; // outer ring only — lakes don't read at this scale
    let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    if (maxLat < -50) { dropped++; continue; } // Antarctica & friends
    if ((maxLon - minLon) * (maxLat - minLat) < MIN_BBOX_DEG2) { dropped++; continue; }

    const pts = [];
    let lastX = Infinity, lastY = Infinity;
    for (const [lon, lat] of ring) {
      const x = r1(px(lon)), y = r1(py(lat));
      if (Math.max(Math.abs(x - lastX), Math.abs(y - lastY)) < MIN_PX_STEP) continue;
      pts.push(`${x},${y}`);
      lastX = x; lastY = y;
    }
    if (pts.length < 4) { dropped++; continue; }
    paths.push(`'M${pts[0]} L${pts.slice(1).join(' ')} Z'`);
    kept++;
  }
}

const block = paths.join(',\n');
const html = fs.readFileSync(INDEX, 'utf8');
const re = /(\/\* WORLD_PATHS:BEGIN \*\/\n)[\s\S]*?(\n\/\* WORLD_PATHS:END \*\/)/;
if (!re.test(html)) { console.error('WORLD_PATHS sentinels not found in index.html'); process.exit(1); }
fs.writeFileSync(INDEX, html.replace(re, `$1${block}$2`));

console.log(`polygons kept: ${kept}, dropped: ${dropped}`);
console.log(`payload: ${(Buffer.byteLength(block) / 1024).toFixed(1)} KB`);
