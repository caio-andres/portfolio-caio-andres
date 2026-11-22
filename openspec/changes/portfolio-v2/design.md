# Design

## Context

- Next 15.5.12 + React 19.2 + Tailwind 3, App Router, rodando com `next start` numa VPS (PM2). Deploy via GitHub Actions a cada push em `main` (`.github/workflows/deploy.yml`): build no runner, `tar` de `.next` + `node_modules`, `scp` e `pm2 restart`.
- Conteúdo é estático e vive em arrays dentro dos componentes. Não há backend, formulário, cookies nem analytics.
- Identidade atual, que o dono pediu para manter: fundo navy `#111021`, azul `#2E7AFF`, Space Grotesk + JetBrains Mono, cantos retos, bordas finas, `<Caio André/>` com typewriter, abas `[about] [experience] ...`, cartões laterais com foto de fundo (SDP, Itaú, Alura).
- Motivação e escopo: ver `proposal.md`. Requisitos: ver `specs/`.

## Goals / Non-Goals

**Goals:**
- Legibilidade: escala tipográfica com corpo de 16–17px, metadados ≥ 12–13px, linhas ≤ ~75 caracteres, contraste AA medido por teste.
- Identidade preservada e amadurecida: os mesmos motivos visuais, usados com mais intenção e menos ruído.
- Segurança verificável por teste automatizado (cabeçalhos, CSP, terceiros, cookies, `rel` de links).
- Conteúdo em `lib/data/*` tipado, separado da apresentação, fácil de o dono editar.

**Non-Goals:**
- Blog/CMS, i18n (o site continua em pt-BR), formulário de contato com backend, analytics.
- Trocar a hospedagem (VPS + PM2 continua) ou o fluxo de deploy.
- Modo claro.

## Decisions

### D1. Next 16.4 + React 19.3 + Tailwind 4
Necessário para fechar as CVEs do `npm audit` (o range vulnerável vai até 16.3.0-preview). Tailwind 4 entra junto porque todos os estilos serão reescritos de qualquer forma e a config CSS-first (`@theme`) deixa os tokens num lugar só. TypeScript fica em 5.9 (o 7.x é o port nativo e ainda não é suportado oficialmente pelo Next).
*Alternativa:* backport 15.5.29 — descartado porque o advisory cobre `<=16.3.0-preview.10`, incluindo a linha 15.

### D2. CSP com nonce via `proxy.ts` (renderização dinâmica)
`proxy.ts` gera nonce por requisição; o Next aplica o nonce nos próprios scripts. `script-src 'self' 'nonce-X' 'strict-dynamic'`, `style-src 'self' 'nonce-X'`, `img-src 'self' data: blob:`, `font-src 'self'`, `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests` (só produção). Em dev entra `'unsafe-eval'` e `'unsafe-inline'` em estilos.
Para manter `style-src` sem `'unsafe-inline'`, **nenhum componente usa atributo `style`**: fundos de imagem viram classes Tailwind com URL fixa no código, e os atrasos da animação do nome usam classes `nth-child`. Por isso também não se usa `next/image` (ele injeta `style="color:transparent"`); usa-se `<img>` com `width/height/loading/decoding`.
Os demais cabeçalhos estáticos (HSTS, XFO, nosniff, Referrer-Policy, Permissions-Policy, COOP, CORP) ficam em `next.config.ts` `headers()`; `poweredByHeader: false`.
*Alternativas:* (a) CSP estática com `'unsafe-inline'` em scripts — mantém páginas estáticas, mas a CSP vira enfeite; (b) SRI/hash experimental — os scripts inline do RSC mudam por página e o recurso ainda é experimental. O custo do nonce (render dinâmico) é desprezível para um site deste tamanho rodando em `next start`.

### D3. Sem `/_next/image`; imagens pré-otimizadas
`images.unoptimized: true` e o `proxy.ts` responde 404 para `/_next/image`, eliminando a superfície dos advisories de DoS/cache do otimizador. Um script (`scripts/optimize-images.mjs`, com `sharp` como devDependency) gera `.webp` redimensionados a partir dos originais em `public/`, uma vez, e os arquivos gerados são commitados.

### D4. Zero terceiros no navegador
Fontes via `next/font/google` (self-hosted no build). Badges do Credly baixados para `public/certs/`. Estrelas do GitHub buscadas **no servidor** (`fetch` com `revalidate: 86400`, timeout de 2,5s, fallback estático em `lib/data/projects.ts`), nunca no cliente.

### D5. Abas: todo o conteúdo no HTML, estado no hash
`Tabs` (client) recebe os painéis já renderizados no servidor como `ReactNode` e controla só `hidden`/`aria-selected`. Estado inicial = `about` no SSR; no cliente, lê `location.hash` e escuta `hashchange` (back/forward funcionam). Troca de aba usa `history.pushState` + rolagem até a barra de abas apenas se ela estiver fora da viewport.
*Alternativa:* uma página longa com âncoras — descartado porque as abas são parte da identidade que o dono pediu para manter.

### D6. Nome com animação só visual
O `h1` contém "Caio André" no HTML. Cada letra é um `span` com atraso definido por classe (`.type-in > span:nth-child(n)`); `prefers-reduced-motion` desliga a animação. Remove a dependência `react-type-animation`, que renderizava o `h1` vazio no servidor.

### D7. Paleta de comandos própria
Componente pequeno (`<dialog>` nativo + `showModal()`), sem biblioteca: lista filtrável de ações, setas/Enter/Esc, foco devolvido ao fechar. O `<dialog>` resolve foco preso e `Esc` de graça.

### D8. Conteúdo em `lib/data/*`
`profile.ts` (bio, agora, stack, idiomas, interesses, links), `experience.ts`, `projects.ts`, `certifications.ts`, `community.ts`. Componentes só apresentam. Testes unitários validam integridade: URLs `https:`, imagens existentes em `public/`, IDs únicos, datas coerentes.

### D9. Tokens visuais
| Token | Valor | Uso |
|---|---|---|
| `ink` | `#111021` | fundo (mantido) |
| `panel` | `#16152B` | superfícies |
| `line` | `#2A2950` | bordas |
| `blue` | `#2E7AFF` | acento, bordas ativas, botões |
| `blue-text` | `#7AA7FF` | links e acento em texto pequeno (contraste ≥ 7:1) |
| `fg` / `muted` / `faint` | `#ECECF4` / `#A9A9C2` / `#8A8AA6` | texto |
| marcas | `#EC7000` Itaú, `#1572E8` Alura, `#5865F2` Discord | só em bordas, marcadores e rótulos curtos |

Tipografia: Space Grotesk para tudo que é texto; JetBrains Mono só para o que é "código" (props do hero, abas, datas, tags). Rótulos em minúsculas no estilo de código, sem caixa alta espaçada. Escala: 13 / 15 / 17 / 20 / 26 / 36 / clamp(44–76).
Layout: coluna de até 1120px, alinhada à esquerda. Hierarquia por tamanho e borda, não por cards idênticos: experiência vira linha do tempo, projetos misturam destaque grande + lista, "about" mistura texto corrido com módulos.
Movimento: um único momento orquestrado (o nome sendo digitado e as props aparecendo no load). O resto só responde a ação do visitante (troca de aba, abrir paleta, copiar).

### D10. Qualidade
Vitest (dados e utilitários) + Playwright contra `next start` (fluxos, cabeçalhos, CSP sem violações, rede só mesma origem, axe WCAG AA). CI em PR e push: lint, typecheck, unit, build, e2e, `npm audit --omit=dev --audit-level=high`. CodeQL e Dependabot (npm + actions, agrupados).

## Risks / Trade-offs

- [VPS com Node < 20.9 quebra o Next 16] → `engines` no `package.json`, CI com Node 22 e item no `A-DECIDIR.md` para o dono confirmar `node -v` na VPS antes do merge.
- [Render dinâmico em todas as páginas] → custo baixo; páginas sem dados pesados; estrelas do GitHub com cache de 24h.
- [API do GitHub com limite de 60 req/h sem token] → uma chamada por repo a cada 24h e fallback estático.
- [Texto pessoal escrito por terceiro pode soar falso] → textos curtos, concretos, em primeira pessoa; tudo que é suposição marcado no `A-DECIDIR.md` para revisão.
- [HSTS com `includeSubDomains` afeta subdomínios] → sem `preload`; registrado no `A-DECIDIR.md`.
- [CSP pode bloquear algo não previsto] → teste E2E falha com qualquer violação no console.

## Migration Plan

1. Trabalho na branch `feat/portfolio-v2`, PR em rascunho; nada vai para `main` (push em `main` faz deploy).
2. Antes do merge, o dono confirma Node ≥ 20.9 na VPS (`node -v`).
3. Merge → deploy normal pelo workflow existente. Rollback: o próprio workflow já faz backup do `.next` anterior em `~/backups`; reverter o merge e deixar o workflow redeployar.

## Open Questions

- Datas e números que só o dono sabe (data de emissão da Developer Associate, número atual de membros do SDP, se houve 3º meetup) — preenchidos com o que é público e marcados no `A-DECIDIR.md`.
