import { renderToString } from 'react-dom/server'
import App from './App'
import type { Lang } from './i18n/context'
import { LangProvider } from './i18n/LangProvider'
import { ui } from './i18n/ui'

/** HTML du corps de la page pour une langue (utilisé par scripts/prerender.mjs au build). */
export function render(lang: Lang) {
  return renderToString(
    <LangProvider lang={lang}>
      <App />
    </LangProvider>,
  )
}

/** Titre, description et locale de chaque langue, pour l'en-tête des pages pré-rendues. */
export const metaFor = (lang: Lang) => ui[lang].meta
