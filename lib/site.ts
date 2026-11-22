// Constantes do site. Tudo aqui é público (já aparece no site e no GitHub).

export const SITE_URL = "https://caioandres.dev";

export const person = {
  name: "Caio André",
  fullName: "Caio André Porto de Oliveira",
  alternateName: "Caio Andres",
  handle: "caio_andres",
  role: "Engenheiro de Software",
  company: "Itaú Unibanco",
  city: "São Paulo, SP",
  email: "caioandres2112@gmail.com",
} as const;

export type SocialId = "github" | "linkedin" | "youtube" | "instagram" | "tiktok" | "discord";

export type Social = {
  id: SocialId;
  label: string;
  handle: string;
  url: string;
};

export const socials: Social[] = [
  { id: "github", label: "GitHub", handle: "caio-andres", url: "https://github.com/caio-andres" },
  { id: "linkedin", label: "LinkedIn", handle: "in/caio-andres", url: "https://www.linkedin.com/in/caio-andres/" },
  { id: "youtube", label: "YouTube", handle: "@caio_andress", url: "https://www.youtube.com/@caio_andress" },
  { id: "instagram", label: "Instagram", handle: "@caio_andress", url: "https://www.instagram.com/caio_andress" },
  { id: "tiktok", label: "TikTok", handle: "@caio_andres", url: "https://www.tiktok.com/@caio_andres" },
  { id: "discord", label: "Discord", handle: "caio_andres", url: "https://discord.com/users/caio_andres" },
];

export const DISCORD_INVITE = "https://discord.gg/programador";

export const REPO_URL = "https://github.com/caio-andres/portfolio-caio-andres";

export function social(id: SocialId): Social {
  const found = socials.find((s) => s.id === id);
  if (!found) throw new Error(`social desconhecida: ${id}`);
  return found;
}

// Preenchido no build pelo CI (GITHUB_SHA); "local" em desenvolvimento.
export const BUILD_SHA = process.env.NEXT_PUBLIC_BUILD_SHA ?? "local";
