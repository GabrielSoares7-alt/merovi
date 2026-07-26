import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, CONTACT } from "@/lib/nav";

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const LINK_CLASSES =
  "text-sm text-muted transition-colors duration-200 hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo className="h-10" />
          <p className="max-w-xs text-sm text-muted">
            Presença digital premium para empresas que querem ser encontradas,
            e escolhidas.
          </p>
        </div>

        <nav aria-label="Navegação" className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={LINK_CLASSES}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">Contato</h3>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASSES}
          >
            {CONTACT.whatsappDisplay}
          </a>
          <a href={`mailto:${CONTACT.email}`} className={LINK_CLASSES}>
            {CONTACT.email}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">Redes</h3>
          <a
            href={CONTACT.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK_CLASSES} flex items-center gap-2`}
          >
            <InstagramGlyph />
            {CONTACT.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Merovi. Todos os direitos reservados.
      </div>
    </footer>
  );
}
