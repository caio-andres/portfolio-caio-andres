import "server-only";

// Busca as estrelas dos repositórios no servidor (nunca no navegador: CSP e
// privacidade). Cache de 24h pelo fetch do Next; se a API falhar, demorar ou
// estourar o limite, cai no valor estático do lib/data/projects.ts.

const TIMEOUT_MS = 2500;
const ONE_DAY = 60 * 60 * 24;

type Fetcher = (input: string, init?: RequestInit & { next?: { revalidate?: number } }) => Promise<Response>;

export async function fetchStars(repo: string, fallback: number, fetcher: Fetcher = fetch): Promise<number> {
  if (process.env.GITHUB_STARS_OFFLINE === "1") return fallback;
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) return fallback;

  try {
    const res = await fetcher(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: ONE_DAY },
    });
    if (!res.ok) return fallback;
    const body: unknown = await res.json();
    const stars = (body as { stargazers_count?: unknown }).stargazers_count;
    return typeof stars === "number" && Number.isFinite(stars) && stars >= 0 ? stars : fallback;
  } catch {
    return fallback;
  }
}

/** Mapa id do projeto -> estrelas, para os projetos que têm repositório. */
export async function fetchAllStars(
  items: { id: string; repo?: string; stars?: number }[],
  fetcher?: Fetcher,
): Promise<Record<string, number>> {
  const withRepo = items.filter((p): p is { id: string; repo: string; stars?: number } => Boolean(p.repo));
  const results = await Promise.all(withRepo.map((p) => fetchStars(p.repo, p.stars ?? 0, fetcher)));
  return Object.fromEntries(withRepo.map((p, i) => [p.id, results[i]]));
}
