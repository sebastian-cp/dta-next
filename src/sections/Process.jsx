import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import { STEPS, DIAGNOSTIC } from '../data/content.js'

function List({ title, items, icon = 'i-check' }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul className="checks">
        {items.map((t) => <li key={t}><Icon name={icon} />{t}</li>)}
      </ul>
    </div>
  )
}

export default function Process({ onBook }) {
  return (
    <section className="section--mist" id="como-trabajamos" aria-labelledby="proceso-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Cómo empezamos</p>
          <h2 id="proceso-title">De la primera conversación a la entrega.</h2>
          <p className="lead">No necesitas saber de antemano qué contratar. Partimos con una reunión y, si conviene, con un diagnóstico acotado.</p>
        </div>
        <ol className="steps steps--5">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <span className="num" aria-hidden="true">{s.n}</span>
              <h3><span className="sr-only">Paso {i + 1}: </span>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <article className="card offer" aria-labelledby="diagnostico-title">
          <div className="offer__head">
            <p className="tag">Primer paso recomendado</p>
            <h3 id="diagnostico-title">{DIAGNOSTIC.title}</h3>
            <p>{DIAGNOSTIC.lead}</p>
          </div>
          <div className="offer__grid">
            <List title="Qué necesitamos de ti" items={DIAGNOSTIC.needs} />
            <List title="Qué recibes" items={DIAGNOSTIC.delivers} />
            <List title="Qué queda fuera" items={DIAGNOSTIC.excludes} icon="i-x" />
          </div>
          <div className="offer__foot">
            <p><Icon name="i-info" />{DIAGNOSTIC.cost}</p>
            <Button onClick={onBook}>Agenda una reunión</Button>
          </div>
        </article>
      </div>
    </section>
  )
}
