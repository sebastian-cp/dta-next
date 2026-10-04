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

export default function Contact({ service, onServiceChange }) {
  const [values, setValues] = useState({ nombre: '', correo: '', empresa: '', mensaje: '' })
  const [errors, setErrors] = useState({})
  const [validated, setValidated] = useState(false)

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
    setValidated(false)
    if (errors[name]) setErrors((er) => ({ ...er, [name]: RULES[name](v) }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const bad = Object.keys(RULES).filter((n) => {
      const msg = RULES[n](get(n))
      setErrors((er) => ({ ...er, [n]: msg }))
      return msg
    })
    if (bad.length) { document.getElementById(`f-${bad[0]}`)?.focus(); return }
    setValidated(true) // Sin integración real: nunca se muestra un envío exitoso.
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
            <Button type="submit" block style={{ marginTop: 24 }}>Enviar consulta</Button>
            <p className="form-note">
              <strong>Formulario demostrativo:</strong> en este prototipo aún no está conectado a un servicio de envío, por lo que no se transmite ninguna información.
            </p>
            {validated && (
              <div className="form-status" role="status">
                <Icon name="i-info" />
                <span>Los datos son válidos, pero <strong>tu consulta no fue enviada</strong>: este formulario es una demostración sin conexión a un servicio real.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
