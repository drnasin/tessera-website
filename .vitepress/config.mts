import { defineConfig } from 'vitepress'

export default defineConfig({
  // Remove base when custom domain (tessera-ai.net) is active
  base: process.env.CUSTOM_DOMAIN ? '/' : '/tessera-website/',

  title: 'Tessera',
  description: 'AI-Native CMS & E-Commerce Platform. Describe what you need, AI builds it.',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.bunny.net' }],
    ['link', { href: 'https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800&display=swap', rel: 'stylesheet' }],
  ],

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
          { text: 'Contributing', link: '/docs/contributing' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/drnasin/tessera-installer' },
    ],

    footer: {
      message: 'Free for non-commercial use under <a href="/docs/license">PolyForm Noncommercial License</a>.',
      copyright: '© 2026 Ante Drnasin',
    },

    search: {
      provider: 'local',
    },

  },
})
