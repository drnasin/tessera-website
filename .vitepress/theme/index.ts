import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import HomeTerminal from './HomeTerminal.vue'
import NotFound from './NotFound.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeTerminal),
      'not-found': () => h(NotFound),
    })
  },
}
