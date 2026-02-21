"use client";

import { useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { ChatMessage } from "./chat-types";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatMessage;
  ttsEnabled: boolean;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function renderContent(content: string) {
  const parts = content.split(/```([\s\S]*?)```/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <pre key={i} className="my-1.5 overflow-x-auto rounded bg-muted/70 p-2 text-xs font-mono">{part.trim()}</pre>;
    }
    return (
      <span key={i}>
        {part.split(/(\*\*.*?\*\*|`[^`]+`|\[.*?\]\(.*?\))/g).map((seg, j) => {
          if (seg.startsWith("**") && seg.endsWith("**")) return <strong key={j}>{seg.slice(2, -2)}</strong>;
          if (seg.startsWith("*") && seg.endsWith("*")) return <em key={j}>{seg.slice(1, -1)}</em>;
          if (seg.startsWith("`") && seg.endsWith("`")) return <code key={j} className="rounded bg-muted/70 px-1 text-xs font-mono">{seg.slice(1, -1)}</code>;
          const linkMatch = seg.match(/^\[(.*?)\]\((.*?)\)$/);
          if (linkMatch) return <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline">{linkMatch[1]}</a>;
          return seg;
        })}
      </span>
    );
  });
}

const ChatBubble = ({ message, ttsEnabled }: ChatBubbleProps) => {
  const [showTime, setShowTime] = useState(false);
  const isUser = message.role === "user";

  return (
    <div className={cn("group flex", isUser ? "justify-end" : "justify-start")} onMouseEnter={() => setShowTime(true)} onMouseLeave={() => setShowTime(false)}>
      <div className="max-w-[85%]">
        <div className={cn("rounded-2xl px-4 py-2.5 text-sm leading-relaxed", isUser ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted text-foreground")}>
          {message.type === "voice" && message.audioUrl && (
            <div className="mb-1 flex items-center gap-2 text-xs opacity-80">
              <Play className="h-3 w-3" />
              <span>Voice message</span>
            </div>
          )}
          <div className="whitespace-pre-wrap">{renderContent(message.content)}</div>
        </div>
        <div className={cn("mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground transition-opacity", showTime ? "opacity-100" : "opacity-0")}>
          <span>{formatTime(message.createdAt)}</span>
          {!isUser && ttsEnabled && (
            <button aria-label="Play response aloud" className="hover:text-primary">
              <Volume2 className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
