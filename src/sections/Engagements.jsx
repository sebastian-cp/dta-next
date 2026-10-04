import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import { ENGAGEMENTS } from '../data/content.js'

export default function Engagements() {
  return (
    <section aria-labelledby="modalidades-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Formas de trabajar</p>
          <h2 id="modalidades-title">Cada proyecto es distinto. La propuesta se adapta.</h2>
          <p className="lead">Estas son las formas en que podemos trabajar. En la propuesta definimos cuál aplica a tu caso.</p>
        </div>
        <div className="engagements">
          {ENGAGEMENTS.map((e) => (
            <div className="card engagement" key={e.title}>
              <Icon name={e.icon} />
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
        <div className="engagements__cta">
          <Button href="#contacto">Cuéntanos tu caso</Button>
        </div>
      </div>
    </section>
  )
}
