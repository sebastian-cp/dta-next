import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import Accordion from '../components/Accordion.jsx'
import { FAQ_GROUPS, CONTACT } from '../data/content.js'

export default function Faq({ onBook }) {
  const [active, setActive] = useState(FAQ_GROUPS[0].id)
  const group = FAQ_GROUPS.find((g) => g.id === active)
  const wa = CONTACT.whatsapp && `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappText)}`

  // Flechas izquierda/derecha para moverse entre pestañas.
  const onKey = (e) => {
    const i = FAQ_GROUPS.findIndex((g) => g.id === active)
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    const next = FAQ_GROUPS[(i + d + FAQ_GROUPS.length) % FAQ_GROUPS.length]
    setActive(next.id)
    document.getElementById(`faq-tab-${next.id}`)?.focus()
  }

  return (
    <section className="section--mist" id="preguntas" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-aside">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-title">Antes de comenzar</h2>
          <p className="lead">Lo que suelen preguntarnos sobre costos, alcance, soporte y el manejo de tu código y tus datos.</p>
          <div className="faq-help">
            <h3>¿No encuentras tu respuesta?</h3>
            <p>Escríbenos o agenda una videollamada y lo conversamos.</p>
            <div className="faq-help__actions">
              <Button onClick={onBook}><Icon name="i-calendar" />Agendar</Button>
              {wa && <Button variant="secondary" href={wa} target="_blank" rel="noopener noreferrer"><Icon name="i-chat" />WhatsApp</Button>}
            </div>
          </div>
        </div>

        <div className="faq-main">
          <div className="faq-tabs" role="tablist" aria-label="Temas" onKeyDown={onKey}>
            {FAQ_GROUPS.map((g) => (
              <button
                key={g.id}
                id={`faq-tab-${g.id}`}
                type="button"
                role="tab"
                aria-selected={g.id === active}
                aria-controls="faq-panel"
                tabIndex={g.id === active ? 0 : -1}
                onClick={() => setActive(g.id)}
              >
                <Icon name={g.icon} />{g.label}
              </button>
            ))}
          </div>
          <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${active}`}>
            <Accordion key={active} items={group.items} openFirst />
          </div>
        </div>
      </div>
    </section>
  )
}
