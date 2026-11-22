// Quem é o Caio, em primeira pessoa. Textos curtos, concretos e sem pose.
// Para editar o "agora", troque os itens e o `nowUpdatedAt`.

export type HeroProp = { name: string; value: string };

/** Props exibidas no hero, como se o Caio fosse um componente. */
export const heroProps: HeroProp[] = [
  { name: "role", value: "Engenheiro de Software" },
  { name: "at", value: "Itaú Unibanco" },
  { name: "aka", value: "Caio Andres" },
  { name: "from", value: "São Paulo, SP" },
];

export const heroLead =
  "Trabalho modernizando sistemas no Itaú: pego aplicação legada e levo pra AWS, de preferência sem ninguém perceber a troca. Fora do expediente, cuido do Servidor dos Programadores, uma comunidade com mais de 14 mil devs.";

export const photoCaption = "eu e o setup. o monitor vertical é pra ler log, juro.";

export type HeroCard = {
  id: "sdp" | "itau" | "alura";
  org: string;
  title: string;
  detail: string;
  href?: string;
  /** Classes completas (Tailwind só gera o que encontra escrito no código). */
  bgClass: string;
  accentClass: string;
  borderClass: string;
};

export const heroCards: HeroCard[] = [
  {
    id: "sdp",
    org: "Servidor dos Programadores",
    title: "Fundador",
    detail: "+14.500 devs no Discord",
    href: "/comunidade",
    bgClass: "bg-[url(/img/sdp/community-bg-card.webp)]",
    accentClass: "text-discord-text",
    borderClass: "border-discord/40 hover:border-discord focus-visible:border-discord",
  },
  {
    id: "itau",
    org: "Itaú Unibanco",
    title: "Engenheiro de Software",
    detail: "Cloud, serverless e GenAI",
    bgClass: "bg-[url(/img/itau/itau-bg.webp)]",
    accentClass: "text-itau",
    borderClass: "border-itau/40",
  },
  {
    id: "alura",
    org: "Alura",
    title: "Embaixador Tech",
    detail: "Alura Stars",
    bgClass: "bg-[url(/img/alura/alura-bg.webp)]",
    accentClass: "text-alura-text",
    borderClass: "border-alura/50",
  },
];

export type NowItem = { label: string; text: string };

/** Mês da última atualização da seção "agora" (YYYY-MM). */
export const nowUpdatedAt = "2026-11";

export const now: NowItem[] = [
  {
    label: "no trabalho",
    text: "Modernizando aplicações legadas para serverless no Itaú, com Lambda, ECS e Terraform.",
  },
  {
    label: "estudando",
    text: "Inglês para o IELTS Academic, que é em dezembro. Francês e mandarim também, só que sem pressa nenhuma.",
  },
  {
    label: "construindo",
    text: "Um simulador do IELTS com as quatro provas e nota por banda, porque eu precisava de um e não achei do jeito que queria.",
  },
  {
    label: "na comunidade",
    text: "Cuidando do Servidor dos Programadores e juntando gente para a próxima edição do MeetUp.",
  },
  {
    label: "fora do teclado",
    text: "Jiu-jitsu três vezes por semana e academia nos outros dias.",
  },
];

export const bio: string[] = [
  "Sou o Caio André, mas na internet quase todo mundo me conhece como Caio Andres. Sou engenheiro de software no Itaú Unibanco e estudei Ciência da Computação na São Judas.",
  "Meu dia a dia é back-end e nuvem: Python, AWS, Terraform e bastante observabilidade. Antes do cargo atual, passei pelo Command Center do Itaú construindo fluxos de RAG com LLMs. Antes disso fiz um pouco de tudo: front-end de ERP, site em WordPress para agência e suporte de TI, que ensina muito sobre como sistemas quebram.",
  "Também gosto de ensinar. Fundei o Servidor dos Programadores em 2023, organizo meetups presenciais em São Paulo, sou embaixador da Alura e gravo conteúdo de programação. Fora da tela tem jiu-jitsu, academia, livro de filosofia e mitologia, e dois idiomas novos que eu insisto em aprender ao mesmo tempo.",
];

export type StackGroup = { area: string; items: string[] };

export const stack: StackGroup[] = [
  { area: "back-end", items: ["Python", "FastAPI", "Flask", "Node.js", "NestJS", "Go", "Java"] },
  { area: "nuvem e infra", items: ["AWS Lambda", "API Gateway", "ECS", "RDS", "Athena", "SageMaker", "Terraform", "Docker", "GitHub Actions"] },
  { area: "ia aplicada", items: ["RAG", "Agentes de IA", "LLMs", "Tree of Thoughts"] },
  { area: "dados", items: ["SQL", "PostgreSQL", "MongoDB", "Redis"] },
  { area: "front-end", items: ["TypeScript", "React", "Next.js"] },
  { area: "observabilidade", items: ["Datadog", "Logs e traces da JVM"] },
];

export const education = {
  degree: "Bacharelado em Ciência da Computação",
  school: "Universidade São Judas Tadeu",
  period: "2022 – 2026",
};

export type Language = { name: string; level: string };

export const languages: Language[] = [
  { name: "Português", level: "nativo" },
  { name: "Inglês", level: "avançado (C1)" },
  { name: "Francês", level: "estudando" },
  { name: "Mandarim", level: "estudando. por enquanto, 你好 e paciência" },
];

export type Interest = { name: string; detail: string };

export const interests: Interest[] = [
  { name: "Jiu-jitsu", detail: "três vezes por semana" },
  { name: "Musculação", detail: "nos dias sem tatame" },
  { name: "Filosofia e mitologia", detail: "leitura de cabeceira" },
  { name: "Poesia", detail: "mais lendo do que escrevendo" },
  { name: "Ensinar", detail: "comunidade, meetups e vídeo" },
];
