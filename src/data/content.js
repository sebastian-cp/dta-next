import { CONTACT_EMAIL } from './legal.js'

export const NAV = [
  { href: '#soluciones', label: 'Soluciones' },
  { href: '#demos', label: 'Demos' },
  { href: '#como-trabajamos', label: 'Cómo empezamos' },
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
    audience: 'Empresas con tareas repetitivas que dependen de correos, documentos o planillas.',
    examples: ['Leer facturas y cotizaciones y registrarlas en tus planillas o sistemas.', 'Clasificar consultas entrantes y preparar respuestas para que una persona las apruebe.', 'Conectar herramientas que hoy no se comunican entre sí.', 'Avisar al equipo cuando un caso necesita revisión.'],
    deliverables: ['Flujo automatizado funcionando.', 'Registro de lo que hace en cada paso.', 'Revisión humana donde corresponda.', 'Documentación de uso y puesta en marcha.'],
    pricing: 'Depende del proceso a automatizar, de los documentos o herramientas involucradas y del nivel de revisión que necesites. Partimos con un diagnóstico para definir el alcance.',
  },
  web: {
    icon: 'i-monitor', title: 'Sitios web', summary: 'Una presencia digital diseñada para convertir.',
    lead: 'Una presencia digital clara, rápida y pensada para facilitar el contacto.',
    features: ['Diseño responsive.', 'Rendimiento y SEO técnico.', 'Formularios e integraciones.'],
    audience: 'Empresas y profesionales que necesitan presentar su servicio y recibir consultas con una web clara.',
    examples: ['Sitio corporativo con servicios, nosotros y contacto.', 'Landing para captar consultas de un servicio específico.', 'Formulario de contacto con envío por correo.', 'Optimización técnica de velocidad y SEO base.'],
    deliverables: ['Sitio publicado y adaptado a móvil.', 'Formulario de contacto funcionando.', 'Configuración técnica de rendimiento y SEO.', 'Indicaciones para actualizar el contenido.'],
    pricing: 'Depende de la cantidad de secciones, del contenido disponible y de las integraciones (formularios, correo, agenda). Se define en la propuesta.',
  },
  app: {
    icon: 'i-code', title: 'Aplicaciones a medida', summary: 'Plataformas adaptadas a tu operación.',
    lead: 'Plataformas adaptadas a la forma en que opera tu equipo.',
    features: ['Diseño funcional.', 'Roles y permisos.', 'Pruebas y despliegue.'],
    audience: 'Equipos que hoy gestionan su operación en planillas, correos o herramientas separadas.',
    examples: ['Sistema para recibir, asignar y dar seguimiento a solicitudes.', 'Panel con estados, responsables y actividad.', 'Portal interno con usuarios, roles y permisos.', 'Reportes y exportación de datos.'],
    deliverables: ['Aplicación desplegada y probada.', 'Roles y permisos definidos.', 'Documentación técnica y de uso.', 'Acompañamiento en la puesta en marcha, según lo acordado.'],
    pricing: 'Depende de los procesos a cubrir, de la cantidad de usuarios y roles, y de las integraciones. Se estima por etapas una vez definido el alcance.',
  },
}

export const SERVICE_OPTIONS = [
  { value: 'ia', label: 'Automatización con IA' },
  { value: 'web', label: 'Sitios web' },
  { value: 'app', label: 'Aplicaciones a medida' },
  { value: 'orientacion', label: 'Necesito orientación' },
]

// Canales de contacto directo. `whatsapp`: solo dígitos con código de país; si se deja vacío, el botón no se muestra.
export const CONTACT = {
  email: CONTACT_EMAIL,
  whatsapp: '56927640931',
  whatsappText: 'Hola, vengo desde el sitio de DTA Next y quiero hacer una consulta.',
  instagram: 'https://www.instagram.com/dta_next/',
  responseTime: 'dentro de 1 a 2 días hábiles',
}

export const MEETING = {
  minutes: 30,
  days: 'lunes a viernes',
  hours: '08:00 a 18:00',
  timezone: 'hora de Chile continental',
}

// Primera oferta acotada.
// PENDIENTE: definir si el diagnóstico tiene costo y su valor; hoy solo se indica que se informa antes de comenzar.
export const DIAGNOSTIC = {
  title: 'Diagnóstico de un proceso',
  lead: 'Una forma acotada de empezar: revisamos un proceso concreto de tu empresa y te entregamos un mapa de cómo funciona hoy, qué conviene mejorar y cómo lo implementaríamos.',
  needs: [
    'Una descripción del proceso y de quiénes participan en él.',
    'Ejemplos de los documentos, correos o planillas que se usan (pueden ser anonimizados).',
    'Las herramientas que utilizas hoy y qué accesos podrías habilitar.',
    'Una o dos reuniones online con quien conoce el proceso.',
  ],
  delivers: [
    'Mapa del flujo actual, paso a paso.',
    'Oportunidades de mejora priorizadas, con lo que conviene automatizar y lo que no.',
    'Propuesta de implementación con alcance, etapas y estimación.',
  ],
  excludes: [
    'Desarrollo o implementación de la solución.',
    'Cambios en tus sistemas o herramientas.',
    'Revisión de más de un proceso, salvo que lo acordemos.',
  ],
  cost: 'La reunión inicial no tiene costo. El valor del diagnóstico, si corresponde, se informa por escrito antes de comenzar.',
}

export const STEPS = [
  { n: '01', title: 'Reunión inicial', text: `Una videollamada de ${MEETING.minutes} minutos, sin costo, para entender tu caso y ver si podemos ayudarte.` },
  { n: '02', title: 'Diagnóstico', text: 'Si el problema necesita más análisis, revisamos el proceso y te entregamos un mapa, mejoras y una propuesta.' },
  { n: '03', title: 'Propuesta por escrito', text: 'Alcance, entregables, plazos, lo que queda fuera y condiciones de soporte, antes de comenzar.' },
  { n: '04', title: 'Desarrollo por etapas', text: 'Entregas parciales que validas. Si cambia el alcance, lo evaluamos y cotizamos antes de seguir.' },
  { n: '05', title: 'Entrega y puesta en marcha', text: 'Pruebas, documentación, traspaso de accesos y el acompañamiento acordado.' },
]

export const PRINCIPLES = [
  { icon: 'i-target', title: 'Todo por escrito', text: 'Alcance, entregables, plazos y exclusiones quedan acordados antes de comenzar.' },
  { icon: 'i-code', title: 'Código y accesos claros', text: 'La propiedad del código, las cuentas y los accesos se definen en la propuesta, sin letra chica.' },
  { icon: 'i-doc', title: 'Documentación incluida', text: 'Cada entrega incluye la documentación técnica y de uso que tu equipo necesita para operar.' },
  { icon: 'i-check-circle', title: 'Confidencialidad', text: 'Tratamos tu información solo para el proyecto y podemos firmar un acuerdo de confidencialidad.' },
  { icon: 'i-users', title: 'Revisión humana', text: 'En las automatizaciones con IA, una persona revisa los casos que lo requieren y cada paso queda registrado.' },
  { icon: 'i-handshake', title: 'Comunicación directa', text: 'Hablas con quienes diseñan y desarrollan tu solución, sin intermediarios.' },
]

export const FAQ = [
  { q: '¿Cómo se define el presupuesto?', a: 'Consideramos la cantidad de procesos o pantallas, las integraciones con otras herramientas, el volumen de datos y el nivel de revisión humana que necesitas. Si el alcance es grande, proponemos partir por una primera etapa más acotada y cotizar el resto después.' },
  { q: '¿Qué necesitan para cotizar?', a: 'Una descripción del problema, ejemplos de los documentos o pantallas que usas hoy, las herramientas involucradas y, si lo tienes, un plazo o rango de presupuesto. Con eso podemos dar una estimación o proponerte un diagnóstico si hace falta más información.' },
  { q: '¿Cómo se manejan los cambios de alcance?', a: 'Si durante el proyecto aparece algo nuevo, lo evaluamos y te informamos por escrito su efecto en plazo y costo antes de hacerlo. Nada fuera de lo acordado se cobra sin tu aprobación.' },
  { q: '¿Qué distingue una corrección de una mejora nueva?', a: 'Una corrección es algo que no funciona según lo acordado en la propuesta, y se resuelve sin costo durante el período de garantía definido. Una mejora es una funcionalidad o cambio que no estaba en el alcance, y se cotiza aparte.' },
  { q: '¿Qué costos recurrentes pueden existir?', a: 'Según la solución: hosting, dominio, servicios de correo, APIs de inteligencia artificial o licencias de herramientas de terceros. Los identificamos en la propuesta, con un valor estimado, y en lo posible quedan a nombre de tu empresa.' },
  { q: '¿Qué incluye el mantenimiento?', a: 'Puede ir desde soporte por incidencias y actualizaciones de seguridad hasta una bolsa de horas mensual para mejoras. Te proponemos la alternativa que calce con el uso real de la solución, y también puedes no contratarlo y operar con la documentación entregada.' },
  { q: '¿Cómo se acuerda la entrega del código y los accesos?', a: 'En la propuesta definimos quién es dueño del código, en qué repositorio y cuentas queda y cómo se traspasan los accesos al cierre. Lo habitual es que la solución construida para ti quede a tu nombre.' },
  { q: '¿Qué pasa con los datos que usa una automatización?', a: 'Usamos tus datos solo para construir y operar la solución acordada. Definimos dónde se almacenan, quién accede y qué servicios externos los procesan, y preferimos trabajar con datos de prueba o anonimizados durante el desarrollo.' },
  { q: '¿Pueden integrar mis herramientas actuales?', a: 'Revisamos las APIs, permisos y posibilidades de integración de las herramientas que utilizas antes de definir la solución, y te decimos con claridad si algo no es posible o requiere un plan pagado.' },
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
}

export const DOC_SAMPLE = {
  Nombre: 'Contrato de servicios',
  Fecha: '12 de marzo de 2024',
  Proveedor: 'Servicios SpA',
  Monto: 'UF 150',
}

// Contexto comercial de cada demo: qué problema resuelve, para quién, qué se prueba y qué haría falta en una implementación real.
export const DEMO_INFO = {
  panel: {
    problema: 'Las consultas llegan por correo, formulario y WhatsApp, y se pierde el seguimiento de cada una.',
    usuario: 'Quien coordina las solicitudes y las asigna a responsables.',
    prueba: 'Filtrar, asignar un responsable, cambiar estados y revisar una respuesta antes de aprobarla.',
    beneficio: 'Todos los pendientes visibles en un solo lugar y menos seguimiento disperso.',
    alcance: 'Las solicitudes y respuestas son ficticias. Una implementación real se conecta a tus canales de entrada y a tu correo, con usuarios y permisos.',
  },
  automation: {
    problema: 'Alguien lee cada correo entrante, identifica de qué se trata y copia los datos a mano en una planilla o sistema.',
    usuario: 'El equipo administrativo u operativo que procesa esos correos.',
    prueba: 'Elegir un caso y ver cómo se clasifica, qué datos se extraen, qué se valida y cuándo interviene una persona.',
    beneficio: 'Menos digitación repetitiva y casos dudosos derivados a revisión en vez de registrarse con errores.',
    alcance: 'Los resultados están predefinidos y no se usa IA real. Una implementación real usa un modelo de IA, reglas de validación acordadas y la conexión a tu correo y tus registros.',
  },
  docs: {
    problema: 'Contratos, facturas o formularios se revisan uno a uno para obtener los mismos datos.',
    usuario: 'Quien recibe documentos y necesita registrar su información.',
    prueba: 'Cargar un documento de ejemplo, ver los datos extraídos, corregirlos y exportar el resultado.',
    beneficio: 'Información estructurada lista para usar, con una persona que confirma cada dato.',
    alcance: 'Se usa un documento de ejemplo y no se procesa ningún archivo. Una implementación real lee tus formatos de documento y exporta a tu planilla o sistema.',
  },
  web: {
    problema: 'Un negocio con un buen servicio, pero sin una presencia digital que lo explique y facilite el contacto.',
    usuario: 'Los clientes potenciales que buscan el servicio y quieren escribir o cotizar.',
    prueba: 'Recorrer la portada, los proyectos destacados y el llamado a contacto.',
    beneficio: 'Un sitio claro y rápido que presenta el servicio y recibe consultas.',
    alcance: 'Es una imagen conceptual de un estudio ficticio. Un sitio real incluye tu contenido, formulario de contacto, adaptación a móvil y configuración técnica de SEO.',
  },
}
