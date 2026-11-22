# Spec Delta

## Purpose

Fazer buscadores e redes sociais entenderem quem é o Caio André (também buscado como Caio Andres) e exibirem o site com título, descrição e imagem corretos.

## ADDED Requirements

### Requirement: Metadados por página
Cada página SHALL ter `title`, `description`, URL canônica, `lang="pt-BR"` e metadados Open Graph e Twitter com título, descrição e imagem.

#### Scenario: Metadados da home
- **WHEN** a página `/` é requisitada
- **THEN** o HTML contém `<link rel="canonical" href="https://caioandres.dev">` (ou com barra final) e `og:image`

### Requirement: Dados estruturados da pessoa
A página inicial SHALL incluir JSON-LD `Person` com `name` "Caio André", `alternateName` contendo "Caio Andres", `jobTitle`, `worksFor`, `alumniOf`, `hasCredential` com as certificações e `sameAs` com os perfis públicos.

#### Scenario: JSON-LD presente
- **WHEN** a página `/` é requisitada
- **THEN** há um `script[type="application/ld+json"]` com `@type` "Person" e `alternateName` incluindo "Caio Andres"

### Requirement: Imagem Open Graph
O site SHALL gerar uma imagem Open Graph de 1200×630 com o nome e o cargo, no visual do site.

#### Scenario: Imagem gerada
- **WHEN** a URL da `og:image` é requisitada
- **THEN** a resposta é uma imagem PNG de 1200×630

### Requirement: Sitemap e robots
O site SHALL publicar `/sitemap.xml` com as páginas públicas e `/robots.txt` permitindo indexação e apontando para o sitemap.

#### Scenario: Sitemap
- **WHEN** `/sitemap.xml` é requisitado
- **THEN** ele lista `https://caioandres.dev` e `https://caioandres.dev/comunidade`

### Requirement: Manifest
O site SHALL publicar um web app manifest com nome, cores do tema e ícone.

#### Scenario: Manifest
- **WHEN** `/manifest.webmanifest` é requisitado
- **THEN** a resposta contém `name`, `theme_color` e ao menos um ícone
