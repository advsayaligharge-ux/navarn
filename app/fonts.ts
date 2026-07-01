/**
 * NAVARN — Font loading (next/font, self-hosted, zero-FOUT)
 * VISUAL_IDENTITY.md §3.
 *
 * These are the Phase-1 open substitutes for the licensed families.
 * When Canela / Söhne-class licenses land, replace these loaders with
 * next/font/local pointing at the licensed files — the CSS variable names
 * (--font-display / --font-editorial / --font-body) stay identical, so the
 * whole system swaps in one file.
 */
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";

// Display — heritage authority (sub for Canela / Ogg / GT Sectra)
export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Editorial — the storyteller (sub for Canela Text / Lyon Text)
export const fontEditorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

// Body — the modern house (sub for Söhne / Suisse / Neue Haas)
export const fontBody = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontEditorial.variable} ${fontBody.variable}`;
