import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',

  title: 'Tessera',
  titleTemplate: ':title | Tessera — AI Project Generator',
  description: 'Tessera is an AI-powered CLI tool that generates complete web projects from a conversation. Supports Laravel, Node.js, Go, Flutter, and static sites.',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.bunny.net' }],
    ['link', { href: 'https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800&display=swap', rel: 'stylesheet' }],
    ['link', { rel: 'canonical', href: 'https://tessera-ai.net' }],

    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Tessera' }],
    ['meta', { property: 'og:title', content: 'Tessera — AI Project Generator That Builds Web Apps From a Conversation' }],
    ['meta', { property: 'og:description', content: 'AI-powered CLI tool that generates complete web projects. Describe what you need — AI builds models, themes, admin panels, tests, and deployment docs.' }],
    ['meta', { property: 'og:url', content: 'https://tessera-ai.net' }],
    ['meta', { property: 'og:image', content: 'https://tessera-ai.net/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Tessera — AI Project Generator That Builds Web Apps From a Conversation' }],
    ['meta', { name: 'twitter:description', content: 'AI-powered CLI tool that generates complete web projects. Describe what you need — AI builds models, themes, admin panels, tests, and deployment docs.' }],
    ['meta', { name: 'twitter:image', content: 'https://tessera-ai.net/og-image.png' }],

    // Additional SEO
    ['meta', { name: 'keywords', content: 'AI project generator, AI code generator, AI website builder, AI scaffolding tool, Laravel AI generator, automated code generation, CLI code generator, AI developer tool' }],
    ['meta', { name: 'author', content: 'Ante Drnasin' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
  ],

  sitemap: {
    hostname: 'https://tessera-ai.net',
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Tessera',

    nav: [
      { text: 'Docs', link: '/docs/getting-started' },
      { text: 'Stacks', link: '/docs/stacks/laravel' },
      { text: 'License', link: '/docs/license' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation & Setup', link: '/docs/getting-started' },
          { text: 'Creating a Project', link: '/docs/creating-project' },
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'AI Routing', link: '/docs/ai-routing' },
          { text: 'Resume & Recovery', link: '/docs/resume' },
        ]
      },
      {
        text: 'Stacks',
        items: [
          { text: 'Laravel + Filament', link: '/docs/stacks/laravel' },
          { text: 'Node.js', link: '/docs/stacks/nodejs' },
          { text: 'Go', link: '/docs/stacks/go' },
          { text: 'Flutter', link: '/docs/stacks/flutter' },
          { text: 'Static Site', link: '/docs/stacks/static' },
        ]
      },
      {
        text: 'More',
        items: [
          { text: 'License', link: '/docs/license' },
          { text: 'Disclaimer', link: '/docs/disclaimer' },
          { text: 'Contributing', link: '/docs/contributing' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/drnasin/tessera-installer' },
    ],

    footer: {
      message: 'Free for non-commercial use under <a href="/docs/license">PolyForm Noncommercial License</a>. <a href="/docs/disclaimer">Disclaimer</a>.',
      copyright: '© 2026 Ante Drnasin',
    },

    search: {
      provider: 'local',
    },

  },
})
