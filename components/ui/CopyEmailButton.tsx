"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "failed";

/** Copia o e-mail e anuncia o resultado numa região aria-live. */
export function CopyEmailButton({
  email,
  className,
  label = "Copiar e-mail",
}: {
  email: string;
  className?: string;
  label?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    timer.current = setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <>
      <button type="button" onClick={copy} className={cn("btn-ghost", className)} data-status={status}>
        {status === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {status === "copied" ? "E-mail copiado" : label}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? "e-mail copiado" : status === "failed" ? `não deu para copiar. o e-mail é ${email}` : ""}
      </span>
      {status === "failed" ? (
        <span className="meta basis-full">
          Não deu para copiar automaticamente. O e-mail é <span className="text-fg select-all">{email}</span>
        </span>
      ) : null}
    </>
  );
}
