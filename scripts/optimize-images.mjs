#!/usr/bin/env node
// Gera as imagens servidas pelo site a partir de assets/originals/.
// O site não usa o otimizador sob demanda do Next (/_next/image fica desligado
// por segurança), então tudo que vai para public/ sai daqui já no tamanho final.
//
// Uso: npm run images:optimize   (idempotente: sobrescreve as saídas)

import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/originals";
const OUT = "public";

/**
 * @typedef {{ src: string, out: string, width: number, height?: number,
 *   fit?: "cover" | "contain" | "inside", position?: string,
 *   format?: "webp" | "png", quality?: number, background?: string,
 *   extract?: { left: number, top: number, width: number, height: number } }} Job
 */

/** @type {Job[]} */
const jobs = [
  // Foto do hero: retrato 4:5 (o original é 3:4, vertical).
  { src: "caio/caio.jpg", out: "img/caio/caio.webp", width: 720, height: 900, position: "top" },
  { src: "caio/caio.jpg", out: "img/caio/caio-avatar.webp", width: 320, height: 320, position: "top" },

  // Marca (gato de boné). Ícones do app vão para app/ pelas convenções do Next.
  { src: "identidade-visual/identidade-visual-sem-fundo.png", out: "img/brand/cat.webp", width: 256, height: 256, fit: "contain", background: "#00000000" },
  { src: "identidade-visual/identidade-visual-sem-fundo.png", out: "../app/icon.png", width: 96, height: 96, fit: "contain", format: "png", background: "#00000000" },
  { src: "identidade-visual/identidade-visual-sem-fundo.png", out: "../app/apple-icon.png", width: 180, height: 180, fit: "contain", format: "png", background: "#111021" },
  { src: "identidade-visual/identidade-visual-sem-fundo.png", out: "img/brand/icon-192.png", width: 192, height: 192, fit: "contain", format: "png", background: "#111021" },
  { src: "identidade-visual/identidade-visual-sem-fundo.png", out: "img/brand/icon-512.png", width: 512, height: 512, fit: "contain", format: "png", background: "#111021" },

  // Fundos dos cartões do hero.
  { src: "sdp/community-bg.png", out: "img/sdp/community-bg.webp", width: 1600, height: 900 },
  { src: "sdp/community-bg.png", out: "img/sdp/community-bg-card.webp", width: 640, height: 360 },
  { src: "itau/itau-bg.jpg", out: "img/itau/itau-bg.webp", width: 640, height: 360 },
  { src: "alura/alura.jpg", out: "img/alura/alura-bg.webp", width: 640, height: 260 },

  // Certificações (exibidas em ~96px; 2x para telas densas).
  { src: "certs/aws-developer-associate.png", out: "img/certs/aws-developer-associate.webp", width: 240, height: 240, fit: "contain", background: "#00000000" },
  { src: "certs/aws-cloud-practitioner.png", out: "img/certs/aws-cloud-practitioner.webp", width: 240, height: 240, fit: "contain", background: "#00000000" },
  { src: "certs/aws-academy-cloud-foundations.png", out: "img/certs/aws-academy-cloud-foundations.webp", width: 240, height: 240, fit: "contain", background: "#00000000" },

  // Meetups.
  ...[
    "serena-set-2025/1758071330979.jpeg",
    "serena-set-2025/1758071335555.jpeg",
    "serena-set-2025/1758071336222.jpeg",
    "serena-set-2025/1758071342276.jpeg",
    "oracle-fev-2026/1770565893214.jpeg",
    "oracle-fev-2026/1770565893301.jpeg",
    "oracle-fev-2026/1770565893303.jpeg",
    "oracle-fev-2026/1770565893340.jpeg",
  ].map((f) => ({
    src: `sdp/meetup/${f}`,
    out: `img/sdp/meetup/${f.replace(/\.jpe?g$/, ".webp")}`,
    width: 960,
    height: 640,
    position: "attention",
    // Na foto da fachada (800x1420) o público fica no meio; o "attention" escolheria o prédio.
    ...(f.endsWith("1758071335555.jpeg") && { extract: { left: 0, top: 490, width: 800, height: 533 } }),
  })),
  { src: "sdp/meetup/serena-set-2025/newhack.png", out: "img/sdp/venues/newhack.webp", width: 96, height: 96 },
  { src: "sdp/meetup/oracle-fev-2026/Oracle-Symbol.png", out: "img/sdp/venues/oracle.webp", width: 160, height: 96, fit: "contain", background: "#00000000" },

  // Parceiros.
  { src: "sdp/parceiros/alura.png", out: "img/sdp/partners/alura.webp", width: 128, height: 128 },
  { src: "sdp/parceiros/shard_cloud.png", out: "img/sdp/partners/shard-cloud.webp", width: 128, height: 128, fit: "contain", background: "#00000000" },
  { src: "sdp/parceiros/websec.png", out: "img/sdp/partners/websec.webp", width: 128, height: 128 },
];

for (const job of jobs) {
  const src = path.join(SRC, job.src);
  const out = path.join(OUT, job.out);
  await mkdir(path.dirname(out), { recursive: true });

  let img = sharp(src).rotate(); // aplica orientação EXIF antes de recortar
  if (job.extract) img = sharp(await img.toBuffer()).extract(job.extract);
  img = img.resize({
    width: job.width,
    height: job.height,
    fit: job.fit ?? "cover",
    position: job.position ?? "centre",
    background: job.background ?? "#00000000",
    withoutEnlargement: false,
  });

  // .rotate() + reencode remove metadados (EXIF/GPS) por padrão no sharp.
  img = job.format === "png" ? img.png({ compressionLevel: 9, palette: true, quality: 90 }) : img.webp({ quality: job.quality ?? 78 });

  const info = await img.toFile(out);
  console.log(`${out.split(path.sep).join("/")}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)}KB`);
}
