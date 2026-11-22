import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiDiscord } from "react-icons/si";
import { MeetupGallery } from "@/components/community/MeetupGallery";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { communityFeatures, communityStats, meetups, partners } from "@/lib/data/community";
import { pageMetadata } from "@/lib/seo";
import { DISCORD_INVITE } from "@/lib/site";

const DESCRIPTION =
  "Servidor dos Programadores: comunidade no Discord com mais de 14.500 devs, fundada pelo Caio André em 2023. Tira-dúvidas, vagas, eventos e MeetUps presenciais em São Paulo.";

export const metadata: Metadata = pageMetadata({ title: "Servidor dos Programadores", description: DESCRIPTION, path: "/comunidade" });

export default function ComunidadePage() {
  return (
    <>
      <Link href="/" className="inline-flex min-h-10 items-center gap-2 font-mono text-small text-muted transition-colors hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" />
        voltar
      </Link>

      <section aria-labelledby="sdp-title" className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
        {/* O banner já traz o nome da comunidade escrito; fica inteiro e sem texto por cima. */}
        <img
          src="/img/sdp/community-bg.webp"
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="aspect-video w-full border border-line object-cover lg:order-last"
        />
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-small text-discord-text">
            <SiDiscord size={16} aria-hidden="true" />
            comunidade no Discord
          </p>
          <h1 id="sdp-title" className="mt-4 text-[clamp(2.5rem,1.6rem+3.2vw,3.75rem)] leading-[1.05] font-bold tracking-tight text-white">
            Servidor dos Programadores
          </h1>
          <p className="mt-5 text-lead text-fg">
            Um lugar para quem programa ou quer começar: tira-dúvidas, vagas, eventos e gente disposta a ajudar. Criei em 2023 e hoje
            somos mais de 14.500.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ExternalLink
              href={DISCORD_INVITE}
              className="inline-flex min-h-11 items-center gap-2 border border-[#4752c4] bg-[#4752c4] px-5 font-mono text-small text-white transition-colors hover:bg-[#3c46b0]"
            >
              <SiDiscord size={16} aria-hidden="true" />
              Entrar no Discord
            </ExternalLink>
            <span className="font-mono text-small text-muted">o convite é aberto</span>
          </div>
        </div>
      </section>

      <dl className="mt-12 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
        {communityStats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse bg-ink p-5">
            <dt className="meta mt-1">{s.label}</dt>
            <dd className="text-h1 font-bold text-white">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="features-title" className="mt-20">
        <h2 id="features-title" className="text-h2 font-bold text-white">
          O que rola por lá
        </h2>
        <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2">
          {communityFeatures.map((f) => (
            <li key={f.title} className="bg-ink p-6">
              <h3 className="text-h3 font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-body text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="meetups" aria-labelledby="meetups-title" className="mt-20 scroll-mt-8">
        <h2 id="meetups-title" className="text-h2 font-bold text-white">
          MeetUp dos Programadores
        </h2>
        <p className="mt-3 max-w-[60ch] text-body text-muted">
          Quando a comunidade sai do Discord: encontros presenciais em São Paulo com palestras, mentorias e networking.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {meetups.map((m) => (
            <article key={m.id} aria-labelledby={`${m.id}-title`} className="surface flex flex-col">
              <MeetupGallery photos={m.photos} label={`Fotos da ${m.edition} do MeetUp`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 id={`${m.id}-title`} className="text-h3 font-semibold text-white">
                      {m.edition}
                    </h3>
                    <p className="meta">
                      {m.date} · {m.venue}
                    </p>
                  </div>
                  <img src={m.venueLogo} alt={m.venue} width={160} height={96} loading="lazy" className="h-9 w-auto object-contain" />
                </div>
                <p className="mt-4 text-body text-muted">{m.description}</p>
                <dl className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-6">
                  {m.numbers.map((n) => (
                    <div key={n.label} className="flex flex-col-reverse">
                      <dt className="meta">{n.label}</dt>
                      <dd className="text-h2 font-bold text-white">{n.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="partners-title" className="mt-20">
        <h2 id="partners-title" className="text-h2 font-bold text-white">
          Parceiros
        </h2>
        <p className="mt-3 max-w-[60ch] text-body text-muted">Quem apoia a comunidade e ajuda a fazer os eventos acontecerem.</p>
        <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
          {partners.map((p) => (
            <li key={p.id} data-partner={p.id} className="flex flex-col bg-ink p-6">
              <img src={p.logo} alt="" width={128} height={128} loading="lazy" className="size-12 object-contain" />
              <h3 className="mt-4 text-h3 font-semibold text-white">{p.name}</h3>
              <p className="mt-2 text-body text-muted">{p.description}</p>
              {p.url ? (
                <ExternalLink href={p.url} className="link mt-auto inline-flex items-center gap-1 pt-4 font-mono text-small">
                  {new URL(p.url).hostname.replace(/^www\./, "")}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </ExternalLink>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cta-title" className="mt-20 border border-discord/40 p-6 md:p-10">
        <h2 id="cta-title" className="text-h2 font-bold text-white">
          Bora entrar?
        </h2>
        <p className="mt-3 max-w-[55ch] text-body text-muted">É de graça, é em português e tem gente de todo nível, de quem está no primeiro &ldquo;hello world&rdquo; a quem já lidera time.</p>
        <ExternalLink
          href={DISCORD_INVITE}
          className="mt-6 inline-flex min-h-11 items-center gap-2 border border-[#4752c4] bg-[#4752c4] px-5 font-mono text-small text-white transition-colors hover:bg-[#3c46b0]"
        >
          <SiDiscord size={16} aria-hidden="true" />
          Entrar no Discord
        </ExternalLink>
      </section>
    </>
  );
}
