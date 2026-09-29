# Portfolio — Noa Bernier

Site perso, une seule page. React + Vite + TypeScript + Tailwind v4.

```bash
npm install
npm run dev      # dev server
npm run build    # tsc + build de prod dans dist/
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

## Langue et thème

- Langue : `?lang=en` ou `?lang=fr` dans l'URL, sinon le choix mémorisé (bouton FR/EN de la barre du haut), sinon la langue du navigateur (français, ou anglais pour toute autre langue). `<html lang>`, `<title>` et les méta suivent la langue.
- Thème : choix mémorisé (bouton de la barre du haut), sinon le réglage du système. Le thème est posé par un petit script de `index.html` avant le premier rendu pour éviter l'éclair clair. Les couleurs sombres sont des jetons dans `src/index.css` (`:root[data-theme='dark']`).
- Le contenu est rendu côté client : les robots qui n'exécutent pas le JavaScript ne voient que le `<title>` et les méta français de `index.html`.

## Direction

Papier cassé, encre, un seul accent (vermillon `#FF4A1C`). Bricolage Grotesque pour la voix, JetBrains Mono
pour la structure, Instrument Serif en italique pour quelques mots seulement. Grille 12 colonnes, filets fins,
numérotation §. Les animations respectent `prefers-reduced-motion`.
