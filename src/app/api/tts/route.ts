import OpenAI from "openai";

export const runtime = "nodejs";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
}

export async function POST(req: Request) {
  const openai = getOpenAI();
  const { text } = (await req.json()) as { text: string };

  if (!text?.trim()) return new Response("Missing text", { status: 400 });

  const audio = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "coral",
    input: text,
  });

  const buffer = Buffer.from(await audio.arrayBuffer());
  return new Response(buffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
