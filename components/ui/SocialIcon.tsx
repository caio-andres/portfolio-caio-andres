import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiDiscord, SiGithub, SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import type { SocialId } from "@/lib/site";

// Ícones de marca vêm do react-icons (o LinkedIn saiu do Simple Icons, por isso fa6).
const icons: Record<SocialId, IconType> = {
  github: SiGithub,
  linkedin: FaLinkedinIn,
  youtube: SiYoutube,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  discord: SiDiscord,
};

export function SocialIcon({ id, size = 18, className }: { id: SocialId; size?: number; className?: string }) {
  const Icon = icons[id];
  return <Icon size={size} className={className} aria-hidden="true" focusable="false" />;
}
