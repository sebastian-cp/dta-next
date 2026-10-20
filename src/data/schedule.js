// Disponibilidad para reuniones online: lunes a viernes, de 08:00 a 18:00, hora de Chile continental.
// Se usa en el sitio (selector de horario) y en api/contact.js (validación), por eso no depende de React.

export const TIMEZONE = 'America/Santiago'
export const SLOT_MINUTES = 30
const START_HOUR = 8
const END_HOUR = 18
const BOOKING_DAYS = 10 // días hábiles que se ofrecen
const MIN_NOTICE_MINUTES = 120 // anticipación mínima para un horario del mismo día

export const SLOTS = Array.from({ length: ((END_HOUR - START_HOUR) * 60) / SLOT_MINUTES }, (_, i) => {
  const m = START_HOUR * 60 + i * SLOT_MINUTES
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
})

/** Fecha (YYYY-MM-DD) y minutos del día actuales en Chile. */
export function chileNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(now).map((p) => [p.type, p.value]),
  )
  return { date: `${parts.year}-${parts.month}-${parts.day}`, minutes: Number(parts.hour) * 60 + Number(parts.minute) }
}

const toUTC = (date) => { const [y, m, d] = date.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)) }
const fromUTC = (d) => d.toISOString().slice(0, 10)
const isWeekday = (date) => { const wd = toUTC(date).getUTCDay(); return wd >= 1 && wd <= 5 }
const toMinutes = (slot) => { const [h, m] = slot.split(':').map(Number); return h * 60 + m }

/** Horarios disponibles de una fecha, descontando los que ya pasaron o están muy cerca. */
export function slotsFor(date, now = new Date()) {
  if (!isWeekday(date)) return []
  const today = chileNow(now)
  if (date < today.date) return []
  if (date > today.date) return SLOTS
  return SLOTS.filter((s) => toMinutes(s) >= today.minutes + MIN_NOTICE_MINUTES)
}

/** Próximos días hábiles con al menos un horario disponible. */
export function bookableDays(now = new Date()) {
  const days = []
  let d = toUTC(chileNow(now).date)
  while (days.length < BOOKING_DAYS) {
    const date = fromUTC(d)
    if (slotsFor(date, now).length) days.push(date)
    d = new Date(d.getTime() + 86400000)
  }
  return days
}

export function isBookable(date, slot, now = new Date()) {
  return typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && bookableDays(now).includes(date) && slotsFor(date, now).includes(slot)
}

/** "lunes 26 de octubre" */
export function formatDay(date, opts = { weekday: 'long', day: 'numeric', month: 'long' }) {
  return new Intl.DateTimeFormat('es-CL', { ...opts, timeZone: 'UTC' }).format(toUTC(date))
}
