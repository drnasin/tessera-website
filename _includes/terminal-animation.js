// Terminal typewriter animation
(function() {
  const lines = [
    { type: 'command', text: 'tessera new my-restaurant', delay: 80 },
    { type: 'pause', delay: 500 },
    { type: 'output', text: '' },
    { type: 'success', text: '✓ AI: claude, gemini, codex' },
    { type: 'success', text: '✓ OS: windows (scoop)' },
    { type: 'success', text: '✓ DB: mysql, sqlite' },
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
  ];

  const terminal = document.getElementById('terminal-demo');
  if (!terminal) return;

  const typewriter = document.getElementById('typewriter');
  const command = lines[0].text;
  let charIndex = 0;

  // Type the command character by character
  function typeCommand() {
    if (charIndex < command.length) {
      typewriter.textContent += command[charIndex];
      charIndex++;
      setTimeout(typeCommand, lines[0].delay);
    } else {
      // Remove cursor and typewriter, show rest
      setTimeout(showOutput, lines[1].delay);
    }
  }

  function showOutput() {
    terminal.innerHTML = '<div class="line"><span class="prompt">$</span> <span class="command">' + command + '</span></div>';

    let lineIndex = 2; // Skip command and pause
    function addLine() {
      if (lineIndex >= lines.length) return;

      const line = lines[lineIndex];
      const div = document.createElement('div');
      div.className = 'line';

      if (line.text === '') {
        div.innerHTML = '&nbsp;';
      } else {
        div.innerHTML = '<span class="' + line.type + '">' + line.text + '</span>';
      }

      terminal.appendChild(div);
      lineIndex++;

      // Scroll to bottom
      terminal.scrollTop = terminal.scrollHeight;

      const delay = line.type === 'success' ? 300 : line.type === 'accent' ? 200 : 150;
      setTimeout(addLine, delay);
    }

    addLine();
  }

  // Start after a short delay
  setTimeout(typeCommand, 800);
})();
