import type { NextConfig } from "next";

// ATENÇÃO: o deploy (.github/workflows/deploy.yml) leva só .next, public,
// node_modules, package*.json e este arquivo para a VPS, e o `next start`
// recarrega este arquivo lá. Não importe nada do projeto (lib/, components/)
// aqui, ou o servidor não sobe em produção.

/** Cabeçalhos de segurança estáticos. A CSP, que depende do nonce, fica no proxy.ts. */
export const securityHeaders: { key: string; value: string }[] = [
  // 2 anos. Sem "preload" de propósito: ver A-DECIDIR.md.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "usb=()",
      "browsing-topics=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Sem otimizador sob demanda (/_next/image): as imagens já saem prontas do
  // scripts/optimize-images.mjs. Menos superfície de ataque (ver design D3).
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BUILD_SHA: (process.env.GITHUB_SHA ?? "local").slice(0, 7),
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
