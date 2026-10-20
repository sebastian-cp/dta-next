import Icon from '../components/Icon.jsx'
import { PRINCIPLES } from '../data/content.js'

export default function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Sobre DTA Next</p>
          <h2 id="nosotros-title">Lo que puedes esperar al trabajar con nosotros.</h2>
          <p className="lead">DTA Next es una consultora tecnológica chilena que diseña, desarrolla e implementa software y automatización a medida. Nuestro foco es ayudar a empresas a simplificar su operación, partiendo siempre por entender su negocio.</p>
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
