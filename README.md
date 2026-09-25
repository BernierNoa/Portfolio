# Portfolio — Noa Bernier

Site perso, une seule page. React + Vite + TypeScript + Tailwind v4.

```bash
npm install
npm run dev      # dev server
npm run build    # tsc + build de prod dans dist/
npm run lint     # oxlint
```

## Où modifier quoi

- **Tout le texte** (projets, stack, parcours, liens) : `src/content.ts`. Les valeurs `TODO(...)` s'affichent
  en orange pointillé sur le site tant qu'elles ne sont pas remplies.
- **Couleurs, polices, utilitaires** (`label`, `link`, animations) : `src/index.css`.
- **Sections** : `src/components/` (Hero, Projects, Stack, Parcours, Contact, TopBar).
- **Visuels des projets** (log de match, terminal talos, Storyfy, routage Olympe) : `src/components/artifacts.tsx`.

## Direction

Papier cassé, encre, un seul accent (vermillon `#FF4A1C`). Bricolage Grotesque pour la voix, JetBrains Mono
pour la structure, Instrument Serif en italique pour quelques mots seulement. Grille 12 colonnes, filets fins,
numérotation §. Les animations respectent `prefers-reduced-motion`.
