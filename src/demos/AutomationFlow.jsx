import { Fragment, useEffect, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import Modal, { ModalActions } from '../components/Modal.jsx'
import { Chip } from '../components/ProductWindow.jsx'
import { FLOW_STEPS, SCENARIOS } from '../data/automation.js'

const pad = (n) => String(n).padStart(2, '0')

/** Vista previa estática del flujo (tarjeta de la sección Demos). */
export function AutomationPreview() {
  return (
    <div className="flow-preview" aria-hidden="true">
      <ol>
        {FLOW_STEPS.map((s, i) => (
          <li key={s.id} className={i < 3 ? 'is-done' : i === 3 ? 'is-review' : ''}>
            <span className="node"><Icon name={s.icon} /></span>
            <span className="flow-preview__label">{s.title}</span>
          </li>
        ))}
      </ol>
      <div className="flow-preview__log">
        <p><b>09:14:01</b> Correo recibido</p>
        <p><b>09:14:03</b> Clasificado: solicitud de cotización</p>
        <p><b>09:14:06</b> Datos extraídos</p>
        <p><b>09:14:08</b> <Chip tone="wait">Revisión humana</Chip></p>
      </div>
    </div>
  )
}

function Flow({ scenario }) {
  const [done, setDone] = useState(0) // pasos completados (0–5)
  const [waiting, setWaiting] = useState(false) // detenido esperando revisión humana
  const [reviewed, setReviewed] = useState(false)
  const [auto, setAuto] = useState(false)
  const [log, setLog] = useState([])

  const finished = done >= FLOW_STEPS.length
  const push = (text) => setLog((l) => [...l, { t: `09:14:${pad(l.length * 2 + 1)}`, text }])

  const advance = () => {
    if (finished || waiting) return
    const id = FLOW_STEPS[done].id
    if (id === 'recibir') {
      push(`Correo recibido de ${scenario.email.de}.`)
    } else {
      const step = scenario.steps[id]
      if (id === 'validar' && !step.ok && !reviewed) {
        push(step.log)
        setWaiting(true)
        setAuto(false)
        return
      }
      push(id === 'validar' && reviewed ? 'Validación completada con revisión humana.' : step.log)
    }
    setDone(done + 1)
  }

  // Ejecución automática: un paso cada 700 ms hasta terminar o hasta que haga falta una persona.
  useEffect(() => {
    if (!auto || waiting || finished) return undefined
    const t = setTimeout(advance, 700)
    return () => clearTimeout(t)
  })

  const approve = () => {
    setReviewed(true)
    setWaiting(false)
    push('Revisión aprobada por una persona.')
    setDone(done + 1) // la validación queda completa y el flujo puede continuar
  }

  const reset = () => { setDone(0); setWaiting(false); setReviewed(false); setAuto(false); setLog([]) }

  const stepState = (i) => {
    if (i < done) return 'ok'
    if (i === done && waiting) return 'review'
    if (i === done && auto && !finished) return 'run'
    return 'pending'
  }
  const stateLabel = { ok: 'Completado', review: 'Requiere revisión', run: 'En curso', pending: 'Pendiente' }
  const s = scenario.steps

  return (
    <div className="auto">
      <div className="auto__email">
        <p className="auto__label">Correo de ejemplo</p>
        <p><strong>De:</strong> {scenario.email.de}</p>
        <p><strong>Asunto:</strong> {scenario.email.asunto}</p>
        <p className="auto__body">{scenario.email.cuerpo}</p>
      </div>

      <ol className="nodes" aria-label="Pasos del flujo">
        {FLOW_STEPS.map((st, i) => {
          const state = stepState(i)
          return (
            <li key={st.id} className={`nodes__item is-${state}`}>
              <span className="node" aria-hidden="true"><Icon name={state === 'ok' ? 'i-check' : st.icon} /></span>
              <span className="nodes__title">{st.title}</span>
              <span className="nodes__state">{stateLabel[state]}</span>
            </li>
          )
        })}
      </ol>

      <div className="auto__controls">
        <Button onClick={() => { setAuto(true) }} disabled={finished || waiting || auto}>Ejecutar flujo</Button>
        <Button variant="secondary" onClick={advance} disabled={finished || waiting || auto}>Siguiente paso</Button>
        <Button variant="secondary" onClick={reset} disabled={done === 0 && log.length === 0}>Reiniciar</Button>
      </div>

      {waiting && (
        <div className="review" role="alert">
          <Icon name="i-alert" />
          <div>
            <strong>Este caso necesita a una persona.</strong>
            <p>La confianza es baja y faltan datos. Un flujo bien diseñado no adivina: se detiene y pide una decisión.</p>
            <Button onClick={approve}>Aprobar revisión y continuar</Button>
          </div>
        </div>
      )}

      <div className="auto__panels">
        <section aria-labelledby="au-log">
          <h4 id="au-log">Registro de eventos</h4>
          {log.length === 0 ? <p className="muted">Aún no hay eventos. Pulsa “Ejecutar flujo” o “Siguiente paso”.</p> : (
            <ol className="log" aria-live="polite">
              {log.map((l, i) => <li key={i}><time>{l.t}</time> {l.text}</li>)}
            </ol>
          )}
        </section>

        <section aria-labelledby="au-out">
          <h4 id="au-out">Resultado</h4>
          <dl className="out">
            <dt>Clasificación</dt><dd>{done >= 2 ? s.clasificar.out : '—'}</dd>
            {done >= 3 && Object.entries(s.extraer.data).map(([k, v]) => (<Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>))}
            <dt>Validación</dt>
            <dd>{done >= 4 ? <Chip tone="ok">{reviewed ? 'Revisada por una persona' : 'Correcta'}</Chip> : waiting ? <Chip tone="wait">Pendiente de revisión</Chip> : '—'}</dd>
          </dl>
          {finished && <p className="out__final"><Icon name="i-check-circle" /> {s.registrar.result}</p>}
        </section>
      </div>
    </div>
  )
}

function AutomationApp({ onClose, onQuote }) {
  const [id, setId] = useState(SCENARIOS[0].id)
  const scenario = SCENARIOS.find((s) => s.id === id)
  return (
    <>
      <h2 id="da-title">Automatización paso a paso</h2>
      <div className="demo-banner">
        <Icon name="i-info" />
        <span>Simulación con correos de ejemplo ficticios. Los resultados están predefinidos: no se usa inteligencia artificial real ni se procesa información tuya.</span>
      </div>
      <div className="seg seg--wide" role="group" aria-label="Elige un caso de ejemplo">
        {SCENARIOS.map((s) => (
          <button key={s.id} type="button" aria-pressed={s.id === id} onClick={() => setId(s.id)}>{s.label}</button>
        ))}
      </div>
      <Flow key={scenario.id} scenario={scenario} />
      <ModalActions onClose={onClose}>
        <Button href="#contacto" onClick={(e) => { e.preventDefault(); onQuote('ia') }}>Quiero algo así</Button>
      </ModalActions>
    </>
  )
}

export function AutomationModal({ open, onClose, onQuote }) {
  return (
    <Modal open={open} onClose={onClose} titleId="da-title" size="app">
      {open && <AutomationApp onClose={onClose} onQuote={onQuote} />}
    </Modal>
  )
}
