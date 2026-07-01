import type { Config } from "tailwindcss";
import { color, accent } from "./tokens/colors";
import { scale, tracking, leading } from "./tokens/typography";
import { easeCss } from "./tokens/motion";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: color.royalCream,
        ivory: color.ivory,
        champagne: color.champagneGold,
        gold: color.antiqueGold,
        charcoal: color.deepCharcoal,
        "charcoal-soft": color.charcoalSoft,
        emerald: color.emerald,
        "emerald-deep": color.emeraldDeep,
        navy: color.midnightNavy,
        bone: color.bone,
        parchment: color.parchment,
        stone: color.stoneGrey,
        brass: color.antiqueBrass,
        accent,
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: scale,
      letterSpacing: tracking,
      lineHeight: leading,
      transitionTimingFunction: {
        reveal: easeCss.reveal,
        settle: easeCss.settle,
        drift: easeCss.drift,
      },
      transitionDuration: {
        micro: "400ms",
        reveal: "900ms",
        cinematic: "1200ms",
      },
      maxWidth: {
        prose: "42rem",
        reading: "36rem",
      },
    },
  },
  plugins: [],
};

export default config;
