"use client";

import { useEffect, useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DEFAULT_TAB, TAB_EVENT, tabFromHash, type TabId } from "@/components/home/tab-ids";

export type TabDef = { id: TabId; label: string; content: ReactNode };

// A aba ativa mora na URL (#projects). Este store lê o hash e avisa o React
// quando ele muda: por link/âncora (hashchange), voltar/avançar (popstate) ou
// pela própria UI (evento TAB_EVENT, porque pushState não dispara nada).
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  window.addEventListener(TAB_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(TAB_EVENT, onChange);
  };
}
const getHash = () => window.location.hash;
const getServerHash = () => "";

/** Rola a página até o topo do bloco de abas (onde a barra fica antes de grudar). */
function scrollToTabs(root: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY, behavior: reduce ? "auto" : "smooth" });
}

/** Só rola se o começo das abas estiver acima da tela ou lá embaixo dela. */
function scrollToTabsIfNeeded(root: HTMLElement | null) {
  if (!root) return;
  const { top } = root.getBoundingClientRect();
  if (top < 0 || top > window.innerHeight * 0.6) scrollToTabs(root);
}

export function Tabs({ tabs, label }: { tabs: TabDef[]; label: string }) {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const active = tabFromHash(hash);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

  // Navegação vinda de fora da barra (link "ver projetos", paleta, link direto):
  // traz as abas para a tela.
  useEffect(() => {
    const onHash = () => scrollToTabsIfNeeded(rootRef.current);
    const onTab = (e: Event) => {
      if ((e as CustomEvent<{ scroll?: boolean }>).detail?.scroll) scrollToTabsIfNeeded(rootRef.current);
    };
    if (tabFromHash(window.location.hash) !== DEFAULT_TAB) scrollToTabsIfNeeded(rootRef.current);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(TAB_EVENT, onTab);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener(TAB_EVENT, onTab);
    };
  }, []);

  function select(id: TabId, focus = false) {
    if (id !== active) {
      history.pushState(null, "", `#${id}`);
      window.dispatchEvent(new CustomEvent(TAB_EVENT, { detail: { tab: id } }));
      // Trocou de aba no meio de um painel longo: volta para o começo do novo.
      const root = rootRef.current;
      if (root && root.getBoundingClientRect().top < 0) scrollToTabs(root);
    }
    if (focus) tabRefs.current[id]?.focus({ preventScroll: true });
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = tabs.findIndex((t) => t.id === active);
    const target =
      e.key === "ArrowRight" ? tabs[(i + 1) % tabs.length]
      : e.key === "ArrowLeft" ? tabs[(i - 1 + tabs.length) % tabs.length]
      : e.key === "Home" ? tabs[0]
      : e.key === "End" ? tabs[tabs.length - 1]
      : undefined;
    if (!target) return;
    e.preventDefault();
    select(target.id, true);
  }

  return (
    <div ref={rootRef}>
      <div className="sticky top-0 z-20 -mx-5 border-b border-line bg-ink/95 px-5 backdrop-blur md:-mx-8 md:px-8">
        <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex overflow-x-auto [scrollbar-width:none] sm:gap-1">
          {tabs.map((tab) => {
            const selected = tab.id === active;
            // No celular os colchetes só aparecem na aba ativa, para as quatro caberem.
            const bracket = selected ? "text-blue-text" : "max-sm:hidden";
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                className={cn(
                  "relative shrink-0 cursor-pointer px-2 py-4 font-mono text-meta transition-colors sm:px-3 sm:text-small md:px-4",
                  selected ? "text-white" : "text-faint hover:text-fg",
                )}
              >
                <span aria-hidden="true" className={bracket}>
                  [
                </span>
                {tab.label}
                <span aria-hidden="true" className={bracket}>
                  ]
                </span>
                {selected ? <span aria-hidden="true" className="absolute inset-x-2 -bottom-px h-0.5 bg-blue" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== active}
          className="animate-fade-in pt-10 pb-4 focus-visible:outline-offset-8 md:pt-14"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
