# Spec Delta

## Purpose

Apresentar o Caio André (também conhecido como Caio Andres) de forma legível e honesta na página inicial: quem é, o que faz hoje, onde trabalhou, o que construiu e como falar com ele.

## ADDED Requirements

### Requirement: Hero identifica a pessoa sem depender de JavaScript
A página inicial SHALL exibir no hero o nome "Caio André", o apelido "Caio Andres", o cargo atual, a empresa atual e a cidade. O nome completo MUST estar presente no HTML entregue pelo servidor (h1), mesmo que uma animação de digitação seja exibida.

#### Scenario: HTML do servidor contém o nome
- **WHEN** a página `/` é requisitada sem executar JavaScript
- **THEN** o documento contém um único `h1` com o texto "Caio André"
- **AND** o texto "Caio Andres" aparece no hero

#### Scenario: Movimento reduzido
- **WHEN** o visitante tem `prefers-reduced-motion: reduce`
- **THEN** o nome aparece completo, sem animação de digitação

### Requirement: Atalhos do hero para as frentes principais
O hero SHALL exibir cartões para Servidor dos Programadores, Itaú Unibanco e Alura. O cartão da comunidade MUST levar para `/comunidade`.

#### Scenario: Cartão da comunidade
- **WHEN** o visitante ativa o cartão "Servidor dos Programadores"
- **THEN** o navegador vai para `/comunidade`

### Requirement: Seção "agora"
A página inicial SHALL exibir uma seção com o que o Caio está fazendo no momento (trabalho, estudo, projeto pessoal, fora do código) e a data da última atualização dessa seção.

#### Scenario: Data de atualização visível
- **WHEN** a página `/` é exibida
- **THEN** a seção "agora" mostra pelo menos três itens e um texto de "atualizado em" com mês e ano

### Requirement: Aba "about" com perfil completo
A aba `about` SHALL exibir: bio em primeira pessoa, stack agrupada por área, certificações, formação, idiomas e interesses fora do código.

#### Scenario: Conteúdo da aba about
- **WHEN** a aba `about` está ativa
- **THEN** são exibidos os grupos de stack, a formação em Ciência da Computação, os idiomas e os interesses

### Requirement: Certificações com badge local e link verificável
A aba `about` SHALL listar as certificações AWS Certified Developer – Associate, AWS Certified Cloud Practitioner e AWS Academy Cloud Foundations. Cada badge MUST ser servido pelo próprio site e MUST linkar para a página pública de verificação no Credly, abrindo em nova aba sem `window.opener`. A Developer – Associate MUST aparecer primeiro e marcada como a mais recente.

#### Scenario: Badge da Developer Associate
- **WHEN** a aba `about` está ativa
- **THEN** a primeira certificação é "AWS Certified Developer – Associate"
- **AND** a imagem do badge tem `src` no mesmo domínio e texto alternativo descritivo
- **AND** o link aponta para `https://www.credly.com/badges/7703c9c1-d0ec-438f-8eb0-9e39c62795d1` com `rel` contendo `noopener` e `noreferrer`

### Requirement: Aba "experience" legível e sem truncamento
A aba `experience` SHALL listar as experiências profissionais em ordem cronológica reversa, com empresa, cargo, período, tipo de vínculo, descrição completa (sem truncamento) e tecnologias. A experiência atual MUST ser sinalizada como atual. A aba SHALL também listar as atividades de comunidade e conteúdo.

#### Scenario: Experiência atual
- **WHEN** a aba `experience` está ativa
- **THEN** a primeira experiência é a do Itaú Unibanco e está marcada como atual
- **AND** nenhuma descrição de experiência é cortada visualmente

### Requirement: Aba "projects" com destaque e open source
A aba `projects` SHALL exibir um projeto em destaque, os demais projetos com descrição completa, links (site, demo, repositório) quando existirem e, para repositórios públicos, o número de estrelas do GitHub. Se a consulta ao GitHub falhar, o número MUST cair para um valor estático conhecido, sem quebrar a página.

#### Scenario: GitHub indisponível
- **WHEN** a API do GitHub não responde dentro do tempo limite
- **THEN** a aba `projects` é exibida com os números de estrelas estáticos

#### Scenario: Filtro por categoria
- **WHEN** o visitante escolhe uma categoria de projeto
- **THEN** apenas os projetos daquela categoria permanecem visíveis
- **AND** a escolha "todos" volta a exibir todos os projetos

### Requirement: Aba "contact" com canais diretos
A aba `contact` SHALL oferecer e-mail (com ação de copiar e link `mailto:`), LinkedIn, GitHub e Discord. A ação de copiar MUST confirmar visualmente e para leitores de tela que o e-mail foi copiado.

#### Scenario: Copiar e-mail
- **WHEN** o visitante ativa "copiar e-mail"
- **THEN** o endereço vai para a área de transferência
- **AND** uma mensagem "e-mail copiado" é anunciada em uma região `aria-live`

### Requirement: Legibilidade mínima
Todo texto de conteúdo SHALL ter no mínimo 16px; metadados e rótulos SHALL ter no mínimo 12px. Texto sobre o fundo MUST ter contraste WCAG AA (4.5:1 para texto normal).

#### Scenario: Verificação automática de acessibilidade
- **WHEN** a página `/` é analisada com axe (regras WCAG 2 A/AA)
- **THEN** não há violações de contraste de cor
