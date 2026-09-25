// Tout le contenu éditable du site est ici.
// Les valeurs marquées TODO sont des placeholders à remplacer.

export const TODO = (label: string) => `[TODO: ${label}]`

export const links = {
  github: 'https://github.com/BernierNoa',
  email: TODO('email'), // ex: 'noa@exemple.fr'
  linkedin: TODO('url LinkedIn'),
  cv: TODO('url du CV en PDF'),
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

export const projects: Project[] = [
  {
    id: 'elevenlogs',
    name: 'ElevenLogs',
    tagline: 'Le Letterboxd du foot.',
    year: '2026',
    role: 'Solo, de la base de données au pixel',
    status: 'En ligne',
    body: [
      "Letterboxd fait ça très bien pour les films, personne ne le faisait pour le foot. Donc je l'ai fait : tu notes chaque match que tu regardes, tu élis ton homme du match, tu suis tes stats de saison et ce que regardent tes potes.",
      "C'est mon projet le plus abouti. Une vraie app en prod, avec tout ce que ça implique : auth, sécurité des données, notifications, et beaucoup de petits détails d'interface.",
    ],
    highlights: [
      'Données protégées côté Postgres avec des policies RLS, logique serveur en Edge Functions Supabase',
      'Auth déléguée à Clerk, branchée sur Supabase',
      'Notifications push web (VAPID) et cartes de match exportables en image pour les partager',
      "Une extension Chrome (Manifest V3) pour noter un match sans quitter l'onglet du stream",
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'TanStack Query', 'Supabase', 'Clerk', 'Recharts'],
    links: [
      { label: 'elevenlogs.app', href: 'https://elevenlogs.app/' },
      { label: 'Code (frontend)', href: 'https://github.com/BernierNoa/ElevenLogs' },
    ],
    artifact: 'log',
  },
  {
    id: 'talos',
    name: 'talos',
    tagline: 'Mon propre agent de code, en terminal.',
    year: '2026',
    role: 'Solo',
    status: 'En construction, étape 15',
    body: [
      "J'utilise des agents de code tous les jours, et je voulais comprendre ce qu'il y a vraiment sous le capot. Le meilleur moyen, c'était d'en construire un. talos est un harness auto-hébergé, pensé pour tourner sur un petit serveur Linux.",
      "Un modèle principal (DeepSeek) raisonne et explore le code. En amont, un petit routeur (Jev) décide comment traiter chaque message. Le fil rouge : l'agent lit et propose, mais c'est toujours moi qui applique.",
    ],
    highlights: [
      "Function calling en streaming : les fragments d'arguments sont réassemblés avant exécution, avec des garde-fous (5 tours, 10 appels d'outils max par message)",
      "Workspace verrouillé : aucun chemin ne sort de la racine, symlinks sortants refusés, binaires détectés",
      'Patches multi-fichiers proposés, jamais appliqués seuls : vérif des empreintes, application atomique, rollback complet',
      'Permissions graduées que le modèle ne peut pas modifier, clés API retirées des process enfants, détection de secrets avant tout envoi',
    ],
    stack: ['TypeScript strict', 'Node.js', 'DeepSeek API', 'Function calling', 'Vitest'],
    links: [{ label: 'Repo privé', note: 'Démo sur demande' }],
    artifact: 'terminal',
  },
  {
    id: 'storyfy',
    name: 'Storyfy',
    tagline: 'Des histoires écrites à la demande.',
    year: '2025',
    role: 'Full stack',
    status: 'Bêta',
    body: [
      "Mon premier vrai projet avec de l'IA générative. Tu choisis un thème, des personnages, un ton, une longueur, et Storyfy t'écrit une histoire sur mesure. Pour endormir un gamin ou pour débloquer une page blanche.",
      "Rien de fancy côté stack, et c'était voulu : comprendre chaque couche, du formulaire jusqu'à l'appel au modèle.",
    ],
    highlights: [
      "Backend Flask qui fait le pont avec l'API Mistral via un endpoint /generate_story",
      'Front en JavaScript vanilla, comptes utilisateurs avec Firebase Auth',
      'Landing page et formulaire pour recruter des bêta-testeurs',
    ],
    stack: ['Python', 'Flask', 'Mistral', 'JavaScript', 'Firebase'],
    links: [{ label: 'Code', href: 'https://github.com/BernierNoa/Storyfy' }],
    artifact: 'story',
  },
  {
    id: 'olympe',
    name: 'Olympe',
    tagline: 'Une équipe d’agents qui tourne sur mon NAS.',
    year: '2026',
    role: 'Solo',
    status: 'Utilisé au quotidien',
    body: [
      "Mon système d'agents perso. Je parle à un seul bot Telegram, Ouranos, qui route chaque message vers le bon agent : Helios administre le serveur, Prométhée prend des tâches de dev et ouvre les PR, Phémé rédige du contenu, Iris s'occupe des mails et de l'agenda, Athéna m'aide à réfléchir à mes projets.",
      "Tout tourne en conteneurs, chez moi. Et rien de sensible ne se fait sans mon feu vert.",
    ],
    highlights: [
      'Humain dans la boucle : éteindre le serveur, merger une PR ou valider un post passe par un « approve <id> » sur Telegram',
      "Isolation par agent : réseaux Docker séparés, aucun port publié, volumes au strict nécessaire",
      'Prométhée : backlog SQLite, worker asyncio, branche git dédiée, Claude Code en headless, puis revue automatique du diff par un second modèle',
      "Helios : sauvegardes restic, journal d'audit, alertes proactives remontées sur Telegram",
    ],
    stack: ['Python', 'FastAPI', 'Docker Compose', 'SQLite', 'Telegram Bot API', 'DeepSeek', 'Claude Code'],
    links: [{ label: 'Repo privé', note: 'Démo sur demande' }],
    artifact: 'agents',
  },
  {
    id: 'pronogoat',
    name: 'PronoGoat',
    tagline: TODO('accroche en une phrase'),
    year: TODO('année'),
    role: 'Avec Roman',
    status: TODO('statut'),
    body: [
      TODO("ce qu'est PronoGoat, pourquoi vous l'avez fait, et qui fait quoi entre Roman et toi"),
    ],
    highlights: [TODO('point technique 1'), TODO('point technique 2')],
    stack: [TODO('stack')],
    links: [{ label: TODO('lien') }],
    artifact: 'placeholder',
  },
]

export type StackTier = { label: string; note: string; items: { name: string; refs?: string[] }[] }

export const stack: StackTier[] = [
  {
    label: 'Tous les jours',
    note: 'Ce que je tape sans réfléchir.',
    items: [
      { name: 'TypeScript', refs: ['elevenlogs', 'talos'] },
      { name: 'React', refs: ['elevenlogs'] },
      { name: 'Python', refs: ['olympe', 'storyfy'] },
      { name: 'Tailwind', refs: ['elevenlogs'] },
      { name: 'Git' },
      { name: 'Agents de code', refs: ['talos', 'olympe'] },
    ],
  },
  {
    label: 'Souvent',
    note: "Dès qu'un projet en a besoin.",
    items: [
      { name: 'Supabase & Postgres', refs: ['elevenlogs'] },
      { name: 'FastAPI', refs: ['olympe'] },
      { name: 'Docker', refs: ['olympe'] },
      { name: 'Node.js', refs: ['talos'] },
      { name: 'APIs de LLM', refs: ['talos', 'olympe', 'storyfy'] },
      { name: 'Vite', refs: ['elevenlogs'] },
    ],
  },
  {
    label: 'À l’école & au boulot',
    note: 'BUT et alternance.',
    items: [{ name: 'C' }, { name: 'C#' }, { name: 'Java' }, { name: 'Kotlin' }, { name: 'SQL' }, { name: 'Delphi' }],
  },
  {
    label: 'En train d’apprendre',
    note: 'Par la pratique, pas que par la théorie.',
    items: [{ name: 'Machine learning' }, { name: 'Évaluation de LLM' }, { name: 'Orchestration multi-agents', refs: ['olympe'] }],
  },
]

export const timeline: { year: string; text: string }[] = [
  { year: '2024', text: 'Premiers plugins Minecraft et un bot Discord pour La Garderie. Premières apps Android en Kotlin.' },
  { year: '2025', text: "Entrée en BUT Informatique à l'IUT d'Amiens. Storyfy, mon premier projet avec un LLM." },
  { year: '2026', text: 'Alternance chez Agisoft Engineering. ElevenLogs en prod, Olympe sur mon NAS, talos en chantier. Une game jam en Godot au passage.' },
  { year: 'Ensuite', text: "Une école d'ingé, spécialisation IA." },
]

export const drawers: { name: string; what: string; href?: string }[] = [
  { name: 'CodeGameJam2026', what: 'Jeu fait en game jam, Godot', href: 'https://github.com/BernierNoa/CodeGameJam2026' },
  { name: 'video-use', what: 'Montage vidéo piloté par agent, fork perso', href: 'https://github.com/BernierNoa/video-use' },
  { name: 'KoupaingsUHC', what: 'Plugin Minecraft, pour rire', href: 'https://github.com/BernierNoa/KoupaingsUHC' },
  { name: 'CCBot', what: 'Bot Discord pour La Garderie', href: 'https://github.com/BernierNoa/CCBot-' },
]

export const pad = (n: number) => String(n).padStart(2, '0')
