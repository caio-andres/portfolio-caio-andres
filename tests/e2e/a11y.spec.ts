import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { openTab } from "./helpers";

const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function audit(page: import("@playwright/test").Page) {
  const result = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  return result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
}

test.describe("acessibilidade (axe, WCAG 2.2 AA)", () => {
  for (const tab of ["about", "experience", "projects", "contact"]) {
    test(`home, aba ${tab}`, async ({ page }) => {
      await openTab(page, tab);
      expect(await audit(page)).toEqual([]);
    });
  }

  test("paleta de comandos aberta", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /buscar/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(await audit(page)).toEqual([]);
  });

  test("comunidade", async ({ page }) => {
    await page.goto("/comunidade");
    expect(await audit(page)).toEqual([]);
  });

  test("404", async ({ page }) => {
    await page.goto("/nao-existe");
    expect(await audit(page)).toEqual([]);
  });
});

test.describe("celular @mobile", () => {
  for (const path of ["/", "/comunidade", "/#projects"]) {
    test(`${path} não tem rolagem horizontal @mobile`, async ({ page }) => {
      await page.goto(path);
      const { scroll, client } = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(scroll).toBeLessThanOrEqual(client);
    });
  }

  test("as quatro abas cabem na tela @mobile", async ({ page }) => {
    await page.goto("/");
    const fits = await page.getByRole("tablist").evaluate((el) => el.scrollWidth <= el.clientWidth);
    expect(fits).toBe(true);
  });

  test("a primeira tela mostra o nome antes da foto @mobile", async ({ page }) => {
    await page.goto("/");
    const nameTop = await page.locator("#hero-name").evaluate((el) => el.getBoundingClientRect().top);
    const photoTop = await page.locator('img[src="/img/caio/caio.webp"]').evaluate((el) => el.getBoundingClientRect().top);
    expect(nameTop).toBeLessThan(photoTop);
  });
});
