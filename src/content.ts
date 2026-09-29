// Tout le contenu éditable du site est ici.
// Les valeurs marquées TODO sont des placeholders à remplacer.

export const TODO = (label: string) => `[TODO: ${label}]`

// E-mail, LinkedIn et CV sont définis dans components/Contact.tsx
export const links = {
  github: 'https://github.com/BernierNoa',
}

export const isPlaceholder = (value: string) => value.startsWith('[TODO')

export type Project = {
  id: string
  name: string
  tagline: string
  year: string
  role: string
  status: string
  body: string[]
  highlights: string[]
  stack: string[]
  links: { label: string; href?: string; note?: string }[]
  artifact: 'log' | 'terminal' | 'story' | 'agents' | 'placeholder'
}

export type StackTier = { label: string; note: string; items: { name: string; refs?: string[] }[] }


export type Content = {
  projects: Project[]
  stack: StackTier[]
  timeline: { year: string; text: string }[]
  drawers: { name: string; what: string; href?: string }[]
}

export const pad = (n: number) => String(n).padStart(2, '0')
