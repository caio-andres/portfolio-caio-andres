# Tasks

## 1. Fundação: dependências e ferramentas

- [x] 1.1 Atualizar para Next 16.4 / React 19.3 / Tailwind 4 (`@tailwindcss/postcss`), remover `react-type-animation`, `autoprefixer` e `tailwind.config.ts`; verificar com `npm run build` e `npm audit --omit=dev` sem vulnerabilidades altas/críticas
- [x] 1.2 Trocar `next lint` por `eslint .` (flat config com `eslint-config-next`), adicionar scripts `typecheck`, `test`, `test:e2e`, `check` e `engines.node >=20.9`; verificar com `npm run lint` e `npm run typecheck` passando
- [x] 1.3 Configurar Vitest e Playwright (com `@axe-core/playwright`) e verificar que um teste de fumaça de cada um roda

## 2. Conteúdo e assets

- [x] 2.1 Criar `lib/data/` (profile, experience, projects, certifications, community, links) com tipos e conteúdo revisado; verificar com testes unitários de integridade (URLs https, ids únicos, imagens existentes)
- [x] 2.2 Baixar badges das 3 certificações (originais em `assets/originals/certs/`, servidos de `public/img/certs/`) e verificar que são PNG válidos
- [x] 2.3 Criar `scripts/optimize-images.mjs`, gerar `.webp` das fotos e fundos e verificar que todas as imagens referenciadas em `lib/data` existem
- [x] 2.4 Buscar estrelas do GitHub no servidor com timeout e fallback (`lib/github.ts`) e verificar com teste unitário do fallback

## 3. Sistema visual e layout base

- [x] 3.1 Reescrever `app/globals.css` com tokens `@theme` (cores, fontes, escala), utilitários e animações com `prefers-reduced-motion`; verificar visualmente com screenshot da home
- [x] 3.2 Reescrever `app/layout.tsx` (fontes, metadados base, skip link, `x-nonce`) e criar `SiteHeader` e `SiteFooter`; verificar com E2E do skip link

## 4. Página inicial

- [x] 4.1 Hero em formato de componente com nome animado acessível e cartões laterais; verificar com E2E (h1 no HTML, "Caio Andres", link para /comunidade, reduced motion)
- [x] 4.2 Seção "agora" com data de atualização; verificar com E2E
- [x] 4.3 Abas com estado no hash e padrão ARIA (setas, Home/End, back/forward); verificar com E2E de teclado e de URL
- [x] 4.4 Painel about (bio, stack, certificações, formação, idiomas, interesses); verificar com E2E do badge Developer Associate (src local, link Credly, rel)
- [x] 4.5 Painel experience (linha do tempo + comunidade e conteúdo) sem truncamento; verificar com E2E
- [x] 4.6 Painel projects (destaque, filtro por categoria, estrelas, links); verificar com E2E do filtro
- [x] 4.7 Painel contact (copiar e-mail com `aria-live`, canais); verificar com E2E de cópia
- [x] 4.8 Paleta de comandos (`Ctrl/⌘+K`, filtro, Enter, Esc, foco); verificar com E2E

## 5. Comunidade e 404

- [x] 5.1 Redesenhar `/comunidade` (apresentação, números, meetups com galeria manual, parceiros em grade); verificar com E2E da galeria e dos links
- [x] 5.2 Criar `app/not-found.tsx`; verificar com E2E de status 404

## 6. Segurança

- [x] 6.1 `proxy.ts` com CSP por nonce + bloqueio de `/_next/image`; verificar com E2E (nonce muda, sem violações de CSP, /_next/image 4xx)
- [x] 6.2 Cabeçalhos estáticos em `next.config.ts` e `poweredByHeader: false`; verificar com E2E de cabeçalhos
- [x] 6.3 `/.well-known/security.txt` (RFC 9116); verificar com E2E
- [x] 6.4 Verificar por E2E: rede só mesma origem, nenhum `Set-Cookie`, todo `target=_blank` com `noopener noreferrer`

## 7. SEO e descoberta

- [x] 7.1 Metadados por página, canonical, Open Graph/Twitter e JSON-LD `Person` com `alternateName`; verificar com E2E
- [x] 7.2 `opengraph-image`, `sitemap.ts`, `robots.ts`, `manifest.ts`, ícones; verificar com E2E (PNG 1200×630, sitemap lista as 2 páginas)

## 8. CI, supply chain e documentação

- [ ] 8.1 `ci.yml` (lint, typecheck, unit, build, e2e, audit), `codeql.yml`, `dependabot.yml`; `deploy.yml` com `permissions` mínimas e Node 22; verificar com `actionlint` (se disponível) e execução no PR
- [x] 8.2 `AGENTS.md`, `README.md`, `SECURITY.md` e `A-DECIDIR.md`; verificar que os comandos documentados rodam

## 9. Verificação integrada

- [x] 9.1 Rodar `npm run check` + `npm run test:e2e` completos e revisar screenshots desktop/mobile da home, das 4 abas, da comunidade e da 404
- [ ] 9.2 Revisão de código (`/code-review` ou `pr-review-toolkit`) e correção dos achados relevantes

## Workflow follow-up

- Abrir PR em rascunho a partir de `feat/portfolio-v2` (não fazer push em `main`: dispara deploy).
- Dono revisa `A-DECIDIR.md`, confirma Node ≥ 20.9 na VPS e faz o merge.
- Arquivar a change (`/openspec-archive-change`) depois do merge.
