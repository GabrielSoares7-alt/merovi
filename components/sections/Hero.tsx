import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/nav";
import { HeroVisual } from "@/components/sections/HeroVisual";

export function Hero() {
  return (
    <Section reveal={false} className="flex min-h-[80vh] items-center">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="glow-text text-3xl font-bold leading-tight md:text-5xl">
            Seu negócio já é bom. Falta parecer tão bom quanto é, online.
          </h1>
          <p className="max-w-lg text-lg text-muted">
            A Merovi cria sites e páginas que fazem sua empresa ser encontrada
            no Google e escolhida com confiança, sem depender de sorte ou de
            indicação.
          </p>
          <Button href={PRIMARY_CTA.href} variant="primary">
            {PRIMARY_CTA.label}
          </Button>
        </div>
        <HeroVisual />
      </div>
    </Section>
  );
}
