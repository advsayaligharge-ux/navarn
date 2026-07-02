/**
 * NAVARN — House header
 * The fixed wayfinding for The House (outside the film). Seal returns to the
 * film; a quiet link back. Minimal, per the museum-navigation grammar.
 */
import Link from "next/link";
import Seal from "@/components/ui/Seal";
import Wordmark from "@/components/ui/Wordmark";

export default function HouseHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-charcoal/80 px-6 py-4 backdrop-blur md:px-12">
      <Link href="/" aria-label="NAVARN — return to the film" className="flex items-center gap-3 text-champagne transition-opacity duration-micro hover:opacity-70">
        <Seal size={30} />
        <Wordmark size="text-sm" className="hidden text-champagne sm:inline" />
      </Link>
      <Link href="/" className="font-body text-[0.6rem] uppercase tracking-[0.26em] text-stone transition-colors duration-micro hover:text-champagne">
        ← The Film
      </Link>
    </header>
  );
}
