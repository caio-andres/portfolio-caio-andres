import { Users, Handshake } from "lucide-react";
import MeetupImageCarousel from "@/components/comunidade/MeetupImageCarousel";
import PartnersCarousel from "@/components/comunidade/PartnersCarousel";

const meetups = [
  {
    edition: "1ª Edição",
    date: "Setembro 2025",
    attendees: "+70",
    speakers: 3,
    mentors: 8,
    description:
      "Primeiro encontro presencial da comunidade em São Paulo. Palestras técnicas, mentorias e muito networking.",
    images: [
      "/sdp/meetup/serena-set-2025/1758071330979.jpeg",
      "/sdp/meetup/serena-set-2025/1758071335555.jpeg",
      "/sdp/meetup/serena-set-2025/1758071336222.jpeg",
      "/sdp/meetup/serena-set-2025/1758071342276.jpeg",
    ],
    venueLogo: "/sdp/meetup/serena-set-2025/newhack.png",
    venueName: "Newhack",
  },
  {
    edition: "2ª Edição",
    date: "Fevereiro 2026",
    attendees: "+100",
    speakers: 3,
    mentors: undefined,
    description:
      "Segunda edição com crescimento expressivo. Mais pessoas, mais conteúdo e conexões que ficam.",
    images: [
      "/sdp/meetup/oracle-fev-2026/1770565893214.jpeg",
      "/sdp/meetup/oracle-fev-2026/1770565893301.jpeg",
      "/sdp/meetup/oracle-fev-2026/1770565893303.jpeg",
      "/sdp/meetup/oracle-fev-2026/1770565893340.jpeg",
    ],
    venueLogo: "/sdp/meetup/oracle-fev-2026/Oracle-Symbol.png",
    venueName: "Oracle",
  },
];

export default function CommunityBody() {
  return (
    <div className="space-y-10 py-4">

      {/* Meetups */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Users className="text-primary-blue w-5 h-5" strokeWidth={1.5} />
          <div>
            <p className="bento-label mb-0.5">Eventos</p>
            <h2 className="section-title">
              <span className="text-gray-500">{"<"}</span>
              MeetUps
              <span className="text-gray-500">{"/>"}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetups.map((meetup) => (
            <div
              key={meetup.edition}
              className="bento-card border border-primary-blue/20 hover:border-primary-blue/40 p-0 overflow-hidden gap-0"
            >
              <MeetupImageCarousel images={meetup.images} alt={`MeetUp ${meetup.edition}`} />

              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-primary-blue uppercase tracking-widest">
                    {meetup.edition}
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={meetup.venueLogo}
                      alt={meetup.venueName}
                      className="h-5 w-auto object-contain"
                    />
                    <span className="font-mono text-xs text-gray-300">{meetup.date}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed">
                  {meetup.description}
                </p>

                <div className="flex gap-6">
                  <div>
                    <p className="text-2xl font-bold text-primary-blue">{meetup.attendees}</p>
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">pessoas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{meetup.speakers}</p>
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">palestrantes</p>
                  </div>
                  {meetup.mentors && (
                    <div>
                      <p className="text-2xl font-bold text-white">{meetup.mentors}</p>
                      <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">mentores</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parcerias */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Handshake className="text-primary-blue w-5 h-5" strokeWidth={1.5} />
          <div>
            <p className="bento-label mb-0.5">Apoiadores</p>
            <h2 className="section-title">
              <span className="text-gray-500">{"<"}</span>
              Parcerias
              <span className="text-gray-500">{"/>"}</span>
            </h2>
          </div>
        </div>

        <PartnersCarousel />
      </div>

    </div>
  );
}
