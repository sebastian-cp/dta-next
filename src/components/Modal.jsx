import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import Button from './Button.jsx'

/** Modal accesible basado en <dialog>: foco atrapado, Escape y clic en el fondo cierran. */
export default function Modal({ open, onClose, titleId, wide, children }) {
  const ref = useRef(null)

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
      style={wide ? { width: 'min(calc(100% - 32px), 900px)' } : undefined}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
    >
      {open && (
        <div className="dlg">
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
