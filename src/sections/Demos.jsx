import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { MockToolbar } from '../components/ProductWindow.jsx'
import { BoardPreview, BoardModal } from '../demos/BoardDemo.jsx'
import { DocsPreview, DocsModal } from '../demos/DocsDemo.jsx'

function DemoCard({ title, label, caption, onOpen, children }) {
  return (
    <article>
      <div className="window demo-win" role="img" aria-label={label}>
        <span className="window__badge">Demo</span>
        <div className="demo-win__head">
          <strong><img src="/brand/dta-next-symbol.png" alt="" width="22" height="18" />{title}</strong>
        </div>
        {children}
      </div>
      <div className="demo__caption">
        <p>{caption}</p>
        <button className="link" type="button" onClick={onOpen}>
          Ver demo <Icon name="i-arrow" size="sm" /><span className="sr-only">: {title}</span>
        </button>
      </div>
    </article>
  )
}

export default function Demos({ onQuote }) {
  const [open, setOpen] = useState(null) // 'board' | 'docs' | null
  const close = () => setOpen(null)

  return (
    <section className="section--dark on-dark" id="demos" aria-labelledby="demos-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Demos</p>
          <h2 id="demos-title">Así puede verse tu próxima solución.</h2>
          <p className="lead">Conceptos ilustrativos de soluciones que podemos desarrollar.</p>
        </div>
        <div className="demos">
          <DemoCard
            title="Gestión de solicitudes"
            label="Vista previa de un tablero de gestión de solicitudes con columnas Nuevas, En proceso y Completadas"
            caption="De un formulario a un flujo ordenado."
            onOpen={() => setOpen('board')}
          >
            <MockToolbar />
            <BoardPreview />
          </DemoCard>
          <DemoCard
            title="Asistente documental"
            label="Vista previa de un asistente documental: cargar, procesar, revisar y exportar"
            caption="Información organizada, con revisión humana."
            onOpen={() => setOpen('docs')}
          >
            <DocsPreview />
          </DemoCard>
        </div>
      </div>

      <BoardModal open={open === 'board'} onClose={close} onQuote={(s) => { close(); onQuote(s) }} />
      <DocsModal open={open === 'docs'} onClose={close} onQuote={(s) => { close(); onQuote(s) }} />
    </section>
  )
}
