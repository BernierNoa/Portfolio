import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { buildPage, buildSitemap, parseSiteUrl } from './prerender.mjs'

const template = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const meta = { title: 'Titre "test" & co', description: 'Une <description> à échapper', ogLocale: 'en_US' }
const page = (extra = {}) => buildPage({ template, lang: 'en', body: '<p>corps</p>', meta, ...extra })

describe('parseSiteUrl', () => {
  it('accepte une URL https et retire le "/" final', () => {
    expect(parseSiteUrl('https://exemple.fr/')).toBe('https://exemple.fr')
    expect(parseSiteUrl(' https://exemple.fr/portfolio/ ')).toBe('https://exemple.fr/portfolio')
  })

  it('renvoie une chaîne vide quand SITE_URL est absent (on ne devine rien)', () => {
    expect(parseSiteUrl(undefined)).toBe('')
    expect(parseSiteUrl('  ')).toBe('')
  })

  it('refuse http, les URL sans domaine et les valeurs douteuses', () => {
    for (const bad of ['http://exemple.fr', 'exemple.fr', 'https://', 'https://a b.fr', 'https://exemple.fr?x=1']) {
      expect(() => parseSiteUrl(bad), bad).toThrow(/SITE_URL invalide/)
    }
  })
})

describe('buildPage', () => {
  it('insère le corps dans #root et adapte langue, titre et méta (avec échappement)', () => {
    const html = page()
    expect(html).toContain('<div id="root"><p>corps</p></div>')
    expect(html).toContain('<html lang="en"')
    expect(html).toContain('<title>Titre &quot;test&quot; &amp; co</title>')
    expect(html).toContain('content="Une &lt;description> à échapper"')
    expect(html).toContain('og:locale" content="en_US"')
  })

  it('n’ajoute ni canonical ni hreflang sans SITE_URL', () => {
    const html = page()
    expect(html).not.toMatch(/rel="canonical"|hreflang|og:url/)
  })

  it('ajoute canonical, hreflang et og:url avec SITE_URL', () => {
    const html = page({ siteUrl: 'https://exemple.fr' })
    expect(html).toContain('<link rel="canonical" href="https://exemple.fr/en/" />')
    expect(html).toContain('hreflang="fr" href="https://exemple.fr/"')
    expect(html).toContain('hreflang="en" href="https://exemple.fr/en/"')
    expect(html).toContain('hreflang="x-default" href="https://exemple.fr/"')
    expect(html).toContain('<meta property="og:url" content="https://exemple.fr/en/" />')
  })

  it('échoue clairement si le gabarit ne contient plus #root', () => {
    expect(() => buildPage({ template: '<html lang="fr"><head></head></html>', lang: 'fr', body: '', meta })).toThrow(/introuvable/)
  })

  it('n’interprète pas les "$" du corps rendu', () => {
    const html = buildPage({ template, lang: 'fr', body: '<p>coûte $& et $1</p>', meta })
    expect(html).toContain('<p>coûte $& et $1</p>')
  })
})

describe('buildSitemap', () => {
  it('liste les deux pages avec leurs alternatives de langue', () => {
    const xml = buildSitemap('https://exemple.fr')
    expect(xml).toContain('<loc>https://exemple.fr/</loc>')
    expect(xml).toContain('<loc>https://exemple.fr/en/</loc>')
    expect((xml.match(/hreflang="x-default"/g) ?? []).length).toBe(2)
  })
})

// Vérifie le résultat réel de `npm run build` ; ignoré tant que dist/ n'existe pas (la CI construit avant de tester).
describe.skipIf(!existsSync(new URL('../dist/en/index.html', import.meta.url)))('pages générées (dist/)', () => {
  const read = (p) => readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8')
  const pages = { fr: read('index.html'), en: read('en/index.html') }
  const visibleText = (html) => html.replace(/<[^>]*>/g, '').replace(/&#x27;/g, "'")

  it('ont la bonne langue, le bon titre et le bon H1', () => {
    expect(pages.fr).toContain('<html lang="fr"')
    expect(pages.en).toContain('<html lang="en"')
    expect(pages.fr).toContain('agents IA et apps web</title>')
    expect(pages.en).toContain('AI agents and web apps</title>')
    expect(visibleText(pages.fr)).toContain("Je construis les outils dont j'ai besoin.")
    expect(visibleText(pages.en)).toContain('I build the tools I need.')
  })

  it('ne contiennent jamais l’adresse e-mail', () => {
    for (const html of Object.values(pages)) expect(html).not.toMatch(/berniernoa24|gmail|mailto:/i)
  })

  it('gardent le script de thème, le repli sans JavaScript et l’amorce d’hydratation', () => {
    for (const html of Object.values(pages)) {
      expect(html).toContain('dataset.theme')
      expect(html).toContain('<noscript>')
      expect(html).toMatch(/<script type="module"[^>]*src="\/assets\/index-/)
      expect(html).toMatch(/<div id="root"><a /)
    }
  })

  it('préchargent la police principale', () => {
    for (const html of Object.values(pages)) expect(html).toMatch(/rel="preload"[\s\S]*bricolage-grotesque-latin-standard/)
  })
})
