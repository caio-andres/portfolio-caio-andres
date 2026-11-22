import { TAB_EVENT, type TabEventDetail, type TabId } from "@/components/home/tab-ids";

/**
 * Abre uma aba da home e rola até ela. Funciona mesmo se o hash já for o da
 * aba (um <a href="#projects"> comum não faria nada nesse caso).
 * Só no navegador, e só na home.
 */
export function goToTab(tab: TabId) {
  if (window.location.hash !== `#${tab}`) history.pushState(null, "", `#${tab}`);
  window.dispatchEvent(new CustomEvent<TabEventDetail>(TAB_EVENT, { detail: { tab, scroll: true } }));
}

/** Move o foco para o painel da aba, sem rolar (a rolagem já foi feita). */
export function focusTabPanel(tab: TabId) {
  requestAnimationFrame(() => document.getElementById(`panel-${tab}`)?.focus({ preventScroll: true }));
}
