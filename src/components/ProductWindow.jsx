import Icon from './Icon.jsx'

/** Barra de búsqueda + botón de las maquetas de producto (decorativo). */
export function MockToolbar() {
  return (
    <div className="ops__bar" aria-hidden="true">
      <div className="fake-input"><Icon name="i-search" size="sm" />Buscar solicitudes…</div>
      <span className="mini-btn">+ Nueva solicitud</span>
    </div>
  )
}

export function Chip({ tone, children }) {
  return <span className={`chip chip--${tone}`}>{children}</span>
}
