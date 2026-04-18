import { useEffect } from 'react'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Summary } from './components/Summary'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { EducationSection } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal')
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useRevealOnScroll()

  return (
    <>
      <div className="grain" aria-hidden />
      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Summary />
        <Skills />
        <Projects />
        <EducationSection />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
