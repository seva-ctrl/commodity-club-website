/* global React, Button, Label, BrassRule, EditorialImage, ArrowIcon, Header, Footer */
const { useState: useAboutState } = React;

function AboutPage({ onNav }) {
  return (
    <>
      {/* HERO — full-bleed editorial photograph, inspired by Novarc structure */}
      <section style={{ position: 'relative', minHeight: '88vh', background: '#060F16', color: '#fff', overflow: 'hidden' }}>
        <Header current="about" onNav={onNav} tone="dark" />
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=2000&q=80"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(45%) brightness(0.7) contrast(1.05)' }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=2000&q=80'; }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,15,22,0.55) 0%, rgba(6,15,22,0.35) 40%, rgba(6,15,22,0.85) 100%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 1360, margin: '0 auto', padding: '180px 40px 100px' }}>
          <Label style={{ color: '#C49A3E', marginBottom: 22 }}>INDIANA UNIVERSITY · KELLEY SCHOOL OF BUSINESS · EST. 2019</Label>
          <h1 style={{ fontSize: 72, fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.02em', maxWidth: 980, margin: 0, textWrap: 'balance', color: '#F8F7F3' }}>
            Commodity Trading<br/>&amp; Shipping Club
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', marginTop: 28, maxWidth: 480 }}>
            We are a student-run body at Indiana University dedicated to the study of physical commodity markets, dry and wet freight, and the principals who move them. Admission is open to members of the Kelley School in good standing.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
            <Button variant="signal" onClick={() => onNav?.('membership')}>Request admission <ArrowIcon /></Button>
            <Button variant="ghost" onClick={() => onNav?.('commodities')}>View our markets</Button>
          </div>
        </div>

        {/* Floating stat card bottom right, Novarc style */}
        <div style={{
          position: 'absolute', right: 40, bottom: 56,
          background: 'rgba(19, 37, 49, 0.85)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(196,154,62,0.35)',
          padding: '22px 28px', color: '#fff', maxWidth: 260
        }}>
          <div style={{ fontSize: 44, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}>
            7<sup style={{ fontSize: 18, color: '#C49A3E' }}>yrs</sup>
          </div>
          <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#C49A3E', marginTop: 10 }}>
            Operating at Kelley
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginTop: 6 }}>
            Founded by finance undergraduates in 2019.
          </div>
        </div>
      </section>

      {/* EDITORIAL MISSION — ivory panel with crossed rule */}
      <section style={{ background: '#F8F7F3', padding: '120px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
          <Label style={{ textAlign: 'center', marginBottom: 24 }}>/ About</Label>
          <h2 style={{ fontSize: 42, fontWeight: 400, color: '#132531', lineHeight: 1.18, textAlign: 'center', letterSpacing: '-0.01em', textWrap: 'balance' }}>
            <span style={{ color: '#8F8F8F' }}>The Club exists to teach its members</span> how physical goods move across the world — <span style={{ color: '#8F8F8F' }}>and</span> how markets price the risk of that movement.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
            <Button variant="primary" onClick={() => onNav?.('membership')}>About us <ArrowIcon /></Button>
          </div>
          {/* decorative vertical + horizontal hair rules like Novarc */}
          <div style={{ position: 'absolute', top: -40, left: '50%', width: 1, height: 60, background: '#D8D4CC' }} />
          <div style={{ position: 'absolute', bottom: -40, left: '50%', width: 1, height: 60, background: '#D8D4CC' }} />
        </div>
      </section>

      {/* PRINCIPLES — 3 pillars on navy */}
      <section style={{ background: '#132531', color: '#fff', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
            <div>
              <Label style={{ color: '#C49A3E' }}>/ Approach</Label>
              <h2 style={{ fontSize: 40, fontWeight: 400, marginTop: 14, lineHeight: 1.15, maxWidth: 640, letterSpacing: '-0.01em' }}>
                Our principles in action.
              </h2>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 340 }}>
              We act on three principles: understand the cargo, respect the counterparty, and honor the fixture.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.1)' }}>
            {[
              { n: '01', t: 'Understand the cargo', d: 'We study crude, refined, softs, grains, and metals not as tickers but as physical goods — each with its own handling, storage, and delivery economics.' },
              { n: '02', t: 'Respect the counterparty', d: 'Every trade has a name on the other side. Members learn the institutional manners that keep markets liquid over decades.' },
              { n: '03', t: 'Honor the fixture', d: 'A word is a bond. We teach members the discipline of performing on every obligation, recorded and attested.' },
            ].map(p => (
              <div key={p.n} style={{ background: '#132531', padding: '44px 36px 40px', minHeight: 300 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                  <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, color: '#C49A3E', letterSpacing: 1 }}>— {p.n}</div>
                  <div style={{ width: 48, height: 48, border: '1px solid rgba(196,154,62,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 12, height: 12, border: '1px solid #C49A3E', borderRadius: '50%' }} />
                  </div>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.2, color: '#fff' }}>{p.t}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginTop: 16 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO — paper panel with dark accent card */}
      <section style={{ background: '#F8F7F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Label style={{ marginBottom: 14 }}>/ What we do</Label>
          <h2 style={{ fontSize: 34, fontWeight: 400, color: '#132531', lineHeight: 1.2, maxWidth: 640, letterSpacing: '-0.01em' }}>
            Where the club convenes.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24, marginTop: 48 }}>
            <EditorialImage
              src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80"
              aspect="4 / 3"
            />
            <div style={{ background: '#132531', color: '#fff', padding: '40px 40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Label style={{ color: '#C49A3E', marginBottom: 22 }}>THE WEEKLY MEETING</Label>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    ['Markets brief', 'A ten-minute price-action digest from the Secretariat.'],
                    ['Guest principal', 'A practicing trader, broker, or shipowner addresses the floor.'],
                    ['Fixture workshop', 'Members work a live case, drafted from the Register.'],
                    ['The Register', 'New entries attested and archived in perpetuity.'],
                  ].map(([t, d], i) => (
                    <li key={t} style={{ padding: '18px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 16, fontWeight: 500 }}>{t}</span>
                        <span style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>— 0{i + 1}</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{d}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#C49A3E', marginTop: 30, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                Thursdays · 7:00 PM · Hodge Hall 2083
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND — editorial metrics like Novarc */}
      <section style={{ background: '#fff', padding: '96px 40px', borderTop: '1px solid #ECE8DF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Label style={{ marginBottom: 16 }}>/ The membership</Label>
            <h2 style={{ fontSize: 38, fontWeight: 400, color: '#132531', lineHeight: 1.2, letterSpacing: '-0.01em', textWrap: 'balance' }}>
              Scale backed by fellowship<br/>and a placed alumni network.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid #D8D4CC' }}>
            {[
              { n: '140+', l: 'Active members', d: 'Across three undergraduate cohorts and a graduate fellowship, each admitted by proposal and seconding.' },
              { n: '32', l: 'Placements since 2019', d: 'Members placed at trading houses, charterers, shipowners, and investment banks on four continents.' },
              { n: '$3.5M', l: 'Training portfolio', d: 'A paper book run by members — crude, refined products, softs, and freight derivatives, settled monthly.' },
            ].map((s, i) => (
              <div key={s.l} style={{ padding: '44px 36px', borderRight: i < 2 ? '1px solid #D8D4CC' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 56, fontWeight: 400, color: '#132531', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ width: 56, height: 56, border: '1px solid #D8D4CC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 20, height: 20, border: '1px solid #132531', borderRadius: '50%' }} />
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#132531', textTransform: 'uppercase', letterSpacing: 1, marginTop: 18 }}>{s.l}</div>
                <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65, marginTop: 8 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP TABLE */}
      <section style={{ background: '#F8F7F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <Label>/ Leadership</Label>
              <h2 style={{ fontSize: 34, fontWeight: 400, color: '#132531', marginTop: 12, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                The 2025–26 officers.
              </h2>
            </div>
            <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B' }}>
              Elected · October 2025
            </div>
          </div>
          <div style={{ borderTop: '1px solid #132531' }}>
            {[
              ['President', 'Arjun Mehta', 'Finance · Class of 2026'],
              ['Vice President, Markets', 'Emilia Novak', 'Finance + Economics · Class of 2026'],
              ['Vice President, Shipping', 'Daniel Okafor', 'International Business · Class of 2027'],
              ['Head of the Register', 'Chloe Whitfield', 'Finance · Class of 2026'],
              ['Secretariat', 'Ravi Subramanian', 'Business Analytics · Class of 2027'],
              ['Treasurer', 'Margaret Liang', 'Accounting · Class of 2027'],
            ].map(([role, name, detail], i) => (
              <div key={role} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr 1.2fr 1.2fr 40px',
                padding: '22px 0', borderBottom: '1px solid #ECE8DF', alignItems: 'center'
              }}>
                <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, color: '#6B6B6B' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#C49A3E' }}>{role}</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#132531' }}>{name}</div>
                <div style={{ fontSize: 13, color: '#6B6B6B' }}>{detail}</div>
                <div style={{ textAlign: 'right', color: '#132531' }}><ArrowIcon size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-BLEED CTA */}
      <section style={{ position: 'relative', minHeight: 460, background: '#060F16', color: '#fff', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=2000&q=80"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(55%) brightness(0.55)' }}
            alt=""
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,15,22,0.85) 0%, rgba(6,15,22,0.35) 100%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '120px 40px' }}>
          <Label style={{ color: '#C49A3E', marginBottom: 18 }}>/ Connect</Label>
          <h2 style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.1, maxWidth: 640, letterSpacing: '-0.01em' }}>
            A seat in the Register<br/>begins with a proposal.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: 460, marginTop: 22 }}>
            Membership is by invitation. A current member may propose a candidate for the next sitting of the Admissions Committee.
          </p>
          <div style={{ marginTop: 32 }}>
            <Button variant="signal" onClick={() => onNav?.('membership')}>Request admission <ArrowIcon /></Button>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  );
}

Object.assign(window, { AboutPage });
