import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { SITE_URL } from "@/lib/site";
import { CONTACT } from "@/lib/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Merovi — tecnologia digital premium para o seu negócio",
    template: "%s — Merovi",
  },
  description:
    "A Merovi cria sites institucionais e landing pages de alta conversão, com gestão de Google Ads e Google Meu Negócio, para empresas que querem ser encontradas, e escolhidas, no Google.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Merovi",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Merovi",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    "A Merovi cria sites institucionais e landing pages de alta conversão, com gestão de Google Ads e Google Meu Negócio, para empresas que querem ser encontradas, e escolhidas, no Google.",
  email: CONTACT.email,
  sameAs: [CONTACT.instagramHref],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT.whatsappHref.replace("https://wa.me/", "+"),
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: ["Portuguese"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        <MotionConfig reducedMotion="user">
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
