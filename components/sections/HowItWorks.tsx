"use client";

import { useLayoutEffect, useRef } from "react";
import { Section } from "@/components/ui/Section";

const STEPS = [
  {
    number: "01",
    title: "Conversa inicial",
    description:
      "Depois que você solicita seu site, falamos direto pelo WhatsApp para entender seu negócio e recomendar o pacote ideal para o seu momento.",
  },
  {
    number: "02",
    title: "Briefing guiado",
    description:
      "Você recebe formulários simples para reunir o que é necessário: conteúdo do site, e, conforme o pacote, informações para domínio e presença no Google.",
  },
  {
    number: "03",
    title: "Desenvolvimento e ajustes",
    description:
      "Criamos seu site e apresentamos para revisão antes de publicar, com rodadas de ajuste incluídas.",
  },
  {
    number: "04",
    title: "Publicação e configuração final",
    description:
      "O site vai ao ar, e conforme o pacote contratado, configuramos domínio próprio e otimização no Google Meu Negócio/Google Ads.",
  },
];

/**
 * The pill and the text block are two inputs to a single shared value: how
 * far through the content the section is (0 = top, 1 = fully scrolled).
 * Dragging either one recomputes that value and writes both the pill's
 * `top` and the text's `translateY` straight to the DOM in the same
 * requestAnimationFrame tick — same zero-lag pattern as the before/after
 * slider in Transformation.tsx, no GSAP tween in the loop, so neither
 * control ever visibly lags behind the other or behind the pointer.
 */
export function HowItWorks() {
  const contentViewportRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const contentRafRef = useRef<number | null>(null);

  const dragRef = useRef<{
    travel: number;
    trackTop: number;
    grabOffset: number;
  } | null>(null);
  const contentDragRef = useRef<{
    startY: number;
    startTranslate: number;
    maxScroll: number;
  } | null>(null);

  function applyProgress(percent: number) {
    const clamped = Math.min(1, Math.max(0, percent));
    progressRef.current = clamped;

    const viewport = contentViewportRef.current;
    const inner = contentInnerRef.current;
    if (viewport && inner) {
      const maxScroll = Math.max(0, inner.scrollHeight - viewport.clientHeight);
      inner.style.transform = `translateY(${-clamped * maxScroll}px)`;
    }

    const track = trackRef.current;
    const pill = pillRef.current;
    if (track && pill) {
      const travel = Math.max(0, track.clientHeight - pill.offsetHeight);
      pill.style.top = `${clamped * travel}px`;
      const value = Math.round(clamped * 100);
      pill.setAttribute("aria-valuenow", String(value));
      pill.setAttribute("aria-valuetext", `${value}% do conteúdo`);
    }
  }

  // --- Right-hand rail: drag or click-to-jump -----------------------------

  function handlePointerMove(event: PointerEvent) {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const drag = dragRef.current;
      if (!drag) return;
      const top = Math.min(
        drag.travel,
        Math.max(0, event.clientY - drag.trackTop - drag.grabOffset),
      );
      applyProgress(drag.travel > 0 ? top / drag.travel : 0);
    });
  }

  function stopDragging() {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", stopDragging);
    window.removeEventListener("pointercancel", stopDragging);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    dragRef.current = null;
  }

  // --- Text block: drag-scroll ---------------------------------------------

  function handleContentPointerMove(event: PointerEvent) {
    if (contentRafRef.current !== null) return;
    contentRafRef.current = requestAnimationFrame(() => {
      contentRafRef.current = null;
      const drag = contentDragRef.current;
      if (!drag) return;
      const delta = event.clientY - drag.startY;
      const translate = Math.min(
        0,
        Math.max(-drag.maxScroll, drag.startTranslate + delta),
      );
      applyProgress(drag.maxScroll > 0 ? -translate / drag.maxScroll : 0);
    });
  }

  function stopContentDragging() {
    window.removeEventListener("pointermove", handleContentPointerMove);
    window.removeEventListener("pointerup", stopContentDragging);
    window.removeEventListener("pointercancel", stopContentDragging);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    contentDragRef.current = null;
  }

  useLayoutEffect(() => {
    applyProgress(0);

    const handleResize = () => applyProgress(progressRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Section id="como-funciona" tone="surface">
      <h2 className="mb-12 text-2xl font-bold md:text-3xl">Como funciona</h2>

      <div className="flex items-start gap-6 md:gap-8">
        <div
          ref={contentViewportRef}
          onPointerDown={(event) => {
            const viewport = contentViewportRef.current;
            const inner = contentInnerRef.current;
            if (!viewport || !inner) return;

            event.preventDefault();
            const maxScroll = Math.max(
              0,
              inner.scrollHeight - viewport.clientHeight,
            );
            contentDragRef.current = {
              startY: event.clientY,
              startTranslate: -progressRef.current * maxScroll,
              maxScroll,
            };
            document.body.style.cursor = "grabbing";
            document.body.style.userSelect = "none";
            window.addEventListener("pointermove", handleContentPointerMove);
            window.addEventListener("pointerup", stopContentDragging);
            window.addEventListener("pointercancel", stopContentDragging);
          }}
          className="h-72 w-full max-w-md touch-none select-none overflow-clip cursor-grab active:cursor-grabbing md:h-56"
        >
          <div ref={contentInnerRef} className="flex flex-col gap-10">
            {STEPS.map((step) => (
              <div key={step.number} className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-muted">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={(event) => {
            const track = trackRef.current;
            const pill = pillRef.current;
            if (!track || !pill) return;

            event.preventDefault();
            const trackRect = track.getBoundingClientRect();
            const travel = Math.max(0, track.clientHeight - pill.offsetHeight);
            const isPillTarget = pill.contains(event.target as Node);

            let grabOffset: number;
            if (isPillTarget) {
              const pillRect = pill.getBoundingClientRect();
              grabOffset = event.clientY - pillRect.top;
            } else {
              grabOffset = pill.offsetHeight / 2;
              const jumpTop = Math.min(
                travel,
                Math.max(0, event.clientY - trackRect.top - grabOffset),
              );
              applyProgress(travel > 0 ? jumpTop / travel : 0);
            }

            dragRef.current = { travel, trackTop: trackRect.top, grabOffset };
            document.body.style.cursor = "grabbing";
            document.body.style.userSelect = "none";
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", stopDragging);
            window.addEventListener("pointercancel", stopDragging);
          }}
          className="relative flex h-72 w-11 shrink-0 touch-none select-none items-center justify-center md:h-56"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 rounded-full bg-[#3A3A38]"
          />
          <div
            ref={pillRef}
            role="slider"
            tabIndex={0}
            aria-label="Rolar o conteúdo de como funciona"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            aria-valuetext="0% do conteúdo"
            className="absolute left-1/2 h-9 w-2 -translate-x-1/2 cursor-grab rounded-full bg-white active:cursor-grabbing"
            style={{ top: 0 }}
          />
        </div>
      </div>
    </Section>
  );
}
