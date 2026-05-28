import { defineConfig } from 'vitepress'

const hostname = 'https://tessera-ai.net'

async function fetchLatestVersion(): Promise<string> {
  try {
    const res = await fetch('https://api.github.com/repos/drnasin/tessera-installer/tags', {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'tessera-website' },
    })
    if (!res.ok) return ''
    const tags: Array<{ name: string }> = await res.json()
    return tags[0]?.name ?? ''
  } catch {
    return ''
  }
}

const latestVersion = await fetchLatestVersion()

export default defineConfig({
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['README.md'],

  vite: {
    define: {
      __TESSERA_VERSION__: JSON.stringify(latestVersion),
    },
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
    // og:locale is injected per-page in transformPageData (en_US / hr_HR)

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
          priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'EUR' },
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
    const isHr = pageData.relativePath.startsWith('hr/')
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
      ['meta', { property: 'og:locale', content: isHr ? 'hr_HR' : 'en_US' }],
    )

    // BreadcrumbList for all docs pages
    if (pageData.relativePath.includes('docs/')) {
      pageData.frontmatter.head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isHr ? 'Tessera — AI generator projekata' : 'Tessera — AI Project Generator', item: isHr ? `${hostname}/hr/` : `${hostname}/` },
          { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
        ],
      })])
    }

    // FAQPage schema for pricing pages
    if (pageData.relativePath === 'docs/pricing.md' || pageData.relativePath === 'hr/docs/pricing.md') {
      const faq = isHr ? [
        { '@type': 'Question', name: 'Je li Tessera open source?', acceptedAnswer: { '@type': 'Answer', text: 'Ne, ali izvorni kod je javan. Tessera je source-available: svako može čitati kod, forkati i doprinositi. Pravo na komercijalnu upotrebu zahtijeva plaćenu licencu. Osobna i nekomercijalna upotreba je besplatna pod PolyForm Noncommercial.' } },
        { '@type': 'Question', name: 'Tko posjeduje kod koji Tessera generira?', acceptedAnswer: { '@type': 'Answer', text: 'Ti. Komercijalna licenca, odjeljak 5, kaže da Licencitor ne polaže pravo na autorsko pravo niti tantijeme na generirani output.' } },
        { '@type': 'Question', name: 'Što se događa ako ne obnovim licencu?', acceptedAnswer: { '@type': 'Answer', text: 'Nastavljaš koristiti verziju Tessere koju već imaš, zauvijek. Nećeš primati nove značajke ni ispravke grešaka dok ne obnoviš. CLI se neće zaustaviti niti odbiti generirati projekte.' } },
        { '@type': 'Question', name: 'Mogu li isprobati Tesseru prije plaćanja?', acceptedAnswer: { '@type': 'Answer', text: 'Da. Pokreni je nekomercijalnoj upotrebi na osobnom projektu koliko god želiš. Software je identičan između razina; razlika je licenca.' } },
        { '@type': 'Question', name: 'Koja je politika povrata novca?', acceptedAnswer: { '@type': 'Answer', text: '14-dnevni povrat bez pitanja za Solo razinu. Studio i Enterprise povrati su od slučaja do slučaja, ali uvijek smo se složili kad se zatraži u dobroj vjeri unutar 30 dana.' } },
        { '@type': 'Question', name: 'Hoće li se cijene mijenjati?', acceptedAnswer: { '@type': 'Answer', text: 'Vjerojatno, kako orchestrator postaje sposobniji. Postojeće licence zadržavaju originalnu cijenu obnavljanja dok je obnova kontinuirana.' } },
      ] : [
        { '@type': 'Question', name: 'Is Tessera open source?', acceptedAnswer: { '@type': 'Answer', text: 'No, but the source is published. Tessera is source-available: anyone can read the code, fork it, and contribute. The right to use Tessera commercially requires a paid licence. Personal and noncommercial use is free under PolyForm Noncommercial.' } },
        { '@type': 'Question', name: 'Who owns the code Tessera generates?', acceptedAnswer: { '@type': 'Answer', text: 'You do. The Commercial License Section 5 states that Licensor claims no copyright or royalty over Generated Output. Ship it however you want.' } },
        { '@type': 'Question', name: 'What happens if I do not renew?', acceptedAnswer: { '@type': 'Answer', text: 'You keep using the version of Tessera you already have, forever. You will not receive new features or bug fixes until you renew. The CLI will not stop working or refuse to scaffold.' } },
        { '@type': 'Question', name: 'Can I trial Tessera before paying?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Run it noncommercially on a personal project as long as you like. The Software is identical between tiers; the licence is the difference.' } },
        { '@type': 'Question', name: 'What is the refund policy?', acceptedAnswer: { '@type': 'Answer', text: '14-day no-questions-asked for the Solo tier. Studio and Enterprise refunds are case-by-case but we have always agreed when asked in good faith within 30 days.' } },
        { '@type': 'Question', name: 'Will pricing change?', acceptedAnswer: { '@type': 'Answer', text: 'Probably, as the orchestrator becomes more capable. Existing licences keep their original price for renewal as long as renewal is continuous.' } },
      ]
      pageData.frontmatter.head.push(['script', { type: 'application/ld+json' }, JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq,
      })])
    }

  },

  sitemap: {
    hostname: 'https://tessera-ai.net',
    transformItems(items) {
      return items
        .filter(item => !item.url.includes('test-minimal'))
        .map(item => {
          if (!item.links) return item
          const enLink = item.links.find(l => l.lang === 'en')
          if (!enLink) return item
          return { ...item, links: [...item.links, { lang: 'x-default', url: enLink.url }] }
        })
    },
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
      titleTemplate: ':title | Tessera — AI generator projekata',
      description: 'Tessera je CLI alat koji generira kompletan web projekt iz razgovora. Podržava Laravel, Node.js, Go, Flutter i statičke stranice.',
      themeConfig: {
        nav: [
          { text: 'Dokumentacija', link: '/hr/docs/what-is-tessera' },
          { text: 'Cijene', link: '/hr/docs/pricing' },
          { text: 'Licenca', link: '/hr/docs/license' },
        ],

        sidebar: [
          {
            text: 'Početak rada',
            items: [
              { text: 'Što je Tessera?', link: '/hr/docs/what-is-tessera' },
              { text: 'Instalacija i postavljanje', link: '/hr/docs/getting-started' },
              { text: 'Kreiranje projekta', link: '/hr/docs/creating-project' },
              { text: 'Nakon builda', link: '/hr/docs/after-building' },
              { text: 'Rješavanje problema', link: '/hr/docs/troubleshooting' },
            ],
          },
          {
            text: 'Usporedi',
            items: [
              { text: 'vs. ručni scaffolding', link: '/hr/docs/comparison' },
              { text: 'vs. ChatGPT', link: '/hr/docs/comparison-chatgpt' },
              { text: 'vs. GitHub Copilot', link: '/hr/docs/comparison-copilot' },
            ],
          },
          {
            text: 'Značajke',
            items: [
              { text: 'Usmjeravanje AI poziva', link: '/hr/docs/ai-routing' },
              { text: 'Nastavak i oporavak', link: '/hr/docs/resume' },
            ],
          },
          {
            text: 'CLI referenca',
            items: [
              { text: 'tessera plan', link: '/hr/docs/cli/plan' },
            ],
          },
          {
            text: 'Arhitektura',
            items: [
              { text: 'YAML stack manifesti', link: '/hr/docs/architecture/yaml-manifests' },
              { text: 'Trag builda i eventi', link: '/hr/docs/architecture/build-trace' },
              { text: 'Adapter sustav', link: '/hr/docs/architecture/adapter-system' },
            ],
          },
          {
            text: 'Studije slučaja',
            items: [
              { text: 'Pekarnica Ognjište — 9m 39s build', link: '/hr/docs/case/bakery' },
              { text: 'Vinarija Split — 5 nastavaka Laravel builda', link: '/hr/docs/case/wine-shop' },
            ],
          },
          {
            text: 'Stackovi',
            items: [
              { text: 'Laravel + Filament', link: '/hr/docs/stacks/laravel' },
              { text: 'Node.js', link: '/hr/docs/stacks/nodejs' },
              { text: 'Go', link: '/hr/docs/stacks/go' },
              { text: 'Flutter', link: '/hr/docs/stacks/flutter' },
              { text: 'Statička stranica', link: '/hr/docs/stacks/static' },
            ],
          },
          {
            text: 'Cijene i licenca',
            items: [
              { text: 'Cijene', link: '/hr/docs/pricing' },
              { text: 'Pregled licence', link: '/hr/docs/license' },
              { text: 'Ugovor o komercijalnoj licenci', link: '/hr/docs/commercial-license' },
            ],
          },
          {
            text: 'Više',
            items: [
              { text: 'Odricanje od odgovornosti', link: '/hr/docs/disclaimer' },
              { text: 'Doprinos', link: '/hr/docs/contributing' },
            ],
          },
        ],

        footer: {
          message: 'Izradio Ante Drnasin · Licencirano pod <a href="/hr/docs/license">PolyForm Noncommercial</a> · <a href="/hr/docs/disclaimer">Odricanje od odgovornosti</a>',
          copyright: '© 2026 Tessera',
        },

        docFooter: {
          prev: 'Prethodna stranica',
          next: 'Sljedeća stranica',
        },

        outline: { label: 'Na ovoj stranici' },
        sidebarMenuLabel: 'Izbornik',
        returnToTopLabel: 'Povratak na vrh',
        darkModeSwitchLabel: 'Tema',
        lightModeSwitchTitle: 'Prebaci na svjetlu temu',
        darkModeSwitchTitle: 'Prebaci na tamnu temu',
        langMenuLabel: 'Promjena jezika',
      },
    },
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
        text: 'Compare',
        items: [
          { text: 'vs. Manual Scaffolding', link: '/docs/comparison' },
          { text: 'vs. ChatGPT', link: '/docs/comparison-chatgpt' },
          { text: 'vs. GitHub Copilot', link: '/docs/comparison-copilot' },
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
        text: 'Case studies',
        items: [
          { text: 'Pekarnica Ognjište — 9m 39s build', link: '/docs/case/bakery' },
          { text: 'Vinarija Split — 5-resume Laravel build', link: '/docs/case/wine-shop' },
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
