---
name: sierra-code-quality
description: Enforce code quality and consistency across the merged Sierra AI monorepo (frontend-vercel + firebase-backend) — TypeScript hygiene, the single COPY source pattern, import/path conventions, bilingual correctness, no committed secrets or scratch files, and build/type gates. Use when reviewing, refactoring, or before committing merged code.
---

# Sierra AI — Code Quality & Consistency Skill

Goal: keep the consolidated monorepo coherent after frontend/branch merges. The
codebase compiles to "0 errors, 0 warnings" as a target — protect that.

## Repository conventions

- **Path alias:** import via `@/…` (maps to `frontend-vercel/*`). Don't use long
  relative chains (`../../../lib/...`).
- **Client vs server:** files using hooks/state/`window` start with `"use client"`.
  API routes (`app/api/**/route.ts`) are server-only — never import client contexts
  (`I18nContext`, `AuthContext`) into them.
- **Components:** PascalCase files in domain folders (`Landing/`, `CRM/`, `Admin/`,
  `Maps/`, `ui/`). One component per file; default-export the component.
- **Naming/brand:** the persona is **"Sierra"**. The name **"Laila" is purged** — flag
  any reintroduction. Brand is **Sierra Blu / Sierra Estates**.

## TypeScript hygiene

- `next.config.js` intentionally sets `ignoreBuildErrors`/`ignoreDuringBuilds` so the
  product ships — this is a crutch, not a license. Run the real gate yourself:
  ```bash
  cd frontend-vercel && npx tsc --noEmit
  ```
- Type external data (Firestore docs, API payloads) with the interfaces in
  `lib/models/` — don't pass `any` through the listing/lead pipeline.
- No unused imports/vars; no dead `console.log` in committed code.

## The "single COPY source" rule (most common drift)

Bilingual copy must not be duplicated. The canonical content object is
`app/data/landing-page.ts` (`COPY`, `THEMES`, static listings). If you find a second
`COPY`/`THEMES` literal pasted inside `app/page.tsx`, that is drift — consolidate to
the shared module and import it. Every visible string needs both `en` and `ar`.

## Bilingual / RTL correctness

- No user-facing English-only literals in JSX — route through `T.*` (the active
  locale slice of `COPY`).
- Layout must read `dir`/`isAr` and mirror direction, alignment, and `order`.
- Keep `en` and `ar` keys structurally identical (same keys, same array lengths) so
  switching locale never yields `undefined`.

## Secrets & artifacts (hard rules)

1. **Never commit `.env*.local`.** It is gitignored (`**/.env*.local`); keep it that
   way. Ship only redacted `.env.example`. Treat any key that ever landed in git as
   compromised → rotate it.
2. **No scratch/saved-webpage junk** under `app/` (e.g. `*_files/` with `gapi`,
   `googleapis.proxy`, `*.download`). Delete on sight; nothing imports it.
3. **No build artifacts in git:** `node_modules/`, `.next/`, `*.tsbuildinfo`,
   `next-env.d.ts` are ignored — don't force-add them.

## Pre-commit checklist

```bash
cd frontend-vercel
git status --short | grep -i '\.env' | grep -v '\.env.example'   # must be empty
npm run build                                                    # must succeed
npx tsc --noEmit                                                 # aim for clean
grep -rn "console.log" app components lib | grep -v node_modules # review leftovers
grep -rni "laila" app components lib                             # must be empty
```

- [ ] No secrets / scratch files / build artifacts staged.
- [ ] `npm run build` green; `tsc --noEmit` reviewed.
- [ ] No duplicated `COPY`/`THEMES`; all strings bilingual.
- [ ] Imports use `@/`; client/server boundaries respected.
- [ ] Commit message is conventional (`feat:`, `fix:`, `refactor:`, `docs:`), scoped,
      and on the assigned feature branch — never `master`.

## Backend (firebase-backend) notes

- Cloud Functions target **Node 20**; keep `functions/package.json` engines aligned.
- Don't let a frontend sync overwrite backend files — they live in a separate tree
  and a separate deploy (`firebase.json`, `firestore.rules`, `storage.rules`).
