"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, MessageSquare, MessageSquarePlus, Minimize2, Trash2, Volume2, VolumeX, X } from "lucide-react";
import { CHAT_CONFIG } from "./chat-config";
import { useChat } from "./useChat";
import ChatMessages from "./ChatMessages";
import ChatComposer from "./ChatComposer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const AiChatWidget = () => {
  const chat = useChat();
  const isMobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chat.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") chat.setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [chat.isOpen, chat.setOpen]);

  useEffect(() => {
    if (chat.isOpen && panelRef.current) panelRef.current.focus();
  }, [chat.isOpen]);

  return (
    <>
      {chat.isOpen && isMobile && <div className="fixed inset-0 z-[60] animate-in fade-in-0 bg-foreground/10 backdrop-blur-sm duration-200" onClick={() => chat.setOpen(false)} aria-hidden />}

      {chat.isOpen && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label="AI Chat"
          className={cn(
            "fixed z-[70] flex flex-col overflow-hidden border border-border bg-card shadow-xl",
            "animate-in slide-in-from-bottom-4 fade-in-0 duration-200",
            isMobile ? "inset-0 rounded-none" : "bottom-24 right-6 h-[520px] w-[380px] rounded-2xl"
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-foreground">{CHAT_CONFIG.title}</h2>
              <p className="truncate text-xs text-muted-foreground">{CHAT_CONFIG.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={chat.toggleTts} aria-label={chat.ttsEnabled ? "Disable read aloud" : "Enable read aloud"} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" title={chat.ttsEnabled ? "TTS on" : "TTS off"}>
                {chat.ttsEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              </button>
              <button onClick={chat.startNewChat} aria-label="Start new chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                <MessageSquarePlus className="h-3.5 w-3.5" />
              </button>
              <button onClick={chat.clearChat} aria-label="Clear chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {!isMobile && (
                <button onClick={() => chat.setOpen(false)} aria-label="Minimize chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Minimize2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button onClick={() => chat.setOpen(false)} aria-label="Close chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <p className="border-b border-border/50 px-4 py-1.5 text-[10px] text-muted-foreground/70">{CHAT_CONFIG.disclaimer}</p>

          {chat.error && (
            <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 text-xs text-destructive">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1">{chat.error}</span>
              <button onClick={chat.retry} className="shrink-0 font-medium underline">Retry</button>
              <button onClick={chat.dismissError} aria-label="Dismiss">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <ChatMessages messages={chat.messages} isLoading={chat.isLoading} ttsEnabled={chat.ttsEnabled} />
          <ChatComposer
            onSend={chat.send}
            isLoading={chat.isLoading}
            voiceEnabled={CHAT_CONFIG.featureFlags.voiceEnabled}
            isRecording={chat.isRecording}
            recordingTime={chat.recordingTime}
            recordedAudio={chat.recordedAudio}
            onStartRecording={chat.startRecording}
            onStopRecording={chat.stopRecording}
            onCancelRecording={chat.cancelRecording}
            onSendVoice={chat.sendVoice}
          />
        </div>
      )}

      {!chat.isOpen && (
        <div className="animate-in slide-in-from-bottom-2 fade-in-0 duration-300">
          <button
            onClick={chat.toggleOpen}
            aria-label="Open AI chat"
            className={cn(
              "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full",
              "bg-primary text-primary-foreground shadow-lg",
              "transition-transform hover:scale-105 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "safe-area-bottom sm:bottom-6 sm:right-6"
            )}
          >
            {chat.showPulse && <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />}
            <MessageSquare className="h-6 w-6" strokeWidth={1.5} />
            <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card text-[9px] font-bold text-primary shadow-sm">AI</span>
            {chat.unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
              </span>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default AiChatWidget;
