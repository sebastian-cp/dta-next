import Icon from './Icon.jsx'
import { NAV } from '../data/content.js'

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <a href="#inicio" aria-label="DTA Next — Inicio">
          <img src="/brand/dta-next-logo.png" width="262" height="56" alt="DTA Next — Desarrollo, Tecnología y Automatización." loading="lazy" />
        </a>
        <nav className="footer-nav" aria-label="Pie de página">
          {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href="#contacto">Contacto</a>
          <button type="button" onClick={() => onOpenLegal('privacy')}>Política de privacidad</button>
          <button type="button" onClick={() => onOpenLegal('legal')}>Aviso legal</button>
        </nav>
        <div className="footer-end">
          <a className="social-link" href="https://www.instagram.com/dta_next/" target="_blank" rel="noopener noreferrer" aria-label="DTA Next en Instagram (se abre en una pestaña nueva)">
            <Icon name="i-instagram" />
          </a>
          <p className="footer-copy">© {new Date().getFullYear()} DTA Next</p>
        </div>
      </div>
    </footer>
  )
}
