import { expect, test } from "@playwright/test";

test.describe("SEO e compartilhamento", () => {
  test("JSON-LD Person com apelido e certificações", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw ?? "{}");
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Caio André");
    expect(data.alternateName).toContain("Caio Andres");
    const creds = (data.hasCredential as { name: string }[]).map((c) => c.name);
    expect(creds.some((n) => /Developer/.test(n))).toBe(true);
  });

  test("metadados de título, descrição, canonical e Open Graph", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Caio André \(Caio Andres\)/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Caio Andres/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://caioandres.dev");
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /opengraph-image/);
    await expect(page.locator('html')).toHaveAttribute("lang", "pt-BR");
  });

  test("imagem de Open Graph é um PNG 1200x630", async ({ request }) => {
    const res = await request.get("/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
    const png = await res.body();
    // Largura e altura ficam no chunk IHDR, nos bytes 16 a 23.
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  test("sitemap e robots apontam para o domínio certo", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("<loc>https://caioandres.dev</loc>");
    expect(sitemap).toContain("<loc>https://caioandres.dev/comunidade</loc>");
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://caioandres.dev/sitemap.xml");
  });

  test("manifest com ícones que existem", async ({ request }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.icons.length).toBeGreaterThan(0);
    for (const icon of manifest.icons as { src: string }[]) {
      const res = await request.get(icon.src);
      expect(res.status(), icon.src).toBe(200);
    }
  });

  test("/comunidade compartilha com imagem e título próprios", async ({ page }) => {
    await page.goto("/comunidade");
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /opengraph-image/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Servidor dos Programadores/);
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Caio André");
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", /Servidor dos Programadores/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://caioandres.dev/comunidade");
  });

  test("a 404 não é indexada", async ({ page }) => {
    await page.goto("/nada-aqui");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});
