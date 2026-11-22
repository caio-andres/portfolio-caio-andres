import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchAllStars, fetchStars } from "@/lib/github";

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }));

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("fetchStars", () => {
  it("usa o valor da API quando ela responde", async () => {
    const fetcher = vi.fn(() => json({ stargazers_count: 412 }));
    await expect(fetchStars("caio-andres/leetcode-challenge", 309, fetcher)).resolves.toBe(412);
    expect(fetcher).toHaveBeenCalledWith(
      "https://api.github.com/repos/caio-andres/leetcode-challenge",
      expect.objectContaining({ next: { revalidate: 86400 } }),
    );
  });

  it("cai no fallback com erro HTTP, rede fora ou resposta estranha", async () => {
    await expect(fetchStars("a/b", 7, () => json({ message: "rate limit" }, 403))).resolves.toBe(7);
    await expect(fetchStars("a/b", 7, () => Promise.reject(new Error("timeout")))).resolves.toBe(7);
    await expect(fetchStars("a/b", 7, () => json({ stargazers_count: "muitas" }))).resolves.toBe(7);
  });

  it("não chama a API com repo malformado nem em modo offline", async () => {
    const fetcher = vi.fn(() => json({ stargazers_count: 1 }));
    await expect(fetchStars("../../etc", 3, fetcher)).resolves.toBe(3);
    vi.stubEnv("GITHUB_STARS_OFFLINE", "1");
    await expect(fetchStars("a/b", 4, fetcher)).resolves.toBe(4);
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe("fetchAllStars", () => {
  it("só consulta projetos com repositório", async () => {
    const fetcher = vi.fn(() => json({ stargazers_count: 10 }));
    const stars = await fetchAllStars(
      [
        { id: "com-repo", repo: "a/b", stars: 1 },
        { id: "sem-repo", stars: 99 },
      ],
      fetcher,
    );
    expect(stars).toEqual({ "com-repo": 10 });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
});
