import { useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import Button from './Button.jsx'
import Modal from './Modal.jsx'
import FormField from './FormField.jsx'
import { SERVICE_OPTIONS, MEETING } from '../data/content.js'
import { bookableDays, slotsFor, slotEnd, formatDay } from '../data/schedule.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const RULES = {
  nombre: (v) => (v.trim().length < 2 ? 'Ingresa tu nombre.' : ''),
  correo: (v) => {
    if (!v.trim()) return 'Ingresa tu correo.'
    return EMAIL_RE.test(v.trim()) ? '' : 'Revisa el formato del correo, por ejemplo nombre@empresa.cl.'
  },
  servicio: (v) => (!v ? 'Selecciona un tema.' : ''),
}
const WEEKDAYS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
const STEPS = ['Día y hora', 'Tus datos', 'Confirmación']
const EMPTY = { nombre: '', correo: '', empresa: '', servicio: '', mensaje: '' }

const ym = (date) => date.slice(0, 7)
const pad = (n) => String(n).padStart(2, '0')

/** Semanas (lunes a domingo) de un mes "YYYY-MM"; los días fuera del mes son null. */
function monthWeeks(month) {
  const [y, m] = month.split('-').map(Number)
  const first = new Date(Date.UTC(y, m - 1, 1))
  const total = new Date(Date.UTC(y, m, 0)).getUTCDate()
  const offset = (first.getUTCDay() + 6) % 7
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => `${month}-${pad(i + 1)}`)]
  while (cells.length % 7) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7))
}

function Calendar({ days, value, onChange }) {
  const months = useMemo(() => [...new Set(days.map(ym))], [days])
  const [month, setMonth] = useState(value ? ym(value) : months[0])
  const idx = months.indexOf(month)
  const available = new Set(days)
  const monthName = new Intl.DateTimeFormat('es-CL', { month: 'long', timeZone: 'UTC' }).format(new Date(`${month}-01T12:00:00Z`))
  const title = `${monthName} ${month.slice(0, 4)}`

  return (
    <div className="cal">
      <div className="cal__head">
        <button type="button" className="cal__nav" onClick={() => setMonth(months[idx - 1])} disabled={idx <= 0} aria-label="Mes anterior">
          <Icon name="i-arrow" className="flip" />
        </button>
        <p className="cal__title" aria-live="polite">{title}</p>
        <button type="button" className="cal__nav" onClick={() => setMonth(months[idx + 1])} disabled={idx >= months.length - 1} aria-label="Mes siguiente">
          <Icon name="i-arrow" />
        </button>
      </div>
      <table className="cal__grid" role="grid" aria-label={`Días disponibles de ${title}`}>
        <thead><tr>{WEEKDAYS.map((d) => <th key={d} scope="col">{d}</th>)}</tr></thead>
        <tbody>
          {monthWeeks(month).map((week, i) => (
            <tr key={i}>
              {week.map((d, j) => (
                <td key={j}>
                  {d && (
                    <button
                      type="button"
                      disabled={!available.has(d)}
                      aria-pressed={d === value}
                      aria-label={formatDay(d)}
                      onClick={() => onChange(d)}
                    >
                      {Number(d.slice(8))}
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Slots({ date, value, onChange }) {
  if (!date) {
    return (
      <div className="slots slots--empty">
        <Icon name="i-calendar" />
        <p>Elige un día en el calendario para ver los horarios disponibles.</p>
      </div>
    )
  }
  const all = slotsFor(date)
  const groups = [
    ['Mañana', all.filter((s) => s < '12:00')],
    ['Tarde', all.filter((s) => s >= '12:00')],
  ].filter(([, list]) => list.length)
  return (
    <div className="slots">
      <p className="slots__day">{formatDay(date)}</p>
      {groups.map(([label, list]) => (
        <fieldset key={label}>
          <legend>{label}</legend>
          <div className="slots__grid">
            {list.map((s) => (
              <button key={s} type="button" aria-pressed={s === value} onClick={() => onChange(s)}>{s}</button>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  )
}

function Summary({ date, slot, onEdit }) {
  return (
    <div className="booking-summary">
      <Icon name="i-calendar" />
      <div>
        <strong>{formatDay(date)}</strong>
        <span>{slot} – {slotEnd(slot)} · {MEETING.timezone}</span>
      </div>
      {onEdit && <button type="button" className="inline-link" onClick={onEdit}>Cambiar</button>}
    </div>
  )
}

function Booking({ onClose, onOpenLegal }) {
  const days = useMemo(() => bookableDays(), [])
  const [step, setStep] = useState(0)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [website, setWebsite] = useState('') // campo trampa anti-bots

  const pickDate = (d) => { setDate(d); setSlot('') }
  const set = (name) => (e) => {
    const v = e.target.value
    setValues((s) => ({ ...s, [name]: v }))
    if (errors[name] && RULES[name]) setErrors((er) => ({ ...er, [name]: RULES[name](v) }))
  }
  const field = (name) => ({
    id: `b-${name}`,
    value: values[name],
    onChange: set(name),
    onBlur: () => RULES[name] && setErrors((er) => ({ ...er, [name]: RULES[name](values[name]) })),
    error: errors[name],
  })

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const found = Object.fromEntries(Object.keys(RULES).map((n) => [n, RULES[n](values[n])]))
    setErrors(found)
    const bad = Object.keys(found).find((n) => found[n])
    if (bad) { document.getElementById(`b-${bad}`)?.focus(); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'reunion', ...values, fecha: date, hora: slot, website }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('idle')
      setStep(2)
    } catch {
      setStatus('error') // Se conservan los datos del usuario.
    }
  }

  return (
    <div className="booking">
      <header className="booking__head">
        <h2 id="bk-title">Agenda una reunión</h2>
        <ul className="booking__meta">
          <li><Icon name="i-clock" />{MEETING.minutes} minutos</li>
          <li><Icon name="i-monitor" />Videollamada</li>
          <li><Icon name="i-check-circle" />Sin costo</li>
        </ul>
        <ol className="booking__steps" aria-label="Pasos">
          {STEPS.map((s, i) => (
            <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
              <b>{i < step ? <Icon name="i-check" /> : i + 1}</b>{s}
            </li>
          ))}
        </ol>
      </header>

      {step === 0 && (
        <>
          <div className="booking__pick">
            <Calendar days={days} value={date} onChange={pickDate} />
            <Slots date={date} value={slot} onChange={setSlot} />
          </div>
          <p className="booking__note">Atendemos de {MEETING.days}, de {MEETING.hours} ({MEETING.timezone}), solo de forma remota.</p>
          <div className="booking__foot">
            {date && slot ? <Summary date={date} slot={slot} /> : <span className="booking__hint">Elige un día y un horario.</span>}
            <Button onClick={() => setStep(1)} disabled={!date || !slot}>Continuar <Icon name="i-arrow" size="sm" /></Button>
          </div>
        </>
      )}

      {step === 1 && (
        <form onSubmit={submit} noValidate>
          <Summary date={date} slot={slot} onEdit={() => setStep(0)} />
          <div className="form-grid booking__form">
            <FormField {...field('nombre')} label="Nombre" type="text" autoComplete="name" required placeholder="Tu nombre" />
            <FormField {...field('correo')} label="Correo" type="email" autoComplete="email" required placeholder="tu@empresa.cl" />
            <FormField {...field('empresa')} label="Empresa" optional type="text" autoComplete="organization" placeholder="Nombre de tu empresa" />
            <FormField {...field('servicio')} as="select" label="Tema de la reunión" required>
              <option value="">Selecciona una opción</option>
              {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </FormField>
            <FormField {...field('mensaje')} as="textarea" label="¿Qué te gustaría conversar?" optional span2 placeholder="Así preparamos mejor la reunión…" />
          </div>
          <div className="hp" aria-hidden="true">
            <label htmlFor="b-website">No completar este campo</label>
            <input id="b-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <p className="form-legal">
            Usaremos tus datos solo para coordinar la reunión. Más información en la{' '}
            <button type="button" className="inline-link" onClick={() => onOpenLegal('privacy')}>Política de privacidad</button>.
          </p>
          <div role="status" aria-live="polite">
            {status === 'error' && (
              <div className="form-status form-status--error">
                <Icon name="i-alert" />
                <span>No pudimos registrar tu solicitud. Puede que el horario ya no esté disponible; elige otro o intenta nuevamente.</span>
              </div>
            )}
          </div>
          <div className="booking__foot">
            <Button variant="secondary" onClick={() => setStep(0)}>Volver</Button>
            <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Solicitar reunión'}</Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="booking__done" role="status">
          <span className="booking__ok"><Icon name="i-check" /></span>
          <h3>¡Solicitud enviada!</h3>
          <p>Te enviaremos la confirmación y el enlace de la videollamada a <strong>{values.correo}</strong>.</p>
          <Summary date={date} slot={slot} />
          <Button onClick={onClose}>Listo</Button>
        </div>
      )}
    </div>
  )
}

export default function BookingModal({ open, onClose, onOpenLegal }) {
  return (
    <Modal open={open} onClose={onClose} titleId="bk-title" wide>
      {open && <Booking onClose={onClose} onOpenLegal={onOpenLegal} />}
    </Modal>
  )
}
