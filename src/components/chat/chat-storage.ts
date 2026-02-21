import { CHAT_CONFIG } from "./chat-config";
import { ChatMessage } from "./chat-types";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getConversationId(): string {
  if (typeof window === "undefined") return "server-session";
  let id = localStorage.getItem(CHAT_CONFIG.conversationIdKey);
  if (!id) {
    id = generateId();
    localStorage.setItem(CHAT_CONFIG.conversationIdKey, id);
  }
  return id;
}

export function newConversationId(): string {
  const id = generateId();
  if (typeof window !== "undefined") {
    localStorage.setItem(CHAT_CONFIG.conversationIdKey, id);
  }
  return id;
}

export function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHAT_CONFIG.storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAT_CONFIG.storageKey, JSON.stringify(messages));
}

export function clearMessages(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHAT_CONFIG.storageKey);
}

export function isFirstVisit(): boolean {
  if (typeof window === "undefined") return false;
  const visited = localStorage.getItem(CHAT_CONFIG.firstVisitKey);
  if (!visited) {
    localStorage.setItem(CHAT_CONFIG.firstVisitKey, "true");
    return true;
  }
  return false;
}

export function createMessage(
  role: "user" | "assistant",
  content: string,
  type: "text" | "voice" = "text",
  audioUrl?: string
): ChatMessage {
  return { id: generateId(), role, content, createdAt: Date.now(), type, audioUrl };
}
