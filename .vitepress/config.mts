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

    // JSON-LD structured data
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Tessera',
      description: 'AI-powered CLI tool that generates complete web projects from a conversation. Supports Laravel, Node.js, Go, Flutter, and static sites.',
      url: hostname,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      author: {
        '@type': 'Person',
        name: 'Ante Drnasin',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Noncommercial',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Free for personal, learning, open-source, non-profit and government use under PolyForm Noncommercial 1.0.0',
          url: `${hostname}/docs/license`,
        },
        {
          '@type': 'Offer',
          name: 'Solo Commercial Licence',
          price: '249',
          priceCurrency: 'EUR',
          description: 'Annual commercial licence for 1 developer, unlimited client projects, all stacks, perpetual fallback to last released version',
          url: `${hostname}/docs/pricing`,
          eligibleQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'developer' },
        },
        {
          '@type': 'Offer',
          name: 'Studio Commercial Licence',
          price: '799',
          priceCurrency: 'EUR',
          description: 'Annual commercial licence for up to 10 developers, priority support, early release access, perpetual fallback',
          url: `${hostname}/docs/pricing`,
          eligibleQuantity: { '@type': 'QuantitativeValue', maxValue: 10, unitText: 'developers' },
        },
        {
          '@type': 'Offer',
          name: 'Enterprise Commercial Licence',
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'EUR', price: 'Custom' },
          description: 'Custom commercial licence with negotiated developer count, custom SLA, private stack registry, white-label option',
          url: `${hostname}/docs/pricing`,
        },
      ],
    })],

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
      { text: 'Pricing', link: '/docs/pricing' },
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
        text: 'CLI Reference',
        items: [
          { text: 'tessera plan', link: '/docs/cli/plan' },
        ]
      },
      {
        text: 'Architecture',
        items: [
          { text: 'YAML stack manifests', link: '/docs/architecture/yaml-manifests' },
          { text: 'Build trace & events', link: '/docs/architecture/build-trace' },
          { text: 'Adapter system', link: '/docs/architecture/adapter-system' },
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
        text: 'Pricing & License',
        items: [
          { text: 'Pricing', link: '/docs/pricing' },
          { text: 'License Overview', link: '/docs/license' },
          { text: 'Commercial License Agreement', link: '/docs/commercial-license' },
        ]
      },
      {
        text: 'More',
        items: [
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
