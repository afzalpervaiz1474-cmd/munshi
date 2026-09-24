import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1320px" } },
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        elevated: v("elevated"),
        fg: v("fg"),
        muted: v("muted"),
        subtle: v("subtle"),
        line: v("line"),
        cyan: v("cyan"),
        violet: v("violet"),
        emerald: v("emerald"),
        amber: v("amber"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      screens: { "3xl": "1920px" },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        dash: { to: { strokeDashoffset: "-20" } },
      },
      animation: {
        shimmer: "shimmer 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        spinSlow: "spinSlow 40s linear infinite",
        dash: "dash 1s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
