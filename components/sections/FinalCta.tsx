import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/nav";

export function FinalCta() {
  return (
    <Section className="text-center">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
        <h2 className="glow-text text-2xl font-bold md:text-3xl">
          Pronto para parar de perder clientes pra quem aparece primeiro?
        </h2>
        <p className="text-muted">
          Fale com a Merovi e veja como ficaria a presença digital do seu
          negócio.
        </p>
        <Button href={PRIMARY_CTA.href} variant="primary">
          {PRIMARY_CTA.label}
        </Button>
      </div>
    </Section>
  );
}
