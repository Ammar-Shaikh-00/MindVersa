import { ImageResponse } from "next/og";

export const alt = "MindVersa — AI Software Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "#05070F",
          color: "#F0F4FF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid rgba(0,229,255,0.35)",
              background: "#0B0F1A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00E5FF",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.04em" }}>
            MindVersa
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            maxWidth: 920,
          }}
        >
          AI Systems That Deliver Results.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#8892A4",
            maxWidth: 860,
            lineHeight: 1.4,
          }}
        >
          End-to-end AI software — chatbots, automation, and custom systems.
        </div>
      </div>
    ),
    { ...size },
  );
}
