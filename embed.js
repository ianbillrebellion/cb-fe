class RebellionChatbot extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Add chatbox structure first
      shadow.innerHTML = `
        <div id="launcher">💬</div>
        <div id="chatbox" style="display: none;">
          <div id="messages"></div>
          <div id="inputRow">
            <input type="text" id="userInput" placeholder="Type your message..." />
            <button id="sendBtn">Send</button>
          </div>
        </div>
      `;
  
      // Attach CSS *after* innerHTML is written
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'https://velvety-pony-26f793.netlify.app/style.css';
      shadow.appendChild(style);
  
      // Toggle chatbox open/close
      const launcher = shadow.querySelector('#launcher');
      const chatbox = shadow.querySelector('#chatbox');
      launcher.addEventListener('click', () => {
        chatbox.style.display = chatbox.style.display === 'none' ? 'flex' : 'none';
      });
  
      // Load chat logic
      const script = document.createElement('script');
      script.src = 'https://velvety-pony-26f793.netlify.app/chat.js';
      script.type = 'module';
      shadow.appendChild(script);
    }
  }
  
  customElements.define('rebellion-chatbot', RebellionChatbot);
  document.body.appendChild(document.createElement('rebellion-chatbot'));
  