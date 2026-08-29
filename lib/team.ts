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
 * Renders as a stack of founder-spotlight cards (components/sections/Team.tsx);
 * growing this array is the entire migration path to a future "Nossa Equipe"
 * page, no component rewrite needed.
 */
export const TEAM: TeamMember[] = [
  {
    id: "gabriel-soares",
    name: "Gabriel Soares",
    role: "Fundador da Merovi · Administração, UERJ",
    bio: "Há anos criando sites, escrevendo copy e desenhando estratégias digitais para negócios que precisam ser encontrados, e escolhidos, online. A Merovi nasce dessa experiência: aplicar o mesmo padrão técnico e de design de produtos digitais de referência em projetos de empresas que, até hoje, só tinham acesso a soluções genéricas.",
    photo: "/team/gabriel-soares.jpg",
    photoWidth: 800,
    photoHeight: 1065,
  },
  {
    id: "joao-pedro",
    name: "João Pedro",
    role: "Co-fundador da Merovi · Economia, UFRJ",
    bio: "Sempre fui movido pela lógica por trás das decisões que funcionam: entender o que gera resultado, o que é ruído, e onde vale investir. Na Merovi, esse olhar analítico se traduz em estratégia e números, garantindo que cada projeto não seja só bonito, mas que entregue o que o negócio do cliente realmente precisa para crescer.",
    photo: "/team/joao-pedro.jpg",
    photoWidth: 1086,
    photoHeight: 1448,
  },
];
