# Aperture — AI Creative Studio

A full app shell for a text-to-image / text-to-video / image-to-video creative
studio: auth, database schema, generation history, gallery, responsive dark UI,
and a **swappable generation provider interface**.

This project intentionally ships with a **mock generation provider** (returns
placeholder gradient images / short placeholder clips) instead of a live
image/video model. Wire in a real, policy-compliant provider by implementing
one file — see [Connecting a real provider](#connecting-a-real-provider) below.

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Prisma** ORM + SQLite (swap the `datasource` block for Postgres/MySQL in prod)
- **NextAuth (Credentials)** — minimal email/password auth, session-based
- **Tailwind CSS** for styling
- Zero external image/video generation dependency — provider is pluggable

## Project structure

```
aperture-studio/
├── app/
│   ├── page.tsx                 # Main studio (prompt, settings, generate, results)
│   ├── gallery/page.tsx         # Saved creations gallery
│   ├── layout.tsx               # Root layout, theme, nav
│   ├── globals.css              # Design tokens + Tailwind
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── generate/route.ts    # POST — runs moderation, then calls the provider
│       ├── history/route.ts     # GET  — paginated generation history
│       └── creations/route.ts   # GET/DELETE — saved gallery items
├── components/
│   ├── PromptBox.tsx
│   ├── CharacterSettings.tsx    # generic "subject" settings (age-gated where relevant)
│   ├── StyleSelector.tsx
│   ├── ModeToggle.tsx           # image / video / image-to-video
│   ├── GenerationSettings.tsx   # aspect ratio, quality, duration
│   ├── ResultsGallery.tsx
│   └── HistoryPanel.tsx
├── lib/
│   ├── auth.ts                  # NextAuth config
│   ├── db.ts                    # Prisma client singleton
│   ├── moderation.ts            # Pre-generation prompt moderation (stub + hooks)
│   └── providers/
│       ├── types.ts             # GenerationProvider interface — THE swap point
│       ├── mock-provider.ts     # Default: placeholder output, no external calls
│       └── index.ts             # Provider factory (env-driven selection)
├── prisma/
│   └── schema.prisma            # User, Creation, GenerationJob, Character models
├── package.json
└── .env.example
```

## Setup

```bash
npm install
cp .env.example .env          # fill in secrets
npx prisma migrate dev --name init
npm run dev
```

Visit `http://localhost:3000`. Default mock provider works out of the box —
no API keys required to explore the UI end-to-end.

## Environment variables (`.env.example`)

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="replace-with-a-random-32-byte-string"
NEXTAUTH_URL="http://localhost:3000"

# Which provider implementation to load at runtime.
# "mock" ships by default. Add your own key (e.g. "acme") after implementing it.
GENERATION_PROVIDER="mock"

# Example placeholders for a real provider — uncomment and fill in once you've
# implemented lib/providers/<yourprovider>-provider.ts
# GEN_PROVIDER_API_KEY=""
# GEN_PROVIDER_API_URL=""
```

**Never commit `.env`.** API keys are read only on the server (`lib/providers`,
API routes) and are never sent to the client bundle.

## Connecting a real provider

1. Create `lib/providers/<name>-provider.ts` implementing the `GenerationProvider`
   interface from `lib/providers/types.ts` (`generateImage`, `generateVideo`,
   `animateImage`).
2. Register it in `lib/providers/index.ts`'s factory switch.
3. Set `GENERATION_PROVIDER=<name>` and any required key/url env vars.
4. Route all calls through your provider's own content policy and rate limits —
   this scaffold's `lib/moderation.ts` is a *pre*-generation prompt filter and
   is not a substitute for a provider's own safety systems.

The rest of the app (auth, history, gallery, UI, DB) does not need to change.

## Database schema

See `prisma/schema.prisma`. Core models:

- `User` — auth + account
- `Character` — a saved reusable subject preset (name, attributes as JSON)
- `GenerationJob` — one request: prompt, settings, mode, status, timestamps
- `Creation` — a saved/downloadable result (image or video) linked to a job

## Moderation

`lib/moderation.ts` runs **before** any provider call:

- Rejects empty/oversized prompts
- Keyword/pattern layer with clearly marked extension points for:
  - a real NSFW/CSAM classifier
  - an age-signal classifier
  - a real-person / public-figure name matcher
- Returns `{ allowed, reason }` — the API route short-circuits on `allowed: false`
  and logs the rejected attempt (see `GenerationJob.status = "REJECTED"`)

This is a scaffold, not a certified safety system — replace the stub checks
with real classifiers before handling untrusted traffic.

## Notes on the swapped-out feature set

This build intentionally omits adult/glamour-oriented character presets,
styles, and body/pose customization. It ships generic creative-subject presets
(portrait, landscape, product, fantasy, architecture, nature, abstract,
vintage film) so the same architecture can be pointed at any compliant use case.
