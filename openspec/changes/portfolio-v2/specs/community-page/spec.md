# Spec Delta

## Purpose

Apresentar o Servidor dos Programadores, comunidade fundada pelo Caio: o que é, o tamanho, os meetups presenciais e os parceiros, com um caminho claro para entrar no Discord.

## ADDED Requirements

### Requirement: Apresentação da comunidade
A página `/comunidade` SHALL exibir o nome da comunidade, uma descrição do que acontece nela, números-chave (membros, meetups realizados, pessoas nos meetups) e um botão para entrar no Discord que abre em nova aba sem `window.opener`.

#### Scenario: Botão do Discord
- **WHEN** a página `/comunidade` é exibida
- **THEN** existe um link para `https://discord.gg/programador` com `target="_blank"` e `rel` contendo `noopener`

### Requirement: Meetups com galeria acessível
Cada meetup SHALL exibir edição, data, local, descrição, números de público e uma galeria de fotos. A galeria MUST ser controlada pelo visitante (botões anterior/próximo e indicador de posição), sem troca automática, e cada foto MUST ter texto alternativo.

#### Scenario: Avançar foto
- **WHEN** o visitante ativa "próxima foto" na galeria de um meetup
- **THEN** a foto seguinte é exibida e o indicador mostra a nova posição (ex.: "2 de 4")

#### Scenario: Sem troca automática
- **WHEN** a galeria fica visível por 10 segundos sem interação
- **THEN** a mesma foto continua exibida

### Requirement: Parceiros em grade estática
A página SHALL listar os parceiros da comunidade em uma grade estática (sem animação contínua), cada um com logo e descrição. Parceiros com site conhecido MUST ter link externo seguro; parceiros sem site confirmado MUST aparecer sem link (nunca com link quebrado).

#### Scenario: Parceiros visíveis
- **WHEN** a página `/comunidade` é exibida
- **THEN** cada parceiro aparece uma única vez
- **AND** todo link de parceiro abre em nova aba com `rel` contendo `noopener`

### Requirement: Volta para o início
A página SHALL oferecer um link para voltar à página inicial.

#### Scenario: Voltar
- **WHEN** o visitante ativa "voltar"
- **THEN** o navegador vai para `/`
