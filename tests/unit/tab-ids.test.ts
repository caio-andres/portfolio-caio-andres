import { describe, expect, it } from "vitest";
import { DEFAULT_TAB, nextActiveTab, parseTabHash } from "@/components/home/tab-ids";

describe("parseTabHash", () => {
  it("reconhece as abas", () => {
    expect(parseTabHash("#projects")).toBe("projects");
    expect(parseTabHash("#contact")).toBe("contact");
  });

  it("devolve null para hash que não é aba (âncora, skip link, lixo)", () => {
    expect(parseTabHash("#conteudo")).toBeNull();
    expect(parseTabHash("#%E0")).toBeNull();
    expect(parseTabHash("#Projects")).toBeNull();
  });
});

describe("nextActiveTab", () => {
  it("sem hash volta para a aba padrão", () => {
    expect(nextActiveTab("", "projects")).toBe(DEFAULT_TAB);
    expect(nextActiveTab("#", "projects")).toBe(DEFAULT_TAB);
  });

  it("hash de aba troca a aba", () => {
    expect(nextActiveTab("#experience", "about")).toBe("experience");
  });

  it("hash que não é aba mantém a aba atual (ex.: o skip link #conteudo)", () => {
    expect(nextActiveTab("#conteudo", "projects")).toBe("projects");
  });
});
