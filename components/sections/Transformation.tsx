"use client";

import { useRef } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const INITIAL_PERCENT = 50;

/**
 * The two mockups are the one deliberate exception to the site's
 * monochrome palette (see DESIGN.md) — they're illustrative renders of a
 * fictional "Empresa Exemplo", not a real client, so their original blue
 * branding stays untouched inside the frame while everything around them
 * stays on the standard black/white system.
 *
 * Drag position is applied straight to the DOM via refs (clip-path + the
 * handle's `left`), batched through requestAnimationFrame, instead of going
 * through React state or a GSAP tween — a slider has to track the pointer
 * with zero perceived lag, and a state update + re-render per pointermove
 * would add exactly the kind of delay this needs to avoid.
 */
export function Transformation() {
  const frameRef = useRef<HTMLDivElement>(null);
  const afterClipRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerXRef = useRef(0);

  function applyPercent(percent: number) {
    const clamped = Math.min(100, Math.max(0, percent));
    if (afterClipRef.current) {
      afterClipRef.current.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${clamped}%`;
      handleRef.current.setAttribute(
        "aria-valuenow",
        String(Math.round(clamped)),
      );
    }
  }

  function scheduleUpdate() {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const frame = frameRef.current;
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      const percent = ((pointerXRef.current - rect.left) / rect.width) * 100;
      applyPercent(percent);
    });
  }

  function handlePointerMove(event: PointerEvent) {
    pointerXRef.current = event.clientX;
    scheduleUpdate();
  }

  function stopDragging() {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", stopDragging);
    window.removeEventListener("pointercancel", stopDragging);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }

  return (
    <Section tone="surface" reveal={false}>
      <ScrollReveal className="mb-12 max-w-2xl">
        <h2 className="text-2xl font-bold md:text-3xl">Antes e depois</h2>
        <p className="mt-4 text-muted">
          A diferença não é só estética, é o que acontece quando alguém
          decide conhecer sua empresa online.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <p className="mb-6 text-xs text-muted">
          Exemplo ilustrativo — não representa um cliente real da Merovi.
        </p>
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-background">
          <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-surface px-3">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          <div
            ref={frameRef}
            className="relative aspect-[3/2] w-full select-none"
          >
            <Image
              src="/transformation/before.jpg"
              alt="Mockup ilustrativo de um site genérico e desatualizado"
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              draggable={false}
            />
            <div
              ref={afterClipRef}
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${INITIAL_PERCENT}%)` }}
            >
              <Image
                src="/transformation/after.jpg"
                alt="Mockup ilustrativo de um site moderno, no padrão que a Merovi entrega"
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                draggable={false}
              />
            </div>

            {/* Drag handle: a full-height 44px-wide hit area (generous
                touch target) containing the thin visible divider line and
                the glowing circular knob, both centered on it. */}
            <div
              ref={handleRef}
              role="slider"
              aria-label="Arraste para comparar antes e depois"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={INITIAL_PERCENT}
              onPointerDown={(event) => {
                event.preventDefault();
                pointerXRef.current = event.clientX;
                scheduleUpdate();
                document.body.style.cursor = "ew-resize";
                document.body.style.userSelect = "none";
                window.addEventListener("pointermove", handlePointerMove);
                window.addEventListener("pointerup", stopDragging);
                window.addEventListener("pointercancel", stopDragging);
              }}
              className="absolute inset-y-0 flex w-11 -translate-x-1/2 touch-none items-center justify-center cursor-ew-resize"
              style={{ left: `${INITIAL_PERCENT}%` }}
            >
              <span className="pointer-events-none absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white" />
              <span className="glow-drop pointer-events-none relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-background">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M8 7l-4 5 4 5M16 7l4 5-4 5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
