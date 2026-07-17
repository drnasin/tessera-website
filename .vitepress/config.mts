import { defineConfig } from 'vitepress'

const hostname = 'https://tessera-ai.net'

export default defineConfig({
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md', 'docs/**', 'hr/docs/**', 'hr/test-minimal.md'],

  vite: {
    server: {
      host: 'tessera-website.test',
    },
  },

  title: 'Tessera',
  titleTemplate: false,
  description: 'Tessera is coming soon.',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Tessera' }],
    ['meta', { property: 'og:image', content: `${hostname}/og-image.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${hostname}/og-image.png` }],
    ['meta', { name: 'author', content: 'Ante Drnasin' }],
    ['meta', { name: 'robots', content: 'index, follow' }],

    // Google Analytics 4
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-NF081F4E54' }],
    ['script', {}, "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-NF081F4E54')"],
  ],

  transformPageData(pageData) {
    const isHr = pageData.relativePath.startsWith('hr/')
    const pagePath = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const pageUrl = `${hostname}/${pagePath}`
    const title = pageData.title || 'Tessera'
    const description = pageData.description || 'Tessera is coming soon.'

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: pageUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: pageUrl }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { property: 'og:locale', content: isHr ? 'hr_HR' : 'en_US' }],
    )
  },

  sitemap: {
    hostname: 'https://tessera-ai.net',
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    hr: {
      label: 'Hrvatski',
      lang: 'hr',
      link: '/hr/',
      title: 'Tessera',
      titleTemplate: false,
      description: 'Tessera uskoro dolazi.',
      themeConfig: {
        nav: [],
        sidebar: [],
        footer: {
          message: 'Izradio Ante Drnasin',
          copyright: '© 2026 Tessera',
        },
      },
    },
  },

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    siteTitle: 'Tessera',
    nav: [],
    sidebar: [],
    footer: {
      message: 'Built by Ante Drnasin',
      copyright: '© 2026 Tessera',
    },
  },
})
