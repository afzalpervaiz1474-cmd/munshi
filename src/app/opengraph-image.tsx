import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "radial-gradient(circle at 80% 20%, #1b2a4a 0%, #07080b 55%)", color: "#eceff5", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#38d6f0", textTransform: "uppercase" }}>Portfolio</div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 20 }}>{siteConfig.name}</div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 12, color: "#a084ff" }}>{siteConfig.role}</div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "#a0a8ba", maxWidth: 900 }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}
