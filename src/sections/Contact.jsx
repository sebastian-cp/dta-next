import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import FormField from '../components/FormField.jsx'
import { SERVICE_OPTIONS } from '../data/content.js'

const RULES = {
  nombre: (v) => (v.trim().length < 2 ? 'Ingresa tu nombre.' : ''),
  correo: (v) => {
    if (!v.trim()) return 'Ingresa tu correo.'
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Revisa el formato del correo, por ejemplo nombre@empresa.cl.'
  },
  servicio: (v) => (!v ? 'Selecciona un servicio de interés.' : ''),
  mensaje: (v) => (v.trim().length < 10 ? 'Cuéntanos un poco más sobre tu proyecto (al menos 10 caracteres).' : ''),
}

export default function Contact({ service, onServiceChange, onOpenLegal }) {
  const [values, setValues] = useState({ nombre: '', correo: '', empresa: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [website, setWebsite] = useState('') // campo trampa anti-bots

  const get = (name) => (name === 'servicio' ? service : values[name])
  const validate = (name) => {
    const msg = RULES[name](get(name))
    setErrors((e) => ({ ...e, [name]: msg }))
    return !msg
  }
  const set = (name) => (e) => {
    const v = e.target.value
    if (name === 'servicio') onServiceChange(v)
    else setValues((s) => ({ ...s, [name]: v }))
    if (status !== 'sending') setStatus('idle')
    if (errors[name]) setErrors((er) => ({ ...er, [name]: RULES[name](v) }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    const bad = Object.keys(RULES).filter((n) => {
      const msg = RULES[n](get(n))
      setErrors((er) => ({ ...er, [n]: msg }))
      return msg
    })
    if (bad.length) { document.getElementById(`f-${bad[0]}`)?.focus(); return }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, servicio: service, website }),
      })
      if (!res.ok) throw new Error(String(res.status))
      // Éxito solo tras la confirmación del servidor.
      setValues({ nombre: '', correo: '', empresa: '', mensaje: '' })
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
    onBlur: () => RULES[name] && validate(name),
    error: errors[name],
  })

  return (
    <section className="contact" id="contacto" aria-labelledby="contacto-title">
      <div className="container contact__inner">
        <div>
          <p className="eyebrow">Hablemos</p>
          <h2 id="contacto-title">Conversemos sobre lo que tu empresa necesita.</h2>
          <p className="lead">Cuéntanos el problema o la idea que quieres desarrollar.</p>
        </div>

        <div className="form-card">
          <form onSubmit={onSubmit} noValidate>
            <div className="form-grid">
              <FormField {...field('nombre')} label="Nombre" type="text" autoComplete="name" required placeholder="Tu nombre" />
              <FormField {...field('correo')} label="Correo" type="email" autoComplete="email" required placeholder="tu@empresa.cl" />
              <FormField id="f-empresa" label="Empresa" optional type="text" autoComplete="organization" placeholder="Nombre de tu empresa"
                value={values.empresa} onChange={set('empresa')} />
              <FormField {...field('servicio')} as="select" label="Servicio de interés" required>
                <option value="">Selecciona una opción</option>
                {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </FormField>
              <FormField {...field('mensaje')} as="textarea" label="Mensaje" required span2 placeholder="Cuéntanos brevemente tu proyecto…" />
            </div>
            {/* Campo trampa: invisible para personas, los bots suelen rellenarlo. */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-website">No completar este campo</label>
              <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <Button type="submit" block style={{ marginTop: 24 }} disabled={status === 'sending'} aria-disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar consulta'}
            </Button>
            <p className="form-legal">
              Al enviar este formulario aceptas que usemos tus datos para responder tu consulta. Más información en la{' '}
              <button type="button" className="inline-link" onClick={() => onOpenLegal('privacy')}>Política de privacidad</button>.
            </p>
            <div role="status" aria-live="polite">
              {status === 'success' && (
                <div className="form-status form-status--ok">
                  <Icon name="i-check-circle" />
                  <span>Recibimos tu consulta. Te contactaremos al correo que indicaste.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="form-status form-status--error">
                  <Icon name="i-alert" />
                  <span>No pudimos enviar tu consulta. Intenta nuevamente.</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
