import { useEffect, useRef, useState } from 'react'
import { links } from '../content'
import { Arrow, Container, Grid, SectionHead } from './ui'

// L'adresse est assemblée au rendu pour ne pas apparaître en clair dans le source.
const EMAIL_USER = 'berniernoa24'
const EMAIL_DOMAIN = 'gmail.com'

const LINKEDIN = 'https://www.linkedin.com/in/noa-bernier-1ba8a3304/'

// Passer à true une fois public/cv-noa-bernier.pdf ajouté, sinon le lien reste masqué.
const CV_READY = false
const CV_HREF = '/cv-noa-bernier.pdf'

type CopyState = 'idle' | 'copied' | 'failed'

export function Contact() {
  const email = `${EMAIL_USER}@${EMAIL_DOMAIN}`
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    let next: CopyState = 'copied'
    try {
      // lève aussi si navigator.clipboard est absent (contexte non sécurisé)
      await navigator.clipboard.writeText(email)
    } catch {
      next = 'failed'
    }
    setCopyState(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('idle'), next === 'copied' ? 1800 : 4000)
  }

  const external = [
    { label: 'GitHub', srLabel: ' de Noa Bernier', href: links.github },
    { label: 'Noa Bernier', srLabel: ' sur LinkedIn', href: LINKEDIN },
  ]

  return (
    <section id="contact" className="flex min-h-[100svh] flex-col pt-32 md:pt-44">
      <Container className="flex flex-1 flex-col">
        <SectionHead n="05" label="Contact" />

        <div className="mt-[12vh]">
          <p className="max-w-[28ch] text-xl leading-snug text-ink-2 md:text-2xl">
            Une question sur un projet, une alternance, une candidature, ou juste envie de parler agents ?
          </p>
          <h2 className="mt-6 text-[clamp(3.5rem,11vw,11rem)] leading-[0.85] font-[560] tracking-[-0.045em] [font-stretch:90%]">
            Écris-<span className="font-serif font-normal tracking-[-0.02em] italic">moi</span>.
          </h2>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <a href={`mailto:${email}`} className="link-rest text-[clamp(1.4rem,3vw,2.5rem)] tracking-[-0.02em]">
              {email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="label border border-ink px-3 py-2 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <span aria-live="polite">
                {copyState === 'copied' ? 'Copié ✓' : copyState === 'failed' ? 'Copie impossible, sélectionne l’adresse' : 'Copier'}
              </span>
              {copyState === 'idle' && <span className="sr-only"> l’adresse e-mail</span>}
            </button>
          </div>
        </div>

        <Grid className="mt-auto gap-y-10 pt-28 pb-8">
          <ul className="col-span-4 flex flex-wrap gap-x-8 gap-y-2 md:col-span-6">
            {external.map((o) => (
              <li key={o.href}>
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="link group inline-flex items-center gap-1.5 text-lg">
                  {o.label}
                  <span className="sr-only">{o.srLabel} (nouvel onglet)</span>
                  <Arrow className="transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
            {CV_READY && (
              <li>
                <a href={CV_HREF} download className="link text-lg">
                  CV (PDF)<span className="sr-only"> de Noa Bernier, téléchargement</span>
                </a>
              </li>
            )}
          </ul>

          <div className="label col-span-4 flex flex-col justify-end gap-1 md:col-span-6 md:items-end md:text-right">
            <span>Composé en Bricolage Grotesque, parce que bon.</span>
            <span>
              © {new Date().getFullYear()} Noa Bernier ·{' '}
              <a href="#intro" className="link text-ink">
                Retour en haut ↑
              </a>
            </span>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
