(function waitUntilReady() {
  const root = document.querySelector('rebellion-chatbot')?.shadowRoot;
  const input = root?.querySelector('#userInput');
  const sendBtn = root?.querySelector('#sendBtn');
  const messages = root?.querySelector('#messages');

  if (root && input && sendBtn && messages) {
    initChat(input, sendBtn, messages);
  } else {
    requestAnimationFrame(waitUntilReady);
  }

  function initChat(input, sendBtn, messages) {
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

      console.log('[chatbot] Sending message:', text);

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

        console.log('[chatbot] Status:', res.status);
        const data = await res.json(); // ✅ Directly parse JSON

        console.log('[chatbot] Parsed response:', data);

        removeTyping();
        let replyText = typeof data.reply === 'string' 
          ? data.reply 
          : data.reply?.output || data[0]?.output || 'No response.';
        appendMessage(replyText, 'bot');

      } catch (err) {
        removeTyping();
        appendMessage('Error contacting AI agent.', 'bot');
        console.error('[chatbot] Error:', err);
      }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
})();
