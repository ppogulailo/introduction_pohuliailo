import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
}

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

async function embed(openai: OpenAI, text: string) {
  const r = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return r.data[0].embedding;
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response("OPENAI_API_KEY is not configured.", { status: 503 });
  }

  const openai = getOpenAI();
  const { messages } = (await req.json()) as { messages: Msg[] };
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

  // Skip vector search if Supabase is not configured — answer from system prompt only.
  let context = "";
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = getSupabase();
    const queryEmbedding = await embed(openai, lastUser);

    const { data: chunks, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.2,
      match_count: 6,
    });

    if (!error && chunks?.length) {
      context = chunks
        .map((c: any, i: number) => {
          const title = c.metadata?.title ?? "Source";
          const url = c.metadata?.url ?? c.metadata?.source ?? "local";
          const page = c.metadata?.page ? ` p.${c.metadata.page}` : "";
          return `[S${i + 1}] ${title} (${url}${page})\n${c.content}`;
        })
        .join("\n\n");
    }
  }

  const system = `
You are the personal AI assistant on Pavlo Pohuliailo's portfolio website (https://www.pohuliailo.com).

About Pavlo:
Pavlo Pohuliailo is a Senior Software Engineer and Team Lead based in Kyiv, Ukraine with 7+ years of experience building scalable web products. He specialises in Next.js/React, Node.js/NestJS, TypeScript, microservices, cloud (AWS/Azure), CI/CD, and authentication systems (SSO/SAML/OIDC, Auth0, Microsoft Entra ID). He is currently a Lead Software Engineer at EPAM Systems and also takes freelance projects on Upwork ($5,000+ earned).

Contact & links:
- Email: pavel.pogulailo@gmail.com
- Phone: +380 (98) 318 71 34
- LinkedIn: https://www.linkedin.com/in/pogulailopavel/
- GitHub: https://github.com/ppogulailo
- Upwork: https://www.upwork.com/freelancers/pavelp48
- Portfolio: https://www.pohuliailo.com/
- Video intro: https://www.youtube.com/watch?v=e9pvT5_ZZ3M

Your role:
1. For greetings, thanks, small talk, or general questions like "What can you do?" — reply briefly and naturally. You can introduce yourself as Pavlo's AI assistant.
2. For questions about Pavlo's skills, experience, projects, availability, or how to hire him — answer using the provided knowledge base context. Cite sources like [S1], [S2] when appropriate.
3. For questions not covered by the context — give a helpful general answer based on what you know about Pavlo, and suggest the visitor contact him directly via email or LinkedIn for specifics.
4. Always be professional, concise, and encouraging. Help visitors understand Pavlo's expertise and how to get in touch.

If asked "Who are you?" say: "I'm Pavlo's AI assistant. I can answer questions about his skills, experience, projects, and how to work with him."
  `.trim();

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      { role: "system", content: system },
      {
        role: "user",
        content: `Context:\n${context}\n\nUser question:\n${lastUser}`,
      },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of stream) {
          const delta = part.choices[0]?.delta?.content ?? "";
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
