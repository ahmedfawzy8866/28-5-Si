---
name: sierra-ui-refinement
description: Refine the Sierra Blu frontend UI/UX with modern design best practices — correct font loading, Property-Finder-style search, bilingual/RTL polish, accessible motion, and the "Quiet Luxury" navy/gold design language. Use when restyling pages, building search/filter UI, or auditing visual quality in frontend-vercel.
---

# Sierra Blu — UI/UX Refinement Skill

Sierra Blu (a.k.a. Sierra Estates) is a **Quiet-Luxury PropTech** platform for
**New Cairo** real estate (Rent & Resale). The aesthetic is editorial, calm, and
confident — never loud. This skill encodes the rules that keep refinements on-brand
and modern. Pair it with the in-repo design system at
`frontend-vercel/design-system/SKILL.md` for tokens and UI-kit references.

## Design language (memorize this)

| Token | Value | Use |
|------|-------|-----|
| Navy (bg) | `#0A1628` / `#0D2035` | Primary dark background |
| Gold (accent) | `#C9A24D` → `#E9C176` | CTAs, highlights, hairlines |
| Ivory (text on dark) | `#F4F0E8` | Body/heading text on navy |
| Sierra Blue | `#1B6CA8` / `#1E88D9` | Secondary accent, links |
| Success / Limited / New | emerald / amber / sky | Status pills |

- **Display serif:** `Cormorant Garamond` (headlines, prices).
- **UI sans:** `Jost` → `Inter` fallback (labels, body, data).
- **Mono:** `DM Mono` (prices, stats, SBR codes).
- **Arabic:** `Cairo` (all `dir="rtl"` content).

> ⚠️ **Font-loading gotcha (real bug to guard against):** `app/page.tsx` and
> `tailwind.config.js` reference Cormorant Garamond / Jost / DM Mono, but a stale
> `app/layout.tsx` only loaded Playfair/Inter/Cairo — so headings silently fell back
> to system serif. **Any font used in code must be loaded in `app/layout.tsx`.**
> Verify with: `grep -ro "fontFamily: \"'[^']*'" app | sort -u` and reconcile against
> the `<link>` / `next/font` declarations in `layout.tsx`.

## Modern best practices to apply

1. **One source of truth for copy.** Page text lives in a `COPY` object keyed by
   locale (`en`/`ar`). Don't hard-code visible strings inline; add them to `COPY`
   and read both languages. Prefer `app/data/landing-page.ts` over duplicating
   `COPY` inside `page.tsx`.
2. **Token-first styling.** Reference CSS variables (`var(--gold-prime)`, `--text`,
   `--border`) or the theme object (`th.*`), never new ad-hoc hex values.
3. **Bilingual + RTL by construction.** Every block must honor `dir`. Flip with
   `flexDirection: isAr ? 'row-reverse' : 'row'`, `textAlign: isAr ? 'right' : 'left'`,
   and mirror `order`. Numbers in Arabic use Eastern-Arabic numerals where the
   existing copy does.
4. **Accessible & responsive.** Tap targets ≥ 44px; `<select>`/`<input>` need real
   labels; maintain visible focus (`focus:border-secondary`); mobile-first, expand at
   `sm`/`md`/`lg`. Respect `prefers-reduced-motion`.
5. **Restrained motion.** 200–700ms, `cubic-bezier(.16,1,.3,1)`. Reveal-on-scroll via
   `IntersectionObserver` adding a `.visible` class. Hover = color/shadow shift, not
   scale-up. No bounce.
6. **Real images, graceful fallback.** Listings come from `/api/listings`; keep the
   `STATIC_LISTINGS` fallback so the hero never renders empty.

## Property-Finder-style search (the hero filter)

The signature pattern for this product. Build it like the regional portals (Property
Finder / Bayut):

1. **Purpose tabs on top:** `Rent · Resale · New Projects` (segmented control). Drive
   a `purpose` state; it changes price bands and result intent. This is the headline
   interaction users expect — lead with it.
2. **Search row beneath:** Location/Compound → Property Type → Beds → Price → a
   prominent gold **Search** button (with a search icon).
3. **New Cairo zones** are first-class: Fifth Settlement, Madinaty, Mountain View,
   Mostakbal City, Hyde Park, Mivida.
4. Keep it glassmorphic over the hero image: `backdrop-blur`, translucent surface,
   gold hairline border. Bilingual labels throughout.
5. Currency rule: render `< 10,000` as USD `$`, otherwise `EGP` (matches backend).

A reference implementation lives in `components/HeroFilter.tsx`; the live homepage
filter is inlined in `app/page.tsx`. Keep the two visually consistent.

## Hero content guidance (New Cairo)

- Lead with place + promise: New Cairo, Rent & Resale, intelligence-led.
- Headline in display serif, ≤ 2 lines, one gold emphasis span.
- Short uppercase tagline (tracking ~`.24em`) above the H1.
- One-sentence subhead naming real zones; one-paragraph description; two CTAs
  (primary gold "Explore", secondary outline "Talk to Sierra AI").
- Provide `en` and `ar` for every string.

## Workflow

1. Identify the surface; read its current `COPY`/tokens.
2. Make the change token-first and bilingual.
3. Check RTL by mentally setting `locale='ar'`.
4. `npm run build` to confirm no regression; spot-check both locales and themes.

## Anti-patterns (reject these)

- New hex colors or fonts outside the token set.
- English-only strings, or LTR-only layout.
- Emoji in product UI (allowed only in conversational AI replies).
- Aggressive marketing voice ("amazing!!", "click here now").
- `scale(1.1)` hover circus / long bouncy animations.
