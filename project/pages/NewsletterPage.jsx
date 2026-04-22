/* global React, Button, Label, BrassRule, Chip, EditorialImage, ArrowIcon, Header, Footer */
const { useState: useNewsState } = React;

const ISSUES = [
  {
    no: 'Vol. VII · No. 14', date: '20 Mar 2026', cat: 'THE WEEKLY BULLETIN',
    title: 'A VLCC fixture confirmed at premium on the Piraeus roads.',
    lede: 'Members will note the Thalassa I reporting at Ras Tanura loadings with a firm sub-contract — an early sign that Q2 demand for Middle East crude may be firmer than the forward curve implies.',
    img: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=1400&q=80',
    imgLabel: 'VLCC AT SEA',
    author: 'From the Secretariat', tag: 'FIXTURES',
  },
  {
    no: 'Vol. VII · No. 13', date: '13 Mar 2026', cat: 'VIEWPOINT',
    title: "On the quiet reopening of the Bosporus and what the cargo books will say next.",
    lede: "Three days of closed straits at Istanbul would cost the Black Sea grain complex more than an advisory; the club's grain desk walks through the arithmetic in this week's note.",
    img: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1400&q=80',
    imgLabel: 'BOSPORUS AT DAWN',
    author: 'E. Novak, VP Markets', tag: 'VIEWPOINT',
  },
  {
    no: 'Vol. VII · No. 12', date: '06 Mar 2026', cat: 'THE WEEKLY BULLETIN',
    title: 'Spring dinner returns to the Long Room after four seasons away.',
    lede: "The President will host members at the Indiana Memorial Union on 18 April. A printed ledger of the cohort's placements will be circulated.",
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80',
    imgLabel: "MEMBERS' DINNER",
    author: 'The President', tag: 'THE CLUB',
  },
];

const PAST_ISSUES = [
  { no: 'No. 11', date: '27 Feb 2026', title: 'Copper warehouse queues at Johor and the LME carry.', cat: 'METALS' },
  { no: 'No. 10', date: '20 Feb 2026', title: 'A soybean season in two hemispheres.', cat: 'AGRICULTURE' },
  { no: 'No. 09', date: '13 Feb 2026', title: 'Diesel crack spreads and the refinery calendar.', cat: 'ENERGY' },
  { no: 'No. 08', date: '06 Feb 2026', title: "On reading an aging sister's bill of lading.", cat: 'VIEWPOINT' },
  { no: 'No. 07', date: '30 Jan 2026', title: 'The Baltic Dry closes the month above 1,800.', cat: 'FREIGHT' },
  { no: 'No. 06', date: '23 Jan 2026', title: 'Arabica at two-year highs — the Brazilian basis.', cat: 'AGRICULTURE' },
];

function NewsletterPage({ onNav }) {
  const [email, setEmail] = useNewsState('');
  const [sent, setSent] = useNewsState(false);
  const [filter, setFilter] = useNewsState('ALL');

  const lead = ISSUES[0];
  const rest = ISSUES.slice(1);

  return (
    <>
      {/* HERO — masthead treatment */}
      <section style={{ background: '#F8F7F3', paddingBottom: 40 }}>
        <Header current="newsletter" onNav={onNav} tone="light" />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 40px 56px', textAlign: 'center' }}>
          <Label style={{ marginBottom: 24 }}>/ The weekly bulletin · published since 2019</Label>
          <h1 style={{
            fontFamily: 'Fraunces, Times New Roman, serif',
            fontSize: 92, fontWeight: 400, color: '#132531',
            lineHeight: 0.95, letterSpacing: '-0.03em',
            margin: 0
          }}>
            The Dispatch
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, marginTop: 22 }}>
            <div style={{ width: 80, height: 1, background: '#132531' }} />
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#6B6B6B' }}>
              Vol. VII · Issue 14 · Friday 20 Mar 2026
            </div>
            <div style={{ width: 80, height: 1, background: '#132531' }} />
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: '#4A4A4A', marginTop: 32, maxWidth: 620, margin: '32px auto 0' }}>
            A Friday-morning note from the Secretariat. Fixtures, admissions, and a single editorial observation from the desks. No advertisements. Members and candidates only.
          </p>
        </div>
      </section>

      {/* LEAD ISSUE — big editorial treatment */}
      <section style={{ background: '#F8F7F3', padding: '0 40px 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ height: 1, background: '#132531', marginBottom: 24 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B' }}>
            <span>This Friday · Lead article</span>
            <span>{lead.no} · {lead.date}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 56, alignItems: 'center' }}>
            <EditorialImage src={lead.img} aspect="4 / 3" />
            <div>
              <Chip variant="solid" style={{ marginBottom: 22 }}>{lead.tag}</Chip>
              <h2 style={{
                fontFamily: 'Fraunces, serif',
                fontSize: 44, fontWeight: 400, color: '#132531',
                lineHeight: 1.1, letterSpacing: '-0.01em', textWrap: 'balance'
              }}>
                {lead.title}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#4A4A4A', marginTop: 20, textWrap: 'pretty' }}>
                {lead.lede}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 28 }}>
                <BrassRule />
                <span style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B' }}>{lead.author}</span>
              </div>
              <div style={{ marginTop: 36 }}>
                <Button variant="primary">Read the entry <ArrowIcon /></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE — dark band, centered, high ceremony */}
      <section style={{ background: '#060F16', color: '#fff', padding: '96px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
          <img src="https://images.unsplash.com/photo-1494412651409-8dd6e94a9db2?w=2000&q=80"
               style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.5)' }} alt="" />
        </div>
        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <Label style={{ color: '#C49A3E', marginBottom: 22 }}>/ Subscribe</Label>
          <h2 style={{ fontSize: 44, fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.01em', textWrap: 'balance' }}>
            <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>Friday morning,</span> a short note<br/>from the Secretariat.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginTop: 22, maxWidth: 520, margin: '22px auto 0' }}>
            One issue, each Friday, before morning markets. No advertisements, no trackers, one-click unsubscribe.
          </p>
          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
                  style={{ display: 'flex', gap: 10, marginTop: 36, maxWidth: 480, margin: '36px auto 0' }}>
              <input
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="name@indiana.edu"
                style={{
                  flex: 1, background: 'transparent', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.35)', borderRadius: 2, padding: '14px 16px',
                  fontSize: 15, outline: 'none'
                }}
              />
              <button type="submit" className="btn btn--signal">Subscribe <ArrowIcon /></button>
            </form>
          ) : (
            <div style={{ marginTop: 36, maxWidth: 480, margin: '36px auto 0', padding: '14px 18px', border: '1px solid #2E6B3E', color: '#A6D5B2', fontSize: 14, borderRadius: 2 }}>
              Confirmed. A note will follow from the Secretariat.
            </div>
          )}
          <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#8F8F8F', marginTop: 20 }}>
            Never shared · Unsubscribe in one click · IU email preferred
          </div>
        </div>
      </section>

      {/* RECENT ISSUES */}
      <section style={{ background: '#F8F7F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <Label>/ Recent issues</Label>
              <h2 style={{ fontSize: 34, fontWeight: 400, color: '#132531', marginTop: 12, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                From the Secretariat and the membership.
              </h2>
            </div>
            <a href="#" className="link" style={{ fontSize: 13, fontWeight: 600 }}>All issues →</a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {rest.map(d => (
              <article key={d.no} style={{ background: '#fff', display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #ECE8DF' }}>
                <EditorialImage src={d.img} aspect="auto" style={{ height: '100%' }} />
                <div style={{ padding: '28px 28px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <Chip variant="outline">{d.tag}</Chip>
                    <span style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#8F8F8F' }}>{d.date}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.3, color: '#132531', textWrap: 'pretty' }}>{d.title}</h3>
                  <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6, marginTop: 10 }}>{d.lede.split('.')[0]}.</p>
                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <BrassRule width={24} />
                    <span style={{ fontSize: 12, color: '#132531', letterSpacing: 0.5, fontWeight: 500 }}>Read the entry</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE TABLE */}
      <section style={{ background: '#fff', padding: '96px 40px', borderTop: '1px solid #ECE8DF' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <Label>/ The archive</Label>
              <h2 style={{ fontSize: 30, fontWeight: 400, color: '#132531', marginTop: 12, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                Retained in perpetuity.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['ALL', 'ENERGY', 'METALS', 'AGRICULTURE', 'FREIGHT', 'VIEWPOINT'].map(t => (
                <button key={t}
                  onClick={() => setFilter(t)}
                  className={t === filter ? 'btn btn--primary btn--micro' : 'btn btn--ghost-dark btn--micro'}
                  style={{
                    border: t === filter ? '1px solid #132531' : '1px solid #D8D4CC',
                    background: t === filter ? '#132531' : 'transparent',
                    color: t === filter ? '#fff' : '#132531'
                  }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #132531' }}>
            {PAST_ISSUES.filter(i => filter === 'ALL' || i.cat === filter).map((iss, i) => (
              <div key={iss.no} style={{
                display: 'grid', gridTemplateColumns: '110px 110px 1fr 140px 40px',
                padding: '20px 0', borderBottom: '1px solid #ECE8DF', alignItems: 'center',
                cursor: 'pointer', transition: 'background 220ms'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F8F7F3'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, color: '#6B6B6B' }}>{iss.no}</div>
                <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#132531' }}>{iss.date}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: '#132531' }}>{iss.title}</div>
                <div><Chip variant="outline">{iss.cat}</Chip></div>
                <div style={{ textAlign: 'right', color: '#132531' }}><ArrowIcon size={14} /></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: '#8F8F8F' }}>
              Showing {PAST_ISSUES.filter(i => filter === 'ALL' || i.cat === filter).length} of 142 issues
            </span>
            <a href="#" className="link" style={{ fontSize: 13, fontWeight: 600 }}>Open full archive →</a>
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  );
}

Object.assign(window, { NewsletterPage });
