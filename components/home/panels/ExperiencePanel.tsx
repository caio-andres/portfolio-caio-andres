import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { communityRoles, formatPeriod, jobs, type CommunityRole } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

function RoleName({ role }: { role: CommunityRole }) {
  const content = (
    <>
      {role.name}
      <ArrowUpRight size={16} aria-hidden="true" className="ml-1 inline-block align-[-2px]" />
    </>
  );
  if (!role.href) return <>{role.name}</>;
  return role.external ? (
    <ExternalLink href={role.href} className="hover:text-blue-text">
      {content}
    </ExternalLink>
  ) : (
    <Link href={role.href} className="hover:text-blue-text">
      {content}
    </Link>
  );
}

export function ExperiencePanel() {
  return (
    <div>
      <h2 className="text-h2 font-bold text-white">Experiência</h2>
      <p className="mt-3 max-w-[60ch] text-body text-muted">Do suporte de TI à engenharia de software, em ordem do mais recente.</p>

      <ol className="mt-10 border-l border-line">
        {jobs.map((job) => {
          const current = !job.end;
          return (
            <li key={job.id} data-job={job.id} className="relative pb-12 pl-6 last:pb-0 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8 md:pl-8">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-2 -left-[5px] size-2.5 rounded-full",
                  current ? "bg-online ring-4 ring-online/20" : "bg-line-strong",
                )}
              />
              <div className="meta mb-2 md:mb-0 md:pt-0.5">
                <p>{formatPeriod(job.start, job.end)}</p>
                <p>{job.type}</p>
              </div>
              <div className="min-w-0">
                <p className={cn("font-mono text-small", job.companyClass)}>
                  {job.company}
                  {job.team ? <span className="text-faint"> · {job.team}</span> : null}
                </p>
                <h3 className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-h3 font-semibold text-white">
                  {job.role}
                  {current ? (
                    <span className="inline-flex items-center gap-1.5 border border-online/40 px-2 py-0.5 font-mono text-meta font-normal text-online">
                      atual
                    </span>
                  ) : null}
                </h3>
                <p className="mt-3 max-w-[68ch] text-body text-muted">{job.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
                  {job.tags.map((t) => (
                    <li key={t} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <h2 className="mt-20 text-h2 font-bold text-white">Comunidade e conteúdo</h2>
      <p className="mt-3 max-w-[60ch] text-body text-muted">Fora do expediente: comunidade, eventos e conteúdo.</p>
      <ul className="mt-8 grid gap-px border border-line bg-line md:grid-cols-2">
        {communityRoles.map((role) => (
          <li key={role.id} className="bg-ink p-6">
            <p className="meta">{role.period}</p>
            <h3 className="mt-2 text-h3 font-semibold text-white">
              <RoleName role={role} />
            </h3>
            <p className="font-mono text-small text-blue-text">{role.role}</p>
            <p className="mt-3 text-body text-muted">{role.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
