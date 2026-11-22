import { expect, test } from "@playwright/test";

test.describe("comunidade", () => {
  test("apresenta o Servidor dos Programadores com convite do Discord", async ({ page }) => {
    await page.goto("/comunidade");
    await expect(page.getByRole("heading", { level: 1, name: "Servidor dos Programadores" })).toBeVisible();
    const invite = page.getByRole("link", { name: /Entrar no Discord/ }).first();
    await expect(invite).toHaveAttribute("href", /^https:\/\/discord\.(gg|com)\//);
    await expect(invite).toHaveAttribute("rel", /noopener/);
  });

  test("a galeria só muda quando a pessoa pede (sem autoplay)", async ({ page }) => {
    await page.goto("/comunidade#meetups");
    const gallery = page.locator('[aria-roledescription="galeria"]').first();
    const counter = gallery.locator("[aria-live]");
    await expect(counter).toHaveText(/^1 de \d+$/);
    await page.waitForTimeout(3000);
    await expect(counter).toHaveText(/^1 de \d+$/);

    await gallery.getByRole("button", { name: "Próxima foto" }).click();
    await expect(counter).toHaveText(/^2 de \d+$/);
    await expect(gallery.locator("img:not([hidden])")).toHaveCount(1);

    await gallery.getByRole("button", { name: "Foto anterior" }).click();
    await gallery.getByRole("button", { name: "Foto anterior" }).click();
    await expect(counter).toHaveText(/^(\d+) de \1$/);
  });

  test("todas as fotos dos meetups têm texto alternativo", async ({ page }) => {
    await page.goto("/comunidade");
    const alts = await page.locator('[aria-roledescription="galeria"] img').evaluateAll((imgs) =>
      imgs.map((img) => img.getAttribute("alt") ?? ""),
    );
    expect(alts.length).toBeGreaterThan(0);
    for (const alt of alts) expect(alt.trim().length).toBeGreaterThan(10);
  });

  test("parceiro sem site não ganha link quebrado", async ({ page }) => {
    await page.goto("/comunidade");
    await expect(page.locator("[data-partner=websec] a")).toHaveCount(0);
    for (const id of ["alura", "shard-cloud"]) {
      await expect(page.locator(`[data-partner=${id}] a`)).toHaveAttribute("href", /^https:\/\//);
    }
  });
});

test.describe("404", () => {
  test("rota inexistente responde 404 com a página própria", async ({ page }) => {
    const res = await page.goto("/essa-rota-nao-existe");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Essa rota não passou no code review.");
    await expect(page.getByRole("link", { name: "Voltar para o início" })).toHaveAttribute("href", "/");
  });
});
