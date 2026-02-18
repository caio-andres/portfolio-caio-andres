import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import CommunityBody from "@/components/comunidade/CommunityBody";

export const metadata: Metadata = {
  title: "Comunidade — Servidor dos Programadores",
  description:
    "Conheça o Servidor dos Programadores: meetups, parcerias e a maior comunidade de devs do Brasil.",
};

export default function ComunidadePage() {
  return (
    <main className="relative">
      <div className="pt-8 pb-16">
        <div className="container mx-auto max-w-5xl px-6 space-y-10">

          {/* Voltar */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-gray-300 hover:text-primary-blue transition-colors"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            voltar
          </Link>

          {/* Community Hero */}
          <div
            className="relative overflow-hidden bento-card border border-white/10 p-8 md:p-12 min-h-[260px] justify-between bg-clip-padding"
            style={{
              backgroundImage: "url('/sdp/community-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/80" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <SiDiscord size={14} className="text-[#5865F2]" />
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                  Servidor dos Programadores
                </span>
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Comunidade</h1>
                <p className="text-gray-200 max-w-lg leading-relaxed">
                  O maior servidor de programadores do Brasil. Networking, vagas,
                  eventos mensais e muito conteúdo técnico.
                </p>
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                <a
                  href="https://discord.gg/programador"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-sm font-medium text-white bg-[#5865F2] hover:bg-[#4752C4] px-5 py-2.5 transition-all duration-200"
                >
                  <SiDiscord size={14} />
                  Entrar no Discord
                </a>
                <span className="font-mono text-sm text-[#5865F2]">+14.500 devs</span>
              </div>
            </div>
          </div>

          <CommunityBody />

        </div>
      </div>
    </main>
  );
}
