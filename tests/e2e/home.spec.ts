import { expect, test } from "@playwright/test";
import { openTab } from "./helpers";

test.describe("hero", () => {
  test("mostra o nome, o apelido e a foto", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Caio André" })).toBeVisible();
    await expect(page.locator("section[aria-labelledby=hero-name] dl")).toContainText("Caio Andres");
    const photo = page.locator('img[src="/img/caio/caio.webp"]');
    await expect(photo).toBeVisible();
    expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  });

  test("o nome já vem completo no HTML do servidor", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain('aria-label="Caio André"');
    expect(html).toContain("Caio Andres");
  });

  test("com movimento reduzido o nome aparece sem animação", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const letters = page.locator("#hero-name .type-in > span");
    await expect(letters.first()).toBeVisible();
    const state = await letters.evaluateAll((els) =>
      els.map((el) => ({ opacity: getComputedStyle(el).opacity, animation: getComputedStyle(el).animationName })),
    );
    for (const s of state) {
      expect(s.opacity).toBe("1");
      expect(s.animation).toBe("none");
    }
    await context.close();
  });
});

test.describe("abas", () => {
  test("clicar troca o painel e grava no hash", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#panel-about")).toBeVisible();
    await page.getByRole("tab", { name: /experience/ }).click();
    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator("#panel-experience")).toBeVisible();
    await expect(page.locator("#panel-about")).toBeHidden();
  });

  test("voltar no navegador volta para a aba anterior", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: /projects/ }).click();
    await page.getByRole("tab", { name: /contact/ }).click();
    await expect(page.locator("#panel-contact")).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("#panel-projects")).toBeVisible();
  });

  test("link direto abre a aba certa", async ({ page }) => {
    await openTab(page, "contact");
    await expect(page.getByRole("tab", { name: /contact/ })).toHaveAttribute("aria-selected", "true");
  });

  test("setas do teclado navegam entre as abas", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("tab", { name: /about/ }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: /experience/ })).toBeFocused();
    await expect(page.locator("#panel-experience")).toBeVisible();
    await page.keyboard.press("End");
    await expect(page.getByRole("tab", { name: /contact/ })).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: /about/ })).toBeFocused();
  });

  test("todos os painéis estão no HTML (conteúdo indexável)", async ({ request }) => {
    const html = await (await request.get("/")).text();
    for (const text of ["Sobre mim", "Experiência", "Projetos", "Bora conversar?", "AWS Certified Developer"]) {
      expect(html).toContain(text);
    }
  });
});

test.describe("sobre", () => {
  test("badge da AWS Certified Developer – Associate com link de verificação", async ({ page }) => {
    await page.goto("/");
    const card = page.locator('[data-cert="aws-developer-associate"]');
    await expect(card).toContainText("mais recente");
    const badge = card.locator("img");
    await expect(badge).toHaveAttribute("src", "/img/certs/aws-developer-associate.webp");
    expect(await badge.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const link = card.getByRole("link", { name: /verificar no Credly/ });
    await expect(link).toHaveAttribute("href", "https://www.credly.com/badges/7703c9c1-d0ec-438f-8eb0-9e39c62795d1");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  });

  test("a Developer Associate vem antes das outras certificações", async ({ page }) => {
    await page.goto("/");
    const ids = await page.locator("[data-cert]").evaluateAll((els) => els.map((el) => el.getAttribute("data-cert")));
    expect(ids[0]).toBe("aws-developer-associate");
  });
});

test.describe("projetos", () => {
  test("o filtro mostra só a categoria escolhida e anuncia a contagem", async ({ page }) => {
    await openTab(page, "projects");
    const panel = page.locator("#panel-projects");
    const all = await panel.locator("[data-project]").count();
    await panel.getByRole("button", { name: "ia", exact: true }).click();
    await expect(panel.getByRole("button", { name: "ia", exact: true })).toHaveAttribute("aria-pressed", "true");
    const filtered = await panel.locator("[data-project]").count();
    expect(filtered).toBeLessThan(all);
    await expect(panel.locator("[data-project=jflux]")).toBeVisible();
    await expect(panel.locator("[data-project=leetcode-challenge]")).toHaveCount(0);
    await expect(panel.getByRole("status")).toContainText(`${filtered} projeto`);
  });

  test("estrela só aparece a partir de 5", async ({ page }) => {
    await openTab(page, "projects");
    await expect(page.locator("[data-project=leetcode-challenge]")).toContainText("estrelas no GitHub");
    await expect(page.locator("[data-project=portfolio]")).not.toContainText("estrelas no GitHub");
  });
});

test.describe("contato", () => {
  test("copiar e-mail avisa quem usa leitor de tela", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await openTab(page, "contact");
    const panel = page.locator("#panel-contact");
    await panel.getByRole("button", { name: "Copiar e-mail" }).click();
    await expect(panel.getByRole("status")).toHaveText("e-mail copiado");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("caioandres2112@gmail.com");
  });
});

test.describe("paleta de comandos", () => {
  test("Ctrl+K abre, busca e leva para a aba com foco no painel", async ({ page }) => {
    await page.goto("/");
    await page.locator("#hero-name").waitFor();
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "Paleta de comandos" });
    await expect(dialog).toBeVisible();
    await page.getByRole("combobox").fill("contato");
    // "contato" também acha "Copiar e-mail"; a aba vem primeiro e já fica ativa.
    await expect(page.getByRole("option").first()).toHaveText(/Contato/);
    await expect(page.getByRole("option").first()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#panel-contact")).toBeFocused();
  });

  test("Esc fecha e devolve o foco ao botão", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: /buscar/ });
    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("busca sem resultado sugere outro termo", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /buscar/ }).click();
    await page.getByRole("combobox").fill("xyzw");
    await expect(page.getByRole("dialog")).toContainText("Nada com");
  });
});

test.describe("regressões da revisão de código", () => {
  test("o skip link não troca a aba aberta", async ({ page }) => {
    await openTab(page, "projects");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page.locator("#conteudo")).toBeFocused();
    await expect(page.locator("#panel-projects")).toBeVisible();
    await expect(page.locator("#panel-about")).toBeHidden();
  });

  test("Ver projetos funciona mesmo com #projects já na URL", async ({ page }) => {
    await openTab(page, "projects");
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("link", { name: "Ver projetos" }).click();
    await expect(page.locator("#panel-projects")).toBeFocused();
    await expect.poll(() => page.getByRole("tablist").evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeLessThanOrEqual(1);
  });

  test("o rodapé mostra o ano atual", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("contentinfo")).toContainText("© " + new Date().getFullYear() + " Caio André");
  });
});

test.describe("navegação por teclado", () => {
  test("o primeiro Tab mostra o link para pular para o conteúdo", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("#conteudo")).toBeFocused();
  });
});
