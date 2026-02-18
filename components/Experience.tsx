import { Building2 } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
  tags: string[];
  current?: boolean;
  cardClass: string;
  companyColor: string;
}

const experiences: Experience[] = [
  {
    title: "Desenvolvedor Júnior",
    company: "Itaú Unibanco",
    period: "Mar 2026 – Atual",
    type: "CLT",
    current: true,
    description:
      "Modernização de aplicações legadas para arquitetura cloud e serverless. Lambda, API Gateway, ECS, RDS. Infraestrutura como código com Terraform, foco em performance e redução de custos.",
    tags: ["Python", "AWS", "Terraform", "Serverless"],
    cardClass:
      "border border-[#EC7000]/30 hover:border-[#EC7000]/60 hover:bg-[#EC7000]/5",
    companyColor: "text-[#EC7000]",
  },
  {
    title: "Estagiário Eng. Software & IA",
    company: "Itaú · Command Center",
    period: "Jun 2025 – Fev 2026",
    type: "Estágio",
    current: false,
    description:
      "Full Stack com GenAI. Fluxos RAG integrando LLMs a bases estruturadas. AWS com Terraform: Lambda, Athena, ECS, SageMaker. Python, SQL, NoSQL, Datadog.",
    tags: ["GenAI", "RAG", "Python", "AWS"],
    cardClass:
      "border border-[#EC7000]/20 hover:border-[#EC7000]/40",
    companyColor: "text-[#EC7000]",
  },
  {
    title: "Fundador & Dev Full Stack",
    company: "YouRoadmaps",
    period: "Dez 2024 – Atual",
    type: "Empreendedor",
    current: false,
    description:
      "Plataforma SaaS de educação digital com +100 alunos no primeiro mês. Arquitetura em microsserviços. Liderança técnica, modelagem de domínio, SEO.",
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    cardClass:
      "border border-primary-blue/20 hover:border-primary-blue/50 hover:bg-primary-blue/5",
    companyColor: "text-primary-blue",
  },
  {
    title: "Desenvolvedor Front-end",
    company: "AaccesOn",
    period: "Mar 2024 – Set 2024",
    type: "Freelance",
    current: false,
    description:
      "SaaS e ERP para controle digital de eventos. Módulo de fluxo de caixa com integração em tempo real via Socket.io.",
    tags: ["TypeScript", "React", "Socket.io", "Docker"],
    cardClass:
      "border border-primary-blue/20 hover:border-primary-blue/40",
    companyColor: "text-gray-400",
  },
  {
    title: "Estagiário Dev Web",
    company: "Agência Formiga Digital",
    period: "Set 2023 – Mar 2024",
    type: "Estágio",
    current: false,
    description:
      "Interfaces e aplicações web com WordPress, HTML, CSS, JavaScript e PHP. Manutenção de aplicações em produção.",
    tags: ["WordPress", "JavaScript", "PHP", "CSS"],
    cardClass: "border border-gray-800 hover:border-gray-700",
    companyColor: "text-gray-400",
  },
  {
    title: "Estagiário Suporte em TI",
    company: "Evermart",
    period: "Mar 2023 – Ago 2023",
    type: "Estágio",
    current: false,
    description:
      "Resolução de chamados técnicos, testes de API com Postman, consultas em MongoDB e análise de dados com Excel.",
    tags: ["Postman", "MongoDB", "Excel"],
    cardClass: "border border-gray-800 hover:border-gray-700",
    companyColor: "text-gray-400",
  },
];

export default function Experience() {
  return (
    <div id="experience" className="py-4">
      <div>

        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <Building2 className="text-primary-blue w-5 h-5" strokeWidth={1.5} />
          <div>
            <p className="bento-label mb-1">Career</p>
            <h2 className="section-title">
              <span className="text-gray-400">{"<"}</span>
              Experience
              <span className="text-gray-400">{"/>"}</span>
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:auto-rows-[220px]">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`bento-card justify-between ${exp.cardClass}`}
            >
              {/* Top */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold tracking-tight ${exp.companyColor}`}>
                    {exp.company}
                  </span>
                  {exp.current && (
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-mono text-[9px] text-green-500 uppercase">Atual</span>
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white leading-tight mb-1">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-gray-400">{exp.period}</span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 border border-primary-blue/10 text-gray-400">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-gray-400 line-clamp-3 font-light leading-relaxed my-2">
                {exp.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] px-2 py-0.5 bg-primary-dark border border-primary-blue/10 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
