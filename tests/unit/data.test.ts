import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { certifications } from "@/lib/data/certifications";
import { communityRoles, formatMonth, formatPeriod, jobs } from "@/lib/data/experience";
import { meetups, partners } from "@/lib/data/community";
import { heroCards, now, nowUpdatedAt } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { socials } from "@/lib/site";

const publicFile = (p: string) => path.join(process.cwd(), "public", p);

function collectUrls(): string[] {
  return [
    ...socials.map((s) => s.url),
    ...certifications.map((c) => c.verifyUrl),
    ...projects.flatMap((p) => p.links.map((l) => l.url)),
    ...partners.flatMap((p) => (p.url ? [p.url] : [])),
    ...communityRoles.flatMap((r) => (r.external && r.href ? [r.href] : [])),
  ];
}

describe("links externos", () => {
  it("são todos https e sem credenciais na URL", () => {
    for (const raw of collectUrls()) {
      const url = new URL(raw);
      expect(url.protocol, raw).toBe("https:");
      expect(url.username + url.password, raw).toBe("");
    }
  });
});

describe("imagens referenciadas existem em public/", () => {
  const images = [
    ...certifications.map((c) => c.image),
    ...meetups.flatMap((m) => [m.venueLogo, ...m.photos.map((p) => p.src)]),
    ...partners.map((p) => p.logo),
    ...heroCards.map((c) => c.bgClass.match(/url\((.+?)\)/)?.[1] ?? "faltando"),
    "/img/caio/caio.webp",
    "/img/brand/cat.webp",
    "/img/brand/icon-192.png",
    "/img/brand/icon-512.png",
  ];

  it.each(images)("%s", (src) => {
    expect(src.startsWith("/"), "caminho deve ser absoluto no site").toBe(true);
    expect(existsSync(publicFile(src)), `arquivo ausente: public${src}`).toBe(true);
  });

  it("toda foto de meetup tem texto alternativo", () => {
    for (const m of meetups) for (const p of m.photos) expect(p.alt.length).toBeGreaterThan(15);
  });
});

describe("ids únicos", () => {
  it.each([
    ["projetos", projects.map((p) => p.id)],
    ["experiências", jobs.map((j) => j.id)],
    ["comunidade", communityRoles.map((r) => r.id)],
    ["certificações", certifications.map((c) => c.id)],
    ["meetups", meetups.map((m) => m.id)],
    ["parceiros", partners.map((p) => p.id)],
  ])("%s", (_, ids) => {
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("experiência", () => {
  it("está em ordem cronológica reversa e só a primeira é atual", () => {
    const starts = jobs.map((j) => j.start);
    expect([...starts].sort().reverse()).toEqual(starts);
    expect(jobs[0].end).toBeUndefined();
    expect(jobs[0].company).toBe("Itaú Unibanco");
  });

  it("tem fim depois do início", () => {
    for (const j of jobs) if (j.end) expect(j.end >= j.start, j.id).toBe(true);
  });

  it("formata meses e períodos", () => {
    expect(formatMonth("2026-03")).toBe("mar/2026");
    expect(formatPeriod("2025-06", "2026-02")).toBe("jun/2025 – fev/2026");
    expect(formatPeriod("2026-03")).toBe("mar/2026 – atual");
    expect(() => formatMonth("2026-13")).toThrow();
  });
});

describe("certificações", () => {
  it("a Developer Associate vem primeiro e é a mais recente", () => {
    expect(certifications[0].id).toBe("aws-developer-associate");
    expect(certifications.filter((c) => c.latest)).toHaveLength(1);
    expect(certifications[0].verifyUrl).toBe("https://www.credly.com/badges/7703c9c1-d0ec-438f-8eb0-9e39c62795d1");
  });
});

describe("projetos", () => {
  it("tem exatamente um destaque", () => {
    expect(projects.filter((p) => p.featured)).toHaveLength(1);
  });

  it("repositórios têm formato dono/nome e fallback de estrelas", () => {
    for (const p of projects.filter((x) => x.repo)) {
      expect(p.repo).toMatch(/^[\w.-]+\/[\w.-]+$/);
      expect(typeof p.stars).toBe("number");
    }
  });
});

describe("seção agora", () => {
  it("tem ao menos 3 itens e data válida", () => {
    expect(now.length).toBeGreaterThanOrEqual(3);
    expect(nowUpdatedAt).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
  });
});
