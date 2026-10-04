import { STEPS } from '../data/content.js'

export default function Process() {
  return (
    <section className="section--mist" id="como-trabajamos" aria-labelledby="proceso-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Cómo trabajamos</p>
          <h2 id="proceso-title">Un proceso claro, de principio a fin.</h2>
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <span className="num" aria-hidden="true">{s.n}</span>
              <h3><span className="sr-only">Paso {i + 1}: </span>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
