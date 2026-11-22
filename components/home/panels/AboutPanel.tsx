import { ArrowUpRight } from "lucide-react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { certifications } from "@/lib/data/certifications";
import { bio, education, interests, languages, stack } from "@/lib/data/profile";

export function AboutPanel() {
  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
      <div className="min-w-0">
        <h2 className="text-h2 font-bold text-white">Sobre mim</h2>
        <div className="prose-body mt-5 max-w-[65ch] text-body text-muted">
          {bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <h3 className="mt-14 text-h3 font-semibold text-white">Stack que eu uso de verdade</h3>
        <dl className="mt-5 border-t border-line">
          {stack.map((group) => (
            <div key={group.area} className="grid gap-2 border-b border-line py-4 md:grid-cols-[10rem_1fr] md:gap-6">
              <dt className="font-mono text-small text-blue-text">{group.area}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2" aria-label={group.area}>
                  {group.items.map((item) => (
                    <li key={item} className="tag text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="mt-14 text-h3 font-semibold text-white">Fora do código</h3>
        <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((i) => (
            <li key={i.name} className="bg-ink p-4">
              <p className="text-body font-medium text-fg">{i.name}</p>
              <p className="meta mt-1">{i.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <aside className="space-y-12" aria-label="Certificações, formação e idiomas">
        <section aria-labelledby="certs-title">
          <h3 id="certs-title" className="text-h3 font-semibold text-white">
            Certificações
          </h3>
          <ul className="mt-5 space-y-3">
            {certifications.map((cert) => (
              <li key={cert.id} data-cert={cert.id} className="surface flex items-center gap-4 p-3">
                <img src={cert.image} alt={`Badge ${cert.name}`} width={240} height={240} loading="lazy" decoding="async" className="size-20 shrink-0" />
                <div className="min-w-0">
                  {cert.latest ? <p className="mb-1 font-mono text-meta text-online">mais recente</p> : null}
                  <p className="text-small font-medium leading-snug text-fg">{cert.name}</p>
                  <ExternalLink href={cert.verifyUrl} className="link mt-1 inline-flex items-center gap-1 text-meta">
                    verificar no Credly
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </ExternalLink>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="edu-title">
          <h3 id="edu-title" className="text-h3 font-semibold text-white">
            Formação
          </h3>
          <p className="mt-4 text-body text-fg">{education.degree}</p>
          <p className="text-small text-muted">{education.school}</p>
          <p className="meta mt-1">{education.period}</p>
        </section>

        <section aria-labelledby="lang-title">
          <h3 id="lang-title" className="text-h3 font-semibold text-white">
            Idiomas
          </h3>
          <dl className="mt-4 space-y-2">
            {languages.map((l) => (
              <div key={l.name} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-line pb-2">
                <dt className="text-body text-fg">{l.name}</dt>
                <dd className="meta">{l.level}</dd>
              </div>
            ))}
          </dl>
        </section>
      </aside>
    </div>
  );
}
