import Modal, { ModalActions } from './Modal.jsx'
import { LEGAL, LEGAL_UPDATED } from '../data/legal.js'

/** Muestra un documento legal (política de privacidad o aviso legal) en un modal accesible. */
export default function LegalModal({ doc, onClose }) {
  const data = doc ? LEGAL[doc] : null
  return (
    <Modal open={!!data} onClose={onClose} titleId="legal-title">
      {data && (
        <div className="legal">
          <h2 id="legal-title">{data.title}</h2>
          <p className="legal__meta">Última actualización: {LEGAL_UPDATED}</p>
          <p className="lead">{data.intro}</p>
          {data.sections.map((s) => (
            <section key={s.title}>
              <h3>{s.title}</h3>
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.items && <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>}
              {s.after && <p>{s.after}</p>}
            </section>
          ))}
          <ModalActions onClose={onClose} />
        </div>
      )}
    </Modal>
  )
}
