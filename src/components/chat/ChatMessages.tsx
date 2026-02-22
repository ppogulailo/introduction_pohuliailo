"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./chat-types";
import ChatBubble from "./ChatBubble";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  ttsEnabled: boolean;
  isTtsLoading: boolean;
}

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-2">
    <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
    </div>
  </div>
);

const TtsLoadingIndicator = () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 350);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 py-1 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
        Reading response aloud
        <span className="inline-block w-5 text-left">{".".repeat(dots)}</span>
      </span>
    </div>
  );
};

const ChatMessages = ({ messages, isLoading, ttsEnabled, isTtsLoading }: ChatMessagesProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userScrolled = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
      userScrolled.current = !atBottom;
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!userScrolled.current) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Prevent SSR/client mismatch when message history is loaded from localStorage.
  if (!mounted) {
    return <div className="flex-1 overflow-y-auto px-3 py-4" />;
  }

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-muted-foreground">
        <p>No messages yet. Ask me anything about Pavlo Pohuliailo!</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} ttsEnabled={ttsEnabled} />
      ))}
      {isLoading && <TypingIndicator />}
      {isTtsLoading && <TtsLoadingIndicator />}
      <div ref={endRef} />
    </div>
  );
};

export default ChatMessages;
