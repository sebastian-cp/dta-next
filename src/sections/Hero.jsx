import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import { MockToolbar, Chip } from '../components/ProductWindow.jsx'

const POINTS = ['Reunión inicial sin costo', 'Alcance por escrito', 'Documentación incluida']

const REQUESTS = [
  { icon: 'i-file', ok: false, title: 'Solicitud recibida', sub: 'Formulario web', tone: 'ok', label: 'Completado' },
  { icon: 'i-check', ok: true, title: 'Documento validado', sub: 'Revisión automática', tone: 'prog', label: 'En proceso' },
  { icon: 'i-users', ok: false, title: 'Listo para revisión', sub: 'Asignado al equipo', tone: 'wait', label: 'Pendiente' },
]

export default function Hero({ onBook }) {
  return (
    <section className="hero on-dark" id="inicio" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div>
          <p className="eyebrow">Consultoría tecnológica · Chile</p>
          <h1 id="hero-title">
            Automatizamos tus procesos. <span className="accent">Desarrollamos tu próximo software.</span>
          </h1>
          <p className="lead">Sitios web, aplicaciones a medida e inteligencia artificial conectadas a las necesidades de tu empresa.</p>
          <div className="hero__actions">
            <Button onClick={onBook}><Icon name="i-calendar" />Agenda una reunión</Button>
            <Button href="#demos" variant="secondary-dark">Explorar demos</Button>
          </div>
          <ul className="hero__points" aria-label="Lo que incluye cada proyecto">
            {POINTS.map((p) => (
              <li key={p}><Icon name="i-check-circle" />{p}</li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
        <figure className="window" style={{ margin: 0 }} aria-label="Interfaz ilustrativa de un centro de operaciones">
          <span className="window__badge">Demo ilustrativa</span>
          <div className="ops">
            <div className="ops__rail" aria-hidden="true">
              <img src="/brand/dta-next-symbol.png" alt="" width="28" height="23" />
              <Icon name="i-home" className="on" />
              <Icon name="i-file" />
              <Icon name="i-check-circle" />
              <Icon name="i-users" />
            </div>
            <div className="ops__main">
              <p className="ops__title">Centro de operaciones</p>
              <MockToolbar />
              <ul>
                {REQUESTS.map((r) => (
                  <li className="req" key={r.title}>
                    <span className={`req__ico${r.ok ? ' req__ico--ok' : ''}`} aria-hidden="true"><Icon name={r.icon} /></span>
                    <span><strong>{r.title}</strong><small>{r.sub}</small></span>
                    <Chip tone={r.tone}>{r.label}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </figure>
        <div className="float-card" aria-hidden="true">
          <span className="req__ico req__ico--ok"><Icon name="i-handshake" /></span>
          <span>
            <strong>Respuesta lista para aprobar</strong>
            <small>SOL-1048 · Borrador preparado</small>
          </span>
          <Chip tone="wait">Pendiente</Chip>
        </div>
        </div>
      </div>
    </section>
  )
}
