// Pré-rendu statique : après `vite build` (client) et `vite build --ssr` (dist-ssr), produit
//   dist/index.html     → page française, servie sur /
//   dist/en/index.html  → page anglaise, servie sur /en/
// Le HTML de chaque page contient déjà tout le contenu ; le client l'hydrate.
//
// SITE_URL (optionnel, ex. https://exemple.fr) : ajoute canonical, hreflang, og:url et sitemap.xml.
// Sans SITE_URL rien de tout ça n'est écrit : on ne devine pas l'adresse de production.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export const LANGS = ['fr', 'en']
export const pathFor = (lang) => (lang === 'en' ? '/en/' : '/')

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Normalise SITE_URL : https obligatoire, sans "/" final. Renvoie '' si absent. */
export function parseSiteUrl(raw) {
  const value = (raw ?? '').trim()
  if (!value) return ''
  if (!/^https:\/\/[^\s/?#]+(\/[^\s?#]*)?$/.test(value)) {
    throw new Error(`SITE_URL invalide (attendu : https://domaine[/chemin]) : ${value}`)
  }
  return value.replace(/\/+$/, '')
}

function replaceOnce(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`prerender : ${what} introuvable dans index.html`)
  return html.replace(pattern, replacement)
}

/** Insère le corps rendu et adapte l'en-tête (langue, titre, méta, liens alternatifs) pour une page. */
export function buildPage({ template, lang, body, meta, siteUrl = '' }) {
  let html = template
  html = replaceOnce(html, /<html lang="[^"]*"/, `<html lang="${lang}"`, '<html lang>')
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`, '<title>')
  const setMeta = (attr, name, value) =>
    (html = replaceOnce(
      html,
      new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`),
      (_, a, b) => `${a}${escapeAttr(value)}${b}`,
      `meta ${name}`,
    ))
  setMeta('name', 'description', meta.description)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:locale', meta.ogLocale)

  if (siteUrl) {
    const url = (l) => `${siteUrl}${pathFor(l)}`
    const tags = [
      `<link rel="canonical" href="${url(lang)}" />`,
      ...LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${url(l)}" />`),
      `<link rel="alternate" hreflang="x-default" href="${url('fr')}" />`,
      `<meta property="og:url" content="${url(lang)}" />`,
    ]
    html = replaceOnce(html, /<\/head>/, `    ${tags.join('\n    ')}\n  </head>`, '</head>')
  }

  return replaceOnce(html, /<div id="root"><\/div>/, () => `<div id="root">${body}</div>`, '<div id="root">')
}

export function buildSitemap(siteUrl) {
  const url = (l) => `${siteUrl}${pathFor(l)}`
  const alternates = [...LANGS.map((l) => [l, url(l)]), ['x-default', url('fr')]]
    .map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}" />`)
    .join('\n')
  const entries = LANGS.map((l) => `  <url>\n    <loc>${url(l)}</loc>\n${alternates}\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`
}

async function main() {
  const dist = resolve('dist')
  const ssrEntry = resolve('dist-ssr/entry-server.js')
  if (!existsSync(resolve(dist, 'index.html')) || !existsSync(ssrEntry)) {
    throw new Error('prerender : lance d’abord `vite build` puis `vite build --ssr src/entry-server.tsx --outDir dist-ssr`')
  }
  const siteUrl = parseSiteUrl(process.env.SITE_URL)
  const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
  const { render, metaFor } = await import(pathToFileURL(ssrEntry).href)

  for (const lang of LANGS) {
    const html = buildPage({ template, lang, body: render(lang), meta: metaFor(lang), siteUrl })
    const file = resolve(dist, pathFor(lang).slice(1), 'index.html')
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
    console.log(`prerender : ${pathFor(lang)} → ${file.replace(process.cwd() + '/', '')} (${(html.length / 1024).toFixed(1)} Ko)`)
  }

  if (siteUrl) {
    writeFileSync(resolve(dist, 'sitemap.xml'), buildSitemap(siteUrl))
    const robots = resolve(dist, 'robots.txt')
    const current = existsSync(robots) ? readFileSync(robots, 'utf8').replace(/\s*$/, '\n') : 'User-agent: *\nAllow: /\n'
    writeFileSync(robots, `${current}\nSitemap: ${siteUrl}/sitemap.xml\n`)
    console.log(`prerender : canonical, hreflang, og:url et sitemap.xml pour ${siteUrl}`)
  } else {
    console.log('prerender : SITE_URL absent, ni canonical ni hreflang ni sitemap (voir README)')
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
}
