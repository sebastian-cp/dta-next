import { useId, useState } from 'react'
import Icon from './Icon.jsx'

function Item({ q, a }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <h3>
        <button className="faq-q" type="button" id={`${id}-q`} aria-expanded={open} aria-controls={`${id}-a`} onClick={() => setOpen((o) => !o)}>
          {q}
          <Icon name="i-plus" />
        </button>
      </h3>
      <div className="faq-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} hidden={!open}>{a}</div>
    </div>
  )
}

export default function Accordion({ items }) {
  return <div className="faq">{items.map((it) => <Item key={it.q} {...it} />)}</div>
}
