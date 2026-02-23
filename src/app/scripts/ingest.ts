import "./load-env";
import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
);

async function embed(text: string) {
  const r = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return r.data[0].embedding;
}

// Basic markdown-aware chunker:
// 1) split by headings, 2) merge into ~maxChars chunks with overlap.
function chunkMarkdown(md: string, opts?: { maxChars?: number; overlapChars?: number }) {
  const maxChars = opts?.maxChars ?? 1800;
  const overlapChars = opts?.overlapChars ?? 200;

  const normalized = md
      .replace(/\r\n/g, "\n")
      .replace(/\t/g, "  ")
      .trim();

  // Split into sections starting with a heading line, but keep heading with its section.
  const lines = normalized.split("\n");
  const sections: { title: string; text: string }[] = [];

  let currentTitle = "CV";
  let buf: string[] = [];

  const pushSection = () => {
    const text = buf.join("\n").trim();
    if (text) sections.push({ title: currentTitle, text });
    buf = [];
  };

  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.*)\s*$/);
    if (m) {
      pushSection();
      currentTitle = m[2].trim();
      buf.push(line);
    } else {
      buf.push(line);
    }
  }
  pushSection();

  // Now pack sections into chunks of ~maxChars.
  const chunks: { title: string; content: string }[] = [];
  let current = "";
  let title = "CV";

  const flush = () => {
    const c = current.trim();
    if (c) chunks.push({ title, content: c });
    current = "";
  };

  for (const s of sections) {
    const block = s.text.trim();
    if (!block) continue;

    // If a single section is huge, split it hard.
    if (block.length > maxChars) {
      flush();
      title = s.title;

      for (let i = 0; i < block.length; i += maxChars - overlapChars) {
        const part = block.slice(i, i + maxChars);
        chunks.push({ title, content: part.trim() });
      }
      title = "CV";
      continue;
    }

    // Otherwise try to append into current chunk.
    if ((current + "\n\n" + block).length > maxChars) {
      flush();
      title = s.title;
      current = block;
    } else {
      if (!current) title = s.title;
      current = current ? `${current}\n\n${block}` : block;
    }
  }
  flush();

  return chunks;
}

async function main() {
  const mdPath = process.argv[2] ?? "cv.md";
  const absPath = path.resolve(mdPath);

  const md = await fs.readFile(absPath, "utf8");

  // Remove existing CV chunks so re-run replaces them
  const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .contains("metadata", { source: "cv" });
  if (deleteError) console.warn("Could not delete old CV docs:", deleteError);

  const chunks = chunkMarkdown(md, { maxChars: 1800, overlapChars: 200 });

  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const embedding = await embed(c.content);

    const { error } = await supabase.from("documents").insert({
      content: c.content,
      metadata: {
        title: c.title,
        source: "cv",
        url: `file://${absPath}`,
        chunk: i + 1,
        chunks_total: chunks.length,
      },
      embedding,
    });

    if (error) throw error;
  }

  console.log("Done. Ingested", chunks.length, "chunks from", absPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});