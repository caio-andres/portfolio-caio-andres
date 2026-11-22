# Spec Delta

## Purpose

Definir como o visitante se move pelo site: abas de conteúdo com estado na URL, navegação por teclado, paleta de comandos, atalho para pular ao conteúdo e a página de rota inexistente.

## ADDED Requirements

### Requirement: Abas com estado na URL
A página inicial SHALL ter as abas `about`, `experience`, `projects` e `contact`, sendo `about` a padrão. A aba ativa MUST ser refletida no fragmento da URL (ex.: `/#projects`), e abrir a página com um fragmento válido MUST ativar a aba correspondente. Fragmento inválido MUST cair para `about`.

#### Scenario: Link direto para uma aba
- **WHEN** o visitante abre `/#projects`
- **THEN** a aba `projects` está ativa e seu conteúdo visível

#### Scenario: Troca de aba atualiza a URL
- **WHEN** o visitante ativa a aba `experience`
- **THEN** a URL passa a terminar em `#experience`
- **AND** o botão voltar do navegador retorna para a aba anterior

#### Scenario: Fragmento desconhecido
- **WHEN** o visitante abre `/#qualquer-coisa`
- **THEN** a aba `about` está ativa

### Requirement: Abas acessíveis por teclado
As abas SHALL seguir o padrão ARIA de tabs: `role="tablist"`, `role="tab"` com `aria-selected` e `aria-controls`, e painéis `role="tabpanel"`. As setas esquerda/direita MUST mover o foco e ativar a aba vizinha, e Home/End MUST ir para a primeira/última aba.

#### Scenario: Navegação por setas
- **WHEN** o foco está na aba `about` e o visitante pressiona seta para a direita
- **THEN** a aba `experience` recebe foco e fica ativa

### Requirement: Conteúdo de todas as abas no HTML
O HTML entregue pelo servidor SHALL conter o conteúdo de todas as abas; as inativas ficam ocultas, mas presentes, para indexação e uso sem JavaScript.

#### Scenario: Sem JavaScript
- **WHEN** a página `/` é requisitada sem executar JavaScript
- **THEN** o documento contém os textos das quatro abas

### Requirement: Paleta de comandos
O site SHALL abrir uma paleta de comandos com `Ctrl+K` ou `⌘+K`, e também por um botão visível. A paleta MUST permitir ir para cada aba, abrir `/comunidade`, copiar o e-mail e abrir os perfis sociais; MUST filtrar por texto digitado, ser operável só com teclado e fechar com `Esc`, devolvendo o foco ao elemento anterior.

#### Scenario: Ir para projetos pela paleta
- **WHEN** o visitante pressiona `Ctrl+K`, digita "proj" e pressiona Enter
- **THEN** a paleta fecha e a aba `projects` fica ativa

#### Scenario: Fechar com Esc
- **WHEN** a paleta está aberta e o visitante pressiona `Esc`
- **THEN** a paleta fecha e o foco volta para onde estava

### Requirement: Pular para o conteúdo
Toda página SHALL ter, como primeiro elemento focável, um link "pular para o conteúdo" que leva ao conteúdo principal.

#### Scenario: Primeiro Tab
- **WHEN** o visitante pressiona Tab ao carregar a página
- **THEN** o link "pular para o conteúdo" fica visível e focado

### Requirement: Página 404 própria
Rotas inexistentes SHALL responder com status 404 e uma página no visual do site com link de volta para o início.

#### Scenario: Rota inexistente
- **WHEN** o visitante abre `/nao-existe`
- **THEN** a resposta tem status 404
- **AND** a página oferece um link para `/`
