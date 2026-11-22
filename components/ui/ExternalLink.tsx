import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<"a">, "target" | "rel"> & {
  href: string;
  /** Texto extra só para leitor de tela. Padrão: avisa que abre em nova aba. */
  srHint?: string | false;
};

/**
 * Único jeito de abrir link em nova aba no site: sempre com
 * rel="noopener noreferrer" (sem window.opener e sem vazar Referer).
 */
export function ExternalLink({ children, srHint = "(abre em nova aba)", ...props }: Props) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      {srHint ? <span className="sr-only"> {srHint}</span> : null}
    </a>
  );
}
