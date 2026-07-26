"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Entendemos seu negócio, seu público e o que precisa aparecer no seu site para gerar confiança e contato.",
  },
  {
    number: "02",
    title: "Direção e design",
    description:
      "Definimos a estrutura e o visual do site, alinhados à identidade da sua marca e ao que seu cliente espera ver.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Construímos o site com tecnologia moderna: rápido, responsivo e pronto para aparecer bem no Google.",
  },
  {
    number: "04",
    title: "Lançamento e acompanhamento",
    description:
      "Colocamos no ar e acompanhamos os primeiros resultados, ajustando o que for preciso.",
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
