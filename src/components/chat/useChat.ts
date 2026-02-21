"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { ChatState } from "./chat-types";
import { loadMessages, saveMessages, clearMessages, getConversationId, newConversationId, createMessage, isFirstVisit } from "./chat-storage";
import { ChatInputMsg, sendChatMessage, sendVoiceMessage, textToSpeech } from "./chat-api";

export function useChat() {
  const [state, setState] = useState<ChatState>(() => ({
    messages: loadMessages(),
    conversationId: getConversationId(),
    isOpen: false,
    isLoading: false,
    error: null,
    unreadCount: 0,
    isRecording: false,
    recordingTime: 0,
    ttsEnabled: false,
  }));

  const [showPulse, setShowPulse] = useState(false);
  const recordingInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [recordedAudio, setRecordedAudio] = useState<{ blob: Blob; url: string } | null>(null);

  useEffect(() => {
    saveMessages(state.messages);
  }, [state.messages]);

  useEffect(() => {
    // Avoid SSR/CSR mismatch: compute first-visit pulse after mount only.
    setShowPulse(isFirstVisit());
  }, []);

  useEffect(() => {
    if (!showPulse) return;
    const t = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(t);
  }, [showPulse]);

  const setOpen = useCallback((open: boolean) => {
    setState((s) => ({ ...s, isOpen: open, unreadCount: open ? 0 : s.unreadCount }));
  }, []);

  const toggleOpen = useCallback(() => {
    setState((s) => ({ ...s, isOpen: !s.isOpen, unreadCount: !s.isOpen ? 0 : s.unreadCount }));
  }, []);

  const send = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg = createMessage("user", text.trim());
    const nextMessages = [...state.messages, userMsg];
    setState((s) => ({ ...s, messages: [...s.messages, userMsg], isLoading: true, error: null }));

    try {
      const payload: ChatInputMsg[] = nextMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const { reply } = await sendChatMessage(payload);
      const assistantMsg = createMessage("assistant", reply);
      setState((s) => ({ ...s, messages: [...s.messages, assistantMsg], isLoading: false, unreadCount: s.isOpen ? 0 : s.unreadCount + 1 }));
      if (state.ttsEnabled) {
        void textToSpeech(reply).catch(() => null);
      }
    } catch {
      setState((s) => ({ ...s, isLoading: false, error: "Failed to get a response. Please try again." }));
    }
  }, [state.messages, state.ttsEnabled]);

  const retry = useCallback(() => {
    const lastUserMsg = [...state.messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;
    setState((s) => ({ ...s, messages: s.messages.filter((m) => m.id !== lastUserMsg.id), error: null }));
    send(lastUserMsg.content);
  }, [state.messages, send]);

  const clearChat = useCallback(() => {
    clearMessages();
    setState((s) => ({ ...s, messages: [], error: null }));
  }, []);

  const startNewChat = useCallback(() => {
    clearMessages();
    const id = newConversationId();
    setState((s) => ({ ...s, messages: [], conversationId: id, error: null }));
  }, []);

  const toggleTts = useCallback(() => {
    setState((s) => ({ ...s, ttsEnabled: !s.ttsEnabled }));
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunks.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedAudio({ blob, url });
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.current = recorder;
      recorder.start();

      setState((s) => ({ ...s, isRecording: true, recordingTime: 0 }));
      recordingInterval.current = setInterval(() => {
        setState((s) => ({ ...s, recordingTime: s.recordingTime + 1 }));
      }, 1000);
    } catch {
      setState((s) => ({ ...s, error: "Microphone access denied." }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    mediaRecorder.current?.stop();
    if (recordingInterval.current) clearInterval(recordingInterval.current);
    setState((s) => ({ ...s, isRecording: false }));
  }, []);

  const cancelRecording = useCallback(() => {
    setRecordedAudio(null);
  }, []);

  const sendVoice = useCallback(async () => {
    if (!recordedAudio) return;

    const userMsg = createMessage("user", "🎤 Voice message", "voice", recordedAudio.url);
    const payload: ChatInputMsg[] = state.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
    setState((s) => ({ ...s, messages: [...s.messages, userMsg], isLoading: true, error: null }));
    setRecordedAudio(null);

    try {
      const { transcript, reply } = await sendVoiceMessage(payload, recordedAudio.blob);
      const transcriptMsg = createMessage("assistant", `*Transcript:* ${transcript}\n\n${reply}`);
      setState((s) => ({ ...s, messages: [...s.messages, transcriptMsg], isLoading: false }));
    } catch {
      setState((s) => ({ ...s, isLoading: false, error: "Failed to process voice message." }));
    }
  }, [recordedAudio, state.messages]);

  const dismissError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    ...state,
    showPulse,
    recordedAudio,
    setOpen,
    toggleOpen,
    send,
    retry,
    clearChat,
    startNewChat,
    toggleTts,
    startRecording,
    stopRecording,
    cancelRecording,
    sendVoice,
    dismissError,
  };
}
