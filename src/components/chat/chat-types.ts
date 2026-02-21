export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  type: "text" | "voice";
  audioUrl?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  conversationId: string;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  isRecording: boolean;
  recordingTime: number;
  ttsEnabled: boolean;
}
