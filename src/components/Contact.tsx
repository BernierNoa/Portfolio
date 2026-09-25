import { useState } from 'react'
import { isPlaceholder, links } from '../content'
import { Arrow, Container, Grid, SectionHead, Text } from './ui'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const emailReady = !isPlaceholder(links.email)

  const copy = async () => {
    if (!emailReady) return
    await navigator.clipboard.writeText(links.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const others = [
    { label: 'GitHub', href: links.github },
    { label: 'LinkedIn', href: links.linkedin },
    { label: 'CV (PDF)', href: links.cv },
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
            {emailReady ? (
              <a href={`mailto:${links.email}`} className="link-rest text-[clamp(1.4rem,3vw,2.5rem)] tracking-[-0.02em]">
                {links.email}
              </a>
            ) : (
              <span className="text-[clamp(1.4rem,3vw,2.5rem)]">
                <Text value={links.email} />
              </span>
            )}
            <button
              type="button"
              onClick={copy}
              disabled={!emailReady}
              className="label border border-ink px-3 py-2 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink"
            >
              <span aria-live="polite">{copied ? 'Copié ✓' : 'Copier'}</span>
            </button>
          </div>
        </div>

        <Grid className="mt-auto gap-y-10 pt-28 pb-8">
          <ul className="col-span-4 flex flex-wrap gap-x-8 gap-y-2 md:col-span-6">
            {others.map((o) =>
              isPlaceholder(o.href) ? (
                <li key={o.label} className="text-lg">
                  {o.label} <Text value={o.href} />
                </li>
              ) : (
                <li key={o.label}>
                  <a href={o.href} target="_blank" rel="noreferrer" className="link group inline-flex items-center gap-1.5 text-lg">
                    {o.label}
                    <Arrow className="transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ),
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
