---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

## Scope & Visitor Mode

Home (`app/page.tsx`), Persuade. First and primary conversion surface for the whole site — every other page (`/servicos`, `/quem-faz-seu-projeto`, `/solicitar-meu-site`) is currently a stub reached from here.

## Audience, Job, Action

Non-technical SMB owner (clínica, escritório, restaurante, loja, prestador de serviço) deciding whether to trust a digital vendor. Job: judge, in seconds, whether Merovi looks credible enough to hand over the business's online presence. Action: click "Solicitar meu site" (→ `/solicitar-meu-site`).

## Proof / Content

No real client names, testimonials, or metrics exist yet (confirmed in PRODUCT.md). The Authority section and the Antes/Depois block both argue from mechanism and craft standard, not from fabricated evidence — replace with real cases the moment they exist; do not add numbers or names before then.

## Constraints

- StoryBrand frame: visitor is the hero, Merovi is the guide — headline names the gap (looking less credible online than the business really is), not "we build websites."
- Hero text/CTA must render independent of the 3D layer (dynamic import + Suspense, gated by `useShouldRender3D`).
- "Como funciona" pin+scrub must degrade to a plain stacked list under `prefers-reduced-motion` — no pin, no scrub.

## Chosen Direction & Memorable Moment

The hero's abstract faceted shard (an upward-pointing low-poly cone, echoing the logo's growth-arrow without literally redrawing it) is the signature moment — the one glow-bearing 3D element on the page, reacting subtly to the pointer. Everything below it is the restrained, flat-by-default system from DESIGN.md.

## Unresolved / Open for Later

- "Como funciona" process copy (Diagnóstico → Direção e design → Desenvolvimento → Lançamento e acompanhamento) is a reasonable generic agency flow authored for this build, not yet confirmed as Merovi's actual documented process — confirm or adjust before treating it as settled.
- Service cards link to `/servicos` (shared stub) rather than individual sub-pages; revisit if `/servicos` grows enough to need per-service deep links.
