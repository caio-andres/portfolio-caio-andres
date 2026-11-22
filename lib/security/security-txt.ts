import { SITE_URL, person } from "@/lib/site";

// RFC 9116. A data de expiração é fixa de propósito: um teste avisa quando
// faltar pouco para vencer, e alguém (humano) revisa o contato antes de renovar.
export const SECURITY_TXT_EXPIRES = "2027-11-22T00:00:00.000Z";

export function buildSecurityTxt(): string {
  return [
    `Contact: mailto:${person.email}`,
    `Expires: ${SECURITY_TXT_EXPIRES}`,
    "Preferred-Languages: pt, en",
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    "",
    "# Achou algo? Me manda um e-mail com os passos para reproduzir.",
    "# Este site não tem login, formulário, cookies nem banco de dados,",
    "# mas cabeçalhos, CSP e dependências também contam.",
    "",
  ].join("\n");
}
