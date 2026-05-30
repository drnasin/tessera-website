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
    ctaHref: string
    artCaption: string
    artCaptionLink: string
    artCaptionLinkHref: string
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
    title: string
    lines: Array<{ type: string; text: string; delay?: number }>
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
      ctaHref: '/docs/case/bakery',
      artCaption: "Stylised preview of the AI's actual colour and layout choices.",
      artCaptionLink: 'See annotated screenshots in the case study →',
      artCaptionLinkHref: '/docs/case/bakery',
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
      title: 'tessera new my-restaurant',
      lines: [
        { type: 'command', text: 'tessera new my-restaurant', delay: 65 },
        { type: 'pause', text: '', delay: 350 },
        { type: 'output', text: '' },
        { type: 'success', text: '✓ AI: claude, codex' },
        { type: 'success', text: '✓ OS: macos (brew)' },
        { type: 'output', text: '' },
        { type: 'info', text: 'AI: Tell me about the project — what does the client do?' },
        { type: 'accent', text: '> Restaurant in Split — menu and online reservations' },
        { type: 'output', text: '' },
        { type: 'info', text: 'AI: Which languages?' },
        { type: 'accent', text: '> Croatian and English' },
        { type: 'output', text: '' },
        { type: 'success', text: '✓ Selected: Laravel + Filament' },
        { type: 'output', text: '' },
        { type: 'output', text: '⏳ AI is building your project...' },
        { type: 'success', text: '  ✓ Database models & services    (claude opus)' },
        { type: 'success', text: '  ✓ Frontend theme & pages        (claude opus)' },
        { type: 'success', text: '  ✓ Admin panel                   (claude opus)' },
        { type: 'success', text: '  ✓ Content & seeding             (claude sonnet)' },
        { type: 'success', text: '  ✓ All gates passed              (file checks)' },
        { type: 'success', text: '  ✓ Setup instructions            (claude haiku)' },
        { type: 'output', text: '' },
        { type: 'success', text: '╔════════════════════════════════╗' },
        { type: 'success', text: '║      PROJECT IS READY!         ║' },
        { type: 'success', text: '╚════════════════════════════════╝' },
      ],
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
      ctaHref: '/hr/docs/case/bakery',
      artCaption: 'Stiliziran prikaz stvarnih odluka AI-ja o bojama i rasporedu.',
      artCaptionLink: 'Anotirani snimci zaslona u studiji slučaja →',
      artCaptionLinkHref: '/hr/docs/case/bakery',
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
      title: 'tessera new my-restaurant',
      lines: [
        { type: 'command', text: 'tessera new my-restaurant', delay: 65 },
        { type: 'pause', text: '', delay: 350 },
        { type: 'output', text: '' },
        { type: 'success', text: '✓ AI: claude, codex' },
        { type: 'success', text: '✓ OS: macos (brew)' },
        { type: 'output', text: '' },
        { type: 'info', text: 'AI: Ispričaj mi o projektu — čime se klijent bavi?' },
        { type: 'accent', text: '> Restoran u Splitu — jelovnik i online rezervacije' },
        { type: 'output', text: '' },
        { type: 'info', text: 'AI: Koji jezici?' },
        { type: 'accent', text: '> Hrvatski i engleski' },
        { type: 'output', text: '' },
        { type: 'success', text: '✓ Odabrano: Laravel + Filament' },
        { type: 'output', text: '' },
        { type: 'output', text: '⏳ AI gradi tvoj projekt...' },
        { type: 'success', text: '  ✓ Modeli baze i servisi         (claude opus)' },
        { type: 'success', text: '  ✓ Frontend tema i stranice      (claude opus)' },
        { type: 'success', text: '  ✓ Admin panel                   (claude opus)' },
        { type: 'success', text: '  ✓ Sadržaj i punjenje            (claude sonnet)' },
        { type: 'success', text: '  ✓ Svi kontrolni prolazi prošli  (provjere)' },
        { type: 'success', text: '  ✓ Upute za postavljanje         (claude haiku)' },
        { type: 'output', text: '' },
        { type: 'success', text: '╔════════════════════════════════╗' },
        { type: 'success', text: '║      PROJEKT JE SPREMAN!       ║' },
        { type: 'success', text: '╚════════════════════════════════╝' },
      ],
    },
  },
}

export default messages
