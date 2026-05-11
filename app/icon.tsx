import { ImageResponse } from "next/og";

const PRIMARY = "#E91E63";
const CHART_3 = "#4f46e5";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9,
        background: `linear-gradient(to bottom right, ${PRIMARY}, ${CHART_3})`,
        color: "#ffffff",
        fontSize: 19,
        fontWeight: 700,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        letterSpacing: "-0.02em",
      }}
    >
      G
    </div>,
    { ...size },
  );
}
