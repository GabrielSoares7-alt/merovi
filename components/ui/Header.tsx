"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="flex h-4 w-5 flex-col justify-between">
      <motion.span
        className="h-[1.5px] w-full origin-center bg-foreground"
        animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.span
        className="h-[1.5px] w-full bg-foreground"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="h-[1.5px] w-full origin-center bg-foreground"
        animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Merovi — página inicial" className="shrink-0">
          <Logo priority className="h-8" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={PRIMARY_CTA.href} variant="primary" className="px-5 py-2.5 text-sm">
            {PRIMARY_CTA.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 md:hidden"
        >
          <MenuGlyph open={menuOpen} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Menu principal"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-background md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href={PRIMARY_CTA.href}
                variant="primary"
                className="mt-2 w-full"
                onClick={() => setMenuOpen(false)}
              >
                {PRIMARY_CTA.label}
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
