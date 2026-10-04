import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import Button from './Button.jsx'

const WIDTHS = {
  wide: 'min(calc(100% - 32px), 900px)',
  app: 'min(calc(100% - 24px), 1240px)',
}

/**
 * Modal accesible basado en <dialog>: foco atrapado, Escape y clic en el fondo cierran.
 * `size`: 'wide' | 'app'. El contenido solo se monta mientras está abierto, así que su estado se reinicia al cerrar.
 */
export default function Modal({ open, onClose, titleId, size, wide, children }) {
  const ref = useRef(null)
  const width = WIDTHS[size || (wide ? 'wide' : '')]

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      style={width ? { width } : undefined}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
    >
      {open && (
        <div className={`dlg${size === 'app' ? ' dlg--app' : ''}`}>
          <button className="dlg__close" type="button" aria-label="Cerrar" onClick={onClose}>
            <Icon name="i-x" />
          </button>
          {children}
        </div>
      )}
    </dialog>
  )
}

export function ModalActions({ onClose, children }) {
  return (
    <div className="actions">
      {children}
      <Button variant="secondary" onClick={onClose}>Cerrar</Button>
    </div>
  )
}
