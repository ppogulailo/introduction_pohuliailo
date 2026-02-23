"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AlertTriangle, GripVertical, MessageSquare, MessageSquarePlus, Minimize2, Trash2, Volume2, VolumeX, X } from "lucide-react";
import { CHAT_CONFIG } from "./chat-config";
import { useSharedChat } from "./chat-state-context";
import ChatMessages from "./ChatMessages";
import ChatComposer from "./ChatComposer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChatContext } from "@/hooks/useChatContext";

const SIZE_KEY = "ai-chat-size";

function loadSize(): { w: number; h: number } | null {
  try {
    const raw = localStorage.getItem(SIZE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveSize(w: number, h: number) {
  localStorage.setItem(SIZE_KEY, JSON.stringify({ w, h }));
}

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

const DEFAULT_W = 380;
const DEFAULT_H = 520;
const MIN_W = 320;
const MIN_H = 420;
const MAX_W = 720;
const MAX_H_RATIO = 0.8;

export const AiChatWidget = () => {
  const chat = useSharedChat();
  const ctx = useChatContext();
  const isMobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ctx.isOpen && !chat.isOpen) {
      chat.setOpen(true);
    }
    if (!ctx.isOpen && chat.isOpen) {
      chat.setOpen(false);
    }
  }, [ctx.isOpen]);

  useEffect(() => {
    if (!chat.isOpen && ctx.isOpen) {
      ctx.setOpen(false);
    }
  }, [chat.isOpen]);

  useEffect(() => {
    if (ctx.shouldFocus && ctx.isOpen) {
      ctx.clearFocus();
      setTimeout(() => {
        const ta = panelRef.current?.querySelector("textarea");
        ta?.focus();
      }, 300);
    }
  }, [ctx.shouldFocus, ctx.isOpen]);

  const saved = loadSize();
  const [size, setSize] = useState({ w: saved?.w ?? DEFAULT_W, h: saved?.h ?? DEFAULT_H });
  const resizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h };

    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return;
      const dw = startPos.current.x - ev.clientX;
      const dh = startPos.current.y - ev.clientY;
      const maxW = Math.min(MAX_W, window.innerWidth * 0.9);
      const maxH = window.innerHeight * MAX_H_RATIO;
      const newW = clamp(startPos.current.w + dw, MIN_W, maxW);
      const newH = clamp(startPos.current.h + dh, MIN_H, maxH);
      setSize({ w: newW, h: newH });
    };

    const onUp = () => {
      resizing.current = false;
      setSize((s) => {
        saveSize(s.w, s.h);
        return s;
      });
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [size]);

  useEffect(() => {
    if (!chat.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        chat.setOpen(false);
        ctx.setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [chat.isOpen]);

  useEffect(() => {
    if (chat.isOpen && panelRef.current) panelRef.current.focus();
  }, [chat.isOpen]);

  const handleClose = () => {
    chat.setOpen(false);
    ctx.setOpen(false);
  };

  const handleLauncherClick = () => {
    if (ctx.isOpen) {
      handleClose();
    } else {
      ctx.openAndFocus();
    }
  };

  if (pathname === "/ai-chatbot") {
    return null;
  }

  return (
    <>
      {chat.isOpen && isMobile && <div className="fixed inset-0 z-60 animate-in fade-in-0 bg-foreground/10 backdrop-blur-sm duration-200" onClick={handleClose} aria-hidden />}

      {chat.isOpen && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label="AI Chat"
          style={isMobile ? undefined : { width: `${size.w}px`, height: `${size.h}px` }}
          className={cn(
            "fixed z-70 flex flex-col overflow-hidden border border-border bg-card shadow-xl",
            "animate-in slide-in-from-bottom-4 fade-in-0 duration-200",
            isMobile ? "inset-0 rounded-none" : "right-6 bottom-24 rounded-2xl"
          )}
        >
          {!isMobile && (
            <div
              onMouseDown={onResizeStart}
              className="absolute top-0 left-0 z-10 flex h-8 w-8 cursor-nw-resize items-center justify-center text-muted-foreground/40 transition-colors hover:text-muted-foreground"
              aria-label="Resize chat window"
              title="Drag to resize"
            >
              <GripVertical className="h-3.5 w-3.5 -rotate-45" />
            </div>
          )}

          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>{CHAT_CONFIG.title}</h2>
              <p className="truncate text-xs text-muted-foreground">{CHAT_CONFIG.subtitle}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={chat.toggleTts} aria-label={chat.ttsEnabled ? "Disable read aloud" : "Enable read aloud"} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                {chat.ttsEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              </button>
              <button onClick={chat.startNewChat} aria-label="Start new chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                <MessageSquarePlus className="h-3.5 w-3.5" />
              </button>
              <button onClick={chat.clearChat} aria-label="Clear chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {!isMobile && (
                <button onClick={handleClose} aria-label="Minimize chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Minimize2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button onClick={handleClose} aria-label="Close chat" className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
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

          <ChatMessages
            messages={chat.messages}
            isLoading={chat.isLoading}
            ttsEnabled={chat.ttsEnabled}
            isTtsLoading={chat.isTtsLoading}
          />
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
            ttsEnabled={chat.ttsEnabled}
            onToggleTts={chat.toggleTts}
          />
        </div>
      )}

      {!chat.isOpen && (
        <div className="animate-in slide-in-from-bottom-2 fade-in-0 duration-300">
          <button
            onClick={handleLauncherClick}
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
