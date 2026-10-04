import Accordion from '../components/Accordion.jsx'
import { FAQ } from '../data/content.js'

export default function Faq() {
  return (
    <section className="section--mist" aria-labelledby="faq-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-title">Antes de comenzar</h2>
        </div>
        <Accordion items={FAQ} />
      </div>
    </section>
  )
}
