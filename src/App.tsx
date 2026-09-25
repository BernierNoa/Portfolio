import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Parcours } from './components/Parcours'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { TopBar } from './components/TopBar'

export default function App() {
  return (
    <>
      <a href="#projets" className="label sr-only focus:not-sr-only focus:fixed focus:top-14 focus:left-5 focus:z-50 focus:bg-paper focus:p-2">
        Aller aux projets
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
