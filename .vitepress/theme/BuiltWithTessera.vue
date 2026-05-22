<template>
  <section class="proof" aria-labelledby="proof-heading">
    <div class="proof-inner">
      <div class="proof-copy">
        <div class="eyebrow">{{ t.proof.eyebrow }}</div>
        <h2 id="proof-heading">
          {{ t.proof.heading }}
          <span class="accent">{{ t.proof.headingAccent }}</span>
        </h2>
        <!-- lede contains inline <code> elements — v-html is intentional (static content) -->
        <p class="lede" v-html="t.proof.lede"></p>

        <ul class="metrics">
          <li>
            <span class="num">9m 39s</span>
            <span class="lbl">{{ t.proof.metrics.wallTime }}</span>
          </li>
          <li>
            <span class="num">3</span>
            <span class="lbl">{{ t.proof.metrics.aiCalls }}</span>
          </li>
          <li>
            <span class="num">17</span>
            <span class="lbl">{{ t.proof.metrics.events }}</span>
          </li>
          <li>
            <span class="num">2 / 2</span>
            <span class="lbl">{{ t.proof.metrics.gates }}</span>
          </li>
        </ul>

        <a class="cta" :href="t.proof.ctaHref">
          {{ t.proof.cta }}
          <span class="arrow" aria-hidden="true">→</span>
        </a>
      </div>

      <!-- A stylised mock of the generated bakery site. Not a real screenshot —
           hand-built CSS preview that mirrors the AI output's color palette
           (warm brown, cream, terracotta) without depending on a binary
           asset that drifts when the AI re-runs. Real screenshots live on
           the case-study page (/docs/case/bakery). -->
      <div class="proof-art">
        <div class="window" aria-hidden="true">
          <div class="window-bar">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="address">pekarnica-ognjiste.hr</span>
          </div>

          <div class="bakery">
            <div class="bakery-nav">
              <span class="logo">Ognjište</span>
              <span class="nav-item">Kruh</span>
              <span class="nav-item">Peciva</span>
              <span class="nav-item">Lokacije</span>
              <span class="nav-item">Kontakt</span>
            </div>

            <div class="bakery-hero">
              <div class="hero-eyebrow">Od 1968.</div>
              <h3 class="hero-title">Kruh kao nekad,<br>pečen u Splitu.</h3>
              <p class="hero-sub">Divlji kvasac, lokalno brašno, ručna izrada — svako jutro.</p>
              <div class="hero-cta">Pronađi pekarnicu</div>
            </div>

            <div class="bakery-grid">
              <div class="card card-1">
                <div class="card-tag">Kvasac</div>
                <div class="card-name">Tradicionalni</div>
              </div>
              <div class="card card-2">
                <div class="card-tag">Maslo</div>
                <div class="card-name">Kroasan</div>
              </div>
              <div class="card card-3">
                <div class="card-tag">Dalmacija</div>
                <div class="card-name">Pogača</div>
              </div>
            </div>
          </div>
        </div>

        <div class="badges">
          <span class="badge">
            <span class="badge-dot"></span>
            Laravel 13
          </span>
          <span class="badge">
            <span class="badge-dot"></span>
            Filament 5
          </span>
          <span class="badge">
            <span class="badge-dot"></span>
            Tailwind v4
          </span>
          <span class="badge">
            <span class="badge-dot"></span>
            Alpine.js
          </span>
        </div>

        <p class="art-caption">
          {{ t.proof.artCaption }}
          <a :href="t.proof.artCaptionLinkHref">{{ t.proof.artCaptionLink }}</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import messages from './i18n'

const { lang } = useData()
const t = computed(() => messages[lang.value] ?? messages.en)
</script>

<style scoped>
.proof {
  max-width: 1152px;
  margin: 4.5rem auto 4rem;
  padding: 0 1.5rem;
}

.proof-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 3rem;
  align-items: center;
  padding: 3rem;
  border-radius: 1.25rem;
  background:
    radial-gradient(circle at top right, rgba(249, 115, 22, 0.08), transparent 60%),
    var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.eyebrow {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.85rem;
}

.proof-copy h2 {
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
  border-top: none;
  padding-top: 0;
}

.proof-copy h2 .accent {
  color: var(--vp-c-brand-1);
  display: block;
}

.lede {
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  margin: 0 0 1.75rem;
  max-width: 36rem;
}

.lede code {
  font-size: 0.92em;
  padding: 0.1em 0.35em;
  background: var(--vp-c-default-soft);
  border-radius: 4px;
  color: var(--vp-c-text-1);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
}

.metrics li {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.metrics .num {
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.015em;
  font-feature-settings: "tnum";
}

.metrics .lbl {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 1.25rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  background: var(--vp-c-brand-1);
  color: white !important;
  text-decoration: none !important;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 6px 16px -8px rgba(249, 115, 22, 0.6);
}

.cta:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px -8px rgba(249, 115, 22, 0.7);
}

.cta .arrow {
  transition: transform 0.2s;
}

.cta:hover .arrow {
  transform: translateX(2px);
}

/* ----- Mock site preview ----- */

.proof-art {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.window {
  border-radius: 0.875rem;
  overflow: hidden;
  background: var(--tessera-warm-cream);
  box-shadow:
    0 24px 48px -16px rgba(124, 45, 18, 0.25),
    0 8px 16px -8px rgba(249, 115, 22, 0.15);
  border: 1px solid rgba(124, 45, 18, 0.12);
}

.window-bar {
  background: #1f2937;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.window-bar .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.window-bar .dot.red    { background: #ef4444; }
.window-bar .dot.yellow { background: #eab308; }
.window-bar .dot.green  { background: #22c55e; }

.window-bar .address {
  margin-left: auto;
  margin-right: auto;
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 0.7rem;
  color: #9ca3af;
  background: rgba(255, 255, 255, 0.06);
  padding: 0.1rem 0.6rem;
  border-radius: 999px;
}

.bakery {
  padding: 0;
}

.bakery-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  background: rgba(255, 255, 255, 0.65);
  border-bottom: 1px solid rgba(124, 45, 18, 0.1);
  font-size: 0.78rem;
}

.bakery-nav .logo {
  font-family: 'Georgia', serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--tessera-burgundy);
  letter-spacing: 0.01em;
  margin-right: auto;
}

.bakery-nav .nav-item {
  color: #4b5563;
}

.bakery-hero {
  padding: 1.5rem 1.25rem 1.25rem;
  text-align: center;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(124, 45, 18, 0.04) 100%);
}

.hero-eyebrow {
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 0.78rem;
  color: var(--tessera-burgundy);
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.hero-title {
  font-family: 'Georgia', serif;
  font-size: 1.55rem;
  line-height: 1.15;
  font-weight: 700;
  color: var(--tessera-ink);
  margin: 0 0 0.6rem;
  letter-spacing: -0.01em;
}

.hero-sub {
  font-size: 0.83rem;
  color: #4b5563;
  margin: 0 0 0.85rem;
  line-height: 1.5;
}

.hero-cta {
  display: inline-block;
  padding: 0.45rem 1rem;
  background: var(--tessera-burgundy);
  color: var(--tessera-warm-cream);
  border-radius: 0.4rem;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.bakery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  padding: 1rem 1.25rem 1.5rem;
}

.bakery-grid .card {
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 0.5rem;
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.bakery-grid .card-1 { background: linear-gradient(135deg, #b45309, #92400e); }
.bakery-grid .card-2 { background: linear-gradient(135deg, #d97706, #b45309); }
.bakery-grid .card-3 { background: linear-gradient(135deg, #78350f, #92400e); }

.bakery-grid .card-tag {
  display: inline-block;
  width: max-content;
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(0, 0, 0, 0.18);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
}

.bakery-grid .card-name {
  font-family: 'Georgia', serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--tessera-warm-cream);
  letter-spacing: 0.005em;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
}

.art-caption {
  margin: 0.85rem 0 0;
  text-align: center;
  font-size: 0.78rem;
  font-style: italic;
  color: var(--vp-c-text-3);
  line-height: 1.5;
}

.art-caption a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
}

.art-caption a:hover {
  text-decoration: underline;
}

@media (max-width: 960px) {
  .proof-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding: 2rem;
  }

  .proof-copy h2 {
    font-size: 1.6rem;
  }

  .metrics {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }
}

@media (max-width: 540px) {
  .proof {
    margin-top: 3rem;
    padding: 0 1rem;
  }

  .proof-inner {
    padding: 1.5rem;
  }

  .proof-copy h2 {
    font-size: 1.35rem;
  }

  .metrics .num {
    font-size: 1.3rem;
  }

  .bakery-nav .nav-item:nth-child(n+4) {
    display: none;
  }

  .bakery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
    padding: 0.75rem 1rem 1rem;
  }

  .bakery-grid .card-name {
    font-size: 0.78rem;
  }
}
</style>
