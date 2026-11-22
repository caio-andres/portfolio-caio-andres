import { now, nowUpdatedAt } from "@/lib/data/profile";
import { formatMonth } from "@/lib/data/experience";

export function NowSection() {
  return (
    <section aria-labelledby="now-title" className="mt-20 md:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id="now-title" className="text-h2 font-bold text-white">
          O que eu ando fazendo
        </h2>
        <p className="meta">
          atualizado em <time dateTime={nowUpdatedAt}>{formatMonth(nowUpdatedAt)}</time>
        </p>
      </div>

      <dl className="mt-6 border-y border-line">
        {now.map((item) => (
          <div key={item.label} className="grid gap-1 border-b border-line py-4 last:border-b-0 md:grid-cols-[11rem_1fr] md:gap-6">
            <dt className="font-mono text-small text-blue-text">{item.label}</dt>
            <dd className="max-w-[70ch] text-body text-fg">{item.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
