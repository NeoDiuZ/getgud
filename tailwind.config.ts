import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nd: {
          bg:              "#F8FBF9",
          surface:         "#EEF3EF",
          "surface-raised":"#E4EDE6",
          border:          "#BFCFC7",
          "border-dim":    "#D4E1DB",
          primary:         "#0B6E42",
          "primary-hover": "#095C38",
          "primary-dim":   "#CCE8D8",
          accent:          "#D97706",
          ink:             "#0C1C14",
          muted:           "#4C6559",
          "muted-dim":     "#C5D6CE",
        },
      },
      fontFamily: {
        display: ["Cabinet Grotesk", "system-ui", "sans-serif"],
        body:    ["Satoshi",          "system-ui", "sans-serif"],
      },
      animation: {
        "marquee":        "marquee 30s linear infinite",
        "waveform-drift": "waveform-drift 7s linear infinite",
        "pulse-out":      "pulse-out 2.6s ease-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "waveform-drift": {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        "pulse-out": {
          "0%":   { transform: "scale(0.35)", opacity: "0.65" },
          "100%": { transform: "scale(1.9)",  opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
