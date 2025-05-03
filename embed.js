class RebellionChatbot extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // 1. Chatbox structure (HTML first)
    shadow.innerHTML = `
      <div id="launcher">💬</div>
      <div id="chatbox" class="hidden">
        <div id="chatHeader">
          Rebellion AI
          <div class="controls">
            <button id="refreshBtn">🔄</button>
            <button id="closeBtn">✖️</button>
          </div>
        </div>
        <div id="messages"></div>
        <div id="inputRow">
          <input type="text" id="userInput" placeholder="Type your message..." />
          <button id="sendBtn">Send</button>
        </div>
      </div>
    `;

    // 2. Anti-flicker preload style (no display:none)
    const preloadStyle = document.createElement('style');
    preloadStyle.textContent = `
      #chatbox {
        opacity: 0;
        transform: scale(0.5);
        pointer-events: none;
      }
    `;
    shadow.appendChild(preloadStyle);

    // 3. Attach external CSS
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://velvety-pony-26f793.netlify.app/style.css';
    shadow.appendChild(style);

    // 4. After style loads, remove preload
    style.onload = () => {
      requestAnimationFrame(() => {
        preloadStyle.remove();
      });
    };

    // 5. Load chat logic
    const script = document.createElement('script');
    script.src = 'https://velvety-pony-26f793.netlify.app/chat.js';
    script.type = 'module';
    shadow.appendChild(script);

    // 6. Toggle behavior
    setTimeout(() => {
      const launcher = shadow.querySelector('#launcher');
      const chatbox = shadow.querySelector('#chatbox');
      const closeBtn = shadow.querySelector('#closeBtn');
      const refreshBtn = shadow.querySelector('#refreshBtn');
      const messages = shadow.querySelector('#messages');

      let hasStarted = false;

      launcher.addEventListener('click', () => {
        chatbox.classList.toggle('visible');
        chatbox.classList.toggle('hidden');

        // Run this ONLY when chat is first opened
        if (!hasStarted && chatbox.classList.contains('visible')) {
          const input = shadow.querySelector('#userInput');

          if (input) {
            const sendMessage = () => {
              const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
              input.value = 'getStarted';
              input.dispatchEvent(enterEvent);
              hasStarted = true;
            };

            // Delay to let chat.js load
            setTimeout(sendMessage, 200);
          }
        }
      });

      closeBtn?.addEventListener('click', () => {
        chatbox.classList.remove('visible');
        chatbox.classList.add('hidden');
      });

refreshBtn?.addEventListener('click', () => {
  messages.innerHTML = '';
});

    }, 100);
  }
}

customElements.define('rebellion-chatbot', RebellionChatbot);
document.body.appendChild(document.createElement('rebellion-chatbot'));
