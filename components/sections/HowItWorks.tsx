"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

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

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const steps = stepRefs.current.filter(
      (step): step is HTMLDivElement => step !== null,
    );
    if (!container || steps.length < 2) return;

    const ctx = gsap.context(() => {
      gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 });

      const timeline = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${(steps.length - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
        },
      });

      steps.forEach((step, index) => {
        if (index === 0) return;
        const previous = steps[index - 1];
        timeline
          .to(previous, { autoAlpha: 0, y: -40 }, index - 1)
          .fromTo(step, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0 }, index - 1);
      });
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="como-funciona"
      aria-label="Como funciona"
      className="bg-surface"
    >
      <div
        ref={containerRef}
        className={
          prefersReducedMotion
            ? "mx-auto max-w-6xl px-6 py-20 md:py-28"
            : "mx-auto flex h-screen max-w-6xl flex-col justify-center px-6"
        }
      >
        <h2 className="mb-12 text-2xl font-bold md:text-3xl">
          Como funciona
        </h2>
        <div
          className={
            prefersReducedMotion
              ? "flex flex-col gap-16"
              : "relative h-72 md:h-56"
          }
        >
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className={
                prefersReducedMotion
                  ? "flex flex-col gap-4"
                  : "absolute inset-0 flex flex-col gap-4"
              }
            >
              <span className="text-sm font-semibold text-muted">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="max-w-md text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
