import { TODO, type Content } from './content'

// Traduction de content.fr.ts : mêmes ids, mêmes liens, mêmes noms propres.

export const contentEn: Content = {
  projects: [
    {
      id: 'elevenlogs',
      name: 'ElevenLogs',
      tagline: 'The Letterboxd of football.',
      year: '2026',
      role: 'Solo, from the database to the pixel',
      status: 'Live',
      body: [
        "Letterboxd does this really well for films; nobody was doing it for football. So I did it: you rate every match you watch, pick your man of the match, and follow your season stats and what your friends are watching.",
        "It's my most polished project. A real app in production, with everything that implies: auth, data security, notifications, and lots of small interface details.",
      ],
      highlights: [
        'Data protected in Postgres with RLS policies, server logic in Supabase Edge Functions',
        'Auth delegated to Clerk, wired into Supabase',
        'Web push notifications (VAPID) and match cards exportable as images to share',
        'A Chrome extension (Manifest V3) to rate a match without leaving the stream tab',
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
      tagline: 'My own coding agent, in the terminal.',
      year: '2026',
      role: 'Solo',
      status: 'Under construction, step 15',
      body: [
        "I use coding agents every day, and I wanted to understand what's really under the hood. The best way was to build one. talos is a self-hosted harness, designed to run on a small Linux server.",
        'A main model (DeepSeek) reasons and explores the code. Upstream, a small router (Jev) decides how to handle each message. The common thread: the agent reads and proposes, but I am always the one who applies.',
      ],
      highlights: [
        'Streaming function calling: argument fragments are reassembled before execution, with guardrails (5 turns, 10 tool calls max per message)',
        'Locked workspace: no path leaves the root, outgoing symlinks refused, binaries detected',
        'Multi-file patches proposed, never applied on their own: fingerprint checks, atomic application, full rollback',
        "Graduated permissions the model can't change, API keys stripped from child processes, secret detection before anything is sent",
      ],
      stack: ['TypeScript strict', 'Node.js', 'DeepSeek API', 'Function calling', 'Vitest'],
      links: [{ label: 'Private repo', note: 'Demo on request' }],
      artifact: 'terminal',
    },
    {
      id: 'storyfy',
      name: 'Storyfy',
      tagline: 'Stories written on demand.',
      year: '2025',
      role: 'Full stack',
      status: 'Beta',
      body: [
        "My first real project with generative AI. You pick a theme, characters, a tone, a length, and Storyfy writes a custom story for you. To put a kid to sleep or to get past writer's block.",
        'Nothing fancy on the stack side, and that was deliberate: understanding every layer, from the form to the model call.',
      ],
      highlights: [
        'Flask backend bridging to the Mistral API through a /generate_story endpoint',
        'Vanilla JavaScript front end, user accounts with Firebase Auth',
        'Landing page and form to recruit beta testers',
      ],
      stack: ['Python', 'Flask', 'Mistral', 'JavaScript', 'Firebase'],
      links: [{ label: 'Code', href: 'https://github.com/BernierNoa/Storyfy' }],
      artifact: 'story',
    },
    {
      id: 'olympe',
      name: 'Olympe',
      tagline: 'A team of agents running on my NAS.',
      year: '2026',
      role: 'Solo',
      status: 'Used daily',
      body: [
        'My personal agent system. I talk to a single Telegram bot, Ouranos, which routes each message to the right agent: Helios administers the server, Prométhée takes dev tasks and opens PRs, Phémé writes content, Iris handles mail and calendar, Athéna helps me think through my projects.',
        'Everything runs in containers, at home. And nothing sensitive happens without my green light.',
      ],
      highlights: [
        'Human in the loop: shutting down the server, merging a PR or approving a post goes through an “approve <id>” on Telegram',
        'Per-agent isolation: separate Docker networks, no published ports, minimal volumes',
        'Prométhée: SQLite backlog, asyncio worker, dedicated git branch, headless Claude Code, then automatic diff review by a second model',
        'Helios: restic backups, audit log, proactive alerts pushed to Telegram',
      ],
      stack: ['Python', 'FastAPI', 'Docker Compose', 'SQLite', 'Telegram Bot API', 'DeepSeek', 'Claude Code'],
      links: [{ label: 'Private repo', note: 'Demo on request' }],
      artifact: 'agents',
    },
    {
      id: 'pronogoat',
      name: 'PronoGoat',
      tagline: TODO('accroche en une phrase'),
      year: TODO('année'),
      role: 'With Roman',
      status: TODO('statut'),
      body: [TODO("ce qu'est PronoGoat, pourquoi vous l'avez fait, et qui fait quoi entre Roman et toi")],
      highlights: [TODO('point technique 1'), TODO('point technique 2')],
      stack: [TODO('stack')],
      links: [{ label: TODO('lien') }],
      artifact: 'placeholder',
    },
  ],

  stack: [
    {
      label: 'Every day',
      note: 'What I type without thinking.',
      items: [
        { name: 'TypeScript', refs: ['elevenlogs', 'talos'] },
        { name: 'React', refs: ['elevenlogs'] },
        { name: 'Python', refs: ['olympe', 'storyfy'] },
        { name: 'Tailwind', refs: ['elevenlogs'] },
        { name: 'Git' },
        { name: 'Coding agents', refs: ['talos', 'olympe'] },
      ],
    },
    {
      label: 'Often',
      note: 'Whenever a project needs it.',
      items: [
        { name: 'Supabase & Postgres', refs: ['elevenlogs'] },
        { name: 'FastAPI', refs: ['olympe'] },
        { name: 'Docker', refs: ['olympe'] },
        { name: 'Node.js', refs: ['talos'] },
        { name: 'LLM APIs', refs: ['talos', 'olympe', 'storyfy'] },
        { name: 'Vite', refs: ['elevenlogs'] },
      ],
    },
    {
      label: 'At school & at work',
      note: 'BUT and apprenticeship.',
      items: [{ name: 'C' }, { name: 'C#' }, { name: 'Java' }, { name: 'Kotlin' }, { name: 'SQL' }, { name: 'Delphi' }],
    },
    {
      label: 'Currently learning',
      note: 'By doing, not just theory.',
      items: [{ name: 'Machine learning' }, { name: 'LLM evaluation' }, { name: 'Multi-agent orchestration', refs: ['olympe'] }],
    },
  ],

  timeline: [
    { year: '2024', text: 'First Minecraft plugins and a Discord bot for La Garderie. First Android apps in Kotlin.' },
    { year: '2025', text: "Started the BUT Computer Science at IUT d'Amiens. Storyfy, my first project with an LLM." },
    { year: '2026', text: 'Apprenticeship at Agisoft Engineering. ElevenLogs in production, Olympe on my NAS, talos in progress. A Godot game jam along the way.' },
    { year: 'Next', text: 'An engineering school, AI specialization.' },
  ],

  drawers: [
    { name: 'CodeGameJam2026', what: 'Game made during a game jam, Godot', href: 'https://github.com/BernierNoa/CodeGameJam2026' },
    { name: 'video-use', what: 'Agent-driven video editing, personal fork', href: 'https://github.com/BernierNoa/video-use' },
    { name: 'KoupaingsUHC', what: 'Minecraft plugin, just for fun', href: 'https://github.com/BernierNoa/KoupaingsUHC' },
    { name: 'CCBot', what: 'Discord bot for La Garderie', href: 'https://github.com/BernierNoa/CCBot-' },
  ],
}
