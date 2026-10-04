import Icon from '../components/Icon.jsx'
import Modal, { ModalActions } from '../components/Modal.jsx'
import Button from '../components/Button.jsx'
import { SERVICES } from '../data/content.js'

function CheckList({ items }) {
  return (
    <ul className="checks">
      {items.map((t) => <li key={t}><Icon name="i-check" />{t}</li>)}
    </ul>
  )
}

export default function Services({ selected, onSelect, onQuote }) {
  const current = selected ? SERVICES[selected] : null
  const close = () => onSelect(null)
  const seeDemos = (e) => {
    e.preventDefault()
    close()
    requestAnimationFrame(() => document.getElementById('demos')?.scrollIntoView())
  }

  return (
    <section className="section--mist" id="soluciones" aria-labelledby="servicios-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Nuestras soluciones</p>
          <h2 id="servicios-title">Tres formas de impulsar tu negocio.</h2>
        </div>
        <div className="services">
          {Object.entries(SERVICES).map(([key, s]) => (
            <article className="card service" key={key}>
              <Icon name={s.icon} className="icon--lg" />
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <CheckList items={s.features} />
              <button className="link" type="button" onClick={() => onSelect(key)}>
                Explorar solución <Icon name="i-arrow" size="sm" /><span className="sr-only">: {s.title}</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <Modal open={!!current} onClose={close} titleId="ds-title">
        {current && (
          <div className="service-sheet">
            <h2 id="ds-title">{current.title}</h2>
            <p className="lead">{current.lead}</p>
            <h3>Para quién es</h3>
            <p>{current.audience}</p>
            <h3>Ejemplos de lo que podemos construir</h3>
            <CheckList items={current.examples} />
            <h3>Qué recibes</h3>
            <CheckList items={current.deliverables} />
            <h3>Cómo se cotiza</h3>
            <p>{current.pricing}</p>
            <ModalActions onClose={close}>
              <Button href="#contacto" onClick={(e) => { e.preventDefault(); onQuote(selected) }}>Cotizar este servicio</Button>
              <Button variant="secondary" href="#demos" onClick={seeDemos}>Ver demos</Button>
            </ModalActions>
          </div>
        )}
      </Modal>
    </section>
  )
}
