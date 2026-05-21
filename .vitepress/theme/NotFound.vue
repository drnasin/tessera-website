<template>
  <div class="not-found">
    <div class="terminal-404">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">terminal</span>
      </div>
      <div class="terminal-body">
        <div class="line"><span class="prompt">$</span> <span class="command">tessera find this-page</span></div>
        <div class="line">&nbsp;</div>
        <div class="line"><span class="error-text">404</span></div>
        <div class="line">&nbsp;</div>
        <div class="line"><span class="output">{{ t.notFound.line1 }}</span></div>
        <div class="line"><span class="output">{{ t.notFound.line2 }}</span></div>
        <div class="line">&nbsp;</div>
        <div class="line"><span class="success">{{ t.notFound.suggestedFix }}</span></div>
        <div class="line"><span class="accent">  &gt; {{ t.notFound.goHome }}</span></div>
        <div class="line"><span class="accent">  &gt; {{ t.notFound.readDocs }}</span></div>
      </div>
    </div>

    <div class="actions-404">
      <a :href="t.notFound.goHomeHref" class="btn-404 brand">{{ t.notFound.goHome }}</a>
      <a :href="t.notFound.readDocsHref" class="btn-404 alt">{{ t.notFound.readDocs }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import messages from './i18n'

const { lang } = useData()
const t = computed(() => messages[lang.value] ?? messages.en)
</script>

<style scoped>
.not-found {
  max-width: 560px;
  margin: 4rem auto;
  padding: 0 1.5rem;
  text-align: center;
}

.terminal-404 {
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  text-align: left;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  margin-bottom: 2rem;
}

.terminal-header {
  background: #374151;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #eab308; }
.dot.green { background: #22c55e; }

.title {
  color: #9ca3af;
  font-size: 0.75rem;
  margin-left: 0.5rem;
}

.terminal-body {
  background: #111827;
  padding: 1.25rem;
  font-size: 0.85rem;
  line-height: 1.8;
  color: #d1d5db;
}

.prompt { color: #22c55e; }
.command { color: #f1f5f9; }
.output { color: #9ca3af; }
.success { color: #22c55e; }
.accent { color: #f97316; }

.error-text {
  color: #ef4444;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.actions-404 {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-404 {
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.25s, background-color 0.25s;
}

.btn-404.brand {
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  border-color: var(--vp-button-brand-border);
}

.btn-404.brand:hover {
  background-color: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}

.btn-404.alt {
  background-color: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  border-color: var(--vp-button-alt-border);
}

.btn-404.alt:hover {
  background-color: var(--vp-button-alt-hover-bg);
  border-color: var(--vp-button-alt-hover-border);
}
</style>
