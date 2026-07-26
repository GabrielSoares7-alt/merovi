import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Merovi — tecnologia digital premium para o seu negócio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const markData = await readFile(
    join(process.cwd(), "public/logo/merovi-mark.png"),
    "base64",
  );
  const markSrc = `data:image/png;base64,${markData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={140} height={131} />
        <div
          style={{
            marginTop: 32,
            fontSize: 84,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          Merovi
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#8a8a8a",
          }}
        >
          Presença digital premium para o seu negócio
        </div>
      </div>
    ),
    { ...size },
  );
}
