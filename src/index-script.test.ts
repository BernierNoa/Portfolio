import { readFileSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'

// Le script en tête de index.html s'exécute avant le premier rendu : on le teste tel quel, avec des faux globaux.
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const script = /<script>([\s\S]*?)<\/script>/.exec(html)?.[1]
if (!script) throw new Error('script inline introuvable dans index.html')

type Env = { path?: string; search?: string; hash?: string; stored?: Record<string, string>; dark?: boolean; brokenStorage?: boolean; lang?: string }

function run({ path = '/', search = '', hash = '', stored = {}, dark = false, brokenStorage = false, lang = 'en-US' }: Env = {}) {
  const root = { dataset: {} as Record<string, string> }
  const replace = vi.fn()
  const localStorage = {
    getItem: (k: string) => {
      if (brokenStorage) throw new Error('stockage bloqué')
      return stored[k] ?? null
    },
  }
  new Function('document', 'localStorage', 'matchMedia', 'location', 'navigator', 'URLSearchParams', script!)(
    { documentElement: root },
    localStorage,
    () => ({ matches: dark }),
    { pathname: path, search, hash, replace },
    { language: lang },
    URLSearchParams,
  )
  return { theme: root.dataset.theme, redirect: replace.mock.calls[0]?.[0] as string | undefined }
}

describe('script de thème (index.html)', () => {
  it('suit le système quand rien n’est choisi', () => {
    expect(run({ dark: true }).theme).toBe('dark')
    expect(run({ dark: false }).theme).toBe('light')
  })

  it('respecte le choix mémorisé, même contraire au système', () => {
    expect(run({ stored: { theme: 'light' }, dark: true }).theme).toBe('light')
    expect(run({ stored: { theme: 'dark' }, dark: false }).theme).toBe('dark')
  })

  it('ignore une valeur mémorisée invalide', () => {
    expect(run({ stored: { theme: 'sepia' }, dark: true }).theme).toBe('dark')
  })

  it('retombe sur clair sans planter quand le stockage est bloqué', () => {
    expect(run({ brokenStorage: true }).theme).toBe('light')
  })
})

describe('script de langue (index.html)', () => {
  it('ne redirige jamais d’après la langue du navigateur (les robots annoncent en-US)', () => {
    expect(run({ lang: 'en-US' }).redirect).toBeUndefined()
    expect(run({ lang: 'de-DE' }).redirect).toBeUndefined()
    expect(run({ lang: '' }).redirect).toBeUndefined()
  })

  it('redirige vers /en/ sur ?lang=en, en gardant les autres paramètres et l’ancre', () => {
    expect(run({ search: '?lang=en&utm=x', hash: '#stack' }).redirect).toBe('/en/?utm=x#stack')
    expect(run({ search: '?lang=en' }).redirect).toBe('/en/')
  })

  it('redirige vers /en/ quand l’anglais a été choisi avec le bouton', () => {
    expect(run({ stored: { lang: 'en' }, hash: '#contact' }).redirect).toBe('/en/#contact')
  })

  it('laisse ?lang=fr l’emporter sur un choix mémorisé en anglais', () => {
    expect(run({ search: '?lang=fr', stored: { lang: 'en' } }).redirect).toBeUndefined()
  })

  it('ne touche pas au français mémorisé', () => {
    expect(run({ stored: { lang: 'fr' } }).redirect).toBeUndefined()
  })

  it('ne redirige que depuis la racine (jamais sur /en/, pas de boucle)', () => {
    expect(run({ path: '/en/', stored: { lang: 'en' } }).redirect).toBeUndefined()
    expect(run({ path: '/en/', search: '?lang=en' }).redirect).toBeUndefined()
    expect(run({ path: '/autre', stored: { lang: 'en' } }).redirect).toBeUndefined()
  })

  it('ne plante pas quand le stockage est bloqué', () => {
    expect(() => run({ brokenStorage: true, search: '?lang=en' })).not.toThrow()
  })
})
