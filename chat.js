(function () {
  const shadowRoot = document.currentScript.getRootNode();

  // Wait for elements to exist before running logic
  setTimeout(() => {
    const input = shadowRoot.querySelector('#userInput');
    const sendBtn = shadowRoot.querySelector('#sendBtn');
    const messages = shadowRoot.querySelector('#messages');

    function appendMessage(text, sender, isTyping = false) {
      const msg = document.createElement('div');
      msg.className = `msg ${sender}`;
      msg.textContent = text;
      if (isTyping) msg.dataset.typing = "true";
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
      messages.querySelectorAll('[data-typing="true"]').forEach(el => el.remove());
    }

    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      appendMessage(text, 'user');
      input.value = '';
      appendMessage('Typing...', 'bot', true);

      try {
        const res = await fetch('https://your-n8n-server.com/webhook/ai-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            session_id: 'rebellion-session-1'
          })
        });

        const data = await res.json();
        removeTyping();
        appendMessage(data.reply || 'No response.', 'bot');
      } catch (err) {
        removeTyping();
        appendMessage('Error contacting AI agent.', 'bot');
        console.error(err);
      }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }, 50); // small delay to wait for embed.js to inject HTML
})();
