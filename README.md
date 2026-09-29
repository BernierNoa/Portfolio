# Portfolio — Noa Bernier

Site perso, une seule page. React + Vite + TypeScript + Tailwind v4.

```bash
npm install
npm run dev      # dev server
npm run build    # tsc + build de prod + pré-rendu FR/EN dans dist/
npm test         # tests (Vitest) ; lance-les après `npm run build` pour tester aussi dist/
npm run lint     # oxlint
```

## Où modifier quoi

- **Projets, stack, parcours, liens « tiroirs »** : `src/content.fr.ts` (français) et `src/content.en.ts` (anglais, mêmes ids). Les types sont dans `src/content.ts`.
- **Textes de l'interface** (titres, boutons, légendes, méta) : `src/i18n/ui.ts`, français et anglais côte à côte. Une clé absente d'une langue fait échouer le build.
- **Lien GitHub** : `src/content.ts`. E-mail, LinkedIn et CV : constantes en haut de `src/components/Contact.tsx` (le lien CV reste masqué tant que `CV_READY` est à `false`, à passer à `true` une fois `public/cv-noa-bernier.pdf` ajouté).
- Les valeurs `TODO(...)` s'affichent
  en orange pointillé sur le site tant qu'elles ne sont pas remplies.
- **Couleurs, polices, utilitaires** (`label`, `link`, animations) : `src/index.css`.
- **Sections** : `src/components/` (Hero, Projects, Stack, Parcours, Contact, TopBar).
- **Visuels des projets** (log de match, terminal talos, Storyfy, routage Olympe) : `src/components/artifacts.tsx`.

## Pré-rendu, langue et thème

Le site est pré-rendu au build : `npm run build` produit **deux pages HTML complètes**, `dist/index.html` (français, servie sur `/`) et `dist/en/index.html` (anglais, servie sur `/en/`). Le navigateur les hydrate ensuite avec React. Les robots, les aperçus de liens et les visiteurs sans JavaScript voient donc le vrai contenu dans les deux langues. Le build enchaîne `vite build`, `vite build --ssr` (dans `dist-ssr/`, ignoré par git) puis `scripts/prerender.mjs`.

- **Langue** : portée par l'URL (`/` = français, `/en/` = anglais). Le bouton FR/EN de la barre du haut est un vrai lien vers l'autre page : il garde la section en cours et mémorise le choix. Un visiteur qui a choisi l'anglais (ou qui ouvre `/?lang=en`) est renvoyé de `/` vers `/en/`. **La langue du navigateur ne déclenche aucune redirection** : les robots annoncent souvent « en-US » et ne doivent pas être détournés de la page française.
- **Adresse de production** : à renseigner au build avec la variable `SITE_URL` (ex. `SITE_URL=https://exemple.fr npm run build`, ou variable d'environnement de l'hébergeur). Elle ajoute alors `canonical`, `hreflang`, `og:url`, `sitemap.xml` et la ligne `Sitemap:` de `robots.txt`. Sans elle, rien de tout ça n'est écrit : on ne devine pas l'adresse.
- **E-mail** : il n'est jamais dans le HTML pré-rendu, il est assemblé par le navigateur après l'hydratation (anti-scraping).
- **Thème** : choix mémorisé (bouton de la barre du haut), sinon le réglage du système. Un petit script de `index.html` le pose avant le premier rendu pour éviter l'éclair clair. Les couleurs sombres sont des jetons dans `src/index.css` (`:root[data-theme='dark']`).
- **Écrire du code compatible pré-rendu** : rien qui dépende de `window`, `document` ou de l'heure au premier rendu (sinon erreur d'hydratation). Pour une valeur propre au navigateur, utiliser `useSyncExternalStore` avec un `getServerSnapshot` neutre (voir `src/hooks.ts`).
- **Hébergement** : il doit servir `dist/en/index.html` sur `/en/` (c'est le cas de Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Tests

`npm test` (Vitest) vérifie : la parité FR/EN des textes et du contenu, le script de thème et de redirection de `index.html`, le bouton Copier (succès, refus, contexte non sécurisé), le rendu serveur, le pré-rendu (`scripts/prerender.mjs`) et, si `dist/` existe, les pages générées (langue, titre, absence de l'e-mail). La CI les lance après le build.

## Direction

Papier cassé, encre, un seul accent (vermillon `#FF4A1C`). Bricolage Grotesque pour la voix, JetBrains Mono
pour la structure, Instrument Serif en italique pour quelques mots seulement. Grille 12 colonnes, filets fins,
numérotation §. Les animations respectent `prefers-reduced-motion`.
