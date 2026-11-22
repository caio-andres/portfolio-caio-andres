import type { Page } from "@playwright/test";

declare global {
  interface Window {
    __cspViolations?: string[];
  }
}

/**
 * Registra, antes de qualquer script da página, toda violação de CSP. Assim o
 * teste pega até bloqueio que acontece durante a hidratação.
 */
export async function trackCspViolations(page: Page) {
  const consoleViolations: string[] = [];
  page.on("console", (msg) => {
    if (/Content Security Policy/i.test(msg.text())) consoleViolations.push(msg.text());
  });
  await page.addInitScript(() => {
    window.__cspViolations = [];
    document.addEventListener("securitypolicyviolation", (e) => {
      window.__cspViolations!.push(`${e.violatedDirective} → ${e.blockedURI}`);
    });
  });
  return async () => [...consoleViolations, ...((await page.evaluate(() => window.__cspViolations ?? [])) as string[])];
}

/** Abre a home numa aba específica e espera a hidratação. */
export async function openTab(page: Page, tab: string) {
  await page.goto(`/#${tab}`);
  await page.locator(`#panel-${tab}`).waitFor({ state: "visible" });
}
