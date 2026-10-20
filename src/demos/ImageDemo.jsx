import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import DemoBrief from '../components/DemoBrief.jsx'
import Modal, { ModalActions } from '../components/Modal.jsx'

/** Vista previa recortada de un mock en imagen (tarjeta de la sección Demos). */
export function ImagePreview({ demo }) {
  return (
    <div className="shot">
      <img src={demo.src} width={demo.width} height={demo.height} alt={demo.alt} loading="lazy" />
    </div>
  )
}

/** Modal con la imagen completa; en pantallas angostas se desplaza para conservar legibilidad. */
export function ImageModal({ demo, onClose, onQuote }) {
  return (
    <Modal open={!!demo} onClose={onClose} titleId="di-title" wide>
      {demo && (
        <>
          <h2 id="di-title">{demo.title}</h2>
          <div className="demo-banner">
            <Icon name="i-info" />
            <span>{demo.notice}</span>
          </div>
          <DemoBrief id="web" />
          <p className="shot-hint">Desliza para ver la imagen completa →</p>
          <div className="shot-full" tabIndex={0} role="group" aria-label={`Imagen completa: ${demo.title}. Usa el scroll para recorrerla.`}>
            <img src={demo.src} width={demo.width} height={demo.height} alt={demo.alt} />
          </div>
          <ModalActions onClose={onClose}>
            <Button href="#contacto" onClick={(e) => { e.preventDefault(); onQuote(demo.service) }}>Quiero algo así</Button>
          </ModalActions>
        </>
      )}
    </Modal>
  )
}
