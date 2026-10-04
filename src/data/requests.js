// Datos ficticios para la demo "Panel de solicitudes". No corresponden a clientes reales.

export const ESTADOS = {
  revisar: { label: 'Por revisar', tone: 'wait' },
  asignada: { label: 'Asignada', tone: 'prog' },
  agendada: { label: 'Agendada', tone: 'ok' },
  cerrada: { label: 'Cerrada', tone: 'neutral' },
}

export const RESPONSABLES = ['María V.', 'Felipe R.', 'Camila S.']
export const SERVICIOS = ['Mantención preventiva', 'Revisión eléctrica', 'Climatización']

// "hora" es la hora de recepción; la actividad automática se deriva de ella.
export const REQUESTS = [
  {
    id: 'SOL-1048', cliente: 'Administración Edificio Los Robles', servicio: 'Mantención preventiva', ciudad: 'Temuco',
    estado: 'revisar', resp: 'María V.', fecha: '02 oct 2026', hora: '09:14',
    mensaje: 'Hola, necesitamos cotizar la mantención de los equipos de climatización del edificio. Son 8 equipos y buscamos coordinar una visita la próxima semana.',
    borrador: 'Hola, gracias por escribirnos. Para preparar la cotización, ¿nos pueden indicar la marca de los equipos y la disponibilidad para una visita técnica?',
  },
  {
    id: 'SOL-1047', cliente: 'Oficina Centro Sur', servicio: 'Revisión eléctrica', ciudad: 'Temuco',
    estado: 'asignada', resp: 'Felipe R.', fecha: '02 oct 2026', hora: '08:40',
    mensaje: 'Tenemos tableros eléctricos antiguos y queremos una revisión completa antes de fin de mes.',
    borrador: 'Gracias por contactarnos. Coordinaremos una visita para revisar los tableros. ¿Qué día de la próxima semana les acomoda?',
  },
  {
    id: 'SOL-1046', cliente: 'Comercial Las Encinas', servicio: 'Climatización', ciudad: 'Padre Las Casas',
    estado: 'agendada', resp: 'Camila S.', fecha: '01 oct 2026', hora: '17:05',
    mensaje: 'Necesitamos instalar climatización en dos locales nuevos.',
    borrador: 'Gracias por tu mensaje. Agendamos la visita técnica para evaluar ambos locales; te confirmamos el horario por este medio.',
  },
  {
    id: 'SOL-1045', cliente: 'Bodega El Maitén', servicio: 'Mantención preventiva', ciudad: 'Lautaro',
    estado: 'revisar', resp: 'María V.', fecha: '01 oct 2026', hora: '15:22',
    mensaje: 'Quisiéramos un plan de mantención preventiva para la bodega, con visitas trimestrales.',
    borrador: 'Hola, gracias por escribirnos. ¿Cuántos equipos tienen y cada cuánto necesitan las visitas? Con eso preparamos una propuesta.',
  },
  {
    id: 'SOL-1044', cliente: 'Condominio Parque Norte', servicio: 'Climatización', ciudad: 'Temuco',
    estado: 'asignada', resp: 'Felipe R.', fecha: '01 oct 2026', hora: '11:48',
    mensaje: 'Dos equipos de climatización de la sala común no enfrían bien.',
    borrador: 'Hola, lamentamos el inconveniente. Un técnico revisará los equipos; ¿qué horario les acomoda para el acceso a la sala común?',
  },
  {
    id: 'SOL-1043', cliente: 'Oficinas Santa Elena', servicio: 'Revisión eléctrica', ciudad: 'Temuco',
    estado: 'cerrada', resp: 'Camila S.', fecha: '30 sep 2026', hora: '16:10',
    mensaje: 'Solicitamos revisión eléctrica por cortes frecuentes en el segundo piso.',
    borrador: 'Revisión realizada. Adjuntamos el informe con las observaciones; quedamos atentos a cualquier consulta.',
  },
  {
    id: 'SOL-1042', cliente: 'Centro Dental Araucanía', servicio: 'Climatización', ciudad: 'Temuco',
    estado: 'revisar', resp: 'Felipe R.', fecha: '30 sep 2026', hora: '10:02',
    mensaje: 'Queremos climatizar la sala de espera y dos boxes de atención.',
    borrador: 'Gracias por escribirnos. ¿Pueden compartir los metros cuadrados aproximados de cada espacio para estimar la capacidad requerida?',
  },
  {
    id: 'SOL-1041', cliente: 'Edificio Mirador del Cautín', servicio: 'Revisión eléctrica', ciudad: 'Temuco',
    estado: 'agendada', resp: 'María V.', fecha: '29 sep 2026', hora: '14:30',
    mensaje: 'Necesitamos certificar la instalación eléctrica del edificio.',
    borrador: 'Hola, confirmamos la visita de certificación. Te enviaremos el detalle de la documentación necesaria.',
  },
]

/** Suma minutos a una hora "HH:MM". */
export function addMinutes(hora, min) {
  const [h, m] = hora.split(':').map(Number)
  const t = h * 60 + m + min
  return `${String(Math.floor(t / 60) % 24).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
}

export function baseActivity(r) {
  return [
    { t: r.hora, text: 'Solicitud registrada' },
    { t: r.hora, text: 'Servicio clasificado' },
    { t: addMinutes(r.hora, 1), text: 'Cliente vinculado' },
    { t: addMinutes(r.hora, 1), text: 'Borrador preparado' },
  ]
}
