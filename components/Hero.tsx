"use client";

import { TypeAnimation } from "react-type-animation";
import { MapPin, Code2 } from "lucide-react";
import SideCard, { type SideCardData } from "@/components/SideCard";

const sideCards: SideCardData[] = [
  {
    label: "Comunidade",
    stat: "+14.500 devs",
    title: "Servidor dos\nProgramadores",
    href: "/comunidade",
    bg: "/sdp/community-bg.png",
    borderClass: "border border-white/10 hover:border-[#5865F2]/50",
    labelClass: "text-[#5865F2]/80",
  },
  {
    label: "Itaú Unibanco",
    stat: "3 projetos\n1 palestra\n1 workshop",
    title: "Software\nEngineer",
    bg: "/itau/itau-bg.jpg",
    borderClass: "border border-[#EC7000]/30 hover:border-[#EC7000]/60",
    labelClass: "text-[#EC7000]/80",
  },
  {
    label: "Alura",
    stat: "Alura Stars\nInfluenciador",
    title: "Embaixador\nTech",
    bg: "/alura/alura.jpg",
    borderClass: "border border-[#1572E8]/30 hover:border-[#1572E8]/60",
    labelClass: "text-[#1572E8]/80",
  },
];

export default function Hero() {
  return (
    <section id="about" className="flex flex-col lg:flex-row gap-4 items-stretch">

      {/* Hero card — foto + info */}
      <div className="bento-card border border-primary-blue/20 hover:border-primary-blue/30 p-6 md:p-8 gap-0 flex-1">
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8">

          {/* Foto */}
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="relative w-28 h-28 md:w-32 md:h-32">
              <div className="absolute inset-0 rounded-full border-2 border-primary-blue/30 bg-primary-blue/10 flex items-center justify-center">
                <span className="font-mono text-2xl font-bold text-primary-blue select-none">CA</span>
              </div>
              <img
                src="/caio/caio.jpg"
                alt="Caio André"
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[9px] text-green-500 uppercase tracking-widest">Online</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="text-primary-blue w-4 h-4" strokeWidth={1.5} />
              <span className="bento-label">Software_Engineer</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-gray-400">&lt;</span>
              <TypeAnimation
                sequence={["Caio André"]}
                wrapper="span"
                speed={{ type: "keyStrokeDelayInMs", value: 80 }}
                cursor={true}
                repeat={0}
                className="text-glow"
              />
              <span className="text-gray-400">/&gt;</span>
            </h1>

            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Engenheiro de Software focado em Python, AWS e GenAI.
              Criador de conteúdo e fundador de comunidades de tecnologia.
            </p>

            <div className="flex items-center gap-1.5 mt-3">
              <MapPin className="text-gray-400 w-3 h-3" strokeWidth={1.5} />
              <span className="font-mono text-[10px] text-gray-400">São Paulo, SP</span>
            </div>
          </div>

        </div>
      </div>

      {/* Cards laterais */}
      <div className="flex flex-col gap-2 lg:w-[220px] flex-shrink-0">
        {sideCards.map((card) => (
          <SideCard key={card.label} card={card} />
        ))}
      </div>

    </section>
  );
}
