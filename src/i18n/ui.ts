// Textes de l'interface (hors projets, stack et parcours, qui sont dans content.fr.ts / content.en.ts).
// `Strings` est déduit du français : une clé manquante en anglais fait échouer le build.

const fr = {
  meta: {
    title: 'Noa Bernier — agents IA et apps web',
    description:
      "Noa Bernier, étudiant en BUT Informatique à l'IUT d'Amiens, en alternance chez Agisoft Engineering. Agents IA, outils et apps web.",
    ogLocale: 'fr_FR',
  },
  skip: 'Aller aux projets',
  nav: {
    label: 'Sections',
    city: 'Amiens, ',
    intro: 'Intro',
    projects: 'Projets',
    stack: 'Stack',
    background: 'Parcours',
    contact: 'Contact',
  },
  controls: {
    langText: 'EN',
    langLabel: 'Switch to English',
    langCode: 'en',
    toDark: 'Passer en mode sombre',
    toLight: 'Passer en mode clair',
  },
  hero: {
    meta: [
      ['Étude', 'BUT Informatique, 2e année'],
      ['École', "IUT d'Amiens"],
      ['Alternance', 'Agisoft Engineering'],
      ['Cap', "École d'ingé, spé IA"],
    ] as [string, string][],
    h1: {
      first: "Je construis les outils dont j'ai besoin.",
      before: 'Ces temps-ci, ils ont tendance à',
      emph: 'réfléchir',
      after: 'tout seuls.',
    },
    introLead: "Moi c'est Noa Bernier.",
    introRest:
      "Je fais surtout des agents IA et des apps web, en général parce que j'en avais besoin et que ça n'existait pas encore comme je le voulais.",
    indexLabel: 'Sommaire des projets',
    contents: 'Sommaire',
    count: (n: string) => `${n} projets`,
  },
  projects: {
    aside: "Classés par ordre d'importance",
    h2: {
      pre: 'Cinq projets, choisis parmi une quarantaine de repos. Ceux dont je suis le plus',
      em: 'fier',
      post: ", dans l'ordre.",
    },
    underHood: 'Sous le capot',
    meta: { year: 'Année', role: 'Rôle', stack: 'Stack', links: 'Liens' },
  },
  stack: {
    aside: 'Les exposants renvoient aux projets',
    h2: {
      pre: "Classé par fréquence d'usage réelle, pas par ce qui rend",
      em: 'bien',
      post: ' sur un CV.',
    },
  },
  background: {
    title: "J'ai commencé pour de mauvaises raisons.",
    paragraphs: [
      "Des plugins Minecraft et un bot Discord pour La Garderie. Pas très sérieux, mais c'est là que j'ai compris que je pouvais fabriquer à peu près n'importe quel outil dont j'avais besoin. Ça a un peu dérapé depuis.",
      "Aujourd'hui je suis en BUT Informatique à l'IUT d'Amiens, en alternance chez Agisoft Engineering, et je passe une bonne partie de mon temps libre à construire des agents.",
    ],
    last: {
      pre: "La suite logique, c'est une école d'ingé pour me spécialiser en IA :",
      em: "apprendre proprement ce que j'ai jusqu'ici appris en bricolant.",
    },
    drawers: 'Dans les tiroirs',
    seeAll: 'Tout voir sur GitHub',
  },
  contact: {
    lead: 'Une question sur un projet, une alternance, une candidature, ou juste envie de parler agents ?',
    title: { pre: 'Écris-', em: 'moi', post: '.' },
    copy: 'Copier',
    copySr: ' l’adresse e-mail',
    copied: 'Copié ✓',
    failed: 'Copie impossible, sélectionne l’adresse',
    githubSr: ' de Noa Bernier',
    linkedin: 'Noa Bernier',
    linkedinSr: ' sur LinkedIn',
    newTab: ' (nouvel onglet)',
    cv: 'CV (PDF)',
    cvSr: ' de Noa Bernier, téléchargement',
    font: 'Composé en Bricolage Grotesque, parce que bon.',
    top: 'Retour en haut ↑',
  },
  art: {
    captions: {
      log: 'Un log de match (maquette). Tu peux le noter.',
      terminal: 'Une session type, sorties reprises du README.',
      story: "Paramètres → début d'histoire (textes d'exemple).",
      agents: 'Qui reçoit quoi. Survole un agent pour figer le routage.',
      placeholder: 'À venir.',
    },
    log: {
      league: 'Ligue 2 · J8',
      live: 'Vu en direct',
      rating: 'Ta note',
      rate: (v: number) => `Noter ${v} sur 5`,
      motm: 'Homme du match',
      motmValue: 'N°10',
      quote: "« Un match à l'ancienne, ça se joue dans les dix dernières minutes. »",
      friends: "3 potes l'ont aussi loggé",
    },
    terminalLabel: 'Exemple de session talos',
    stories: {
      another: 'Autre histoire',
      items: [
        {
          params: [
            ['Thème', 'une forêt, la nuit'],
            ['Perso', 'un renard insomniaque'],
            ['Ton', 'doux'],
          ],
          text: "Il était une fois un renard qui connaissait chaque étoile par son prénom, parce qu'il n'avait jamais réussi à dormir…",
        },
        {
          params: [
            ['Thème', 'la mer'],
            ['Perso', 'un phare qui a peur du noir'],
            ['Ton', 'drôle'],
          ],
          text: 'Pour un phare, avoir peur du noir, c’est franchement mal tombé. Et pourtant, chaque soir à 19 h…',
        },
        {
          params: [
            ['Thème', 'l’espace'],
            ['Perso', 'une astronaute de 8 ans'],
            ['Ton', 'aventure'],
          ],
          text: 'Le compte à rebours affichait 3, 2, 1… et Lina réalisa qu’elle avait oublié son doudou sur Terre.',
        },
      ] as { params: [string, string][]; text: string }[],
    },
    agents: {
      orchestrator: 'orchestrateur',
      list: [
        { id: 'athena', name: 'Athéna', role: 'mes projets perso' },
        { id: 'iris', name: 'Iris', role: 'mails, agenda, Notion' },
        { id: 'helios', name: 'Helios', role: 'admin du NAS' },
        { id: 'promethee', name: 'Prométhée', role: 'tâches de dev → PR' },
        { id: 'pheme', name: 'Phémé', role: 'contenu réseaux' },
        { id: 'ploutos', name: 'Ploutos', role: 'pas encore réveillé' },
      ],
      messages: [
        { text: 'lance une sauvegarde', to: 'helios' },
        { text: 'athena: je priorise quoi cette semaine ?', to: 'athena' },
        { text: 'iris: résume mes mails du jour', to: 'iris' },
        { text: 'approve 12', to: 'promethee' },
        { text: 'un post pour la sortie de la v2', to: 'pheme' },
      ],
    },
  },
}

export type Strings = typeof fr

const en: Strings = {
  meta: {
    title: 'Noa Bernier — AI agents and web apps',
    description:
      "Noa Bernier, BUT Computer Science student at IUT d'Amiens, apprentice at Agisoft Engineering. AI agents, tools and web apps.",
    ogLocale: 'en_US',
  },
  skip: 'Skip to projects',
  nav: {
    label: 'Sections',
    city: 'Amiens, ',
    intro: 'Intro',
    projects: 'Projects',
    stack: 'Stack',
    background: 'Background',
    contact: 'Contact',
  },
  controls: {
    langText: 'FR',
    langLabel: 'Passer en français',
    langCode: 'fr',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },
  hero: {
    meta: [
      ['Studies', 'BUT Computer Science, 2nd year'],
      ['School', "IUT d'Amiens"],
      ['Apprenticeship', 'Agisoft Engineering'],
      ['Next', 'Engineering school, AI track'],
    ],
    h1: {
      first: 'I build the tools I need.',
      before: 'Lately, they tend to',
      emph: 'think',
      after: 'on their own.',
    },
    introLead: "I'm Noa Bernier.",
    introRest:
      "I mostly build AI agents and web apps, usually because I needed them and they didn't exist yet the way I wanted.",
    indexLabel: 'Project index',
    contents: 'Contents',
    count: (n) => `${n} projects`,
  },
  projects: {
    aside: 'Ranked by importance',
    h2: {
      pre: "Five projects, picked from about forty repos. The ones I'm most",
      em: 'proud',
      post: ' of, in order.',
    },
    underHood: 'Under the hood',
    meta: { year: 'Year', role: 'Role', stack: 'Stack', links: 'Links' },
  },
  stack: {
    aside: 'Superscripts point to projects',
    h2: {
      pre: 'Sorted by how often I actually use them, not by what looks',
      em: 'good',
      post: ' on a résumé.',
    },
  },
  background: {
    title: 'I started for the wrong reasons.',
    paragraphs: [
      'Minecraft plugins and a Discord bot for La Garderie. Not very serious, but that is where I realized I could build pretty much any tool I needed. It has gotten a bit out of hand since.',
      "Today I'm doing a BUT in Computer Science at IUT d'Amiens, as an apprentice at Agisoft Engineering, and I spend a good part of my free time building agents.",
    ],
    last: {
      pre: 'The logical next step is an engineering school to specialize in AI:',
      em: 'learning properly what I have so far learned by tinkering.',
    },
    drawers: 'In the drawers',
    seeAll: 'See everything on GitHub',
  },
  contact: {
    lead: 'A question about a project, an apprenticeship, an application, or just want to talk agents?',
    title: { pre: 'Drop me a ', em: 'line', post: '.' },
    copy: 'Copy',
    copySr: ' email address',
    copied: 'Copied ✓',
    failed: "Couldn't copy, select the address",
    githubSr: ' of Noa Bernier',
    linkedin: 'Noa Bernier',
    linkedinSr: ' on LinkedIn',
    newTab: ' (new tab)',
    cv: 'Résumé (PDF)',
    cvSr: ' of Noa Bernier, download',
    font: 'Set in Bricolage Grotesque, because why not.',
    top: 'Back to top ↑',
  },
  art: {
    captions: {
      log: 'A match log (mock-up). You can rate it.',
      terminal: "A typical session, output taken from the README (the tool's own output is in French).",
      story: 'Parameters → start of a story (example texts).',
      agents: 'Who receives what. Hover an agent to freeze the routing.',
      placeholder: 'Coming soon.',
    },
    log: {
      league: 'Ligue 2 · Matchday 8',
      live: 'Watched live',
      rating: 'Your rating',
      rate: (v) => `Rate ${v} out of 5`,
      motm: 'Man of the match',
      motmValue: 'No. 10',
      quote: '“An old-school match is decided in the last ten minutes.”',
      friends: '3 friends logged it too',
    },
    terminalLabel: 'Sample talos session',
    stories: {
      another: 'Another story',
      items: [
        {
          params: [
            ['Theme', 'a forest, at night'],
            ['Character', 'an insomniac fox'],
            ['Tone', 'gentle'],
          ],
          text: 'Once upon a time there was a fox who knew every star by its first name, because he had never managed to sleep…',
        },
        {
          params: [
            ['Theme', 'the sea'],
            ['Character', 'a lighthouse afraid of the dark'],
            ['Tone', 'funny'],
          ],
          text: 'For a lighthouse, being afraid of the dark is frankly bad luck. And yet, every evening at 7 pm…',
        },
        {
          params: [
            ['Theme', 'space'],
            ['Character', 'an 8-year-old astronaut'],
            ['Tone', 'adventure'],
          ],
          text: 'The countdown read 3, 2, 1… and Lina realized she had left her teddy bear on Earth.',
        },
      ],
    },
    agents: {
      orchestrator: 'orchestrator',
      list: [
        { id: 'athena', name: 'Athéna', role: 'my side projects' },
        { id: 'iris', name: 'Iris', role: 'mail, calendar, Notion' },
        { id: 'helios', name: 'Helios', role: 'NAS admin' },
        { id: 'promethee', name: 'Prométhée', role: 'dev tasks → PRs' },
        { id: 'pheme', name: 'Phémé', role: 'social content' },
        { id: 'ploutos', name: 'Ploutos', role: 'not awake yet' },
      ],
      messages: [
        { text: 'run a backup', to: 'helios' },
        { text: 'athena: what should I prioritize this week?', to: 'athena' },
        { text: "iris: summarize today's mail", to: 'iris' },
        { text: 'approve 12', to: 'promethee' },
        { text: 'a post for the v2 release', to: 'pheme' },
      ],
    },
  },
}

export const ui = { fr, en }
