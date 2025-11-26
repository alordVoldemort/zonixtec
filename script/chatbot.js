// Chatbot JavaScript
class ZonixtecChatbot {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.isTyping = false;
    this.userName = localStorage.getItem("chatbot_user_name") || "";
    this.userEmail = localStorage.getItem("chatbot_user_email") || "";
    this.userPhone = localStorage.getItem("chatbot_user_phone") || "";
    this.conversationStep = localStorage.getItem("chatbot_step") || "ask_name";
    this.init();
  }

  getOrCreateSessionId() {
    let sessionId = localStorage.getItem("chatbot_session_id");
    if (!sessionId) {
      sessionId =
        "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("chatbot_session_id", sessionId);
    }
    return sessionId;
  }

  init() {
    this.injectHTML();
    this.attachEventListeners();
    this.showChatInterface();
    
    if (this.conversationStep === "completed") {
      this.addBotMessage(`Welcome back, ${this.userName}! 👋 How can I help you today?`);
      this.showQuickReplies();
    } else {
      this.addBotMessage("👋 Hello! Welcome to Zonixtec! I'm your AI assistant.");
      setTimeout(() => {
        this.addBotMessage("May I know your name?");
      }, 800);
    }
  }

  injectHTML() {
    const chatbotHTML = `
                <div class="chatbot-container">
                    <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open chat">
                        <i class="fas fa-comments"></i>
                    </button>
                    <div class="chatbot-window" id="chatbot-window">
                        <div class="chatbot-header">
                            <div class="chatbot-header-info">
                                <div class="chatbot-avatar">
                                    <i class="fas fa-robot"></i>
                                </div>
                                <div class="chatbot-header-text">
                                    <h3>Zonixtec Assistant </h3>
                                    <p>Online • Ready to help</p>
                                </div>
                            </div>
                            <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div class="chatbot-messages" id="chatbot-messages"></div>
                        
                        <div class="chatbot-input-container">
                            <form class="chatbot-input-form" id="chatbot-form" autocomplete="off"
                                style="display:flex; align-items:center; width:100%; padding-right:10px;">
                                
                                <input type="text" class="chatbot-input" id="chatbot-input" 
                                    name="chatbot-message" placeholder="Type your message..."
                                    maxlength="500" style="flex:1;"/>

                                <button type="submit" class="chatbot-send" id="chatbot-send">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
    document.body.insertAdjacentHTML("beforeend", chatbotHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById("chatbot-toggle");
    const close = document.getElementById("chatbot-close");
    const form = document.getElementById("chatbot-form");
    const input = document.getElementById("chatbot-input");

    toggle.addEventListener("click", () => this.toggleChat());
    close.addEventListener("click", () => this.closeChat());
    form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Fix space key issue - prevent global handlers from interfering
    if (input) {
      // Stop propagation for keydown events to prevent global handlers from blocking space
      input.addEventListener(
        "keydown",
        (e) => {
          // Allow space key and other keys to work normally in the input
          if (e.key === " " || e.key === "Spacebar") {
            e.stopPropagation();
          }
        },
        true
      ); // Use capture phase to intercept before other handlers

      // Also handle keypress to ensure space works
      input.addEventListener(
        "keypress",
        (e) => {
          if (e.key === " " || e.keyCode === 32) {
            e.stopPropagation();
          }
        },
        true
      );
    }

    // Add input validation
    this.setupInputValidation();
  }

  setupInputValidation() {
    // No user info form validation needed anymore
  }

  toggleChat() {
    const window = document.getElementById("chatbot-window");
    window.classList.toggle("active");
  }

  closeChat() {
    const window = document.getElementById("chatbot-window");
    window.classList.remove("active");
  }

  showChatInterface() {
    // Chat interface is always visible now
  }

  showQuickReplies() {
    const quickReplies = [
      "Our Services",
      "AI Solutions",
      "Contact Info",
      "Get a Quote",
    ];

    const repliesHTML = `
            <div class="quick-replies" id="quick-replies">
                ${quickReplies
                  .map(
                    (reply) =>
                      `<button class="quick-reply-btn" onclick="chatbot.sendQuickReply('${reply}')">${reply}</button>`
                  )
                  .join("")}
            </div>
        `;

    document
      .getElementById("chatbot-messages")
      .insertAdjacentHTML("beforeend", repliesHTML);

    this.scrollToBottom();
  }

  sendQuickReply(message) {
    document.querySelectorAll(".quick-replies").forEach((el) => el.remove());
    this.sendMessage(message);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();

    if (!message || this.isTyping) return;

    input.value = "";
    this.sendMessage(message);
  }

  async sendMessage(message) {
    this.addUserMessage(message);
    
    // Handle conversation flow for collecting user info
    if (this.conversationStep === "ask_name") {
      this.userName = message.trim();
      localStorage.setItem("chatbot_user_name", this.userName);
      this.conversationStep = "ask_email";
      localStorage.setItem("chatbot_step", this.conversationStep);
      
      this.showTyping();
      setTimeout(() => {
        this.hideTyping();
        this.addBotMessage(`Nice to meet you, ${this.userName}! 😊`);
        setTimeout(() => {
          this.addBotMessage("Could you please share your email address?");
        }, 600);
      }, 800);
      return;
    }
    
    if (this.conversationStep === "ask_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(message.trim())) {
        this.showTyping();
        setTimeout(() => {
          this.hideTyping();
          this.addBotMessage("Please enter a valid email address.");
        }, 500);
        return;
      }
      
      this.userEmail = message.trim();
      localStorage.setItem("chatbot_user_email", this.userEmail);
      this.conversationStep = "ask_phone";
      localStorage.setItem("chatbot_step", this.conversationStep);
      
      this.showTyping();
      setTimeout(() => {
        this.hideTyping();
        this.addBotMessage("Great! One last thing...");
        setTimeout(() => {
          this.addBotMessage("What's your phone number? (Indian mobile number)");
        }, 600);
      }, 800);
      return;
    }
    
    if (this.conversationStep === "ask_phone") {
      const phoneRegex = /^[6-9]\d{9}$/;
      const phone = message.trim().replace(/\s+/g, '');
      
      if (!phoneRegex.test(phone)) {
        this.showTyping();
        setTimeout(() => {
          this.hideTyping();
          this.addBotMessage("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.");
        }, 500);
        return;
      }
      
      this.userPhone = phone;
      localStorage.setItem("chatbot_user_phone", this.userPhone);
      this.conversationStep = "completed";
      localStorage.setItem("chatbot_step", this.conversationStep);
      
      this.showTyping();
      setTimeout(() => {
        this.hideTyping();
        this.addBotMessage(`Perfect! Thank you, ${this.userName}! 🎉`);
        setTimeout(() => {
          this.addBotMessage("How can I help you today?");
          this.showQuickReplies();
        }, 800);
      }, 800);
      return;
    }
    
    // Normal chat flow after info collection
    this.showTyping();

    try {
      const response = await fetch(
        "https://zonixtec.com/server/chatbot/chatbot-send-message.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: this.sessionId,
            user_name: this.userName,
            user_email: this.userEmail,
            user_phone: this.userPhone,
            message: message,
          }),
        }
      );

      const data = await response.json();

      setTimeout(() => {
        this.hideTyping();
        if (data.success && data.response) {
          this.addBotMessage(data.response);
        } else {
          this.addBotMessage(
            "I'm sorry, I couldn't process that. Please try again."
          );
        }
      }, 800);
    } catch (error) {
      console.error("Chatbot error:", error);
      this.hideTyping();
      this.addBotMessage(
        "Sorry, I'm having trouble connecting. Please try again later."
      );
    }
  }

  addUserMessage(message) {
    const html = `
            <div class="chat-message user">
                <div class="message-avatar"><i class="fas fa-user"></i></div>
                <div class="message-wrapper">
                    <div class="message-content">${this.escapeHtml(
                      message
                    )}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
        `;
    document
      .getElementById("chatbot-messages")
      .insertAdjacentHTML("beforeend", html);
    this.scrollToBottom();
  }

  addBotMessage(message) {
    const html = `
            <div class="chat-message bot">
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-wrapper">
                    <div class="message-content">${this.formatMessage(
                      message
                    )}</div>
                    <div class="message-time">${this.getCurrentTime()}</div>
                </div>
            </div>
        `;
    document
      .getElementById("chatbot-messages")
      .insertAdjacentHTML("beforeend", html);
    this.scrollToBottom();
  }

  showTyping() {
    this.isTyping = true;
    const html = `
            <div class="chat-message bot" id="typing-indicator">
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-wrapper">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
    document
      .getElementById("chatbot-messages")
      .insertAdjacentHTML("beforeend", html);
    this.scrollToBottom();
  }

  hideTyping() {
    this.isTyping = false;
    const el = document.getElementById("typing-indicator");
    if (el) el.remove();
  }

  scrollToBottom() {
    const box = document.getElementById("chatbot-messages");
    box.scrollTop = box.scrollHeight;
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  escapeHtml(text) {
    return text.replace(/[&<>"']/g, (m) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return map[m];
    });
  }

  formatMessage(text) {
    let formatted = this.escapeHtml(text);
    formatted = formatted.replace(/\n/g, "<br>");
    return formatted;
  }
}

// Initialize chatbot
let chatbot;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    chatbot = new ZonixtecChatbot();
  });
} else {
  chatbot = new ZonixtecChatbot();
}
