import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#0b0c0b",
        color: "#f1f0ea",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#c6f35e" }} />
        <div
          style={{ color: "#a0a39a" }}
        >{`${site.title} · IIT Patna · India, open to remote`}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontSize: 120, fontFamily: "serif", lineHeight: 1 }}>{site.name}</div>
        <div style={{ fontSize: 38, lineHeight: 1.3, maxWidth: 960, color: "#a0a39a" }}>
          {site.positioning}
        </div>
      </div>
      <div style={{ width: 160, height: 8, background: "#c6f35e" }} />
    </div>,
    size,
  );
}
