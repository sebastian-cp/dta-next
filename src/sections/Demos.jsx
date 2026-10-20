import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { PanelModal, PanelPreview } from '../demos/RequestsPanel.jsx'
import { AutomationPreview, AutomationModal } from '../demos/AutomationFlow.jsx'
import { DocsPreview, DocsModal } from '../demos/DocsDemo.jsx'
import { ImagePreview, ImageModal } from '../demos/ImageDemo.jsx'
import { IMAGE_DEMOS, DEMO_INFO } from '../data/content.js'

function DemoCard({ id, title, label, caption, onOpen, badge = 'Demo', children }) {
  const info = DEMO_INFO[id]
  return (
    <article>
      <div className="window demo-win" role="img" aria-label={label}>
        <span className="window__badge">{badge}</span>
        <div className="demo-win__head">
          <strong><img src="/brand/dta-next-symbol.webp" alt="" width="22" height="18" />{title}</strong>
        </div>
        {children}
      </div>
      <div className="demo__caption">
        <p className="demo__lead">{caption}</p>
        <dl className="demo__info">
          <div><dt>Problema</dt><dd>{info.problema}</dd></div>
          <div><dt>Resultado esperado</dt><dd>{info.beneficio}</dd></div>
        </dl>
        <button className="link" type="button" onClick={onOpen}>
          Ver demo <Icon name="i-arrow" size="sm" /><span className="sr-only">: {title}</span>
        </button>
      </div>
    </article>
  )
}

export default function Demos({ onQuote }) {
  const [open, setOpen] = useState(null) // 'panel' | 'automation' | 'docs' | 'web' | null
  const close = () => setOpen(null)
  const quote = (s) => { close(); onQuote(s) }

  return (
    <section className="section--dark on-dark" id="demos" aria-labelledby="demos-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Demos</p>
          <h2 id="demos-title">Así puede verse tu próxima solución.</h2>
          <p className="lead">Prototipos interactivos de soluciones que podemos desarrollar, con datos ficticios y sin conexiones externas. Cada uno muestra un problema real de operación y cómo lo abordaríamos.</p>
        </div>
        <div className="demos">
          <DemoCard
            id="panel"
            title="Panel de solicitudes"
            label="Vista previa de un panel de solicitudes con estados: por revisar, asignada, agendada y cerrada"
            caption="Filtra, revisa y aprueba respuestas en un solo lugar."
            onOpen={() => setOpen('panel')}
          >
            <PanelPreview />
          </DemoCard>
          <DemoCard
            id="automation"
            title="Automatización paso a paso"
            label="Vista previa de un flujo automatizado: correo recibido, clasificar, extraer datos, validar y registrar"
            caption="Del correo entrante al registro, con una persona cuando hace falta."
            onOpen={() => setOpen('automation')}
          >
            <AutomationPreview />
          </DemoCard>
          <DemoCard
            id="docs"
            title="Asistente documental"
            label="Vista previa de un asistente documental: cargar, procesar, revisar y exportar"
            caption="Información organizada, con revisión humana."
            onOpen={() => setOpen('docs')}
          >
            <DocsPreview />
          </DemoCard>
          <DemoCard
            id="web"
            title="Sitio web de ejemplo"
            badge="Vista previa"
            label={IMAGE_DEMOS.web.alt}
            caption="Una presencia digital cuidada, de la portada al contacto."
            onOpen={() => setOpen('web')}
          >
            <ImagePreview demo={IMAGE_DEMOS.web} />
          </DemoCard>
        </div>
      </div>

      <PanelModal open={open === 'panel'} onClose={close} onQuote={quote} />
      <AutomationModal open={open === 'automation'} onClose={close} onQuote={quote} />
      <DocsModal open={open === 'docs'} onClose={close} onQuote={quote} />
      <ImageModal demo={open === 'web' ? IMAGE_DEMOS.web : null} onClose={close} onQuote={quote} />
    </section>
  )
}
