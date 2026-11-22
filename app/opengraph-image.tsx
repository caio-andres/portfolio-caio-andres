import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Imagem de compartilhamento (LinkedIn, WhatsApp, X...). Gerada no build.
export const alt = "Caio André (Caio Andres), engenheiro de software no Itaú Unibanco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (pkg: string, file: string) => readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

export default async function OpengraphImage() {
  const [grotesk700, mono400, cat] = await Promise.all([
    font("space-grotesk", "space-grotesk-latin-700-normal.woff"),
    font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"),
    readFile(path.join(process.cwd(), "public", "img", "brand", "icon-512.png")),
  ]);
  const catSrc = `data:image/png;base64,${cat.toString("base64")}`;

  const props: [string, string][] = [
    ["role", "Engenheiro de Software"],
    ["at", "Itaú Unibanco"],
    ["aka", "Caio Andres"],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#111021",
          color: "#ececf4",
          fontFamily: "JetBrains Mono",
          borderBottom: "10px solid #2e7aff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#8d8da9" }}>caioandres.dev</div>
          <img src={catSrc} width={120} height={120} alt="" style={{ borderRadius: 24 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Space Grotesk", fontSize: 104, color: "#ffffff", letterSpacing: -3 }}>
            <span style={{ color: "#8d8da9", fontFamily: "JetBrains Mono", fontSize: 88, marginRight: 12 }}>{"<"}</span>
            Caio André
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 52, marginTop: 8, fontSize: 34 }}>
            {props.map(([k, v]) => (
              <div key={k} style={{ display: "flex" }}>
                <span style={{ color: "#7aa7ff" }}>{k}</span>
                <span style={{ color: "#8d8da9" }}>=&quot;</span>
                <span>{v}</span>
                <span style={{ color: "#8d8da9" }}>&quot;</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontFamily: "Space Grotesk", fontSize: 88, color: "#8d8da9", marginTop: 4 }}>{"/>"}</div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#b0b0c8" }}>
          AWS Certified Developer – Associate · fundador do Servidor dos Programadores
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: grotesk700, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono400, weight: 400, style: "normal" },
      ],
    },
  );
}
