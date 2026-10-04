import { NAV } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <a href="#inicio" aria-label="DTA Next — Inicio">
          <img src="/brand/dta-next-logo.png" width="262" height="56" alt="DTA Next — Desarrollo, Tecnología y Automatización." loading="lazy" />
        </a>
        <nav className="footer-nav" aria-label="Pie de página">
          {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href="#contacto">Contacto</a>
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} DTA Next</p>
      </div>
    </footer>
  )
}
