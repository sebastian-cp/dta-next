import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Sprite from './components/Sprite.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import LegalModal from './components/LegalModal.jsx'
import Hero from './sections/Hero.jsx'
import Problems from './sections/Problems.jsx'
import Services from './sections/Services.jsx'
import Demos from './sections/Demos.jsx'
import Process from './sections/Process.jsx'
import About from './sections/About.jsx'
import Faq from './sections/Faq.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  const [serviceModal, setServiceModal] = useState(null)
  const [contactService, setContactService] = useState('')
  const [legalDoc, setLegalDoc] = useState(null) // 'privacy' | 'legal' | null
  const [contactMode, setContactMode] = useState('mensaje') // 'mensaje' | 'reunion'

  // Cierra modales, preselecciona el servicio y lleva al formulario.
  const goContact = (service) => {
    setServiceModal(null)
    setContactMode('mensaje')
    if (service) setContactService(service)
    // Espera a que el <dialog> libere el foco antes de moverlo.
    requestAnimationFrame(() => {
      document.getElementById('contacto')?.scrollIntoView()
      document.getElementById('f-nombre')?.focus({ preventScroll: true })
    })
  }

  // Abre el formulario en modo reunión y lleva al selector de horario.
  const goBook = () => {
    setContactMode('reunion')
    requestAnimationFrame(() => {
      document.getElementById('agendar')?.scrollIntoView()
      document.getElementById('f-fecha')?.focus({ preventScroll: true })
    })
  }

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Sprite />
      <Header />
      <main id="contenido">
        <Hero onBook={goBook} />
        <Problems />
        <Services selected={serviceModal} onSelect={setServiceModal} onQuote={goContact} />
        <Demos onQuote={goContact} />
        <Process onBook={goBook} />
        <About />
        <Faq />
        <Contact service={contactService} onServiceChange={setContactService} onOpenLegal={setLegalDoc} mode={contactMode} onModeChange={setContactMode} />
      </main>
      <Footer onOpenLegal={setLegalDoc} />
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
      <Analytics />
    </>
  )
}
