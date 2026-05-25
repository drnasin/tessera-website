<script setup lang="ts">
declare const __TESSERA_VERSION__: string
const version = __TESSERA_VERSION__
</script>

<template>
  <a
    v-if="version"
    class="tessera-version-badge"
    href="https://github.com/drnasin/tessera-installer/releases"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Tessera ${version} release notes`"
  >{{ version }}</a>
</template>
