import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Social share card (Open Graph + Twitter summary_large_image). Rendered to PNG
// at request time via next/og so it always carries the current helm branding, 
// no static asset to regenerate when the brand changes. Node runtime so we can
// read the logo SVG off disk and inline it as a data URI.
export const runtime = "nodejs";
export const alt = "SprintHelm, Delivery Decision Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage(): Promise<ImageResponse> {
  const svg = readFileSync(join(process.cwd(), "public", "logo-sprinthelm.svg"), "utf8");
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background:
            "radial-gradient(circle at 82% 0%, #312e81 0%, #14161f 52%, #0f1117 100%)",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={132} height={132} alt="" />
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: "-2px" }}>
            <span style={{ color: "#f2f3f7" }}>Sprint</span>
            <span style={{ color: "#f59e0b" }}>Helm</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 46,
            lineHeight: 1.25,
            fontWeight: 700,
            color: "#e6e8ef",
            maxWidth: 900,
          }}
        >
          Your sprint plan looks fine. Your deadline doesn&rsquo;t know that yet.
        </div>

        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#8b8fa3" }}>
          Delivery decision intelligence · sprinthelm.com
        </div>
      </div>
    ),
    { ...size },
  );
}
