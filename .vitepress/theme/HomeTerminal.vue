<template>
  <div class="terminal-wrapper" ref="rootEl">
    <div class="terminal">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">tessera new my-restaurant</span>
      </div>
      <div class="terminal-body" ref="terminalBody">
        <div class="line">
          <span class="prompt">$</span>
          <span class="command" ref="typewriter"></span>
          <span class="cursor" v-if="typing">|</span>
        </div>
      </div>
    </div>
    <button v-if="showReplay" class="replay-btn" @click="runAnimation">
      <span aria-hidden="true">▶</span> Replay
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const rootEl = ref(null)
const terminalBody = ref(null)
const typewriter = ref(null)
const typing = ref(true)
const showReplay = ref(false)

// Trimmed from ~30 lines to ~16 — keeps the conversational shape but removes
// padding lines and the obsolete "Peer review (gemini flash)" step (Sprint 1
// replaced peer review with deterministic quality gates).
const lines = [
  { type: 'command', text: 'tessera new my-restaurant', delay: 65 },
  { type: 'pause', delay: 350 },
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
]

let currentTimeouts = []
let observer = null

function clearScheduled() {
  currentTimeouts.forEach((id) => clearTimeout(id))
  currentTimeouts = []
}

function schedule(fn, delay) {
  const id = setTimeout(fn, delay)
  currentTimeouts.push(id)
}

function createLine(type, text) {
  const div = document.createElement('div')
  div.className = 'line'
  if (text === '') {
    div.textContent = ' '
  } else {
    const span = document.createElement('span')
    span.className = type
    span.textContent = text
    div.appendChild(span)
  }
  return div
}

function createCommandLine(command) {
  const div = document.createElement('div')
  div.className = 'line'
  const prompt = document.createElement('span')
  prompt.className = 'prompt'
  prompt.textContent = '$'
  const cmd = document.createElement('span')
  cmd.className = 'command'
  cmd.textContent = command
  div.appendChild(prompt)
  div.appendChild(document.createTextNode(' '))
  div.appendChild(cmd)
  return div
}

function runAnimation() {
  const terminal = terminalBody.value
  if (!terminal) return

  clearScheduled()
  typing.value = true
  showReplay.value = false

  while (terminal.firstChild) terminal.removeChild(terminal.firstChild)

  const firstLine = document.createElement('div')
  firstLine.className = 'line'
  const prompt = document.createElement('span')
  prompt.className = 'prompt'
  prompt.textContent = '$'
  const commandSpan = document.createElement('span')
  commandSpan.className = 'command'
  const cursorSpan = document.createElement('span')
  cursorSpan.className = 'cursor'
  cursorSpan.textContent = '|'
  firstLine.appendChild(prompt)
  firstLine.appendChild(document.createTextNode(' '))
  firstLine.appendChild(commandSpan)
  firstLine.appendChild(cursorSpan)
  terminal.appendChild(firstLine)

  const command = lines[0].text
  let charIndex = 0

  function typeCommand() {
    if (charIndex < command.length) {
      commandSpan.textContent += command[charIndex]
      charIndex++
      schedule(typeCommand, lines[0].delay)
    } else {
      typing.value = false
      cursorSpan.remove()
      schedule(showOutput, lines[1].delay)
    }
  }

  function showOutput() {
    while (terminal.firstChild) terminal.removeChild(terminal.firstChild)
    terminal.appendChild(createCommandLine(command))

    let lineIndex = 2
    function addLine() {
      if (lineIndex >= lines.length) {
        schedule(() => { showReplay.value = true }, 800)
        return
      }
      const line = lines[lineIndex]
      terminal.appendChild(createLine(line.type, line.text))
      terminal.scrollTop = terminal.scrollHeight
      lineIndex++
      const delay = line.type === 'success' ? 220 : line.type === 'accent' ? 160 : 130
      schedule(addLine, delay)
    }
    addLine()
  }

  schedule(typeCommand, 600)
}

onMounted(() => {
  // Only kick the animation when the terminal is actually visible. Prevents
  // the 6-second sequence from running and finishing while the user has
  // scrolled past the hero, which used to leave the replay button as the
  // first thing they saw on a re-scroll.
  if (typeof IntersectionObserver === 'undefined') {
    runAnimation()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          runAnimation()
          observer.disconnect()
          observer = null
          break
        }
      }
    },
    { threshold: 0.3 },
  )
  observer.observe(rootEl.value)
})

onUnmounted(() => {
  clearScheduled()
  observer?.disconnect()
})
</script>

<style scoped>
.terminal-wrapper {
  width: 100%;
  padding-left: 1.5rem;
}

.terminal {
  position: relative;
  width: 100%;
  border-radius: 0.875rem;
  overflow: hidden;
  box-shadow:
    0 24px 48px -12px rgba(15, 23, 42, 0.32),
    0 8px 16px -8px rgba(249, 115, 22, 0.18);
}

.terminal-body {
  height: 360px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.replay-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 1rem auto 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: transparent;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, transform 0.15s;
}

.replay-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

@media (max-width: 960px) {
  .terminal-body {
    height: 320px;
  }

  .terminal-wrapper {
    padding-left: 0;
    padding-top: 1.5rem;
  }
}
</style>
