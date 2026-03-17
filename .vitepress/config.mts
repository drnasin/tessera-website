import { defineConfig } from 'vitepress'

const hostname = 'https://tessera-ai.net'

export default defineConfig({
  base: '/',

  vite: {
    server: {
      host: 'tessera-website.test',
    },
  },

  title: 'Tessera',
  titleTemplate: ':title | Tessera — AI Project Generator',
  description: 'Tessera is an AI-powered CLI tool that generates complete web projects from a conversation. Supports Laravel, Node.js, Go, Flutter, and static sites.',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.bunny.net', crossorigin: '' }],
    ['link', { href: 'https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800&display=swap', rel: 'stylesheet', media: 'print', onload: "this.media='all'" }],

    // Open Graph (static)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Tessera' }],
    ['meta', { property: 'og:image', content: `${hostname}/og-image.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

    // Twitter Card (static)
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${hostname}/og-image.png` }],

    // Additional SEO
    ['meta', { name: 'author', content: 'Ante Drnasin' }],
    ['meta', { name: 'robots', content: 'index, follow' }],

    // Google Analytics 4
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-NF081F4E54' }],
    ['script', {}, "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-NF081F4E54')"],
  ],

  transformPageData(pageData) {
    const pagePath = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const pageUrl = `${hostname}/${pagePath}`
    const title = pageData.title || 'Tessera — AI Project Generator'
    const description = pageData.description || 'AI-powered CLI tool that generates complete web projects from a conversation.'

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )
  },

  sitemap: {
    hostname: 'https://tessera-ai.net',
  },

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    siteTitle: 'Tessera',

    nav: [
      { text: 'Docs', link: '/docs/what-is-tessera' },
      { text: 'Stacks', link: '/docs/stacks/laravel' },
      { text: 'License', link: '/docs/license' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'What is Tessera?', link: '/docs/what-is-tessera' },
          { text: 'Installation & Setup', link: '/docs/getting-started' },
          { text: 'Creating a Project', link: '/docs/creating-project' },
          { text: 'After Building', link: '/docs/after-building' },
          { text: 'Troubleshooting', link: '/docs/troubleshooting' },
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
      message: 'Built by Ante Drnasin · Licensed under <a href="/docs/license">PolyForm Noncommercial</a> · <a href="/docs/disclaimer">Disclaimer</a>',
      copyright: '© 2026 Tessera',
    },

    search: {
      provider: 'local',
    },

  },
})
