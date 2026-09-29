import { useState } from 'react'
import { pad } from '../content'
import { useLang } from '../i18n/context'
import { Container, Grid, Reveal, SectionHead } from './ui'

export function Stack() {
  const { t, c } = useLang()
  const { projects, stack } = c
  const numberOf = (id: string) => pad(projects.findIndex((p) => p.id === id) + 1)
  const nameOf = (id: string) => projects.find((p) => p.id === id)?.name ?? id

  // survoler une techno assombrit les autres
  const [focus, setFocus] = useState<string | null>(null)

  return (
    <section id="stack" className="pt-16 md:pt-24">
      <Container>
        <SectionHead n="03" label={t.nav.stack} aside={t.stack.aside} />

        <Grid className="mt-10 mb-20 md:mb-28">
          <Reveal as="h2" className="col-span-4 text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] font-medium tracking-[-0.035em] md:col-span-8">
            {t.stack.h2.pre} <span className="font-serif font-normal italic">{t.stack.h2.em}</span>
            {t.stack.h2.post}
          </Reveal>
        </Grid>

        <div onMouseLeave={() => setFocus(null)}>
          {stack.map((tier, t) => (
            <Reveal key={tier.label} i={t} className="border-t border-line py-7 md:py-9">
              <Grid className="gap-y-4">
                <div className="col-span-4 md:col-span-3">
                  <p className="label text-ink">{tier.label}</p>
                  <p className="mt-1 text-sm text-ink-2">{tier.note}</p>
                </div>
                <ul className="col-span-4 flex flex-wrap gap-x-7 gap-y-2 md:col-span-9">
                  {tier.items.map((item) => {
                    const dim = focus !== null && focus !== item.name
                    return (
                      <li
                        key={item.name}
                        onMouseEnter={() => setFocus(item.name)}
                        onFocus={() => setFocus(item.name)}
                        onBlur={() => setFocus(null)}
                        className={`text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] font-[480] tracking-[-0.03em] transition-colors duration-300 ${
                          dim ? 'text-ink-3/60' : 'text-ink'
                        }`}
                      >
                        {item.name}
                        {item.refs && (
                          <sup className="ml-1 font-mono text-[0.7rem] font-normal tracking-normal">
                            {[...item.refs].sort((a, b) => numberOf(a).localeCompare(numberOf(b))).map((r, k) => (
                              <span key={r}>
                                <a
                                  href={`#${r}`}
                                  title={nameOf(r)}
                                  className="text-ink-2 transition-colors hover:text-signal"
                                >
                                  {numberOf(r)}
                                </a>
                                {k < item.refs!.length - 1 && <span className="text-ink-3">,</span>}
                              </span>
                            ))}
                          </sup>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </Grid>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
