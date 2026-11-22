import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Tamanhos de fonte do @theme (app/globals.css). O tailwind-merge precisa
 * conhecê-los: sem isso ele lê "text-meta" como cor e o descarta quando
 * aparece um "text-faint" na mesma lista. Um teste garante que esta lista
 * acompanha o CSS.
 */
export const FONT_SIZE_TOKENS = ["meta", "small", "body", "lead", "h3", "h2", "h1", "display"] as const;

const twMerge = extendTailwindMerge({
  extend: { theme: { text: [...FONT_SIZE_TOKENS] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
