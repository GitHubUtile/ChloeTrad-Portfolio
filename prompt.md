# chloetrad.com — Stitch Prompt

A self-contained generative brief. Given an empty directory, this prompt is sufficient for another agent or model to rebuild the site end-to-end. The brief restates every decision; nothing in here is optional unless explicitly marked.

---

## 1. Project Overview

Personal portfolio for **Chloe Trad**, a Lebanese graphic designer (Beirut). Trilingual practice across Latin + Arabic letterforms; eight projects across branding, editorial typography, motion, UI/UX, packaging and illustration.

The site replaces a hand-coded HTML build whose case studies were offloading the actual work to Google Drive. The rebuild treats each project as a real, in-page case study; Drive becomes a PDF fallback at most.

Positioning: an editorial monograph for a working designer — disciplined, typographic, restrained, with exactly one signature interaction per surface.

Sister project to mirror: `joelle-trad-archi` (Anthony's other portfolio build). Same Astro/Tailwind/Motion stack, simpler i18n (no Arabic UI here), pink accent.

---

## 2. Technical Architecture

| Dependency | Version | Purpose |
|---|---|---|
| `astro` | ^5.18 | SSG + islands |
| `@astrojs/react` | ^4.4 | React islands integration |
| `@astrojs/sitemap` | ^3.7 | Auto-sitemap |
| `@tailwindcss/vite` + `tailwindcss` | ^4.2 | CSS-first utility styling |
| `react` + `react-dom` | ^19 | Islands runtime |
| `motion` | ^12 | Scroll + spring + variants |
| `lucide-react` | latest | Icon set (no emojis) |
| `typescript` | ^5 | Strict types |
| `@astrojs/check` | ^0.9 | Type checking |

Node ≥22.12. No backend. Forms go through **Formspree**. Hosting on **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml` copied from joelle-trad-archi). Static output only.

`tsconfig.json` extends `astro/tsconfigs/strict` with path aliases (`@components`, `@islands`, `@i18n`, `@data`, `@animations`, `@content`).

---

## 3. Internationalization

Two languages — **English (default)** and **French**. No Arabic UI. (Arabic typography appears inside the Visual Poetry case study, set in IBM Plex Sans Arabic.)

`astro.config.mjs`:
```js
i18n: { defaultLocale: 'en', locales: ['en', 'fr'], routing: { prefixDefaultLocale: true } }
```

Routes: `/` → 302 to `/en/`. All locale pages live under `/[lang]/...`. Hreflang links generated automatically.

i18n files:
- `src/i18n/languages.ts` — `Lang = 'en' | 'fr'`, default `en`, dir always `ltr`.
- `src/i18n/utils.ts` — `useTranslation`, `getLocalizedPath`, `getLocalizedContent`, `getDirection`.
- `src/i18n/en.json`, `src/i18n/fr.json` — flat key/value translations.

Per-project content is stored as objects keyed by lang: `{ "en": "...", "fr": "..." }`. `getLocalizedContent` returns the right field at render time.

---

## 4. Theme System (Light + Dark) + Chromatic Theme

Light is default. Dark mode toggle in header. Initial mode honors `localStorage['theme']` then `prefers-color-scheme`. FOUC prevented via inline `<script is:inline>` in `BaseLayout` that runs before paint.

**Light palette (default)**
```
--bg          #F5F1EC   warm paper
--surface     #FFFFFF   card / sheet
--surface-alt #EFEAE3   pulled-back background
--ink         #1A1614   warm near-black
--ink-soft    #3A332E
--muted       #8A7F75   captions, meta, eyebrows
--rule        #E5DDD3   hairlines, borders
--accent      #E84A8A   fuchsia pink — the only saturated color in the system
--accent-soft #FFE4ED   wash backgrounds, hover halos
--accent-strong #D03872 hover/active state
--footer-bg   #1A1614
```

**Dark palette**
```
--bg          #14110F
--surface     #1F1B18
--surface-alt #25201C
--ink         #F0EAE2
--ink-soft    #C7BFB4
--muted       #8A7F75
--rule        #2A2522
--accent      #FF6BA3   slightly lifted for contrast
--accent-soft #3A1F2A
--accent-strong #FF85B5
--footer-bg   #0E0C0B
```

Verified WCAG AA: ink/bg and accent/bg combinations clear 4.5:1 at body sizes.

**Chromatic theme (interaction #4)** — Each project carries its own brand accent in its JSON (`"accent": "#E85A2B"` for Shifit, etc.). On case-study pages, the `ChromaticTheme` island swaps `--accent` and `--accent-soft` to that project's color on mount and restores defaults on unmount. CSS `:root` has `transition: --accent 250ms ease`. The base accent reasserts when the user leaves the case study.

**Grain overlay** — Body has `.grain-overlay` class. A fixed `::before` pseudo-element paints a 60kb SVG fractal-noise texture at ~6% opacity with `mix-blend-mode: multiply` in light, `screen` in dark. ~3% perceived intensity.

---

## 5. Typography (Self-Hosted)

All fonts self-hosted in `public/fonts/` as woff2, downloaded from Google Fonts gstatic at build authoring time. No CDN font loads. Two cuts preloaded in `BaseLayout` (`fraunces-600.woff2`, `inter-400.woff2`).

| Role | Family | Cuts |
|---|---|---|
| Display | **Fraunces** | 400, 600, 700, 400 italic |
| Body/UI | **Inter** | 400, 500, 600 |
| Mono / meta | **JetBrains Mono** | 400 |
| Arabic display (Visual Poetry case study only) | **IBM Plex Sans Arabic** | 400, 600 |

Scale (responsive `clamp()`):
- Hero display: `clamp(3.25rem, 11vw, 8.5rem)`
- H1: `clamp(2.75rem, 8vw, 6rem)`
- H2: `clamp(2rem, 4.5vw, 3.5rem)`
- Display body (lead/quote): `clamp(1.25rem, 2.2vw, 1.75rem)`
- Body: `1rem` mobile, `1.0625rem` desktop, line-height 1.6
- Eyebrow / meta: `0.75rem`, mono, tracking `0.15em`, uppercase
- Form label: `0.6875rem`, mono, tracking `0.18em`

`text-wrap: balance` on headings (`.text-balance`), `pretty` on body (`.text-pretty`).

---

## 6. Visual Design Language

- **Editorial monograph**: warm paper, warm near-black ink, generous whitespace, hairline rules, mono captions, large display headings, italic display variants for tag lines.
- **One accent**: pink only. Pink earns attention because everything else is restrained.
- **Eyebrows**: mono uppercase microtype above every section title (`eyebrow` utility class).
- **Numbered everything**: nav items show `01–04`, projects show `01–08`, "obsessions" list 01-02-03. Numbering signals "monograph", not "marketing site".
- **Hairlines**: hr rules between sections; columns separated by lines, not boxes.
- **Cursor**: native cursor only. No custom cursor blob.
- **Imagery**: imported from current chloetrad.com (`/images/projects/{slug}/...` and `/images/thumbnails/...`).
- **Round-corners**: only on filter chips and the toggle. Buttons, cards, images all sharp.

---

## 7. Page Specifications

### `/[lang]/` Home

1. **Hero** (`data-hero`) — Eyebrow row: pulsing green-pink dot + "Open for new work — Beirut, Lebanon". Display H1: "Chloe Trad" + italic muted "graphic designer". Stays type-only — no project images above the fold (Jordan Delcros pattern).
2. **Bilingual marquee + scroll-velocity** (interaction #2) — Two infinite marquees (Latin + Arabic) react to `useScroll().velocity` via `useTransform` → `motion.skewX`. Capped at ±12deg desktop / ±6deg mobile. `prefers-reduced-motion` → static text.
3. **Lead paragraph + CTAs** — Two-column on lg+: short bio paragraph left, btn-primary "See all work" + btn-ghost "Start a conversation" right.
4. **Featured drag-scroll reel** (interaction #3) — 3 featured cards (Shifit, Visual Poetry, TuneDay). Horizontal scroll-snap, drag on desktop, native swipe on mobile. Cards: 4/5 aspect, cover image + bottom-fade gradient using card's chromatic accent + project title in display serif + discipline/year meta.
5. **Index teaser** — Full 8-row text-only list of all projects, hairlines between rows, hover → pink. Ends with no CTA (the rows are the CTA).
6. **About teaser** — On `--surface-alt`. Two columns lg+, portrait surface + bio + btn-secondary.
7. **Contact CTA** — Big display "Let's make something." with pink full-stop. btn-primary + email btn-ghost.
8. **Footer**.

### `/[lang]/work` Work index

- Hero: eyebrow "Index", display H1 "Work." with pink full-stop, subtitle.
- Right of H1 (lg+): `WorkViewToggle` (List / Grid segmented control). Default list on lg+, grid below. Persisted in localStorage `work-view`.
- Filter chips row (All / Branding / Typography / Motion / UI/UX / Print). Rounded-full, mono uppercase, 44px min height.
- **List view (`HoverPreviewList` — interaction #1)** — 4-column grid: №, Title, Discipline, Year. Hover row → row shifts left 3px, title flips to accent. A 360×240 floating preview image follows the cursor with spring physics (stiffness 220, damping 28). Disabled below `lg`.
- **Grid view** — 3 cols lg / 2 cols md / 1 col mobile. 4/5 aspect cards, image scales 1.03 on hover, gradient using chromatic accent fades in. Meta below image: mono "№ · Discipline" and display title + year.
- Filter buttons toggle visibility on both views via `data-disciplines` attribute matching.
- Pre-paint inline script reads `localStorage['work-view']` and sets `body[data-view]` to avoid desktop flash.

### `/[lang]/work/[slug]` Case study

`ChromaticTheme` mounts on `client:load` and swaps the accent. Sections:

1. **Title block** — "← Back to work" mono link, № + discipline eyebrow row, display H1 title, italic display tagline.
2. **Cover** — 16:9 (lg) / 16:10 (mobile) image full-bleed inside container.
3. **Meta** — Hairline-bordered `<dl>` grid: Year, Client, Role, Discipline, Tools.
4. **Brief** — Eyebrow "The brief", then a single display paragraph (~1.5rem-2rem) of context.
5. **Sections** — Rendered from JSON `sections[]` array. Supported types:
   - `image-full` — full-bleed image + optional mono caption
   - `image-pair` — md+ 2-col grid
   - `image-triplet` — md+ 3-col grid
   - `pullquote` — centered display italic, ~50ch max
   - `deliverables` — eyebrow "Outcome" + dotted-bullet list of localized items
6. **Resources** — External links (Drive PDFs, video links) with `↗` icon and underline-on-hover-in-accent.
7. **Next project** — Hairline-separated full-width link with display H2 of the next project's title. Wraps loop.

### `/[lang]/about` About

- Eyebrow "Bio", display H1 "Apprentice no more."
- Two-col on lg+ (sticky portrait left, content right). Portrait is a placeholder surface with "C·T" set in italic display; replace with `/images/about/portrait.jpg`.
- Content sections: Lead paragraph (display, 1.5rem-1.75rem). Philosophy. Currently obsessed with (numbered 01/02/03). Toolkit (rounded chips). CTA row: btn-primary contact + btn-ghost CV download.

### `/[lang]/contact` Contact

- Eyebrow "Say hello", display H1 "Let's make something.", lead.
- Two-col on lg+: **sticky info card** left (availability pulse, email, WhatsApp, location, elsewhere social) + **ContactForm** right.
- Form fields: name, email, project type (select with 5 options), message. Formspree POST with success/error state animation. iOS-safe (`inputmode`, `autocomplete`).

---

## 8. Navigation & Header

- Fixed top, `backdrop-filter: blur(8px)`, semi-transparent paper background.
- Subtle hairline appears at scrollY > 12px.
- Logo: "Chloe" (semibold) + italic muted "Trad" — links to `/[lang]/`.
- Desktop nav: 4 items (Index / Work / About / Contact) each prefixed with mono `01–04`. Active item in accent.
- Right cluster: LanguageSwitcher (EN/FR with `/` separator) + ThemeToggle (sun/moon, motion spring-rotated).
- **Mobile**: hamburger opens a full-screen overlay (display-serif menu items at 4xl, focus-trapped, body scroll locked, ESC closes, links close on tap). Bottom bar of overlay houses language switcher + theme toggle.

---

## 9. Animation Strategy (Motion.dev)

Reusable variants in `src/animations/variants.ts`: `fadeUp`, `fadeIn`, `staggerContainer`, `imageReveal`, `slideFromLeft`, `wordReveal`.

Per-surface motion:

| Surface | Animation | Trigger |
|---|---|---|
| Section reveals | `ScrollReveal` (`useInView`, once, -15% margin) — opacity + 20px y | Scroll into view |
| Hero marquee | `useScroll` → `useVelocity` → `useSpring` → `useTransform` to skewX (±12deg) | Continuous + scroll velocity |
| Hover preview spring | `useSpring` stiffness 220, damping 28, mass 0.5 | Mouse move on list |
| Drag-scroll reel | manual `onMouseDown/Move/Up` + scroll-snap-x | Mouse drag (desktop) |
| Featured card entry | `whileInView` 24px y → 0, stagger 0.08s | Viewport intersect |
| Chromatic accent | CSS transition on `--accent` 250ms ease | Case study mount |
| Theme toggle icon | spring rotate -90 → 0, stiffness 200 | Toggle click |

**Reduced motion**: every island reads `useReducedMotion()` and falls back to opacity-only or static. CSS `@media (prefers-reduced-motion: reduce)` zeros all animation/transition durations.

---

## 10. Component / Island Specifications

**Astro components** (zero-JS, server-rendered):
- `BaseLayout.astro` — HTML shell, FOUC script, hreflang, font preload, optional per-project `accent` prop sets initial `--accent` to avoid mount flash.
- `Header.astro` — fixed scroll-aware header + mobile overlay (all JS inline).
- `Footer.astro` — 12-col grid: logo+tagline / nav / elsewhere / contact + bottom bar with colophon.
- `LanguageSwitcher.astro` — segmented EN/FR with active state.
- `SectionHeading.astro` — eyebrow + number + display title + optional subtitle.
- `ProjectMeta.astro` — hairline-bordered metadata `<dl>` for case studies.

**React islands** (Motion.dev):
- `ThemeToggle.tsx` (`client:load`) — sun/moon toggle, writes `data-theme` + localStorage.
- `ScrollReveal.tsx` (`client:visible`) — useInView wrapper with direction prop.
- `BilingualMarquee.tsx` (`client:visible`) — interaction #2.
- `HoverPreviewList.tsx` (`client:idle`) — interaction #1.
- `DragScrollReel.tsx` (`client:visible`) — interaction #3.
- `ChromaticTheme.tsx` (`client:load` on case studies only) — interaction #4.
- `WorkViewToggle.tsx` (`client:idle`) — grid/list segmented control.
- `ContactForm.tsx` (`client:visible`) — Formspree-backed form.

---

## 11. Data Layer / Content Schema

Eight project files at `src/content/projects/{slug}.json`. Wrapper module `src/content/projects/index.ts` imports all 8, exports `projects[]`, `projectsByOrder`, `featuredProjects`, `getProject(slug)`, `getNextProject(slug)`.

```ts
interface Project {
  slug: string;
  number: string;                        // "01" – "08"
  title:   Record<Lang, string>;
  tagline: Record<Lang, string>;
  discipline: string[];                  // keys into disciplineLabel
  year: string;
  role:    Record<Lang, string>;
  client: string;
  tools: string[];
  accent: string;                        // hex, drives chromatic theme
  featured: boolean;                     // appears in home reel
  order: number;
  cover: string;                         // /images/...
  brief:   Record<Lang, string>;
  sections: ProjectSection[];            // image-full | image-pair | image-triplet | pullquote | deliverables
  resources: { label: Record<Lang, string>; url: string }[];
}
```

`src/data/disciplines.ts` maps discipline keys to localized labels and groups filter chips.

`src/content.config.ts` registers a `projects` collection via `glob` loader to silence Astro's auto-collection warning (the collection is not consumed at render — pages still import the index module directly).

**Real content** is sourced from chloetrad.com (current site) and committed under `public/images/projects/...` and `public/images/thumbnails/...`. The eight slugs and their accent colors:

| Slug | Accent | Year | Tools (abbrev) |
|---|---|---|---|
| shifit | `#E85A2B` | 2025 | Ai, Ps, Id |
| visual-poetry | `#1A1614` | 2025 | Ai, Type, Arabic |
| tuneday | `#7E5BEF` | 2025 | Figma, Ai |
| evolution-vs-nature | `#20A4C9` | 2025 | Blender |
| motion-pieces | `#D8316C` | 2024–25 | Ae, Ai |
| nutrili | `#6FAE5C` | 2024 | Ps, Ai, Ae |
| wood-shop | `#9C6B3F` | 2023 | XD, Ai |
| personal-projects | `#D4A03B` | 2020– | Ps, Ai |

---

## 12. Accessibility

- WCAG AA contrast for all ink/bg + accent/bg pairs (light + dark).
- Skip-to-content link, visible on focus, top-left.
- All interactive elements: `min-h-[44px]` (WCAG 2.5.5), `cursor-pointer`, `focus-visible` 2px accent ring + 3px offset.
- Mobile menu: focus-trapped, body scroll-locked, ESC closes.
- Hreflang for both languages + `x-default`.
- Reduced motion: marquees stop, hover preview disabled, scroll reveals collapse to opacity only.
- Form inputs: `autocomplete`, `inputmode`, mobile keyboard reveal handled (16px font-size prevents iOS zoom).
- Decorative ornament glyphs from the legacy site removed (`✧⋆˙⟡`); icons use Lucide React SVG only.

---

## 13. Performance Budget

- Mobile Lighthouse Performance ≥ 90, others ≥ 95. Desktop ≥ 95 all.
- Total JS shipped < 120kb gzip (most islands lazy-hydrated via `client:visible` / `client:idle`; only `ThemeToggle` and `ChromaticTheme` use `client:load`).
- CLS < 0.05 — image/video dimensions declared, fonts swap.
- LCP < 2.0s on simulated 4G.
- Self-hosted fonts (latin subsets ~18–24kb each) via `font-display: swap` + preload of most-used cuts.
- AVIF/WebP via Astro `<Image>` is **not** wired in v1 — images are served as-is from `public/images/`. (Listed under "Future enhancements" for v2.)

---

## 14. Responsive Design

**Breakpoints** (Tailwind 4 defaults): `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`. Max container 1440px.

**Per-surface mobile/tablet/desktop behavior**:

- **Hero marquee** — Mobile: stacked rows, ~50% speed, 6deg skew cap. Tablet: 8deg cap. Desktop: parallel rows, 12deg cap.
- **Featured reel** — Mobile: 85vw cards, native swipe, no inner parallax. Tablet: 70vw. Desktop: 60vw, mouse drag + inertial snap.
- **Work view toggle** — Hidden below `lg`; mobile/tablet forced to grid. Desktop: default `list`, user can toggle to `grid`.
- **Hover preview list** — Disabled below 1024px; tap navigates straight to case study.
- **Case-study magazine sections** — `image-pair` collapses to 1-col below `md`; `image-triplet` to 1-col below `md`. Pull-quote uses `text-2xl` on mobile.
- **About page** — Single column mobile (portrait stacks on top); 2-col sticky portrait on `lg`.
- **Contact page** — Form first on mobile, info card collapses to a compact bar; sticky info card on `lg`.
- **Header** — Mobile: full-screen overlay menu (scroll-locked, focus-trapped, ESC closes). Tablet+: horizontal nav.

**Touch ergonomics**: all interactive elements 44×44 minimum, focus-visible accent ring, no hover-only essential info, `env(safe-area-inset-bottom)` on sticky bars, `font-size:16px` minimum on inputs (prevents iOS auto-zoom).

QA matrix: 375 / 414 / 768 / 1024 / 1280 / 1440 / 1920 + landscape phone (812×375) + landscape tablet (1180×820). Real-device check on iOS Safari + Android Chrome.

---

## 15. File Structure

```
chloe-portfolio/
├── prompt.md                              # this file
├── astro.config.mjs                       # i18n: en/fr, prefixDefault
├── tailwind.config.mjs                    # paper/ink/muted/rule/accent palette
├── tsconfig.json                          # strict + path aliases
├── package.json                           # exact stack mirror of joelle-trad-archi
├── .github/workflows/deploy.yml           # GH Pages deploy
├── public/
│   ├── fonts/                             # 10 woff2 cuts (Fraunces×4, Inter×3, Mono, Plex Arabic×2)
│   ├── images/
│   │   ├── thumbnails/                    # 8 project covers (from chloetrad.com)
│   │   └── projects/{slug}/...            # case-study imagery (from chloetrad.com)
│   └── favicon.svg                        # paper bg + pink italic C + pink dot
└── src/
    ├── env.d.ts
    ├── styles/global.css                  # theme vars, @font-face, grain, btn/form/eyebrow
    ├── content.config.ts                  # projects collection (silences auto-collection warning)
    ├── content/projects/                  # 8 JSON files + index.ts
    ├── layouts/BaseLayout.astro
    ├── components/
    │   ├── Header.astro                   # fixed, scroll-aware, mobile overlay
    │   ├── Footer.astro                   # 12-col grid + colophon
    │   ├── LanguageSwitcher.astro
    │   ├── SectionHeading.astro
    │   └── ProjectMeta.astro
    ├── islands/
    │   ├── ThemeToggle.tsx
    │   ├── ScrollReveal.tsx
    │   ├── BilingualMarquee.tsx
    │   ├── HoverPreviewList.tsx
    │   ├── DragScrollReel.tsx
    │   ├── ChromaticTheme.tsx
    │   ├── WorkViewToggle.tsx
    │   └── ContactForm.tsx
    ├── animations/variants.ts
    ├── data/
    │   ├── siteConfig.ts                  # email, formspree, social, location
    │   ├── navigation.ts                  # main nav items
    │   └── disciplines.ts                 # localized labels + filter groups
    ├── i18n/
    │   ├── languages.ts                   # en (default), fr
    │   ├── utils.ts
    │   ├── en.json
    │   └── fr.json
    └── pages/
        ├── index.astro                    # 302 → /en/
        └── [lang]/
            ├── index.astro                # home
            ├── about.astro
            ├── contact.astro
            └── work/
                ├── index.astro            # list + grid + filters
                └── [slug].astro           # case study
```

---

## 16. Real Seed Content

The 8 case studies use content scraped from the live chloetrad.com (May 2026). Each `src/content/projects/{slug}.json` contains:
- Exact verbatim copy from the current site (briefs, deliverables, tools, year, client).
- French translations of brief / tagline / pullquote / deliverables / captions (idiomatic, not literal).
- Real images downloaded into `public/images/...` from the legacy site's `ProjectsMockups/` and `ProjectsDisplayPics/` folders.
- Drive resource links (Shifit guidelines PDF, motion videos) preserved as `resources[]`.

The about/home bio is upgraded from the legacy "Apprentic Graphic Designer ✧⋆˙⟡" / single-sentence bio to a full editorial paragraph (Latin + Arabic typographic identity, Beirut, current availability). The legacy typo ("Apprentic") is corrected and intentionally inverted into the new H1: "Apprentice no more."

---

## 17. Deployment

GitHub Pages via Actions. Build command `npm run build`; output `dist/`. Workflow at `.github/workflows/deploy.yml` (copied from joelle-trad-archi, unchanged). Domain configured at registrar with `CNAME` to `<user>.github.io`. Custom domain `chloetrad.com` set in repo's Pages settings.

`Formspree.io` — create form `chloe-contact`, paste form ID into `siteConfig.formspree.contact`.

---

## 18. Future Enhancements (NOT in v1)

- Astro `<Image>` AVIF/WebP transform pipeline.
- Sanity / Tina CMS integration.
- Blog / journal route.
- Newsletter signup (Buttondown).
- Visitor analytics (Plausible).
- WebGL hero behind the marquee (deferred — not worth the perf cost).
- Real Arabic UI mode (deferred until enough Arabic-first audience exists).
- Live mini-prototype embeds for TuneDay / Wood Shop case studies (currently static screens; Rauno Freiberg pattern is in scope for v2).
- Per-discipline accent-tinted filter chip labels.

---

## Quality Gates (Pre-merge Checklist)

- [ ] `npm run build` exits 0; no Astro/TS warnings.
- [ ] No emojis used as icons anywhere.
- [ ] `cursor-pointer` on every clickable element.
- [ ] All interactive elements ≥ 44px hit target.
- [ ] `prefers-reduced-motion`: marquee static, no skew, scroll reveals opacity-only.
- [ ] Theme toggle: no FOUC on reload in either mode.
- [ ] Lighthouse mobile ≥ 90 Performance, ≥ 95 elsewhere.
- [ ] Tested at 375 / 768 / 1024 / 1440; no horizontal scroll anywhere.
- [ ] EN + FR routes render with locale switcher swapping paths.
- [ ] Each case study: chromatic accent applies on mount, reverts on leave.
- [ ] Contact form submits to Formspree → success state animates in.
- [ ] All 8 case studies show real content (brief + cover + at least one media block).
