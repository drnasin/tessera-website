import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import HomeTerminal from './HomeTerminal.vue'
import BuiltWithTessera from './BuiltWithTessera.vue'
import NotFound from './NotFound.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeTerminal),
      // Proof strip lands directly after the hero, before the install-in-30s
      // and "How It Works" sections in index.md. Real generated-output proof
      // is the differentiator the site needs (see design audit).
      'home-hero-after': () => h(BuiltWithTessera),
      'not-found': () => h(NotFound),
    })
  },
}
