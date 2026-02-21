export const CHAT_CONFIG = {
  title: "AI Chat",
  subtitle: "Ask about me, my work, projects",
  disclaimer: "This is an AI assistant. For urgent matters, use Contact.",
  storageKey: "ai-chat-messages",
  conversationIdKey: "ai-chat-conversation-id",
  firstVisitKey: "ai-chat-first-visit",
  featureFlags: {
    voiceEnabled: true,
    ttsEnabled: true,
  },
  suggestedPrompts: [
    "What projects have you worked on?",
    "What tech stack do you use?",
    "Tell me about your services",
    "How can I contact you?",
    "What's your experience?",
  ],
};
