(function () {
  const shadowRoot = document.currentScript.getRootNode();

  const waitForElements = () => {
    const input = shadowRoot.querySelector('#userInput');
    const sendBtn = shadowRoot.querySelector('#sendBtn');
    const messages = shadowRoot.querySelector('#messages');

    if (input && sendBtn && messages) {
      // We’re ready to roll
      initChat(input, sendBtn, messages);
      return true;
    }

    return false;
  };

  const initChat = (input, sendBtn, messages) => {
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
        const res = await fetch('https://autom8.rebellionwebsites.com/webhook-test/f7db3ac1-8e20-4e47-bf05-36f66ded98bf', {
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
  };

  // Watch for the chatbox content to be injected
  const observer = new MutationObserver(() => {
    if (waitForElements()) {
      observer.disconnect();
    }
  });

  observer.observe(shadowRoot, { childList: true, subtree: true });
})();
