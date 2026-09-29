import { useEffect, useRef, useState } from 'react'
import { useActiveSection, useParisTime, usePrefersReducedMotion, useTheme } from '../hooks'
import { useLang } from '../i18n/context'
import { pathFor } from '../i18n/paths'
import { Container } from './ui'

const ids = ['intro', 'projets', 'stack', 'parcours', 'contact']

function ThemeIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
      <g className="theme-icon-sun">
        <circle cx="8" cy="8" r="2.75" />
        <path d="M8 1.5v1.75M8 12.75v1.75M1.5 8h1.75M12.75 8h1.75M3.4 3.4l1.25 1.25M11.35 11.35l1.25 1.25M3.4 12.6l1.25-1.25M11.35 4.65l1.25-1.25" />
      </g>
      <path className="theme-icon-moon" d="M13.25 9.6A5.6 5.6 0 0 1 6.4 2.75a5.6 5.6 0 1 0 6.85 6.85Z" />
    </svg>
  )
}

export function TopBar() {
  const { lang, t } = useLang()
  const [theme, toggleTheme] = useTheme()
  const sections = ids.map((id, i) => ({
    id,
    label: [t.nav.intro, t.nav.projects, t.nav.stack, t.nav.background, t.nav.contact][i],
  }))
  const other = lang === 'fr' ? 'en' : 'fr'
  const active = useActiveSection(ids)
  const time = useParisTime()
  const reduced = usePrefersReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const mobileNav = useRef<HTMLUListElement>(null)

  // sur mobile, garde l'onglet actif visible dans la barre défilante (sans faire bouger la page)
  useEffect(() => {
    const list = mobileNav.current
    const el = list?.querySelector<HTMLElement>('[aria-current]')
    if (!list || !el) return
    list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' })
  }, [active, reduced])

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
        <a href="#intro" className="label -my-1 py-1 text-ink">
          Noa Bernier
        </a>

        <nav aria-label={t.nav.label} className="hidden md:block">
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

        <div className="flex items-center gap-3">
          <p className="label tabular-nums">
            <span className="hidden sm:inline">{t.nav.city}</span>
            {time}
          </p>
          {/* vrai lien vers l'autre page pré-rendue ; on garde la section en cours et on mémorise le choix */}
          <a
            href={`${pathFor(other)}${active === 'intro' ? '' : `#${active}`}`}
            hrefLang={other}
            lang={other}
            aria-label={t.controls.langLabel}
            onClick={() => {
              try {
                window.localStorage.setItem('lang', other)
              } catch {
                /* le choix vaut alors pour cette visite seulement */
              }
            }}
            className="label grid h-8 min-w-8 place-items-center border border-line px-1.5 text-ink transition-colors duration-300 hover:border-ink"
          >
            {t.controls.langText}
          </a>
          <button
            type="button"
            aria-label={theme === 'dark' ? t.controls.toLight : t.controls.toDark}
            onClick={toggleTheme}
            className="grid size-8 place-items-center border border-line text-ink transition-colors duration-300 hover:border-ink"
          >
            <ThemeIcon />
          </button>
        </div>
      </Container>

      <nav aria-label={t.nav.label} className="md:hidden">
        <Container>
          <ul
            ref={mobileNav}
            className="-mx-5 flex overflow-x-auto px-5 [mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-2rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sections.map((s, i) => {
              const on = s.id === active
              return (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`label flex h-10 items-center gap-1.5 pr-5 transition-colors duration-300 ${
                      on ? 'text-ink' : 'text-ink-2'
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
          </ul>
        </Container>
      </nav>
    </header>
  )
}
