import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

/** Passe à true la première fois que l'élément entre dans le viewport. */
export function useInView<T extends HTMLElement>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])

  return [ref, inView] as const
}

/** Id de la section qui occupe le haut de l'écran. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // une bande fine au tiers haut de l'écran
      { rootMargin: '-30% 0px -69% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}

/** Au pré-rendu et à l'hydratation : l'heure du build serait fausse, on affiche ce texte neutre. */
export const CLOCK_PLACEHOLDER = '--:--:--'

const parisClock = new Intl.DateTimeFormat('fr-FR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Europe/Paris',
})

const subscribeClock = (onChange: () => void) => {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}

/** Heure locale à Amiens, rafraîchie chaque seconde. */
export function useParisTime() {
  return useSyncExternalStore(subscribeClock, () => parisClock.format(new Date()), () => CLOCK_PLACEHOLDER)
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/** false au pré-rendu et à l'hydratation, puis la vraie valeur (sans erreur d'hydratation). */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
}

export type Theme = 'light' | 'dark'

const THEME_COLORS: Record<Theme, string> = { light: '#FAFAF7', dark: '#121211' }
const themeListeners = new Set<() => void>()

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  themeListeners.forEach((l) => l())
}

/**
 * Thème courant, posé avant le rendu par le script de index.html (la source de vérité est l'attribut
 * data-theme). 'light' au pré-rendu. Suit le système tant que rien n'est choisi.
 */
export function useTheme() {
  const theme = useSyncExternalStore(
    (onChange) => {
      themeListeners.add(onChange)
      return () => themeListeners.delete(onChange)
    },
    readTheme,
    () => 'light' as Theme,
  )

  useEffect(() => {
    applyTheme(readTheme())
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (window.localStorage.getItem('theme')) return
      } catch {
        /* stockage bloqué : on suit le système */
      }
      applyTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    try {
      window.localStorage.setItem('theme', next)
    } catch {
      /* le choix vaut alors pour cette visite seulement */
    }
  }

  return [theme, toggle] as const
}
