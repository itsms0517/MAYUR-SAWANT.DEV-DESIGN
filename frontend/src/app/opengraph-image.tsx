import { ImageResponse } from "next/og";

export const alt = "Mayur Sawant — Full-Stack Developer & UI/UX Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0A0C10",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(181, 255, 57, 0.12) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          border: "2px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Top badge */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(181, 255, 57, 0.15)",
              border: "1px solid rgba(181, 255, 57, 0.4)",
              color: "#B5FF39",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Full-Stack Software Engineer &amp; UI/UX Designer
          </div>
        </div>

        {/* Center title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            <span>MAYUR SAWANT</span>
            <span style={{ color: "#B5FF39" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#94A3B8",
              maxWidth: "850px",
              lineHeight: 1.5,
            }}
          >
            Crafting high-converting web applications, scalable backends with FastAPI &amp; Neon PostgreSQL, and distinctive design systems.
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#B5FF39",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            mayurprofile.com
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "16px",
              color: "#64748B",
            }}
          >
            Next.js 15 • FastAPI • Neon PostgreSQL • Tailwind CSS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
