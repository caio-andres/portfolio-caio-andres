// Projetos. `repo` = "dono/nome" no GitHub (as estrelas são buscadas no servidor,
// com `stars` como fallback quando a API não responde).

export type ProjectCategory = "ia" | "nuvem" | "web" | "open-source";

export const categoryLabels: Record<ProjectCategory, string> = {
  ia: "ia",
  nuvem: "nuvem",
  web: "web",
  "open-source": "open source",
};

export type ProjectLink = { kind: "site" | "demo" | "codigo"; url: string };

export type Project = {
  id: string;
  name: string;
  period: string;
  summary: string;
  description: string;
  categories: ProjectCategory[];
  tags: string[];
  links: ProjectLink[];
  repo?: string;
  stars?: number;
  note?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "jflux",
    name: "JFlux",
    period: "ago/2025 – atual",
    summary: "Observabilidade e performance para aplicações Java, com LLM no meio.",
    description:
      "O JFlux lê logs e traces direto da JVM, encontra gargalos e sugere otimizações. A análise passa por um fluxo de LLM estruturado em Tree of Thoughts, que explora mais de uma hipótese de diagnóstico antes de sugerir uma otimização.",
    categories: ["ia"],
    tags: ["Java", "Python", "LLM", "Tree of Thoughts", "Observabilidade"],
    links: [],
    note: "apresentado na Oracle",
    featured: true,
  },
  {
    id: "leetcode-challenge",
    name: "LeetCode Challenge",
    period: "open source",
    summary: "Um problema do LeetCode por dia, resolvido e explicado.",
    description:
      "Repositório colaborativo que mantenho com @matheusaudibert e @enzowxl: um problema por dia, com solução e explicação, e um script em Python que busca e organiza os problemas. Qualquer pessoa pode fazer fork e entrar no desafio.",
    categories: ["open-source"],
    tags: ["Python", "Algoritmos", "Estruturas de dados"],
    links: [{ kind: "codigo", url: "https://github.com/caio-andres/leetcode-challenge" }],
    repo: "caio-andres/leetcode-challenge",
    stars: 309,
  },
  {
    id: "ielts-trainer",
    name: "IELTS Trainer",
    period: "nov/2026",
    summary: "Simulado completo do IELTS Academic, feito para a minha prova.",
    description:
      "Listening, reading, writing e speaking com correção na escala de bandas do IELTS. O listening tem áudio sintetizado com uma voz por personagem, o speaking grava e transcreve a resposta, e o writing tem um linter focado nos erros típicos de quem fala português.",
    categories: ["web", "open-source"],
    tags: ["Go", "SQLite", "Next.js", "TypeScript"],
    links: [{ kind: "codigo", url: "https://github.com/caio-andres/english-proficiency-prep" }],
    repo: "caio-andres/english-proficiency-prep",
    stars: 0,
  },
  {
    id: "sql-executor-agent",
    name: "SQL Executor Agent",
    period: "ago/2025",
    summary: "Pergunta em português, resposta vinda do Athena.",
    description:
      "Chatbot serverless que recebe uma pergunta em linguagem natural, gera e valida o SQL, executa no Amazon Athena com cache em Redis e devolve a resposta explicada. Cada etapa é uma Lambda atrás de um API Gateway, com modelos menores nas etapas mais simples para gastar pouco.",
    categories: ["ia", "nuvem", "open-source"],
    tags: ["Python", "AWS Lambda", "API Gateway", "Athena", "Redis", "LLM"],
    links: [{ kind: "codigo", url: "https://github.com/caio-andres/sql-executor-agent" }],
    repo: "caio-andres/sql-executor-agent",
    stars: 1,
  },
  {
    id: "youroadmaps",
    name: "YouRoadmaps",
    period: "dez/2024 – atual",
    summary: "Trilhas de estudo em programação, do zero ao avançado.",
    description:
      "Plataforma SaaS de educação digital que passou de 100 alunos no primeiro mês. Arquitetura em microsserviços, pensada para crescer sem reescrever tudo.",
    categories: ["web"],
    tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Docker"],
    links: [{ kind: "site", url: "https://www.youroadmaps.com" }],
  },
  {
    id: "spl",
    name: "Simple Programming Language",
    period: "jun – dez/2024",
    summary: "Uma linguagem de programação interpretada, feita na faculdade.",
    description:
      "Análise léxica, parser, interpretador e uma interface web para escrever e rodar código na linguagem.",
    categories: ["web", "open-source"],
    tags: ["TypeScript", "Node.js", "Express", "React", "Compiladores"],
    links: [
      { kind: "demo", url: "https://spl-simple-programming-language.vercel.app" },
      { kind: "codigo", url: "https://github.com/caio-andres/simple-programming-language" },
    ],
    repo: "caio-andres/simple-programming-language",
    stars: 10,
  },
  {
    id: "selos-github",
    name: "Selos do GitHub",
    period: "open source",
    summary: "Como conseguir cada conquista do GitHub, em português.",
    description:
      "Guia com todos os selos (achievements) do GitHub, o que cada um exige e os níveis de cada um.",
    categories: ["open-source"],
    tags: ["GitHub", "Markdown", "Documentação"],
    links: [{ kind: "codigo", url: "https://github.com/caio-andres/selos-github" }],
    repo: "caio-andres/selos-github",
    stars: 8,
  },
  {
    id: "enriquecimento-cnpj",
    name: "Enriquecimento de CNPJ",
    period: "open source",
    summary: "Uma lista de CNPJs vira uma base completa de empresas.",
    description:
      "Automação em Python que consulta a API da ReceitaWS e gera um banco de dados e um CSV com os dados completos de cada empresa.",
    categories: ["open-source"],
    tags: ["Python", "API", "Automação"],
    links: [{ kind: "codigo", url: "https://github.com/caio-andres/enriquecimento-cnpj" }],
    repo: "caio-andres/enriquecimento-cnpj",
    stars: 5,
  },
  {
    id: "portfolio",
    name: "Este site",
    period: "2026",
    summary: "Next.js 16, CSP com nonce e nenhum cookie.",
    description:
      "Código aberto. Os cabeçalhos de segurança, a política de conteúdo e a ausência de terceiros são verificados por testes automatizados a cada pull request.",
    categories: ["web", "open-source"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright"],
    links: [{ kind: "codigo", url: "https://github.com/caio-andres/portfolio-caio-andres" }],
    repo: "caio-andres/portfolio-caio-andres",
    stars: 2,
  },
];

export const linkLabels: Record<ProjectLink["kind"], string> = {
  site: "site",
  demo: "demo",
  codigo: "código",
};

/** Estrelas abaixo disso não são exibidas (não ajudam ninguém a decidir nada). */
export const MIN_STARS_TO_SHOW = 5;
