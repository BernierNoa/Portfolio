import type { Lang } from './context'

/** La langue est portée par l'URL : `/` est en français, `/en/` en anglais (deux pages pré-rendues). */
export const langFromPath = (pathname: string): Lang => (/^\/en(\/|$)/.test(pathname) ? 'en' : 'fr')

export const pathFor = (lang: Lang) => (lang === 'en' ? '/en/' : '/')
