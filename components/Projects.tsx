"use client";

import { ExternalLink, Github, FolderGit2 } from "lucide-react";

interface Project {
  title: string;
  period: string;
  description: string;
  tags?: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "JFlux",
    period: "Agosto de 2025 – Atual",
    description: "Solução de engenharia aplicada à observabilidade e performance de aplicações Java. Analisa logs e traces diretamente da JVM, identificando gargalos e propondo otimizações através de fluxo de LLM estruturado em ToT (Tree of Thoughts). Apresentado na Oracle.",
    tags: ["Java", "Python", "LLM", "ToT", "Observabilidade", "Performance"],
  },
  {
    title: "YouRoadmaps",
    period: "Dezembro de 2024 – Atual",
    description: "Plataforma SaaS de educação digital que transformou +100 alunos no primeiro mês. Trilhas estruturadas do zero ao avançado em programação. Arquitetura em microsserviços com foco em escalabilidade e conversão.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "Fastify", "MongoDB", "Docker", "Tailwind CSS"],
    link: "https://youroadmaps.com",
  },
  {
    title: "Simple Programming Language",
    period: "Junho de 2024 – Dezembro de 2024",
    description: "Linguagem de programação interpretada desenvolvida na USJ. Construção completa incluindo motor de parsing, interpretação e interface de execução. Aplicação prática de estruturas de dados, análise léxica e sintática.",
    tags: ["TypeScript", "Node.js", "Express.js", "React", "Compiladores"],
  },
  {
    title: "SaaS & ERP",
    period: "Março de 2024 – Setembro de 2024",
    description: "Sistema corporativo para controle digital de eventos na AaccesOn. Desenvolvimento com NestJS e React, incluindo comunicação em tempo real, autenticação e funcionalidades corporativas escaláveis.",
    tags: ["TypeScript", "NestJS", "React", "Socket.io", "TypeORM", "Docker"],
  },
  {
    title: "Palestra GenAI - Itaú",
    period: "Setembro 2025",
    description: "Palestra sobre Agentes de GenAI no Itaú Unibanco, explicando conceitos, aplicações práticas e hands-on com as ferramentas disponíveis para colaboradores.",
    tags: ["GenAI", "Agentes", "Educação"],
  },
  {
    title: "MeetUp dos Programadores",
    period: "2025 – 2026",
    description: "Organizador e host do MeetUp dos Programadores. 1º edição (Set/2025): +70 pessoas, 3 palestrantes, 8 mentores. 2º edição (Fev/2026): +100 pessoas, 3 palestrantes.",
    tags: ["Comunidade", "Networking", "Educação"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-16">
          <FolderGit2 className="text-primary-blue w-6 h-6" strokeWidth={1.5} />
          <div>
            <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-1">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-gray-600">{'<'}</span>
              Projects
              <span className="text-gray-600">{'/>'}</span>
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative border border-primary-blue/10 bg-primary-dark/30 backdrop-blur-sm hover:border-primary-blue/40 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary-blue/0 group-hover:bg-primary-blue transition-all duration-500"></div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-200 group-hover:text-primary-blue transition-colors">
                        {project.title}
                      </h3>
                      {(project.link || project.github) && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-primary-blue transition-colors"
                              aria-label="Ver projeto"
                            >
                              <ExternalLink size={18} strokeWidth={1.5} />
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-primary-blue transition-colors"
                              aria-label="Ver no GitHub"
                            >
                              <Github size={18} strokeWidth={1.5} />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <p className="font-mono text-xs text-gray-600 mb-4">{project.period}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-6 font-light">
                  {project.description}
                </p>

                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="font-mono text-xs px-3 py-1 bg-primary-dark border border-primary-blue/20 text-gray-500 hover:text-primary-blue hover:border-primary-blue/50 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
