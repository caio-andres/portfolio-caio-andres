import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TabLink } from "@/components/home/TabLink";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { heroCards, heroLead, heroProps, photoCaption, type HeroCard } from "@/lib/data/profile";
import { person } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * O nome é "digitado" letra a letra só com CSS (.type-in). O texto completo
 * está no HTML desde o servidor, então buscador, leitor de tela e quem desliga
 * animação veem "Caio André" na hora.
 */
function TypedName({ name }: { name: string }) {
  return (
    <span className="type-in">
      {Array.from(name).map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </span>
  );
}

function CardBody({ card }: { card: HeroCard }) {
  return (
    <>
      {/* Imagem e texto separados: as imagens já têm texto próprio (logos), e
          texto em cima de texto fica ilegível. */}
      <span aria-hidden="true" className={cn("relative block h-24 bg-cover bg-center", card.bgClass)}>
        <span className="absolute inset-0 bg-gradient-to-t from-panel to-transparent to-70%" />
      </span>
      <span className="flex flex-1 flex-col gap-1 px-5 pt-3 pb-5">
        <span className={cn("font-mono text-meta", card.accentClass)}>{card.org}</span>
        <span className="flex items-center justify-between gap-3 text-h3 font-semibold text-white">
          {card.title}
          {card.href ? (
            <ArrowUpRight size={20} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          ) : null}
        </span>
        <span className="text-small text-muted">{card.detail}</span>
      </span>
    </>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-name" className="pt-6 md:pt-12">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <h1 id="hero-name" aria-label={person.name} className="text-display font-bold tracking-tight text-white">
            <span aria-hidden="true" className="mr-1 font-mono font-normal text-faint">&lt;</span>
            <TypedName name={person.name} />
            <span aria-hidden="true" className="caret ml-1 inline-block w-[0.08em] translate-y-[0.08em] bg-blue-text align-baseline">
              &nbsp;
            </span>
          </h1>

          {/* As props do "componente" Caio André. */}
          <dl className="reveal-lines mt-4 space-y-1 pl-[0.9em] font-mono text-body sm:text-lead">
            {heroProps.map((p) => (
              <div key={p.name} className="flex">
                <dt className="text-blue-text">{p.name}</dt>
                <dd className="min-w-0 text-fg">
                  <span className="text-faint" aria-hidden="true">=&quot;</span>
                  <span className="sr-only">: </span>
                  {p.value}
                  <span className="text-faint" aria-hidden="true">&quot;</span>
                </dd>
              </div>
            ))}
          </dl>
          <p aria-hidden="true" className="mt-3 font-mono text-[2.75rem]/none text-faint">
            /&gt;
          </p>

          <p className="mt-8 max-w-[60ch] text-lead text-muted">{heroLead}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TabLink tab="projects" className="btn-primary">
              Ver projetos
              <ArrowRight size={16} aria-hidden="true" />
            </TabLink>
            <CopyEmailButton email={person.email} />
          </div>
        </div>

        <figure>
          <div className="relative border border-line">
            <img
              src="/img/caio/caio.webp"
              alt="Caio André sorrindo na frente do setup, com um monitor na horizontal e outro na vertical cheio de código"
              width={720}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="h-72 w-full object-cover object-[50%_30%] md:aspect-[4/5] md:h-auto"
            />
            <span className="absolute top-3 left-3 inline-flex items-center gap-2 border border-line bg-ink/85 px-2.5 py-1 font-mono text-meta text-fg">
              <span aria-hidden="true" className="size-2 rounded-full bg-online" />
              disponível para conversas
            </span>
          </div>
          <figcaption className="meta mt-3">{photoCaption}</figcaption>
        </figure>
      </div>

      <ul className="mt-14 grid gap-3 sm:grid-cols-3" aria-label="Onde estou">
        {heroCards.map((card) => (
          <li key={card.id}>
            {card.href ? (
              <Link
                href={card.href}
                className={cn("group flex h-full flex-col overflow-hidden border bg-panel transition-colors", card.borderClass)}
              >
                <CardBody card={card} />
              </Link>
            ) : (
              <div className={cn("flex h-full flex-col overflow-hidden border bg-panel", card.borderClass)}>
                <CardBody card={card} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
