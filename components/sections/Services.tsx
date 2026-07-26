import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const SERVICES = [
  {
    title: "Sites institucionais",
    description:
      "Uma presença digital sólida e profissional, que representa seu negócio com a credibilidade que ele merece.",
  },
  {
    title: "Landing pages de alta conversão",
    description:
      "Páginas com um único objetivo: transformar quem visita em contato, com uma mensagem clara e um caminho direto até a ação.",
  },
  {
    title: "Google Ads e Google Meu Negócio",
    description:
      "Sua empresa aparecendo para quem já está procurando o que você oferece, no momento em que decide.",
  },
];

export function Services() {
  return (
    <Section id="o-que-fazemos" reveal={false}>
      <ScrollReveal className="mb-12 max-w-2xl">
        <h2 className="text-2xl font-bold md:text-3xl">
          O que a Merovi entrega
        </h2>
        <p className="mt-4 text-muted">
          Três frentes que trabalham juntas para que seu negócio seja
          encontrado, e escolhido.
        </p>
      </ScrollReveal>
      <ScrollReveal
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        stagger
        y={24}
      >
        {SERVICES.map((service) => (
          <Card key={service.title} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-muted">{service.description}</p>
            <Link
              href="/servicos"
              className="mt-auto text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
            >
              Saiba mais →
            </Link>
          </Card>
        ))}
      </ScrollReveal>
    </Section>
  );
}
