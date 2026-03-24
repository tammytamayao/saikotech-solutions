import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-figtree)", "sans-serif"],
      },
      fontSize: {
        h1: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h3: ["1.25rem", { lineHeight: "1.3" }],
        body: ["0.95rem", { lineHeight: "1.6" }],
      },
    },
  },
  plugins: [],
};

export default config;
