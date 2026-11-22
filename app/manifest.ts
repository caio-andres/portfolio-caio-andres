import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Caio André · Engenheiro de Software",
    short_name: "Caio André",
    description: SITE_DESCRIPTION,
    lang: "pt-BR",
    start_url: "/",
    display: "browser",
    background_color: "#111021",
    theme_color: "#111021",
    icons: [
      { src: "/img/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/img/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
