const skills = [
  "Python",
  "AWS",
  "Terraform",
  "GenAI",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Docker",
  "React",
  "FastAPI",
  "PostgreSQL",
  "Redis",
];

export default function AboutContent() {
  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:auto-rows-[160px]">
      {/* Card 1 - Skills */}
      <div className="md:col-span-2 bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/40">
        <span className="bento-label">Skills</span>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[10px] px-3 py-1 border border-primary-blue/20 text-gray-400 hover:text-primary-blue hover:border-primary-blue/50 transition-all cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card 2 - AWS Certification */}
      <div className="bento-card border border-primary-blue/20 items-center justify-between hover:border-primary-blue/40">
        <span className="bento-label self-start">Certificações</span>
        <a
          href="https://www.credly.com/badges/91cc8685-4c19-4f44-a61d-2f0b66158540"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src="https://images.credly.com/size/110x110/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
            alt="AWS Certified Cloud Practitioner"
            className="w-16 h-16"
          />
        </a>
      </div>

      {/* Card 3 — Formação */}
      <div className="md:col-span-2 bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/40">
        <span className="bento-label">Formação</span>
        <div>
          <h3 className="text-base font-bold text-gray-200 mb-1">
            Bacharelado em Ciência da Computação
          </h3>
          <p className="text-sm text-primary-blue font-light">
            Universidade São Judas Tadeu
          </p>
          <p className="font-mono text-[10px] text-gray-600 mt-2">
            Jan 2022 – Jun 2026 &nbsp;·&nbsp; 9º/9º semestre
          </p>
        </div>
      </div>

      {/* Card 4 — Status */}
      <div className="bento-card border border-green-500/20 justify-between hover:border-green-500/40 hover:bg-green-500/5">
        <span className="bento-label">Status</span>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            <span className="text-xs text-white font-light">
              Disponível para conversas
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-blue flex-shrink-0" />
            <span className="text-xs text-white font-light">São Paulo, SP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EC7000] flex-shrink-0" />
            <span className="text-xs text-white font-mono text-[10px]">
              Eng. Software Jr.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
