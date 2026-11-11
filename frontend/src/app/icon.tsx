import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#0E1015",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#B5FF39",
          fontWeight: 900,
          borderRadius: "7px",
          border: "1px solid rgba(181, 255, 57, 0.5)",
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        M
      </div>
    ),
    {
      ...size,
    }
  );
}
