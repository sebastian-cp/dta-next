import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import DemoBrief from '../components/DemoBrief.jsx'
import Modal, { ModalActions } from '../components/Modal.jsx'
import { Chip } from '../components/ProductWindow.jsx'
import { ESTADOS, RESPONSABLES, SERVICIOS, REQUESTS, baseActivity, addMinutes } from '../data/requests.js'

const TABS = [
  { id: 'todas', label: 'Todas' },
  { id: 'revisar', label: 'Por revisar' },
  { id: 'asignada', label: 'Asignadas' },
  { id: 'agendada', label: 'Agendadas' },
  { id: 'cerrada', label: 'Cerradas' },
]
const NAV = ['Resumen', 'Solicitudes', 'Clientes', 'Agenda', 'Automatizaciones', 'Reportes']

function initialItems() {
  return REQUESTS.map((r) => ({
    ...r,
    actividad: baseActivity(r),
    borradorTexto: r.borrador,
    // Solo las solicitudes por revisar tienen el borrador pendiente.
    borradorEstado: r.estado === 'revisar' ? 'pendiente' : 'enviado',
  }))
}

/** Vista previa nítida del panel (tarjeta de la sección Demos), armada con componentes. */
export function PanelPreview() {
  return (
    <div className="panel-preview" aria-hidden="true">
      <p className="panel-preview__title">Solicitudes</p>
      <div className="panel-preview__tabs">
        <span className="is-on">Por revisar <b>3</b></span><span>Asignadas <b>2</b></span><span>Cerradas <b>1</b></span>
      </div>
      <ul>
        {REQUESTS.slice(0, 4).map((r) => (
          <li key={r.id}>
            <span><strong>{r.cliente}</strong><small>{r.id} · {r.servicio}</small></span>
            <Chip tone={ESTADOS[r.estado].tone}>{ESTADOS[r.estado].label}</Chip>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PanelApp({ onClose, onQuote }) {
  const [items, setItems] = useState(initialItems)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'detail' (solo aplica en pantallas angostas)
  const [tab, setTab] = useState('todas')
  const [query, setQuery] = useState('')
  const [servicio, setServicio] = useState('')
  const [resp, setResp] = useState('')
  const [view, setView] = useState('lista')
  const [selectedId, setSelectedId] = useState('SOL-1048')
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState('')

  const counts = useMemo(() => {
    const c = { todas: items.length }
    Object.keys(ESTADOS).forEach((k) => { c[k] = items.filter((i) => i.estado === k).length })
    return c
  }, [items])

  const filtered = items.filter((i) => {
    if (tab !== 'todas' && i.estado !== tab) return false
    if (servicio && i.servicio !== servicio) return false
    if (resp && i.resp !== resp) return false
    const q = query.trim().toLowerCase()
    return !q || i.id.toLowerCase().includes(q) || i.cliente.toLowerCase().includes(q)
  })

  const selected = items.find((i) => i.id === selectedId)
  const update = (id, patch) => setItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  const addActivity = (item, text) => [...item.actividad, { t: addMinutes(item.hora, item.actividad.length + 20), text }]

  const select = (id) => { setSelectedId(id); setEditing(false); setMobileView('detail') }
  const backToList = () => {
    setMobileView('list')
    // Devuelve el foco a la solicitud que se estaba viendo.
    requestAnimationFrame(() => document.querySelector('.app__list [aria-pressed="true"]')?.focus())
  }
  const changeEstado = (e) => {
    update(selected.id, { estado: e.target.value, actividad: addActivity(selected, `Estado cambiado a ${ESTADOS[e.target.value].label}`) })
    setNotice(`Estado de ${selected.id} cambiado a ${ESTADOS[e.target.value].label}.`)
  }
  const changeResp = (e) => {
    update(selected.id, { resp: e.target.value, actividad: addActivity(selected, `Reasignada a ${e.target.value}`) })
    setNotice(`${selected.id} reasignada a ${e.target.value}.`)
  }
  const approve = () => {
    update(selected.id, {
      borradorEstado: 'enviado',
      estado: selected.estado === 'revisar' ? 'asignada' : selected.estado,
      actividad: addActivity(selected, 'Respuesta aprobada (simulada)'),
    })
    setEditing(false)
    setNotice(`Respuesta de ${selected.id} aprobada. En esta demo no se envía ningún correo.`)
  }
  const clearFilters = () => { setTab('todas'); setQuery(''); setServicio(''); setResp('') }

  return (
    <>
      <h2 id="dp-title">Panel de solicitudes</h2>
      <div className="demo-banner">
        <Icon name="i-info" />
        <span>
          <span className="bn-long">Prototipo interactivo con datos ficticios y sin conexiones externas: puedes filtrar, asignar y aprobar respuestas, y nada se envía ni se guarda.</span>
          <span className="bn-short">Prototipo con datos ficticios. Nada se envía.</span>
        </span>
      </div>
      <DemoBrief id="panel" />

      <div className={`app${mobileView === 'detail' ? ' is-detail' : ''}`}>
        <nav className="app__side" aria-label="Menú de la demo">
          <p className="app__brand">Operaciones</p>
          {NAV.map((n) => (
            <button key={n} type="button" className={n === 'Solicitudes' ? 'is-current' : ''} aria-current={n === 'Solicitudes' ? 'page' : undefined} disabled={n !== 'Solicitudes'}>{n}</button>
          ))}
        </nav>

        <div className="app__main">
          <div className="app__browse">
          <div className="app__head">
            <div>
              <p className="app__title">Solicitudes</p>
              <p className="app__sub">Gestiona consultas y coordina la atención de tus clientes.</p>
            </div>
            <div className="seg" role="group" aria-label="Vista">
              <button type="button" aria-pressed={view === 'lista'} onClick={() => setView('lista')}>Lista</button>
              <button type="button" aria-pressed={view === 'tablero'} onClick={() => setView('tablero')}>Tablero</button>
            </div>
          </div>

          <div className="tabs" role="group" aria-label="Filtrar por estado">
            {TABS.map((t) => (
              <button key={t.id} type="button" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
                {t.label} <span>{counts[t.id]}</span>
              </button>
            ))}
          </div>

          <div className="filters">
            <label className="sr-only" htmlFor="dp-q">Buscar por cliente o folio</label>
            <input id="dp-q" type="search" placeholder="Buscar por cliente o folio" value={query} onChange={(e) => setQuery(e.target.value)} />
            <label className="sr-only" htmlFor="dp-s">Servicio</label>
            <select id="dp-s" value={servicio} onChange={(e) => setServicio(e.target.value)}>
              <option value="">Servicio</option>
              {SERVICIOS.map((s) => <option key={s}>{s}</option>)}
            </select>
            <label className="sr-only" htmlFor="dp-r">Responsable</label>
            <select id="dp-r" value={resp} onChange={(e) => setResp(e.target.value)}>
              <option value="">Responsable</option>
              {RESPONSABLES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          </div>

          <div className="app__body">
            <div className="app__list">
              {filtered.length === 0 ? (
                <div className="empty">
                  <p>No hay solicitudes que coincidan con los filtros.</p>
                  <Button variant="secondary" onClick={clearFilters}>Limpiar filtros</Button>
                </div>
              ) : view === 'lista' ? (
                <table>
                  <caption className="sr-only">Solicitudes</caption>
                  <thead><tr><th scope="col">Folio</th><th scope="col">Cliente / solicitud</th><th scope="col">Estado</th><th scope="col" className="col-resp">Responsable</th></tr></thead>
                  <tbody>
                    {filtered.map((i) => (
                      <tr key={i.id} className={i.id === selectedId ? 'is-selected' : ''} onClick={() => select(i.id)}>
                        <td>{i.id}</td>
                        <td>
                          <button type="button" className="row-btn" aria-pressed={i.id === selectedId} onClick={(e) => { e.stopPropagation(); select(i.id) }}>
                            <strong>{i.cliente}</strong>
                            <span>{i.servicio} · {i.ciudad}</span>
                          </button>
                        </td>
                        <td><Chip tone={ESTADOS[i.estado].tone}>{ESTADOS[i.estado].label}</Chip></td>
                        <td className="col-resp">{i.resp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="board">
                  {Object.entries(ESTADOS).map(([k, e]) => {
                    const col = filtered.filter((i) => i.estado === k)
                    return (
                      <section key={k} aria-label={e.label}>
                        <h4>{e.label} <span>{col.length}</span></h4>
                        {col.map((i) => (
                          <button key={i.id} type="button" className={`bcard${i.id === selectedId ? ' is-selected' : ''}`} aria-pressed={i.id === selectedId} onClick={() => select(i.id)}>
                            <strong>{i.cliente}</strong>
                            <span>{i.id} · {i.resp}</span>
                          </button>
                        ))}
                      </section>
                    )
                  })}
                </div>
              )}
            </div>

            {selected && (
              <aside className="detail" aria-label={`Detalle de ${selected.id}`}>
                <button type="button" className="detail__back" onClick={backToList}>
                  <Icon name="i-arrow" size="sm" />Volver a solicitudes
                </button>
                <div className="detail__top">
                  <h3>{selected.id}</h3>
                  <Chip tone={ESTADOS[selected.estado].tone}>{ESTADOS[selected.estado].label}</Chip>
                </div>
                <p className="detail__client">{selected.cliente}</p>

                <dl className="meta">
                  <div><dt>Origen</dt><dd>Formulario web</dd></div>
                  <div><dt>Recibida</dt><dd>{selected.fecha} · {selected.hora}</dd></div>
                  <div><dt>Servicio detectado</dt><dd>{selected.servicio}</dd></div>
                  <div><dt>Ciudad</dt><dd>{selected.ciudad}</dd></div>
                </dl>

                <div className="assign">
                  <label>Estado
                    <select value={selected.estado} onChange={changeEstado}>
                      {Object.entries(ESTADOS).map(([k, e]) => <option key={k} value={k}>{e.label}</option>)}
                    </select>
                  </label>
                  <label>Responsable
                    <select value={selected.resp} onChange={changeResp}>
                      {RESPONSABLES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </label>
                </div>

                <div className="msg"><strong>Mensaje del cliente</strong><p>{selected.mensaje}</p></div>

                <h4>Actividad automática</h4>
                <ul className="timeline">
                  {selected.actividad.map((a, idx) => (
                    <li key={idx}><Icon name="i-check-circle" /><span><time>{a.t}</time> · {a.text}</span></li>
                  ))}
                </ul>

                <div className="draft">
                  <div className="draft__top">
                    <strong>Borrador de respuesta</strong>
                    <Chip tone={selected.borradorEstado === 'pendiente' ? 'wait' : 'ok'}>
                      {selected.borradorEstado === 'pendiente' ? 'Pendiente de aprobación' : 'Aprobado (simulado)'}
                    </Chip>
                  </div>
                  {editing ? (
                    <>
                      <label className="sr-only" htmlFor="dp-draft">Texto del borrador</label>
                      <textarea id="dp-draft" value={selected.borradorTexto} onChange={(e) => update(selected.id, { borradorTexto: e.target.value })} />
                    </>
                  ) : (
                    <p className="draft__text">{selected.borradorTexto}</p>
                  )}
                  {selected.borradorEstado === 'pendiente' && (
                    <div className="draft__actions">
                      <Button onClick={approve} disabled={!selected.borradorTexto.trim()}>Aprobar y enviar</Button>
                      <Button variant="secondary" onClick={() => setEditing((e) => !e)}>{editing ? 'Listo' : 'Editar'}</Button>
                    </div>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      <p className="sr-only" role="status">{notice}</p>
      {notice && <p className="live-notice" aria-hidden="true">{notice}</p>}

      <ModalActions onClose={onClose}>
        <Button href="#contacto" onClick={(e) => { e.preventDefault(); onQuote('app') }}>Quiero algo así</Button>
      </ModalActions>
    </>
  )
}

export function PanelModal({ open, onClose, onQuote }) {
  return (
    <Modal open={open} onClose={onClose} titleId="dp-title" size="app">
      {open && <PanelApp onClose={onClose} onQuote={onQuote} />}
    </Modal>
  )
}
