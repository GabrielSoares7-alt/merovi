export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Path to a real photo, when one exists. Falls back to an initials avatar. */
  photo?: string;
  photoWidth?: number;
  photoHeight?: number;
};

/**
 * Today this has one entry — Merovi is a single-person operation. The page
 * that renders this (components/sections/Team.tsx) is built to lay out any
 * number of members, so growing this array is the entire migration path to
 * a "Nossa Equipe" page later; no component rewrite needed.
 */
export const TEAM: TeamMember[] = [
  {
    id: "gabriel-soares",
    name: "Gabriel Soares",
    role: "Fundador da Merovi",
    bio: "Há anos criando sites, escrevendo copy e desenhando estratégias digitais para negócios que precisam ser encontrados, e escolhidos, online. A Merovi nasce dessa experiência: aplicar o mesmo padrão técnico e de design de produtos digitais de referência em projetos de empresas que, até hoje, só tinham acesso a soluções genéricas.",
    photo: "/team/gabriel-soares.jpg",
    photoWidth: 800,
    photoHeight: 1065,
  },
];
