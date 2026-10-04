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

- El formulario de contacto es demostrativo: valida pero no envía nada. Falta integrar un servicio real de envío y publicar una política de privacidad antes de habilitarlo.
- Pendiente: reconstruir el logo como SVG maestro y la versión blanca limpia.
