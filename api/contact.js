// Función serverless de Vercel: recibe el formulario y lo envía por correo con Resend.
// Variables de entorno (se configuran en Vercel, nunca en el repo):
//   RESEND_API_KEY  clave de API de Resend
//   CONTACT_TO      correo que recibe las consultas
//   CONTACT_FROM    remitente (opcional). Por defecto "DTA Next <onboarding@resend.dev>",
//                   que solo permite enviar al correo dueño de la cuenta de Resend.
//   DISCORD_WEBHOOK_URL  webhook del canal de Discord que recibe el aviso (opcional)

import { isBookable, formatDay, TIMEZONE, SLOT_MINUTES } from '../src/data/schedule.js'

const SERVICES = {
  ia: 'Automatización con IA',
  web: 'Sitios web',
  app: 'Aplicaciones a medida',
  orientacion: 'Necesito orientación',
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO) {
    console.error('Faltan variables de entorno RESEND_API_KEY o CONTACT_TO.')
    return res.status(500).json({ error: 'Servicio no configurado.' })
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}

  // Campo trampa para bots: si viene relleno, respondemos "ok" sin enviar nada.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true })

  const nombre = clean(body.nombre, 120)
  const correo = clean(body.correo, 200)
  const empresa = clean(body.empresa, 120)
  const servicio = clean(body.servicio, 40)
  const mensaje = clean(body.mensaje, 5000)
  const reunion = body.tipo === 'reunion'
  const fecha = clean(body.fecha, 10)
  const hora = clean(body.hora, 5)

  const valid =
    nombre.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo) &&
    servicio in SERVICES &&
    (reunion ? isBookable(fecha, hora) : mensaje.length >= 10)
  if (!valid) return res.status(400).json({ error: 'Datos inválidos.' })

  // Las reuniones son solicitudes: el equipo confirma por correo y envía el enlace de la videollamada.
  const cuando = reunion ? `${formatDay(fecha)} a las ${hora} (${SLOT_MINUTES} min, ${TIMEZONE})` : ''

  const html = `
    <h2>${reunion ? 'Nueva solicitud de reunión' : 'Nueva consulta'} desde el sitio de DTA Next</h2>
    ${reunion ? `<p><strong>Horario solicitado:</strong> ${esc(cuando)}</p>` : ''}
    <p><strong>Nombre:</strong> ${esc(nombre)}</p>
    <p><strong>Correo:</strong> ${esc(correo)}</p>
    <p><strong>Empresa:</strong> ${esc(empresa) || '—'}</p>
    <p><strong>Servicio de interés:</strong> ${esc(SERVICES[servicio])}</p>
    <p><strong>Mensaje:</strong></p>
    <p style="white-space:pre-wrap">${esc(mensaje) || '—'}</p>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM || 'DTA Next <onboarding@resend.dev>',
        to: [CONTACT_TO],
        reply_to: correo,
        subject: (reunion
          ? `Solicitud de reunión: ${fecha} ${hora} — ${nombre}`
          : `Consulta web: ${SERVICES[servicio]} — ${nombre}`).replace(/[\r\n]+/g, ' '),
        html,
      }),
    })
    if (!r.ok) {
      console.error('Resend respondió', r.status, await r.text())
      return res.status(502).json({ error: 'No se pudo enviar.' })
    }
    await notifyDiscord({ nombre, correo, empresa, servicio: SERVICES[servicio], mensaje, cuando })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Error al llamar a Resend', err)
    return res.status(502).json({ error: 'No se pudo enviar.' })
  }
}

// Aviso al canal de Discord. Si falla, solo se registra: el correo ya se envió.
async function notifyDiscord({ nombre, correo, empresa, servicio, mensaje, cuando }) {
  const url = process.env.DISCORD_WEBHOOK_URL
  if (!url) return
  const payload = {
    allowed_mentions: { parse: [] },
    embeds: [{
      title: cuando ? `Solicitud de reunión: ${servicio}` : `Nueva consulta: ${servicio}`,
      color: 0x2563eb,
      fields: [
        { name: 'Nombre', value: nombre, inline: true },
        { name: 'Correo', value: correo, inline: true },
        { name: 'Empresa', value: empresa || '—', inline: true },
        ...(cuando ? [{ name: 'Horario solicitado', value: cuando }] : []),
        { name: 'Mensaje', value: mensaje.slice(0, 1000) || '—' },
      ],
      timestamp: new Date().toISOString(),
    }],
  }
  const send = (body) =>
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  try {
    // Los canales tipo foro exigen thread_name: cada consulta se crea como una publicación.
    let r = await send({ ...payload, thread_name: `${nombre} — ${servicio}`.slice(0, 100) })
    // En un canal de texto normal thread_name no se admite: se reintenta sin él.
    if (r.status === 400) r = await send(payload)
    if (!r.ok) console.error('Discord respondió', r.status, await r.text())
  } catch (err) {
    console.error('Error al llamar a Discord', err)
  }
}

function safeParse(s) {
  try { return JSON.parse(s) } catch { return {} }
}
