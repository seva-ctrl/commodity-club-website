/* global React, Button, Label, BrassRule, Chip, EditorialImage, ArrowIcon, Header, Footer */
const { useState: useCommState } = React;

const COMMODITIES = [
  {
    cat: 'ENERGY', sub: 'Crude &amp; refined hydrocarbons',
    items: [
      { sym: 'BRN', name: 'Brent Crude', unit: '$/bbl', price: '82.14', chg: '+0.42%', status: 'good', note: 'Dated Brent — North Sea benchmark' },
      { sym: 'WTI', name: 'WTI Crude',   unit: '$/bbl', price: '78.62', chg: '−0.18%', status: 'warn', note: 'Cushing, OK delivery' },
      { sym: 'NAT', name: 'Natural Gas', unit: '$/MMBtu', price: '3.284', chg: '+1.64%', status: 'good', note: 'Henry Hub · LNG parity' },
      { sym: 'GSL', name: 'RBOB Gasoline', unit: '$/gal', price: '2.412', chg: '−0.21%', status: 'warn', note: 'NY Harbor · summer grade' },
    ],
    img: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1400&q=80',
    imgLabel: 'REFINERY AT DUSK',
    description: 'Crude and refined products form the bedrock of the physical market. Our energy desk studies the arb between basins, the diesel crack, and the LNG voyage economics that tie Henry Hub to TTF.',
  },
  {
    cat: 'METALS', sub: 'Base &amp; precious',
    items: [
      { sym: 'CU',  name: 'Copper',    unit: '$/lb',  price: '4.284',   chg: '+0.72%', status: 'good', note: 'LME 3M · Grade A cathode' },
      { sym: 'AL',  name: 'Aluminium', unit: '$/mt',  price: '2,418',   chg: '−0.34%', status: 'warn', note: 'LME · P1020A' },
      { sym: 'AU',  name: 'Gold',      unit: '$/oz',  price: '2,384.10', chg: '+0.12%', status: 'good', note: 'COMEX · 100 oz' },
      { sym: 'FE',  name: 'Iron Ore',  unit: '$/mt',  price: '108.40',  chg: '−1.82%', status: 'urgent', note: 'Platts · 62% Fe CFR China' },
    ],
    img: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=1400&q=80',
    imgLabel: 'COPPER CATHODES',
    description: 'Base metals move to the rhythm of industrial demand; precious metals to the rhythm of macro anxiety. The metals desk tracks LME stocks, warehouse queues, and the premium structure from Shanghai to Rotterdam.',
  },
  {
    cat: 'AGRICULTURE', sub: 'Grains, softs &amp; oilseeds',
    items: [
      { sym: 'ZS',  name: 'Soybeans',  unit: '¢/bu',  price: '1,184.50', chg: '+0.32%', status: 'good', note: 'CBOT · #1 Yellow' },
      { sym: 'ZC',  name: 'Corn',      unit: '¢/bu',  price: '438.25',  chg: '−0.44%', status: 'warn', note: 'CBOT · #2 Yellow' },
      { sym: 'ZW',  name: 'Wheat',     unit: '¢/bu',  price: '572.00',  chg: '+1.06%', status: 'good', note: 'CBOT · SRW' },
      { sym: 'CT',  name: 'Cotton',    unit: '¢/lb',  price: '72.84',   chg: '−0.08%', status: 'warn', note: 'ICE · #2 grade' },
      { sym: 'KC',  name: 'Coffee',    unit: '¢/lb',  price: '218.40',  chg: '+2.14%', status: 'good', note: 'ICE · Arabica C' },
      { sym: 'SB',  name: 'Sugar',     unit: '¢/lb',  price: '19.84',   chg: '−0.92%', status: 'warn', note: 'ICE · #11 raw' },
    ],
    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1400&q=80',
    imgLabel: 'GRAIN TERMINAL',
    description: 'Grains and softs carry the weight of the calendar — harvests, monsoons, and crop reports. The agriculture desk studies the seasonal basis from the Corn Belt to the Black Sea and the Brazilian interior.',
  },
  {
    cat: 'FREIGHT', sub: 'Dry &amp; wet tonnage',
    items: [
      { sym: 'BDI', name: 'Baltic Dry Index', unit: 'index', price: '1,842', chg: '+1.12%', status: 'good', note: 'BDI · composite dry bulk' },
      { sym: 'C5',  name: 'Capesize C5',     unit: '$/mt',  price: '9.85',  chg: '+0.64%', status: 'good', note: 'West Australia → Qingdao' },
      { sym: 'TD3', name: 'VLCC TD3C',       unit: 'WS',    price: '58.40', chg: '−0.82%', status: 'warn', note: 'Middle East Gulf → China' },
      { sym: 'TC2', name: 'MR TC2',          unit: 'WS',    price: '182.0', chg: '+0.24%', status: 'good', note: 'Rotterdam → NY Harbor' },
    ],
    img: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1400&q=80',
    imgLabel: 'VLCC AT SEA',
    description: 'Freight is the price of moving a cargo — always, in the end, a price of time. We track the Baltic indices, the timecharter structure, and the specific voyage arithmetic that turns a ton-mile into a profit.',
  },
];

function PriceRow({ item }) {
  const up = item.chg.startsWith('+');
  return (
    <tr style={{ borderBottom: '1px solid #ECE8DF' }}>
      <td style={{ padding: '14px 0', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, color: '#C49A3E', letterSpacing: 1 }}>{item.sym}</td>
      <td style={{ padding: '14px 0' }}>
        <div style={{ fontWeight: 500, fontSize: 15, color: '#132531' }}>{item.name}</div>
        <div style={{ fontSize: 12, color: '#8F8F8F', marginTop: 2 }}>{item.note}</div>
      </td>
      <td style={{ padding: '14px 0', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B' }}>{item.unit}</td>
      <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 15, color: '#132531', fontWeight: 500 }}>{item.price}</td>
      <td style={{ padding: '14px 0', textAlign: 'right', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, color: up ? '#2E6B3E' : '#C8321E' }}>{item.chg}</td>
    </tr>
  );
}

function CommoditiesPage({ onNav }) {
  const [active, setActive] = useCommState('ENERGY');
  const cat = COMMODITIES.find(c => c.cat === active);

  return (
    <>
      {/* HERO — darker, inset, with market ticker feel */}
      <section style={{ position: 'relative', minHeight: 560, background: '#060F16', color: '#fff', overflow: 'hidden' }}>
        <Header current="commodities" onNav={onNav} tone="dark" />
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1605152276897-4f618f831968?w=2000&q=80"
               style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(65%) brightness(0.4)' }} alt="" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,15,22,0.75) 0%, rgba(6,15,22,0.65) 100%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '170px 40px 80px' }}>
          <Label style={{ color: '#C49A3E', marginBottom: 22 }}>/ Markets we trade</Label>
          <h1 style={{ fontSize: 64, fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.02em', maxWidth: 900, textWrap: 'balance' }}>
            Every commodity is <span style={{ fontStyle: 'italic', fontFamily: 'Fraunces, serif', fontWeight: 400 }}>a cargo</span>, a counterparty, and a calendar.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.75)', marginTop: 24, maxWidth: 540 }}>
            The club runs four desks, each shadowing a corner of the physical market. Members rotate between desks across their first two semesters and specialize in their third.
          </p>
        </div>
      </section>

      {/* TICKER STRIP */}
      <section style={{ background: '#181818', color: '#fff', padding: '18px 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', animation: 'ticker 60s linear infinite' }}>
          {[...COMMODITIES.flatMap(c => c.items), ...COMMODITIES.flatMap(c => c.items)].map((it, i) => {
            const up = it.chg.startsWith('+');
            return (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: '#C49A3E', letterSpacing: 1 }}>{it.sym}</span>
                <span style={{ color: '#BFBFBF' }}>{it.name}</span>
                <span style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>{it.price}</span>
                <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: up ? '#6ED08B' : '#E85E4A' }}>{it.chg}</span>
              </div>
            );
          })}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* DESK SELECTOR + DETAIL */}
      <section style={{ background: '#F8F7F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <Label>/ The four desks</Label>
              <h2 style={{ fontSize: 34, fontWeight: 400, color: '#132531', marginTop: 12, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                Select a desk.
              </h2>
            </div>
            <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B' }}>
              Prices · indicative · refreshed weekly
            </div>
          </div>

          {/* tab bar */}
          <div style={{ display: 'flex', borderTop: '1px solid #132531', borderBottom: '1px solid #D8D4CC' }}>
            {COMMODITIES.map(c => (
              <button key={c.cat}
                onClick={() => setActive(c.cat)}
                style={{
                  flex: 1, padding: '22px 16px', background: c.cat === active ? '#132531' : 'transparent',
                  color: c.cat === active ? '#fff' : '#132531',
                  border: 'none', borderRight: '1px solid #D8D4CC', cursor: 'pointer',
                  textAlign: 'left', transition: 'all 220ms'
                }}>
                <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: c.cat === active ? '#C49A3E' : '#6B6B6B' }}>
                  Desk 0{COMMODITIES.indexOf(c) + 1}
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, marginTop: 6 }}>{c.cat}</div>
              </button>
            ))}
          </div>

          {/* detail: grid of image + description, then price table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0, background: '#fff', border: '1px solid #D8D4CC', borderTop: 'none' }}>
            <EditorialImage src={cat.img} aspect="auto" style={{ height: '100%', minHeight: 380 }} />
            <div style={{ padding: '40px 40px 32px' }}>
              <Label style={{ color: '#C49A3E' }}>DESK · {cat.cat}</Label>
              <h3 style={{ fontSize: 26, fontWeight: 500, color: '#132531', marginTop: 12, lineHeight: 1.25, letterSpacing: '-0.01em' }}
                  dangerouslySetInnerHTML={{ __html: cat.sub }} />
              <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.7, marginTop: 16 }}>{cat.description}</p>
              <div style={{ height: 1, background: '#ECE8DF', margin: '24px 0' }} />
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #132531' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 500 }}>Sym</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 500 }}>Instrument</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 500 }}>Unit</th>
                    <th style={{ textAlign: 'right', padding: '10px 0', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 500 }}>Last</th>
                    <th style={{ textAlign: 'right', padding: '10px 0', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B', fontWeight: 500 }}>Chg</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map(it => <PriceRow key={it.sym} item={it} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR-UP LARGE CARDS — alternate deep look at each market */}
      <section style={{ background: '#132531', color: '#fff', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <Label style={{ color: '#C49A3E' }}>/ Coverage</Label>
              <h2 style={{ fontSize: 36, fontWeight: 400, marginTop: 14, lineHeight: 1.2, maxWidth: 640, letterSpacing: '-0.01em' }}>
                Each desk files a weekly note.
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)' }}>
            {COMMODITIES.map((c, i) => (
              <div key={c.cat} style={{ background: '#132531', padding: '36px 36px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, color: '#C49A3E', letterSpacing: 1 }}>— 0{i + 1}</div>
                    <h3 style={{ fontSize: 26, fontWeight: 500, marginTop: 8, letterSpacing: '-0.01em' }}>{c.cat}</h3>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 2 }} dangerouslySetInnerHTML={{ __html: c.sub }} />
                  </div>
                  <Chip variant="brass">{c.items.length} instruments</Chip>
                </div>
                <EditorialImage src={c.img} aspect="16 / 8" grayscale={true} />
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{c.description}</p>
                <button onClick={() => setActive(c.cat)} style={{
                  alignSelf: 'flex-start', background: 'transparent', color: '#C49A3E',
                  border: 'none', padding: 0, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  borderBottom: '1px solid #C49A3E', paddingBottom: 2
                }}>
                  Open desk <ArrowIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLACEMENT MAP TEASER — echoes Novarc map section */}
      <section style={{ background: '#F8F7F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'center' }}>
          <div>
            <Label>/ Where our alumni trade</Label>
            <h2 style={{ fontSize: 34, fontWeight: 400, color: '#132531', marginTop: 14, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              From Bloomington to the trading capitals.
            </h2>
            <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.7, marginTop: 18 }}>
              Our alumni sit at major trading houses, charterers, and investment banks across four continents — an informal register that makes each new cohort richer than the last.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, marginTop: 32 }}>
              {[
                ['14', 'Houston'], ['9', 'London'], ['6', 'Singapore'], ['5', 'Chicago'], ['4', 'Geneva'], ['3', 'New York'],
              ].map(([n, city]) => (
                <div key={city} style={{ borderTop: '1px solid #D8D4CC', paddingTop: 12 }}>
                  <div style={{ fontSize: 28, fontWeight: 400, color: '#132531', letterSpacing: '-0.02em' }}>{n}</div>
                  <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B', marginTop: 4 }}>{city}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#132531', padding: 40, color: '#fff', minHeight: 420, position: 'relative', overflow: 'hidden' }}>
            {/* Stylized map dots */}
            <svg viewBox="0 0 500 300" style={{ width: '100%', height: 'auto' }}>
              <rect x="0" y="0" width="500" height="300" fill="#132531" />
              {/* Continents as simple abstract shapes */}
              <path d="M60 90 Q80 70 120 75 T190 95 Q200 120 180 140 T130 155 Q90 150 70 130 Z" fill="#1E3A4C" />
              <path d="M210 100 Q240 85 275 95 T310 130 Q305 160 285 170 T240 170 Q215 155 210 135 Z" fill="#1E3A4C" />
              <path d="M320 110 Q360 95 395 110 T430 140 Q425 175 400 180 T350 175 Q325 155 320 135 Z" fill="#1E3A4C" />
              <path d="M240 190 Q260 180 280 195 T285 225 Q275 245 260 245 T240 225 Z" fill="#1E3A4C" />
              {/* Active city dots */}
              {[
                [100, 115, 'HOUSTON'],
                [225, 100, 'NEW YORK'],
                [270, 95, 'LONDON'],
                [295, 110, 'GENEVA'],
                [410, 150, 'SINGAPORE'],
                [260, 215, 'SAO PAULO'],
                [170, 110, 'CHICAGO'],
              ].map(([x, y, name], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="12" fill="#C49A3E" opacity="0.15" />
                  <circle cx={x} cy={y} r="5" fill="#C49A3E" />
                  <circle cx={x} cy={y} r="2" fill="#132531" />
                  <text x={x + 10} y={y + 3} fill="#C49A3E" fontSize="8" fontFamily="Inter, sans-serif" letterSpacing="1" >{name}</text>
                </g>
              ))}
              {/* Bloomington origin */}
              <circle cx="175" cy="118" r="4" fill="#C8321E" />
            </svg>
            <div style={{ position: 'absolute', left: 40, bottom: 32, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#C49A3E' }}>
              32 placements · 2019–26
            </div>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  );
}

Object.assign(window, { CommoditiesPage });
