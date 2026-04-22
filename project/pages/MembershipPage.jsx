/* global React, Button, Label, BrassRule, Chip, EditorialImage, ArrowIcon, Header, Footer */
const { useState: useMemState } = React;

function MembershipPage({ onNav }) {
  const [step, setStep] = useMemState(1);
  const [form, setForm] = useMemState({ name: '', email: '', year: '', major: '', sponsor: '', interest: [] });
  const [tier, setTier] = useMemState('member');

  const toggleInterest = (i) => {
    setForm(f => ({
      ...f,
      interest: f.interest.includes(i) ? f.interest.filter(x => x !== i) : [...f.interest, i]
    }));
  };

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 540, background: '#060F16', color: '#fff', overflow: 'hidden' }}>
        <Header current="membership" onNav={onNav} tone="dark" />
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=2000&q=80"
               style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(60%) brightness(0.45)' }} alt="" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,15,22,0.7) 0%, rgba(6,15,22,0.55) 100%)' }} />
        </div>
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '170px 40px 90px' }}>
          <Label style={{ color: '#C49A3E', marginBottom: 22 }}>/ Admissions · by proposal</Label>
          <h1 style={{ fontSize: 64, fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.02em', maxWidth: 820, textWrap: 'balance' }}>
            Candidates are proposed<br/>by a member in good standing.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', marginTop: 24, maxWidth: 520 }}>
            The Admissions Committee convenes at the start of each semester. A proposal must be seconded and attested; the decision is final.
          </p>
        </div>
      </section>

      {/* TIERS */}
      <section style={{ background: '#F8F7F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <Label style={{ marginBottom: 16 }}>/ Three registers</Label>
            <h2 style={{ fontSize: 38, fontWeight: 400, color: '#132531', lineHeight: 1.2, letterSpacing: '-0.01em', textWrap: 'balance' }}>
              Each member holds one seat, in one register.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid #D8D4CC', background: '#fff' }}>
            {[
              { id: 'associate', cat: 'Associate', dues: '$25', term: 'per semester',
                desc: 'Open to first- and second-year Kelley students in good standing. Attends weekly meetings, receives the Dispatch, and may observe the Register.',
                rights: ['Weekly meeting', 'The Dispatch', 'Guest principal sessions', 'Observer at the Register']
              },
              { id: 'member', cat: 'Member', dues: '$75', term: 'per semester', featured: true,
                desc: 'Juniors, seniors, and graduate students. Admitted by proposal and seconding. Rotates between desks, contributes to the Register, eligible for officer elections.',
                rights: ['Full floor privileges', 'Desk rotation', 'Contributes to the Register', 'Eligible for elections', 'Placement network', 'Spring dinner']
              },
              { id: 'alumnus', cat: 'Alumnus', dues: '$100', term: 'per annum',
                desc: 'Admitted upon graduation. Retains placement in the Register, access to the archive, and the privilege of proposing candidates for admission.',
                rights: ['Lifetime Register entry', 'Archive access', 'Proposal privileges', 'Annual yearbook']
              },
            ].map(t => (
              <div key={t.id} style={{
                padding: '44px 36px 40px',
                background: t.featured ? '#132531' : '#fff',
                color: t.featured ? '#fff' : '#132531',
                borderRight: '1px solid ' + (t.featured ? 'transparent' : '#D8D4CC'),
                position: 'relative'
              }}>
                {t.featured && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#C49A3E'
                  }} />
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: t.featured ? '#C49A3E' : '#6B6B6B' }}>
                      Register
                    </div>
                    <h3 style={{ fontSize: 30, fontWeight: 500, marginTop: 8, letterSpacing: '-0.01em' }}>{t.cat}</h3>
                  </div>
                  {t.featured && <Chip variant="brass">Most common</Chip>}
                </div>
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.02em' }}>{t.dues}</span>
                  <span style={{ fontSize: 13, color: t.featured ? 'rgba(255,255,255,0.6)' : '#6B6B6B' }}>{t.term}</span>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.65, marginTop: 18, color: t.featured ? 'rgba(255,255,255,0.75)' : '#4A4A4A' }}>
                  {t.desc}
                </p>
                <div style={{ height: 1, background: t.featured ? 'rgba(255,255,255,0.12)' : '#ECE8DF', margin: '24px 0' }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.rights.map(r => (
                    <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                      <span style={{ color: t.featured ? '#C49A3E' : '#C8321E', marginTop: 1 }}>—</span>
                      <span style={{ color: t.featured ? 'rgba(255,255,255,0.85)' : '#132531' }}>{r}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 32 }}>
                  <button onClick={() => { setTier(t.id); document.getElementById('proposal-form')?.scrollIntoView({ block: 'start', behavior: 'smooth' }); }}
                          className={t.featured ? 'btn btn--signal' : 'btn btn--ghost-dark'}
                          style={{ width: '100%' }}>
                    Select {t.cat} <ArrowIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPOSAL PROCESS — 4 step horizontal */}
      <section style={{ background: '#132531', color: '#fff', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Label style={{ color: '#C49A3E', marginBottom: 14 }}>/ The proposal</Label>
          <h2 style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.2, maxWidth: 680, letterSpacing: '-0.01em' }}>
            Four steps, one sitting of the Committee.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, marginTop: 56, background: 'rgba(255,255,255,0.1)' }}>
            {[
              { n: '01', t: 'Proposal', d: 'A candidate submits interest. A current member proposes them in confidence.' },
              { n: '02', t: 'Seconding', d: 'A second member attests to standing and suitability for the floor.' },
              { n: '03', t: 'Committee', d: 'The Admissions Committee convenes within six weeks of receipt.' },
              { n: '04', t: 'Admission', d: 'A seat in the Register upon acceptance; dues collected the Friday following.' },
            ].map(s => (
              <div key={s.n} style={{ background: '#132531', padding: '36px 30px' }}>
                <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, color: '#C49A3E', letterSpacing: 1 }}>— {s.n}</div>
                <h3 style={{ fontSize: 22, fontWeight: 500, marginTop: 14, letterSpacing: '-0.01em' }}>{s.t}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginTop: 12 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPOSAL FORM */}
      <section id="proposal-form" style={{ background: '#F8F7F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'start' }}>
          <div>
            <Label>/ Submit a proposal</Label>
            <h2 style={{ fontSize: 34, fontWeight: 400, color: '#132531', marginTop: 14, lineHeight: 1.2, letterSpacing: '-0.01em', textWrap: 'balance' }}>
              Begin your entry in the Register.
            </h2>
            <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.7, marginTop: 18 }}>
              Complete the form opposite. If you do not yet have a proposing member, leave the field blank — the Secretariat will match candidates from the general interest queue at the start of each semester.
            </p>
            <div style={{ marginTop: 32, padding: 24, background: '#132531', color: '#fff' }}>
              <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#C49A3E', marginBottom: 10 }}>Next committee sitting</div>
              <div style={{ fontSize: 22, fontWeight: 500 }}>Friday 10 April 2026</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>Hodge Hall 2083 · 7:00 PM · dress of the floor</div>
            </div>
          </div>

          <aside style={{ background: '#fff', padding: 40, border: '1px solid #D8D4CC' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label>PROPOSAL · {step} of 3</Label>
              <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#C49A3E' }}>
                {tier.charAt(0).toUpperCase() + tier.slice(1)} register
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 14, marginBottom: 28 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ flex: 1, height: 2, background: i <= step ? '#C8321E' : '#ECE8DF', transition: 'background 220ms' }} />
              ))}
            </div>

            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <label>
                  <Label>FULL NAME</Label>
                  <input className="input" placeholder="e.g. A. N. Demetriou" value={form.name}
                         onChange={e => setForm({ ...form, name: e.target.value })} style={{ marginTop: 6 }} />
                </label>
                <label>
                  <Label>INDIANA EMAIL</Label>
                  <input className="input" placeholder="name@indiana.edu" value={form.email}
                         onChange={e => setForm({ ...form, email: e.target.value })} style={{ marginTop: 6 }} />
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14 }}>
                  <label>
                    <Label>CLASS</Label>
                    <select className="input" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} style={{ marginTop: 6 }}>
                      <option value="">—</option>
                      <option>Class of 2027</option>
                      <option>Class of 2028</option>
                      <option>Class of 2029</option>
                      <option>Graduate</option>
                    </select>
                  </label>
                  <label>
                    <Label>MAJOR / PROGRAM</Label>
                    <input className="input" placeholder="e.g. Finance" value={form.major}
                           onChange={e => setForm({ ...form, major: e.target.value })} style={{ marginTop: 6 }} />
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <label>
                  <Label>PROPOSING MEMBER (optional)</Label>
                  <input className="input" placeholder="Member no. or name" value={form.sponsor}
                         onChange={e => setForm({ ...form, sponsor: e.target.value })} style={{ marginTop: 6 }} />
                  <div style={{ fontSize: 12, color: '#8F8F8F', marginTop: 6 }}>
                    Leave blank if you do not know a current member.
                  </div>
                </label>
                <div>
                  <Label>DESK INTEREST · SELECT ANY</Label>
                  <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Energy', 'Metals', 'Agriculture', 'Freight', 'Softs', 'LNG', 'Dry bulk', 'Tankers'].map(i => (
                      <button key={i} type="button" onClick={() => toggleInterest(i)}
                              style={{
                                padding: '6px 12px', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase',
                                border: '1px solid ' + (form.interest.includes(i) ? '#132531' : '#D8D4CC'),
                                background: form.interest.includes(i) ? '#132531' : 'transparent',
                                color: form.interest.includes(i) ? '#fff' : '#132531',
                                cursor: 'pointer', borderRadius: 2, transition: 'all 220ms'
                              }}>
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div style={{ fontSize: 15, color: '#132531', lineHeight: 1.7 }}>
                  Please review your proposal. Upon submission, the Secretariat will seal the record and deliver it to the Committee before the next sitting.
                </div>
                <div style={{ marginTop: 22, padding: 20, background: '#F1EEE6', borderLeft: '2px solid #C49A3E' }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#6B6B6B', marginBottom: 8 }}>Proposal record</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#132531' }}>{form.name || '—'}</div>
                  <div style={{ fontSize: 13, color: '#4A4A4A', marginTop: 4 }}>{form.email || '—'}</div>
                  <div style={{ fontSize: 13, color: '#4A4A4A', marginTop: 12 }}>
                    {form.year || '—'} · {form.major || '—'}
                  </div>
                  <div style={{ fontSize: 13, color: '#4A4A4A', marginTop: 4 }}>
                    Proposed by: {form.sponsor || 'General interest queue'}
                  </div>
                  <div style={{ fontSize: 13, color: '#4A4A4A', marginTop: 4 }}>
                    Desks: {form.interest.join(' · ') || '—'}
                  </div>
                  <div style={{ fontSize: 13, color: '#4A4A4A', marginTop: 4 }}>
                    Register: {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
              <button className="btn btn--ghost-dark btn--sm" onClick={() => setStep(Math.max(1, step - 1))}
                      disabled={step === 1} style={{ opacity: step === 1 ? 0.3 : 1 }}>
                ← Back
              </button>
              {step < 3
                ? <Button variant="primary" onClick={() => setStep(step + 1)}>Continue <ArrowIcon /></Button>
                : <Button variant="signal" onClick={() => alert('Proposal sealed. A note will follow from the Secretariat.')}>
                    Seal &amp; submit <ArrowIcon />
                  </Button>}
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#fff', padding: '96px 40px', borderTop: '1px solid #ECE8DF' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <Label style={{ marginBottom: 14 }}>/ House rules</Label>
          <h2 style={{ fontSize: 34, fontWeight: 400, color: '#132531', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Questions commonly put to the Secretariat.
          </h2>

          <div style={{ marginTop: 40, borderTop: '1px solid #132531' }}>
            {[
              ['Must I be a finance major to be admitted?', "No. The club draws from across the Kelley School and the university. Members have come from economics, international business, analytics, supply chain, and the liberal arts. What is required is an interest in physical markets and the willingness to study them seriously."],
              ['How many hours each week?', 'The weekly meeting runs ninety minutes. Desk commitments add between two and four hours, depending on the week and the publishing calendar of the Dispatch.'],
              ['Are dues refundable?', 'Dues are collected on the Friday following admission and are non-refundable. A member may resign at any time, in writing, to the Secretariat.'],
              ['Can alumni continue to participate?', 'Yes. Alumni retain their entry in the Register, access to the archive, and the privilege of proposing candidates. Many return as guest principals.'],
              ['Is the club affiliated with the Kelley School?', 'The club is a Registered Student Organization at Indiana University. It is independent of any academic department; its affairs are conducted by the elected officers.'],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderBottom: '1px solid #ECE8DF' }}>
                <summary style={{
                  listStyle: 'none', cursor: 'pointer', padding: '24px 0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32
                }}>
                  <span style={{ fontSize: 18, fontWeight: 500, color: '#132531' }}>{q}</span>
                  <span style={{ fontSize: 18, color: '#C49A3E', fontWeight: 300 }}>+</span>
                </summary>
                <div style={{ padding: '0 0 24px', fontSize: 14, color: '#4A4A4A', lineHeight: 1.7, maxWidth: 720 }}>
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer onNav={onNav} />
    </>
  );
}

Object.assign(window, { MembershipPage });
