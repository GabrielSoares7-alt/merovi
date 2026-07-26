# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Donos de pequenas e médias empresas migrando para o digital: clínicas, escritórios, restaurantes, lojas e prestadores de serviço. Geralmente não têm profundidade técnica, têm receio de contratar um fornecedor sem confiança, e querem ser encontrados no Google e parecer mais profissionais.

## Product Purpose

A Merovi constrói presença online premium para essas empresas: sites institucionais, landing pages de alta conversão, e gestão de Google Ads/Google Meu Negócio. O site institucional existe para vender — cada seção e CTA deve existir para aumentar conversão, não apenas informar.

## Positioning

Premium, tecnológica, elegante, minimalista — explicitamente não "agência de marketing genérica" nem "freelancer barato". Referência de nível de execução: Apple, Vercel, Linear, Stripe. O diferencial é entregar presença digital de nível técnico/estético alto combinada com foco em conversão, para um público que normalmente só tem acesso a fornecedores genéricos ou baratos.

## Operating Context

Cliente típico está decidindo se confia a presença online do próprio negócio a um fornecedor — a confiança é o obstáculo central da venda. Copy deve vender transformação (mais clientes, mais autoridade) antes de características técnicas.

## Capabilities and Constraints

- Entregáveis (detalhados em `/servicos`): criação de sites profissionais personalizados; landing pages de alta conversão; registro e configuração de domínios; publicação e estruturação completa do site; configuração e otimização do Google Meu Negócio; configuração e gerenciamento de campanhas no Google Ads.
- Roadmap declarado (sem datas prometidas): softwares próprios, automações e inteligência artificial — mencionado como "Em breve" em `/servicos`, discreto, não é uma promessa de prazo.
- Objetivo do site institucional é conversão/geração de lead, não apenas apresentação institucional.
- Evidence on Hand (abaixo) ainda não inclui cases/clientes reais — nenhuma seção deve fabricar prova social até que material real seja fornecido.

## Brand Commitments

- Nome: Merovi.
- Logo: monograma duplo "M" com seta de crescimento (arquivo ainda não enviado pelo usuário — espaço já reservado em header/footer no código).
- Identidade 100% monocromática (preto e branco, sem cor de exceção): fundo `#0A0A0A`, superfícies `#1A1A1A`, texto secundário `#8A8A8A`, branco radiante `#FFFFFF` com efeito de glow em títulos de destaque e CTA principal — já implementado como tokens em `app/globals.css`.
- Anti-padrões explicitamente vetados pelo usuário: gradiente roxo/azul genérico, cards dentro de cards, tipografia sem intenção, texto cinza sobre fundo colorido, ícone redondo genérico acima de título, aparência de template SaaS sem identidade própria. (Direção visual completa pertence ao DESIGN.md, a ser criado em new-work.)

## Evidence on Hand

Nenhum case, cliente, depoimento ou número real foi fornecido ainda. Não inventar prova social, nomes de clientes ou métricas — essas seções devem aguardar material real ou usar linguagem que não afirme provas inexistentes.

Canais de contato reais confirmados (podem ser usados no site): WhatsApp +55 21 99682-8220, e-mail merovidigital@gmail.com, Instagram @merovi.digital.

Time real confirmado: hoje a Merovi é operada por uma única pessoa, Gabriel Soares (fundador, cuida de criação de sites, copywriting e estratégia digital), não uma equipe. Foto real fornecida e em uso em `/quem-faz-seu-projeto` (`public/team/gabriel-soares.jpg`). A estrutura de dados (`lib/team.ts`) já está pronta para virar "Nossa Equipe" quando houver mais integrantes — não assumir "uma pessoa só" como fato permanente ao editar essa página no futuro.

Sitemap confirmado: Home (`/`), Serviços (`/servicos`), Quem faz seu projeto (`/quem-faz-seu-projeto`), Solicitar meu site (`/solicitar-meu-site`) — estrutura de páginas separadas, não âncoras de página única. Todas as quatro páginas estão completas.

`/solicitar-meu-site` é um formulário multi-etapas (17 campos). Restrição confirmada pelo usuário: nunca coletar CNPJ, dados financeiros ou qualquer dado sensível nesse ou em formulários futuros do site.

Fluxo de envio confirmado: submit dispara e-mail (Resend) pra merovidigital@gmail.com com o resumo completo e organizado de todas as respostas → depois redireciona pro WhatsApp (`wa.me/...?text=...`) com uma mensagem curta e genérica (não lista mais as respostas). O e-mail é best-effort: se falhar ou demorar, não trava o redirecionamento pro WhatsApp, que é a ação de conversão real. Requer `RESEND_API_KEY` configurada (ver `.env.example`); sem ela, a rota falha graciosamente e o formulário segue funcionando normalmente (só o e-mail não sai).

**Pendência real de configuração (confirmada em teste ao vivo):** a API key do Resend está ativa e funcionando, mas a conta ainda não tem domínio verificado. Sem domínio verificado, o remetente sandbox (`onboarding@resend.dev`) só pode enviar pro e-mail dono da conta Resend (`soares200699@gmail.com`), não pra `merovidigital@gmail.com`. Ou seja: hoje, submissões reais do formulário **não chegam** em merovidigital@gmail.com — precisa verificar um domínio em resend.com/domains e trocar `REQUEST_FORM_FROM_EMAIL` pra um endereço desse domínio antes de ir pra produção.

## Product Principles

1. Confiança em primeiro lugar: cada elemento deve reduzir o receio de um comprador não-técnico em contratar um fornecedor desconhecido.
2. Conversão acima de informação: o teste de existência de qualquer seção/CTA é se ele move o visitante rumo ao contato, não se ele explica a empresa.
3. Restrição premium: monocromático, minimalista, tecnológico — nunca parecer agência de marketing genérica ou freelancer barato.
4. Vender transformação antes de características: liderar com o resultado (mais clientes, mais autoridade) antes de detalhes técnicos.
5. Credibilidade pelo craft: o comprador julga a confiabilidade pela qualidade visual — a barra de execução é Apple/Vercel/Linear/Stripe, não "site de agência".
