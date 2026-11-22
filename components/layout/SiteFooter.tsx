import { ExternalLink } from "@/components/ui/ExternalLink";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { BUILD_SHA, REPO_URL, socials } from "@/lib/site";

export function SiteFooter() {
  // A página é renderizada a cada requisição, então o ano está sempre certo.
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto mt-24 max-w-[1120px] px-5 pb-10 md:px-8">
      <div className="flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-small text-fg">© {year} Caio André. Feito em São Paulo.</p>
          <p className="max-w-[52ch] text-small text-muted">
            Este site não usa cookies nem rastreia ninguém. O{" "}
            <ExternalLink href={REPO_URL} className="link">
              código é aberto
            </ExternalLink>{" "}
            e quem achar uma falha pode seguir o{" "}
            <a href="/.well-known/security.txt" className="link">
              security.txt
            </a>
            .
          </p>
          <p className="meta">
            build <span className="text-muted">{BUILD_SHA}</span>
          </p>
        </div>

        <ul className="flex flex-wrap gap-1" aria-label="Redes sociais">
          {socials.map((s) => (
            <li key={s.id}>
              <ExternalLink
                href={s.url}
                className="inline-flex size-11 items-center justify-center border border-transparent text-muted transition-colors hover:border-line hover:text-white"
                srHint={false}
              >
                <SocialIcon id={s.id} />
                <span className="sr-only">{s.label} (abre em nova aba)</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
