import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ size: string }> }
) {
  const { size } = await context.params;
  const dimension = size === "192" ? 192 : 512;
  const radius = Math.round(dimension * 0.22);
  const titleSize = Math.round(dimension * 0.26);
  const subSize = Math.round(dimension * 0.09);

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
          background: "linear-gradient(135deg, #0f172a 0%, #0b0d12 60%, #1e1b4b 100%)",
          borderRadius: `${radius}px`,
          border: `${Math.max(2, Math.round(dimension * 0.015))}px solid rgba(52, 211, 153, 0.35)`,
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: `${Math.round(dimension * 0.06)}px ${Math.round(dimension * 0.1)}px`,
            borderRadius: `${Math.round(dimension * 0.12)}px`,
            background: "rgba(16, 185, 129, 0.14)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            fontSize: `${titleSize}px`,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#34d399",
          }}
        >
          DC
        </div>
        <div
          style={{
            marginTop: `${Math.round(dimension * 0.06)}px`,
            fontSize: `${subSize}px`,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          DESKCRAFT 3D
        </div>
      </div>
    ),
    {
      width: dimension,
      height: dimension,
    }
  );
}