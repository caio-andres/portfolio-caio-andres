import { ExternalLink } from "lucide-react";

type Partner = {
  name: string;
  description: string;
  url: string;
  logo?: string;
  borderClass: string;
  labelClass: string;
};

const partners: Partner[] = [
  {
    name: "Alura",
    description: "Plataforma líder de cursos de tecnologia no Brasil.",
    url: "https://www.alura.com.br",
    logo: "/sdp/parceiros/alura.png",
    borderClass: "border-[#1572E8]/40 hover:border-[#1572E8]/80",
    labelClass: "text-[#1572E8]",
  },
  {
    name: "Shard Cloud",
    description: "Soluções em cloud computing e infraestrutura escalável.",
    url: "https://shardcloud.com.br",
    logo: "/sdp/parceiros/shard_cloud.png",
    borderClass: "border-[#7C3AED]/40 hover:border-[#7C3AED]/80",
    labelClass: "text-[#7C3AED]",
  },
  {
    name: "WebSec Brasil",
    description: "Comunidade referência em segurança web e cibersegurança.",
    url: "https://websecbrasil.com.br",
    logo: "/sdp/parceiros/websec.png",
    borderClass: "border-[#16A34A]/40 hover:border-[#16A34A]/80",
    labelClass: "text-[#16A34A]",
  }
];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex-shrink-0 w-56 flex flex-col justify-between p-4 border bg-primary-dark/50 transition-all duration-300 ${partner.borderClass}`}
    >
      <div className="flex items-start justify-end">
        <ExternalLink
          size={11}
          className={`opacity-0 group-hover:opacity-100 transition-opacity ${partner.labelClass}`}
          strokeWidth={1.5}
        />
      </div>
      <div>
        {partner.logo ? (
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-8 w-auto object-contain mb-3"
          />
        ) : (
          <p className={`text-base font-bold mb-2 ${partner.labelClass}`}>{partner.name}</p>
        )}
        <p className="text-xs text-gray-300 leading-snug">{partner.description}</p>
      </div>
    </a>
  );
}

export default function PartnersCarousel() {
  const doubled = [...partners, ...partners];

  return (
    <div className="overflow-hidden group">
      <div className="flex gap-3 animate-marquee w-max group-hover:[animation-play-state:paused]">
        {doubled.map((partner, i) => (
          <PartnerCard key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}
