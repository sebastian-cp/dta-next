import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import DemoBrief from '../components/DemoBrief.jsx'
import Modal, { ModalActions } from '../components/Modal.jsx'
import { Chip } from '../components/ProductWindow.jsx'
import { DOC_SAMPLE } from '../data/content.js'

const STEPS = ['Cargar', 'Procesar', 'Revisar', 'Exportar']

/** Maqueta estática del asistente (tarjeta de la sección Demos). */
export function DocsPreview() {
  return (
    <>
      <div className="stepper" aria-hidden="true">
        {STEPS.map((s, i) => (
          <span key={s} style={{ display: 'contents' }}>
            <div className={`step${i === 0 ? ' is-on' : ''}`}><b>{i + 1}</b>{s}</div>
            {i < 3 && <hr />}
          </span>
        ))}
      </div>
      <div className="docs-split" aria-hidden="true">
        <div className="drop">
          <Icon name="i-file" />Arrastra un archivo aquí<br /><b>o selecciona un archivo</b><br />
          <span style={{ fontSize: '.625rem' }}>PDF, DOCX, XLSX (máx. 10 MB)</span>
        </div>
        <div className="extract">
          <h4>Información extraída</h4>
          <dl>
            {Object.entries(DOC_SAMPLE).map(([k, v]) => <FieldRow key={k} k={k} v={v} />)}
            <dt>Estado</dt><dd><Chip tone="ok">Datos validados</Chip></dd>
          </dl>
        </div>
      </div>
    </>
  )
}

function FieldRow({ k, v }) {
  return <><dt>{k}</dt><dd>{v}</dd></>
}

export function DocsModal({ open, onClose, onQuote }) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState(DOC_SAMPLE)
  const panel = useRef(null)

  const reset = () => { setStep(0); setProgress(0); setData(DOC_SAMPLE) }
  useEffect(() => { if (!open) reset() }, [open])

  // Procesamiento simulado: avanza en pasos de 25 %.
  useEffect(() => {
    if (step !== 1) return
    const t = setInterval(() => setProgress((p) => Math.min(p + 25, 100)), 350)
    return () => clearInterval(t)
  }, [step])
  useEffect(() => {
    if (step === 1 && progress >= 100) { const t = setTimeout(() => setStep(2), 300); return () => clearTimeout(t) }
  }, [step, progress])

  // Lleva el foco al primer control de cada paso.
  useEffect(() => { panel.current?.querySelector('button, input')?.focus() }, [step])

  const result = { ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k.toLowerCase(), v])), estado: 'validado por una persona', demostracion: true }

  return (
    <Modal open={open} onClose={onClose} titleId="dd-title">
      <h2 id="dd-title">Asistente documental</h2>
      <div className="demo-banner">
        <Icon name="i-info" />
        <span>Prototipo interactivo con un documento ficticio y sin conexiones externas. No se carga ni procesa ningún archivo tuyo.</span>
      </div>
      <DemoBrief id="docs" />
      <ol className="live-steps" aria-label="Progreso">
        {STEPS.map((s, i) => (
          <li key={s} className={`step${i === step ? ' is-on' : ''}${i < step || step === 3 ? ' is-done' : ''}`}><b>{i + 1}</b>{s}</li>
        ))}
      </ol>

      <div className="panel" ref={panel} aria-live="polite">
        {step === 0 && (
          <div className="drop" style={{ padding: 24 }}>
            <Icon name="i-upload" />
            <p style={{ fontSize: '.9375rem', marginBottom: 12 }}>Esta demo usa un documento de ejemplo ficticio.</p>
            <Button onClick={() => setStep(1)}>Usar documento de ejemplo</Button>
          </div>
        )}
        {step === 1 && (
          <>
            <p style={{ marginBottom: 12 }}><strong>Procesando documento de ejemplo…</strong></p>
            <div className="progress" role="progressbar" aria-label="Progreso de extracción" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <i style={{ width: `${progress}%` }} />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p style={{ marginBottom: 14 }}><strong>Revisa la información extraída.</strong> <span className="muted">Puedes corregir cualquier campo antes de continuar.</span></p>
            {Object.entries(data).map(([k, v], i) => (
              <div className="field" key={k}>
                <label htmlFor={`dv${i}`}>{k}</label>
                <input id={`dv${i}`} value={v} onChange={(e) => setData((d) => ({ ...d, [k]: e.target.value }))} />
              </div>
            ))}
            <Button onClick={() => setStep(3)}>Aprobar y continuar</Button>
          </>
        )}
        {step === 3 && (
          <>
            <p style={{ marginBottom: 12 }}><strong>Listo para exportar.</strong> <span className="muted">Vista previa del resultado (simulada):</span></p>
            <pre>{JSON.stringify(result, null, 2)}</pre>
            <Button variant="secondary" style={{ marginTop: 14 }} onClick={reset}>Reiniciar demo</Button>
          </>
        )}
      </div>

      <ModalActions onClose={onClose}>
        <Button href="#contacto" onClick={(e) => { e.preventDefault(); onQuote('ia') }}>Quiero algo así</Button>
      </ModalActions>
    </Modal>
  )
}
