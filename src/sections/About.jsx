export default function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title">
      <div className="container about">
        <div>
          <p className="eyebrow">Sobre DTA Next</p>
          <h2 id="nosotros-title">Trato directo. Criterio técnico.</h2>
          <p className="lead">DTA Next es una consultora liderada por Sebastián Cofré, ingeniero en informática. Cada proyecto parte de entender tu negocio y definir una solución viable.</p>
        </div>
        <div className="person">
          <img src="/brand/dta-next-symbol.png" alt="" width="72" height="58" />
          <div><strong>Sebastián Cofré</strong><span>Ingeniería en Informática</span></div>
        </div>
      </div>
    </section>
  )
}
