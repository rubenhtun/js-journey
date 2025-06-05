let chatHistory = [];
let currentMessageIndex = 0;

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function startNewChat() {
  chatHistory = [];
  currentMessageIndex = 0;
  document.getElementById("chatContainer").innerHTML = "";
  document.getElementById("chatContainer").classList.add("hidden");
  document.getElementById("welcome").classList.remove("hidden");
}

function addMessage(content, isUser = false, messageIndex = null) {
  const chatContainer = document.getElementById("chatContainer");
  const welcome = document.getElementById("welcome");

  if (!welcome.classList.contains("hidden")) {
    welcome.classList.add("hidden");
    chatContainer.classList.remove("hidden");
  }

  const messageDiv = document.createElement("div");
  messageDiv.className = `message-bubble flex ${
    isUser ? "justify-end" : "justify-start"
  }`;

  if (isUser) {
    messageDiv.innerHTML = `
            <div class="bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl px-4 py-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg">
              <p class="text-sm md:text-base">${escapeHtml(content)}</p>
            </div>
          `;
  } else {
    const msgIndex =
      messageIndex !== null ? messageIndex : currentMessageIndex++;
    messageDiv.innerHTML = `
            <div class="w-full">
              <div class="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-4 max-w-full md:max-w-3xl shadow-lg">
                <div class="response-content text-gray-100 text-sm md:text-base">${marked.parse(
                  content
                )}</div>
              </div>
              <div class="flex items-center gap-2 mt-2 ml-2">
                <button onclick="refreshResponse(${msgIndex})" class="action-btn p-2 rounded-lg text-gray-400 hover:text-purple-300 flex items-center gap-1 text-xs" title="Refresh response">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Refresh</span>
                </button>
                <button onclick="copyResponse(${msgIndex})" class="action-btn p-2 rounded-lg text-gray-400 hover:text-purple-300 flex items-center gap-1 text-xs" title="Copy response">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          `;
  }

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const copyButtons = document.querySelectorAll('[onclick^="copyResponse"]');
    copyButtons.forEach((button) => {
      const span = button.querySelector("span");
      if (span) {
        const originalText = span.textContent;
        span.textContent = "Copied!";
        setTimeout(() => (span.textContent = originalText), 2000);
      }
    });
  });
}

function copyResponse(messageIndex) {
  let responseContent = "";
  let assistantMessageCount = 0;

  for (let message of chatHistory) {
    if (
      message.role === "assistant" &&
      assistantMessageCount++ === messageIndex
    ) {
      responseContent = message.content;
      break;
    }
  }

  if (responseContent) copyToClipboard(responseContent);
}

async function refreshResponse(messageIndex) {
  let userQuestion = "";
  let assistantMessageCount = 0;
  let questionIndex = -1;

  for (let i = 0; i < chatHistory.length; i++) {
    if (
      chatHistory[i].role === "assistant" &&
      assistantMessageCount++ === messageIndex
    ) {
      for (let j = i - 1; j >= 0; j--) {
        if (chatHistory[j].role === "user") {
          userQuestion = chatHistory[j].content;
          questionIndex = j;
          break;
        }
      }
      break;
    }
  }

  if (!userQuestion) return;

  const newChatHistory = chatHistory.slice(0, questionIndex + 1);
  const chatContainer = document.getElementById("chatContainer");
  const messages = chatContainer.children;
  let assistantDivCount = 0;

  for (let i = 0; i < messages.length; i++) {
    const messageDiv = messages[i];
    if (
      messageDiv.classList.contains("justify-start") &&
      !messageDiv.id &&
      assistantDivCount++ === messageIndex
    ) {
      messageDiv.innerHTML = `
              <div class="w-full">
                <div class="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-4 shadow-lg">
                  <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <span class="ml-2 text-gray-400 text-sm">Refreshing...</span>
                  </div>
                </div>
              </div>
            `;
      break;
    }
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_API_KEY_HERE", // Add your OpenRouter AI API key here
        "HTTP-Referer": "https://edu-talk.vercel.app",
        "X-Title": "Edu Talk",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: newChatHistory,
      }),
    });

    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);

    const data = await res.json();
    const message =
      data.choices?.[0]?.message?.content || "No response received.";

    assistantDivCount = 0;
    for (let i = 0; i < messages.length; i++) {
      const messageDiv = messages[i];
      if (
        messageDiv.classList.contains("justify-start") &&
        !messageDiv.id &&
        assistantDivCount++ === messageIndex
      ) {
        messageDiv.innerHTML = `
                <div class="w-full">
                  <div class="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-4 max-w-full md:max-w-3xl shadow-lg">
                    <div class="response-content text-gray-100 text-sm md:text-base">${marked.parse(
                      message
                    )}</div>
                  </div>
                  <div class="flex items-center gap-2 mt-2 ml-2">
                    <button onclick="refreshResponse(${messageIndex})" class="action-btn p-2 rounded-lg text-gray-400 hover:text-purple-300 flex items-center gap-1 text-xs" title="Refresh response">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <span>Refresh</span>
                    </button>
                    <button onclick="copyResponse(${messageIndex})" class="action-btn p-2 rounded-lg text-gray-400 hover:text-purple-300 flex items-center gap-1 text-xs" title="Copy response">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              `;
        break;
      }
    }

    chatHistory = [...newChatHistory, { role: "assistant", content: message }];
  } catch (error) {
    assistantDivCount = 0;
    for (let i = 0; i < messages.length; i++) {
      const messageDiv = messages[i];
      if (
        messageDiv.classList.contains("justify-start") &&
        !messageDiv.id &&
        assistantDivCount++ === messageIndex
      ) {
        messageDiv.innerHTML = `
                <div class="w-full">
                  <div class="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-4 max-w-full md:max-w-3xl shadow-lg">
                    <div class="text-red-400 bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                      <strong>Error refreshing:</strong> ${escapeHtml(
                        error.message
                      )}
                    </div>
                  </div>
                  <div class="flex items-center gap-2 mt-2 ml-2">
                    <button onclick="refreshResponse(${messageIndex})" class="action-btn p-2 rounded-lg text-gray-400 hover:text-purple-300 flex items-center gap-1 text-xs" title="Refresh response">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      <span>Refresh</span>
                    </button>
                    <button onclick="copyResponse(${messageIndex})" class="action-btn p-2 rounded-lg text-gray-400 hover:text-purple-300 flex items-center gap-1 text-xs" title="Copy response">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              `;
        break;
      }
    }
  }
}

function showTypingIndicator() {
  const chatContainer = document.getElementById("chatContainer");
  const typingDiv = document.createElement("div");
  typingDiv.id = "typingIndicator";
  typingDiv.className = "message-bubble flex justify-start";
  typingDiv.innerHTML = `
          <div class="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-4 py-4 shadow-lg">
            <div class="typing-indicator">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <span class="ml-2 text-gray-400 text-sm">Thinking...</span>
            </div>
          </div>
        `;
  chatContainer.appendChild(typingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typingIndicator");
  if (typingIndicator) typingIndicator.remove();
}

async function sendMessage() {
  const inputEl = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const btnText = document.getElementById("btnText");
  const input = inputEl.value.trim();

  if (!input) return;

  addMessage(input, true);
  chatHistory.push({ role: "user", content: input });

  inputEl.value = "";
  sendBtn.disabled = true;
  btnText.textContent = "Thinking...";
  sendBtn.classList.add("opacity-70");

  showTypingIndicator();

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_API_KEY_HERE", // Add your OpenRouter AI API key here
        "HTTP-Referer": "https://edu-talk.vercel.app",
        "X-Title": "Edu Talk",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: chatHistory,
      }),
    });

    if (!res.ok)
      throw new Error(`API request failed with status ${res.status}`);

    const data = await res.json();
    const message =
      data.choices?.[0]?.message?.content || "No response received.";

    removeTypingIndicator();
    addMessage(message);
    chatHistory.push({ role: "assistant", content: message });
  } catch (error) {
    removeTypingIndicator();
    addMessage(`<div class="text-red-400 bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                      <strong>Error:</strong> ${escapeHtml(error.message)}
                  </div>`);
  } finally {
    sendBtn.disabled = false;
    btnText.textContent = "Ask";
    sendBtn.classList.remove("opacity-70");
  }
}

// Event listeners
document.getElementById("newChatBtn").addEventListener("click", startNewChat);
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
document.getElementById("userInput").addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
