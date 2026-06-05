---
name: sierra-frontend-integration
description: Integrate the standalone `frontend` repo (ahmedfawzy8866/frontend) into the 28-5-Si monorepo's `frontend-vercel/` app, keeping `firebase-backend/` intact. Use when syncing the latest frontend, resolving drift between the two, handling env/secrets safely, and verifying the merged build.
---

# Sierra AI — Frontend Integration Skill

This monorepo (`28-5-Si`) is the **consolidated home** for Sierra Blu / Sierra Estates.
It has two top-level apps:

```
28-5-Si/
├── frontend-vercel/     # Next.js 14 App Router app (deployed to Vercel)
└── firebase-backend/    # Firebase Cloud Functions (Node 20) — DO NOT overwrite during a frontend sync
```

The canonical frontend lives in a **separate repo**: `ahmedfawzy8866/frontend`.
`frontend-vercel/` is a mirror of that repo's root. Integration = bringing the
canonical `frontend` content into `frontend-vercel/` without disturbing the backend.

## When to use this skill

- Pulling the latest `frontend` repo changes into the monorepo.
- Resolving "the two frontends have drifted" situations.
- Onboarding a fresh clone so the merged app installs, builds, and runs.

## Golden rules

1. **`frontend` is the source of truth.** On conflicts, the `frontend` repo wins.
2. **Never touch `firebase-backend/`** during a frontend sync.
3. **Never commit secrets.** `.env.local` holds live keys. It MUST stay gitignored.
4. **The build must pass** (`npm run build`) before you commit.

## Step-by-step

### 1. Map the drift first
From the repo roots, compare before copying so you know what will change:

```bash
diff -rq \
  --exclude='.git' --exclude='node_modules' --exclude='.next' \
  --exclude='package-lock.json' --exclude='tsconfig.tsbuildinfo' \
  ../frontend  frontend-vercel | sort
```

`frontend` is normally a **superset** of `frontend-vercel` (it adds `design-system/`,
`middleware.ts`, `.vercelignore`). Expect a short list of `… differ` lines plus
`Only in ../frontend: …` additions, and **no** `Only in frontend-vercel: …` lines.
If target-only files appear, investigate before deleting them.

### 2. Sync (frontend → frontend-vercel)
Copy every top-level entry except VCS/build artifacts:

```bash
cd ../frontend
for item in $(ls -A); do
  case "$item" in
    .git|node_modules|.next|.vercel) continue;;
  esac
  cp -a "$item" ../28-5-Si/frontend-vercel/
done
```

`.env.local` will be copied (needed locally to build). That is fine **only because**
the monorepo `.gitignore` ignores `**/.env*.local` — verify in the next step.

### 3. Verify secrets stay out of git — ALWAYS
```bash
cd ../28-5-Si
git check-ignore frontend-vercel/.env.local   # must print the path (= ignored)
git add -A && git status --short | grep -i '\.env' | grep -v '\.env.example'
```
The second command must print **nothing**. If a real `.env*.local` is staged, stop
and fix `.gitignore` before doing anything else.

> Note: the upstream `frontend` repo has historically committed a live `.env.local`.
> Treat any keys in it as compromised and rotate them; only ship a redacted
> `.env.example` here.

### 4. Clean accidental artifacts
The `app/` tree has occasionally accumulated saved-webpage junk (e.g. a
`صورة - صور Google_files/` folder of `gapi`/`googleapis` downloads). These are not
routes and nothing imports them. Confirm and remove:

```bash
grep -rl "gapi.loaded\|googleapis.proxy" frontend-vercel/app || echo "no importers"
rm -rf "frontend-vercel/app/صورة - صور Google_files"
```

### 5. Install & build
```bash
cd frontend-vercel
npm install --no-audit --no-fund
npm run build
```
`next.config.js` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`,
so a green `next build` means routes compiled and statically analyzed — it does **not**
guarantee type-clean code. Run `npx tsc --noEmit` separately when you need that.

### 6. Commit
Work on the assigned feature branch, never `master`:
```bash
git add -A
git commit -m "feat: integrate latest frontend into frontend-vercel"
git push -u origin <feature-branch>
```

## Architecture cheat-sheet (so you know what you're moving)

- **Framework:** Next.js 14 App Router, React 18, TypeScript, Tailwind 3.4.
- **Path alias:** `@/*` → `frontend-vercel/*` (see `tsconfig.json`).
- **i18n:** `lib/I18nContext.tsx` (English / Arabic, RTL aware).
- **Theming:** `next-themes` with `attribute="data-theme"`, dark default.
- **Data:** Firebase (client + admin). Listings fetched from `/api/listings`.
- **Key API routes:** `/api/listings`, `/api/property-finder`, `/api/crm/*`,
  `/api/concierge/[leadId]`, `/api/whatsapp/webhook`, `/api/telegram`, `/api/seed`.
- **Design system:** `frontend-vercel/design-system/` (tokens, UI kits, `SKILL.md`).

## Definition of done

- [ ] `diff -rq` shows the two frontends are aligned (frontend ⊇ frontend-vercel).
- [ ] `git check-ignore` confirms `.env.local` is ignored; no secrets staged.
- [ ] `npm install` clean; `npm run build` succeeds.
- [ ] `firebase-backend/` untouched.
- [ ] Changes committed to the feature branch and pushed; PR opened.
