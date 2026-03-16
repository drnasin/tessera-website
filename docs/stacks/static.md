---
title: "Static Stack"
description: "Tessera generates static sites with HTML, Tailwind CSS, and Alpine.js. SEO-optimized, ready to deploy on Netlify, Vercel, or GitHub Pages."
---

# Static Stack (HTML + Tailwind)

Tessera's AI project generator builds professional static sites — landing pages, portfolios, event pages — with no backend required.

## What Gets Generated

- HTML5 pages with semantic structure
- Tailwind CSS for all styling
- Alpine.js for interactivity (mobile menu, accordions, tabs)
- Vite for build and development
- SEO optimized (meta tags, OG tags, JSON-LD)
- Contact form (Formspree or Netlify Forms)
- Deploy configs (netlify.toml + vercel.json)
- SETUP.md with deployment instructions

## When AI Picks This Stack

Tessera recommends Static when you describe:
- A simple landing page or portfolio
- An event or campaign page
- A coming-soon page
- No backend or database needed
- Quick one-off pages

## Example Output

```
my-site/
├── index.html              # Homepage with hero, features, CTA
├── about.html              # About page
├── contact.html            # Contact with form
├── src/
│   ├── style.css           # Tailwind imports + custom styles
│   └── main.js             # Alpine.js init
├── package.json            # Vite + Tailwind
├── vite.config.js          # Multi-page config
├── netlify.toml            # Netlify deploy config
├── vercel.json             # Vercel deploy config
├── SETUP.md                # Deploy guide
└── .env.example            # Formspree key (if contact form)
```

## What Makes It Professional

AI writes like a copywriter, not a developer:
- Compelling headlines and value propositions
- Realistic testimonials with local-sounding names
- Proper typography hierarchy and spacing
- Mobile-first responsive design
- WCAG AA accessibility (alt tags, focus states, contrast)

## After Generation

```bash
cd my-site
npm install
npm run dev       # Preview at localhost:5173
npm run build     # Build for production (dist/)
```

Deploy `dist/` to Netlify, Vercel, or GitHub Pages.

## Related Stacks

Need more than a static site? Tessera also supports [Laravel](/docs/stacks/laravel) for content-managed websites, [Node.js](/docs/stacks/nodejs) for JavaScript full-stack, [Go](/docs/stacks/go) for high-performance backends, and [Flutter](/docs/stacks/flutter) for mobile apps.
