import { useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import Modal, { ModalActions } from '../components/Modal.jsx'
import { BOARD_COLUMNS, BOARD_DOTS, BOARD_INITIAL } from '../data/content.js'

/** Maqueta estática del tablero (tarjeta de la sección Demos). */
export function BoardPreview() {
  const cols = BOARD_COLUMNS.map((_, i) => BOARD_INITIAL.filter((c) => c.col === i))
  return (
    <div className="kanban" aria-hidden="true">
      {cols.map((cards, i) => (
        <div className="kanban__col" key={i}>
          <h4>{BOARD_COLUMNS[i]} <span>{cards.length}</span></h4>
          {cards.map((c) => (
            <div className="kcard" key={c.id} style={{ '--dot': BOARD_DOTS[i] }}>
              <strong>{c.title}</strong><span>{c.company}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function BoardModal({ open, onClose, onQuote }) {
  const [cards, setCards] = useState(BOARD_INITIAL)
  const [message, setMessage] = useState('')
  const root = useRef(null)

  const move = (id) => {
    const card = cards.find((c) => c.id === id)
    setMessage(`${card.title} movida a ${BOARD_COLUMNS[card.col + 1]}.`)
    setCards((cs) => cs.map((c) => (c.id === id ? { ...c, col: c.col + 1 } : c)))
    // Mantiene el foco en el botón si la tarjeta aún puede avanzar.
    requestAnimationFrame(() => root.current?.querySelector(`[data-move="${id}"]`)?.focus())
  }

  return (
    <Modal open={open} onClose={onClose} titleId="db-title" wide>
      <h2 id="db-title">Gestión de solicitudes</h2>
      <div className="demo-banner">
        <Icon name="i-info" />
        <span>Demostración con datos ficticios. No es una aplicación real conectada a ningún sistema. Usa los botones para mover solicitudes entre columnas.</span>
      </div>
      <div className="board-live" ref={root}>
        {BOARD_COLUMNS.map((name, ci) => {
          const list = cards.filter((c) => c.col === ci)
          return (
            <section className="kanban__col" aria-label={name} key={name}>
              <h4>{name} <span>{list.length}</span></h4>
              {list.map((c) => (
                <div className="kcard" key={c.id} style={{ '--dot': BOARD_DOTS[ci] }}>
                  <strong>{c.title}</strong><span>{c.company} (ficticia)</span>
                  {ci < 2
                    ? <button type="button" data-move={c.id} onClick={() => move(c.id)}>Mover a {BOARD_COLUMNS[ci + 1]} →</button>
                    : <em style={{ fontSize: '.75rem', color: '#147D4E' }}>✓ Completada</em>}
                </div>
              ))}
            </section>
          )
        })}
      </div>
      <p className="sr-only" role="status">{message}</p>
      <ModalActions onClose={onClose}>
        <Button href="#contacto" onClick={(e) => { e.preventDefault(); onQuote('app') }}>Quiero algo así</Button>
      </ModalActions>
    </Modal>
  )
}
