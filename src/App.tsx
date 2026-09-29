import { useEffect } from 'react'
import { useLang } from './i18n/context'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Parcours } from './components/Parcours'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { TopBar } from './components/TopBar'

export default function App() {
  const { t } = useLang()

  // Le contenu est rendu côté client : le navigateur ne défile pas vers #ancre au chargement.
  // On défile, puis on recale quand une police finit de charger (elle change la hauteur de la page),
  // sauf si le visiteur a déjà pris la main.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    const target = id ? document.getElementById(id) : null
    if (!target) return

    let touched = false
    const go = () => {
      if (!touched) target.scrollIntoView({ behavior: 'instant' })
    }
    const stop = () => {
      touched = true
    }
    const events = ['wheel', 'touchstart', 'keydown'] as const
    events.forEach((e) => window.addEventListener(e, stop, { passive: true }))
    document.fonts.addEventListener('loadingdone', go)
    go()

    const timer = setTimeout(cleanup, 1500)
    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, stop))
      document.fonts.removeEventListener('loadingdone', go)
    }
    return () => {
      clearTimeout(timer)
      cleanup()
    }
  }, [])

  return (
    <>
      <a href="#projets" className="label sr-only focus:not-sr-only focus:fixed focus:top-14 focus:left-5 focus:z-50 focus:bg-paper focus:p-2">
        {t.skip}
      </a>
      <TopBar />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <Parcours />
        <Contact />
      </main>
    </>
  )
}
