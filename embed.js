class RebellionChatbot extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // ✅ Chatbox structure FIRST — no +=!
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

    // ✅ Now safely add anti-flash style
    const preloadStyle = document.createElement('style');
    preloadStyle.textContent = `
      #chatbox {
        display: none !important;
      }
    `;
    shadow.appendChild(preloadStyle);

    // ✅ Remove it once DOM is ready
    requestAnimationFrame(() => {
      shadow.removeChild(preloadStyle);
    });

    // ✅ Attach CSS
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://velvety-pony-26f793.netlify.app/style.css';
    shadow.appendChild(style);

    // ✅ Load chat logic (e.g. sendMessage, etc.)
    const script = document.createElement('script');
    script.src = 'https://velvety-pony-26f793.netlify.app/chat.js';
    script.type = 'module';
    shadow.appendChild(script);

    // ✅ Event handling
    setTimeout(() => {
      const launcher = shadow.querySelector('#launcher');
      const chatbox = shadow.querySelector('#chatbox');
      const closeBtn = shadow.querySelector('#closeBtn');
      const refreshBtn = shadow.querySelector('#refreshBtn');
      const messages = shadow.querySelector('#messages');

      launcher.addEventListener('click', () => {
        if (chatbox.classList.contains('visible')) {
          chatbox.classList.remove('visible');
          chatbox.classList.add('hidden');
        } else {
          chatbox.classList.remove('hidden');
          chatbox.classList.add('visible');
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
