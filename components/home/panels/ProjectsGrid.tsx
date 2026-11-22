"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import {
  MIN_STARS_TO_SHOW,
  categoryLabels,
  linkLabels,
  type Project,
  type ProjectCategory,
} from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type Filter = ProjectCategory | "todos";

const FILTERS: Filter[] = ["todos", "ia", "nuvem", "web", "open-source"];

function Stars({ count }: { count?: number }) {
  if (count === undefined || count < MIN_STARS_TO_SHOW) return null;
  return (
    <span className="inline-flex shrink-0 items-center gap-1 font-mono text-meta text-muted" title="estrelas no GitHub">
      <Star size={14} aria-hidden="true" className="fill-current text-[#e3b341]" />
      {count}
      <span className="sr-only">estrelas no GitHub</span>
    </span>
  );
}

function Links({ project }: { project: Project }) {
  if (project.links.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label={`Links de ${project.name}`}>
      {project.links.map((l) => (
        <li key={l.url}>
          <ExternalLink href={l.url} className="link inline-flex items-center gap-1 font-mono text-small" srHint={`(${project.name}, abre em nova aba)`}>
            {linkLabels[l.kind]}
            <ArrowUpRight size={14} aria-hidden="true" />
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
      {tags.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectsGrid({ projects, stars }: { projects: Project[]; stars: Record<string, number> }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const visible = projects.filter((p) => filter === "todos" || p.categories.includes(filter));
  const featured = visible.find((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <>
      <div role="group" aria-label="Filtrar projetos por categoria" className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "min-h-10 cursor-pointer border px-3 font-mono text-small transition-colors",
              filter === f ? "border-blue bg-blue/15 text-white" : "border-line text-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {f === "todos" ? "todos" : categoryLabels[f]}
          </button>
        ))}
      </div>
      <p role="status" aria-live="polite" className="meta mt-3">
        {visible.length} {visible.length === 1 ? "projeto" : "projetos"}
        {filter === "todos" ? "" : ` em ${categoryLabels[filter]}`}
      </p>

      {featured ? (
        <article data-project={featured.id} className="mt-6 grid gap-8 border border-blue/50 bg-panel/60 p-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:p-8">
          <div>
            <p className="font-mono text-meta text-blue-text">em destaque · {featured.period}</p>
            <h3 className="mt-2 text-h1 font-bold text-white">{featured.name}</h3>
            <p className="mt-3 text-lead text-fg">{featured.summary}</p>
            <p className="mt-4 max-w-[62ch] text-body text-muted">{featured.description}</p>
          </div>
          <dl className="space-y-6 md:border-l md:border-line md:pl-8">
            {featured.note ? (
              <div>
                <dt className="meta">onde já apareceu</dt>
                <dd className="mt-1 text-body text-fg">{featured.note.charAt(0).toUpperCase() + featured.note.slice(1)}</dd>
              </div>
            ) : null}
            <div>
              <dt className="meta">stack</dt>
              <dd className="mt-2">
                <Tags tags={featured.tags} />
              </dd>
            </div>
            {featured.links.length > 0 ? (
              <div>
                <dt className="meta">links</dt>
                <dd className="mt-2">
                  <Links project={featured} />
                </dd>
              </div>
            ) : (
              <div>
                <dt className="meta">código</dt>
                <dd className="mt-1 text-small text-muted">Ainda não é público.</dd>
              </div>
            )}
          </dl>
        </article>
      ) : null}

      {rest.length > 0 ? (
        <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2">
          {rest.map((p) => (
            <li key={p.id} data-project={p.id} className="flex flex-col bg-ink p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-h3 font-semibold text-white">{p.name}</h3>
                <Stars count={stars[p.id] ?? p.stars} />
              </div>
              <p className="meta mt-1">{p.period}</p>
              <p className="mt-3 text-body text-fg">{p.summary}</p>
              <p className="mt-2 text-body text-muted">{p.description}</p>
              <div className="mt-auto space-y-4 pt-5">
                <Tags tags={p.tags} />
                <Links project={p} />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
