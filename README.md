# DTA Next

Landing de DTA Next (React + Vite).

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # compilación en dist/
```

## Estructura

- `src/styles/` — tokens CSS, base/componentes, secciones y modales.
- `src/components/` — Button, Modal, FormField, Accordion, Header, Footer, Icon.
- `src/sections/` — una sección de la landing por archivo.
- `src/demos/` — demos interactivas con datos ficticios.
- `src/data/content.js` — textos y datos de contenido.
- `public/brand/` — logos aprobados.

## Notas

- El formulario de contacto envía por correo con Resend mediante `api/contact.js`. Requiere las variables de entorno de `.env.example` (configuradas en Vercel). La política de privacidad y el aviso legal están en `src/data/legal.js` (borrador pendiente de revisión legal).
- Pendiente: reconstruir el logo como SVG maestro y la versión blanca limpia.
