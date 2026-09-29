// @vitest-environment jsdom
import { existsSync } from 'node:fs'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Lang } from '../i18n/context'
import { LangProvider } from '../i18n/LangProvider'
import { ui } from '../i18n/ui'
import { Contact } from './Contact'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

let container: HTMLDivElement
let root: Root

async function mount(lang: Lang = 'fr') {
  await act(async () => {
    root.render(
      <LangProvider lang={lang}>
        <Contact />
      </LangProvider>,
    )
  })
}

const copyButton = () => container.querySelector<HTMLButtonElement>('#contact button')!
const setClipboard = (writeText?: () => Promise<void>) =>
  Object.defineProperty(navigator, 'clipboard', { value: writeText ? { writeText } : undefined, configurable: true })

beforeEach(() => {
  vi.useFakeTimers()
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
})

afterEach(async () => {
  await act(async () => root.unmount())
  container.remove()
  vi.useRealTimers()
})

describe('bouton Copier', () => {
  it('copie l’adresse et affiche « Copié ✓ », puis revient à « Copier »', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    setClipboard(writeText)
    await mount()
    expect(copyButton().textContent).toContain(ui.fr.contact.copy)

    await act(async () => copyButton().click())
    expect(writeText).toHaveBeenCalledWith('berniernoa24@gmail.com')
    expect(copyButton().textContent).toContain(ui.fr.contact.copied)

    await act(async () => void vi.advanceTimersByTime(2000))
    expect(copyButton().textContent).toContain(ui.fr.contact.copy)
  })

  it('affiche le message d’échec quand la permission est refusée, sans erreur', async () => {
    setClipboard(vi.fn().mockRejectedValue(new DOMException('denied', 'NotAllowedError')))
    await mount()
    await act(async () => copyButton().click())
    expect(copyButton().textContent).toContain(ui.fr.contact.failed)
    expect(copyButton().textContent).not.toContain(ui.fr.contact.copied)
  })

  it('affiche le message d’échec quand navigator.clipboard n’existe pas (contexte non sécurisé)', async () => {
    setClipboard(undefined)
    await mount()
    await act(async () => copyButton().click())
    expect(copyButton().textContent).toContain(ui.fr.contact.failed)
  })

  it('garde une région aria-live pour annoncer l’état', async () => {
    setClipboard(vi.fn().mockResolvedValue(undefined))
    await mount()
    expect(copyButton().querySelector('[aria-live="polite"]')).not.toBeNull()
  })

  it('parle anglais sur la page anglaise', async () => {
    setClipboard(vi.fn().mockResolvedValue(undefined))
    await mount('en')
    await act(async () => copyButton().click())
    expect(copyButton().textContent).toContain(ui.en.contact.copied)
  })
})

describe('liens de contact', () => {
  it('affiche l’adresse dans un lien mailto: une fois monté', async () => {
    await mount()
    const mail = container.querySelector<HTMLAnchorElement>('a[href^="mailto:"]')
    expect(mail?.getAttribute('href')).toBe('mailto:berniernoa24@gmail.com')
    expect(mail?.textContent).toBe('berniernoa24@gmail.com')
  })

  it('ouvre GitHub et LinkedIn dans un nouvel onglet, avec noopener noreferrer', async () => {
    await mount()
    const external = [...container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')]
    expect(external.map((a) => new URL(a.href).hostname)).toEqual(['github.com', 'www.linkedin.com'])
    for (const a of external) expect(a.rel.split(' ').sort()).toEqual(['noopener', 'noreferrer'])
  })

  it('n’affiche aucun [TODO] dans la section contact', async () => {
    await mount()
    expect(container.textContent).not.toContain('TODO')
  })

  it('ne propose un lien de CV que si le PDF existe dans public/', async () => {
    await mount()
    const cv = container.querySelector('a[download]')
    if (cv) expect(existsSync(new URL('../../public/cv-noa-bernier.pdf', import.meta.url))).toBe(true)
    else expect(cv).toBeNull()
  })

  it('garde le pied de page « © année Noa Bernier · Retour en haut »', async () => {
    await mount()
    expect(container.textContent).toContain(`© ${new Date().getFullYear()} Noa Bernier`)
    expect(container.querySelector('a[href="#intro"]')?.textContent).toBe(ui.fr.contact.top)
  })
})
