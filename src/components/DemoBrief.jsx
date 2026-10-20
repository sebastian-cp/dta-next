import { DEMO_INFO } from '../data/content.js'

const ROWS = [
  ['problema', 'Problema'],
  ['usuario', 'Para quién'],
  ['prueba', 'Qué puedes probar'],
  ['beneficio', 'Beneficio esperado'],
  ['alcance', 'Qué está simulado'],
]

/** Explicación comercial de una demo: problema, usuario, qué se prueba, beneficio y alcance. */
export default function DemoBrief({ id }) {
  const info = DEMO_INFO[id]
  return (
    <details className="demo-brief">
      <summary>¿Para qué sirve esta demo?</summary>
      <dl>
        {ROWS.map(([k, label]) => (
          <div key={k}><dt>{label}</dt><dd>{info[k]}</dd></div>
        ))}
      </dl>
    </details>
  )
}
