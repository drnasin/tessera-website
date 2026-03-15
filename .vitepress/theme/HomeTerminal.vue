<template>
  <div class="terminal-wrapper">
    <div class="terminal">
      <div class="terminal-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">terminal</span>
      </div>
      <div class="terminal-body" ref="terminalBody">
        <div class="line">
          <span class="prompt">$</span>
          <span class="command" ref="typewriter"></span>
          <span class="cursor" v-if="typing">|</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const terminalBody = ref(null)
const typewriter = ref(null)
const typing = ref(true)

const lines = [
  { type: 'command', text: 'tessera new my-restaurant', delay: 80 },
  { type: 'pause', delay: 500 },
  { type: 'output', text: '' },
  { type: 'success', text: '✓ AI: claude, gemini, codex' },
  { type: 'success', text: '✓ OS: macos (brew)' },
  { type: 'output', text: '' },
  { type: 'info', text: 'AI: Tell me about the project — what does the client do?' },
  { type: 'accent', text: '> A restaurant in Split with a menu and online reservations' },
  { type: 'output', text: '' },
  { type: 'info', text: 'AI: Which languages should the site support?' },
  { type: 'accent', text: '> Croatian and English' },
  { type: 'output', text: '' },
  { type: 'output', text: '⏳ AI is building your project...' },
  { type: 'success', text: '  ✓ Creating database models         (claude opus)' },
  { type: 'success', text: '  ✓ Designing frontend theme          (claude opus)' },
  { type: 'success', text: '  ✓ Peer review: frontend theme       (gemini flash)' },
  { type: 'success', text: '  ✓ Building admin panel               (claude sonnet)' },
  { type: 'success', text: '  ✓ Writing content and seeding data   (claude sonnet)' },
  { type: 'success', text: '  ✓ All tests passing' },
  { type: 'output', text: '' },
  { type: 'success', text: '╔══════════════════════════════════╗' },
  { type: 'success', text: '║       PROJECT IS READY!          ║' },
  { type: 'success', text: '╚══════════════════════════════════╝' },
]

onMounted(() => {
  const terminal = terminalBody.value
  const tw = typewriter.value
  if (!terminal || !tw) return

  const command = lines[0].text
  let charIndex = 0

  function typeCommand() {
    if (charIndex < command.length) {
      tw.textContent += command[charIndex]
      charIndex++
      setTimeout(typeCommand, lines[0].delay)
    } else {
      typing.value = false
      setTimeout(showOutput, lines[1].delay)
    }
  }

  function showOutput() {
    terminal.innerHTML = '<div class="line"><span class="prompt">$</span> <span class="command">' + command + '</span></div>'

    let lineIndex = 2
    function addLine() {
      if (lineIndex >= lines.length) return
      const line = lines[lineIndex]
      const div = document.createElement('div')
      div.className = 'line'
      if (line.text === '') {
        div.innerHTML = '&nbsp;'
      } else {
        div.innerHTML = '<span class="' + line.type + '">' + line.text + '</span>'
      }
      terminal.appendChild(div)
      terminal.scrollTop = terminal.scrollHeight
      lineIndex++
      const delay = line.type === 'success' ? 300 : line.type === 'accent' ? 200 : 150
      setTimeout(addLine, delay)
    }
    addLine()
  }

  setTimeout(typeCommand, 800)
})
</script>

<style scoped>
.terminal-wrapper {
  width: 100%;
  padding-left: 1rem;
  margin-right: -4rem;
}

.terminal {
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.terminal-body {
  height: 340px;
  overflow-y: auto;
}

@media (max-width: 960px) {
  .terminal-wrapper {
    padding-left: 0;
    padding-top: 2rem;
  }
}
</style>
