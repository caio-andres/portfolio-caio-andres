// Experiência profissional (mais recente primeiro) e atividades de comunidade.
// Datas em YYYY-MM; `end` ausente = atual.

export type Job = {
  id: string;
  company: string;
  team?: string;
  role: string;
  type: "CLT" | "Estágio" | "Freelance" | "Empreendedor";
  start: string;
  end?: string;
  description: string;
  tags: string[];
  /** Classe de cor da empresa (escrita por extenso para o Tailwind). */
  companyClass: string;
};

export const jobs: Job[] = [
  {
    id: "itau-dev",
    company: "Itaú Unibanco",
    role: "Desenvolvedor Júnior",
    type: "CLT",
    start: "2026-03",
    description:
      "Modernização de aplicações legadas para arquitetura cloud e serverless: Lambda, API Gateway, ECS e RDS, com infraestrutura como código em Terraform e olho em performance e custo.",
    tags: ["Python", "AWS", "Terraform", "Serverless"],
    companyClass: "text-itau",
  },
  {
    id: "itau-estagio",
    company: "Itaú Unibanco",
    team: "Command Center",
    role: "Estagiário em Engenharia de Software e IA",
    type: "Estágio",
    start: "2025-06",
    end: "2026-02",
    description:
      "Full stack com GenAI: fluxos de RAG integrando LLMs a bases estruturadas, na AWS com Terraform (Lambda, Athena, ECS, SageMaker). Python, SQL, NoSQL e monitoramento com Datadog. No meio do caminho, dei uma palestra interna sobre agentes de GenAI.",
    tags: ["GenAI", "RAG", "Python", "AWS", "Datadog"],
    companyClass: "text-itau",
  },
  {
    id: "youroadmaps",
    company: "YouRoadmaps",
    role: "Fundador e Dev Full Stack",
    type: "Empreendedor",
    start: "2024-12",
    description:
      "Plataforma SaaS de educação em programação, com trilhas do zero ao avançado. Mais de 100 alunos no primeiro mês. Cuido da arquitetura em microsserviços, da modelagem de domínio e até do SEO.",
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    companyClass: "text-blue-text",
  },
  {
    id: "aaccesson",
    company: "AaccesOn",
    role: "Desenvolvedor Front-end",
    type: "Freelance",
    start: "2024-03",
    end: "2024-09",
    description:
      "SaaS e ERP para controle digital de eventos. Construí o módulo de fluxo de caixa, com atualização em tempo real via Socket.io.",
    tags: ["TypeScript", "React", "Socket.io", "Docker"],
    companyClass: "text-fg",
  },
  {
    id: "formiga",
    company: "Agência Formiga Digital",
    role: "Estagiário de Desenvolvimento Web",
    type: "Estágio",
    start: "2023-09",
    end: "2024-03",
    description:
      "Sites e aplicações web com WordPress, HTML, CSS, JavaScript e PHP, incluindo manutenção de projetos em produção.",
    tags: ["WordPress", "JavaScript", "PHP", "CSS"],
    companyClass: "text-fg",
  },
  {
    id: "evermart",
    company: "Evermart",
    role: "Estagiário de Suporte em TI",
    type: "Estágio",
    start: "2023-03",
    end: "2023-08",
    description:
      "Atendimento de chamados técnicos, testes de API com Postman, consultas em MongoDB e análise de dados no Excel.",
    tags: ["Postman", "MongoDB", "Excel"],
    companyClass: "text-fg",
  },
];

export type CommunityRole = {
  id: string;
  name: string;
  role: string;
  period: string;
  description: string;
  href?: string;
  external?: boolean;
};

export const communityRoles: CommunityRole[] = [
  {
    id: "sdp",
    name: "Servidor dos Programadores",
    role: "Fundador",
    period: "desde 2023",
    description: "Comunidade no Discord com mais de 14.500 devs: tira-dúvidas por tecnologia, vagas, eventos e networking.",
    href: "/comunidade",
  },
  {
    id: "meetup",
    name: "MeetUp dos Programadores",
    role: "Organizador e host",
    period: "2025 – 2026",
    description: "Dois encontros presenciais em São Paulo: mais de 70 pessoas na Newhack (set/2025) e mais de 100 na Oracle (fev/2026).",
    href: "/comunidade#meetups",
  },
  {
    id: "alura",
    name: "Alura",
    role: "Embaixador Tech · Alura Stars",
    period: "parceria",
    description: "Conteúdo e ações de comunidade em parceria com a Alura.",
  },
  {
    id: "conteudo",
    name: "Conteúdo de programação",
    role: "Criador",
    period: "YouTube, TikTok e Instagram",
    description: "Vídeos sobre programação, carreira e o que eu ando aprendendo.",
    href: "https://www.youtube.com/@caio_andress",
    external: true,
  },
  {
    id: "palestra-genai",
    name: "Agentes de GenAI",
    role: "Palestrante",
    period: "set/2025",
    description: "Palestra interna no Itaú Unibanco sobre agentes de GenAI: conceitos, casos de uso e hands-on com as ferramentas disponíveis.",
  },
];

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "2026-03" -> "mar/2026" */
export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  if (!y || !m || m < 1 || m > 12) throw new Error(`mês inválido: ${ym}`);
  return `${MONTHS[m - 1]}/${y}`;
}

/** Período legível: "mar/2026 – atual" ou "jun/2025 – fev/2026". */
export function formatPeriod(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "atual"}`;
}
