---
title: "License"
description: "Tessera is free for personal projects, learning, and open source under the PolyForm Noncommercial License. Commercial use requires a separate license."
---

# License

Tessera is licensed under the **PolyForm Noncommercial License 1.0.0**.

## What does this mean?

### Free (no license needed)

- Personal projects and hobby sites
- Learning, experimentation, research
- Open-source projects
- Educational use (schools, universities)
- Non-profit organizations
- Government institutions

### Commercial license required

- Building websites for clients (agency/freelance work)
- SaaS products that generate revenue
- Internal tools for a for-profit company
- Any use that directly or indirectly generates revenue

## FAQ

::: details Can I use Tessera to build my personal blog?
Yes — personal use is always free.
:::

::: details Can I use it to learn Laravel/Filament?
Yes — educational use is free.
:::

::: details Can I build a client's e-commerce site with it?
That's commercial use — you need a commercial license.
:::

::: details Can I contribute to Tessera without a license?
Yes — open-source contributions don't require a license.
:::

::: details What about the generated code?
The code Tessera generates belongs to you. The license covers the Tessera installer tool itself, not the projects it creates.
:::

## Get a Commercial License

For commercial licensing inquiries:

- **GitHub**: [drnasin](https://github.com/drnasin) — open an issue or send a message
- **Email**: <span id="contact-email" style="cursor:pointer; color: var(--vp-c-brand-1); text-decoration: underline;">Click to reveal email</span>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const el = document.getElementById('contact-email')
  if (el) {
    el.addEventListener('click', () => {
      const u = 'support'; const d = 'tessera-ai.net'
      el.innerHTML = '<a href="mai' + 'lto:' + u + '@' + d + '">' + u + '@' + d + '</a>'
    })
  }
})
</script>

## Full License Text

[PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0)
