import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.navarn.in"),
  title: {
    default: "NAVARN — India's Luxury Storytelling Menswear House",
    template: "%s · NAVARN",
  },
  description:
    "NAVARN transforms India's living heritage — Warli, Madhubani, Kalamkari, Gond, Pattachitra, Maharaja, Mythology — into modern luxury menswear. Wear your heritage.",
  keywords: [
    "NAVARN",
    "luxury heritage menswear",
    "Indian heritage fashion",
    "storytelling fashion",
    "Warli",
    "Madhubani",
    "Maharaja",
  ],
  openGraph: {
    title: "NAVARN — Wear Your Heritage",
    description: "India's first luxury storytelling menswear house.",
    type: "website",
    locale: "en_IN",
    siteName: "NAVARN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1E1E1C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
