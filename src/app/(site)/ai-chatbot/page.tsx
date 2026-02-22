"use client";

import { useEffect, useState } from "react";
import { Brain, HelpCircle, MessageSquare, Shield, Volume2, VolumeX, Zap } from "lucide-react";
import Container from "@/components/layout/Container";
import ChatComposer from "@/components/chat/ChatComposer";
import ChatMessages from "@/components/chat/ChatMessages";
import { CHAT_CONFIG } from "@/components/chat/chat-config";
import { useSharedChat } from "@/components/chat/chat-state-context";

const capabilities = [
  { icon: Brain, text: "Portfolio & project details" },
  { icon: Zap, text: "Tech stack & skills" },
  { icon: MessageSquare, text: "Services & availability" },
  { icon: Shield, text: "Professional background" },
];

const faqs = [
  { q: "Is my data stored?", a: "Messages stay in your browser's local storage only." },
  { q: "How accurate is it?", a: "Great for portfolio info - use Contact for urgent matters." },
  { q: "Can I clear history?", a: "Yes, use the trash icon in the chat header." },
];

export default function AiChatbotPage() {
  const chat = useSharedChat();
  const [showTtsHint, setShowTtsHint] = useState(false);

  useEffect(() => {
    if (!chat.isOpen) chat.setOpen(true);
  }, [chat]);

  useEffect(() => {
    const key = "ai-chatbot-tts-hint-seen";
    const hasSeenHint = localStorage.getItem(key);
    if (!hasSeenHint) {
      setShowTtsHint(true);
      localStorage.setItem(key, "1");
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col" style={{ minHeight: "calc(100vh - 10rem)" }}>
      <Container className="flex flex-1 flex-col gap-6 py-8 lg:flex-row">
        <aside className="shrink-0 space-y-6 lg:w-72">
          <div>
            <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              AI Chatbot
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Ask me anything about my work, skills, or availability.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">Capabilities</h2>
            <ul className="space-y-2">
              {capabilities.map((c) => (
                <li key={c.text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <c.icon className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                  {c.text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <div key={f.q}>
                  <p className="flex items-start gap-1.5 text-xs font-medium text-foreground">
                    <HelpCircle className="mt-0.5 h-3 w-3 shrink-0 text-primary/60" />
                    {f.q}
                  </p>
                  <p className="ml-[18px] text-xs text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{CHAT_CONFIG.title}</p>
              <p className="truncate text-xs text-muted-foreground">{CHAT_CONFIG.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <ChatMessages
              messages={chat.messages}
              isLoading={chat.isLoading}
              ttsEnabled={chat.ttsEnabled}
              isTtsLoading={chat.isTtsLoading}
            />
          </div>

          <div className="relative border-t border-border px-4 py-2">
            {showTtsHint && (
              <div className="absolute right-4 bottom-12 z-10 max-w-[260px] rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground shadow-lg">
                Toggle this button to turn AI voice read-aloud on or off.
                <button
                  type="button"
                  onClick={() => setShowTtsHint(false)}
                  className="ml-2 text-primary hover:underline"
                >
                  Got it
                </button>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={chat.toggleTts}
                aria-label={chat.ttsEnabled ? "Turn sound read off" : "Turn sound read on"}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {chat.ttsEnabled ? (
                  <>
                    <Volume2 className="h-3.5 w-3.5" />
                    Voice On
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3.5 w-3.5" />
                    Voice Off
                  </>
                )}
              </button>
            </div>
          </div>

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
      </Container>
    </div>
  );
}
