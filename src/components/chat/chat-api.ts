export type ChatInputMsg = {
  role: "user" | "assistant";
  content: string;
};

let activeAudio: HTMLAudioElement | null = null;
let activeAudioUrl: string | null = null;

function clearActiveAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  if (activeAudioUrl) {
    URL.revokeObjectURL(activeAudioUrl);
    activeAudioUrl = null;
  }
}

export function stopTextToSpeechPlayback() {
  clearActiveAudio();
}

export async function sendChatMessage(messages: ChatInputMsg[]): Promise<{ reply: string }> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok || !res.body) {
    throw new Error("Chat request failed");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let reply = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    reply += decoder.decode(value, { stream: true });
  }

  return { reply };
}

export async function sendVoiceMessage(messages: ChatInputMsg[], audioBlob: Blob): Promise<{ transcript: string; reply: string }> {
  const file = new File([audioBlob], "voice.webm", { type: "audio/webm" });
  const form = new FormData();
  form.append("file", file);

  const transcribeRes = await fetch("/api/transcribe", { method: "POST", body: form });
  if (!transcribeRes.ok) {
    throw new Error("Transcription failed");
  }

  const { text } = (await transcribeRes.json()) as { text: string };
  const transcript = text?.trim();
  if (!transcript) {
    throw new Error("Empty transcript");
  }

  const { reply } = await sendChatMessage([...messages, { role: "user", content: transcript }]);
  return { transcript, reply };
}

export async function textToSpeech(text: string): Promise<string | null> {
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) return null;

  // Stop any existing playback before starting a new one.
  clearActiveAudio();

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  activeAudio = audio;
  activeAudioUrl = url;
  audio.onended = () => {
    if (activeAudio === audio) {
      clearActiveAudio();
    } else {
      URL.revokeObjectURL(url);
    }
  };
  audio.onerror = () => {
    if (activeAudio === audio) {
      clearActiveAudio();
    } else {
      URL.revokeObjectURL(url);
    }
  };
  await audio.play();
  return url;
}
