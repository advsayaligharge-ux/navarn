/**
 * NAVARN — THE HOUSE (artifact gallery)
 * The navigable museum of artifacts. Story-first, curatorial — artifacts, not
 * products. Commerce is frozen: no price, cart, or checkout anywhere.
 */

import type { Metadata } from "next";
import SmoothScroll from "@/components/experience/SmoothScroll";
import HouseHeader from "@/components/house/HouseHeader";
import HouseFooter from "@/components/ui/HouseFooter";
import ArtifactCard from "@/components/house/ArtifactCard";
import Reveal from "@/components/experience/Reveal";
import { ARTIFACTS } from "@/content/artifacts";

export const metadata: Metadata = {
  title: "The House",
  description:
    "The House of NAVARN — a gallery of artifacts. Each garment is an independent story, transformed into premium oversized menswear.",
};

export default function HousePage() {
  return (
    <SmoothScroll>
      <HouseHeader />
      <main className="bg-charcoal px-6 pb-24 pt-20 md:px-12">
        <Reveal className="mx-auto mb-20 max-w-3xl text-center">
          <span className="caption text-brass">The House</span>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[1.05] text-ivory">
            A gallery of artifacts.
          </h1>
          <p className="mx-auto mt-8 max-w-reading font-editorial text-xl italic text-stone md:text-2xl">
            Not a collection. Each piece is its own story — chosen, transformed,
            and finished like an heirloom.
          </p>
        </Reveal>

        <Reveal stagger={0.08} className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {ARTIFACTS.map((a) => (
            <ArtifactCard key={a.id} artifact={a} />
          ))}
        </Reveal>
      </main>
      <HouseFooter />
    </SmoothScroll>
  );
}
