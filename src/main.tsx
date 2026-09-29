import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// standard.css embarque les axes opsz + wdth en plus du wght
import '@fontsource-variable/bricolage-grotesque/standard.css'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import App from './App.tsx'
import { LangProvider } from './i18n/LangProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
