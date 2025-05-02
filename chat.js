// Rebellion Chat Launcher Script
const launcher = document.createElement("div");
launcher.id = "ai-chat-launcher";
launcher.innerHTML = "💬";
document.body.appendChild(launcher);

const iframe = document.createElement("iframe");
iframe.id = "ai-chat-frame";
iframe.src = "https://your-netlify-site.netlify.app/index.html"; // replace this
document.body.appendChild(iframe);

launcher.onclick = () => {
  iframe.style.display = iframe.style.display === "none" ? "block" : "none";
};
