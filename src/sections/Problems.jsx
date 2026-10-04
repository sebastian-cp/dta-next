import Icon from '../components/Icon.jsx'
import { PROBLEMS } from '../data/content.js'

export default function Problems() {
  return (
    <section aria-labelledby="problemas-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Un problema común</p>
          <h2 id="problemas-title">¿Tu operación depende de tareas manuales?</h2>
        </div>
        <div className="problems">
          {PROBLEMS.map((p) => (
            <div className="problem" key={p.title}>
              <Icon name={p.icon} />
              <div><h3>{p.title}</h3><p>{p.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
