import { useEffect, useState, type ReactNode } from 'react'
import type { Project } from '../content'
import { useLang } from '../i18n/context'
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
  const { t } = useLang()
  const l = t.art.log
  const [rating, setRating] = useState(4)
  const [hover, setHover] = useState<number | null>(null)
  const shown = hover ?? rating

  return (
    <div className="border border-line bg-card p-5 md:p-6">
      <div className="label flex justify-between">
        <span>{l.league}</span>
        <span>{l.live}</span>
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
          <p className="label">{l.rating}</p>
          <div className="mt-2 flex gap-1.5" onMouseLeave={() => setHover(null)}>
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                type="button"
                aria-label={l.rate(v)}
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
          <p className="label">{l.motm}</p>
          <p className="mt-1.5 font-mono text-sm">{l.motmValue}</p>
        </div>
      </div>

      <p className="mt-5 font-serif text-xl leading-snug text-ink-2 italic">
        {l.quote}
      </p>
      <p className="label mt-4">{l.friends}</p>
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
  const { t } = useLang()
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
      aria-label={t.art.terminalLabel}
      className="min-h-[21rem] bg-term p-5 font-mono text-[0.78rem] leading-relaxed text-term-fg shadow-[0_0_0_1px_var(--color-term-edge)] md:p-6"
    >
      <div className="mb-4 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-term-fg/20" />
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
        const tone = l.kind === 'dim' ? 'text-term-fg/45' : l.kind === 'tool' ? 'text-term-fg/60' : 'text-term-fg'
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

function Story() {
  const { t } = useLang()
  const { items, another } = t.art.stories
  const [i, setI] = useState(0)
  const s = items[i]

  return (
    <div className="border border-line bg-card p-5 md:p-6">
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
        onClick={() => setI((n) => (n + 1) % items.length)}
        className="label group mt-4 inline-flex items-center gap-2 border border-ink px-3 py-2 text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
      >
        {another}
        <span className="transition-transform duration-500 ease-out-quint group-hover:rotate-180">↻</span>
      </button>
    </div>
  )
}

/* ─── Olympe : le routage d'Ouranos, en direct ─────────────────────────── */

function Agents() {
  const { t } = useLang()
  const { list: agents, messages, orchestrator } = t.art.agents
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [m, setM] = useState(0)
  const [paused, setPaused] = useState<string | null>(null)

  useEffect(() => {
    if (!inView || reduced || paused) return
    const id = setInterval(() => setM((x) => (x + 1) % messages.length), 2600)
    return () => clearInterval(id)
  }, [inView, reduced, paused, messages.length])

  const target = paused ?? messages[m].to

  return (
    <div ref={ref} className="border border-line bg-card p-5 md:p-6">
      <p className="label">Telegram</p>
      <p key={paused ? 'paused' : m} className="story-in mt-1 min-h-7 font-mono text-sm">
        {paused ? '·' : `« ${messages[m].text} »`}
      </p>

      <div className="mt-4 flex items-baseline justify-between border-y border-ink py-2">
        <span className="text-lg font-medium">Ouranos</span>
        <span className="label">{orchestrator}</span>
      </div>

      <ul className="relative ml-2 border-l border-line" onMouseLeave={() => setPaused(null)}>
        {agents.map((a) => {
          const on = a.id === target
          return (
            <li
              key={a.id}
              tabIndex={0}
              onMouseEnter={() => setPaused(a.id)}
              onFocus={() => setPaused(a.id)}
              onBlur={() => setPaused(null)}
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
  const { t } = useLang()
  const cap = t.art.captions
  switch (kind) {
    case 'log':
      return (
        <Figure n={n} caption={cap.log}>
          <MatchLog />
        </Figure>
      )
    case 'terminal':
      return (
        <Figure n={n} caption={cap.terminal}>
          <Terminal />
        </Figure>
      )
    case 'story':
      return (
        <Figure n={n} caption={cap.story}>
          <Story />
        </Figure>
      )
    case 'agents':
      return (
        <Figure n={n} caption={cap.agents}>
          <Agents />
        </Figure>
      )
    case 'placeholder':
      return (
        <Figure n={n} caption={cap.placeholder}>
          <PlaceholderVisual />
        </Figure>
      )
  }
}
