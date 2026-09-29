import { useMemo, type ReactNode } from 'react'
import { contentEn } from '../content.en'
import { contentFr } from '../content.fr'
import { LangContext, type Lang } from './context'
import { ui } from './ui'

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo(() => ({ lang, t: ui[lang], c: lang === 'fr' ? contentFr : contentEn }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
