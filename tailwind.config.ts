import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#14161A",
        panel: "#1C1F26",
        raised: "#242832",
        line: "#2E323C",
        brass: {
          DEFAULT: "#D9A054",
          dim: "#8C6B3E",
        },
        cyan: {
          DEFAULT: "#6FE3E0",
          dim: "#3E7A78",
        },
        ink: {
          DEFAULT: "#F2F0EA",
          muted: "#9096A3",
          faint: "#5B606C",
        },
        danger: "#E2685A",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        panel: "14px",
      },
      keyframes: {
        "iris-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "iris-spin": "iris-spin 2.4s linear infinite",
        "fade-up": "fade-up 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
