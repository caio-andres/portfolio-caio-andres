# AGENTS.md — caioandres.dev

Portfólio pessoal do Caio André (também conhecido como Caio Andres). Next.js 16 (App Router), React 19, Tailwind 4, TypeScript. Publicado em https://caioandres.dev numa VPS (PM2) pelo GitHub Actions.

**O repositório é público.** Nada de segredo, dado pessoal sensível ou informação privada em arquivo versionado.

## Rodar

```bash
npm ci
npm run dev            # http://localhost:3000
npm run build && npm start
```

Node >= 20.9 (CI usa 22). Sem variáveis de ambiente obrigatórias. `GITHUB_STARS_OFFLINE=1` desliga a busca de estrelas no GitHub (usada nos testes).

## Testar (rode antes de dizer que terminou)

```bash
npm run check          # lint + typecheck + unitários (Vitest) + build
npm run test:e2e       # Playwright contra o build de produção (rode o build antes)
```

- Unitários em `tests/unit/`: dados, CSP/cabeçalhos, security.txt, `cn()`, deploy.
- E2E em `tests/e2e/`: abas, paleta, cabeçalhos, nonce, CSP sem violação, rede só de mesma origem, SEO, axe WCAG 2.2 AA, mobile (`@mobile`).
- Mudou UI → confira no navegador (desktop e 390px) além dos testes.

## Onde está o quê

| Caminho | O quê |
|---|---|
| `lib/data/*.ts` | **Todo o conteúdo** (perfil, experiência, projetos, certificações, comunidade). Texto se edita aqui. |
| `lib/site.ts` | Nome, e-mail público, redes, URL do site. |
| `app/page.tsx` | Home: Hero, "agora", abas (`components/home/`). |
| `app/comunidade/page.tsx` | Página do Servidor dos Programadores. |
| `components/home/Tabs.tsx` | Abas com estado no hash (`#projects`), padrão ARIA. |
| `components/command/CommandPalette.tsx` | Paleta Ctrl/⌘+K (`<dialog>` nativo). |
| `proxy.ts` + `lib/security/csp.ts` | CSP com nonce por requisição; 404 em `/_next/image`. |
| `next.config.ts` | Cabeçalhos de segurança estáticos. **Autocontido**: o deploy só leva este arquivo, sem `lib/`. |
| `app/.well-known/security.txt/route.ts` | RFC 9116 (`Expires` em `lib/security/security-txt.ts`, renovar antes de vencer). |
| `scripts/optimize-images.mjs` | Gera `public/img/**` a partir de `assets/originals/**` (`npm run images:optimize`). |
| `openspec/` | Specs (fonte da verdade do comportamento) e changes. |
| `A-DECIDIR.md` | Decisões pendentes do dono. |

## Regras que quebram coisas se ignoradas

- **CSP rígida**: sem atributo `style` em JSX, sem `<script>` inline sem nonce, sem recurso de terceiros (fontes via `next/font`, imagens locais). Precisa de cor/fundo variável? Classe Tailwind escrita por extenso (`bg-[url(/img/x.webp)]`), nunca interpolada.
- **Sem `next/image`** (injeta `style` e o otimizador está desligado). Use `<img>` com `width`/`height` e a imagem já otimizada em `public/img`.
- **Imagem nova**: original em `assets/originals/`, entrada no `scripts/optimize-images.mjs`, rodar `npm run images:optimize`.
- **Páginas são dinâmicas** (o nonce é por requisição): o layout chama `connection()`. Não troque por geração estática.
- **Tamanho de fonte novo** no `@theme`: adicione também em `FONT_SIZE_TOKENS` (`lib/utils.ts`), senão o `cn()` descarta a classe. Um teste avisa.
- **Link externo**: use `ExternalLink` (força `noopener noreferrer`).
- **Movimento**: só CSS, respeitando `prefers-reduced-motion`; nada de autoplay.
- **Texto**: português, primeira pessoa, sincero e sem exagero. Não invente fato (números, cargos, datas): na dúvida, pergunte ou registre em `A-DECIDIR.md`.

## Git e deploy

- **Push na `main` publica em produção** (`.github/workflows/deploy.yml`). Trabalhe em branch e abra PR; o `ci.yml` roda tudo (inclusive E2E e `npm audit`).
- Conventional Commits. Pre-commit roda `gitleaks`: se bloquear, remova o segredo (nunca `--no-verify`).
- Dependabot (npm semanal, actions mensal) e CodeQL semanal.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
