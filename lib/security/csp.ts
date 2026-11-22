// Content-Security-Policy do site. Função pura para poder ser testada.
// Ver openspec/changes/portfolio-v2/design.md (D2) para o porquê de cada diretiva.

export type CspOptions = { nonce: string; dev: boolean };

export function buildCsp({ nonce, dev }: CspOptions): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    // 'strict-dynamic' faz o navegador confiar só no que foi carregado por um
    // script com o nonce; 'self' fica como fallback para navegadores antigos.
    "script-src": ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", ...(dev ? ["'unsafe-eval'"] : [])],
    // Em dev o overlay de erros do Next injeta estilos inline.
    "style-src": dev ? ["'self'", "'unsafe-inline'"] : ["'self'", `'nonce-${nonce}'`],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": dev ? ["'self'", "ws:", "wss:"] : ["'self'"],
    "media-src": ["'self'"],
    "object-src": ["'none'"],
    "frame-src": ["'none'"],
    "worker-src": ["'self'"],
    "manifest-src": ["'self'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };

  const parts = Object.entries(directives).map(([k, v]) => `${k} ${v.join(" ")}`);
  if (!dev) parts.push("upgrade-insecure-requests");
  return parts.join("; ");
}

/** Nonce de 128 bits em base64, novo a cada requisição. */
export function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
