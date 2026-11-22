import type { Metadata } from "next";
import Link from "next/link";

// O Next já marca a 404 com noindex sozinho.
export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="grid min-h-[60vh] items-center gap-10 py-16 md:grid-cols-[auto_1fr]">
      <img src="/img/brand/cat.webp" alt="" width={256} height={256} className="size-32 md:size-44" />
      <div>
        <p className="font-mono text-small text-faint">erro 404</p>
        <h1 id="nf-title" className="mt-2 text-h1 font-bold text-white md:text-[3rem] md:leading-tight">
          Essa rota não passou no code review.
        </h1>
        <p className="mt-4 max-w-[52ch] text-body text-muted">
          O endereço que você abriu não existe aqui. Talvez o link esteja errado, ou a página mudou de lugar na repaginação.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Voltar para o início
          </Link>
          <Link href="/comunidade" className="btn-ghost">
            Ver a comunidade
          </Link>
        </div>
      </div>
    </section>
  );
}
