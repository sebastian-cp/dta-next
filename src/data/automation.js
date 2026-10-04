// Escenarios simulados para la demo "Automatización paso a paso".
// Todos los resultados están predefinidos: no se usa IA real ni se procesan datos del visitante.

export const FLOW_STEPS = [
  { id: 'recibir', title: 'Correo recibido', icon: 'i-file' },
  { id: 'clasificar', title: 'Clasificar', icon: 'i-chip' },
  { id: 'extraer', title: 'Extraer datos', icon: 'i-doc' },
  { id: 'validar', title: 'Validar', icon: 'i-check-circle' },
  { id: 'registrar', title: 'Registrar y avisar', icon: 'i-users' },
]

export const SCENARIOS = [
  {
    id: 'cotizacion',
    label: 'Solicitud de cotización',
    email: {
      de: 'compras@constructora-ejemplo.test',
      asunto: 'Cotización mantención de equipos',
      cuerpo: 'Buenos días, necesitamos cotizar la mantención preventiva de 8 equipos de climatización en nuestro edificio de Temuco. Quisiéramos coordinar una visita la próxima semana.',
    },
    steps: {
      clasificar: { log: 'Clasificado como "Solicitud de cotización" (confianza alta).', out: 'Solicitud de cotización' },
      extraer: { log: 'Datos extraídos: servicio, cantidad, ciudad y plazo.', data: { Servicio: 'Mantención preventiva', Equipos: '8', Ciudad: 'Temuco', Plazo: 'Próxima semana' } },
      validar: { log: 'Validación correcta: todos los campos requeridos están presentes.', ok: true },
      registrar: { log: 'Solicitud registrada, asignada a María V. y borrador de respuesta creado.', result: 'Solicitud creada y asignada a María V. Borrador de respuesta listo para aprobar.' },
    },
  },
  {
    id: 'factura',
    label: 'Factura de proveedor',
    email: {
      de: 'facturacion@proveedor-ejemplo.test',
      asunto: 'Factura N° 4521 – Servicios de abril',
      cuerpo: 'Estimados, adjuntamos la factura N° 4521 por $1.250.000 correspondiente a los servicios de abril. Fecha de emisión: 12 de abril de 2026.',
    },
    steps: {
      clasificar: { log: 'Clasificado como "Factura de proveedor" (confianza alta).', out: 'Factura de proveedor' },
      extraer: { log: 'Datos extraídos: proveedor, folio, monto y fecha.', data: { Proveedor: 'Proveedor Ejemplo SpA', Folio: '4521', Monto: '$1.250.000', Fecha: '12-04-2026' } },
      validar: { log: 'El monto coincide con la orden de compra OC-0192.', ok: true },
      registrar: { log: 'Factura registrada en la planilla de compras y aviso enviado a Finanzas.', result: 'Factura registrada en compras y notificada a Finanzas.' },
    },
  },
  {
    id: 'ambiguo',
    label: 'Consulta ambigua',
    email: {
      de: 'contacto@cliente-ejemplo.test',
      asunto: 'Consulta',
      cuerpo: 'Hola, vi lo que hacen y quería saber si pueden ayudarnos con lo que hablamos. Gracias.',
    },
    steps: {
      clasificar: { log: 'Clasificación con confianza baja: el mensaje no indica qué se necesita.', out: 'Sin clasificar' },
      extraer: { log: 'Datos insuficientes: solo se identificó el remitente.', data: { Remitente: 'contacto@cliente-ejemplo.test', Servicio: 'No identificado', Plazo: 'No indicado' } },
      validar: { log: 'Requiere revisión humana antes de continuar.', ok: false },
      registrar: { log: 'Revisión aprobada por una persona. Se pidió más información al remitente.', result: 'Una persona revisó el caso y envió una respuesta pidiendo más detalles.' },
    },
  },
]
