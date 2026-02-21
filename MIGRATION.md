# Migration Plan: Vite React -> Next.js 16.1.6 (App Router)

## Step 0 Inventory (source: `clean-slate-websites`)

### Routes (React Router)

| Current path | Component | Notes |
|---|---|---|
| `/` | `pages/Index.tsx` | Landing page |
| `/about` | `pages/About.tsx` | Static content |
| `/projects` | `pages/Projects.tsx` | Project list |
| `/projects/:slug` | `pages/ProjectDetail.tsx` | Dynamic slug route |
| `/services` | `pages/Services.tsx` | Services page |
| `/contact` | `pages/Contact.tsx` | Contact page |
| `*` | `pages/NotFound.tsx` | Catch-all fallback |

Shared route shell in source app:
- `components/layout/Layout.tsx` wraps all routes with:
  - `Header`
  - `PageTransition`
  - `Footer`
  - `AiChatWidget`

### Global providers in source app

Defined in `src/App.tsx`:
- `QueryClientProvider` (`@tanstack/react-query`)
- Custom `ThemeProvider` (`src/hooks/useTheme.tsx`)
- `TooltipProvider` (`@/components/ui/tooltip`)
- `Toaster` (`@/components/ui/toaster`)
- `Sonner` (`@/components/ui/sonner`)
- `BrowserRouter`

### Data sources / API calls

- No live backend API in the source app pages.
- Chat uses local stubs from `src/components/chat/chat-api.ts`:
  - `sendChatMessage(...)` (simulated delay + static replies)
  - `sendVoiceMessage(...)` (simulated transcript/reply)
  - `textToSpeech(...)` stub returning `null`
- Local browser storage:
  - Theme: `localStorage("theme-preference")`
  - Chat state: message + conversation keys from `chat-storage.ts`
- No React Query query hooks are currently used for remote data.

### Critical UI patterns

- App shell: sticky header + mobile menu, footer, floating AI chat launcher/panel.
- Route transitions via `PageTransition`.
- Tailwind + shadcn/Radix patterns with `cn()` utility.
- Theme switching via `dark` class on `<html>`.
- Design tokens and utility classes in `src/index.css`.

## Route Mapping (target Next App Router)

| Source route | Next route |
|---|---|
| `/` | `src/app/(site)/page.tsx` |
| `/about` | `src/app/(site)/about/page.tsx` |
| `/projects` | `src/app/(site)/projects/page.tsx` |
| `/projects/:slug` | `src/app/(site)/projects/[slug]/page.tsx` |
| `/services` | `src/app/(site)/services/page.tsx` |
| `/contact` | `src/app/(site)/contact/page.tsx` |
| `*` | `src/app/not-found.tsx` |

Shared shell target:
- `src/app/layout.tsx` (root providers)
- `src/app/(site)/layout.tsx` (header/footer/chat shell for site pages)

## Proposed migration sequence (2–5 stages)

1. **Core shell + providers**
   - Scaffold new Next app.
   - Configure App Router layout, theme, React Query, sonner, utility functions.
2. **Routing + site shell**
   - Add route groups/layouts.
   - Migrate header/footer/navigation and route transitions.
3. **Shared UI + utilities**
   - Port reusable shadcn/radix components and hooks.
   - Port design tokens and global styles.
4. **Pages/features migration**
   - Migrate `Index` first, then `About`, `Services`, `Projects`, `ProjectDetail`, `Contact`.
   - Port AI chat widget (stub API first, behavior-preserving).
5. **Polish + parity checks**
   - Visual parity checks and responsive fixes.
   - Build/test/route verification and known-differences documentation.

## Implemented in this checkpoint (Step 1–2)

- Created new Next app in `next-app/` using:
  - Next `16.1.6`
  - React `18.3.1`
  - TypeScript strict mode
  - App Router + `src/` directory
- Added migration dependencies (Radix, shadcn utilities, React Query, RHF, Zod, sonner, next-themes, etc.).
- Added providers:
  - `src/providers/react-query-provider.tsx`
  - `src/providers/theme-provider.tsx`
- Added utility:
  - `src/lib/cn.ts`
  - `src/lib/utils.ts`
- Wired root layout:
  - `suppressHydrationWarning` on `<html>`
  - `ThemeProvider`
  - `ReactQueryProvider`
  - Sonner `<Toaster />`

## Implemented in this checkpoint (Step 3–5)

- Added App Router route shell:
  - `src/app/(site)/layout.tsx` with `Header`, `PageTransition`, `Footer`, `AiChatWidget`
- Migrated routes:
  - `src/app/(site)/page.tsx`
  - `src/app/(site)/about/page.tsx`
  - `src/app/(site)/projects/page.tsx`
  - `src/app/(site)/projects/[slug]/page.tsx`
  - `src/app/(site)/services/page.tsx`
  - `src/app/(site)/contact/page.tsx`
  - `src/app/not-found.tsx`
- Migrated shared components/hooks/data:
  - `src/components/layout/*` (`Header`, `Footer`, `Container`)
  - `src/components/*` (`Reveal`, `SectionHeading`, `Tag`, `ThemeToggle`, `PageTransition`)
  - `src/components/chat/*` (`AiChatWidget`, `useChat`, `chat-*`, `ChatMessages`, `ChatBubble`, `ChatComposer`)
  - `src/hooks/useReveal.ts`, `src/hooks/use-mobile.tsx`
  - `src/data/projects.ts`
- Migrated global design tokens/utilities into `src/app/globals.css`.

## Known differences / TODOs

- Profile image was not copied as a binary asset; placeholder blocks are used on Home/About.
- Chat API remains stubbed (`chat-api.ts`) to preserve source behavior parity.
- `TooltipProvider` and legacy shadcn toast reducer (`ui/toaster`) are not currently mounted because migrated routes/components do not require them; Sonner is active globally.

