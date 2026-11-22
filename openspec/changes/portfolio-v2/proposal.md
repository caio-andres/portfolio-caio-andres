# Proposal

## Why

O portfolio atual tem identidade forte (azul elétrico sobre navy, `<Caio André/>`, `[tabs]`, bento), mas é difícil de ler: textos de 9–11px, descrições cortadas por `line-clamp` e conteúdo de experiências e projetos escondido em cards de altura fixa. Ele também roda `next start` numa VPS com Next 15.5.12, que tem 1 vulnerabilidade crítica e várias altas publicadas (request smuggling, bypass de middleware, XSS com CSP nonce, DoS em Server Components). Por fim, falta conteúdo recente: a certificação AWS Certified Developer – Associate, projetos open source com tração (ex.: `leetcode-challenge`, 300+ estrelas) e um retrato mais humano do Caio (também conhecido como Caio Andres).

## What Changes

- Repaginação visual completa mantendo a identidade: mesma paleta e fontes, escala tipográfica nova (corpo ≥ 16px, metadados ≥ 13px), contraste AA, e sem `line-clamp` em conteúdo principal.
- Hero novo no formato de componente (`<CaioAndre role=... aka="Caio Andres" />`) com animação de digitação acessível (texto completo no HTML, animação só visual e desligada com `prefers-reduced-motion`).
- Seção "agora" com o que o Caio está fazendo no momento, com data de atualização.
- Abas mantidas (`[about] [experience] [projects] [contact]`), agora sincronizadas com a URL (`#experience`), navegáveis por teclado (padrão ARIA tabs) e com todo o conteúdo no HTML para SEO.
- Conteúdo novo: bio em primeira pessoa, stack agrupada, certificações (incluindo a AWS Developer Associate, com badge servido localmente), idiomas, interesses fora do código, comunidade e conteúdo, projetos open source com estrelas do GitHub (com fallback estático).
- Paleta de comandos (`Ctrl/⌘ + K`) para navegar e copiar o e-mail.
- Página `/comunidade` redesenhada: estatísticas, meetups com carrossel manual e acessível, parceiros em grade estática.
- Página 404 própria.
- SEO: JSON-LD `Person` com `alternateName: "Caio Andres"`, imagem Open Graph gerada, `sitemap.xml`, `robots.txt`, `manifest`.
- Segurança: upgrade para Next 16.4 / React 19.3; CSP com nonce via `proxy.ts`; HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP; remoção do `X-Powered-By`; `/.well-known/security.txt`; zero requisições a terceiros no navegador (badges e fontes servidos localmente); sem cookies nem rastreamento; endpoint de otimização de imagem desligado (imagens pré-otimizadas).
- Qualidade: testes unitários (Vitest) e E2E (Playwright + axe), CI no GitHub Actions, CodeQL, Dependabot e `permissions` mínimas nos workflows.
- **BREAKING (infra)**: Next 16 exige Node.js ≥ 20.9 na VPS. O script `lint` muda de `next lint` (removido no Next 16) para `eslint .`.
- Remoção: dependência `react-type-animation` (substituída por componente próprio, SSR-friendly) e marquee de parceiros.

## Capabilities

### New Capabilities
- `profile-home`: página inicial — hero, seção "agora", abas de conteúdo (sobre, experiência, projetos, contato) e o que cada uma deve exibir.
- `site-navigation`: navegação entre abas, sincronização com URL, teclado, paleta de comandos, link de pular conteúdo e página 404.
- `community-page`: página `/comunidade` — apresentação do Servidor dos Programadores, meetups e parceiros.
- `site-security`: cabeçalhos de segurança, CSP, `security.txt`, política de terceiros/cookies e superfície de ataque do servidor.
- `site-discovery`: metadados, dados estruturados, Open Graph, sitemap, robots e manifest.

### Modified Capabilities
- (nenhuma — não havia specs antes desta change)

## Impact

- Código: reescrita de `app/` e `components/`; novos `lib/data/*`, `proxy.ts`, rotas de metadados; `globals.css` migra para Tailwind v4 (`@theme`); `tailwind.config.ts` removido.
- Dependências: `next@16`, `react@19.3`, `tailwindcss@4` + `@tailwindcss/postcss`; dev: `vitest`, `@playwright/test`, `@axe-core/playwright`, `sharp` (script de imagens), `@fontsource/*` (OG image). Removidas: `react-type-animation`, `autoprefixer`.
- Infra/CI: novo `ci.yml`, `codeql.yml`, `dependabot.yml`; `deploy.yml` ganha `permissions` mínimas e Node 22. A VPS precisa de Node ≥ 20.9.
- Conteúdo: decisões pendentes do dono em `A-DECIDIR.md`.
