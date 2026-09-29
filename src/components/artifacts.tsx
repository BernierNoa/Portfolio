import { useEffect, useState, type ReactNode } from 'react'
import type { Project } from '../content'
import { useInView, usePrefersReducedMotion } from '../hooks'

function Figure({ n, caption, children }: { n: string; caption: string; children: ReactNode }) {
  return (
    <figure>
      {children}
      <figcaption className="label mt-3 flex gap-3 normal-case tracking-normal">
        <span className="uppercase tracking-[0.04em] text-ink">fig. {n}</span>
        <span className="font-sans text-[0.8125rem]">{caption}</span>
      </figcaption>
    </figure>
  )
}

/* ─── ElevenLogs : un log de match qu'on peut noter ─────────────────────── */

function MatchLog() {
  const [rating, setRating] = useState(4)
  const [hover, setHover] = useState<number | null>(null)
  const shown = hover ?? rating

  return (
    <div className="border border-line bg-white p-5 md:p-6">
      <div className="label flex justify-between">
        <span>Ligue 2 · J8</span>
        <span>Vu en direct</span>
      </div>

      <div className="mt-5 space-y-1 text-2xl font-medium tracking-[-0.02em] tabular-nums md:text-3xl">
        <p className="flex justify-between">
          Amiens SC <span>2</span>
        </p>
        <p className="flex justify-between text-ink-3">
          Grenoble <span>1</span>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4">
        <div>
          <p className="label">Ta note</p>
          <div className="mt-2 flex gap-1.5" onMouseLeave={() => setHover(null)}>
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                type="button"
                aria-label={`Noter ${v} sur 5`}
                aria-pressed={rating === v}
                onMouseEnter={() => setHover(v)}
                onFocus={() => setHover(v)}
                onBlur={() => setHover(null)}
                onClick={() => setRating(v)}
                className="group/dot p-0.5"
              >
                <span
                  className={`block size-3.5 rounded-full border transition-all duration-300 ease-out-quint group-active/dot:scale-75 ${
                    v <= shown ? 'border-signal bg-signal' : 'border-ink-3 bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="label">Homme du match</p>
          <p className="mt-1.5 font-mono text-sm">N°10</p>
        </div>
      </div>

      <p className="mt-5 font-serif text-xl leading-snug text-ink-2 italic">
        « Un match à l'ancienne, ça se joue dans les dix dernières minutes. »
      </p>
      <p className="label mt-4">3 potes l'ont aussi loggé</p>
    </div>
  )
}

/* ─── talos : une session qui se tape toute seule ──────────────────────── */

type Line = { kind: 'cmd' | 'out' | 'dim' | 'tool'; text: string }

const session: Line[] = [
  { kind: 'dim', text: 'Talos — harness personnel' },
  { kind: 'dim', text: 'Tape /help pour afficher les commandes.' },
  { kind: 'cmd', text: "Analyse les fichiers TypeScript et explique le rôle du point d'entrée." },
  { kind: 'tool', text: '[outil] list_files .' },
  { kind: 'tool', text: '[outil] read_file src/index.ts' },
  { kind: 'tool', text: '[outil] read_file src/greeter.ts' },
  { kind: 'out', text: 'Le point d’entrée est src/index.ts : il…' },
  { kind: 'cmd', text: '/apply <id>' },
  { kind: 'out', text: 'Appliquer ce patch ? (yes/no)' },
]

function Terminal() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [line, setLine] = useState(reduced ? session.length : 0)
  const [char, setChar] = useState(0)

  useEffect(() => {
    if (!inView || line >= session.length) return
    const current = session[line]
    if (current.kind === 'cmd' && char < current.text.length) {
      const t = setTimeout(() => setChar((c) => c + 1), 22 + Math.random() * 40)
      return () => clearTimeout(t)
    }
    const pause = current.kind === 'cmd' ? 380 : current.kind === 'tool' ? 260 : 520
    const t = setTimeout(() => {
      setLine((l) => l + 1)
      setChar(0)
    }, pause)
    return () => clearTimeout(t)
  }, [inView, line, char])

  const done = line >= session.length

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Exemple de session talos"
      className="min-h-[21rem] bg-ink p-5 font-mono text-[0.78rem] leading-relaxed text-paper md:p-6"
    >
      <div className="mb-4 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-paper/20" />
        ))}
      </div>
      {session.slice(0, Math.min(line + 1, session.length)).map((l, i) => {
        const typing = i === line && !done
        if (l.kind === 'cmd') {
          const text = typing ? l.text.slice(0, char) : l.text
          return (
            <p key={i} className="mt-3">
              <span className="text-signal">talos&gt; </span>
              {text}
              {typing && <span className="caret">▍</span>}
            </p>
          )
        }
        if (typing) return null
        const tone = l.kind === 'dim' ? 'text-paper/45' : l.kind === 'tool' ? 'text-paper/60' : 'text-paper'
        return (
          <p key={i} className={tone}>
            {l.text}
            {done && i === session.length - 1 && <span className="caret ml-1">▍</span>}
          </p>
        )
      })}
    </div>
  )
}

/* ─── Storyfy : paramètres → début d'histoire ──────────────────────────── */

const stories = [
  {
    params: [
      ['Thème', 'une forêt, la nuit'],
      ['Perso', 'un renard insomniaque'],
      ['Ton', 'doux'],
    ],
    text: "Il était une fois un renard qui connaissait chaque étoile par son prénom, parce qu'il n'avait jamais réussi à dormir…",
  },
  {
    params: [
      ['Thème', 'la mer'],
      ['Perso', 'un phare qui a peur du noir'],
      ['Ton', 'drôle'],
    ],
    text: 'Pour un phare, avoir peur du noir, c’est franchement mal tombé. Et pourtant, chaque soir à 19 h…',
  },
  {
    params: [
      ['Thème', 'l’espace'],
      ['Perso', 'une astronaute de 8 ans'],
      ['Ton', 'aventure'],
    ],
    text: 'Le compte à rebours affichait 3, 2, 1… et Lina réalisa qu’elle avait oublié son doudou sur Terre.',
  },
]

function Story() {
  const [i, setI] = useState(0)
  const s = stories[i]

  return (
    <div className="border border-line bg-white p-5 md:p-6">
      <dl className="space-y-2">
        {s.params.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5rem_1fr] items-baseline border-b border-line pb-2">
            <dt className="label">{k}</dt>
            <dd className="text-[0.95rem]">{v}</dd>
          </div>
        ))}
      </dl>
      <p key={i} className="story-in mt-5 min-h-[6.5rem] font-serif text-[1.35rem] leading-snug italic">
        {s.text}
      </p>
      <button
        type="button"
        onClick={() => setI((n) => (n + 1) % stories.length)}
        className="label group mt-4 inline-flex items-center gap-2 border border-ink px-3 py-2 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
      >
        Autre histoire
        <span className="transition-transform duration-500 ease-out-quint group-hover:rotate-180">↻</span>
      </button>
    </div>
  )
}

/* ─── Olympe : le routage d'Ouranos, en direct ─────────────────────────── */

const agents = [
  { id: 'athena', name: 'Athéna', role: 'mes projets perso' },
  { id: 'iris', name: 'Iris', role: 'mails, agenda, Notion' },
  { id: 'helios', name: 'Helios', role: 'admin du NAS' },
  { id: 'promethee', name: 'Prométhée', role: 'tâches de dev → PR' },
  { id: 'pheme', name: 'Phémé', role: 'contenu réseaux' },
  { id: 'ploutos', name: 'Ploutos', role: 'pas encore réveillé' },
]

const messages = [
  { text: 'lance une sauvegarde', to: 'helios' },
  { text: 'athena: je priorise quoi cette semaine ?', to: 'athena' },
  { text: 'iris: résume mes mails du jour', to: 'iris' },
  { text: 'approve 12', to: 'promethee' },
  { text: 'un post pour la sortie de la v2', to: 'pheme' },
]

function Agents() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [m, setM] = useState(0)
  const [paused, setPaused] = useState<string | null>(null)

  useEffect(() => {
    if (!inView || reduced || paused) return
    const t = setInterval(() => setM((x) => (x + 1) % messages.length), 2600)
    return () => clearInterval(t)
  }, [inView, reduced, paused])

  const target = paused ?? messages[m].to

  return (
    <div ref={ref} className="border border-line bg-white p-5 md:p-6">
      <p className="label">Telegram</p>
      <p key={paused ? 'paused' : m} className="story-in mt-1 min-h-7 font-mono text-sm">
        {paused ? '·' : `« ${messages[m].text} »`}
      </p>

      <div className="mt-4 flex items-baseline justify-between border-y border-ink py-2">
        <span className="text-lg font-medium">Ouranos</span>
        <span className="label">orchestrateur</span>
      </div>

      <ul className="relative ml-2 border-l border-line" onMouseLeave={() => setPaused(null)}>
        {agents.map((a) => {
          const on = a.id === target
          return (
            <li
              key={a.id}
              onMouseEnter={() => setPaused(a.id)}
              className="relative flex items-baseline justify-between py-2 pl-5"
            >
              <span
                aria-hidden
                className={`absolute top-1/2 left-0 h-px origin-left transition-all duration-500 ease-out-quint ${
                  on ? 'w-4 bg-signal' : 'w-2.5 bg-line'
                }`}
              />
              <span
                className={`transition-colors duration-300 ${on ? 'text-ink' : 'text-ink-3'} ${
                  a.id === 'ploutos' ? 'italic' : ''
                }`}
              >
                {a.name}
              </span>
              <span className={`label transition-colors duration-300 ${on ? 'text-ink' : ''}`}>{a.role}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function PlaceholderVisual() {
  return (
    <div className="grid aspect-[4/3] place-items-center border border-dashed border-signal p-6 text-center">
      <p className="label text-signal">[TODO: visuel PronoGoat, capture ou artefact]</p>
    </div>
  )
}

export function Artifact({ kind, n }: { kind: Project['artifact']; n: string }) {
  switch (kind) {
    case 'log':
      return (
        <Figure n={n} caption="Un log de match (maquette). Tu peux le noter.">
          <MatchLog />
        </Figure>
      )
    case 'terminal':
      return (
        <Figure n={n} caption="Une session type, sorties reprises du README.">
          <Terminal />
        </Figure>
      )
    case 'story':
      return (
        <Figure n={n} caption="Paramètres → début d'histoire (textes d'exemple).">
          <Story />
        </Figure>
      )
    case 'agents':
      return (
        <Figure n={n} caption="Qui reçoit quoi. Survole un agent pour figer le routage.">
          <Agents />
        </Figure>
      )
    case 'placeholder':
      return (
        <Figure n={n} caption="À venir.">
          <PlaceholderVisual />
        </Figure>
      )
  }
}
