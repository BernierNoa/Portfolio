import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { links } from '../content'
import { useLang } from '../i18n/context'
import { Arrow, Container, Grid, SectionHead } from './ui'

// L'adresse est assemblée au rendu pour ne pas apparaître en clair dans le source.
const EMAIL_USER = 'berniernoa24'
const EMAIL_DOMAIN = 'gmail.com'

const LINKEDIN = 'https://www.linkedin.com/in/noa-bernier-1ba8a3304/'

// Passer à true une fois public/cv-noa-bernier.pdf ajouté, sinon le lien reste masqué.
const CV_READY = false
const CV_HREF = '/cv-noa-bernier.pdf'

const noopSubscribe = () => () => {}

type CopyState = 'idle' | 'copied' | 'failed'

export function Contact() {
  const { t } = useLang()
  // Vide au pré-rendu et à l'hydratation, assemblée ensuite : le HTML statique ne contient jamais l'adresse.
  const email = useSyncExternalStore(noopSubscribe, () => `${EMAIL_USER}@${EMAIL_DOMAIN}`, () => '')
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    let next: CopyState = 'copied'
    try {
      // lève aussi si navigator.clipboard est absent (contexte non sécurisé)
      await navigator.clipboard.writeText(`${EMAIL_USER}@${EMAIL_DOMAIN}`)
    } catch {
      next = 'failed'
    }
    setCopyState(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopyState('idle'), next === 'copied' ? 1800 : 4000)
  }

  const external = [
    { label: 'GitHub', srLabel: t.contact.githubSr, href: links.github },
    { label: t.contact.linkedin, srLabel: t.contact.linkedinSr, href: LINKEDIN },
  ]

  return (
    <section id="contact" className="flex min-h-[100svh] flex-col pt-32 md:pt-44">
      <Container className="flex flex-1 flex-col">
        <SectionHead n="05" label={t.nav.contact} />

        <div className="mt-[12vh]">
          <p className="max-w-[28ch] text-xl leading-snug text-ink-2 md:text-2xl">
            {t.contact.lead}
          </p>
          <h2 className="mt-6 text-[clamp(3.5rem,11vw,11rem)] leading-[0.85] font-[560] tracking-[-0.045em] [font-stretch:90%]">
            {t.contact.title.pre}<span className="font-serif font-normal tracking-[-0.02em] italic">{t.contact.title.em}</span>{t.contact.title.post}
          </h2>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            {email ? (
              <a href={`mailto:${email}`} className="link-rest text-[clamp(1.4rem,3vw,2.5rem)] tracking-[-0.02em]">
                {email}
              </a>
            ) : (
              <span aria-hidden className="text-[clamp(1.4rem,3vw,2.5rem)] tracking-[-0.02em] text-ink-3">
                ••••••••••••••••••••••
              </span>
            )}
            <button
              type="button"
              onClick={copy}
              className="label border border-ink px-3 py-2 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <span aria-live="polite">
                {copyState === 'copied' ? t.contact.copied : copyState === 'failed' ? t.contact.failed : t.contact.copy}
              </span>
              {copyState === 'idle' && <span className="sr-only">{t.contact.copySr}</span>}
            </button>
          </div>
        </div>

        <Grid className="mt-auto gap-y-10 pt-28 pb-8">
          <ul className="col-span-4 flex flex-wrap gap-x-8 gap-y-2 md:col-span-6">
            {external.map((o) => (
              <li key={o.href}>
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="link group inline-flex items-center gap-1.5 text-lg">
                  {o.label}
                  <span className="sr-only">{o.srLabel}{t.contact.newTab}</span>
                  <Arrow className="transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
            {CV_READY && (
              <li>
                <a href={CV_HREF} download className="link text-lg">
                  {t.contact.cv}<span className="sr-only">{t.contact.cvSr}</span>
                </a>
              </li>
            )}
          </ul>

          <div className="label col-span-4 flex flex-col justify-end gap-1 md:col-span-6 md:items-end md:text-right">
            <span>{t.contact.font}</span>
            <span>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Noa Bernier ·{' '}
              <a href="#intro" className="link text-ink">
                {t.contact.top}
              </a>
            </span>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
