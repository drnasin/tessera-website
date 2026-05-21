/**
 * Component-level UI strings for supported locales.
 * Import useData from vitepress, then: const { lang } = useData()
 * Usage: messages[lang.value] ?? messages.en
 */

export interface LocaleMessages {
  // BuiltWithTessera
  proof: {
    eyebrow: string
    heading: string
    headingAccent: string
    lede: string
    metrics: {
      wallTime: string
      aiCalls: string
      events: string
      gates: string
    }
    cta: string
    artCaption: string
    artCaptionLink: string
  }
  // NotFound
  notFound: {
    line1: string
    line2: string
    suggestedFix: string
    goHome: string
    readDocs: string
    goHomeHref: string
    readDocsHref: string
  }
  // HomeTerminal
  terminal: {
    replay: string
  }
}

const messages: Record<string, LocaleMessages> = {
  en: {
    proof: {
      eyebrow: 'Built with Tessera · real run',
      heading: 'A Croatian bakery website,',
      headingAccent: 'generated in 9 minutes 39 seconds.',
      lede: `The fixture said <code>languages: ["hr"]</code>, so the AI wrote real Croatian copy —
        the bakery's name, the Split locations, the opening pitch. That's why the preview on
        the right looks the way it does. One <code>tessera new</code> call produced the full
        static project: Tailwind theme, JSON-LD schema, mobile menu, and a junior-friendly
        SETUP.md, with every step audited by deterministic quality gates.`,
      metrics: {
        wallTime: 'total wall time',
        aiCalls: 'AI calls (Opus + Sonnet + Haiku)',
        events: 'events traced',
        gates: 'hard gates passed',
      },
      cta: 'See the build trace',
      artCaption: "Stylised preview of the AI's actual colour and layout choices.",
      artCaptionLink: 'See annotated screenshots in the case study →',
    },
    notFound: {
      line1: "AI looked everywhere. This page doesn't exist.",
      line2: 'Maybe it was moved, maybe it never was.',
      suggestedFix: 'Suggested fix:',
      goHome: 'Go Home',
      readDocs: 'Read the Docs',
      goHomeHref: '/',
      readDocsHref: '/docs/what-is-tessera',
    },
    terminal: {
      replay: 'Replay',
    },
  },

  hr: {
    proof: {
      eyebrow: 'Izgrađeno s Tesserom · pravi build',
      heading: 'Web stranica hrvatske pekarne,',
      headingAccent: 'generirana za 9 minuta i 39 sekundi.',
      lede: `Fixture je sadržavao <code>languages: ["hr"]</code>, pa je AI napisao pravi
        hrvatski sadržaj — ime pekarne, splitske lokacije, uvodnu poruku. Upravo zato
        preview s desne strane izgleda kako izgleda. Jedan poziv <code>tessera new</code>
        generirao je cijeli statički projekt: Tailwind temu, JSON-LD shemu, mobilni izbornik
        i SETUP.md razumljiv i juniorima — svaki korak provjeren determinističkim
        kontrolnim prolazima.`,
      metrics: {
        wallTime: 'ukupno trajanje',
        aiCalls: 'AI poziva (Opus + Sonnet + Haiku)',
        events: 'eventa zabilježeno',
        gates: 'kontrolnih prolaza prošlo',
      },
      cta: 'Pogledaj trag builda',
      artCaption: 'Stiliziran prikaz stvarnih odluka AI-ja o bojama i rasporedu.',
      artCaptionLink: 'Anotirani snimci zaslona u studiji slučaja →',
    },
    notFound: {
      line1: 'AI je pretražio svugdje. Ova stranica ne postoji.',
      line2: 'Možda je premještena, možda nikad nije ni bila.',
      suggestedFix: 'Prijedlog:',
      goHome: 'Na početak',
      readDocs: 'Dokumentacija',
      goHomeHref: '/hr/',
      readDocsHref: '/hr/docs/what-is-tessera',
    },
    terminal: {
      replay: 'Ponovi',
    },
  },
}

export default messages
