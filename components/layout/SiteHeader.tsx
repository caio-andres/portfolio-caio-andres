import Link from "next/link";
import { CommandPalette } from "@/components/command/CommandPalette";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { social } from "@/lib/site";

export function SiteHeader() {
  const gh = social("github");
  const li = social("linkedin");
  return (
    <header className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-5 md:px-8">
      <Link href="/" className="group flex items-center gap-3">
        <img src="/img/brand/cat.webp" alt="" width={256} height={256} className="size-9 transition-transform group-hover:-rotate-6" />
        <span className="font-mono text-small text-fg">
          caio<span className="text-faint">.</span>andres
        </span>
        <span className="sr-only">, página inicial</span>
      </Link>

      <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-2">
        <Link href="/comunidade" className="hidden px-2 py-2 font-mono text-small text-muted transition-colors hover:text-white sm:inline">
          comunidade
        </Link>
        <ExternalLink href={gh.url} className="inline-flex size-10 items-center justify-center text-muted transition-colors hover:text-white" srHint={false}>
          <SocialIcon id="github" />
          <span className="sr-only">GitHub (abre em nova aba)</span>
        </ExternalLink>
        <ExternalLink href={li.url} className="inline-flex size-10 items-center justify-center text-muted transition-colors hover:text-white" srHint={false}>
          <SocialIcon id="linkedin" />
          <span className="sr-only">LinkedIn (abre em nova aba)</span>
        </ExternalLink>
        <CommandPalette />
      </nav>
    </header>
  );
}
