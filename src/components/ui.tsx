import type { CSSProperties, ElementType, ReactNode } from 'react'
import { isPlaceholder } from '../content'
import { useInView } from '../hooks'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 md:px-10 ${className}`}>{children}</div>
}

export function Grid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-6 ${className}`}>{children}</div>
}

export function Reveal({
  children,
  as: Tag = 'div',
  i = 0,
  className = '',
}: {
  children: ReactNode
  as?: ElementType
  i?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} data-in={inView} className={`reveal ${className}`} style={{ '--i': i } as CSSProperties}>
      {children}
    </Tag>
  )
}

/** En-tête de section : filet, numéro de paragraphe, titre courant. */
export function SectionHead({ n, label, aside }: { n: string; label: string; aside?: string }) {
  return (
    <Grid className="border-t border-ink pt-3">
      <span className="label col-span-1 text-ink md:col-span-2">§{n}</span>
      <span className="label col-span-2 text-ink md:col-span-4">{label}</span>
      {aside && <span className="label col-span-1 text-right md:col-span-6">{aside}</span>}
    </Grid>
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`inline-block size-[0.8em] ${className}`}>
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Rend un placeholder [TODO: …] bien visible pour ne pas l'oublier. */
export function Text({ value, className = '' }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) return <>{value}</>
  return (
    <span
      className={`rounded-[2px] border border-dashed border-signal px-1.5 font-mono text-[0.8em] tracking-normal text-signal ${className}`}
    >
      {value}
    </span>
  )
}

