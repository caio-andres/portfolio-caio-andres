const skills = [
  "Python", "AWS", "Terraform", "GenAI",
  "TypeScript", "Next.js", "Node.js", "Docker",
  "React", "FastAPI", "PostgreSQL", "Redis",
];

export default function AboutContent() {
  return (
    <div className="py-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:auto-rows-[160px]">

      {/* Skills — col-span-2 */}
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

      {/* AWS Certification */}
      <div className="bento-card border border-[#FF9900]/20 items-center justify-between hover:border-[#FF9900]/40 hover:bg-[#FF9900]/5">
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

    </div>
  );
}
