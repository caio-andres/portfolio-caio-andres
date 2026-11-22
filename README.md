# caioandres.dev 😼

Meu portfólio: quem eu sou, o que faço no trabalho e na comunidade, e os projetos que dá para mostrar.

> https://caioandres.dev

## O que tem aqui

- **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS 4**
- Conteúdo todo em `lib/data/`, separado dos componentes
- Abas com estado na URL (`/#projects`), paleta de comandos (`Ctrl+K` / `⌘K`) e página da comunidade
- Funciona sem animação para quem prefere movimento reduzido, e passa no axe (WCAG 2.2 AA)

## Segurança

O site não usa cookies nem carrega nada de terceiros no navegador. Tem CSP com nonce por requisição, HSTS e o resto dos cabeçalhos de proteção, `security.txt`, CodeQL, Dependabot e `npm audit` no CI. Achou uma falha? Veja o [SECURITY.md](./SECURITY.md).

## Rodar local

```bash
npm ci
npm run dev
```

Testes:

```bash
npm run check      # lint, tipos, unitários e build
npm run test:e2e   # Playwright (depois do build)
```

Mais detalhes de estrutura e regras do projeto no [AGENTS.md](./AGENTS.md).

## Deploy

Push na `main` → GitHub Actions faz build, testa e publica na VPS ([.github/workflows](./.github/workflows)).
