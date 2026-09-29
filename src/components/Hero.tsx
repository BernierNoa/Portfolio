import type { CSSProperties, ReactNode } from 'react'
import { pad } from '../content'
import { useLang } from '../i18n/context'
import { Arrow, Container, Grid, Text } from './ui'

/** Découpe une phrase en mots qui montent un par un. */
function Words({ text, from, className = '' }: { text: string; from: number; className?: string }) {
  return text.split(' ').map((w, i) => (
    <Word key={i} i={from + i} className={className}>
      {w}
    </Word>
  ))
}

function Word({ children, i, className = '' }: { children: ReactNode; i: number; className?: string }) {
  return (
    <>
      <span className="word" style={{ '--i': i } as CSSProperties}>
        <span className={className}>{children}</span>
      </span>{' '}
    </>
  )
}

const wordCount = (text: string) => text.split(' ').length

export function Hero() {
  const { t, c } = useLang()
  const { projects } = c
  const h1 = t.hero.h1
  const firstCount = wordCount(h1.first)
  const beforeCount = wordCount(h1.before)

  return (
    <section id="intro" className="flex min-h-[100svh] flex-col pt-24 pb-10 md:pt-28">
      <Container className="flex flex-1 flex-col">
        <Grid className="gap-y-4">
          {t.hero.meta.map(([k, v]) => (
            <dl key={k} className="col-span-2 md:col-span-3">
              <dt className="label">{k}</dt>
              <dd className="mt-1 font-mono text-[0.8125rem] text-ink">{v}</dd>
            </dl>
          ))}
        </Grid>

        <h1 className="mt-[12vh] max-w-[24ch] md:max-w-none text-[clamp(2.6rem,6.4vw,6.75rem)] leading-[0.98] font-[520] tracking-[-0.032em] [font-stretch:94%] md:mt-[11vh]">
          <Words text={h1.first} from={0} />
          <br className="hidden md:block" />
          <span className="text-ink-2">
            <Words text={h1.before} from={firstCount} />
            <Word i={firstCount + beforeCount} className="pr-[0.06em] font-serif font-normal tracking-[-0.02em] text-ink italic">
              {h1.emph}
            </Word>
            <Words text={h1.after} from={firstCount + beforeCount + 1} />
          </span>
        </h1>

        <Grid className="mt-auto gap-y-12 pt-20">
          <div className="col-span-4 md:col-span-5">
            <p className="max-w-[34ch] text-lg leading-[1.45] text-ink-2 md:text-xl">
              <span className="text-ink">{t.hero.introLead}</span> {t.hero.introRest}
            </p>
          </div>

          <nav aria-label={t.hero.indexLabel} className="col-span-4 md:col-span-6 md:col-start-7">
            <p className="label mb-3 flex justify-between border-b border-ink pb-2 text-ink">
              <span>{t.hero.contents}</span>
              <span>{t.hero.count(pad(projects.length))}</span>
            </p>
            <ol>
              {projects.map((p, i) => (
                <li key={p.id} className="border-b border-line">
                  <a href={`#${p.id}`} className="group flex items-baseline gap-4 py-2.5">
                    <span className="label w-6 tabular-nums transition-colors duration-300 group-hover:text-signal">
                      {pad(i + 1)}
                    </span>
                    <span className="text-xl font-medium tracking-[-0.02em] transition-transform duration-500 ease-out-quint group-hover:translate-x-1.5">
                      {p.name}
                    </span>
                    <span className="hidden flex-1 truncate text-sm text-ink-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
                      <Text value={p.tagline} />
                    </span>
                    <span className="label ml-auto tabular-nums">
                      <Text value={p.year} />
                    </span>
                    <Arrow className="-translate-x-1 text-signal opacity-0 transition-all duration-500 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Grid>
      </Container>
    </section>
  )
}
