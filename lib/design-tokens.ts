/**
 * Nexor marketing palette — mirrors `:root` marketing tokens in `app/globals.css`
 * for typed usage in components (charts, inline SVG, analytics).
 */
export const nexorPalette = {
  background: "#05070f",
  surface: "#101422",
  surfaceAlt: "#0b0e1a",
  heading: "#f0f4ff",
  body: "#8892a4",
  primary: "#00e5ff",
  secondary: "#7b61ff",
  borderSoft: "rgba(255, 255, 255, 0.06)",
  borderMedium: "rgba(255, 255, 255, 0.1)",
} as const;

export type NexorPalette = typeof nexorPalette;
