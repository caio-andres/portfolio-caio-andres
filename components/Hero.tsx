"use client";

import { ChevronDown, Code2 } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import {
  SiGithub,
  SiLinkedin,
  SiYoutube,
  SiInstagram,
  SiTiktok,
  SiDiscord,
} from "react-icons/si";

const socials = [
  { icon: SiGithub,    label: "GitHub",    url: "https://github.com/caio-andres/" },
  { icon: SiLinkedin,  label: "LinkedIn",  url: "https://www.linkedin.com/in/caio-andres/" },
  { icon: SiYoutube,   label: "YouTube",   url: "https://www.youtube.com/@caio_andress" },
  { icon: SiInstagram, label: "Instagram", url: "https://www.instagram.com/caio_andress" },
  { icon: SiTiktok,    label: "TikTok",    url: "https://www.tiktok.com/@caio_andres" },
  { icon: SiDiscord,   label: "Discord",   url: "https://discord.gg/programador" },
];

const skills = ["Python", "AWS", "Terraform", "GenAI", "TypeScript", "Next.js", "Docker"];

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 pt-24 pb-20"
    >
      <div className="container mx-auto max-w-5xl w-full">

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:auto-rows-[180px]">

          {/* Card 1 — Nome: col 1, rows 1-2 no desktop */}
          <div className="col-span-2 md:col-span-1 md:row-span-2 bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/40 group">
            <div className="flex items-center gap-2">
              <Code2 className="text-primary-blue w-4 h-4 group-hover:rotate-90 transition-transform duration-500" strokeWidth={1.5} />
              <span className="bento-label">Software_Engineer</span>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">
                <span className="text-gray-700">&lt;</span>
                <TypeAnimation
                  sequence={["Caio André"]}
                  wrapper="span"
                  speed={{ type: "keyStrokeDelayInMs", value: 80 }}
                  cursor={true}
                  repeat={0}
                  className="text-glow"
                />
                <span className="text-gray-700">/&gt;</span>
              </h1>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Engenheiro de Software, criador de conteúdo e fundador de comunidade.
              </p>
            </div>
          </div>

          {/* Card 2 — Itaú */}
          <div className="bento-card border border-[#EC7000]/20 justify-between hover:border-[#EC7000]/50 hover:bg-[#EC7000]/5">
            <span className="bento-label">Empresa</span>
            <div>
              <div className="text-xl font-bold text-[#EC7000] mb-1 font-mono tracking-tight">itaú</div>
              <p className="text-gray-200 text-xs">Engenheiro de Software Jr.</p>
              <p className="text-gray-600 text-[10px] mt-1 font-mono">Python · AWS · Terraform</p>
            </div>
          </div>

          {/* Card 3 — Alura */}
          <div className="bento-card border border-[#1572E8]/20 justify-between hover:border-[#1572E8]/50 hover:bg-[#1572E8]/5">
            <span className="bento-label">Educação</span>
            <div>
              <div className="text-xl font-bold text-[#1572E8] mb-1 tracking-tight">alura</div>
              <p className="text-gray-200 text-xs">Embaixador</p>
              <p className="text-gray-600 text-[10px] mt-1 font-mono">Tech & Comunidade</p>
            </div>
          </div>

          {/* Card 4 — Skills: cols 2-3 no desktop */}
          <div className="col-span-2 bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/40">
            <span className="bento-label">Skills</span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] px-3 py-1 border border-primary-blue/20 text-gray-500 hover:text-primary-blue hover:border-primary-blue/50 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 5 — Redes: cols 1-2 no desktop */}
          <div className="col-span-2 bento-card border border-primary-blue/20 justify-between hover:border-primary-blue/40">
            <span className="bento-label">Redes</span>
            <div className="flex items-center gap-5 flex-wrap">
              {socials.map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 text-gray-500 hover:text-primary-blue transition-all hover:scale-110"
                  aria-label={label}
                >
                  <Icon size={20} />
                  <span className="font-mono text-[9px] text-gray-700">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Card 6 — AWS: col 3 no desktop */}
          <div className="col-span-2 md:col-span-1 bento-card border border-[#FF9900]/20 items-center justify-between hover:border-[#FF9900]/50 hover:bg-[#FF9900]/5">
            <span className="bento-label self-start">Certificação</span>
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

        <div className="flex justify-center mt-12 animate-bounce opacity-40">
          <ChevronDown className="text-primary-blue" size={24} strokeWidth={1} />
        </div>
      </div>
    </section>
  );
}
