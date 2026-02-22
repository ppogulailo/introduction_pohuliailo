"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface ChatContextType {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  openAndFocus: () => void;
  shouldFocus: boolean;
  clearFocus: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldFocus, setShouldFocus] = useState(false);

  const setOpen = useCallback((open: boolean) => setIsOpen(open), []);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const openAndFocus = useCallback(() => {
    setIsOpen(true);
    setShouldFocus(true);
  }, []);
  const clearFocus = useCallback(() => setShouldFocus(false), []);

  return (
    <ChatContext.Provider value={{ isOpen, setOpen, toggleOpen, openAndFocus, shouldFocus, clearFocus }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
};
