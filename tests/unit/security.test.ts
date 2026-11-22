import { describe, expect, it } from "vitest";
import { buildCsp, createNonce } from "@/lib/security/csp";
import { securityHeaders } from "@/next.config";
import { SECURITY_TXT_EXPIRES, buildSecurityTxt } from "@/lib/security/security-txt";

const directive = (csp: string, name: string) =>
  csp
    .split(";")
    .map((d) => d.trim())
    .find((d) => d.startsWith(`${name} `) || d === name);

describe("CSP", () => {
  const prod = buildCsp({ nonce: "abc123", dev: false });

  it("usa nonce e strict-dynamic em script-src, sem unsafe-*", () => {
    const scripts = directive(prod, "script-src");
    expect(scripts).toContain("'nonce-abc123'");
    expect(scripts).toContain("'strict-dynamic'");
    expect(prod).not.toContain("unsafe-eval");
    expect(prod).not.toContain("unsafe-inline");
  });

  it("bloqueia plugins, iframes de terceiros e ser embutido", () => {
    expect(directive(prod, "object-src")).toBe("object-src 'none'");
    expect(directive(prod, "frame-ancestors")).toBe("frame-ancestors 'none'");
    expect(directive(prod, "base-uri")).toBe("base-uri 'self'");
    expect(directive(prod, "form-action")).toBe("form-action 'self'");
    expect(directive(prod, "upgrade-insecure-requests")).toBeDefined();
  });

  it("não libera nenhuma origem de terceiros", () => {
    expect(prod).not.toMatch(/https?:\/\//);
  });

  it("relaxa só o necessário em desenvolvimento", () => {
    const dev = buildCsp({ nonce: "x", dev: true });
    expect(directive(dev, "script-src")).toContain("'unsafe-eval'");
    expect(directive(dev, "upgrade-insecure-requests")).toBeUndefined();
  });

  it("gera nonces diferentes com 128 bits", () => {
    const a = createNonce();
    const b = createNonce();
    expect(a).not.toBe(b);
    expect(atob(a)).toHaveLength(16);
  });
});

describe("cabeçalhos estáticos", () => {
  const get = (k: string) => securityHeaders.find((h) => h.key === k)?.value;

  it("tem HSTS de pelo menos 1 ano com subdomínios", () => {
    const hsts = get("Strict-Transport-Security") ?? "";
    const maxAge = Number(hsts.match(/max-age=(\d+)/)?.[1]);
    expect(maxAge).toBeGreaterThanOrEqual(31536000);
    expect(hsts).toContain("includeSubDomains");
  });

  it("tem os demais cabeçalhos com valores seguros", () => {
    expect(get("X-Content-Type-Options")).toBe("nosniff");
    expect(get("X-Frame-Options")).toBe("DENY");
    expect(get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(get("Cross-Origin-Opener-Policy")).toBe("same-origin");
    for (const feature of ["camera", "microphone", "geolocation"]) {
      expect(get("Permissions-Policy")).toContain(`${feature}=()`);
    }
  });
});

describe("security.txt", () => {
  const txt = buildSecurityTxt();

  it("tem os campos obrigatórios da RFC 9116", () => {
    expect(txt).toMatch(/^Contact: mailto:\S+@\S+$/m);
    expect(txt).toMatch(/^Expires: \d{4}-\d{2}-\d{2}T/m);
    expect(txt).toMatch(/^Canonical: https:\/\/caioandres\.dev\/\.well-known\/security\.txt$/m);
  });

  // A folga de 30 dias é checada no E2E (só no CI dos PRs), para que o vencimento
  // nunca trave um deploy urgente: os testes unitários também rodam no deploy.
  it("não passa de 1 ano no futuro (recomendação da RFC)", () => {
    const daysLeft = (Date.parse(SECURITY_TXT_EXPIRES) - Date.now()) / 86_400_000;
    expect(daysLeft).toBeLessThanOrEqual(366);
  });
});
