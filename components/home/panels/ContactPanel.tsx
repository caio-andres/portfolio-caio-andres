import { ArrowUpRight, Mail } from "lucide-react";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { DISCORD_INVITE, person, socials } from "@/lib/site";

const MAILTO = `mailto:${person.email}?subject=${encodeURIComponent("Oi, Caio! Vim pelo site")}`;

export function ContactPanel() {
  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 className="text-h1 font-bold text-white">Bora conversar?</h2>
        <p className="mt-4 max-w-[52ch] text-body text-muted">
          O jeito mais rápido é e-mail ou LinkedIn. Pode mandar vaga, convite para palestra, parceria para a comunidade ou aquela
          dúvida que surgiu num vídeo.
        </p>

        <div className="mt-8 border border-line p-5">
          <p className="meta">e-mail</p>
          <a href={MAILTO} className="mt-1 block font-mono text-lead break-all text-white hover:text-blue-text">
            {person.email}
          </a>
          <div className="mt-5 flex flex-wrap gap-3">
            <CopyEmailButton email={person.email} />
            <a href={MAILTO} className="btn-ghost">
              <Mail size={16} aria-hidden="true" />
              Abrir no app de e-mail
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-[52ch] text-small text-muted">
          Quer entrar na comunidade?{" "}
          <ExternalLink href={DISCORD_INVITE} className="link">
            O convite do Discord é aberto
          </ExternalLink>
          .
        </p>
      </div>

      <div>
        <h3 className="text-h3 font-semibold text-white">Onde mais me achar</h3>
        <ul className="mt-5 border-t border-line">
          {socials.map((s) => (
            <li key={s.id} className="border-b border-line">
              <ExternalLink
                href={s.url}
                className="group flex min-h-14 items-center gap-4 py-3 text-fg transition-colors hover:text-white"
                srHint={false}
              >
                <SocialIcon id={s.id} size={20} className="text-muted transition-colors group-hover:text-blue-text" />
                <span className="text-body">{s.label}</span>
                <span className="ml-auto font-mono text-small text-faint">{s.handle}</span>
                <ArrowUpRight size={16} aria-hidden="true" className="text-faint group-hover:text-blue-text" />
                <span className="sr-only">(abre em nova aba)</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
