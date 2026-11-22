import { NextResponse, type NextRequest } from "next/server";
import { buildCsp, createNonce } from "@/lib/security/csp";

// Roda antes de cada página: gera um nonce novo e manda a CSP com ele.
// O Next lê o nonce do cabeçalho da requisição e o aplica nos próprios scripts.
export function proxy(request: NextRequest) {
  // O otimizador de imagens fica desligado (images.unoptimized); aqui ele
  // também não responde, para não sobrar nenhum endpoint dele exposto.
  if (request.nextUrl.pathname.startsWith("/_next/image")) {
    return new NextResponse("Not found", { status: 404, headers: { "content-type": "text/plain" } });
  }

  const nonce = createNonce();
  const csp = buildCsp({ nonce, dev: process.env.NODE_ENV === "development" });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Arquivos estáticos e imagens não precisam de nonce.
      source: "/((?!_next/static|img/|favicon.ico|icon.png|apple-icon.png).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
