import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import FormField from '../components/FormField.jsx'
import { SERVICE_OPTIONS, CONTACT, MEETING } from '../data/content.js'
import { bookableDays, slotsFor, formatDay } from '../data/schedule.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const BASE_RULES = {
  nombre: (v) => (v.trim().length < 2 ? 'Ingresa tu nombre.' : ''),
  correo: (v) => {
    if (!v.trim()) return 'Ingresa tu correo.'
    return EMAIL_RE.test(v.trim()) ? '' : 'Revisa el formato del correo, por ejemplo nombre@empresa.cl.'
  },
  servicio: (v) => (!v ? 'Selecciona un servicio de interés.' : ''),
}
const RULES = {
  mensaje: {
    ...BASE_RULES,
    mensaje: (v) => (v.trim().length < 10 ? 'Cuéntanos un poco más sobre tu proyecto (al menos 10 caracteres).' : ''),
  },
  reunion: {
    ...BASE_RULES,
    fecha: (v) => (!v ? 'Elige un día.' : ''),
    hora: (v) => (!v ? 'Elige un horario.' : ''),
  },
}

const EMPTY = { nombre: '', correo: '', empresa: '', mensaje: '', fecha: '', hora: '' }

const NEXT_STEPS = [
  'Revisamos tu consulta y te respondemos por correo' + (CONTACT.responseTime ? ` ${CONTACT.responseTime}.` : '.'),
  `Si hace falta, te proponemos una reunión online de ${MEETING.minutes} minutos, sin costo.`,
  'Con la información necesaria, te enviamos una propuesta o un diagnóstico por escrito.',
]

function Channels() {
  const wa = CONTACT.whatsapp && `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappText)}`
  return (
    <ul className="channels" aria-label="Otros canales de contacto">
      {wa && (
        <li>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            <Icon name="i-chat" /><span><strong>WhatsApp</strong><small>Escríbenos directamente</small></span>
          </a>
        </li>
      )}
      <li>
        <a href={`mailto:${CONTACT.email}`}>
          <Icon name="i-mail" /><span><strong>Correo</strong><small>{CONTACT.email}</small></span>
        </a>
      </li>
      <li>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
          <Icon name="i-instagram" /><span><strong>Instagram</strong><small>@dta_next</small></span>
        </a>
      </li>
    </ul>
  )
}

function SlotPicker({ fecha, hora, onPick, errors }) {
  const days = useMemo(() => bookableDays(), [])
  const slots = fecha ? slotsFor(fecha) : []
  return (
    <div className="slot-picker span-2">
      <fieldset aria-describedby={errors.fecha ? 'f-fecha-err' : undefined}>
        <legend>Día <span className="opt">({MEETING.days})</span></legend>
        <div className="slot-grid slot-grid--days" id="f-fecha" tabIndex={-1}>
          {days.map((d) => (
            <button key={d} type="button" aria-pressed={d === fecha} onClick={() => onPick({ fecha: d, hora: '' })}>
              <span>{formatDay(d, { weekday: 'short' })}</span>
              <strong>{formatDay(d, { day: 'numeric', month: 'short' })}</strong>
            </button>
          ))}
        </div>
        {errors.fecha && <p className="err" id="f-fecha-err"><Icon name="i-alert" /><span>{errors.fecha}</span></p>}
      </fieldset>
      <fieldset aria-describedby={errors.hora ? 'f-hora-err' : undefined} disabled={!fecha}>
        <legend>Horario <span className="opt">({MEETING.timezone})</span></legend>
        {fecha ? (
          <div className="slot-grid" id="f-hora" tabIndex={-1}>
            {slots.map((s) => (
              <button key={s} type="button" aria-pressed={s === hora} onClick={() => onPick({ hora: s })}>{s}</button>
            ))}
          </div>
        ) : (
          <p className="slot-hint" id="f-hora" tabIndex={-1}>Primero elige un día.</p>
        )}
        {errors.hora && <p className="err" id="f-hora-err"><Icon name="i-alert" /><span>{errors.hora}</span></p>}
      </fieldset>
    </div>
  )
}

export default function Contact({ service, onServiceChange, onOpenLegal, mode, onModeChange }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [website, setWebsite] = useState('') // campo trampa anti-bots
  const rules = RULES[mode]
  const booking = mode === 'reunion'

  const get = (name) => (name === 'servicio' ? service : values[name])
  const validate = (name) => {
    const msg = rules[name] ? rules[name](get(name)) : ''
    setErrors((e) => ({ ...e, [name]: msg }))
    return !msg
  }
  const set = (name) => (e) => {
    const v = e.target.value
    if (name === 'servicio') onServiceChange(v)
    else setValues((s) => ({ ...s, [name]: v }))
    if (status !== 'sending') setStatus('idle')
    if (errors[name] && rules[name]) setErrors((er) => ({ ...er, [name]: rules[name](v) }))
  }
  const pick = (patch) => {
    setValues((s) => ({ ...s, ...patch }))
    setErrors((er) => ({ ...er, ...Object.fromEntries(Object.keys(patch).filter((k) => patch[k]).map((k) => [k, ''])) }))
    if (status !== 'sending') setStatus('idle')
  }
  const switchMode = (m) => {
    if (m === mode) return
    setErrors({})
    setStatus('idle')
    onModeChange(m)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const bad = Object.keys(rules).filter((n) => {
      const msg = rules[n](get(n))
      setErrors((er) => ({ ...er, [n]: msg }))
      return msg
    })
    if (bad.length) { document.getElementById(`f-${bad[0]}`)?.focus(); return }
    setStatus('sending')
    const payload = booking
      ? { tipo: 'reunion', nombre: values.nombre, correo: values.correo, empresa: values.empresa, mensaje: values.mensaje, fecha: values.fecha, hora: values.hora }
      : { tipo: 'mensaje', nombre: values.nombre, correo: values.correo, empresa: values.empresa, mensaje: values.mensaje }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, servicio: service, website }),
      })
      if (!res.ok) throw new Error(String(res.status))
      // Éxito solo tras la confirmación del servidor.
      setValues(EMPTY)
      onServiceChange('')
      setErrors({})
      setStatus('success')
    } catch {
      setStatus('error') // Se conservan los datos del usuario.
    }
  }

  const field = (name) => ({
    id: `f-${name}`,
    value: get(name),
    onChange: set(name),
    onBlur: () => rules[name] && validate(name),
    error: errors[name],
  })

  return (
    <section className="contact" id="contacto" aria-labelledby="contacto-title">
      <div className="container contact__inner">
        <div>
          <p className="eyebrow">Hablemos</p>
          <h2 id="contacto-title">Conversemos sobre lo que tu empresa necesita.</h2>
          <p className="lead">Escríbenos o agenda una reunión online de {MEETING.minutes} minutos, sin costo. Atendemos de {MEETING.days}, de {MEETING.hours}, solo de forma remota.</p>
          <h3 className="contact__sub">Qué pasa después</h3>
          <ol className="next-steps">
            {NEXT_STEPS.map((t) => <li key={t}>{t}</li>)}
          </ol>
          <Channels />
        </div>

        <div className="form-card" id="agendar">
          <div className="seg seg--tabs" role="group" aria-label="Cómo quieres contactarnos">
            <button type="button" aria-pressed={!booking} onClick={() => switchMode('mensaje')}>Enviar consulta</button>
            <button type="button" aria-pressed={booking} onClick={() => switchMode('reunion')}>Agendar reunión</button>
          </div>
          <form onSubmit={onSubmit} noValidate>
            <div className="form-grid">
              {booking && (
                <>
                  <p className="form-intro span-2">Elige un horario disponible. Te enviaremos la confirmación con el enlace de la videollamada al correo que indiques.</p>
                  <SlotPicker fecha={values.fecha} hora={values.hora} onPick={pick} errors={errors} />
                </>
              )}
              <FormField {...field('nombre')} label="Nombre" type="text" autoComplete="name" required placeholder="Tu nombre" />
              <FormField {...field('correo')} label="Correo" type="email" autoComplete="email" required placeholder="tu@empresa.cl" />
              <FormField id="f-empresa" label="Empresa" optional type="text" autoComplete="organization" placeholder="Nombre de tu empresa"
                value={values.empresa} onChange={set('empresa')} />
              <FormField {...field('servicio')} as="select" label={booking ? 'Tema de la reunión' : 'Servicio de interés'} required>
                <option value="">Selecciona una opción</option>
                {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </FormField>
              <FormField {...field('mensaje')} as="textarea" label={booking ? 'Cuéntanos brevemente tu caso' : 'Mensaje'} optional={booking} required={!booking} span2
                placeholder={booking ? 'Así preparamos mejor la reunión…' : 'Cuéntanos brevemente tu proyecto…'} />
            </div>
            {/* Campo trampa: invisible para personas, los bots suelen rellenarlo. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-website">No completar este campo</label>
              <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <Button type="submit" block style={{ marginTop: 24 }} disabled={status === 'sending'} aria-disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : booking ? 'Solicitar reunión' : 'Enviar consulta'}
            </Button>
            <p className="form-legal">
              Al enviar este formulario aceptas que usemos tus datos para responder tu consulta. Más información en la{' '}
              <button type="button" className="inline-link" onClick={() => onOpenLegal('privacy')}>Política de privacidad</button>.
            </p>
            <div role="status" aria-live="polite">
              {status === 'success' && (
                <div className="form-status form-status--ok">
                  <Icon name="i-check-circle" />
                  <span>{booking
                    ? 'Recibimos tu solicitud de reunión. Te enviaremos la confirmación y el enlace de la videollamada al correo que indicaste.'
                    : 'Recibimos tu consulta. Te contactaremos al correo que indicaste.'}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="form-status form-status--error">
                  <Icon name="i-alert" />
                  <span>{booking
                    ? 'No pudimos registrar tu solicitud. Puede que el horario ya no esté disponible; elige otro o intenta nuevamente.'
                    : 'No pudimos enviar tu consulta. Intenta nuevamente.'}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
