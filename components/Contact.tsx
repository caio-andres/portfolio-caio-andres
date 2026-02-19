import { GraduationCap, Mail, MessageCircle } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

export default function Contact() {
  return (
    <div id="contact" className="py-4">
      <div>

        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <GraduationCap className="text-primary-blue w-5 h-5" strokeWidth={1.5} />
          <div>
            <p className="bento-label mb-1">Get in touch</p>
            <h2 className="section-title">
              <span className="text-gray-500">{"<"}</span>
              Contact
              <span className="text-gray-500">{"/>"}</span>
            </h2>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:auto-rows-[180px]">

          

          {/* Card 3 — Email */}
          <a
            href="mailto:caioandres2112@gmail.com"
            className="bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/50 hover:bg-primary-blue/5 group"
          >
            <span className="bento-label">Email</span>
            <div>
              <Mail className="text-primary-blue mb-2 group-hover:scale-110 transition-transform" size={24} strokeWidth={1.5} />
              <p className="text-xs text-white font-light break-all">caioandres2112@gmail.com</p>
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
              <p className="text-xs text-white font-light">caio_andres</p>
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
              <p className="text-xs text-white font-light">in/caio-andres</p>
            </div>
          </a>

        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-primary-blue/10 flex items-center justify-between">
          <p className="font-mono text-[10px] text-gray-500">
            © 2026 [Caio André Porto de Oliveira]
          </p>
          <p className="font-mono text-[10px] text-gray-500">
            portfolio.v1
          </p>
        </div>

      </div>
    </div>
  );
}
