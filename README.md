# introduction_pohuliailo

Portfolio website for **Pavlo Pohuliailo** built with Next.js (App Router), featuring project case studies, AI chat, contact form with reCAPTCHA + SES, and theme support.

## What is included

- Marketing pages: Home, About, Services, Contact, Privacy.
- Projects list with filters and pagination (10 items per page).
- Project detail pages with image carousel and full-screen lightbox.
- AI Chat:
  - floating chat widget (all pages except `/ai-chatbot`)
  - dedicated `/ai-chatbot` page
  - shared state between widget and page
  - optional voice read-aloud (TTS) toggle
- Cookie consent modal with persistent choice and footer settings trigger.
- Contact form posting to `/api/contact` with:
  - Google reCAPTCHA v3 validation
  - AWS SES email delivery

## Tech stack

- Next.js 16 (App Router)
- React 18 + TypeScript
- Tailwind CSS 4
- next-themes
- TanStack Query
- OpenAI API (chat/tts/transcribe routes)
- Supabase (RAG/vector search for chat)
- AWS SES
- Google reCAPTCHA v3

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Environment variables

Create `.env` with the required keys:

```bash
# OpenAI / AI routes
OPENAI_API_KEY=

# Supabase (for /api/chat retrieval)
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# AWS SES (for /api/contact)
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SES_FROM_EMAIL=
SES_TO_EMAIL=
```

## Useful scripts

- `npm run dev` — start dev server
- `npm run build` — build production bundle
- `npm run start` — run production server
- `npm run lint` — run lint checks
- `npm run ingest` — run ingestion script (`src/app/scripts/ingest.ts`)
