export const NAV = [
  { href: '#soluciones', label: 'Soluciones' },
  { href: '#demos', label: 'Demos' },
  { href: '#como-trabajamos', label: 'Cómo trabajamos' },
  { href: '#nosotros', label: 'Nosotros' },
]

export const PROBLEMS = [
  { icon: 'i-db', title: 'Información dispersa', text: 'Tus datos están en distintos formatos y plataformas.' },
  { icon: 'i-puzzle', title: 'Herramientas desconectadas', text: 'Usas varias herramientas que no se comunican entre sí.' },
  { icon: 'i-repeat', title: 'Procesos que se repiten', text: 'Tu equipo invierte tiempo en tareas manuales y operativas.' },
]

export const SERVICES = {
  ia: {
    icon: 'i-chip', title: 'Automatización con IA', summary: 'Flujos, asistentes e integraciones.',
    lead: 'Flujos, asistentes e integraciones que reducen el trabajo manual y repetitivo.',
    features: ['Diagnóstico del proceso.', 'Validaciones y trazabilidad.', 'Documentación y puesta en marcha.'],
    uses: ['Extraer y ordenar información desde documentos y correos.', 'Conectar herramientas que hoy no se comunican entre sí.', 'Asistentes que apoyan a tu equipo, con revisión humana donde corresponde.'],
  },
  web: {
    icon: 'i-monitor', title: 'Sitios web', summary: 'Una presencia digital diseñada para convertir.',
    lead: 'Una presencia digital clara, rápida y pensada para facilitar el contacto.',
    features: ['Diseño responsive.', 'Rendimiento y SEO técnico.', 'Formularios e integraciones.'],
    uses: ['Presentar tu empresa y tus servicios con un mensaje claro.', 'Recibir consultas mediante formularios bien diseñados.', 'Integrarte con las herramientas que ya usas.'],
  },
  app: {
    icon: 'i-code', title: 'Aplicaciones a medida', summary: 'Plataformas adaptadas a tu operación.',
    lead: 'Plataformas adaptadas a la forma en que opera tu equipo.',
    features: ['Diseño funcional.', 'Roles y permisos.', 'Pruebas y despliegue.'],
    uses: ['Reemplazar planillas y procesos manuales por un sistema propio.', 'Gestionar solicitudes, usuarios y estados en un solo lugar.', 'Evolucionar la herramienta junto con tu operación.'],
  },
}

export const SERVICE_OPTIONS = [
  { value: 'ia', label: 'Automatización con IA' },
  { value: 'web', label: 'Sitios web' },
  { value: 'app', label: 'Aplicaciones a medida' },
  { value: 'orientacion', label: 'Necesito orientación' },
]

export const DELIVERABLES = [
  { icon: 'i-target', title: 'Alcance definido', text: 'Objetivos claros, entregables y plazos acordados por escrito.' },
  { icon: 'i-check-circle', title: 'Pruebas funcionales', text: 'Validamos que todo funcione según lo esperado antes de entregar.' },
  { icon: 'i-doc', title: 'Documentación', text: 'Entregamos documentación técnica y de uso de la solución.' },
  { icon: 'i-handshake', title: 'Acompañamiento acordado', text: 'Te apoyamos en la puesta en marcha, según lo definido en el proyecto.' },
]

export const STEPS = [
  { n: '01', title: 'Entendemos', text: 'Conversamos sobre tu negocio, desafíos y objetivos.' },
  { n: '02', title: 'Diseñamos', text: 'Proponemos una solución técnica y un plan de trabajo.' },
  { n: '03', title: 'Construimos', text: 'Desarrollamos, iteramos y validamos contigo.' },
  { n: '04', title: 'Implementamos', text: 'Desplegamos la solución y acompañamos su puesta en marcha.' },
]

export const FAQ = [
  { q: '¿Cómo se define el presupuesto?', a: 'Evaluamos el alcance, las integraciones y la complejidad del proyecto para preparar una propuesta con entregables y condiciones claras.' },
  { q: '¿Pueden integrar mis herramientas actuales?', a: 'Revisamos las APIs, permisos y posibilidades de integración de las herramientas que utilizas antes de definir la solución.' },
  { q: '¿Qué incluye el mantenimiento?', a: 'El soporte y mantenimiento se acuerdan según las necesidades del proyecto y se detallan en la propuesta.' },
  { q: '¿Cómo se acuerda la entrega del código?', a: 'La entrega del código, los accesos y las condiciones de uso se definen expresamente en la propuesta y el contrato.' },
]

export const BOARD_COLUMNS = ['Nuevas', 'En proceso', 'Completadas']
export const BOARD_DOTS = ['#2457FF', '#E0A100', '#147D4E']
export const BOARD_INITIAL = [
  { id: 1, title: 'Solicitud de cotización', company: 'Empresa A', col: 0 },
  { id: 2, title: 'Soporte técnico', company: 'Empresa B', col: 0 },
  { id: 3, title: 'Información general', company: 'Empresa C', col: 0 },
  { id: 4, title: 'Implementación', company: 'Empresa D', col: 1 },
  { id: 5, title: 'Consulta comercial', company: 'Empresa E', col: 1 },
  { id: 6, title: 'Activación de cuenta', company: 'Empresa F', col: 2 },
  { id: 7, title: 'Capacitación', company: 'Empresa G', col: 2 },
]

export const IMAGE_DEMOS = {
  web: {
    title: 'Sitio web para un estudio de arquitectura',
    src: '/demos/demo-sitio-web.webp',
    width: 1536,
    height: 1024,
    service: 'web',
    alt: 'Sitio web conceptual de un estudio de arquitectura e interiorismo ficticio: encabezado con navegación, título "Espacios para habitar con calma", imagen principal de una vivienda en el bosque y tres proyectos destacados.',
    notice: 'Concepto ilustrativo de un sitio web. El estudio y los proyectos son ficticios y no corresponden a clientes de DTA Next.',
  },
  panel: {
    title: 'Panel de solicitudes con automatización',
    src: '/demos/demo-solicitudes.webp',
    width: 1536,
    height: 1024,
    service: 'ia',
    alt: 'Panel de operaciones conceptual: lista de solicitudes con folio, cliente, estado y responsable; a la derecha el detalle de la solicitud SOL-1048, su actividad automática y un borrador de respuesta pendiente de aprobación.',
    notice: 'Concepto ilustrativo con datos ficticios. No es una aplicación real ni corresponde a clientes de DTA Next.',
  },
}

export const DOC_SAMPLE = {
  Nombre: 'Contrato de servicios',
  Fecha: '12 de marzo de 2024',
  Proveedor: 'Servicios SpA',
  Monto: 'UF 150',
}
