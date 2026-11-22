// Servidor dos Programadores: números, meetups e parceiros.

export const communityStats = [
  { value: "+14.500", label: "membros no Discord" },
  { value: "2023", label: "ano de fundação" },
  { value: "2", label: "meetups presenciais" },
  { value: "+170", label: "pessoas nos meetups" },
];

export const communityFeatures = [
  { title: "Ajuda por tecnologia", text: "Canais e painéis separados por linguagem e área, para a dúvida chegar em quem sabe responder." },
  { title: "Tickets de ajuda", text: "Quando a dúvida é grande demais para um canal, abre um ticket e alguém acompanha." },
  { title: "Vagas e oportunidades", text: "Vagas, freelas e indicações compartilhadas pela própria comunidade." },
  { title: "Eventos", text: "Lives, desafios e os meetups presenciais em São Paulo." },
];

export type Meetup = {
  id: string;
  edition: string;
  date: string;
  venue: string;
  venueLogo: string;
  description: string;
  numbers: { value: string; label: string }[];
  photos: { src: string; alt: string }[];
};

export const meetups: Meetup[] = [
  {
    id: "meetup-2",
    edition: "2ª edição",
    date: "fevereiro de 2026",
    venue: "Oracle",
    venueLogo: "/img/sdp/venues/oracle.webp",
    description: "Segunda edição, desta vez na Oracle. Mais gente, mais conteúdo e conexões que ficam.",
    numbers: [
      { value: "+100", label: "pessoas" },
      { value: "3", label: "palestrantes" },
    ],
    photos: [
      { src: "/img/sdp/meetup/oracle-fev-2026/1770565893301.webp", alt: "Foto em grupo com o público do 2º MeetUp dos Programadores na Oracle" },
      { src: "/img/sdp/meetup/oracle-fev-2026/1770565893340.webp", alt: "Auditório cheio durante uma palestra do 2º MeetUp" },
      { src: "/img/sdp/meetup/oracle-fev-2026/1770565893214.webp", alt: "Palestrantes e organização reunidos no palco do 2º MeetUp" },
      { src: "/img/sdp/meetup/oracle-fev-2026/1770565893303.webp", alt: "Público reunido em frente ao cartaz do 2º MeetUp dos Programadores" },
    ],
  },
  {
    id: "meetup-1",
    edition: "1ª edição",
    date: "setembro de 2025",
    venue: "Newhack",
    venueLogo: "/img/sdp/venues/newhack.webp",
    description: "O primeiro encontro presencial da comunidade, em São Paulo: palestras técnicas, mentorias e muito networking.",
    numbers: [
      { value: "+70", label: "pessoas" },
      { value: "3", label: "palestrantes" },
      { value: "8", label: "mentores" },
    ],
    photos: [
      { src: "/img/sdp/meetup/serena-set-2025/1758071335555.webp", alt: "Foto em grupo com os participantes do 1º MeetUp em frente à casa da Newhack" },
      { src: "/img/sdp/meetup/serena-set-2025/1758071330979.webp", alt: "Cartaz do MeetUp dos Programadores: palestras, painéis e networking" },
      { src: "/img/sdp/meetup/serena-set-2025/1758071342276.webp", alt: "Mesa de café montada para o 1º MeetUp" },
      { src: "/img/sdp/meetup/serena-set-2025/1758071336222.webp", alt: "Pulseira de participante do 1º MeetUp no pulso de um convidado" },
    ],
  },
];

export type Partner = {
  id: string;
  name: string;
  description: string;
  logo: string;
  /** Sem site confirmado = sem link (nunca link quebrado). */
  url?: string;
};

export const partners: Partner[] = [
  {
    id: "alura",
    name: "Alura",
    description: "Escola online de tecnologia. Apoia a comunidade com conteúdo e ações para os membros.",
    logo: "/img/sdp/partners/alura.webp",
    url: "https://www.alura.com.br",
  },
  {
    id: "shard-cloud",
    name: "Shard Cloud",
    description: "Hospedagem em nuvem para aplicações e bots, com infraestrutura escalável.",
    logo: "/img/sdp/partners/shard-cloud.webp",
    url: "https://shardcloud.app",
  },
  {
    id: "websec",
    name: "WebSec Brasil",
    description: "Comunidade de segurança web e cibersegurança.",
    logo: "/img/sdp/partners/websec.webp",
  },
];
