import { drawers, timeline } from '../content'
import { Arrow, Container, Grid, Reveal, SectionHead } from './ui'

export function Parcours() {
  return (
    <section id="parcours" className="pt-32 md:pt-44">
      <Container>
        <SectionHead n="04" label="Parcours" />

        <Grid className="mt-10 gap-y-16">
          <Reveal className="col-span-4 md:col-span-5">
            <h2 className="text-[clamp(2rem,4.2vw,3.75rem)] leading-[1] font-medium tracking-[-0.035em]">
              J'ai commencé pour de mauvaises raisons.
            </h2>
            <div className="mt-8 max-w-[34em] space-y-4 text-[1.0625rem] leading-[1.6] md:text-lg">
              <p>
                Des plugins Minecraft et un bot Discord pour La Garderie. Pas très sérieux, mais c'est là que j'ai compris
                que je pouvais fabriquer à peu près n'importe quel outil dont j'avais besoin. Ça a un peu dérapé depuis.
              </p>
              <p>
                Aujourd'hui je suis en BUT Informatique à l'IUT d'Amiens, en alternance chez Agisoft Engineering, et je
                passe une bonne partie de mon temps libre à construire des agents.
              </p>
              <p>
                La suite logique, c'est une école d'ingé pour me spécialiser en IA :{' '}
                <span className="font-serif text-[1.2em] italic">
                  apprendre proprement ce que j'ai jusqu'ici appris en bricolant.
                </span>
              </p>
            </div>
          </Reveal>

          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <ol>
              {timeline.map((t, i) => (
                <Reveal as="li" i={i} key={t.year} className="grid grid-cols-[5.5rem_1fr] border-t border-line py-5">
                  <span className={`label tabular-nums ${i === timeline.length - 1 ? 'text-signal' : 'text-ink'}`}>
                    {t.year}
                  </span>
                  <span className="text-[1.0625rem] leading-snug">{t.text}</span>
                </Reveal>
              ))}
            </ol>

            <Reveal className="mt-20">
              <p className="label mb-3 flex justify-between border-b border-ink pb-2 text-ink">
                <span>Dans les tiroirs</span>
                <a href="https://github.com/BernierNoa?tab=repositories" target="_blank" rel="noreferrer" className="link">
                  Tout voir sur GitHub
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
