import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A book cover on a desk, matching the site.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#15120f",
      }}
    >
      <div
        style={{
          width: 1040,
          height: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#1f3a30",
          color: "#ecd29a",
          borderRadius: 10,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 80,
            width: 34,
            height: 140,
            background: "#e8a948",
          }}
        />
        <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", opacity: 0.8 }}>
          A portfolio in five chapters
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontFamily: "serif", lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 36, fontFamily: "serif", fontStyle: "italic", maxWidth: 860 }}>
            {site.positioning}
          </div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.8 }}>IIT Patna · India, open to remote</div>
      </div>
    </div>,
    size,
  );
}
