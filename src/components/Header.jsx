import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Button from './Button.jsx'
import { NAV } from '../data/content.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) { setOpen(false); btnRef.current?.focus() }
    }
    const mq = matchMedia('(min-width: 1024px)')
    const onMq = (e) => { if (e.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => { document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq) }
  }, [open])

  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="#inicio" aria-label="DTA Next — Inicio">
          <img src="/brand/dta-next-logo.png" width="224" height="48" alt="DTA Next — Inicio" />
        </a>
        <nav className="nav" aria-label="Principal">
          {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <a className="button button--primary header-cta" href="#contacto">Cotiza tu proyecto</a>
        <button
          ref={btnRef}
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'i-x' : 'i-menu'} />
        </button>
        <div className="mobile-menu" id="mobile-menu" hidden={!open} onClick={(e) => { if (e.target.closest('a')) setOpen(false) }}>
          <nav aria-label="Principal móvil">
            {NAV.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
            <Button href="#contacto">Cotiza tu proyecto</Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
