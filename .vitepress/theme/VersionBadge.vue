<script setup lang="ts">
import { ref, onMounted } from 'vue'

declare const __TESSERA_VERSION__: string
const version = ref(__TESSERA_VERSION__)

async function fetchLatestVersion() {
  const cacheKey = 'tessera_version_cache'
  const cached = localStorage.getItem(cacheKey)
  const cacheTime = localStorage.getItem(`${cacheKey}_time`)

  if (cached && cacheTime) {
    const age = Date.now() - parseInt(cacheTime)
    if (age < 24 * 60 * 60 * 1000) {
      version.value = cached
      return
    }
  }

  try {
    const res = await fetch('https://api.github.com/repos/drnasin/tessera-installer/tags', {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return
    const tags: Array<{ name: string }> = await res.json()
    const latest = tags[0]?.name
    if (latest) {
      version.value = latest
      localStorage.setItem(cacheKey, latest)
      localStorage.setItem(`${cacheKey}_time`, Date.now().toString())
    }
  } catch {
    // API unavailable, keep current version
  }
}

onMounted(() => {
  fetchLatestVersion()
})
</script>

<template>
  <a
    v-if="version"
    class="tessera-version-badge"
    href="https://github.com/drnasin/tessera-installer/tags"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Tessera ${version} release notes`"
  >{{ version }}</a>
</template>
