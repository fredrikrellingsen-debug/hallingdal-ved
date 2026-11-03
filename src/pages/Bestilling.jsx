import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Label from '../components/Label.jsx'

const VEDTYPER = {
  smaa: 'Bjørk – 60L småsekker',
  stor: 'Bjørk – 1000L storsekk på pall',
  bland: 'Blandingsved – 1000L storsekk',
  opptenning: 'Opptenningsved',
}
const PRODUKTER = ['Kubbestol', 'Sittekubber', 'Gave med inngravering', 'Annet']

const vedInit = { navn: '', telefon: '', epost: '', kommune: '', adresse: '', vedtype: 'smaa', antall: '', uke: '', plassering: '' }
const stolInit = { navn: '', telefon: '', epost: '', produkt: 'Kubbestol', ønsker: '', jubileum: '' }

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="mono">{label}</span>
      {children}
    </label>
  )
}

function Story() {
  return (
    <section className="container section story">
      <div className="story-head">
        <Label>OM LAGET</Label>
        <h1 className="h1-sm">Rotfestet i skogen og håndverket i Hallingdal</h1>
      </div>
      <div className="story-wrap">
      <figure className="arch story-fig"><img src="/img/kubbestol.jpg" alt="Håndhugd kubbestol av furu" /><figcaption className="mono">ÉN STOKK · INGEN LIM</figcaption></figure>
      <div className="story-cols">
        <p className="dropcap">
          Hallingdal Ved & Kubbestolmakarlag AS ble startet av én enkel grunn: gleden ved å foredle tømmer som vokser rett utenfor stuedøra. Vi så for mange gode stokker bli til flis eller bli liggende, mens hytteeiere kjørte opp dalen med bagasjerom fullt av fuktig ved fra andre kanter. Vi ville heller ta hele kjeden selv, fra skogen til peisen og fra rotstokken til stolen.
        </p>
        <p>
          Et ordentlig «makarlag» er et arbeidslag der hendene hjelper hverandre. Det er slik gammel kunnskap holdes i hevd: den eldste viser hvordan en øks skal føres, den yngste husker hvor tørkeriene står best. I verkstedet lærer vi bort og lærer videre, og hver stol bærer litt av dem alle sammen.
        </p>
        <p>
          Vi lover redelig handel. En sekk ved fra oss er stappfull, tørr og målt på ærlig vis. En kubbestol er bygget for å gå i arv, hugget av én stokk uten lim og skruer, og vi står inne for den i hundre år. Skulle noe være galt, ringer du, så ordner vi det.
        </p>
      </div>
      </div>
    </section>
  )
}

export default function Bestilling() {
  const { state, key } = useLocation()
  const [tab, setTab] = useState('ved')
  const [ved, setVed] = useState(vedInit)
  const [stol, setStol] = useState(stolInit)
  const [sent, setSent] = useState(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    if (!state) return
    if (state.tab) setTab(state.tab)
    const p = state.prefill || {}
    if (state.tab === 'ved') {
      setVed((v) => ({ ...vedInit, ...v, ...p, sum: undefined }))
      setNote(p.sum || '')
    } else if (state.tab === 'stol') {
      setStol((s) => ({ ...s, ...p }))
      setNote('')
    }
    setSent(null)
  }, [key])

  const updV = (k) => (e) => setVed({ ...ved, [k]: e.target.value })
  const updS = (k) => (e) => setStol({ ...stol, [k]: e.target.value })

  const submitVed = (e) => {
    e.preventDefault()
    setSent('ved')
    setVed(vedInit)
    setNote('')
  }
  const submitStol = (e) => {
    e.preventDefault()
    setSent('stol')
    setStol(stolInit)
  }

  return (
    <>
      <Story />

      <section className="dark-section" id="bestill" style={{ backgroundImage: 'linear-gradient(rgba(27,24,21,.88), rgba(27,24,21,.96)), url(/img/bestill.jpg)' }}>
        <div className="container">
          <div className="section-head">
            <Label light>BESTILLING</Label>
            <h2>Send oss en bestilling eller forespørsel</h2>
          </div>

          <div className="form-card">
            <div className="tabs tabs-form" role="tablist">
              <button role="tab" aria-selected={tab === 'ved'} className={tab === 'ved' ? 'on' : ''} onClick={() => { setTab('ved'); setSent(null) }}>
                Bestill fyringsved & hjemkjøring
              </button>
              <button role="tab" aria-selected={tab === 'stol'} className={tab === 'stol' ? 'on' : ''} onClick={() => { setTab('stol'); setSent(null) }}>
                Forespør kubbestol eller trehåndverk
              </button>
            </div>

            {sent ? (
              <div className="success" role="status">
                <h3>Takk! {sent === 'ved' ? 'Vedbestillingen' : 'Forespørselen'} er mottatt.</h3>
                <p>Vi tar kontakt på telefon eller e-post så snart vi har sett på den.</p>
                <button type="button" className="btn btn-primary" onClick={() => setSent(null)}>Send en ny</button>
              </div>
            ) : tab === 'ved' ? (
              <form onSubmit={submitVed} className="form-grid" role="tabpanel">
                {note && <p className="note mono full">{note}</p>}
                <Field label="NAVN"><input required value={ved.navn} onChange={updV('navn')} autoComplete="name" /></Field>
                <Field label="TELEFON"><input required type="tel" value={ved.telefon} onChange={updV('telefon')} autoComplete="tel" /></Field>
                <Field label="E-POST"><input required type="email" value={ved.epost} onChange={updV('epost')} autoComplete="email" /></Field>
                <Field label="KOMMUNE / HYTTEFELT"><input required value={ved.kommune} onChange={updV('kommune')} placeholder="F.eks. Gol, Skogshorn hyttefelt" /></Field>
                <Field label="ADRESSE I HALLINGDAL"><input required value={ved.adresse} onChange={updV('adresse')} /></Field>
                <Field label="VEDTYPE">
                  <select value={ved.vedtype} onChange={updV('vedtype')}>
                    {Object.entries(VEDTYPER).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </Field>
                <Field label="ANTALL"><input required value={ved.antall} onChange={updV('antall')} placeholder="F.eks. 20 sekker eller 2 storsekker" /></Field>
                <Field label="ØNSKET LEVERINGSUKE ELLER HELG"><input value={ved.uke} onChange={updV('uke')} placeholder="F.eks. uke 7 eller helgen 14.–16. februar" /></Field>
                <label className="field full">
                  <span className="mono">PLASSERINGSINSTRUKS</span>
                  <textarea rows="3" value={ved.plassering} onChange={updV('plassering')} placeholder="F.eks. Stable ved inngangsdør, sett pall ved garasje" />
                </label>
                <button className="btn btn-primary full-btn" type="submit">Send vedbestilling</button>
              </form>
            ) : (
              <form onSubmit={submitStol} className="form-grid" role="tabpanel">
                <Field label="NAVN"><input required value={stol.navn} onChange={updS('navn')} autoComplete="name" /></Field>
                <Field label="TELEFON"><input required type="tel" value={stol.telefon} onChange={updS('telefon')} autoComplete="tel" /></Field>
                <Field label="E-POST"><input required type="email" value={stol.epost} onChange={updS('epost')} autoComplete="email" /></Field>
                <Field label="ØNSKET PRODUKT">
                  <select value={stol.produkt} onChange={updS('produkt')}>
                    {PRODUKTER.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <label className="field full">
                  <span className="mono">ØNSKER TIL MÅL, TRESLAG, OVERFLATE ELLER INSKRIPSJON</span>
                  <textarea rows="4" value={stol.ønsker} onChange={updS('ønsker')} />
                </label>
                <label className="field full">
                  <span className="mono">ER DET TIL EN SPESIELL DATO ELLER ET JUBILEUM?</span>
                  <input value={stol.jubileum} onChange={updS('jubileum')} placeholder="F.eks. 60-årsdag i oktober" />
                </label>
                <button className="btn btn-primary full-btn" type="submit">Send forespørsel til makarlaget</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
