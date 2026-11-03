import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Label from '../components/Label.jsx'

const UNITS = {
  smaa: { label: '60L småsekker (Bjørk)', short: 'småsekker à 60 L (bjørk)', price: 89, kwh: 76, kg: 18, min: 5, max: 50, step: 1, noun: 'sekker', form: 'Bjørk' },
  stor: { label: '1000L storsekk på pall (Bjørk)', short: 'storsekker à 1000 L på pall (bjørk)', price: 1490, kwh: 1260, kg: 300, min: 1, max: 6, step: 1, noun: 'storsekker', form: 'Bjørk' },
  bland: { label: '1000L storsekk (Blandingsved)', short: 'storsekker à 1000 L (blandingsved)', price: 1190, kwh: 940, kg: 240, min: 1, max: 6, step: 1, noun: 'storsekker', form: 'Furu og gran' },
}

const KOMMUNER = {
  Flå: 450,
  Nesbyen: 250,
  Gol: 350,
  Hemsedal: 550,
  Ål: 450,
  'Hol / Geilo': 650,
  'Hentes selv på lager': 0,
}

const fmt = (n) => new Intl.NumberFormat('nb-NO').format(Math.round(n))

function Calculator() {
  const navigate = useNavigate()
  const [unit, setUnit] = useState('smaa')
  const [qty, setQty] = useState(10)
  const [kommune, setKommune] = useState('Nesbyen')
  const [stable, setStable] = useState(false)

  const u = UNITS[unit]
  const changeUnit = (k) => {
    setUnit(k)
    setQty(k === 'smaa' ? 10 : 1)
  }
  const setQ = (v) => setQty(Math.min(u.max, Math.max(u.min, v)))

  const liter = unit === 'smaa' ? qty * 60 : qty * 1000
  const varer = qty * u.price
  const levering = kommune === 'Hentes selv på lager' ? 0 : KOMMUNER[kommune]
  const stabling = stable ? (unit === 'smaa' ? qty * 10 : qty * 250) : 0
  const sum = varer + levering + stabling
  const kwh = qty * u.kwh
  const kg = qty * u.kg

  const send = () => {
    navigate('/bestilling', {
      state: {
        tab: 'ved',
        prefill: {
          vedtype: unit,
          antall: `${qty} ${u.short}`,
          kommune: kommune === 'Hentes selv på lager' ? '' : kommune,
          plassering: stable ? 'Innbæring og stabling i vedbod ønskes.' : '',
          sum: `Estimert pris: ${fmt(sum)} kr`,
        },
      },
    })
  }

  return (
    <div className="calc">
      <div className="calc-form">
        <fieldset>
          <legend className="mono">1 · ENHET</legend>
          <div className="choice-col">
            {Object.entries(UNITS).map(([k, v]) => (
              <button key={k} type="button" className={'choice' + (unit === k ? ' on' : '')} aria-pressed={unit === k} onClick={() => changeUnit(k)}>
                <span>{v.label}</span>
                <span className="mono choice-price">{fmt(v.price)} kr</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mono">2 · ANTALL</legend>
          <div className="stepper">
            <button type="button" aria-label="Færre" onClick={() => setQ(qty - 1)} disabled={qty <= u.min}>−</button>
            <output className="mono">{qty}</output>
            <button type="button" aria-label="Flere" onClick={() => setQ(qty + 1)} disabled={qty >= u.max}>+</button>
            <span className="small">{u.noun}</span>
          </div>
          <input
            type="range"
            min={u.min}
            max={u.max}
            step={u.step}
            value={qty}
            aria-label="Antall"
            onChange={(e) => setQ(Number(e.target.value))}
          />
          <div className="range-ends mono"><span>{u.min}</span><span>{u.max}</span></div>
        </fieldset>

        <fieldset>
          <legend className="mono">3 · LEVERINGSKOMMUNE</legend>
          <select value={kommune} onChange={(e) => setKommune(e.target.value)} aria-label="Leveringskommune">
            {Object.keys(KOMMUNER).map((k) => <option key={k}>{k}</option>)}
          </select>
        </fieldset>

        <fieldset>
          <legend className="mono">4 · TILLEGG</legend>
          <label className="check">
            <input type="checkbox" checked={stable} onChange={(e) => setStable(e.target.checked)} />
            <span>Ønsker innbæring og stabling i vedbod på hytta</span>
          </label>
        </fieldset>
      </div>

      <aside className="calc-sum">
        <span className="mono tag">OPPSUMMERING</span>
        <h3>{qty} {u.noun}</h3>
        <p className="small">{u.label} · {fmt(liter)} L løs ved</p>
        <dl className="sum-list mono">
          <div><dt>Estimert brennverdi</dt><dd>≈ {fmt(kwh)} kWh</dd></div>
          <div><dt>Vektestimat</dt><dd>≈ {fmt(kg)} kg</dd></div>
          <div><dt>Ved</dt><dd>{fmt(varer)} kr</dd></div>
          <div><dt>Levering {kommune === 'Hentes selv på lager' ? '(hentes selv)' : `til ${kommune}`}</dt><dd>{levering ? `${fmt(levering)} kr` : '0 kr'}</dd></div>
          {stable && <div><dt>Innbæring og stabling</dt><dd>{fmt(stabling)} kr</dd></div>}
          <div className="total"><dt>Estimert sum</dt><dd>{fmt(sum)} kr</dd></div>
        </dl>
        <button type="button" className="btn btn-primary block" onClick={send}>Send forespørsel med disse valgene</button>
        <p className="small">Veiledende pris og verdier. Endelig tilbud bekreftes ved bestilling.</p>
      </aside>
    </div>
  )
}

const FAQ = [
  {
    q: 'Hvordan foregår levering til hytta hvis vi ikke er der selv?',
    a: 'Du avtaler på forhånd hvor veden skal stå, for eksempel ved hytteveggen, i vedboden eller ved garasjen. Når veden er levert, får du en bildemelding på SMS som viser at alt står på plass. Betaling skjer enkelt med Vipps eller på faktura.',
  },
  {
    q: 'Hvor mye ved trenger man på en hytte i løpet av en vintersesong?',
    a: 'Til helgebruk med fyring i peisovn går det ofte med 10 til 20 sekker à 60 L gjennom vinteren. Skal dere være på hytta i vinterferie og påske, med jevnlig fyring døgnet rundt, regn heller med 2 til 4 storsekker à 1000 L. Er hytta dårlig isolert eller dere fyrer også som hovedvarme, trenger dere mer.',
  },
  {
    q: 'Kan storsekker løftes over brøytekanten?',
    a: 'Storsekkene leveres på pall og losses med truck eller kran fra bilen. Vi kommer frem så langt veien er brøytet og kjørbar for lastebil. Ligger hytta bak en høy brøytekant, setter vi sekkene så nær som mulig, eller deler opp lasten i småsekker som bæres frem. Gi oss beskjed om tilkomsten når du bestiller.',
  },
  {
    q: 'Hvordan bør veden lagres videre på hytta?',
    a: 'Sett veden luftig og hevet fra gulvet, for eksempel på pall eller rist, slik at luften kan gå under og mellom vedstykkene. Hold den tørr og under tak. Ta inn dagens ved i hytta 24 timer før fyring, slik at den blir romtemperert og brenner renere.',
  },
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="faq">
      {FAQ.map((f, i) => (
        <div key={f.q} className={'faq-item' + (open === i ? ' open' : '')}>
          <h3>
            <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="mono">0{i + 1}</span>
              <span className="faq-q">{f.q}</span>
              <span className="faq-icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
          </h3>
          <div id={`faq-${i}`} className="faq-a" hidden={open !== i}>
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Vedlager() {
  return (
    <>
      <section className="container page-intro intro-split">
        <div>
          <Label>VEDLAGERET · KALKULATOR</Label>
          <h1>Vedlageret – Fyringsklar ved for fjellvinteren</h1>
          <p className="lead">
            Velg mengde, treslag og leveringsmåte under. All ved er kappet i standard 30 cm lengde, kløyvd for optimal tørk og lagret luftig under tak.
          </p>
        </div>
        <figure className="arch">
          <img src="/img/sekker.jpg" alt="Kløyvd bjørkeved" />
          <figcaption className="mono">30 CM · KLØYVD · 16–18 %</figcaption>
        </figure>
      </section>

      <section className="container section tight">
        <div className="section-head">
          <Label>VERKTØY</Label>
          <h2>Ved- og Leveringskalkulator</h2>
        </div>
        <Calculator />
      </section>

      <section className="container section">
        <div className="section-head">
          <Label>TEKNISKE SPESIFIKASJONER</Label>
          <h2>Sammenlign vedtypene</h2>
        </div>
        <p className="table-scroll-hint mono">← Sveip tabellen sideveis for å se alle kolonner →</p>
        <div className="table-wrap" role="region" aria-label="Sammenligningstabell for vedtyper" tabIndex={0}>
          <table className="spec">
            <thead>
              <tr>
                <th>Egenskap</th>
                <th>Fjellbjørk (Prima)</th>
                <th>Furu & Gran (Blandingsved)</th>
                <th>Opptenningsved</th>
              </tr>
            </thead>
            <tbody>
              <tr><th>Brennverdi</th><td className="mono">ca. 4,2 kWh/kg · høy</td><td className="mono">ca. 4,0 kWh/kg · middels</td><td className="mono">ca. 4,1 kWh/kg · lav tetthet</td></tr>
              <tr><th>Fuktighet</th><td className="mono">16–18 %</td><td className="mono">17–20 %</td><td className="mono">&lt; 15 %</td></tr>
              <tr><th>Duft og flammebilde</th><td>Mild, søt duft. Rolig, lang og gyllen flamme.</td><td>Harpiksduft. Livlig flamme med raskere avbrenning.</td><td>Frisk furuduft. Hurtig, lys flamme som tar seg raskt.</td></tr>
              <tr><th>Anbefalt bruk</th><td>Peisovn og åpen gruve</td><td>Åpen gruve og bålpanne</td><td>Opptenning i peisovn og bålpanne</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <Label>VANLIGE SPØRSMÅL</Label>
          <h2>Før du bestiller</h2>
        </div>
        <div className="faq-layout">
          <Faq />
          <figure className="faq-photo">
            <img src="/img/hytte.jpg" alt="Storsekker med ved ved hytteveggen" loading="lazy" />
            <figcaption className="mono">LEVERT TIL HYTTEVEGGEN</figcaption>
          </figure>
        </div>
      </section>
    </>
  )
}
