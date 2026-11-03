import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const NAV = [
  { to: '/', label: 'Gårdstunet', end: true },
  { to: '/vedlager', label: 'Vedlager & Kalkulator' },
  { to: '/makarlaget', label: 'Kubbestolar & Verkstad' },
  { to: '/bestilling', label: 'Om laget & Bestilling' },
]

const KOMMUNER = ['Flå', 'Nesbyen', 'Gol', 'Hemsedal', 'Ål', 'Hol / Geilo']

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="site-shell">
      <ScrollToTop />
      <div className="topbanner">
        Levering av tørr ved i hele Hallingdal: Flå • Nesbyen • Gol • Hemsedal • Ål • Geilo
      </div>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo" aria-label="Til forsiden">
            <span className="logo-mark" aria-hidden="true">H</span>
            <span className="logo-text">
              <span className="logo-title">HALLINGDAL VED & KUBBESTOLMAKARLAG</span>
              <span className="logo-sub">Skogsvirke & Tradisjonshåndverk</span>
            </span>
          </Link>
          <nav className="nav-desktop" aria-label="Hovedmeny">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/bestilling" className="btn btn-primary header-cta">Bestill til hytta →</Link>
          <button
            type="button"
            className={'burger' + (open ? ' is-open' : '')}
            aria-label={open ? 'Lukk meny' : 'Åpne meny'}
            aria-expanded={open}
            aria-controls="mobilmeny"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div id="mobilmeny" className={'mobile-menu' + (open ? ' open' : '')} aria-hidden={!open}>
        <nav aria-label="Mobilmeny">
          {NAV.map((n, i) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpen(false)}>
              <span className="mono">0{i + 1}</span> {n.label}
            </NavLink>
          ))}
          <Link to="/bestilling" className="btn btn-primary mobile-cta" onClick={() => setOpen(false)}>
            Bestill til hytta →
          </Link>
          <div className="mobile-meta mono">
            <p>LEVERINGSOMRÅDER I HALLINGDAL</p>
            <div className="mobile-tags">
              {KOMMUNER.map((k) => <span key={k}>{k}</span>)}
            </div>
          </div>
        </nav>
      </div>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h4>Om makarlaget</h4>
            <p>
              Et lite arbeidslag i Hallingdal som foredler lokalt tømmer: tørr ved til hytta og håndhugde
              kubbestoler som er bygget for å gå i arv.
            </p>
            <ul className="footer-links">
              {NAV.map((n) => (
                <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Leveringskommuner i Hallingdal</h4>
            <ul className="footer-tags">
              {KOMMUNER.map((k) => <li key={k}>{k}</li>)}
            </ul>
            <p className="small">Henting på lager etter avtale.</p>
          </div>
          <div>
            <h4>Direktekontakt</h4>
            <ul className="footer-contact mono">
              <li><a href="tel:+4732000000">+47 32 00 00 00</a></li>
              <li><a href="mailto:post@hallingdalved.no">post@hallingdalved.no</a></li>
              <li>Vedlageret, 3540 Nesbyen</li>
              <li>Man–fre 07–16 · Lør etter avtale</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          © Hallingdal Ved & Kubbestolmakarlag AS (Org.nr. registrert i Foretaksregisteret). Kvalitetssikret og levert av Vikingnet.
        </div>
      </footer>
    </div>
  )
}
