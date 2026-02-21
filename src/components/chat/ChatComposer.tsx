"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Mic, Paperclip, Play, Send, Square, X } from "lucide-react";
import { CHAT_CONFIG } from "./chat-config";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  voiceEnabled: boolean;
  isRecording: boolean;
  recordingTime: number;
  recordedAudio: { blob: Blob; url: string } | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onCancelRecording: () => void;
  onSendVoice: () => void;
}

function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const ChatComposer = ({
  onSend,
  isLoading,
  voiceEnabled,
  isRecording,
  recordingTime,
  recordedAudio,
  onStartRecording,
  onStopRecording,
  onCancelRecording,
  onSendVoice,
}: ChatComposerProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || isLoading) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChip = (prompt: string) => {
    if (!isLoading) onSend(prompt);
  };

  if (isRecording) {
    return (
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-destructive">
            <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
            <span>Listening… {formatSeconds(recordingTime)}</span>
          </div>
          <button onClick={onStopRecording} className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-destructive-foreground" aria-label="Stop recording">
            <Square className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  if (recordedAudio) {
    return (
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const audio = new Audio(recordedAudio.url);
              audio.play();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Play recorded audio"
          >
            <Play className="h-3.5 w-3.5" />
          </button>
          <span className="flex-1 text-sm text-muted-foreground">Voice message ready</span>
          <button onClick={onCancelRecording} className="text-muted-foreground hover:text-foreground" aria-label="Cancel voice message">
            <X className="h-4 w-4" />
          </button>
          <button onClick={onSendVoice} disabled={isLoading} className="flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground disabled:opacity-50">
            <Send className="h-3 w-3" /> Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-border bg-card">
      <div className="flex gap-1.5 overflow-x-auto px-3 pt-2 pb-1">
        {CHAT_CONFIG.suggestedPrompts.slice(0, 3).map((prompt) => (
          <button key={prompt} onClick={() => handleChip(prompt)} disabled={isLoading} className="shrink-0 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-50">
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-2 px-3 pt-1 pb-3">
        <button aria-label="Attach file (coming soon)" title="Coming soon" className="cursor-not-allowed text-muted-foreground/50 flex h-9 w-9 shrink-0 items-center justify-center rounded-full" disabled>
          <Paperclip className="h-4 w-4" />
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          rows={1}
          className={cn("flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm", "placeholder:text-muted-foreground/60", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}
          disabled={isLoading}
        />

        {voiceEnabled && !text.trim() && (
          <button onClick={onStartRecording} disabled={isLoading} aria-label="Start voice recording" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50">
            <Mic className="h-4 w-4" />
          </button>
        )}

        <button onClick={handleSend} disabled={!text.trim() || isLoading} aria-label="Send message" className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors", text.trim() ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground/40")}>
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
