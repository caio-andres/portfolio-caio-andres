import type { Metadata } from "next";
import { certifications } from "@/lib/data/certifications";
import { education } from "@/lib/data/profile";
import { SITE_URL, person, socials } from "@/lib/site";

export const SITE_TITLE = "Caio André (Caio Andres) · Engenheiro de Software";
export const SITE_DESCRIPTION =
  "Caio André, também conhecido como Caio Andres: engenheiro de software no Itaú Unibanco (Python, AWS, Terraform e GenAI), AWS Certified Developer – Associate e fundador do Servidor dos Programadores.";

export const OG_IMAGE_ALT = "Caio André (Caio Andres), engenheiro de software no Itaú Unibanco";
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: OG_IMAGE_ALT };

/**
 * Metadados de uma página interna. O Next não mescla openGraph/twitter com os
 * do layout (o objeto da página substitui o inteiro), então cada página manda
 * o conjunto completo, com imagem.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = title + " · " + person.name;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "pt_BR", siteName: person.name, url: path, title: fullTitle, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

/** schema.org/Person da página inicial. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: person.name,
    alternateName: [person.alternateName, person.fullName],
    url: SITE_URL,
    image: `${SITE_URL}/img/caio/caio-avatar.webp`,
    email: `mailto:${person.email}`,
    jobTitle: person.role,
    worksFor: { "@type": "Organization", name: person.company, url: "https://www.itau.com.br" },
    address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsLanguage: ["pt-BR", "en"],
    knowsAbout: ["Python", "AWS", "Terraform", "Serverless", "GenAI", "RAG", "Engenharia de Software"],
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: c.issuer },
      url: c.verifyUrl,
    })),
    sameAs: socials.filter((s) => s.id !== "discord").map((s) => s.url),
  };
}
