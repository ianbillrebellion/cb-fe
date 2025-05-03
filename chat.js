(function waitUntilReady() {
  const root = document.querySelector('rebellion-chatbot')?.shadowRoot;
  const input = root?.querySelector('#userInput');
  const sendBtn = root?.querySelector('#sendBtn');
  const messages = root?.querySelector('#messages');

  if (root && input && sendBtn && messages) {
    initChat(input, sendBtn, messages);
  } else {
    requestAnimationFrame(waitUntilReady); // keep checking until ready
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

      console.log('[chatbot] Sending message:', text); // ✅ Confirming it's firing

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
        const raw = await res.text();
        console.log('[chatbot] Raw response:', raw);
      
        let data;
        try {
          data = JSON.parse(raw);
        } catch (err) {
          console.warn('[chatbot] Failed to parse JSON. Raw was:', raw);
          data = { reply: 'Invalid response from server.' };
        }
      
        removeTyping();
        appendMessage(data.reply || 'No response.', 'bot');
      
      } catch (err) {
        removeTyping();
        appendMessage('Error contacting AI agent.', 'bot');
        console.error(err);
      }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
})();
