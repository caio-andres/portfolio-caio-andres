"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { DISCORD_INVITE, REPO_URL, person, social } from "@/lib/site";
import { TAB_EVENT, type TabId } from "@/components/home/tab-ids";

type Action = {
  id: string;
  group: "ir para" | "ações" | "links";
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void | Promise<void>;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const subscribeNoop = () => () => {};
const isApple = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const listId = useId();
  const dialogId = useId();
  const apple = useSyncExternalStore(subscribeNoop, isApple, () => false);

  const goToTab = useCallback(
    (tab: TabId) => {
      if (pathname === "/") {
        // Ao fechar, o foco vai para o painel aberto (lido no onClose do dialog).
        document.getElementById(dialogId)?.setAttribute("data-focus-after-close", "panel-" + tab);
        history.pushState(null, "", `#${tab}`);
        window.dispatchEvent(new CustomEvent(TAB_EVENT, { detail: { tab, scroll: true } }));
      } else {
        router.push(`/#${tab}`);
      }
    },
    [pathname, router, dialogId],
  );

  const actions = useMemo<Action[]>(
    () => [
      { id: "about", group: "ir para", label: "Sobre mim", hint: "#about", keywords: "about bio stack certificacoes", run: () => goToTab("about") },
      { id: "experience", group: "ir para", label: "Experiência", hint: "#experience", keywords: "experience trabalho carreira itau", run: () => goToTab("experience") },
      { id: "projects", group: "ir para", label: "Projetos", hint: "#projects", keywords: "projects open source github", run: () => goToTab("projects") },
      { id: "contact", group: "ir para", label: "Contato", hint: "#contact", keywords: "contact email falar", run: () => goToTab("contact") },
      { id: "community", group: "ir para", label: "Comunidade", hint: "/comunidade", keywords: "servidor dos programadores discord meetup sdp", run: () => router.push("/comunidade") },
      {
        id: "copy-email",
        group: "ações",
        label: "Copiar e-mail",
        hint: person.email,
        keywords: "email contato",
        run: async () => {
          try {
            await navigator.clipboard.writeText(person.email);
            setAnnouncement("e-mail copiado");
          } catch {
            setAnnouncement(`não deu para copiar. o e-mail é ${person.email}`);
          }
        },
      },
      { id: "github", group: "links", label: "GitHub", hint: social("github").handle, keywords: "codigo repositorios", run: () => openExternal(social("github").url) },
      { id: "linkedin", group: "links", label: "LinkedIn", hint: social("linkedin").handle, keywords: "curriculo vagas", run: () => openExternal(social("linkedin").url) },
      { id: "youtube", group: "links", label: "YouTube", hint: social("youtube").handle, keywords: "videos conteudo", run: () => openExternal(social("youtube").url) },
      { id: "discord", group: "links", label: "Entrar no Discord da comunidade", hint: "discord.gg/programador", keywords: "servidor comunidade", run: () => openExternal(DISCORD_INVITE) },
      { id: "source", group: "links", label: "Código deste site", hint: "github", keywords: "source repo portfolio", run: () => openExternal(REPO_URL) },
    ],
    [goToTab, router],
  );

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return actions;
    return actions.filter((a) => normalize(`${a.label} ${a.hint ?? ""} ${a.keywords ?? ""}`).includes(q));
  }, [actions, query]);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && !e.altKey) {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const run = useCallback(
    (action: Action | undefined) => {
      if (!action) return;
      close();
      void action.run();
    },
    [close],
  );

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const last = results.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i >= last ? 0 : i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? last : i - 1));
    } else if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End" && e.ctrlKey) {
      e.preventDefault();
      setActive(last);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  }

  // Um handler só na lista (delegação): o clique numa opção roda a ação dela.
  function onListClick(e: React.MouseEvent<HTMLUListElement>) {
    const option = (e.target as HTMLElement).closest<HTMLElement>("[data-index]");
    if (option) run(results[Number(option.dataset.index)]);
  }

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const activeId = results[active] ? `${listId}-${active}` : undefined;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        className="inline-flex min-h-10 cursor-pointer items-center gap-2 border border-line px-3 font-mono text-meta text-muted transition-colors hover:border-blue-text hover:text-fg"
      >
        <Search size={15} aria-hidden="true" />
        <span className="hidden sm:inline">buscar</span>
        <kbd className="hidden border border-line px-1.5 font-mono text-[0.75rem] text-faint sm:inline">{apple ? "⌘ K" : "Ctrl K"}</kbd>
        <span className="sr-only sm:hidden">Abrir paleta de comandos</span>
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>

      <dialog
        ref={dialogRef}
        aria-label="Paleta de comandos"
        id={dialogId}
        onClose={(e) => {
          const dialog = e.currentTarget;
          const targetId = dialog.dataset.focusAfterClose;
          delete dialog.dataset.focusAfterClose;
          const target = targetId ? document.getElementById(targetId) : null;
          (target ?? returnFocus.current)?.focus?.({ preventScroll: true });
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto mt-[12vh] w-[min(36rem,calc(100vw-2rem))] border border-line-strong bg-panel p-0 text-fg backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} aria-hidden="true" className="text-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="O que você procura?"
            placeholder="Para onde? (projetos, e-mail, discord...)"
            spellCheck={false}
            autoComplete="off"
            className="h-14 w-full bg-transparent font-mono text-small text-fg outline-none placeholder:text-faint"
          />
          <kbd className="hidden border border-line px-1.5 font-mono text-[0.75rem] text-faint sm:inline">esc</kbd>
        </div>

        <ul id={listId} role="listbox" aria-label="Resultados" onClick={onListClick} className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li role="presentation" className="px-3 py-6 text-center text-small text-muted">
              Nada com &ldquo;{query}&rdquo;. Tente &ldquo;projetos&rdquo; ou &ldquo;e-mail&rdquo;.
            </li>
          ) : (
            results.map((action, i) => (
              <li
                key={action.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                data-index={i}
                onMouseMove={() => setActive(i)}
                className="flex cursor-pointer items-center justify-between gap-4 px-3 py-2.5 aria-selected:bg-panel-2 aria-selected:text-white"
              >
                <span className="flex items-baseline gap-3">
                  <span className="w-14 shrink-0 font-mono text-[0.75rem] text-faint">{action.group}</span>
                  <span className="text-small">{action.label}</span>
                </span>
                {action.hint ? <span className="truncate font-mono text-meta text-faint">{action.hint}</span> : null}
              </li>
            ))
          )}
        </ul>

        <p className="border-t border-line px-4 py-2.5 font-mono text-[0.75rem] text-faint">
          ↑ ↓ para escolher · enter para abrir · esc para fechar
        </p>
      </dialog>
    </>
  );
}
