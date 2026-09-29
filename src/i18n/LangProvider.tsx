import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { contentEn } from '../content.en'
import { contentFr } from '../content.fr'
import { LangContext, type Lang } from './context'
import { ui } from './ui'

const KEY = 'lang'
const isLang = (v: unknown): v is Lang => v === 'fr' || v === 'en'

/** ?lang=en > choix mémorisé > langue du navigateur (français, sinon anglais). */
function detect(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (isLang(q)) return q
  } catch {
    /* URL illisible : on passe à la suite */
  }
  try {
    const stored = window.localStorage.getItem(KEY)
    if (isLang(stored)) return stored
  } catch {
    /* stockage bloqué : on passe à la suite */
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

const setMeta = (selector: string, value: string) =>
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', value)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detect)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(KEY, next)
    } catch {
      /* le choix vaut alors pour cette visite seulement */
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: ui[lang], c: lang === 'fr' ? contentFr : contentEn }),
    [lang, setLang],
  )

  // langue du document, titre et méta pour les onglets, favoris et aperçus de partage
  useEffect(() => {
    const { meta } = ui[lang]
    document.documentElement.lang = lang
    document.title = meta.title
    setMeta('meta[name="description"]', meta.description)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[property="og:locale"]', meta.ogLocale)
  }, [lang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
