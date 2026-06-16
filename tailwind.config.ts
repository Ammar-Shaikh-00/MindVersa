import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#05070F",
        "bg-surface": "#0A0D1A",
        "bg-elevated": "#0F1320",
        "bg-card": "#131829",
        "accent-cyan": "#00E5FF",
        "accent-violet": "#7B61FF",
        "accent-green": "#10B981",
        "accent-orange": "#FF6B35",
        "text-primary": "#F0F4FF",
        "text-secondary": "#8892A4",
        "text-muted": "#4A5568",
        "border-subtle": "rgba(255,255,255,0.06)",
        "border-default": "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-syne)", "ui-sans-serif", "sans-serif"],
      },
      borderRadius: {
        lg: "8px",
        "2xl": "16px",
      },
      boxShadow: {
        "card-hover":
          "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,255,0.1)",
        "glow-cyan": "0 0 40px rgba(0,229,255,0.2)",
        "glow-violet": "0 0 40px rgba(123,97,255,0.2)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
