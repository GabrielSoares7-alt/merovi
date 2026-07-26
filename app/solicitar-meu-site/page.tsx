import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { RequestSiteForm } from "@/components/sections/RequestSiteForm";

export const metadata: Metadata = {
  title: "Solicitar meu site",
  description:
    "Conte sobre seu negócio em poucos passos e fale direto no WhatsApp para começar seu projeto com a Merovi.",
  alternates: { canonical: "/solicitar-meu-site" },
};

export default function SolicitarMeuSitePage() {
  return (
    <Section reveal={false}>
      <div className="mb-10 max-w-2xl">
        <h1 className="glow-text text-3xl font-bold md:text-5xl">
          Solicitar meu site
        </h1>
        <p className="mt-4 text-lg text-muted">
          Responda algumas perguntas rápidas sobre seu negócio. No final,
          você é direcionado direto pro WhatsApp com tudo já resumido.
        </p>
      </div>
      <div className="max-w-2xl">
        <RequestSiteForm />
      </div>
    </Section>
  );
}
