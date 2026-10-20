import Icon from './Icon.jsx'
import { SERVICES, CONTACT, MEETING } from '../data/content.js'

const COMPANY = [
  { href: '#demos', label: 'Demos' },
  { href: '#como-trabajamos', label: 'Cómo empezamos' },
  { href: '#nosotros', label: 'Sobre DTA Next' },
  { href: '#preguntas', label: 'Preguntas frecuentes' },
  { href: '#contacto', label: 'Contacto' },
]

// "56927640931" → "+56 9 2764 0931"
const phone = (n) => n.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, '+$1 $2 $3 $4')

export default function Footer({ onOpenLegal, onService, onBook }) {
  const wa = CONTACT.whatsapp && `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappText)}`
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#inicio" aria-label="DTA Next — Inicio">
              <img src="/brand/dta-next-logo.png" width="262" height="56" alt="DTA Next — Desarrollo, Tecnología y Automatización." loading="lazy" />
            </a>
            <p>Consultoría tecnológica en Chile. Automatización con IA, sitios web y aplicaciones a medida para empresas.</p>
            <div className="footer-social">
              <a className="social-link" href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="DTA Next en Instagram (se abre en una pestaña nueva)">
                <Icon name="i-instagram" />
              </a>
              {wa && (
                <a className="social-link" href={wa} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)">
                  <Icon name="i-chat" />
                </a>
              )}
              <a className="social-link" href={`mailto:${CONTACT.email}`} aria-label={`Escríbenos a ${CONTACT.email}`}>
                <Icon name="i-mail" />
              </a>
            </div>
          </div>

          <nav className="footer-col" aria-labelledby="ft-servicios">
            <h2 id="ft-servicios">Soluciones</h2>
            <ul>
              {Object.entries(SERVICES).map(([key, s]) => (
                <li key={key}><button type="button" onClick={() => onService(key)}>{s.title}</button></li>
              ))}
              <li><a href="#como-trabajamos">Diagnóstico de un proceso</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-labelledby="ft-empresa">
            <h2 id="ft-empresa">DTA Next</h2>
            <ul>
              {COMPANY.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>

          <div className="footer-col footer-contact">
            <h2>Contacto</h2>
            <ul>
              {wa && <li><Icon name="i-chat" /><a href={wa} target="_blank" rel="noopener noreferrer">{phone(CONTACT.whatsapp)}</a></li>}
              <li><Icon name="i-mail" /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><Icon name="i-clock" /><span>Lunes a viernes, {MEETING.hours}<small>Atención 100 % online</small></span></li>
            </ul>
            <button type="button" className="footer-book" onClick={onBook}>
              <Icon name="i-calendar" />Agenda una reunión
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DTA Next · Hecho en Chile</p>
          <div className="footer-legal">
            <button type="button" onClick={() => onOpenLegal('privacy')}>Política de privacidad</button>
            <button type="button" onClick={() => onOpenLegal('legal')}>Aviso legal</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
