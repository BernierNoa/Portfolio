import { describe, expect, it } from 'vitest'
import { metaFor, render } from './entry-server'
import { ui } from './i18n/ui'

// Le rendu serveur est ce qui finit dans le HTML statique : c'est ce que voient robots et visiteurs sans JS.
const pages = { fr: render('fr'), en: render('en') }

/** Texte visible : sans balises, entités décodées (le H1 est découpé mot par mot dans des <span>). */
const visibleText = (html: string) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')

describe('rendu serveur', () => {
  it('produit la page française et la page anglaise', () => {
    const text = { fr: visibleText(pages.fr), en: visibleText(pages.en) }
    expect(text.fr).toContain("Je construis les outils dont j'ai besoin.")
    expect(text.en).toContain('I build the tools I need.')
    expect(text.fr).not.toContain('I build the tools I need.')
    expect(text.en).not.toContain('Je construis')
  })

  it('contient les cinq projets et les cinq sections dans chaque langue', () => {
    for (const html of Object.values(pages)) {
      for (const id of ['intro', 'projets', 'stack', 'parcours', 'contact']) expect(html).toContain(`id="${id}"`)
      for (const name of ['ElevenLogs', 'talos', 'Storyfy', 'Olympe', 'PronoGoat']) expect(html).toContain(name)
      expect((html.match(/<article/g) ?? []).length).toBe(5)
    }
  })

  it('n’écrit jamais l’adresse e-mail dans le HTML (anti-scraping)', () => {
    for (const html of Object.values(pages)) {
      expect(html).not.toMatch(/berniernoa24|gmail|mailto:/i)
    }
  })

  it('utilise des textes neutres pour ce qui dépend du navigateur (horloge, thème)', () => {
    for (const html of Object.values(pages)) expect(html).toContain('--:--:--')
  })

  it('propose un vrai lien vers l’autre langue', () => {
    expect(pages.fr).toMatch(/<a href="\/en\/" hrefLang="en"/)
    expect(pages.en).toMatch(/<a href="\/" hrefLang="fr"/)
  })

  it('expose titre et description propres à chaque langue', () => {
    expect(metaFor('fr')).toBe(ui.fr.meta)
    expect(metaFor('en').title).toBe(ui.en.meta.title)
  })
})
