import Link from "next/link";
import { Terminal } from "lucide-react";
import {
  SiGithub,
  SiLinkedin,
  SiYoutube,
  SiInstagram,
  SiTiktok,
  SiDiscord,
} from "react-icons/si";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/caio-andres/", icon: SiGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/caio-andres/", icon: SiLinkedin },
  { name: "YouTube", url: "https://www.youtube.com/@caio_andress", icon: SiYoutube },
  { name: "Instagram", url: "https://www.instagram.com/caio_andress", icon: SiInstagram },
  { name: "TikTok", url: "https://www.tiktok.com/@caio_andres", icon: SiTiktok },
  { name: "Discord", url: "https://discord.gg/programador", icon: SiDiscord },
];

const headerLinks = [
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
]

export default function Header() {
  return (
    <>
      <div className="scanline"></div>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-primary-dark/60 border-b border-primary-blue/10">
        <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Terminal className="text-primary-blue w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-mono text-sm tracking-wider text-gray-300 hover:text-primary-blue transition-colors">
              {"<"}caio.andre{"/>"}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {headerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs px-4 py-2 text-gray-500 hover:text-primary-blue transition-all relative group"
              >
                <span className="relative z-10">[{item.label}]</span>
                <span className="absolute inset-0 bg-primary-blue/5 scale-0 group-hover:scale-100 transition-transform"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-blue transition-all hover:scale-110"
                aria-label={name}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
