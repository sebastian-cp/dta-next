export const CONTACT_EMAIL = 'dta.next.contacto@gmail.com'
export const LEGAL_UPDATED = '4 de octubre de 2026'

// Cada documento: lista de secciones { title, paragraphs?, items? }.
export const LEGAL = {
  privacy: {
    title: 'Política de privacidad',
    intro:
      'En DTA Next tratamos tus datos personales solo para responder tus consultas. Aquí explicamos qué datos recopilamos, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley N° 19.628 y a la Ley N° 21.719, que la reemplaza desde el 1 de diciembre de 2026.',
    sections: [
      {
        title: '1. Responsable',
        paragraphs: [`DTA Next es el responsable del tratamiento de los datos recopilados en este sitio. Puedes contactarnos en ${CONTACT_EMAIL}.`],
      },
      {
        title: '2. Datos que recopilamos',
        items: [
          'Formulario de contacto: nombre, correo electrónico, empresa (opcional), servicio de interés y el mensaje que escribas.',
          'Solicitud de reunión: además de los datos anteriores, el día y el horario que elijas para la videollamada.',
          'Analítica de visitas: datos técnicos agregados, como páginas visitadas, país, tipo de dispositivo y navegador, mediante Vercel Analytics. Según la documentación de Vercel, funciona sin cookies y sin identificar personalmente a los visitantes.',
        ],
      },
      {
        title: '3. Para qué usamos tus datos',
        paragraphs: ['Usamos los datos del formulario para responder tu consulta y, si corresponde, preparar una propuesta. No los usamos para publicidad masiva ni los vendemos a terceros. Los datos de analítica se usan para entender cómo se usa el sitio y mejorarlo.'],
      },
      {
        title: '4. Base del tratamiento',
        paragraphs: ['Tratamos los datos del formulario porque tú nos los entregas voluntariamente para que te contactemos. Al enviar el formulario, aceptas este uso.'],
      },
      {
        title: '5. Con quién los compartimos',
        paragraphs: ['Para operar el sitio usamos proveedores que tratan datos por nuestra cuenta:'],
        items: [
          'Vercel: alojamiento del sitio y analítica de visitas.',
          'Resend: envío del correo con tu consulta.',
          'Google (Gmail): recepción y gestión de las consultas en nuestra bandeja de correo.',
        ],
        after: 'Estos proveedores pueden tratar datos en servidores fuera de Chile, por ejemplo en Estados Unidos.',
      },
      {
        title: '6. Cuánto tiempo los conservamos',
        paragraphs: ['Conservamos tu consulta por 12 meses desde que la recibimos, o hasta que nos pidas eliminarla. Si luego se concreta un servicio, los datos necesarios se conservarán según lo que establezca la propuesta o el contrato.'],
      },
      {
        title: '7. Tus derechos',
        paragraphs: [`Puedes solicitar acceso, rectificación, supresión, oposición, bloqueo y portabilidad de tus datos escribiendo a ${CONTACT_EMAIL}. Indica qué derecho quieres ejercer y el correo con el que nos escribiste. Responderemos dentro de los plazos que fija la ley.`],
      },
      {
        title: '8. Seguridad',
        paragraphs: ['Aplicamos medidas razonables para proteger tus datos, como conexiones cifradas (HTTPS) y acceso restringido a la bandeja donde recibimos las consultas.'],
      },
      {
        title: '9. Cookies',
        paragraphs: ['Este sitio no instala cookies propias ni de publicidad. Si en el futuro incorporamos herramientas que las usen, te lo informaremos y solicitaremos tu consentimiento cuando corresponda.'],
      },
      {
        title: '10. Cambios en esta política',
        paragraphs: [`Podemos actualizar esta política. La fecha de la última actualización es el ${LEGAL_UPDATED}.`],
      },
    ],
  },

  legal: {
    title: 'Aviso legal',
    intro: 'Información general sobre el uso de este sitio.',
    sections: [
      {
        title: 'Titularidad',
        paragraphs: [`Este sitio es operado por DTA Next. Contacto: ${CONTACT_EMAIL}.`],
      },
      {
        title: 'Contenido informativo',
        paragraphs: ['La información de este sitio es de carácter general y no constituye una oferta ni una propuesta comercial vinculante. Los alcances, entregables, plazos y condiciones de cada servicio se definen por escrito en la propuesta y el contrato correspondientes.'],
      },
      {
        title: 'Demos y visualizaciones',
        paragraphs: ['Las demos, pantallas y visualizaciones son conceptos ilustrativos con datos ficticios. No corresponden a clientes ni a proyectos de DTA Next, ni garantizan un resultado determinado.'],
      },
      {
        title: 'Propiedad intelectual',
        paragraphs: ['Los textos, diseños, logotipos y demás elementos del sitio pertenecen a DTA Next. No pueden copiarse ni reutilizarse sin autorización previa.'],
      },
    ],
  },
}
