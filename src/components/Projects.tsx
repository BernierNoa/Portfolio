import type { ReactNode } from 'react'
import { pad, type Project } from '../content'
import { useLang } from '../i18n/context'
import { Artifact } from './artifacts'
import { Arrow, Container, Grid, Reveal, SectionHead, Text } from './ui'

export function Projects() {
  const { t, c } = useLang()
  const { projects } = c
  return (
    <section id="projets" className="pt-32 md:pt-40">
      <Container>
        <SectionHead n="02" label={t.nav.projects} aside={t.projects.aside} />
        <Grid className="mt-10 mb-24 md:mb-32">
          <Reveal as="h2" className="col-span-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] font-medium tracking-[-0.035em] md:col-span-8">
            {t.projects.h2.pre} <span className="font-serif font-normal italic">{t.projects.h2.em}</span>
            {t.projects.h2.post}
          </Reveal>
        </Grid>

        <div>
          {projects.map((p, i) => (
            <ProjectBlock key={p.id} p={p} n={pad(i + 1)} total={pad(projects.length)} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function ProjectBlock({ p, n, total }: { p: Project; n: string; total: string }) {
  const { t } = useLang()
  return (
    <article id={p.id} className="scroll-mt-16 border-t border-line pt-4 pb-28 md:pb-40">
      <Grid>
        <p className="label col-span-2 tabular-nums md:col-span-6">
          <span className="text-ink">{n}</span> / {total}
        </p>
        <p className="label col-span-2 flex items-center justify-end gap-2 md:col-span-6">
          <span className="size-1.5 rounded-full bg-signal" aria-hidden />
          <Text value={p.status} />
        </p>
      </Grid>

      <Grid className="mt-10 gap-y-14 md:mt-14">
        <div className="col-span-4 md:col-span-6">
          <Reveal>
            <h3 className="text-[clamp(3.25rem,8vw,7.5rem)] leading-[0.86] font-[560] tracking-[-0.045em] [font-stretch:90%]">
              {p.name}
            </h3>
            <p className="mt-4 font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] leading-tight text-ink-2 italic">
              <Text value={p.tagline} />
            </p>
          </Reveal>

          <Reveal i={1} className="mt-10 max-w-[36em] space-y-4 text-[1.0625rem] leading-[1.6] md:text-lg">
            {p.body.map((para, k) => (
              <p key={k}>
                <Text value={para} />
              </p>
            ))}
          </Reveal>

          <Reveal i={2} className="mt-12">
            <p className="label mb-3 text-ink">{t.projects.underHood}</p>
            <ol className="max-w-[36em]">
              {p.highlights.map((h, k) => (
                <li key={k} className="grid grid-cols-[2rem_1fr] border-t border-line py-3 text-[0.95rem] leading-snug">
                  <span className="label pt-0.5">{String.fromCharCode(97 + k)}.</span>
                  <span>
                    <Text value={h} />
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal i={3} as="dl" className="mt-12 max-w-[36em] text-[0.9rem]">
            <Meta label={t.projects.meta.year}>
              <Text value={p.year} />
            </Meta>
            <Meta label={t.projects.meta.role}>
              <Text value={p.role} />
            </Meta>
            <Meta label={t.projects.meta.stack}>
              <span className="font-mono text-[0.8rem] leading-relaxed text-ink-2">
                {p.stack.map((s, k) => (
                  <span key={k}>
                    <Text value={s} />
                    {k < p.stack.length - 1 && <span className="text-ink-3"> / </span>}
                  </span>
                ))}
              </span>
            </Meta>
            <Meta label={t.projects.meta.links}>
              <span className="flex flex-wrap gap-x-5 gap-y-1">
                {p.links.map((l, k) =>
                  l.href ? (
                    <a key={k} href={l.href} target="_blank" rel="noreferrer" className="link-rest group -my-1 inline-flex items-center gap-1 py-1">
                      {l.label}
                      <Arrow className="transition-transform duration-500 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span key={k} className="text-ink-2">
                      <Text value={l.label} />
                      {l.note && <span className="text-ink-3"> · {l.note}</span>}
                    </span>
                  ),
                )}
              </span>
            </Meta>
          </Reveal>
        </div>

        <div className="col-span-4 md:col-span-5 md:col-start-8">
          <Reveal i={1} className="md:sticky md:top-24">
            <Artifact kind={p.artifact} n={n} />
          </Reveal>
        </div>
      </Grid>
    </article>
  )
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] items-baseline border-t border-line py-2.5">
      <dt className="label">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
