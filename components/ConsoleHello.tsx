"use client";

import { useEffect } from "react";
import { person } from "@/lib/site";

let said = false;

/** Um oi para quem abre o DevTools. */
export function ConsoleHello() {
  useEffect(() => {
    if (said) return;
    said = true;
    console.info(
      `%c<CaioAndre />%c\n\nAbriu o console? Então a gente provavelmente se daria bem.\n${person.email}\n\nCódigo do site: https://github.com/caio-andres/portfolio-caio-andres`,
      "font: 700 16px ui-monospace, monospace; color: #7aa7ff",
      "font: 13px ui-monospace, monospace; color: inherit",
    );
  }, []);
  return null;
}
