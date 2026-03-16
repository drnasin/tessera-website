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
  { type: 'pause', delay: 400 },
  { type: 'output', text: '' },
  { type: 'success', text: '✓ AI: claude, gemini, codex' },
  { type: 'success', text: '✓ OS: macos (brew)' },
  { type: 'output', text: '' },
  { type: 'output', text: 'What AI plans do you have?' },
  { type: 'accent', text: '  Claude: Max (unlimited)' },
  { type: 'accent', text: '  Gemini: Free' },
  { type: 'output', text: '' },
  { type: 'info', text: 'AI: Tell me about the project — what does the client do?' },
  { type: 'accent', text: '> A restaurant in Split, menu and online reservations' },
  { type: 'output', text: '' },
  { type: 'info', text: 'AI: Which languages?' },
  { type: 'accent', text: '> Croatian and English' },
  { type: 'output', text: '' },
  { type: 'info', text: 'AI: Will customers be paying online?' },
  { type: 'accent', text: '> No, just presentation with a reservation form' },
  { type: 'output', text: '' },
  { type: 'info', text: 'AI: What design style?' },
  { type: 'accent', text: '> Modern and warm, earth tones' },
  { type: 'output', text: '' },
  { type: 'success', text: '✓ Selected: Laravel + Filament' },
  { type: 'output', text: '' },
  { type: 'output', text: '⏳ AI is building your project...' },
  { type: 'success', text: '  ✓ Database models & services        (claude opus)' },
  { type: 'success', text: '  ✓ Frontend theme & pages            (claude opus)' },
  { type: 'success', text: '  ✓ Peer review                       (gemini flash)' },
  { type: 'success', text: '  ✓ Admin panel                       (claude sonnet)' },
  { type: 'success', text: '  ✓ Content & seeding                 (claude haiku)' },
  { type: 'success', text: '  ✓ Tests passing                     ✓' },
  { type: 'output', text: '' },
  { type: 'success', text: '╔══════════════════════════════════╗' },
  { type: 'success', text: '║       PROJECT IS READY!          ║' },
  { type: 'success', text: '╚══════════════════════════════════╝' },
]


function createLine(type, text) {
  const div = document.createElement('div')
  div.className = 'line'
  if (text === '') {
    div.textContent = '\u00A0'
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

  typing.value = true

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
      setTimeout(typeCommand, lines[0].delay)
    } else {
      typing.value = false
      cursorSpan.remove()
      setTimeout(showOutput, lines[1].delay)
    }
  }

  function showOutput() {
    while (terminal.firstChild) terminal.removeChild(terminal.firstChild)
    terminal.appendChild(createCommandLine(command))

    let lineIndex = 2
    function addLine() {
      if (lineIndex >= lines.length) {
        setTimeout(() => { runAnimation() }, 3000)
        return
      }
      const line = lines[lineIndex]
      terminal.appendChild(createLine(line.type, line.text))
      terminal.scrollTop = terminal.scrollHeight
      lineIndex++
      const delay = line.type === 'success' ? 300 : line.type === 'accent' ? 200 : 150
      setTimeout(addLine, delay)
    }
    addLine()
  }

  setTimeout(typeCommand, 800)
}

onMounted(() => {
  runAnimation()
})
</script>

<style scoped>
.terminal {
  position: relative;
  width: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.terminal-wrapper {
  width: 100%;
  padding-left: 1rem;
  margin-right: -4rem;
}

.terminal-body {
  height: 340px;
  overflow-y: auto;
}

@media (max-width: 960px) {
  .terminal-body {
    height: 280px;
  }

  .terminal-wrapper {
    padding-left: 0;
    margin-right: 0;
    padding-top: 1.5rem;
  }
}
</style>
