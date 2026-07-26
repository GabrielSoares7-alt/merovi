---
name: Merovi
description: Presença digital premium para pequenas e médias empresas — monocromático, tecnológico, focado em conversão.
colors:
  void-black: "#0a0a0a"
  charcoal-surface: "#1a1a1a"
  radiant-white: "#ffffff"
  quiet-gray: "#8a8a8a"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  full: "9999px"
  lg: "0.5rem"
  "2xl": "1rem"
spacing:
  gutter: "1.5rem"
  section-y-mobile: "5rem"
  section-y-desktop: "7rem"
  container-max: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.radiant-white}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.radiant-white}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.charcoal-surface}"
    textColor: "{colors.radiant-white}"
    rounded: "{rounded.2xl}"
    padding: "24px"
---

# Design System: Merovi

## Overview

**Creative North Star: "The Signal in the Dark"**

Merovi sells trust to business owners who don't speak tech and are wary of being sold a template dressed up as a website. The surface answers that with restraint: a near-black field with exactly one voice of light — a radiant white glow — that appears only on the logo, the emphasized headline, and the primary conversion action. Everything else stays quiet (white text, `#8A8A8A` secondary text, `#1A1A1A` surfaces) so the glow reads as a deliberate signal, not decoration. The register is Apple/Vercel/Linear/Stripe-tier: engineered, unhurried, zero ornament for ornament's sake.

Confirmed rejections: no color outside the monochrome (no accent hue, no gradients), no gradient text, no nested cards, no generic rounded icon tiles, no tracked-uppercase eyebrows, no template-SaaS look.

**Key Characteristics:**
- Void-black field, radiant-white voice, one glow reserved for the highest-stakes elements.
- Motion is physical and restrained: spring-based hover/tap on interactive elements, a single scroll-triggered reveal per section — never scattered effects.
- Flat by default; depth appears only as a response to hover (card lift, button glow bloom).

## Colors

Two neutrals plus one signal. This is a Restrained strategy: the glow is the only accent, and its rarity is the point.

### Primary
- **Radiant White** (`#FFFFFF`): logo, emphasized headlines (`.glow-text`), and the primary CTA. Carries the brand's one glow effect — never applied to more than a few elements per screen.

### Neutral
- **Void Black** (`#0A0A0A`): page background (`--color-background`).
- **Charcoal Surface** (`#1A1A1A`): card and secondary-section background (`--color-surface`), one step up from the void.
- **Quiet Gray** (`#8A8A8A`): secondary/body-muted text (`--color-muted`) — never gray-on-color, since the whole surface is neutral.

### Named Rules
**The One Glow Rule.** Glow (text-shadow, box-shadow bloom, or drop-shadow) is reserved for the logo, one emphasized headline per view, and the primary CTA. A secondary button, a card, or body text never gets a glow at rest — only cards earn a soft one on hover, as a state response, not a resting decoration.

## Typography

**Display/Body Font:** Geist (`next/font/google`), falling back to `system-ui, sans-serif`.

**Character:** A single premium sans-serif carries every role — no serif, no mono — reinforcing the engineered, unadorned register. Weight does the work that a second typeface would in a less restrained system.

### Hierarchy
- **Display/Headline** (700, `text-3xl`/1.875rem, leading-tight): page and section titles; the only text style that may carry `.glow-text`.
- **Title** (600, `text-lg`): card and footer-column headings.
- **Body** (400, `text-sm`–`text-base`): paragraph copy, nav links at rest.
- **Label** (600, `text-sm`): button text.

### Named Rules
**The No-Filler-Weight Rule.** Only three weights are used: 400 (body), 600 (labels/titles), 700 (display). No 300 or 500 — the scale stays legible at a glance.

## Layout

Single-column, max-width container (`max-w-6xl`, 72rem/1152px) centered with a `px-6` (24px) gutter that never changes across breakpoints — density is controlled by vertical rhythm, not by widening the gutter. Mobile-first: the header collapses nav+CTA into a hamburger-triggered panel below `md`; footer collapses its four columns to a 2-column grid below `sm` and a single column below that.

**Section rhythm.** Every section shares one vertical cadence via the `Section` component: `py-20` (80px) on mobile, `md:py-28` (112px) on desktop. Sections alternate `bg-background`/`bg-surface` tone to separate content blocks without borders or cards-as-containers.

**Reveal rhythm.** `ScrollReveal` (GSAP + ScrollTrigger, `power3.out`, ~1s, `y: 40px→0` + opacity) is the default entrance for every section below the fold. Above-the-fold content (Hero, page-title blocks) skips it entirely (`reveal={false}`) — it should be there on first paint, not fade in. A repeating collection (card grid, bullet list) passes `stagger` so items reveal one after another (0.1s gap) instead of as one flat block; when that's on, the section itself renders with `reveal={false}` and its heading gets its own plain `ScrollReveal` so the heading and the staggered items don't double-fade on top of each other.

## Elevation & Depth

Flat at rest. Shadows exist only as a response to interaction, never as ambient decoration on a static element.

### Shadow Vocabulary
- **CTA glow (rest)** (`box-shadow: 0 0 20px rgba(255,255,255,0.28)`): primary button at rest — a quiet halo signaling "this is the action."
- **CTA glow (hover)** (`box-shadow: 0 0 36px rgba(255,255,255,0.5)`): primary button on hover — the halo blooms, the spring-scale (1.03) reinforces it's alive.
- **Card lift (hover)** (`box-shadow: 0 16px 40px -16px rgba(0,0,0,0.65), 0 0 24px rgba(255,255,255,0.08)`): a real offset+blur elevation shadow paired with a faint accent glow — depth first, brand glow second.
- **Headline/logo glow** (`text-shadow`/`filter: drop-shadow`, `0 0 24px rgba(255,255,255,0.35)` text / `0 0 10px rgba(255,255,255,0.35)` drop-shadow for the transparent-PNG mark): the resting glow reserved for brand-critical elements (see Named Rule above).
- **3D monogram glow** (`meshStandardMaterial`, `emissive: #ffffff`, `emissiveIntensity: 1.4`, `toneMapped: false`): the hero's extruded mark reads radiant white, not shaded gray, because emissive output bypasses the renderer's tone mapping. Point lights stay secondary — they only add specular glints on the bevel edges, not the base brightness.
- **Hero rays glow** (`filter: drop-shadow(0 0 var(--ray-blur) rgba(255,255,255,0.55))` on a vertical gradient strip, `--ray-blur` 3–10px per ray): ambient, low-opacity (0.25–0.5 peak), CSS-only so it costs nothing on the WebGL render budget the hero's 3D mark already spends.

### Named Rules
**The Flat-By-Default Rule.** No card, section, or button carries a shadow at rest except the primary CTA's quiet halo (its glow IS its resting state, by brand mandate). Every other shadow is hover-only.

**The Emissive-Not-Shaded Rule.** Any 3D/WebGL element meant to read as "radiant white" (matching the CSS glow language) must drive that brightness through `emissive` + `toneMapped: false`, not through scene lighting alone — standard PBR shading on an extruded/faceted mesh reads as gray on faces angled away from the lights, which breaks the One Glow Rule's intent.

## Shapes

Two radii, used consistently: **full** (`rounded-full`, 9999px) for every button — pill shape signals "action" throughout the system — and **2xl** (`rounded-2xl`, 16px) for cards and other content containers. Borders are hairline-only (`border-white/10` to `border-white/25`), never colored, never thicker than 1px.

## Components

### Buttons
- **Shape:** fully rounded (pill, 9999px), `px-6 py-3` (24px/12px).
- **Primary:** white fill (`bg-foreground`), black text (`text-background`) — the CTA that owns the resting glow (see Elevation & Depth). Used once per view for the highest-priority action.
- **Secondary:** transparent fill, `border-white/25`, white text — no glow, ever. Hover brightens the border (`border-white/50`) and adds a faint fill (`bg-white/5`).
- **Hover / Focus:** both variants spring-scale to 1.03 on hover / 0.97 on tap (Framer Motion, `stiffness: 420, damping: 26`); focus-visible gets a 2px white/60 outline ring.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px).
- **Background:** `charcoal-surface` (`#1A1A1A`).
- **Border:** hairline `border-white/10`.
- **Shadow Strategy:** flat at rest; on hover, lifts 4px (`y: -4`) with the offset+blur elevation shadow from the vocabulary above (spring transition, `stiffness: 300, damping: 24`).
- **Internal Padding:** 24px (`p-6`).
- **Content composition:** the same primitive serves compact teaser cards (Home's service grid: title + one-line description + text link) and full detail blocks (`/servicos`: title + benefit paragraph + a "O que você recebe" sub-list). No separate component for the detailed variant — just more content in the same Card, stacked full-width instead of gridded.

### Navigation (Header)
- **Style:** sticky, full-width. At the top of the page the header is fully transparent (no border, no fill) so the hero reads as one uninterrupted field; past an 8px scroll threshold it gains `bg-background/80` + `backdrop-blur-md` + a hairline bottom border, purely for legibility over scrolling content — never decorative glass.
- **Typography/state:** nav links are `quiet-gray` at rest, white on hover, 200ms color transition. The primary CTA (`Button` primary) is always visible, never collapsed.
- **Mobile treatment:** below `md`, nav links and CTA collapse behind a hamburger glyph that morphs into an X (Framer Motion rotate/opacity, 200ms); tapping opens an animated panel (Framer Motion `clipPath` wipe + opacity, 250ms ease-out — not `height`, which would force layout reflow every frame) listing nav links and a full-width primary CTA.

### Hero
- **3D monogram:** the logo's own traced outline (`scripts/trace-logo.mjs` → `components/3d/logo-path.ts`), extruded with `THREE.ExtrudeGeometry` (28-unit depth, beveled) so the hero's signature moment is recognizably the brand mark, not an abstract stand-in. Swings freely with the pointer around a resting tilt, wide enough to feel alive without ever reading upside down or edge-on. `side: THREE.DoubleSide` is required (the SVG→three Y-flip inverts winding).
- **Background rays:** a pool of 7 procedurally-generated lightning-bolt SVG paths (zigzag, 4–7 segments, randomized per mount) behind the content (`-z-10` vs content's `z-20`, plus `isolate` on the section for a clean stacking context). Each flashes in fast and decays on its own randomized delay/duration (5–10s cycle), so only ~2–4 are ever lit at once — never a synchronized grid. Glow is a 4-layer `drop-shadow` stack for real intensity, matching the monogram/CTA's radiant white. Mobile shows 4 rays with a lighter 2-layer glow; `prefers-reduced-motion` freezes them at a static low opacity instead of flashing.
- **Text/CTA never depend on the 3D layer:** it's dynamic-imported (`next/dynamic`, `ssr:false`) behind `useShouldRender3D` (skips <768px viewports, low `deviceMemory`, and reduced motion) with a `Suspense` + gradient-blob fallback.

### How It Works (pinned scroll-scrub)
- **Pin + scrub, not a timed animation:** GSAP ScrollTrigger pins the section (`pin: true`) and drives a timeline with `scrub: 1` (a slight smoothing lag) and `ease: "none"` on every tween — scrub already maps scroll position to progress, so an eased tween on top would make the animation feel disconnected from the user's actual scroll input. Steps cross-fade + slide (`autoAlpha`, `y`) between each other as the user scrolls through the pinned range.
- **Degrades to a plain list under `prefers-reduced-motion`:** no pin, no scrub, all four steps stacked and visible in normal flow.

### Forms (Request form)
- **Choice fields default to pills, not native inputs:** `RadioGroup`/`CheckboxGroup` render options as toggle-pill buttons (`rounded-full` border, selected = solid white fill + black text). Free text is reserved for fields with no enumerable options (name, e-mail, "cores preferidas") or as an "outros" escape hatch that reveals a small manual-entry input beneath the pills.
- **Text inputs:** `rounded-lg`, hairline border, transparent background, white focus border — same restrained language as everywhere else, no accent focus ring.
- **Validation errors are monochrome, not red:** an invalid field gets a brighter border (`border-white/50`) and bold foreground error text prefixed with "!" — introducing red here would break the neutral-only palette rule just as much as anywhere else on the site.
- **Multi-step shell:** a plain `bg-surface` card (no Framer Motion hover-lift, unlike the marketing `Card`) with a thin step-progress bar and "Passo X de Y" label. This surface is deliberately calmer than the rest of the site — see the Named Rule below.
- **Native `<select>` for closed, long enumerations** (the 27 UF list): a pill row would be too wide/repetitive for that many options, so `SelectField` uses a real `<select>` styled to match the text-input language, trading a little visual consistency with the pill pattern for a native, keyboard- and mobile-friendly control.
- **Autocomplete suggestions** (`CityAutocomplete`, IBGE municipality data scoped to the chosen UF): a plain-text input with a dropdown list below it, same border/radius language as other inputs — no pill treatment, since free text with assist is a different affordance than a closed choice.

### Named Rules
**The Task-Surface Restraint Rule.** A surface whose job is fast, accurate data entry (the request form) drops the marketing motion vocabulary: no `ScrollReveal`, no Card hover-lift, no background rays or 3D. Pill buttons still get a quick color transition for basic feedback, but nothing competes with filling out the form.

### Team (person cards)
- **Photo treatment:** real photos render at `grayscale` (CSS filter) in a `rounded-2xl` portrait frame — full color would break the monochrome rule, so every human photo on the site is desaturated, never color-corrected to grayscale-looking, actually forced via `filter: grayscale(100%)`.
- **Fallback:** no photo yet → an initials avatar (circle, `bg-surface`, hairline border, bold initials, no glow — glow stays reserved per the One Glow Rule).
- **Layout:** photo + name/role/bio side-by-side on `sm:` and up, stacked on mobile. Driven by an array (`lib/team.ts`); one entry reads as a founder spotlight, more entries just stack more of the same card — no separate "team grid" component exists or is needed yet.

### Footer
- **Structure:** four-column grid (brand+tagline / navigation / contact / social) collapsing to 2-column at `sm` and 1-column below; a hairline-bordered copyright bar closes the page. The navigation column reads directly from the shared nav list, so adding a future route (blog, cases) extends the column automatically — no reserved empty slot.
- **Contact:** WhatsApp and email as plain quiet-gray links, white on hover — no icon needed since the label is already legible.
- **Social:** Instagram handle paired with a small monochrome (currentColor, no brand-colored gradient) glyph.

## Do's and Don'ts

### Do:
- **Do** reserve glow for the logo, one emphasized headline per view, and the primary CTA — everything else stays flat until hovered.
- **Do** keep the horizontal gutter fixed (`px-6`) and control density with the `Section` vertical rhythm (`py-20`/`md:py-28`) instead.
- **Do** use Framer Motion spring transforms (scale, y) for interactive microinteractions, and reserve GSAP ScrollTrigger for the once-per-section scroll-reveal.
- **Do** pull nav links, CTA target, and contact info from `lib/nav.ts` — never hardcode a route or phone number in a component.
- **Do** animate only `transform` and `opacity` (GSAP `y`/`x`/`scale`/`autoAlpha`, Framer Motion `scale`/`y`/`rotate`) so every animation stays on the compositor thread. For a growing bar, animate `transform: scaleX()` on a full-width element (`transform-origin` set to the growth edge), never `width`. For a collapsible panel, animate `clip-path` (paint-only, no reflow), never `height`.

### Don't:
- **Don't** introduce any hue outside the void-black/charcoal/white/gray neutral set — no accent color, no gradient, ever.
- **Don't** nest cards inside cards, or use a rounded icon tile above every card heading.
- **Don't** add a resting shadow or glow to a secondary button, a card, or body text — those are hover-only or forbidden entirely.
- **Don't** use a tracked uppercase eyebrow or section numbering (01/02/03) as default section grammar.
- **Don't** animate `width`, `height`, `top`, or `left` directly — those force layout reflow on every frame. `box-shadow`/`background-color`/`border-color`/`filter` transitions (the CTA glow bloom, Card's hover shadow, Header's scroll blur) are paint-only, not layout, so they're fine in moderation; they're just not `transform`/`opacity` either, so don't reach for them as a default — they earn their place only where a documented brand effect (glow, elevation) needs them.
