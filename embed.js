class RebellionChatbot extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Add chatbox structure
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

    // Attach CSS
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://velvety-pony-26f793.netlify.app/style.css';
    shadow.appendChild(style);

    // Toggle chat open/close with animation class
    setTimeout(() => {
      const launcher = shadow.querySelector('#launcher');
      const chatbox = shadow.querySelector('#chatbox');
      const closeBtn = shadow.querySelector('#closeBtn');
      const refreshBtn = shadow.querySelector('#refreshBtn');
      const messages = shadow.querySelector('#messages');
    
      // Toggle open/close from launcher icon
      launcher.addEventListener('click', () => {
        if (chatbox.classList.contains('visible')) {
          chatbox.classList.remove('visible');
          chatbox.classList.add('hidden');
        } else {
          chatbox.classList.remove('hidden');
          chatbox.classList.add('visible');
        }
      });  
    
      // Refresh button clears all messages
      refreshBtn?.addEventListener('click', () => {
        messages.innerHTML = '';
      });
    }, 100);
 
    // Load chatbot logic
    const script = document.createElement('script');
    script.src = 'https://velvety-pony-26f793.netlify.app/chat.js';
    script.type = 'module';
    shadow.appendChild(script);
  }
}

customElements.define('rebellion-chatbot', RebellionChatbot);
document.body.appendChild(document.createElement('rebellion-chatbot'));
