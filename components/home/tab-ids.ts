export const TAB_IDS = ["about", "experience", "projects", "contact"] as const;

export type TabId = (typeof TAB_IDS)[number];

export const DEFAULT_TAB: TabId = "about";

/** Evento disparado quando alguém (abas, paleta) troca a aba via pushState. */
export const TAB_EVENT = "portfolio:tab";

export function isTabId(value: string): value is TabId {
  return (TAB_IDS as readonly string[]).includes(value);
}

/** Lê a aba a partir de um hash ("#projects"); hash inválido cai na padrão. */
export function tabFromHash(hash: string): TabId {
  let raw = hash.replace(/^#/, "");
  try {
    raw = decodeURIComponent(raw);
  } catch {
    return DEFAULT_TAB; // "%E0" e afins: hash malformado
  }
  return isTabId(raw) ? raw : DEFAULT_TAB;
}
