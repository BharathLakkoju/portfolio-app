# Bharath Lakkoju — Portfolio Design System

**Site:** https://bharathlakkoju.vercel.app
**Version:** 1.1 · 20 Oct 2026 (IBM Plex type, confirmed facts and stats, case-study content)
**Tokens:** `bharath-portfolio-tokens.css` (same folder). This document explains the tokens; it doesn't repeat every value.
**Stack:** Next.js (App Router), Tailwind, Framer Motion. This is a documentation and token spec, not app code.

---

## 0. The brief in one paragraph

A recruiter gives the site about five seconds. In that time they need to read three facts: **AI Engineer who ships full-stack products**, **open to work**, and **the resume is right here**. Everything else supports those three facts or stays out of the way. Today the content is good and the system is thin: one narrow column, low-contrast labels, tiny click targets, and no motion vocabulary. This spec keeps the content and structure, fixes accessibility, uses the full width of a laptop screen, and gives Bharath a visual identity tied to his actual work: **Signal**, a small agent graph where a pulse moves between nodes.

### The signature: "Signal"

Bharath's flagship, the Compliance Review Copilot, never shows a finding it can't prove: each one is tied back to an exact span of the source document. The identity borrows that **evidence chain**: **nodes, hairline edges, and a single cyan pulse carrying a claim back to its source.** This is the only signature effect. It shows up three times, quieter each time:

| Where | Intensity | What it does |
|---|---|---|
| Hero figure | Loud | About 18 nodes around the avatar (the hub). Edges draw toward the cursor within 140px. One pulse travels one edge every ~3s. |
| Project cards | Quiet | On hover or focus, a 1px line under the card header draws, and one dot crosses it once (560ms). |
| Status dot | Whisper | The "Open to opportunities" dot is a node with a slow halo. |

No particles, no cursor trail, no tilt, no parallax, no typewriter, no scroll-jacking. If an effect isn't in the inventory in §5.3, it doesn't ship.

---

## 1. Principles

1. **Resume first.** The resume is one click away from every page, at every breakpoint, in every state: header button, hero CTA, top result in `Ctrl/⌘ K`, footer. It never hides behind a menu.
2. **Facts before flourish.** Role, status, and numbers render in the first paint, as HTML text, before any animation runs. Animation decorates content that's already readable. It never holds back content.
3. **One signature, used with restraint.** Signal is the identity. Everything else is quiet: hairlines, mono labels, neutral surfaces, one accent color.
4. **Every number has a source.** Stats carry a short context line (where, what, how it was measured). "69%" alone reads as a claim. "69% engagement increase: health-tracking app with a reward system" reads as evidence. The component requires a context line; the four confirmed lines are in §4.6.
5. **Big targets, whole surfaces.** If something looks like a card, the whole card is the link. The minimum hit target is 44×44px.
6. **Accessible by token, not by audit.** Text tokens are AA-safe on the surfaces they're allowed on. If a token pair isn't in the contrast table (§2.1.4), it isn't allowed.
7. **Motion is under 600ms, transform and opacity only, and runs once.** The only exceptions are the three ambient loops (hero Signal, marquee, status halo). Each one is pausable and stops off-screen.
8. **Blueprint, not decoration.** The structure is visible: hairline grid, mono section indices (`01 / SELECTED WORK`), measured spacing. That *is* the aesthetic. Nothing gets ornament on top.

---

## 2. Tokens

All values live in `bharath-portfolio-tokens.css`. Components read semantic variables (`--color-fg-muted`), never raw hex. In Tailwind, map them in the theme (`colors: { bg: 'var(--color-bg)', ... }` in v3, or `@theme` in v4) so classes like `text-fg-muted` resolve to tokens.

Hex values are the source of truth because every contrast ratio below was measured on them. OKLCH is listed for palette work. If you edit a color in OKLCH, measure it again.

### 2.1 Color

#### 2.1.1 What changed and why

| Problem | Before | After | Result |
|---|---|---|---|
| Dark muted text (labels, chips, captions) | `#71717a`: 4.12 on bg, **3.67 on surface** (fails) | `--color-fg-muted` **`#8b8b94`** | 5.89 on bg, 5.25 on surface |
| Light muted text on surface | `#71717a`: 4.83 on white, **4.40 on `#f4f4f5`** (fails) | `--color-fg-muted` **`#6b6b74`** | 5.28 on bg, 4.80 on surface |
| Light-mode cyan as text | `#0891b2`: **3.68 on white, 3.54 on cyan tint** (fails) | `--color-accent` **`#0e7490`** | 5.36 on white, 5.15 on tint |
| Light primary button (white on cyan) | White on `#0891b2` = 3.68 (fails) | White on **`#0e7490`** | 5.36 (7.27 on hover `#155e75`) |
| Dark accent | `#06b6d4` (8.19) passes but reads slightly dull on near-black | **`#22d3ee`** for text and buttons; `#06b6d4` kept as `--color-accent-graphic` for lines and nodes | 11.01 on bg |
| Input borders too faint | `#27272a` on `#09090b` = 1.34 (fails WCAG 1.4.11 for input boundaries) | `--color-border-input`: `#71717a` dark / `#8a8a93` light | 4.12 / 3.42 |
| Stack chips: 4 colored text groups (red, amber, cyan, teal) | Colored text on tints, uneven contrast, visually loud | Neutral chip text + a 6px colored group dot | Text 6.91:1 or better; dots are decorative |

Cyan stays the brand. It's refined into three roles: **text and interactive** (`--color-accent`), **solid fill** (`--color-accent-solid` + `--color-on-accent`), and **graphic** (`--color-accent-graphic`, non-text only). The original `#06b6d4` / `#0891b2` live on in the graphic role.

#### 2.1.2 Dark theme (default)

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--color-bg` | `#09090b` | `oklch(14.1% 0.004 285.8)` | Page |
| `--color-bg-subtle` | `#111113` | `oklch(17.9% 0.004 286.0)` | Footer, code blocks, alternate bands |
| `--color-surface` | `#18181b` | `oklch(21.0% 0.006 285.9)` | Cards, inputs, palette |
| `--color-surface-2` | `#27272a` | `oklch(27.4% 0.005 286.0)` | Hover fill, selected row, kbd |
| `--color-border` | `#27272a` | `oklch(27.4% 0.005 286.0)` | Decorative hairlines, card edges |
| `--color-border-strong` | `#3f3f46` | `oklch(37.0% 0.012 285.8)` | Card hover edge, dividers |
| `--color-border-input` | `#71717a` | `oklch(55.2% 0.014 285.9)` | Inputs, checkbox, toggle track |
| `--color-fg` | `#fafafa` | `oklch(98.5% 0 0)` | Headings, body |
| `--color-fg-secondary` | `#a1a1aa` | `oklch(71.2% 0.013 286.1)` | Descriptions, chip text, idle nav |
| `--color-fg-muted` | `#8b8b94` | `oklch(64.0% 0.013 286.0)` | Mono labels, captions, meta |
| `--color-fg-disabled` | `#71717a` | `oklch(55.2% 0.014 285.9)` | Disabled only |
| `--color-accent` | `#22d3ee` | `oklch(79.7% 0.134 211.5)` | Links, active nav, icons, focus |
| `--color-accent-hover` | `#67e8f9` | `oklch(86.5% 0.115 207.1)` | Hover on accent |
| `--color-accent-solid` / `--color-on-accent` | `#22d3ee` / `#09090b` | — | Primary button |
| `--color-accent-subtle` / `-subtle-fg` | `#0c2a31` / `#67e8f9` | `oklch(26.6% 0.037 215.8)` | Tinted tag, text selection |
| `--color-accent-graphic` | `#06b6d4` | `oklch(71.5% 0.126 215.2)` | Signal nodes, edges, flow line |
| `--color-success` / `-subtle` | `#4ade80` / `#0f2e1a` | `oklch(80.0% 0.182 151.7)` | Sent, status dot |
| `--color-warning` / `-subtle` | `#fbbf24` / `#2e2208` | `oklch(83.7% 0.164 84.4)` | Rare: "WIP" project badge |
| `--color-danger` / `-subtle` | `#f87171` / `#3a1212` | `oklch(71.1% 0.166 22.2)` | Form errors |

#### 2.1.3 Light theme

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `oklch(100% 0 0)` | Page |
| `--color-bg-subtle` | `#fafafa` | `oklch(98.5% 0 0)` | Footer, code |
| `--color-surface` | `#f4f4f5` | `oklch(96.7% 0.001 286.4)` | Cards, inputs |
| `--color-surface-2` | `#e4e4e7` | `oklch(92.0% 0.004 286.3)` | Hover fill, kbd |
| `--color-border` | `#e4e4e7` | `oklch(92.0% 0.004 286.3)` | Hairlines |
| `--color-border-strong` | `#d4d4d8` | `oklch(87.1% 0.005 286.3)` | Card hover edge |
| `--color-border-input` | `#8a8a93` | `oklch(63.6% 0.013 286.0)` | Inputs |
| `--color-fg` | `#18181b` | `oklch(21.0% 0.006 285.9)` | Headings, body |
| `--color-fg-secondary` | `#52525b` | `oklch(44.2% 0.015 285.8)` | Descriptions |
| `--color-fg-muted` | `#6b6b74` | `oklch(53.1% 0.014 285.9)` | Labels, captions |
| `--color-accent` | `#0e7490` | `oklch(52.0% 0.094 223.1)` | Links, active nav, focus |
| `--color-accent-hover` | `#155e75` | `oklch(45.0% 0.077 224.3)` | Hover |
| `--color-accent-solid` / `--color-on-accent` | `#0e7490` / `#ffffff` | — | Primary button |
| `--color-accent-subtle` / `-subtle-fg` | `#ecfeff` / `#0e7490` | `oklch(98.4% 0.019 200.9)` | Tinted tag |
| `--color-accent-graphic` | `#0891b2` | `oklch(60.9% 0.111 221.7)` | Signal graphics only |
| `--color-success` / `-subtle` | `#15803d` / `#f0fdf4` | `oklch(52.7% 0.137 150.1)` | Sent, status dot |
| `--color-warning` / `-subtle` | `#b45309` / `#fffbeb` | `oklch(55.5% 0.146 49.0)` | WIP badge |
| `--color-danger` / `-subtle` | `#b91c1c` / `#fef2f2` | `oklch(50.5% 0.190 27.5)` | Errors |

#### 2.1.4 Contrast table (measured with the WCAG 2.x relative-luminance formula)

AA thresholds: **4.5:1** for normal text; **3:1** for large text (24px and up, or 18.66px bold and up) and for non-text UI (icons, input borders, focus rings).

**Dark**

| Foreground | On bg `#09090b` | On surface `#18181b` | On surface-2 `#27272a` | Verdict |
|---|---|---|---|---|
| fg `#fafafa` | 19.06 | 16.97 | 14.27 | AAA everywhere |
| fg-secondary `#a1a1aa` | 7.76 | 6.91 | 5.81 | AA everywhere |
| fg-muted `#8b8b94` | 5.89 | 5.25 | **4.41** | AA on bg and surface only. Never on surface-2 |
| Old muted `#71717a` | 4.12 ✗ | 3.67 ✗ | — | Retired as text; disabled only |
| accent `#22d3ee` | 11.01 | 9.80 | 8.24 | AAA |
| accent-subtle-fg `#67e8f9` on accent-subtle `#0c2a31` | — | — | — | 10.41 |
| on-accent `#09090b` on `#22d3ee` / `#67e8f9` | — | — | — | 11.01 / 13.73 |
| accent-graphic `#06b6d4` (non-text) | 8.19 | 7.30 | — | 3:1 or better |
| border-input `#71717a` (non-text) | 4.12 | 3.67 | — | 3:1 or better |
| focus `#22d3ee` (non-text) | 11.01 | 9.80 | — | 3:1 or better |
| success `#4ade80` | 11.42 | 10.17 | — | On its subtle `#0f2e1a`: 8.45 |
| warning `#fbbf24` | — | 10.61 | — | On its subtle `#2e2208`: 9.33 |
| danger `#f87171` | 7.19 | 6.40 | — | On its subtle `#3a1212`: 5.95 |

**Light**

| Foreground | On bg `#ffffff` | On surface `#f4f4f5` | On surface-2 `#e4e4e7` | Verdict |
|---|---|---|---|---|
| fg `#18181b` | 17.72 | 16.12 | 13.96 | AAA |
| fg-secondary `#52525b` | 7.73 | 7.03 | 6.09 | AA everywhere |
| fg-muted `#6b6b74` | 5.28 | 4.80 | **4.16** | AA on bg and surface only. Never on surface-2 |
| Old muted `#71717a` | 4.83 | 4.40 ✗ | — | Retired |
| accent `#0e7490` | 5.36 | 4.87 | **4.22** ✗ | AA on bg, surface, and accent-subtle (5.15). Not on surface-2 |
| Old accent `#0891b2` | 3.68 ✗ | 3.35 ✗ | — | Graphics only now (3:1 or better on bg) |
| on-accent `#ffffff` on `#0e7490` / `#155e75` | — | — | — | 5.36 / 7.27 |
| border-input `#8a8a93` (non-text) | 3.42 | 3.11 | — | 3:1 or better |
| focus `#0e7490` (non-text) | 5.36 | 4.87 | — | 3:1 or better |
| success `#15803d` | 5.02 | — | — | On its subtle `#f0fdf4`: 4.79 |
| warning `#b45309` | 5.02 | — | — | On its subtle `#fffbeb`: 4.84 |
| danger `#b91c1c` | 6.47 | — | — | On its subtle `#fef2f2`: 5.91 |

**Stack group dots** (non-text; meaning is always repeated in the group label): dark `#22d3ee` / `#c4b5fd` / `#fcd34d` / `#86efac`, all above 9:1 on surface; light `#0891b2` / `#6d28d9` / `#b45309` / `#15803d`, all 3:1 or better on white.

**Rules that follow from the table**

- Muted text and light-mode accent text never sit on `surface-2`. Use `fg-secondary` there (hovered rows, kbd, the selected palette item).
- `accent-graphic` is never used for text, in either theme.
- Disabled text (`#71717a` dark, `#a1a1aa` light) is exempt from contrast rules, but disabled controls also carry `aria-disabled` and a non-color cue (no hover response, `cursor: not-allowed`).
- Chip text is never colored by group. Color goes on the dot.

### 2.2 Typography

**Families**

| Role | Face | Why | Loading |
|---|---|---|---|
| UI and body | **IBM Plex Sans** (replaces Inter; Bharath's choice) | Engineered, slightly squared grotesque with real character. It reads "engineer" without looking like every other Inter site. Wider than Inter, so the scale below is adjusted | `next/font/google`, weights **400 / 500 / 600** only, `display: swap` |
| Labels, code, metrics | **IBM Plex Mono** (replaces JetBrains Mono) | Same family DNA as Plex Sans, so mono labels and body sit in one rhythm | `next/font/google`, weights **400 / 500** only |
| Display (name + one italic phrase) | **Instrument Serif** (approved 20 Oct 2026) | The identity piece. A sharp editorial serif next to a technical sans makes the name memorable and separates "the person" from "the system". | 400 roman + italic only, about 25KB each; preload the roman |


**Loading with `next/font`** (configuration note, in `app/layout.tsx`):

```ts
import { IBM_Plex_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});
const instrumentSerif = Instrument_Serif({ // approved by Bharath, 20 Oct 2026
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

// <html className={`${plexSans.variable} ${plexMono.variable} ${instrumentSerif.variable}`}>
```

The tokens file reads these variables first (`--font-sans: var(--font-plex-sans), "IBM Plex Sans", …`), so the self-hosted, size-adjusted fallback that `next/font` generates is used and there's no layout shift. Load only the weights listed: every extra weight is another ~20KB file. No italic for Plex; the only italic on the site is Instrument Serif.

**Scale** (fluid between 360px and 1280px viewports)

| Token | Size | Line height | Tracking | Face / weight | Used for |
|---|---|---|---|---|---|
| `display` | 44 → 76px | 1.0 | −0.02em | Instrument Serif 400 | Hero name only |
| `h1` | 34 → 48px | 1.1 | −0.02em | Plex Sans 600 | Page titles (Projects, About…) |
| `h2` | 26 → 34px | 1.18 | −0.015em | Plex Sans 600 | Section titles |
| `h3` | 19px | 1.3 | −0.005em | Plex Sans 600 | Card titles |
| `body-lg` | 18px | 1.6 | 0 | Plex Sans 400 | Hero bio, lead paragraphs |
| `body` | 16px | 1.65 | 0 | Plex Sans 400 | Default |
| `sm` | 14px | 1.5 | +0.005em | Plex Sans 400 / 500 | Card body, buttons (500), nav (500) |
| `label` | 12px | 1.4 | +0.04em, uppercase | Plex Mono 500 | Section index, chips, captions, meta |
| `stat` | 38 → 52px | 1.0 | −0.02em | Plex Sans 600, `tabular-nums` | Bento numbers |

**Why these numbers changed from the Geist draft:** Plex Sans sets about 5–7% wider than Geist or Inter at the same size and has a taller x-height. Headings came down one step at the top end (h1 52 → 48px, h2 36 → 34px, stat 56 → 52px) so the same words fit the same columns, and negative tracking is lighter because Plex's spacing is already tight at display sizes; pushing it to −0.025em makes its squared curves collide. Body line height goes to 1.65 to balance the taller x-height. Plex Mono is itself wide, so the uppercase label tracking drops from +0.06em to +0.04em. Weights are limited to 400 (reading), 500 (UI: buttons, nav, labels) and 600 (headings, stats). No 700: Plex Bold looks heavy against the serif name.

Rules:

- **12px is the floor.** Nothing renders smaller, including footnotes and kbd hints. (Today's chips and card labels are around 10–11px.)
- Body copy never exceeds `--measure-prose` (68ch). The hero bio caps at 56ch.
- Instrument Serif is used for exactly two things: the name, and the italic rotating phrase in the hero. Not headings, not quotes, not the blog.
- Stats, dates, and the marquee use `font-variant-numeric: tabular-nums` so count-ups don't jitter. Plex supports tabular figures; set it explicitly anyway.
- Mono labels are uppercase and tracked. Mono in running text (code, file names) keeps its own case with no tracking. Tech names keep their real casing ("FastAPI", "LangGraph").

### 2.3 Spacing

4px base. Use the scale; don't invent values.

`0 · 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

| Semantic token | Value | Where |
|---|---|---|
| `--space-section` | 64 → 128px, fluid | Between home sections |
| `--space-section-head` | 32px | Section header → content |
| `--space-card-pad` | 24px | Cards, form |
| `--space-card-pad-lg` | 32px | Lead bento tile, case-study callouts |
| `--space-stack` | 16px | Default vertical gap inside cards |
| Chip gap | 8px | Chip rows |
| Grid gap | `--gutter` (16 → 24px) | All card grids |

### 2.4 Radii

Kept from the current site. Each value now has one job.

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Chips, kbd, tab indicator, tooltips |
| `--radius-md` | 8px | Buttons, inputs, menu items, toasts |
| `--radius-lg` | 12px | Cards, bento tiles, palette, dialogs, hero figure frame |
| `--radius-full` | 9999px | Status dot, avatar, theme toggle |

Nested radii: inner radius = outer radius − padding. A 12px card with a 4px inset image gets an 8px image radius.

### 2.5 Shadows and elevation

Dark mode doesn't use shadows for depth; they disappear on near-black. It uses **surface steps, a 1px top highlight, and borders**. Light mode uses soft shadows.

| Level | Token | Dark | Light | Used by |
|---|---|---|---|---|
| 0 | `--shadow-0` | None | None | Page, sections |
| 1 | `--shadow-1` | Inset top highlight at 4% | 1px soft shadow | Cards at rest, inputs |
| 2 | `--shadow-2` | Highlight + 24px soft drop | 24px soft drop | Card hover, header after scroll, toasts |
| 3 | `--shadow-3` | Highlight + 64px drop + strong ring | 64px drop + ring | Command palette, dialogs |
| Glow | `--shadow-glow` | Cyan 1px ring + faint bloom | Same, softer | Primary button hover, focused card. One glowing element in view at most |

### 2.6 Z-index

| Token | Value | Layer |
|---|---|---|
| `--z-below` | −1 | Hero Signal canvas, blueprint grid |
| `--z-base` | 0 | Content |
| `--z-raised` | 1 | Secondary links inside a clickable card |
| `--z-sticky` | 40 | Header |
| `--z-dropdown` | 50 | Mobile nav sheet, menus |
| `--z-overlay` | 60 | Scrim |
| `--z-modal` | 70 | Command palette, dialogs |
| `--z-toast` | 80 | Toasts |
| `--z-skip-link` | 90 | Skip-to-content link |

No other z-index values. If you need one, the layering is wrong.

---

## 3. Layout grid and breakpoints

### 3.1 Container

The current ~480px column leaves most of a 1440px laptop screen empty and pushes Impact and Stack far below the fold. The new container is **1120px** of content (`--container-max: 70rem`), centered, with fluid page margins.

| Breakpoint | Min width | Columns | Gutter | Page margin | Notes |
|---|---|---|---|---|---|
| base | 0 | 4 | 16px | 20px | Single column. Hero figure becomes a 160px band above the name |
| `sm` | 640px | 4 | 16px | 24px | Two-up stat tiles |
| `md` | 768px | 8 | 24px | 32px | Two-up project cards; hero still stacked |
| `lg` | 1024px | 12 | 24px | 32px | Asymmetric hero, three-up cards, full bento |
| `xl` | 1280px | 12 | 24px | 48px | Container caps at 1120px; extra width becomes margin |

The **prose column** (blog posts, case-study body, About narrative) is 680px (`--container-prose`). At `lg` and up it aligns to columns 1–8 of the 12-column grid instead of centering, which keeps one left edge across the whole site. Columns 10–12 hold the table of contents, the "At a glance" rail, or margin notes.

### 3.2 Blueprint grid

A hairline grid sits behind the page at `--z-below`. It draws the real 12-column layout: vertical 1px lines in `--color-grid-line` at each column edge of the container, plus a horizontal hairline at each section boundary. It's a CSS `background-image` on the `<main>` wrapper (no extra DOM, no JS) and is hidden below `md`. This adapts chanhdai.com's blueprint look: it shows the grid the content actually sits on, so it reads as structure rather than texture.

### 3.3 Home layout at `lg`

```
HERO (asymmetric 7 / 5)
┌──────────────────────────────────────┬───────────────────────────┐
│ ● OPEN TO OPPORTUNITIES              │                           │
│ Bharath Lakkoju            (display) │     Signal figure         │
│ builds  multi-agent systems (italic) │     avatar = hub node     │
│ AI Engineer · Full Stack · Hyderabad │     ~18 nodes, reacts     │
│ Bio (56ch max, 2–3 lines)            │     to the cursor         │
│ SEEKING [AI Engineer][Full-Stack][Applied AI]                    │
│ [↓ Download resume] [Contact me]     │                           │
│ GitHub · LinkedIn · Email            │                           │
│ 2+ YRS · 11+ PROJECTS · UST GLOBAL   │                           │
└──────────────────────────────────────┴───────────────────────────┘
  columns 1–7                           columns 8–12
MARQUEE strip (full container width, 48px tall, pause button on the right)

01 SELECTED WORK (3-up, equal; the flagship, Compliance Review Copilot, sits first; mono margin notes under each card)
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Compliance★│ │ YouTube RA │ │ ATS Eval   │
└────────────┘ └────────────┘ └────────────┘
(4th featured project, the open-source secrets CLI (nvault), sits in the /projects featured row and leads "More work" on Home)

02 IMPACT (bento, 12 columns, 2 rows)
┌──────────────────────┬────────────┬────────────┐
│ 69% engagement increase  │ 113% data  │ 86% less   │
│ (6 cols × 2 rows)    │ intake     │ manual     │
│ health-tracking app  ├────────────┴────────────┤
│ with a reward system │ 99% uptime · CI/CD      │
└──────────────────────┴─────────────────────────┘

03 STACK (four groups, 2 × 2; each group is a row of neutral chips)
04 EXPERIENCE (UST Global · Software Engineer I · Sep 2024–present, cols 1–8; "Currently" card in cols 10–12)
05 GET IN TOUCH (copy + direct links in cols 1–7; form in cols 8–12)
FOOTER
```

Bento rule: the biggest tile goes to the strongest number with the clearest story. 69% engagement increase leads by default because it's a user outcome. Swap it if another stat has a better story behind it.

---

## 4. Components

Shared state definitions used throughout this section:

- **Focus** always means `:focus-visible`: a 2px `--color-focus` outline with a 2px offset, following the component's radius. It's never removed and never replaced by a color change alone.
- **Disabled** means `disabled` on form controls, or `aria-disabled="true"` where the element should stay focusable so it can explain itself. Text uses `--color-fg-disabled`; no hover response; `cursor: not-allowed`.
- **Loading** never changes the component's size. Width is locked while loading.
- Every interactive element has a hit area of at least 44×44px. The visual size can be smaller if padding or a pseudo-element extends the target.

### 4.1 Button

**Anatomy:** container (radius-md) → optional leading icon (16px) → label (`sm`, weight 500) → optional trailing kbd hint or icon.

**Variants**

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| Primary | `accent-solid` | `on-accent` | None | **Download resume.** One per view at most |
| Secondary | `surface` | `fg` | `border-strong` | Contact me, View project |
| Ghost | Transparent | `fg-secondary` | None | Nav-level actions, card secondary links |
| Icon | Transparent | `fg-secondary` | None | Theme toggle, social links, close. Always has `aria-label` |

**Sizes:** `md` is 40px tall visually with a 44px target (default). `lg` is 48px (hero CTAs, mobile). Icon buttons are 40px visually with a 44px target.

**States**

| State | Primary | Secondary / Ghost |
|---|---|---|
| Default | As above | As above |
| Hover | Fill → `accent-hover`, `shadow-glow`, 150ms | Fill → `surface-2`, text → `fg`, 150ms |
| Focus | Focus ring, 2px offset | Same |
| Active | `scale(0.98)`, 100ms | `scale(0.98)` |
| Disabled | `surface-2` fill, `fg-disabled` text, no glow | `fg-disabled` text |
| Loading | Label stays in place at `opacity: 0` to hold the width; 16px spinner centered; `aria-busy="true"`; can't be clicked again | Same |

**Usage**

- The resume button says **"Download resume"** with a download icon. It links to a PDF at a stable URL (`/resume.pdf`, redirecting to the current file) named `Bharath-Lakkoju-Resume.pdf`. On desktop it opens in a new tab (`target="_blank"`, `rel="noopener"`) so the site stays open behind it.
- Never two primary buttons in one viewport. While the hero's primary button is on screen, the header Resume button uses the secondary style; it switches to primary once the hero CTA scrolls away (IntersectionObserver on the hero CTA). This stops two cyan blocks from competing.
- Labels are verbs: "Download resume", "Contact me", "Send message", "View case study".

### 4.2 Nav / header

**Anatomy:** skip link (hidden until focused) → logo mark (links home) → nav links (Home, About, Projects, Blog, Contact) → search trigger with `⌘K` hint → theme toggle → Resume button.

**Layout:** sticky, 56px tall (`--header-h`), full-bleed `--color-header` background with `backdrop-filter: blur(12px) saturate(140%)`, content aligned to the 1120px container. The bottom border is transparent at scroll 0 and becomes `--color-border` with `shadow-2` after 8px of scroll (M-17).

**States**

| Element | Default | Hover | Focus | Active (current page) |
|---|---|---|---|---|
| Nav link | `fg-secondary`, `sm`/500 | `fg` | Ring | `fg` + a 2px `accent` underline 6px below the baseline, `aria-current="page"` |
| Search trigger | Ghost button: magnifier + "Search" + `⌘K` kbd (shows "Ctrl K" on Windows and Linux) | `surface-2` | Ring | While the palette is open: `aria-expanded="true"` |
| Theme toggle | Icon button, sun/moon | `surface-2` | Ring | On press: icon swaps with a 90° turn, 200ms (M-15) |
| Resume | Secondary while the hero CTA is visible, primary otherwise | Per button | Ring | — |

Disabled and loading don't apply: the header renders on the server and never shows a skeleton.

**Mobile (below `md`):** logo, a compact "Resume" button, and a menu button. **The Resume button stays in the bar, outside the menu.** The menu opens a full-width sheet under the header with the nav links (48px rows), Search, and the theme toggle. The sheet traps focus, closes on Esc and on route change, and returns focus to the menu button.

**Logo and alt text fix:** the logo is a link to home. Give the link `aria-label="Bharath Lakkoju, home"` and the logo image `alt=""` (decorative inside a labelled link). The hero avatar keeps `alt="Portrait of Bharath Lakkoju"`. Today both images carry the same alt text, so a screen reader announces the name twice for no reason.

### 4.3 Command palette (Ctrl/⌘ K)

**Purpose:** the fastest path to the three recruiter actions, plus navigation. Adapted from upriyanshu.tech, with resume and email at the top.

**Anatomy:** scrim (`--color-scrim`) → dialog (radius-lg, `surface`, `shadow-3`, 560px wide, max 60vh tall, 15vh from the top) → input row (magnifier, input, `Esc` kbd) → result groups under mono labels → footer hint row (`↑↓` navigate · `↵` open · `Esc` close).

**Default content (empty query), in this order:**

1. **Actions:** Download resume (preselected, so `⌘K` then `↵` gets the resume), Copy email, Open LinkedIn, Open GitHub.
2. **Pages:** Home, Projects, About, Blog, Contact.
3. **Projects:** Compliance Review Copilot, YouTube Research Agent, ATS Resume Evaluator, Open-source secrets CLI (nvault), then "All projects…". Search keywords include repo names (complibot, tubecp, atsprecise, nvault).
4. **Preferences:** Toggle theme (`T`), Turn off single-key shortcuts.

Typing searches pages, all projects (title, stack, one-line summary), and blog post titles. Use a small client-side fuzzy match over a JSON index generated at build time. No network call.

**Triggers:** `Ctrl+K` / `⌘K`, `/` (when focus isn't in a text field), the header Search button, and the Search row in the mobile menu.

**States**

| State | Spec |
|---|---|
| Default (open) | Input focused, first item selected |
| Hover / selected item | Row fill `surface-2`, text `fg` (not muted; see the contrast rules), 2px accent bar on the left. Mouse hover and keyboard selection share one state, so there's never a double highlight |
| Focus | Focus stays in the input; the selection is tracked with `aria-activedescendant` on a `listbox` |
| Active (Enter) | Row flashes `accent-subtle` for 100ms, the action runs, the palette closes. "Copy email" also shows a toast so the copy is confirmed |
| Disabled item | Not used. Remove unavailable items instead of disabling them |
| Loading | Not needed with a bundled index. If the index is lazy-loaded, show 3 skeleton rows for no more than 300ms |
| No results | "No results for 'foo'." followed by two fallbacks: Download resume and Email Bharath |

**Semantics:** `role="dialog"`, `aria-modal="true"`, labelled "Search site". The input is a `combobox` with `aria-controls` pointing at the listbox. Focus is trapped inside. Esc closes and returns focus to whatever opened it. Body scroll locks without layout shift (`scrollbar-gutter: stable` on `html`).

**Single-key shortcuts** (`T` for theme, `/` for the palette) only fire when focus isn't in an input, textarea, or contenteditable element, and they can be turned off from the palette (saved in `localStorage`). That satisfies WCAG 2.1.4. Shortcuts are listed in the palette footer and on the About page. There are no other single-key shortcuts.

### 4.4 Hero

**Anatomy, left column, top to bottom:**

1. **Status pill:** pulse dot (`--color-status-live`) + mono label "OPEN TO OPPORTUNITIES". Links to `#contact`.
2. **Name:** `display` size in Instrument Serif. This is the page's `<h1>`.
3. **Rotating line:** "builds *multi-agent systems*" in `body-lg`, with the italic phrase in Instrument Serif italic. Phrases: *multi-agent systems* → *RAG pipelines* → *full-stack products* → back to *multi-agent systems*, where it stops. See M-03.
4. **Role and location:** "AI Engineer · Full Stack Engineer · Hyderabad, India" in `sm`, `fg-secondary`, followed on the same line at `lg` (next line on mobile) by "Remote or relocate anywhere in India" in `fg-muted`.
5. **Bio:** 2–3 lines, `body-lg`, 56ch max, `fg-secondary`. It leads with what he builds, not with adjectives.
6. **SEEKING row:** mono label "SEEKING" + three accent chips: AI Engineer, Full-Stack, Applied AI.
7. **CTAs:** Download resume (primary, `lg`) + Contact me (secondary, `lg`).
8. **Links:** GitHub, LinkedIn, Email as icon + text at `lg`, icon-only below that with `aria-label`. Each has a 44px target.
9. **Stats line:** "2+ YRS · 11+ PROJECTS · UST GLOBAL" in mono `label`, `fg-muted`.

**Right column, the Signal figure:** a square frame (radius-lg, `border` hairline, 440px max) holding a `<canvas>` with about 18 nodes and the avatar as the central hub (a 120px circle at `lg`). Four nodes carry tiny mono labels, INGEST → MATCH → CITE → REVIEW: the flagship's real steps (document in, matched against a rule pack, finding cited to a verified span, reviewer accepts or rejects). The pulse runs along that chain in order, so the motif reads as an evidence chain. On pointer move, edges draw from nearby nodes toward the cursor (within `--signal-link-radius`, 140px). In the background, one pulse travels one edge every ~3.2s. A visually hidden caption reads: "Decorative evidence-chain graph around Bharath's portrait."

**Mobile:** the figure becomes a 160px band above the status pill, with an 88px avatar and static nodes. No cursor interaction on touch.

**Must hold:** name, role, Open to opportunities, and Download resume are all **above the fold at 1366×768 and at 390×844**. Test both.

**States**

| State | Spec |
|---|---|
| Default | All text is server-rendered and visible at first paint. Until the canvas hydrates, the avatar sits on a static SVG of the same graph, so nothing shifts |
| Hover (figure) | Cursor-reactive edges; the pulse continues |
| Focus | The figure isn't focusable (it's decorative). CTAs and links follow button and link rules |
| Active / Disabled | Not applicable |
| Loading | No skeleton. The avatar uses `placeholder="blur"`; the canvas falls back to the static SVG |

**Avatar asset guidance** (resolved: use the existing image, 20 Oct 2026)

- **Source today:** the repo's `public/` folder (BharathLakkoju/portfolio-app) holds only `favicon.ico` (1,455 bytes). The photo the site renders is `profile.avatar` in `src/lib/data.ts` = `https://avatars.githubusercontent.com/u/73902405?v=4` (his GitHub avatar), currently requested through `next/image` at `w=3840`. Use that same image; don't commission a new one.
- **Action:** download it once, save it as `public/images/bharath-avatar.jpg` (master; GitHub serves up to 460px square, fetch with `&s=460`), and point `profile.avatar` at the local file so it's static-imported and gets a build-time blurDataURL. Cap `sizes` so Next never generates a 3840w variant.

- The master is ≤460px, so keep renders at or below 230px CSS for crisp 2×: hero hub 120px is fine; the About portrait shows at 220px max, not 400px. Square crop, face centered, a neutral background that works in both themes.
- Serve it through `next/image` with `sizes="(min-width: 1024px) 120px, 88px"` for the hero hub. For a larger portrait on About, use `sizes="(min-width: 1024px) 400px, 100vw"`.
- Let Next serve AVIF, then WebP. Quality 70–75. Targets: **under 30KB** for the hero hub, under 80KB for the About portrait.
- `priority` on the hero image (it's above the fold) and `placeholder="blur"` with a generated blurDataURL.
- Remove `3840` from the srcset by restricting `images.deviceSizes`/`sizes`; the hero hub should transfer under 30KB.

### 4.5 Project card

**Anatomy:** card (radius-lg, `surface`, `border`, `shadow-1`, 24px padding) →

1. **Header row:** mono label on the left (index + type, e.g. `01 · RAG + AGENTS`); status badge on the right only when true (LIVE only where the live URL was verified). No badge is better than an invented one.
2. **Flow line:** a 1px hairline under the header in `border`. This is where Signal appears on hover.
3. **Title** (`h3`) with an arrow: → for an internal case study, ↗ for an external site.
4. **One-line outcome** (`sm`, `fg-secondary`, 2 lines max). Lead with the result, not the stack (final copy comes with the chosen projects, §6.3.1).
5. **Role line:** mono `label`, `fg-muted`, e.g. "SOLO BUILD · ARCHITECTURE → DEPLOY". This replaces today's cyan role sentence, which competes with the title.
6. **Tech chips:** 5 visible at most, plus a "+3" overflow chip.
7. **Secondary links:** Code and Live as ghost buttons with icon + visible text at `lg`.

**Whole-card click (the fix):** the title link is the card's primary link. Its `::after` pseudo-element covers the card (`position: absolute; inset: 0`), so the whole surface is clickable while the accessibility tree has one link per card. The secondary links (Code, Live) sit above the overlay at `--z-raised`, each with its own 44px target. **Don't** wrap the card in an `<a>` that contains other links. That's invalid HTML and breaks screen readers.

The primary link goes to the internal **project detail page** (`/projects/[slug]`) when one exists, otherwise to the live site. The four featured projects all get detail pages (§6.3.1). The detail page is where a hiring manager reads the story; the live site is one more click.

**Margin notes (home page, `lg` and up):** under each featured card, a short mono annotation with a hairline leader, e.g. "↑ evals caught 2 real bugs". This adapts shashwa7.in's handwritten notes into blueprint annotations. Six words max, `fg-muted`.

**States**

| State | Spec |
|---|---|
| Default | As above |
| Hover | `translateY(-2px)`, border → `border-strong`, `shadow-2`, title arrow nudges 2px in its direction, and **the flow line draws and one dot crosses it once** (M-07). Pointer cursor over the whole card |
| Focus (title link focused) | Ring around the **whole card** via `.card:has(.card-link:focus-visible)`, plus the hover treatment. Secondary links get their own ring when focused |
| Active | `translateY(0) scale(0.995)`, 100ms |
| Disabled | Not used. A project with no public link renders as a static card: no arrow, no increase, label "PRIVATE · CASE STUDY ON REQUEST" |
| Loading | Skeleton card (§4.15) at the same height |

**Usage:** three equal featured cards on Home, the full grid on /projects. One paragraph per card at most. Cards in a row share a height: title and outcome clamp, chips wrap to 2 lines at most.

### 4.6 Stat / bento card

**Anatomy:** tile (radius-lg, `surface`, `border`, 24px padding, 32px on the lead tile) → mono label naming what was measured ("USER ENGAGEMENT") → **number** (`stat`, tabular, `fg`; the "%" at 60% size in `fg-secondary`) → verb line ("increase") → context line (`sm`, `fg-secondary`, 1–2 lines: where and how) → optional source chip, only when the source is confirmed.

**Sizes:** `lead` (6 columns × 2 rows at `lg`, with a small Signal sparkline: a static line of nodes that a pulse crosses once on reveal), `standard` (3 × 1), `wide` (6 × 1).

**States**

| State | Spec |
|---|---|
| Default | The final number is in the HTML for assistive tech; the animated digits are `aria-hidden` |
| Hover | Border → `border-strong`. No increase; tiles aren't links |
| Focus | Not focusable unless the tile links to a case study; then it follows the project card focus rule |
| Active / Disabled / Loading | Not applicable (static content) |

**Usage:** every tile needs a context line. If there's no context for a number, the number comes off the site. Recruiters discount bare percentages.

**Confirmed content** (numbers confirmed by Bharath on 20 Oct 2026; they match the live site):

| Tile | Size | Label | Number | Verb line | Context line |
|---|---|---|---|---|---|
| 1 | `lead` (6×2) | USER ENGAGEMENT | 69% | increase | Health-tracking app with a reward system |
| 2 | `standard` (3×1) | DATA INTAKE | 113% | increase | Data intake |
| 3 | `standard` (3×1) | MANUAL PROCESSING | 86% | less | WCS data-pipeline automation |
| 4 | `wide` (6×1) | DEPLOYMENT UPTIME | 99% | uptime | CI/CD |

Tile 2's context line is the thinnest of the four; if Bharath can add where it happened (which system or client) in a later pass, it gets stronger. The design doesn't depend on it.

### 4.7 Chip

**Variants**

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| Neutral | `surface` on bg, transparent on surface | `fg-secondary` | `border` | Project tech, Stack |
| Grouped | Neutral + 6px leading dot in `--color-group-*` | `fg-secondary` | `border` | Stack section |
| Accent | `accent-subtle` | `accent-subtle-fg` | None | SEEKING roles only |
| Status | `success-subtle` / `warning-subtle` | Matching status color | None | LIVE / WIP badges |

**Size:** 24px tall visually, 8px horizontal padding, `label` type (12px IBM Plex Mono 500). Uppercase only for status badges.

**States:** chips are static by default (no hover, focus, or active). The one interactive use is the tech filter on /projects ("filter by LangChain"). Those chips are buttons with a 44px hit area, hover `surface-2` fill + `fg` text, the standard focus ring, and a pressed state (`aria-pressed="true"`, `accent-subtle` fill). No disabled or loading state.

**Rule:** 5 chips per card at most, plus "+N". The Stack section is the one place for the full list.

### 4.8 Tabs (project filters)

**Anatomy:** group (scrolls horizontally on mobile with faded edges) → items (label + mono count, e.g. "AI & Agents 6") → sliding indicator.

**Pattern:** these filter one list rather than switching panels, so build them as a **toggle button group** (`role="group"`, buttons with `aria-pressed`), not ARIA tabs. Sync the selection to the URL (`/projects?f=ai`) so filtered views can be shared. Filters: All · AI & Agents · Full-Stack · Tools & OSS.

**States**

| State | Spec |
|---|---|
| Default | `fg-secondary` text, transparent |
| Hover | `fg` text, `surface-2` fill |
| Focus | Ring on the item. Arrow keys move between items (roving tabindex); Tab leaves the group |
| Active (selected) | `fg` text; the indicator, a `surface` pill with a `border`, slides to the selected item (M-14) |
| Disabled | A filter with 0 results is hidden, not disabled |
| Loading | Not applicable (client-side filter) |

The result count is announced through a polite live region: "Showing 6 AI & Agents projects."

### 4.9 Section header

**Anatomy:** a hairline across the container (the blueprint section boundary) → mono index + label (`01 / SELECTED WORK`, `fg-muted`) → `h2` title written as a claim, not a category ("Things I've shipped", "What changed because of my work") → optional one-line description (`fg-secondary`, 60ch max) → optional right-aligned link ("All projects →", ghost, 44px target).

**States:** the link follows ghost button states. The heading reveals once on scroll (M-04). Nothing else.

**Usage:** every home section uses it, numbered in page order. Inner pages use the same structure at `h1` size with a label like `/ PROJECTS`.

### 4.10 Timeline / experience row

**Anatomy:** left rail (date range in mono `label`, `fg-muted`, 128px wide at `md` and up) → node on a vertical 1px line (a Signal node: filled `accent-graphic` for the current role, hollow `border-strong` for past ones) → content: role (`h3`), company + location (`sm`, `fg-secondary`), 2–4 outcome bullets (each starts with a verb and, where possible, a number), tech chips.

**States**

| State | Spec |
|---|---|
| Default | As above. The current role's node has the same slow halo as the status dot |
| Hover | None; it's static content. If a row links to a case study, it uses the project card's whole-surface link pattern |
| Focus | Only when linked |
| Expanded / collapsed | Older roles collapse to role + company + dates with a "Show details" button (`aria-expanded`, 44px target). Content fades in at full height; no height animation |
| Disabled / Loading | Not applicable |

**Usage:** the full timeline on About; the current role only on Home, with "Full experience →". UST Global comes first.

**Current role (confirmed):** rail "SEP 2024 — PRESENT"; role "Software Engineer I"; company line "UST Global · Hyderabad, India"; filled node with halo. Outcome bullets aren't confirmed yet, so until they are, the row shows role, company and dates only. Don't borrow the Impact numbers as bullets unless Bharath confirms they came from this role.

### 4.11 Contact form

**Anatomy:** name → email → message (textarea, 5 rows, grows to 10) → hidden honeypot field → submit button → privacy line ("I reply within 2 working days. Your email is only used to reply.").

Each field has a label above (`sm`/500, `fg`), the input (40px visual / 44px target, radius-md, `surface`, `border-input`), and helper or error text below (`sm`; 12px is too small for errors).

On Home the submit is the secondary style (the hero already owns the primary). On /contact, where the resume lives in the header, the submit can be primary.

Next to the form, always show the **email address as text** with a copy button. Many recruiters prefer their own mail client.

**States**

| State | Spec |
|---|---|
| Default | As above. Placeholder text is optional and never replaces the label |
| Hover | Border → `fg-muted` |
| Focus | Border → `accent`, plus the focus ring |
| Active (typing) | Same as focus |
| Disabled | During submit, fields become `readonly` (not disabled) so values stay readable and focusable |
| Loading | Submit shows a spinner and "Sending…", `aria-busy`, width locked |
| Field error | Border → `danger`; error text with an icon below; `aria-invalid="true"`; `aria-describedby` → the error. Validate on blur and on submit, not on every keystroke |
| Submit error | Banner above the button (`danger-subtle` fill, `danger` text): "Your message didn't send. Email me directly at <address>." with a copy button. Focus moves to the banner. Fields keep their values |
| Success | The form is replaced by a confirmation ("Thanks, <name>. I'll reply within 2 working days.") with focus on its heading, plus a success toast |

### 4.12 Toast

**Anatomy:** container (radius-md, `surface`, `border-strong`, `shadow-2`, 360px max) → status icon (success / danger / info) → message (`sm`, `fg`) → optional action ("Open", "Undo") → close icon button.

**Placement:** bottom-right at `md` and up, bottom-center on mobile, 16px from the edge plus the safe-area inset. Two visible at most; newer ones stack on top. **Never covers the Resume button or the header.**

**Behavior:** auto-dismisses after 4s; the timer pauses on hover and focus. Error toasts stay until dismissed. Announced with `role="status"` (polite); errors use `role="alert"`.

**States:** default; hover (timer paused, close button gets `surface-2`); focus (ring on the action or close button); dismissed (M-12). No disabled or loading toasts; a long action shows loading on the button that started it.

**Used for:** "Email copied", "Message sent", "Link copied". Only for things the visitor just did.

### 4.13 Footer

**Anatomy (on `bg-subtle` with a top `border`):**
- Row 1: name + one-line summary ("AI Engineer building multi-agent systems and full-stack products.") + **Download resume** link.
- Row 2: nav links, social links, email as text with a copy button.
- Row 3: mono `label` meta: "© 2026 Bharath Lakkoju · Built with Next.js · ⌘K to search · Updated <month year>".

**States:** links follow ghost link rules (hover → `fg`, focus ring). Each link reaches a 44px target through padding. No disabled or loading state.

### 4.14 Empty and error states

**404:** anatomy is a small static Signal graph with one disconnected, hollow node (the metaphor: this node isn't linked to anything), mono label `404`, `h1` "This page isn't connected to anything.", one plain sentence, and three actions: Download resume (primary), Go home (secondary), Search `⌘K` (ghost). The three featured projects appear below. Never a dead end. Page spec in §6.7.

**Runtime error boundary** (`error.tsx`): the same layout with `h1` "Something broke on this page.", a "Try again" button (calls `reset()`), Download resume, and Go home.

**Form error:** see §4.11. Error copy says what happened and what to do next, in one sentence, without blaming the visitor. "Enter an email address like name@company.com", not "Invalid input".

**Empty filter result (/projects):** "No projects match that filter." + a "Show all projects" button. Rare, since empty filters are hidden.

**Thin blog:** if there are fewer than 3 posts, show the posts that exist plus "More writing soon. Follow on LinkedIn for updates." Never show placeholder posts.

### 4.15 Skeletons

**Only for content that loads after first paint:** the GitHub heatmap if it's fetched at runtime, a lazy palette index, a client-fetched blog list. Home and /projects are statically generated and never show skeletons.

**Anatomy:** blocks matching the final content's exact size (`--color-skeleton`, radius matches the target); text lines at 60–90% widths.

**Animation:** one shimmer band moving with `translateX`, 1.6s per loop, stops after 3 loops, static under reduced motion (M-16). The container has `aria-busy="true"` and a visually hidden "Loading…".

**Rule:** wait 200ms before showing a skeleton. If content arrives within that time, show nothing rather than a flash.

---

## 5. Motion system

### 5.1 Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 100ms | Press feedback |
| `--dur-fast` | 150ms | Hover color, focus ring |
| `--dur-base` | 200ms | Buttons, tab indicator, toast exit, palette open |
| `--dur-moderate` | 300ms | Card increase, page enter, toast enter |
| `--dur-slow` | 450ms | Scroll reveal, theme reveal |
| `--dur-slower` | 560ms | Hero name, count-up, flow-line dot. **The ceiling.** |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | All entrances |
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Hover increases, count-up |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits only |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Theme reveal, indicator slides, page morph |
| `--ease-linear` | `linear` | Marquee, pulse travel |
| `--stagger-tight` | 40ms | Chips, list rows |
| `--stagger-base` | 60ms | Hero sequence, cards |
| Stagger cap | 6 items | Item 7 and later start with item 6 |
| `--distance-sm` | 8px | Default reveal travel (up from today's 6px) |
| `--distance-md` | 16px | Toasts |
| `--hover-increase` | −2px | Card hover |

**Framer Motion equivalents.** Define these once in `lib/motion.ts` and import them everywhere: `ease.out = [0.16, 1, 0.3, 1]`, `ease.outSoft = [0.22, 1, 0.36, 1]`, `ease.in = [0.4, 0, 1, 1]`, `ease.inOut = [0.65, 0, 0.35, 1]`. For the tab indicator, a spring is fine: `{ type: "spring", stiffness: 500, damping: 40 }`, which settles in about 250ms.

### 5.2 Rules

1. **Animate only `transform` and `opacity`.** Two named exceptions: `filter: blur()` on section headings (M-04: small elements, once) and `clip-path` on the view-transition pseudo-element for the theme reveal (M-10, composited by the browser).
2. **One-shot animations finish in under 600ms, stagger included.** If a stagger would push the total past 600ms, cap it.
3. **Run once.** Scroll reveals use `viewport={{ once: true, amount: 0.3 }}`. Nothing replays when you scroll back up.
4. **Content is never hidden in the HTML.** Hidden starting states are applied after hydration (or under a `.js` class on `<html>`), so visitors without JS, or with slow JS, still see everything. Hero text is never hidden while waiting for JS.
5. **Ambient loops** (M-01 status halo, M-02 Signal, M-11 marquee) pause when off-screen (IntersectionObserver), when the tab is hidden (`visibilitychange`), while the palette is open, and under reduced motion. The marquee has a visible pause button.
6. **No scroll-linked effects.** No parallax, no scroll-jacking, no layout animation tied to scroll position.
7. **Performance budget:** the Signal script stays under 6KB gzipped; no animation libraries beyond Framer Motion; 60fps on a mid-range Android (or Chrome at 4× CPU throttling); canvas device-pixel ratio capped at 2; INP under 200ms.
8. **`will-change`** is set only while an animation runs, never left in a stylesheet.

### 5.3 Animation inventory

Every animation on the site is in this table. If it isn't here, it doesn't ship.

| ID | Name | Trigger | Properties | Duration | Easing | Stagger / delay | Reduced motion |
|---|---|---|---|---|---|---|---|
| **M-00** | Hero entrance | First visit to `/` in a session | Each item: `opacity 0→1`, `translateY 8px→0`. Name: `opacity`, `translateY 12px→0`. Figure: `opacity` only | Items 400ms; name 560ms; figure 450ms | `ease-out` | Status pill 0ms → name 0ms → rotating line 60 → role + bio 100 → seeking + CTAs 140 → links + stats 180; figure at 120. Last item ends at 580ms | All items present, no transform; static figure |
| **M-01** | Status halo | Ambient | Pseudo-element ring: `scale 1→2.2`, `opacity 0.5→0` | 2000ms per loop, 3 loops, then stops | `ease-out` | — | Static dot, no ring |
| **M-02** | Signal (hero figure) | Ambient + pointer move over the figure | Canvas: edges from nodes within 140px of the pointer (opacity falls off with distance); one pulse dot travels one random edge | Pulse 1400ms, every 3200ms; edges follow the pointer with a 120ms lerp | `linear` (pulse) | — | Static SVG of the graph; no pulse, no pointer edges |
| **M-03** | Rotating phrase | When M-00 finishes | Out: `opacity 1→0`, `translateY 0→−6px`. In: `opacity 0→1`, `translateY 6px→0`. The container reserves the width of the longest phrase, so nothing reflows | 300ms per swap | Out `ease-in`, in `ease-out` | 3 swaps with a 1.2s hold, finished in about 4.5s, stopping on "multi-agent systems" (under 5s, so WCAG 2.2.2 needs no pause control). Screen readers get one static sentence; the animated element is `aria-hidden` | Final phrase only |
| **M-04** | Section heading reveal | Section header is 30% in view | Index label: `opacity`. `h2`: `opacity 0→1`, `translateY 8px→0`, `blur(6px)→blur(0)` | 450ms | `ease-out` | Label 0ms, h2 60ms, description 120ms | Opacity only, 120ms |
| **M-05** | Content reveal (cards, rows, chips) | Group is 30% in view | `opacity 0→1`, `translateY 8px→0` | 400ms | `ease-out` | Cards 60ms, chips and rows 40ms, capped at 6 | Opacity only, 120ms, no stagger |
| **M-06** | Stat count-up | Bento tile is 50% in view | Number text counts from 0 to the target (JS, tabular numbers). The tile itself uses M-05 | 560ms | `ease-out-soft` | Tiles 60ms apart | Final value shown, no counting |
| **M-07** | Card hover: increase + flow line | Pointer enters the card, or its title link gets focus | Card: `translateY 0→−2px`; border color; shadow via a pseudo-element's `opacity`. Flow line: `scaleX 0→1` from the left. Dot: `translateX 0→100%` once. Arrow: 2px nudge | increase 300ms; line 300ms; dot 560ms starting at 100ms | `ease-out-soft`; dot `linear` | — | Border color change only; flow line shown static; no increase, no dot |
| **M-08** | Press | Pointer down on a button or card | `scale 1→0.98` (cards 0.995) | 100ms | `ease-out` | — | None |
| **M-09** | Page transition | Client-side navigation | Old page: `opacity 1→0`. New page: `opacity 0→1`, `translateY 8px→0`. Card → detail: the card title and figure morph into the detail header through a shared `view-transition-name` | Exit 150ms; enter 300ms; morph 300ms | Exit `ease-in`; enter `ease-out`; morph `ease-in-out` | Enter follows exit | Opacity cross-fade 120ms, no morph |
| **M-10** | Theme toggle circular reveal | Theme toggle click, or `T` | View Transition: the new theme is revealed by `clip-path: circle(0 → 150vmax)` centered on the toggle (on the viewport center for `T`) | 450ms | `ease-in-out` | — | Instant swap |
| **M-11** | Impact marquee | Ambient, once in view | Track: `translateX 0→−50%`; content is duplicated, and the duplicate is `aria-hidden` | 40s per loop (`--marquee-speed`) | `linear` | — | Static wrapped row, no duplicate |
| **M-12** | Toast in / out | Toast created / dismissed | In: `opacity 0→1`, `translateY 16px→0`. Out: `opacity 1→0`, `translateX 0→16px` | In 300ms, out 200ms | In `ease-out`, out `ease-in` | — | Opacity only |
| **M-13** | Command palette open / close | `⌘K`, `/`, trigger click / Esc, selection | Scrim: `opacity`. Dialog: `opacity 0→1`, `scale 0.97→1`, `translateY −8px→0`; close reverses it | Open 200ms, close 150ms | Open `ease-out`, close `ease-in` | Results never stagger; they must feel instant | Opacity only, 120ms |
| **M-14** | Filter indicator + grid reflow | Filter change on /projects | Indicator: Framer `layoutId` slide. Leaving cards: `opacity →0`. Staying and entering cards: Framer `layout` (transform) + `opacity` | Indicator ~250ms (spring); leave 150ms; grid 300ms | Spring 500/40; `ease-out` | Entering cards 40ms, capped at 6 | Indicator jumps; cards swap instantly |
| **M-15** | Theme icon swap | Theme toggle | Sun/moon: `rotate 90°`, `scale 0.8→1`, `opacity` cross-fade | 200ms | `ease-out` | — | Instant swap |
| **M-16** | Skeleton shimmer | Skeleton visible | Gradient band `translateX −100%→100%` | 1600ms × 3 loops | `ease-in-out` | Shown after a 200ms delay | Static block |
| **M-17** | Header elevation | Scroll past 8px | Border and shadow pseudo-element `opacity 0→1` | 200ms | `ease-out` | — | Instant |
| **M-18** | 404 node | 404 page load | The disconnected node moves 12px toward the graph and stops short (`translateX`) | 560ms, once | `ease-out` | 200ms after load | Static |

**Notes on the key animations**

- **Hero entrance (M-00).** Hero text is server-rendered and visible. The entrance only plays if hydration happens within about 1s of navigation start. If hydration is later, skip it rather than hide text the visitor is already reading. A `sessionStorage` flag makes it play once per session; client-side returns to `/` don't replay it.
- **Scroll reveals (M-04, M-05).** One shared `<Reveal>` wrapper using `whileInView` with `once: true`, `amount: 0.3`, and `margin: "0px 0px -10% 0px"`. The hero is never wrapped in it.
- **Count-up (M-06).** Count from 0; all four current stats are under 120, so 560ms is enough to read as motion without dragging. Keep the final format the whole way ("69%", never "69.0"). Tabular numbers keep the width fixed.
- **Page transitions (M-09).** Prefer the **View Transitions API** through React's `<ViewTransition>` in Next (enable `experimental.viewTransition` in `next.config`; on older Next versions, the `next-view-transitions` package). It provides the card → detail morph with little code. Browsers without support just navigate instantly, which is acceptable. Use Framer `AnimatePresence` only if View Transitions is ruled out; in the App Router, exit animations need a `template.tsx` and a frozen-router workaround, which is fragile. Never run both.
- **Theme reveal (M-10).** Wrap the theme change in `document.startViewTransition()`, then animate `::view-transition-new(root)` with `clip-path` from the toggle's coordinates and disable the default root cross-fade. Without View Transitions support, swap instantly. During the swap, set `transition: none` on everything so hundreds of hover transitions don't fire at once.
- **Marquee (M-11).** Content: "69% engagement increase · 113% data intake · 86% less manual processing · 99% deployment uptime · 11+ projects shipped · Software Engineer I at UST Global · Based in Hyderabad". IBM Plex Mono at 14px, `fg-secondary`, numbers in `fg`. 48px edge fade masks. A pause button (icon + visually hidden "Pause marquee", 44px target) sits at the right edge; hover and focus inside the strip also pause it. The paused state is saved in `localStorage`. The pause control is required by WCAG 2.2.2 because the strip moves for more than 5 seconds.
- **Signal canvas (M-02).** About 18 nodes in fixed, hand-placed positions (not random, so the composition is designed and stable across loads). Node radius 2px, hub 4px ring around the avatar, edges 1px in `accent-graphic` at 35% opacity, pulse dot 3px at full `accent-graphic` with a 6px `accent-glow` halo. Lines and nodes read their colors from CSS variables, so they follow the theme without a redraw rule. The `requestAnimationFrame` loop stops completely when the figure is off-screen.

### 5.4 Reduced motion

- `prefers-reduced-motion: reduce` collapses the duration and distance tokens in the CSS file automatically.
- Framer: wrap the app in `<MotionConfig reducedMotion="user">`, which removes transform animations and keeps opacity.
- JS effects (Signal canvas, count-up, rotating phrase, marquee, theme reveal) check `matchMedia('(prefers-reduced-motion: reduce)')` and render their static end state. Subscribe to changes; don't read it only once.
- Reduced motion keeps short opacity cross-fades (120ms or less), because a hard cut between pages can be disorienting too.

---

## 6. Page-by-page spec

### 6.1 Home `/`

**Order:** Hero → Marquee → 01 Selected Work → 02 Impact → 03 Stack → 04 Experience → 05 Get in touch → Footer.

Experience is new on Home: one timeline row ("Software Engineer I · UST Global · Sep 2024–present") plus "Full experience →". After "what can you build", a recruiter's next question is "where have you worked", and today the only answer on Home is the stats line.

| Section | Layout (`lg`) | Mobile | Motion |
|---|---|---|---|
| Hero | 7/5 asymmetric (§3.3, §4.4) | Stacked; figure band on top | M-00, M-01, M-02, M-03 |
| Marquee | Full container width, 48px, hairlines above and below | Same, 40px | M-11 |
| 01 Selected Work | Section header + 3 equal cards + margin notes | 1 column; no margin notes | M-04, M-05, M-07 |
| 02 Impact | Bento: lead 6×2, two 3×1, one 6×1 | 1 column, lead first; 2-up at `sm` | M-04, M-05, M-06 |
| 03 Stack | 2×2 groups (AI & Agents, Languages, Frontend, Backend): mono group label with a color dot + neutral chips | 1 column | M-04, M-05 (chips 40ms, capped at 6) |
| 04 Experience | Current role row in cols 1–8; "Currently" card in cols 10–12 | 1 column | M-04, M-05 |
| 05 Get in touch | Cols 1–7: claim heading ("Hiring for AI or full-stack? Let's talk."), availability line, email with copy, LinkedIn, resume. Cols 8–12: contact form | Stacked, form below | M-04, M-05, M-12 |

Sections are ordered by recruiter value. Don't add an "About me" essay to Home.

### 6.2 Projects `/projects`

- **Header:** `h1` "Projects" with the label `/ PROJECTS`, the existing one-line description, and a count (matches the final list, e.g. "4 projects").
- **Filters:** none while there are only four projects. Add the §4.8 toggle group only if the list grows past six.
- **Grid:** 3 columns at `lg`, 2 at `md`, 1 below. The site shows exactly four projects, in this order: Compliance Review Copilot (flagship), YouTube Research Agent, ATS Resume Evaluator, Open-source secrets CLI (nvault). Every other project (NexusFlow, docQA, Dvelve, GreenSource, Flatmate, Waigenie, SwiftMedia, GitProfolio, Terminal, DepGuard) is removed, not demoted. With four projects, hide the filters.
- **Cards:** the standard project card with whole-card click to the detail page (or the live site where no detail page exists yet).
- **Motion:** M-04 on the title; M-05 on load (cards 60ms, capped at 6); M-14 on filter change; M-07 on hover; M-09 into the detail page with the shared-element morph.

### 6.3 Project detail `/projects/[slug]` (new)

This is where a hiring manager decides whether there's depth. Each featured project gets one; the rest link straight out until they have one.

**Layout:** prose column (cols 1–8) + sticky side rail (cols 10–12).

1. **Header:** breadcrumb (`Projects / <title>`), `h1` title (shares a `view-transition-name` with the card title), one-line outcome, role line ("Solo build · architecture → deploy"), tech chips, Live demo (secondary) and Code (ghost). The header Resume button is still there.
2. **Figure:** one screenshot, or a short muted loop (poster image first, `preload="none"`, 2MB max, with a pause button). radius-lg, `border`.
3. **Body, in a fixed order:** Problem · What I built · Architecture (a diagram in the Signal style: nodes and hairline edges, as a static SVG) · Hard parts and decisions · Results (numbers, using stat tiles) · What I'd do next. A project with no measured results drops the Results section rather than padding it; never put a placeholder number on a case study.
4. **Side rail:** At a glance (role, timeline, stack, team size), links, Download resume, Contact me. On mobile it collapses into a compact "At a glance" box under the header.
5. **Footer navigation:** previous and next project cards.

**Motion:** M-09 morph in and M-04 on body section headings. Nothing else; reading pages stay calm.

#### 6.3.1 Case-study content

Facts come only from Head of Engg's final list (20 Oct 2026). Titles are descriptive; repo names appear only as a mono subtitle and as search keywords. No invented metrics; a project with no measured results shows "What it shows" instead of Results.

##### P1 — Compliance Review Copilot (flagship, `/projects/compliance-review-copilot`)

- **Subtitle:** `complibot` · **Badge:** "Demo on request" (neutral badge, not LIVE). **Links:** Request a demo → Contact, Code (ghost).
- **One-line outcome:** "Reviews contracts and policies against GDPR, SOC 2, ISO 27001 and HIPAA, and every finding cites a verified span of the source."
- **Role line:** SOLO BUILD · AI REVIEW PIPELINE, FULL STACK, INFRA
- **At a glance:** Next.js 16 · React 19 · Tailwind 4 · FastAPI · async SQLAlchemy · Postgres · worker · WebSockets · Docker on AWS EC2 (Terraform, Caddy TLS) · monorepo with YAML-schema codegen.
- **Problem:** compliance review means checking long documents against several frameworks, and a reviewer can't trust a finding they can't trace back to the text.
- **What I built:** a review copilot that checks an uploaded contract or policy against versioned framework rule packs, streams findings live over WebSockets, and lets reviewers accept or reject each one.
- **Architecture (diagram, the Signal chain):** Upload → INGEST (FastAPI + worker) → MATCH (versioned rule pack: GDPR / SOC 2 / ISO 27001 / HIPAA) → CITE (span verified mechanically, control-ID aliases normalised; unverified → discarded) → stream over WebSocket → REVIEW (accept / reject, persisted in Postgres). Side nodes: pluggable model providers, eval harness, Terraform → EC2 → Caddy TLS.
- **Hard parts and decisions:**
  - Frameworks are versioned rule packs, not prompts.
  - Citation or discard: a finding without a mechanically verified source span never reaches the reviewer, including control-ID alias normalisation.
  - Reviewer accept/reject decisions persist.
  - Eval harness and pluggable model providers.
  - YAML schemas drive code generation across the monorepo.
- **Results (verification, not accuracy):** passed a 5-round QA on 18 Oct 2026. In the full flow, an uploaded policy produced 4 GDPR findings with highlighted citations, and reviewer decisions persisted. Show as a "VERIFIED END TO END" callout, not stat tiles. **Do not claim any real-LLM accuracy.**

##### P2 — YouTube Research Agent (`/projects/youtube-research-agent`)

- **Subtitle:** `tubecp` · **Badge:** LIVE · **Links:** Live → https://tubecp.vercel.app, Code.
- **One-line outcome:** "Turns a research topic into a chat-able knowledge base, with sources and timestamps."
- **Role line:** SOLO BUILD · AI PRODUCT, PAYMENTS, PRODUCTION OPS
- **At a glance:** Next.js on Vercel · Auth.js (Google/GitHub) · Neon Postgres · Upstash Redis · Polar (payments + webhooks) · Sentry · Resend · OpenRouter · YouTube Data API.
- **What I built:** topic in → videos found through the YouTube Data API → a knowledge base you can chat with, every answer pointing to its source and timestamp.
- **Hard parts and decisions:** tiered quotas (Free, Pro $9, Researcher $19, Team $49) enforced in Redis; Polar webhooks; a pre-deploy validate script, production smoke tests and `/api/health`.
- **Results:** none measured (no user or revenue numbers). "What it shows": a shipped, paid AI product with production guardrails.

##### P3 — ATS Resume Evaluator (`/projects/ats-resume-evaluator`)

- **Subtitle:** `atsprecise` · **Badge:** LIVE · **Links:** Live → https://atsprecise.vercel.app, Code.
- **One-line outcome:** "Deterministic, weighted scoring of a resume against a job description, with section-by-section gap analysis. ₹99 per report."
- **Role line:** SOLO BUILD · FULL STACK, SCORING ENGINE
- **At a glance:** Next.js 16 · Supabase · Drizzle · Zod · mammoth / unpdf parsing · jspdf export.
- **What I built:** upload a resume (DOCX or PDF parsed with mammoth / unpdf), paste a job description, get a weighted score across keywords, skills, sections and formatting, a gap analysis per section, and a PDF report.
- **Hard parts and decisions:** deterministic scoring, so the same inputs always give the same score; Zod-validated inputs; a paid per-report model.
- **Copy rule:** describe it as deterministic. Never "AI-powered".
- **Results:** none measured. "What it shows": a live, paid product with explainable scoring.

##### P4 — Open-source secrets CLI (`/projects/nvault`), approved by Bharath

- **Subtitle:** `nvault` · **Badge:** "npm 0.2.0" · **Links:** npm → `@lbharath/nvault`, Site → https://nvaults.vercel.app, Code.
- **One-line outcome:** "An open-source secrets CLI published on npm, with a secure, automated release pipeline."
- **Role line:** SOLO BUILD · OPEN SOURCE, CLI, RELEASE ENGINEERING
- **What I built / decisions:** published as `@lbharath/nvault` 0.2.0; released from GitHub Actions with npm Trusted Publishing (OIDC, no long-lived token); CI runs a publish dry-run on every PR.
- **Copy rule:** do not describe the encryption internals.
- **Results:** none measured. "What it shows": open-source shipping and supply-chain-safe releases.

**Card copy for Home (featured row, in order)**

| # | Mono label | Title | Outcome line | Margin note (`lg`) |
|---|---|---|---|---|
| 01 | COMPLIANCE AI · DEMO ON REQUEST | Compliance Review Copilot | Reviews contracts and policies against GDPR, SOC 2, ISO 27001 and HIPAA; every finding cites its source. | ↑ cite it or discard it |
| 02 | AI PRODUCT · LIVE | YouTube Research Agent | Turns a research topic into a chat-able knowledge base with sources and timestamps. | ↑ paid tiers, quotas in Redis |
| 03 | FULL STACK · LIVE | ATS Resume Evaluator | Deterministic, weighted resume-to-job scoring with section-by-section gaps. | ↑ ₹99 per report |
| 04 | OPEN SOURCE · NPM | Open-source secrets CLI (nvault) | Published on npm, released through Trusted Publishing (OIDC). | ↑ dry-run publish on every PR |

Home shows 01–03 in the 3-up row; 04 sits as a full-width row below it.

### 6.4 About `/about`

1. **Header:** `h1` "About", a short narrative (cols 1–8, prose), and a portrait (cols 9–12; the only large photo on the site).
2. **Experience:** the full timeline (§4.10), UST Global first.
3. **Education and certifications:** simple rows in the timeline style with hollow nodes.
4. **The one personal widget: GitHub contribution heatmap** (adapted from prathm.me and kushchaudhary.com). Built at compile time and revalidated daily (ISR). A 53×7 grid of 10px cells in five steps from `surface` to `accent-graphic`, captioned "<N> contributions in the last year", with a link to GitHub. Cells are `aria-hidden`; the caption carries the meaning.
5. **How I work:** 3–4 short principles (optional).
6. **Keyboard shortcuts:** a small table (`⌘K`, `/`, `T`, `Esc`).
7. **CTA band:** Download resume + Contact me.

**Motion:** M-04, M-05. Heatmap cells don't animate individually; the grid fades in as one block (M-05).

### 6.5 Blog `/blog` and `/blog/[slug]`

- **Index:** `h1` + a one-line description, then a list (not cards): date (mono, `fg-muted`, tabular), title (`h3`), one-line summary, reading time. Whole-row links with 1px hairline dividers. Newest first.
- **Post:** prose column (68ch); `h1` title; meta row (date · reading time · tags); table of contents in the right rail at `lg` (the current heading turns `accent`, color change only); code blocks on `bg-subtle` in IBM Plex Mono with a copy button; at the end, "Next post" and a CTA band (Resume + Contact).
- **Motion:** M-05 on the index list (40ms, capped at 6). No reveals inside posts; people are reading.

### 6.6 Contact `/contact`

The home "Get in touch" content at page scale: `h1` "Let's talk"; availability ("Open to AI Engineer, Full-Stack and Applied AI roles · based in Hyderabad · remote, or relocating anywhere in India"); the reply-time promise; email with a copy button; LinkedIn; Download resume; and the form (§4.11). Two columns at `lg` (info 5, form 7), stacked on mobile.

**Motion:** M-04 on the title, M-05 on both columns, M-12 after submit. Nothing else.

### 6.7 404 and error

Centered in the container and inside the first viewport at every size: a 200px static Signal graph with one disconnected, hollow node; mono label `404`; `h1` "This page isn't connected to anything."; one sentence; then **Download resume** (primary), Go home (secondary), Search `⌘K` (ghost). The three featured project cards sit below. The error boundary uses the same layout (§4.14).

**Motion:** M-05 on the content, M-18 on the node. Reduced motion: static.

---

## 7. Accessibility checklist

Target: **WCAG 2.2 AA.** Every item is pass/fail.

**Color and contrast**
- [ ] Every text pair in use appears in the §2.1.4 table at 4.5:1 or better (3:1 for text 24px and up).
- [ ] No muted text and no light-mode accent text on `surface-2`.
- [ ] Input borders, focus rings, and icon-only controls reach 3:1 against their background.
- [ ] Nothing relies on color alone: status badges have text, stack groups have labels, form errors have an icon and text.
- [ ] Both themes pass axe with zero contrast issues.

**Focus**
- [ ] Every interactive element shows the 2px `--color-focus` ring on `:focus-visible`. No `outline: none` without a replacement.
- [ ] Focused elements are never hidden under the sticky header (`scroll-padding-top: calc(var(--header-h) + 16px)` on `html`).
- [ ] Project cards show the ring around the whole card when the title link has focus.
- [ ] The palette, mobile menu, and dialogs trap focus and return it to their trigger on close.
- [ ] "Skip to content" is the first focusable element and appears on focus.

**Targets (44px)**
- [ ] Buttons, nav links, icon buttons, social links, filter chips, card secondary links, the marquee pause, toast close, and footer links all have a hit area of at least 44×44px.
- [ ] Adjacent targets are at least 8px apart, or their hit areas don't overlap.

**Keyboard**
- [ ] The whole site works by keyboard alone, and Tab order follows the visual order.
- [ ] `⌘K` / `Ctrl+K` and `/` open the palette; Esc closes it; ↑↓ and ↵ work; the selection is announced via `aria-activedescendant`.
- [ ] `T` toggles the theme. Single-key shortcuts don't fire inside inputs and can be turned off (WCAG 2.1.4).
- [ ] Arrow keys move within the filter group; Tab leaves it.
- [ ] No keyboard traps outside the intentional modal traps.

**Semantics and alt text**
- [ ] One `h1` per page (the name on Home); heading levels don't skip.
- [ ] Landmarks: `header`, `nav` (labelled "Main"), `main`, `footer`.
- [ ] Logo link has `aria-label="Bharath Lakkoju, home"` and the logo image has `alt=""`. Hero avatar: `alt="Portrait of Bharath Lakkoju"`. No two images share alt text unless they show the same thing.
- [ ] Project screenshots describe what's on screen ("project dashboard showing the main workflow and its result"), not "screenshot".
- [ ] Decorative graphics (Signal canvas, blueprint grid, flow lines, heatmap cells) are `aria-hidden` or `alt=""`. The canvas has a visually hidden caption.
- [ ] Icon-only links and buttons have an `aria-label`. Links with `target="_blank"` include visually hidden "(opens in new tab)".
- [ ] Count-up numbers expose their final value to assistive tech; the animated digits are `aria-hidden`.
- [ ] The resume link names its format: "Download resume (PDF, 120KB)".
- [ ] The resume PDF is tagged and text-based (not a scanned image), so screen readers and ATS parsers can read it.

**Motion**
- [ ] `prefers-reduced-motion` is honored by the CSS tokens, by `MotionConfig reducedMotion="user"`, and by every JS effect (§5.4).
- [ ] Anything that moves for more than 5s has a pause control (marquee) or stops by itself (rotating phrase, status halo).
- [ ] Nothing flashes more than 3 times per second.
- [ ] No content is hidden in the HTML waiting for an animation.

**Forms**
- [ ] Visible labels; errors linked with `aria-describedby`; `aria-invalid` on invalid fields; `autocomplete="name"` and `autocomplete="email"`.
- [ ] A submit error moves focus to the error banner; success moves focus to the confirmation heading.
- [ ] Toasts are announced through live regions.

**Zoom and reflow**
- [ ] Usable at 320px wide and at 200% text zoom with no horizontal scrolling, except the marquee and the filter strip, which are designed to scroll.

---

## 8. Recruiter-path checklist

The test case: a recruiter on a phone, between calls, with 30 seconds.

- [ ] **5-second test.** At first paint on 1366×768 and 390×844, without scrolling, the visitor sees the name, "AI Engineer · Full Stack Engineer", "Open to opportunities", and the Download resume button.
- [ ] **Resume within one click from every page**, including 404, the error page, blog posts, and project detail pages, at every breakpoint (header button, plus page-level CTAs).
- [ ] **`⌘K` then `↵`** opens the resume (it's the preselected first result).
- [ ] **Stable resume URL.** `/resume.pdf` always serves the latest version, and the file name includes Bharath's name.
- [ ] **Fast resume.** The PDF is 300KB or less, opens in under a second, and is text-based for ATS parsing.
- [ ] **Contact within one click from every page** (Contact in the nav, email in the footer), and the email address is visible as text on every page, with a copy button.
- [ ] **Target roles named** on the first screen (SEEKING: AI Engineer, Full-Stack, Applied AI) and in the page `<title>` and meta description.
- [ ] **Current employer and experience** on the first screen (stats line) and in the marquee.
- [ ] **Best project one click from Home**, with the whole card clickable. Its detail page answers "what did *you* do" in its first screen (role line).
- [ ] **Every number has context** (bento context line).
- [ ] **GitHub and LinkedIn** on the first screen and in the footer, opening in new tabs.
- [ ] **Share preview works.** Open Graph image (1200×630) with name, role, "Open to opportunities", and the Signal motif, checked in LinkedIn Post Inspector, Slack, and WhatsApp.
- [ ] **Location and work mode** are stated: Hyderabad, India; open to remote and to relocating anywhere in India. Shown in the hero, on Contact, and in JSON-LD.
- [ ] **Fast on mobile data.** LCP under 2.0s on 4G, total Home JS under 150KB gzipped, CLS under 0.05.
- [ ] **Nothing floats over content.** No chat bubbles, "hire me" pop-ups, or banners covering the page or the Resume button.
- [ ] **Search engines.** `Person` JSON-LD with name, jobTitle ("Software Engineer I"), worksFor (UST Global), address (Hyderabad, Telangana, IN), sameAs (GitHub, LinkedIn), and url.
- [ ] **Real-person test.** Hand someone the URL on a phone and ask them to get the resume and open the best project. Target: under 15 seconds.

---

## 9. Rollout

Phases are ordered by recruiter impact per hour of work. Each phase ships on its own. Estimates assume one mid-level engineer who knows Next.js. Items marked **(Bharath)** need his input or OK; the engineer shouldn't block on them, but shouldn't invent them either.

### Phase 1 — Recruiter fundamentals (2–3 days). Ship first.

| # | Task | Done when |
|---|---|---|
| 1.1 | Add `bharath-portfolio-tokens.css`, map it into the Tailwind theme, replace raw colors. New muted and light-mode accent values go live. Swap Inter / JetBrains Mono for IBM Plex Sans / Mono via `next/font` (§2.2) | axe reports 0 contrast failures in both themes |
| 1.2 | Resume always visible: header button at every breakpoint (outside the mobile menu), stable `/resume.pdf`, footer link | Recruiter-path items 1–5 pass |
| 1.3 | Whole-card click on project cards: stretched link, raised secondary links, card-level focus ring | A click anywhere on a card opens the project; keyboard focus outlines the whole card |
| 1.4 | Avatar: 1024px master, `next/image` with `sizes`, AVIF/WebP, `priority`, blur placeholder; delete the 3840px file | Hero avatar under 30KB transferred; mobile LCP under 2.0s |
| 1.5 | Alt text and landmarks: logo link label, avatar alt, skip link, `aria-current` | A screen reader announces the name once in the header |
| 1.6 | 44px targets across nav, social links, chips, card icons, footer; raise the type floor to 12px | Every target passes a 44px overlay check |
| 1.7 | Metadata: titles and descriptions naming target roles, Open Graph image, `Person` JSON-LD | LinkedIn Post Inspector shows the right card |

### Phase 2 — Layout and content structure (3–4 days)

| # | Task | Done when |
|---|---|---|
| 2.1 | 1120px container, 12-column grid, breakpoints, blueprint grid background | At 1280px and wider, no section is narrower than 680px |
| 2.2 | Asymmetric 7/5 hero with the Instrument Serif name and a **static** Signal SVG figure (the canvas comes in Phase 4) | Name, role, status, and Download resume above the fold at 1366×768 and 390×844 |
| 2.3 | Section header component with indices, applied to every section | All sections use it |
| 2.4 | Impact bento with the four confirmed stats and context lines (§4.6) | Every stat has its context line |
| 2.5 | Stack: neutral chips with group dots | Chip text at 5.8:1 or better in both themes |
| 2.6 | Experience: teaser on Home, full timeline on About (Software Engineer I, UST Global, Sep 2024–present; outcome bullets: **Bharath**) | UST Global role visible on Home |
| 2.7 | Contact section and page: form with every state, email with copy | All form states can be demoed; a failed submit keeps the values |

### Phase 3 — Navigation speed and depth (3–4 days)

| # | Task | Done when |
|---|---|---|
| 3.1 | Command palette with resume preselected, pages, projects, posts, theme; `⌘K`, `/`, `T` with an opt-out | Keyboard only: open, type the first letters of its title, open Compliance Review Copilot in 5 keystrokes or fewer |
| 3.2 | Project detail template; pages for Compliance Review Copilot, YouTube Research Agent, ATS Resume Evaluator and the secrets CLI, using §6.3.1 | Each page covers problem, role, architecture, and results where measured; each live project links to its verified live URL |
| 3.3 | /projects filters: deferred (four projects only); build §4.8 only if the list grows past six | No filter UI ships with four projects |
| 3.4 | Page transitions with View Transitions, including the card → detail morph | Works in Chromium and Safari; instant elsewhere; reduced motion gets the cross-fade only |
| 3.5 | 404 and error boundary pages | Both offer resume, home, and search |

### Phase 4 — Signature and motion (3–4 days)

| # | Task | Done when |
|---|---|---|
| 4.1 | Motion tokens in `lib/motion.ts`, a shared `<Reveal>`, `MotionConfig reducedMotion="user"` | Every animation in the codebase maps to an M-ID |
| 4.2 | Hero entrance (M-00), rotating phrase (M-03), status halo (M-01) | Entrance done within 600ms; phrase stops before 5s |
| 4.3 | Signal canvas (M-02): pointer edges, pulse, pausing off-screen and in hidden tabs, static SVG fallback | Under 6KB gzipped; 60fps at 4× CPU throttle; CLS 0 |
| 4.4 | Card flow line (M-07), count-up (M-06), scroll reveals (M-04, M-05) | All run once; reduced motion verified |
| 4.5 | Marquee with pause (M-11) | Pause state persists; static under reduced motion |
| 4.6 | Theme circular reveal (M-10) and icon swap (M-15) | No hover transitions fire during the swap |

### Phase 5 — Polish (2–3 days, then ongoing)

| # | Task | Done when |
|---|---|---|
| 5.1 | GitHub heatmap on About (build time, revalidated daily) | No runtime API call on page load |
| 5.2 | Blog index and post template (TOC, code blocks, CTA band) | Lighthouse Accessibility 100 on a post |
| 5.3 | Toasts (email copied, message sent, link copied) | Announced by screen readers |
| 5.4 | Skeletons where content loads late | Shown only after the 200ms delay |
| 5.5 | Full audit: axe in both themes, keyboard pass, reduced-motion pass, real-person recruiter test | Every box in §7 and §8 is ticked |

**Definition of done for the system:** Lighthouse 95 or higher in all four categories on mobile for Home, /projects, and one project detail page; CLS under 0.05; INP under 200ms; every item in §7 and §8 passes; and a first-time visitor on a phone gets the resume in under 15 seconds.

---

## Appendix A — Inspiration ledger

What we took from each reviewed portfolio, and how it changed to fit Bharath.

| Source | Idea | Adapted as | Left out |
|---|---|---|---|
| shashwa7.in | Rotating italic phrase in the hero | M-03 in Instrument Serif italic; stops after one cycle | An endless loop |
| shashwa7.in | Impact stat marquee with pause | M-11 strip under the hero, with a pause button | — |
| shashwa7.in | Handwritten annotations beside work | Mono blueprint margin notes under featured cards | Script fonts |
| shashwa7.in | "Open to work" and CV on the first screen | Status pill + primary Download resume | — |
| upriyanshu.tech | Ctrl+K search with resume and email on top | Palette with the resume preselected | — |
| upriyanshu.tech | Rotating role line | Merged into the single rotating phrase | A second rotator |
| upriyanshu.tech | One personal widget | GitHub heatmap, About page only | Widgets on Home |
| chanhdai.com | Blueprint hairlines, mono labels | Blueprint grid drawn from the real 12-column layout; section indices | — |
| chanhdai.com | Cursor-reactive hero figure | Signal graph with the avatar as the hub | — |
| athrix.me | Headings revealed from blur on scroll | M-04 on `h2` only, once | Blur on body text or images |
| athrix.me, prathm.me, kushchaudhary.com | Keyboard shortcuts, `T` for theme | `⌘K`, `/`, `T`, with an opt-out | A large shortcut set |
| prathm.me, kushchaudhary.com | GitHub heatmap | About page widget | Heatmap on Home |
| All seven | Lessons | Motion under 600ms; nothing floating over content; resume always visible | Ads, chat bubbles, cursor followers |

## Appendix B — Inputs from Bharath

**Resolved (20 Oct 2026)**

| Input | Answer | Where it's used |
|---|---|---|
| Typeface | IBM Plex Sans + IBM Plex Mono (replaces Geist / Inter / JetBrains Mono) | §2.2, tokens file |
| Location and work mode | Hyderabad, India; open to remote and to relocating anywhere in India | Hero (§4.4), marquee, Contact (§6.6), JSON-LD, recruiter checklist |
| Current role | Software Engineer I, UST Global, Sep 2024 – present | Timeline (§4.10), Home experience row, JSON-LD |
| Impact stats | 69% / 113% / 86% / 99% confirmed, with context lines | Bento (§4.6), marquee |
| Display face | Instrument Serif approved for name + rotating phrase | §2.2, tokens file |
| Photo | Existing image: GitHub avatar referenced in `src/lib/data.ts` (`public/` holds only `favicon.ico`); self-host as `public/images/bharath-avatar.jpg` | §4.4 |
| Projects | Final four (Head of Engg + Bharath, 20 Oct 2026): Compliance Review Copilot (flagship), YouTube Research Agent, ATS Resume Evaluator, Open-source secrets CLI (nvault). All others removed | §6.2, §6.3.1 |

**Still open**

1. **Bharath's OK on the descriptive titles:** Compliance Review Copilot, YouTube Research Agent, ATS Resume Evaluator, Open-source secrets CLI (nvault).
2. *Optional:* a higher-resolution square photo if he wants the About portrait larger than about 230px.
