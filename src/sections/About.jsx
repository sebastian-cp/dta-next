import Icon from '../components/Icon.jsx'
import { MISSION, VISION, PRINCIPLES } from '../data/content.js'

export default function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title">
      <div className="container">
        <div className="about">
          <div>
            <p className="eyebrow">Sobre DTA Next</p>
            <h2 id="nosotros-title">Trato directo. Criterio técnico.</h2>
            <p className="lead">En DTA Next, un equipo de profesionales de la ingeniería en informática diseña, desarrolla e implementa soluciones a medida. Cada proyecto parte de entender tu negocio y definir una solución viable.</p>
          </div>
          <div className="mv">
            <div className="mv__item"><h3>Misión</h3><p>{MISSION}</p></div>
            <div className="mv__item"><h3>Visión</h3><p>{VISION}</p></div>
          </div>
        </div>

        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div key={p.title}><Icon name={p.icon} /><h3>{p.title}</h3><p>{p.text}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
