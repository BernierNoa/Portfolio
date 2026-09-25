import { useEffect, useState } from 'react'
import { useActiveSection, useParisTime } from '../hooks'
import { Container } from './ui'

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'projets', label: 'Projets' },
  { id: 'stack', label: 'Stack' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
]
const ids = sections.map((s) => s.id)

export function TopBar() {
  const active = useActiveSection(ids)
  const time = useParisTime()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <Container className="flex h-12 items-center justify-between gap-6">
        <a href="#intro" className="label text-ink">
          Noa Bernier
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ol className="flex gap-6">
            {sections.map((s, i) => {
              const on = s.id === active
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`label group flex items-center gap-1.5 transition-colors duration-300 ${
                      on ? 'text-ink' : 'text-ink-3 hover:text-ink'
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full bg-signal transition-transform duration-500 ease-out-quint ${
                        on ? 'scale-100' : 'scale-0'
                      }`}
                    />
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    {s.label}
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>

        <p className="label tabular-nums">
          <span className="hidden sm:inline">Amiens, </span>
          {time}
        </p>
      </Container>
    </header>
  )
}
