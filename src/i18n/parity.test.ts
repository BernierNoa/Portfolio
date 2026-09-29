import { describe, expect, it } from 'vitest'
import { contentEn } from '../content.en'
import { contentFr } from '../content.fr'
import { ui } from './ui'

/** Chemins de toutes les feuilles d'un objet (les tableaux sont indexés, les fonctions sont des feuilles). */
function paths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => paths(v, `${prefix}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k))
  }
  return [prefix]
}

const strings = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.flatMap(strings)
    : value && typeof value === 'object'
      ? Object.values(value).flatMap(strings)
      : typeof value === 'string'
        ? [value]
        : []

describe('textes de l’interface (ui.ts)', () => {
  it('ont exactement les mêmes clés en français et en anglais', () => {
    expect(paths(ui.en)).toEqual(paths(ui.fr))
  })

  it('n’ont aucune valeur vide', () => {
    for (const lang of ['fr', 'en'] as const) {
      expect(strings(ui[lang]).filter((s) => s.trim() === ''), lang).toEqual([])
    }
  })

  it('ne contiennent aucun [TODO] (le contact et l’interface sont terminés)', () => {
    for (const lang of ['fr', 'en'] as const) {
      expect(strings(ui[lang]).filter((s) => s.includes('[TODO')), lang).toEqual([])
    }
  })

  it('sont réellement traduits (titre, description, accroche)', () => {
    expect(ui.en.meta.title).not.toBe(ui.fr.meta.title)
    expect(ui.en.meta.description).not.toBe(ui.fr.meta.description)
    expect(ui.en.hero.h1.first).not.toBe(ui.fr.hero.h1.first)
    expect(ui.en.contact.lead).not.toBe(ui.fr.contact.lead)
  })

  it('indiquent la langue cible sur le bouton de bascule', () => {
    expect(ui.fr.controls.langCode).toBe('en')
    expect(ui.en.controls.langCode).toBe('fr')
  })

  it('routent les messages d’Olympe vers des agents qui existent', () => {
    for (const lang of ['fr', 'en'] as const) {
      const ids = ui[lang].art.agents.list.map((a) => a.id)
      for (const m of ui[lang].art.agents.messages) expect(ids, `${lang}: ${m.text}`).toContain(m.to)
    }
    expect(ui.en.art.agents.messages.map((m) => m.to)).toEqual(ui.fr.art.agents.messages.map((m) => m.to))
  })
})

describe('contenu (content.fr.ts / content.en.ts)', () => {
  it('a les mêmes projets, dans le même ordre, avec les mêmes visuels', () => {
    expect(contentEn.projects.map((p) => [p.id, p.name, p.artifact])).toEqual(
      contentFr.projects.map((p) => [p.id, p.name, p.artifact]),
    )
  })

  it('a les mêmes années, stacks, liens (adresses) et nombre de points par projet', () => {
    contentFr.projects.forEach((fr, i) => {
      const en = contentEn.projects[i]
      expect(en.year, fr.id).toBe(fr.year)
      expect(en.stack, fr.id).toEqual(fr.stack)
      expect(en.links.map((l) => l.href), fr.id).toEqual(fr.links.map((l) => l.href))
      expect(en.body.length, fr.id).toBe(fr.body.length)
      expect(en.highlights.length, fr.id).toBe(fr.highlights.length)
    })
  })

  it('a la même stack : mêmes technos et mêmes renvois vers des projets existants', () => {
    const ids = contentFr.projects.map((p) => p.id)
    for (const c of [contentFr, contentEn]) {
      for (const tier of c.stack) for (const item of tier.items) for (const ref of item.refs ?? []) expect(ids).toContain(ref)
    }
    // les noms traduits mis à part, la structure et les renvois sont identiques
    expect(contentEn.stack.map((t) => t.items.map((i) => i.refs ?? []))).toEqual(
      contentFr.stack.map((t) => t.items.map((i) => i.refs ?? [])),
    )
    expect(contentEn.stack.map((t) => t.items.length)).toEqual(contentFr.stack.map((t) => t.items.length))
  })

  it('a la même frise et les mêmes « tiroirs » (noms et adresses)', () => {
    expect(contentEn.timeline.length).toBe(contentFr.timeline.length)
    expect(contentEn.timeline.slice(0, -1).map((t) => t.year)).toEqual(contentFr.timeline.slice(0, -1).map((t) => t.year))
    expect(contentEn.drawers.map((d) => [d.name, d.href])).toEqual(contentFr.drawers.map((d) => [d.name, d.href]))
  })

  it('ne laisse un [TODO] que dans PronoGoat, et dans les deux langues', () => {
    for (const c of [contentFr, contentEn]) {
      const withTodo = c.projects.filter((p) => strings(p).some((s) => s.includes('[TODO')))
      expect(withTodo.map((p) => p.id)).toEqual(['pronogoat'])
    }
  })
})
