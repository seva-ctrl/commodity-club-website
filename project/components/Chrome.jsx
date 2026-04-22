/* global React, Button, Label, HairRule, ArrowIcon */

function Header({ current = 'about', onNav, tone = 'dark' }) {
  const dark = tone === 'dark';
  const bg = dark ? 'transparent' : '#F8F7F3';
  const fg = dark ? '#fff' : '#132531';
  const sub = dark ? 'rgba(255,255,255,0.65)' : '#6B6B6B';
  const rule = dark ? 'rgba(255,255,255,0.12)' : '#D8D4CC';

  const links = [
    { id: 'about', label: 'About' },
    { id: 'commodities', label: 'Commodities' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'membership', label: 'Membership' },
  ];

  return (
    <header style={{
      background: bg, color: fg, padding: '22px 40px',
      borderBottom: `1px solid ${rule}`,
      position: dark ? 'absolute' : 'relative',
      top: 0, left: 0, right: 0, zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, maxWidth: 1360, margin: '0 auto' }}>
        <a href="#about" onClick={(e) => { e.preventDefault(); onNav?.('about'); }} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: fg, cursor: 'pointer' }}>
          <img
            src={dark ? 'assets/logo-inverse.png' : 'assets/logo.jpeg'}
            alt="CTSC" style={{ height: 52, width: 'auto' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Commodity Trading
            </span>
            <span style={{ fontWeight: 400, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: sub, marginTop: 3 }}>
              &amp; Shipping Club
            </span>
            <span style={{ fontWeight: 400, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: sub, marginTop: 3 }}>
              Indiana University
            </span>
          </div>
        </a>
        <nav style={{ display: 'flex', gap: 36 }}>
          {links.map(l => (
            <a key={l.id}
               onClick={(e) => { e.preventDefault(); onNav?.(l.id); }}
               href={`#${l.id}`}
               style={{
                 fontSize: 13, fontWeight: 500, letterSpacing: '0.04em',
                 color: current === l.id ? (dark ? '#C49A3E' : '#C8321E') : fg,
                 textDecoration: 'none', cursor: 'pointer',
                 paddingBottom: 4,
                 borderBottom: current === l.id ? `1px solid ${dark ? '#C49A3E' : '#C8321E'}` : '1px solid transparent',
                 transition: 'color 220ms, border-color 220ms'
               }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Button variant="signal" size="sm" onClick={() => onNav?.('membership')}>
            Join the club <ArrowIcon />
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onNav }) {
  return (
    <footer style={{ background: '#060F16', color: '#BFBFBF', padding: '64px 40px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <img src="assets/logo-inverse.png" alt="CTSC" style={{ height: 64 }} />
            <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginTop: 18, color: '#8F8F8F', lineHeight: 1.9 }}>
              COMMODITY TRADING<br/>&amp; SHIPPING CLUB<br/>INDIANA UNIVERSITY · EST. 2019
            </div>
            <div style={{ fontSize: 13, color: '#BFBFBF', lineHeight: 1.7, marginTop: 22, maxWidth: 300 }}>
              Kelley School of Business<br/>
              1309 E. Tenth Street<br/>
              Bloomington, IN 47405
            </div>
          </div>
          {[
            { h: 'THE CLUB', l: [['About', 'about'], ['Leadership', 'about'], ['History', 'about']] },
            { h: 'MARKETS', l: [['Commodities', 'commodities'], ['Energy', 'commodities'], ['Metals', 'commodities'], ['Agriculture', 'commodities']] },
            { h: 'MEMBERS', l: [['Newsletter', 'newsletter'], ['Membership', 'membership'], ['Contact', 'membership']] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#fff', fontWeight: 500 }}>{col.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {col.l.map(([label, target]) => (
                  <li key={label}>
                    <a href={`#${target}`} onClick={(e) => { e.preventDefault(); onNav?.(target); }}
                       style={{ color: '#BFBFBF', fontSize: 13, textDecoration: 'none', cursor: 'pointer' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '48px 0 22px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B' }}>
          <span>© 2019–2026 COMMODITY TRADING &amp; SHIPPING CLUB · INDIANA UNIVERSITY</span>
          <span>A REGISTERED STUDENT ORGANIZATION · KELLEY SCHOOL OF BUSINESS</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Footer });
