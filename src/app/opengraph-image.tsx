import { ImageResponse } from "next/og";

export const alt = "Speiros Help Center — One clear next step for your recruiting work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          width: "100%", height: "100%", padding: 72,
          background: "#FFFEFB", color: "#123B57", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32 }}>Speiros / Help Center</div>
        <div style={{ display: "flex", maxWidth: 1000, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          One clear next step for your recruiting work.
        </div>
        <div style={{ display: "flex", borderTop: "2px solid #E5EFE7", paddingTop: 24, fontSize: 24 }}>
          Context. Candidates. Conversations.
        </div>
      </div>
    ),
    size,
  );
}
