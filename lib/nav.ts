export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Quem faz seu projeto", href: "/quem-faz-seu-projeto" },
];

export const PRIMARY_CTA: NavLink = {
  label: "Solicitar meu site",
  href: "/solicitar-meu-site",
};

export const CONTACT = {
  whatsappDisplay: "+55 21 99682-8220",
  whatsappHref: "https://wa.me/5521996828220",
  email: "merovidigital@gmail.com",
  instagramHandle: "@merovi.digital",
  instagramHref: "https://www.instagram.com/merovi.digital/",
};
