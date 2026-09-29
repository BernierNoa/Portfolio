import { useLang } from '../i18n/context'
import { Arrow, Container, Grid, Reveal, SectionHead } from './ui'

export function Parcours() {
  const { t, c } = useLang()
  const { drawers, timeline } = c
  return (
    <section id="parcours" className="pt-32 md:pt-44">
      <Container>
        <SectionHead n="04" label={t.nav.background} />

        <Grid className="mt-10 gap-y-16">
          <Reveal className="col-span-4 md:col-span-5">
            <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] font-medium tracking-[-0.035em]">
              {t.background.title}
            </h2>
            <div className="mt-8 max-w-[34em] space-y-4 text-[1.0625rem] leading-[1.6] md:text-lg">
              {t.background.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
              <p>
                {t.background.last.pre}{' '}
                <span className="font-serif text-[1.2em] italic">{t.background.last.em}</span>
              </p>
            </div>
          </Reveal>

          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <ol>
              {timeline.map((item, i) => (
                <Reveal as="li" i={i} key={item.year} className="grid grid-cols-[5.5rem_1fr] border-t border-line py-5">
                  <span className={`label tabular-nums ${i === timeline.length - 1 ? 'text-signal' : 'text-ink'}`}>
                    {item.year}
                  </span>
                  <span className="text-[1.0625rem] leading-snug">{item.text}</span>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-20">
              <p className="label mb-3 flex justify-between border-b border-ink pb-2 text-ink">
                <span>{t.background.drawers}</span>
                <a href="https://github.com/BernierNoa?tab=repositories" target="_blank" rel="noreferrer" className="link">
                  {t.background.seeAll}
                </a>
              </p>
              <ul>
                {drawers.map((d) => (
                  <li key={d.name} className="border-b border-line">
                    <a
                      href={d.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid grid-cols-[1fr_auto] items-baseline gap-4 py-3 sm:grid-cols-[12rem_1fr_auto]"
                    >
                      <span className="font-mono text-[0.8125rem] transition-colors duration-300 group-hover:text-signal">
                        {d.name}
                      </span>
                      <span className="hidden text-ink-2 sm:block">{d.what}</span>
                      <Arrow className="text-ink-3 transition-all duration-500 ease-out-quint group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
