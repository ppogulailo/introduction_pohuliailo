"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useChat } from "./useChat";

type ChatStateValue = ReturnType<typeof useChat>;

const ChatStateContext = createContext<ChatStateValue | null>(null);

export function ChatStateProvider({ children }: { children: ReactNode }) {
  const chat = useChat();
  return <ChatStateContext.Provider value={chat}>{children}</ChatStateContext.Provider>;
}

export function useSharedChat() {
  const chat = useContext(ChatStateContext);
  if (!chat) {
    throw new Error("useSharedChat must be used within ChatStateProvider");
  }
  return chat;
}
