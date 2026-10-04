import Icon from '../components/Icon.jsx'
import { DELIVERABLES } from '../data/content.js'

export default function Deliverables() {
  return (
    <section aria-labelledby="entregables-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Nuestro compromiso</p>
          <h2 id="entregables-title">Más que una entrega de código.</h2>
        </div>
        <div className="deliver">
          {DELIVERABLES.map((d) => (
            <div key={d.title}><Icon name={d.icon} /><h3>{d.title}</h3><p>{d.text}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
