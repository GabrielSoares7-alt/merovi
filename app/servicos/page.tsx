import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { DashList } from "@/components/ui/DashList";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Serviços — Merovi",
  description:
    "Sites, landing pages, domínio, publicação, Google Meu Negócio e Google Ads: tudo que a Merovi entrega pra sua empresa ser encontrada e escolhida online.",
};

type Service = {
  title: string;
  benefit: string;
  deliverables: string[];
};

const SERVICES: Service[] = [
  {
    title: "Criação de sites profissionais personalizados",
    benefit:
      "Um site pensado pro seu negócio, não um modelo genérico. É a primeira impressão que seu cliente tem antes mesmo de falar com você, e ela precisa mostrar o padrão do que você realmente entrega.",
    deliverables: [
      "Design personalizado, alinhado à identidade do seu negócio",
      "Site responsivo, funcionando bem em qualquer celular ou computador",
      "Estrutura pensada pra facilitar o contato (WhatsApp, telefone, formulário)",
    ],
  },
  {
    title: "Landing pages de alta conversão",
    benefit:
      "Uma página com um objetivo só: transformar quem clicou num anúncio ou link em cliente. Sem distração, sem informação demais, só o caminho mais curto até o contato.",
    deliverables: [
      "Página única focada numa oferta ou campanha específica",
      "Estrutura de copy e CTA pensada pra conversão",
      "Pronta pra receber tráfego pago ou compartilhamento direto",
    ],
  },
  {
    title: "Registro e configuração de domínios",
    benefit:
      "Seu próprio endereço na internet, no seu nome, não um link temporário ou uma página dentro de outra plataforma. É o primeiro passo pra parecer, e ser, uma empresa estabelecida.",
    deliverables: [
      "Domínio próprio registrado (ex: suaempresa.com.br)",
      "Configuração técnica completa, com DNS apontado corretamente",
      "Domínio pronto pra uso imediato, sem complicação técnica da sua parte",
    ],
  },
  {
    title: "Publicação e estruturação completa do site",
    benefit:
      "Ter um site pronto não adianta se ele não estiver no ar, rápido e organizado do jeito que o Google e as pessoas esperam. Cuidamos de toda a estruturação técnica pra ele funcionar de verdade.",
    deliverables: [
      "Site publicado e no ar, com hospedagem configurada",
      "Estrutura técnica organizada: performance, responsividade, SEO básico",
      "Site pronto pra ser encontrado, não só pra existir",
    ],
  },
  {
    title: "Configuração e otimização do Google Meu Negócio",
    benefit:
      "Boa parte da busca por empresas locais acontece direto no Google Maps. Se o seu perfil não está completo e otimizado, esse cliente encontra o concorrente primeiro.",
    deliverables: [
      "Perfil completo no Google Meu Negócio, com todas as informações corretas",
      "Categoria, fotos e horários configurados pra gerar mais confiança",
      "Presença otimizada pra aparecer nas buscas locais",
    ],
  },
  {
    title: "Configuração e gerenciamento de campanhas no Google Ads",
    benefit:
      "Em vez de esperar o tempo necessário pra crescer organicamente, campanhas bem configuradas colocam sua empresa na frente de quem já está procurando o que você oferece, agora.",
    deliverables: [
      "Campanha configurada com foco no seu objetivo: ligações, mensagens ou visitas ao site",
      "Acompanhamento e ajustes contínuos da campanha",
      "Direcionamento de tráfego qualificado pro seu site ou landing page",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
      <Section reveal={false} className="pb-0">
        <div className="max-w-2xl">
          <h1 className="glow-text text-3xl font-bold md:text-5xl">
            Serviços
          </h1>
          <p className="mt-4 text-lg text-muted">
            Cada entrega existe pra colocar sua empresa na frente de quem já
            está procurando o que você oferece, e pra passar confiança assim
            que ela chegar.
          </p>
        </div>
      </Section>

      <Section reveal={false}>
        <ScrollReveal className="flex flex-col gap-6" stagger y={24}>
          {SERVICES.map((service) => (
            <Card key={service.title} className="flex flex-col gap-5">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="text-muted">{service.benefit}</p>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  O que você recebe
                </p>
                <DashList
                  items={service.deliverables}
                  className="mt-3 gap-2 text-sm"
                />
              </div>
            </Card>
          ))}
        </ScrollReveal>
      </Section>

      <Section tone="surface" className="py-14 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-lg font-semibold">Em breve</h2>
          <p className="mt-3 text-muted">
            A Merovi está expandindo além de sites e campanhas: softwares
            próprios, automações e inteligência artificial aplicados ao seu
            negócio já estão em desenvolvimento. Quando fizer sentido pra
            sua empresa, você vai ser um dos primeiros a saber.
          </p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
