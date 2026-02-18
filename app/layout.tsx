import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Caio André [Portfólio]",
  description:
    "Portfólio de Caio André Porto de Oliveira - Engenheiro de Software no Itaú Unibanco, Embaixador da Alura e Fundador do Servidor dos Programadores",
  keywords: [
    "Caio André",
    "Engenheiro de Software",
    "Portfolio",
    "AWS",
    "Python",
    "GenAI",
    "Full Stack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
