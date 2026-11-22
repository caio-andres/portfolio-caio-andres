import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { connection } from "next/server";
import { ConsoleHello } from "@/components/ConsoleHello";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StripedPattern } from "@/components/magicui/striped-pattern";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { SITE_URL, person } from "@/lib/site";
import "./globals.css";

// next/font baixa as fontes no build e serve do próprio domínio (zero terceiros).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${person.name}` },
  description: SITE_DESCRIPTION,
  applicationName: person.name,
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  keywords: [
    "Caio André",
    "Caio Andres",
    "Caio André Porto de Oliveira",
    "Engenheiro de Software",
    "Itaú Unibanco",
    "AWS Certified Developer Associate",
    "Python",
    "AWS",
    "Terraform",
    "GenAI",
    "Servidor dos Programadores",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: person.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: "Caio",
    lastName: "André",
    username: person.handle,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#111021",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // A CSP usa um nonce por requisição (proxy.ts), então toda página precisa ser
  // renderizada na hora: páginas pré-geradas no build não teriam o nonce.
  await connection();

  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-50 bg-blue-strong px-4 py-3 font-mono text-small text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>

        <StripedPattern className="pointer-events-none fixed inset-0 -z-10 text-blue opacity-[0.05] [mask-image:radial-gradient(ellipse_at_top,white,transparent_70%)]" />

        <SiteHeader />
        <main id="conteudo" tabIndex={-1} className="mx-auto max-w-[1120px] px-5 outline-none md:px-8">
          {children}
        </main>
        <SiteFooter />
        <ConsoleHello />
      </body>
    </html>
  );
}
