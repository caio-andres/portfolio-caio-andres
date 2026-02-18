import { Briefcase, Building2 } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  type: string;
}

const experiences: Experience[] = [
  {
    title: "Desenvolvedor Júnior",
    company: "Itaú Unibanco",
    period: "Março de 2026 – Atual",
    type: "CLT",
    description: "Desenvolvimento em Python e AWS na modernização de aplicações legadas para arquitetura cloud e serverless. Foco em reestruturação para ambientes escaláveis, desacoplados e orientados a eventos, utilizando Lambda, API Gateway, ECS, RDS. Infraestrutura como código com Terraform, com foco em performance, redução de custos e alta disponibilidade.",
  },
  {
    title: "Estagiário em Engenharia de Software & IA",
    company: "Itaú Unibanco - Command Center",
    period: "Junho de 2025 – Fevereiro de 2026",
    type: "Estágio",
    description: "Desenvolvimento Full Stack com forte integração de GenAI. Estruturação de fluxos RAG (Retrieval-Augmented Generation) integrando LLMs a bases estruturadas. Infraestrutura AWS com Terraform (Lambda, Athena, API Gateway, ECS, NLB, EC2, RDS, CloudFront, Step Functions, SageMaker). Python, SQL, NoSQL, Datadog, Clean Code e Arquitetura Limpa.",
  },
  {
    title: "Fundador & Desenvolvedor Full Stack",
    company: "YouRoadmaps",
    period: "Dezembro de 2024 – Atual",
    type: "Empreendedor",
    description: "Plataforma SaaS de educação digital com +100 alunos no primeiro mês. Arquitetura em microsserviços, TypeScript, Next.js, React, Tailwind CSS, Node.js, Fastify, Prisma, MongoDB, Docker. Liderança técnica, modelagem de domínio, SEO e e-commerce digital.",
  },
  {
    title: "Desenvolvedor Front-end",
    company: "AaccesOn",
    period: "Março de 2024 – Setembro de 2024",
    type: "CLT",
    description: "Desenvolvimento de SaaS e ERP para controle digital de eventos. Módulo de fluxo de caixa com integração em tempo real. TypeScript, React, Bootstrap, DBeaver, Git Flow, Docker.",
  },
  {
    title: "Estagiário Desenvolvedor Web",
    company: "Agência Formiga Digital",
    period: "Setembro de 2023 – Março de 2024",
    type: "Estágio",
    description: "Construção de interfaces e aplicações web com WordPress, HTML, CSS, JavaScript, PHP. Gerenciamento com phpMyAdmin e cPanel. Manutenção de aplicações em produção.",
  },
  {
    title: "Estagiário Técnico de Suporte em TI",
    company: "Evermart",
    period: "Março de 2023 – Agosto de 2023",
    type: "Estágio",
    description: "Resolução de chamados técnicos, testes de API com Postman, consultas em MongoDB, análise de dados com Excel. Fortalecimento de capacidade analítica e resolução de problemas.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-16">
          <Building2 className="text-primary-blue w-6 h-6" strokeWidth={1.5} />
          <div>
            <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-1">Career</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gray-600">{'<'}</span>
              Experience
              <span className="text-gray-600">{'/>'}</span>
            </h2>
          </div>
        </div>

        <div className="space-y-1">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative border-l-2 border-primary-blue/20 hover:border-primary-blue pl-8 py-6 transition-all duration-300"
            >
              <div className="absolute left-[-9px] top-8 w-4 h-4 border-2 border-primary-blue bg-primary-dark group-hover:bg-primary-blue transition-all duration-300"></div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="text-primary-blue w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                    <h3 className="text-lg md:text-xl font-bold text-gray-200 group-hover:text-primary-blue transition-colors">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-400 mb-1">{exp.company}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <p className="font-mono text-xs text-gray-600">{exp.period}</p>
                  <span className="font-mono text-xs px-2 py-1 border border-primary-blue/30 text-gray-500">
                    {exp.type}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
