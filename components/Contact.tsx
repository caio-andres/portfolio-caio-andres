import { GraduationCap, Mail, MessageCircle } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-5xl">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <GraduationCap className="text-primary-blue w-5 h-5" strokeWidth={1.5} />
          <div>
            <p className="bento-label mb-1">Get in touch</p>
            <h2 className="section-title">
              <span className="text-gray-700">{"<"}</span>
              Contact
              <span className="text-gray-700">{"/>"}</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:auto-rows-[180px]">

          {/* Card 1 — Formação: col-span-2 */}
          <div className="md:col-span-2 bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/40">
            <span className="bento-label">Formação</span>
            <div>
              <h3 className="text-base font-bold text-gray-200 mb-1">
                Bacharelado em Ciência da Computação
              </h3>
              <p className="text-sm text-primary-blue font-light">Universidade São Judas Tadeu</p>
              <p className="font-mono text-[10px] text-gray-600 mt-2">
                Jan 2022 – Jun 2026 &nbsp;·&nbsp; 9º/9º semestre
              </p>
            </div>
          </div>

          {/* Card 2 — Status */}
          <div className="bento-card border border-green-500/20 justify-between hover:border-green-500/40 hover:bg-green-500/5">
            <span className="bento-label">Status</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span className="text-xs text-gray-300 font-light">Disponível para conversas</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-blue flex-shrink-0" />
                <span className="text-xs text-gray-300 font-light">São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-600 flex-shrink-0" />
                <span className="text-xs text-gray-500 font-mono text-[10px]">Eng. Software Jr.</span>
              </div>
            </div>
          </div>

          {/* Card 3 — Email */}
          <a
            href="mailto:caioandres2112@gmail.com"
            className="bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/50 hover:bg-primary-blue/5 group"
          >
            <span className="bento-label">Email</span>
            <div>
              <Mail className="text-primary-blue mb-2 group-hover:scale-110 transition-transform" size={24} strokeWidth={1.5} />
              <p className="text-xs text-gray-300 font-light break-all">caioandres2112@gmail.com</p>
            </div>
          </a>

          {/* Card 4 — Discord */}
          <a
            href="https://discord.com/users/caio_andres"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card border border-[#5865F2]/20 justify-between hover:border-[#5865F2]/50 hover:bg-[#5865F2]/5 group"
          >
            <span className="bento-label">Discord</span>
            <div>
              <MessageCircle className="text-[#5865F2] mb-2 group-hover:scale-110 transition-transform" size={24} strokeWidth={1.5} />
              <p className="text-xs text-gray-300 font-light">caio_andres</p>
            </div>
          </a>

          {/* Card 5 — LinkedIn */}
          <a
            href="https://www.linkedin.com/in/caio-andres/"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card border border-[#0A66C2]/20 justify-between hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/5 group"
          >
            <span className="bento-label">LinkedIn</span>
            <div>
              <SiLinkedin className="text-[#0A66C2] mb-2 group-hover:scale-110 transition-transform" size={24} />
              <p className="text-xs text-gray-300 font-light">in/caio-andres</p>
            </div>
          </a>

        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-primary-blue/10 flex items-center justify-between">
          <p className="font-mono text-[10px] text-gray-700">
            © 2026 [Caio André Porto de Oliveira]
          </p>
          <p className="font-mono text-[10px] text-gray-800">
            portfolio.v1
          </p>
        </div>

      </div>
    </section>
  );
}
