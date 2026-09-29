import { createContext, useContext } from 'react'
import type { Content } from '../content'
import type { Strings } from './ui'

export type Lang = 'fr' | 'en'

export type LangValue = {
  lang: Lang
  /** textes de l'interface */
  t: Strings
  /** projets, stack, parcours */
  c: Content
}

export const LangContext = createContext<LangValue | null>(null)

export function useLang() {
  const value = useContext(LangContext)
  if (!value) throw new Error('useLang doit être utilisé dans <LangProvider>')
  return value
}
