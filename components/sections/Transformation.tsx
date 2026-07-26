import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const BEFORE = [
  "Site desatualizado, lento ou inexistente",
  "Difícil de encontrar quando alguém procura no Google",
  "Passa a impressão de negócio improvisado, mesmo sem ser",
];

const AFTER = [
  "Presença digital à altura do que seu negócio realmente entrega",
  "Aparece para quem já está procurando o que você oferece",
  "Transmite confiança antes mesmo do primeiro contato",
];

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
      <ScrollReveal className="grid gap-6 md:grid-cols-2" stagger y={24}>
        <Card>
          <h3 className="text-sm font-semibold text-muted">Antes</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {BEFORE.map((item) => (
              <li key={item} className="text-muted">
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-foreground">Depois</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {AFTER.map((item) => (
              <li key={item} className="text-foreground">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </ScrollReveal>
    </Section>
  );
}
