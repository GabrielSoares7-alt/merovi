import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { DashList } from "@/components/ui/DashList";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Team } from "@/components/sections/Team";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Quem cuida do seu projeto",
  description:
    "Conheça quem está por trás da Merovi: sem equipe grande, sem terceirização, direto com quem executa cada projeto.",
  alternates: { canonical: "/quem-faz-seu-projeto" },
};

const WHY_DIRECT = [
  "Você fala direto com quem vai construir seu site, não com um atendimento que repassa a informação pra outra equipe.",
  "Nada de terceirização silenciosa: quem planeja é quem constrói.",
  "Ajustes e decisões acontecem rápido, sem depender de repasses entre várias pessoas.",
  "Cada projeto recebe atenção real, não é só mais um número numa fila de produção.",
];

const HOW_WORK_HAPPENS = [
  "Comunicação direta, geralmente pelo WhatsApp, pra você acompanhar o andamento sem depender de reuniões marcadas com semanas de antecedência.",
  "Cada entrega passa por revisão cuidadosa antes de chegar até você: performance, responsividade e consistência visual são checados, não presumidos.",
  "Prazos combinados são levados a sério: você sabe o que esperar e quando esperar.",
  "Atenção aos detalhes que fazem diferença, pequenos ajustes de copy, hierarquia visual e usabilidade, porque alguém realmente olhou pra cada tela antes de publicar.",
];

export default function QuemCuidaDoSeuProjetoPage() {
  return (
    <>
      <Section reveal={false}>
        <div className="mb-12 max-w-2xl">
          <h1 className="glow-text text-3xl font-bold md:text-5xl">
            Quem cuida do seu projeto
          </h1>
          <p className="mt-4 text-lg text-muted">
            Não existe uma equipe de dez pessoas por trás da Merovi. Existe
            alguém que assume cada projeto do início ao fim, e é assim que se
            garante o padrão.
          </p>
        </div>
        <Team />
      </Section>

      <Section tone="surface" reveal={false}>
        <ScrollReveal className="max-w-2xl">
          <h2 className="text-2xl font-bold md:text-3xl">
            Direto com quem faz, sem intermediário
          </h2>
          <p className="mt-4 text-muted">
            Trabalhar com quem executa, e não com quem só repassa, muda o
            resultado final.
          </p>
        </ScrollReveal>
        <div className="mt-8 max-w-2xl">
          <DashList items={WHY_DIRECT} className="gap-3" stagger />
        </div>
      </Section>

      <Section reveal={false}>
        <ScrollReveal className="max-w-2xl">
          <h2 className="text-2xl font-bold md:text-3xl">
            Como o trabalho acontece
          </h2>
          <p className="mt-4 text-muted">
            Profissionalismo não depende do tamanho da equipe, depende de
            processo.
          </p>
        </ScrollReveal>
        <div className="mt-8 max-w-2xl">
          <DashList items={HOW_WORK_HAPPENS} className="gap-3" stagger />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
