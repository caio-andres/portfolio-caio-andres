/**
 * JSON-LD com o nonce da requisição. O conteúdo é estático, mas o "<" é
 * escapado mesmo assim para não existir jeito de fechar a tag por engano.
 */
export function JsonLd({ data, nonce }: { data: object; nonce?: string }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: json }} />;
}
