import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FONT_SIZE_TOKENS, cn } from "@/lib/utils";

describe("cn", () => {
  it("mantém o tamanho de fonte customizado quando vem junto de uma cor", () => {
    // Sem configurar o tailwind-merge, "text-meta" era lido como cor e
    // sumia ao lado de "text-faint" (bug real: abas grandes demais no celular).
    expect(cn("font-mono text-meta", "text-faint")).toBe("font-mono text-meta text-faint");
    expect(cn("text-small text-muted", "sm:text-lead")).toBe("text-small text-muted sm:text-lead");
  });

  it("ainda resolve conflito entre dois tamanhos", () => {
    expect(cn("text-meta", "text-h1")).toBe("text-h1");
  });

  it("conhece todos os tamanhos definidos no @theme do globals.css", () => {
    const css = readFileSync("app/globals.css", "utf8");
    const defined = [...css.matchAll(/^\s*--text-([a-z0-9]+):/gm)].map((m) => m[1]);
    expect([...FONT_SIZE_TOKENS].sort()).toEqual(defined.sort());
  });
});
