# Spec Delta

## Purpose

Garantir que o site, servido por `next start` numa VPS, entregue cabeçalhos de segurança fortes, não carregue nada de terceiros no navegador, não rastreie visitantes e publique um canal para reporte de vulnerabilidades.

## ADDED Requirements

### Requirement: Content Security Policy com nonce
Toda resposta HTML SHALL ter `Content-Security-Policy` com `default-src 'self'`, `script-src` baseado em nonce único por requisição com `'strict-dynamic'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` e `frame-ancestors 'none'`. Em produção a política MUST NOT conter `'unsafe-eval'` em `script-src`.

#### Scenario: Nonce muda a cada requisição
- **WHEN** a página `/` é requisitada duas vezes
- **THEN** cada resposta tem um nonce diferente no cabeçalho CSP
- **AND** os scripts da página carregam sem violações de CSP no console

### Requirement: Cabeçalhos de segurança
Toda resposta SHALL incluir `Strict-Transport-Security` (max-age ≥ 1 ano, `includeSubDomains`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` negando câmera, microfone, geolocalização e afins, `Cross-Origin-Opener-Policy: same-origin`. As respostas MUST NOT incluir `X-Powered-By`.

#### Scenario: Cabeçalhos presentes
- **WHEN** qualquer página é requisitada
- **THEN** os cabeçalhos listados estão presentes com os valores esperados
- **AND** não há cabeçalho `X-Powered-By`

### Requirement: Sem requisições a terceiros no navegador
As páginas SHALL carregar imagens, fontes, estilos e scripts apenas do próprio domínio. Badges de certificação e fontes MUST ser servidos localmente.

#### Scenario: Rede da página inicial
- **WHEN** a página `/` carrega por completo
- **THEN** todas as requisições feitas pelo navegador são para a mesma origem

### Requirement: Sem cookies e sem rastreamento
O site SHALL NOT definir cookies nem carregar scripts de analytics ou rastreamento.

#### Scenario: Nenhum cookie
- **WHEN** a página `/` é carregada
- **THEN** nenhuma resposta contém `Set-Cookie`

### Requirement: Links externos seguros
Todo link que abre em nova aba SHALL ter `rel` contendo `noopener` e `noreferrer`.

#### Scenario: Auditoria de links
- **WHEN** as páginas `/` e `/comunidade` são analisadas
- **THEN** todo `a[target="_blank"]` tem `rel` com `noopener` e `noreferrer`

### Requirement: security.txt
O site SHALL publicar `/.well-known/security.txt` conforme a RFC 9116, com `Contact`, `Expires` no futuro, `Preferred-Languages` e `Canonical`.

#### Scenario: Arquivo válido
- **WHEN** `/.well-known/security.txt` é requisitado
- **THEN** a resposta é `text/plain` com `Contact: mailto:` e um `Expires` posterior à data atual

### Requirement: Superfície de ataque reduzida
O site SHALL NOT expor o endpoint de otimização de imagens sob demanda (`/_next/image`); as imagens MUST ser servidas já otimizadas como arquivos estáticos.

#### Scenario: Endpoint de imagem desativado
- **WHEN** `/_next/image?url=/caio/caio.webp&w=64&q=75` é requisitado
- **THEN** a resposta não é uma imagem otimizada (status 4xx)
