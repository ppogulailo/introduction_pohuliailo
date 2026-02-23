"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Mic, Paperclip, Send, Square, Volume2, VolumeX } from "lucide-react";
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
  ttsEnabled: boolean;
  onToggleTts: () => void;
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
  ttsEnabled,
  onToggleTts,
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

  // Auto-send voice as soon as recording is ready
  useEffect(() => {
    if (recordedAudio && !isLoading) {
      onSendVoice();
    }
  }, [recordedAudio]);

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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span>Sending voice message…</span>
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

      <div className="flex items-center justify-end border-t border-border/40 px-3 py-1.5">
        <button
          onClick={onToggleTts}
          aria-label={ttsEnabled ? "Voice off" : "Voice on"}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
            ttsEnabled
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          )}
        >
          {ttsEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          {ttsEnabled ? "Voice on" : "Voice off"}
        </button>
      </div>
    </div>
  );
};

export default ChatComposer;
