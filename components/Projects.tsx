import { ExternalLink, Github, FolderGit2 } from "lucide-react";

interface Project {
  title: string;
  period: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  badge?: string;
}

const projects: Project[] = [
  {
    title: "JFlux",
    period: "Agosto 2025 – Atual",
    description:
      "Solução de engenharia aplicada à observabilidade e performance de aplicações Java. Analisa logs e traces diretamente da JVM, identificando gargalos e propondo otimizações através de fluxo de LLM estruturado em ToT (Tree of Thoughts).",
    tags: ["Java", "Python", "LLM", "ToT", "Observabilidade", "Performance"],
    featured: true,
    badge: "Apresentado na Oracle",
  },
  {
    title: "YouRoadmaps",
    period: "Dezembro 2024 – Atual",
    description:
      "Plataforma SaaS de educação digital que transformou +100 alunos no primeiro mês. Trilhas estruturadas do zero ao avançado em programação. Microsserviços com foco em escalabilidade.",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Docker"],
    link: "https://youroadmaps.com",
  },
  {
    title: "Simple Programming Language",
    period: "Jun 2024 – Dez 2024",
    description:
      "Linguagem de programação interpretada desenvolvida na USJT. Motor de parsing, interpretação e interface de execução. Análise léxica e sintática aplicada.",
    tags: ["TypeScript", "Node.js", "Express.js", "React", "Compiladores"],
  },
  {
    title: "SaaS & ERP",
    period: "Mar 2024 – Set 2024",
    description:
      "Sistema corporativo para controle digital de eventos na AaccesOn. Comunicação em tempo real, autenticação e funcionalidades escaláveis.",
    tags: ["TypeScript", "NestJS", "React", "Socket.io", "Docker"],
  },
  {
    title: "Palestra GenAI",
    period: "Setembro 2025",
    description:
      "Palestra sobre Agentes de GenAI no Itaú Unibanco — conceitos, aplicações práticas e hands-on com ferramentas disponíveis.",
    tags: ["GenAI", "Agentes", "LLM", "Educação"],
    badge: "@ Itaú Unibanco",
  },
  {
    title: "MeetUp dos Programadores",
    period: "2025 – 2026",
    description:
      "Organizador e host. 1ª ed. (Set/25): +70 pessoas, 3 palestrantes, 8 mentores. 2ª ed. (Fev/26): +100 pessoas, 3 palestrantes.",
    tags: ["Comunidade", "Networking", "Educação"],
    badge: "2 edições",
  },
];

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <FolderGit2 className="text-primary-blue w-5 h-5" strokeWidth={1.5} />
          <div>
            <p className="bento-label mb-1">Portfolio</p>
            <h2 className="section-title">
              <span className="text-gray-700">{"<"}</span>
              Projects
              <span className="text-gray-700">{"/>"}</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:auto-rows-[200px]">

          {/* Featured: JFlux — full width mobile/md, 2×2 no desktop */}
          <div className="col-span-2 lg:col-span-2 lg:row-span-2 bento-card border border-primary-blue/30 justify-between hover:border-primary-blue/60 group">
            <div className="flex items-start justify-between gap-2">
              <span className="bento-label">Destaque</span>
              <span className="font-mono text-[9px] px-2 py-0.5 border border-primary-blue/40 text-primary-blue">
                FEATURED
              </span>
            </div>
            <div className="flex-1 my-3 lg:my-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-200 group-hover:text-primary-blue transition-colors mb-1">
                {featured.title}
              </h3>
              <p className="font-mono text-[10px] text-gray-600 mb-3">{featured.period}</p>
              <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-4 lg:line-clamp-none">
                {featured.description}
              </p>
            </div>
            <div>
              {featured.badge && (
                <p className="font-mono text-[10px] text-primary-blue mb-3">
                  → {featured.badge}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] px-2 py-0.5 border border-primary-blue/20 text-gray-500 hover:text-primary-blue hover:border-primary-blue/50 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Remaining projects */}
          {rest.map((project, i) => (
            <div
              key={i}
              className="bento-card border border-primary-blue/10 justify-between hover:border-primary-blue/40 group"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-2">
                <span className="bento-label">{project.period}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-blue transition-colors"
                      aria-label="Ver projeto"
                    >
                      <ExternalLink size={13} strokeWidth={1.5} />
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
                      <Github size={13} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title + description */}
              <div className="flex-1 my-2">
                <h3 className="text-sm font-bold text-gray-200 group-hover:text-primary-blue transition-colors mb-2 leading-tight">
                  {project.title}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-3 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom */}
              <div>
                {project.badge && (
                  <p className="font-mono text-[9px] text-gray-600 mb-2">→ {project.badge}</p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] px-2 py-0.5 border border-primary-blue/10 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="font-mono text-[9px] text-gray-700">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
