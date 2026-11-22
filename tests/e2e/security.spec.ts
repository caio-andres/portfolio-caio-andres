import { expect, test } from "@playwright/test";
import { trackCspViolations } from "./helpers";

const PAGES = ["/", "/comunidade", "/rota-que-nao-existe"];

test.describe("cabeçalhos de segurança", () => {
  for (const path of PAGES) {
    test(`${path} manda CSP com nonce e os cabeçalhos de proteção`, async ({ request }) => {
      const res = await request.get(path);
      const h = res.headers();
      const csp = h["content-security-policy"];
      expect(csp).toMatch(/script-src 'self' 'nonce-[A-Za-z0-9+/=]{16,}' 'strict-dynamic'/);
      expect(csp).toContain("object-src 'none'");
      expect(csp).toContain("frame-ancestors 'none'");
      expect(csp).toContain("base-uri 'self'");
      expect(csp).not.toContain("unsafe-inline");
      expect(csp).not.toContain("unsafe-eval");
      expect(h["strict-transport-security"]).toContain("max-age=63072000");
      expect(h["x-content-type-options"]).toBe("nosniff");
      expect(h["x-frame-options"]).toBe("DENY");
      expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(h["permissions-policy"]).toContain("camera=()");
      expect(h["cross-origin-opener-policy"]).toBe("same-origin");
      expect(h["x-powered-by"]).toBeUndefined();
      expect(h["set-cookie"]).toBeUndefined();
    });
  }

  test("o nonce muda a cada requisição e vai em todos os scripts", async ({ request }) => {
    const nonceOf = (csp: string) => /'nonce-([^']+)'/.exec(csp)?.[1];
    const a = await request.get("/");
    const b = await request.get("/");
    const nonceA = nonceOf(a.headers()["content-security-policy"]);
    const nonceB = nonceOf(b.headers()["content-security-policy"]);
    expect(nonceA).toBeTruthy();
    expect(nonceA).not.toBe(nonceB);

    const html = await a.text();
    // "i": a checagem também pega <SCRIPT> em maiúsculas (CodeQL js/bad-tag-filter).
    const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map((m) => m[0]);
    expect(scripts.length).toBeGreaterThan(0);
    for (const tag of scripts) expect(tag, tag).toContain(`nonce="${nonceA}"`);
  });

  test("o otimizador de imagens sob demanda não existe", async ({ request }) => {
    const res = await request.get("/_next/image?url=%2Fimg%2Fcaio%2Fcaio.webp&w=64&q=75");
    expect(res.status()).toBe(404);
  });
});

test.describe("no navegador", () => {
  for (const path of ["/", "/comunidade"]) {
    test(`${path} não viola a CSP e só fala com o próprio domínio`, async ({ page, baseURL }) => {
      const violations = await trackCspViolations(page);
      const foreign: string[] = [];
      page.on("request", (req) => {
        const url = req.url();
        if (url.startsWith("data:") || url.startsWith("blob:")) return;
        if (new URL(url).origin !== new URL(baseURL!).origin) foreign.push(url);
      });

      await page.goto(path);
      await page.waitForLoadState("networkidle");
      // Interage um pouco para carregar o que é preguiçoso (abas, paleta).
      if (path === "/") {
        await page.getByRole("tab", { name: /projects/ }).click();
        await page.keyboard.press("Control+k");
        await page.keyboard.press("Escape");
      }
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForLoadState("networkidle");

      expect(await violations()).toEqual([]);
      expect(foreign).toEqual([]);
      expect(await page.context().cookies()).toEqual([]);
    });
  }

  test("todo link que abre nova aba usa noopener e noreferrer", async ({ page }) => {
    for (const path of ["/", "/comunidade"]) {
      await page.goto(path);
      const rels = await page.locator('a[target="_blank"]').evaluateAll((as) => as.map((a) => [a.getAttribute("href"), a.getAttribute("rel")]));
      expect(rels.length).toBeGreaterThan(0);
      for (const [href, rel] of rels) {
        expect(rel, String(href)).toContain("noopener");
        expect(rel, String(href)).toContain("noreferrer");
        expect(href, String(href)).toMatch(/^https:\/\//);
      }
    }
  });
});

test.describe("security.txt", () => {
  test("segue a RFC 9116 e está dentro da validade", async ({ request }) => {
    const res = await request.get("/.well-known/security.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toMatch(/^Contact: mailto:/m);
    expect(body).toMatch(/^Canonical: https:\/\/caioandres\.dev\/\.well-known\/security\.txt$/m);
    const expires = /^Expires: (.+)$/m.exec(body)?.[1];
    expect(expires).toBeTruthy();
    const daysLeft = (new Date(expires!).getTime() - Date.now()) / 86_400_000;
    expect(daysLeft, "renove SECURITY_TXT_EXPIRES em lib/security/security-txt.ts").toBeGreaterThan(30);
  });
});
