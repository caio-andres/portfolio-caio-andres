export const TAB_IDS = ["about", "experience", "projects", "contact"] as const;

export type TabId = (typeof TAB_IDS)[number];

export const DEFAULT_TAB: TabId = "about";

/** Evento disparado quando alguém (abas, paleta, botões) troca a aba via pushState. */
export const TAB_EVENT = "portfolio:tab";

export type TabEventDetail = { tab: TabId; scroll?: boolean };

export function isTabId(value: string): value is TabId {
  return (TAB_IDS as readonly string[]).includes(value);
}

/** Lê a aba de um hash ("#projects"). Devolve null se o hash não for de aba. */
export function parseTabHash(hash: string): TabId | null {
  let raw = hash.replace(/^#/, "");
  try {
    raw = decodeURIComponent(raw);
  } catch {
    return null; // "%E0" e afins: hash malformado
  }
  return isTabId(raw) ? raw : null;
}

/**
 * Qual aba fica ativa depois de o hash mudar. Hash vazio volta para a padrão;
 * hash que não é de aba (o skip link "#conteudo", por exemplo) não mexe na aba.
 */
export function nextActiveTab(hash: string, current: TabId): TabId {
  if (hash === "" || hash === "#") return DEFAULT_TAB;
  return parseTabHash(hash) ?? current;
}
