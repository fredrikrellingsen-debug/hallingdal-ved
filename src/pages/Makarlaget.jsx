import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Label from '../components/Label.jsx'

const ANATOMI = [
  { img: 'anat1', n: '01', t: 'Emnestokken (50–80 cm i diameter)', d: 'Utvalgte rotstokker av gammel furu eller bjørk med naturlig fasong og tett årringvekst.' },
  { img: 'anat2', n: '02', t: 'Uthuling og tørkesliss', d: 'Kjernen hules ut for å redusere vekt og styre treverkets naturlige bevegelser under den langsomme tørkeprosessen.' },
  { img: 'anat3', n: '03', t: 'Ergonomisk sete og buet rygg', d: 'Setehøyden og ryggvangen tilpasses kroppen slik at man sitter lunt og stødig i timevis foran peisen eller ute på tunet.' },
  { img: 'anat4', n: '04', t: 'Tradisjonell overflate', d: 'Behandles med ekte tretjære, kaldpresset linolje, brent overflate (Shou Sugi Ban-inspirert) eller tradisjonell rosemaling/skurd.' },
]

const MODELLER = ['Stor tradisjonell kubbestol med rygg', 'Utendørs bålpanne-kubbestol', 'Sett med sittekubber & massivt kubbebord', 'Hoggestabbe i heltre']
const TRESLAG = ['Gammel malmfuru', 'Kraftig fjellbjørk']
const BEHANDLING = ['Ubehandlet natur', 'Linoljet (innendørs)', 'Tjærebredd (utendørs/svalgang)']

function Choices({ title, items, value, onChange }) {
  return (
    <fieldset>
      <legend className="mono">{title}</legend>
      <div className="choice-grid">
        {items.map((i) => (
          <button key={i} type="button" className={'choice' + (value === i ? ' on' : '')} aria-pressed={value === i} onClick={() => onChange(i)}>
            {i}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function Configurator() {
  const navigate = useNavigate()
  const [modell, setModell] = useState(MODELLER[0])
  const [treslag, setTreslag] = useState(TRESLAG[0])
  const [behandling, setBehandling] = useState(BEHANDLING[1])
  const [tekst, setTekst] = useState('')

  const send = () =>
    navigate('/bestilling', {
      state: {
        tab: 'stol',
        prefill: {
          produkt: modell.startsWith('Sett') ? 'Sittekubber' : 'Kubbestol',
          ønsker: `Modell: ${modell}. Treslag: ${treslag}. Behandling: ${behandling}.${tekst ? ` Inngravering: «${tekst}».` : ''}`,
        },
      },
    })

  return (
    <div className="calc">
      <div className="calc-form">
        <Choices title="1 · MODELL" items={MODELLER} value={modell} onChange={setModell} />
        <Choices title="2 · TRESLAG" items={TRESLAG} value={treslag} onChange={setTreslag} />
        <Choices title="3 · BEHANDLING" items={BEHANDLING} value={behandling} onChange={setBehandling} />
        <fieldset>
          <legend className="mono">4 · PERSONLIG PREG</legend>
          <input
            type="text"
            maxLength={40}
            value={tekst}
            onChange={(e) => setTekst(e.target.value)}
            placeholder="Initialer, årstall, bryllupsdato eller hyttenavn"
            aria-label="Tekst til inngravering"
          />
          <p className="small mono">{tekst.length}/40 tegn · perfekt som 50- eller 60-årsgave eller hyttegave</p>
        </fieldset>
      </div>
      <aside className="calc-sum">
        <span className="mono tag">DIN UTFØRELSE</span>
        <h3>{modell}</h3>
        <dl className="sum-list">
          <div><dt>Treslag</dt><dd>{treslag}</dd></div>
          <div><dt>Behandling</dt><dd>{behandling}</dd></div>
          <div><dt>Inngravering</dt><dd>{tekst ? `«${tekst}»` : 'Ingen'}</dd></div>
        </dl>
        <button type="button" className="btn btn-primary block" onClick={send}>Be om pris og leveringstid på denne utførelsen</button>
        <p className="small">Hver stol er unik. Pris og leveringstid avhenger av stokken vi finner til deg.</p>
      </aside>
    </div>
  )
}

export default function Makarlaget() {
  return (
    <>
      <section className="workshop-intro" style={{ backgroundImage: 'linear-gradient(90deg, rgba(27,24,21,.96) 30%, rgba(27,24,21,.55)), url(/img/verksted.jpg)' }}>
        <div className="container">
          <Label light>VERKSTEDET · TRESKJÆRERTRADISJON</Label>
          <h1>Kubbestolmakarlaget – Levende treskjærertradisjon</h1>
          <p className="lead">
            En ekte kubbestol skrus ikke sammen av planker. Den hules og formes for hånd ut av én eneste grov trestamme med motorsag, øks, teksle og skarpe huggjern.
          </p>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <Label>KUBBESTOLENS ANATOMI</Label>
          <h2>Fire steg fra stokk til stol</h2>
        </div>
        <div className="anatomy">
          {ANATOMI.map((a) => (
            <article key={a.n} className="anat-card">
              <img className="anat-img" src={`/img/${a.img}.jpg`} alt={a.t} loading="lazy" />
              <span className="mono anat-n">{a.n}</span>
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section tight">
        <div className="section-head">
          <Label>SKREDDERSYDD</Label>
          <h2>Sett sammen din kubbestol</h2>
          <p className="lead small-lead">Forespørsel om skreddersøm</p>
        </div>
        <Configurator />
      </section>
    </>
  )
}
