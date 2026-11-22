import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// O deploy leva para a VPS só .next, public, node_modules, package*.json e
// next.config.ts, e o `next start` recarrega o next.config.ts lá. Se ele
// importar algo do projeto, o servidor não sobe em produção.
describe("next.config.ts é autocontido", () => {
  const source = readFileSync("next.config.ts", "utf8");
  const imports = [...source.matchAll(/^\s*import\s[^;]*?from\s+["']([^"']+)["']/gm)].map((m) => m[1]);

  it("só importa pacotes, nunca arquivos do projeto", () => {
    for (const spec of imports) {
      expect(spec.startsWith(".") || spec.startsWith("@/"), `import proibido: ${spec}`).toBe(false);
    }
  });

  it("o workflow de deploy ainda empacota o next.config.ts", () => {
    const workflow = readFileSync(".github/workflows/deploy.yml", "utf8");
    expect(workflow).toContain("next.config.ts");
  });
});
