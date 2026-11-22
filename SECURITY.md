# Segurança

Achou alguma vulnerabilidade no caioandres.dev ou neste repositório? Valeu por olhar com cuidado.

## Como reportar

Por e-mail, no endereço que está em [`/.well-known/security.txt`](https://caioandres.dev/.well-known/security.txt). Mande o que achou, como reproduzir e o impacto que você enxerga. Não abra issue pública antes de eu ter corrigido.

## O que conta

- O site em `caioandres.dev` (cabeçalhos, CSP, rotas, conteúdo servido).
- O código deste repositório e o pipeline de CI/CD.

Fora de escopo: ataques de negação de serviço, engenharia social e relatórios automáticos sem prova de impacto.

## O que já existe

- CSP com nonce por requisição e `strict-dynamic`, sem `unsafe-inline`
- HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP
- Nenhum cookie e nenhum recurso de terceiros carregado no navegador
- Otimizador de imagens sob demanda desligado
- CodeQL, Dependabot, `npm audit` e testes de segurança no CI; `gitleaks` no pre-commit
