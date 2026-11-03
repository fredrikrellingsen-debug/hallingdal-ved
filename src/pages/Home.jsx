import { useState } from 'react'
import { Link } from 'react-router-dom'
import Label from '../components/Label.jsx'

const KOMMUNER = ['Flå', 'Nesbyen', 'Gol', 'Hemsedal', 'Ål', 'Hol / Geilo']

function QuickCard() {
  const [tab, setTab] = useState('ved')
  return (
    <aside className="quick" aria-label="Hurtigvalg">
      <div className="tabs" role="tablist">
        <button type="button" role="tab" aria-selected={tab === 'ved'} className={tab === 'ved' ? 'on' : ''} onClick={() => setTab('ved')}>
          Trenger du ved til helgen?
        </button>
        <button type="button" role="tab" aria-selected={tab === 'stol'} className={tab === 'stol' ? 'on' : ''} onClick={() => setTab('stol')}>
          Ute etter en unik kubbestol?
        </button>
      </div>
      <div className="quick-media">
        <img
          src={tab === 'ved' ? '/img/hero-ved.jpg' : '/img/kubbestol.jpg'}
          alt={tab === 'ved' ? 'Tørr bjørkeved stablet ved tømmervegg' : 'Håndhugd kubbestol ved peisovnen'}
        />
        <span className="quick-badge mono">
          {tab === 'ved' ? 'FYRINGSKLAR 30 CM' : 'HÅNDHUGD HELTRE'}
        </span>
      </div>
      <div className="quick-body" role="tabpanel">
        {tab === 'ved' ? (
          <>
            <div className="stock"><span className="dot" /> <span className="mono">På lager – Tørr bjørk &lt; 18 % fukt</span></div>
            <p>Vi leverer sekker og storsekker direkte til hytteveggen i hele dalføret.</p>
            <ul className="chips">
              {KOMMUNER.map((k) => <li key={k}>{k}</li>)}
            </ul>
            <Link to="/vedlager" className="btn btn-primary block">Åpne vedkalkulatoren →</Link>
          </>
        ) : (
          <>
            <div className="stock"><span className="dot dot-amber" /> <span className="mono">Bestillingsliste – håndhugd i heltre</span></div>
            <p>Hver stol hugges for hånd av én massiv stokk, etter din bestilling. Du velger modell, treslag og behandling – vi gir pris og leveringstid.</p>
            <p className="small">Typisk leveringstid: 6–10 uker.</p>
            <Link to="/makarlaget" className="btn btn-primary block">Gå til verkstedet →</Link>
          </>
        )}
      </div>
    </aside>
  )
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/img/skog.jpg)' }} />
        <div className="hero-shade" />
        <div className="container hero-grid">
          <div className="hero-main">
            <Label light>HALLINGDAL VED & KUBBESTOLMAKARLAG AS</Label>
            <h1>Knusktørr bjørkeved til hytteveggen – og kubbestoler hugget for å vare i hundre år.</h1>
            <p className="lead">
              Hos oss går ingenting av tømmeret til spille. Det fineste skogsvirket kløyves og tørkes til fyringsklar
              kvalitetsved, mens de groveste og mest karakterfulle rotstokkene blir til håndhugde kubbestoler i verkstedet vårt.
            </p>
            <div className="btn-row">
              <Link to="/vedlager" className="btn btn-primary">Beregn og bestill ved</Link>
              <Link to="/makarlaget" className="btn btn-outline-light">Se kubbestol-håndverket</Link>
            </div>
            <div className="hero-meta mono">FRA SKOGEN I HALLINGDAL • UNDER 18 % FUKTIGHET</div>
          </div>
          <div className="hero-side">
            <QuickCard />
          </div>
        </div>
      </section>

      <div className="strip" aria-hidden="true">
        <div className="strip-track mono">
          {[0, 1].map((k) => (
            <span key={k}>KLØYVD 30 CM ★ 16–18 % FUKT ★ LEVERT TIL HYTTEVEGGEN ★ HUGGET AV ÉN STOKK ★ INGEN LIM ★ FLÅ · NESBYEN · GOL · HEMSEDAL · ÅL · GEILO ★ </span>
          ))}
        </div>
      </div>

      <section className="container section">
        <div className="section-head">
          <Label>NR. 01 · FRA TUNET</Label>
          <h2>Slik bruker vi hele stokken</h2>
        </div>
        <div className="bento">
          <article className="b b-wide b-dark-green b-img" style={{ '--img': 'url(/img/kubbestol.jpg)' }}>
            <span className="mono tag">SORTERING</span>
            <h3>Fra rotstokk til arvestykke</h3>
            <p>
              Når tømmeret kommer ned fra skogen, går hver stokk gjennom hendene våre før den kappes. Rette, fine stammer av
              bjørk kløyves og tørkes til ved. Grov furu og knortete rotstokker med tette årringer settes til side i verkstedet.
              Slik brukes hver stokk til det den egner seg best til – og ingenting blir kasserte rester.
            </p>
            <p>
              Det som en gang skulle bli fyring, kan bli en stol som sitter i stua i tre generasjoner.
            </p>
          </article>
          <article className="b b-data">
            <span className="mono big">16–18 %</span>
            <p>Fuktighetsgrad på vår leveringsklare bjørkeved. Gir rask opptenning, ren forbrenning og maksimal kWh per kubbe.</p>
          </article>
          <article className="b b-card b-img" style={{ '--img': 'url(/img/hytte.jpg)' }}>
            <span className="mono tag">LEVERING</span>
            <h3>Hytteløftet i hele dalføret</h3>
            <p>Slipp å kjøre med tungt bagasjerom opp Hallingdal. Vi setter vedsekkene klart ved hytteveggen før du kommer opp fredag kveld.</p>
          </article>
          <article className="b b-accent b-img" style={{ '--img': 'url(/img/verksted.jpg)' }}>
            <span className="mono tag">HÅNDVERK</span>
            <h3>Én stokk. Ingen lim.</h3>
            <p>Ekte halling-kubbestol hugget ut av ett massivt stykke malmfuru eller fjellbjørk.</p>
          </article>
        </div>
      </section>

      <section className="split">
        <div className="split-light">
          <img className="split-photo" src="/img/sekker.jpg" alt="Kløyvd bjørkeved i sekk" loading="lazy" />
          <div className="split-inner">
            <Label>VEDLAGERET</Label>
            <h2>Sekker og storsekker, klare for peisen</h2>
            <ul className="spec-list mono">
              <li><span>40L / 60L</span><span>småsekker</span></li>
              <li><span>1000L / 1500L</span><span>storsekker</span></li>
            </ul>
            <p>Småsekker til helgeturen, storsekker på pall til hele vintersesongen. Regn ut pris og kWh på sekunder.</p>
            <Link to="/vedlager" className="btn btn-primary">Til priskalkulatoren →</Link>
          </div>
        </div>
        <div className="split-dark">
          <img className="split-photo" src="/img/verksted.jpg" alt="Verkstedet med huggjern og øks" loading="lazy" />
          <div className="split-inner">
            <Label light>MAKARLAGET</Label>
            <h2>Håndhugde kubbestoler fra verkstedet</h2>
            <ul className="plain-list">
              <li>Kubbestoler med rygg, hugget ut av én stokk</li>
              <li>Sittekubber rundt bålpanna</li>
              <li>Inngraverte jubileumsgaver</li>
            </ul>
            <p>Bygget for å gå i arv – med ditt navn, årstall eller hyttenavn hugget inn.</p>
            <Link to="/makarlaget" className="btn btn-light">Til verkstedet →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
