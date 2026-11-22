"use client";

import type { ReactNode } from "react";
import { focusTabPanel, goToTab } from "@/components/home/go-to-tab";
import type { TabId } from "@/components/home/tab-ids";

/**
 * Link para uma aba da home. Sem JavaScript continua sendo um link "#aba";
 * com JavaScript abre a aba, rola até ela e leva o foco para o painel.
 */
export function TabLink({ tab, className, children }: { tab: TabId; className?: string; children: ReactNode }) {
  return (
    <a
      href={`#${tab}`}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        goToTab(tab);
        focusTabPanel(tab);
      }}
    >
      {children}
    </a>
  );
}
