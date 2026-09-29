import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// standard.css embarque les axes opsz + wdth en plus du wght
import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import App from './App.tsx'
import { LangProvider } from './i18n/LangProvider'
import { langFromPath } from './i18n/paths'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <LangProvider lang={langFromPath(window.location.pathname)}>
      <App />
    </LangProvider>
  </StrictMode>
)

// pages pré-rendues : on hydrate le HTML existant ; en dev le conteneur est vide, on le rend
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
