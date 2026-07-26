import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

/**
 * The two mockups are the one deliberate exception to the site's
 * monochrome palette (see DESIGN.md) — they're illustrative renders of a
 * fictional "Empresa Exemplo", not a real client, so their original blue
 * branding stays untouched inside the frame while everything around them
 * (labels, arrow, copy) stays on the standard black/white system.
 */
function MockupFrame({
  src,
  alt,
  label,
  labelClassName,
}: {
  src: string;
  alt: string;
  label: string;
  labelClassName: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className={`text-sm font-semibold ${labelClassName}`}>{label}</h3>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-background">
        <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-surface px-3">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function TransitionArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 rotate-90 text-muted md:rotate-0"
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Transformation() {
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
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <MockupFrame
            src="/transformation/before.jpg"
            alt="Mockup ilustrativo de um site genérico e desatualizado"
            label="Antes"
            labelClassName="text-muted"
          />
          <TransitionArrow />
          <MockupFrame
            src="/transformation/after.jpg"
            alt="Mockup ilustrativo de um site moderno, no padrão que a Merovi entrega"
            label="Depois"
            labelClassName="text-foreground"
          />
        </div>
      </ScrollReveal>
    </Section>
  );
}
