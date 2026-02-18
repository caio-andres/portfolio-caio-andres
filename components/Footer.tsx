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

export default function Footer() {
  return (
    <footer className="border-t border-primary-blue/10 py-6 mt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-mono text-[10px] text-gray-600 tracking-widest">
        © 2026 <span className="text-primary-blue">caio_andres</span> — todos os direitos reservados
      </span>

      <div className="flex items-center gap-5">
        {socials.map(({ icon: Icon, label, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-gray-600 hover:text-primary-blue transition-colors hover:scale-110  duration-200"
          >
            <Icon size={15} />
          </a>
        ))}
      </div>
    </footer>
  );
}
