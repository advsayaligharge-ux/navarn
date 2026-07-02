/**
 * NAVARN — Artifact detail route
 * Statically generated per artifact from the registry. No commerce.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/experience/SmoothScroll";
import MuseumAtmosphere from "@/components/experience/MuseumAtmosphere";
import HouseHeader from "@/components/house/HouseHeader";
import HouseFooter from "@/components/ui/HouseFooter";
import ArtifactDetail from "@/components/artifact/ArtifactDetail";
import { ARTIFACTS } from "@/content/artifacts";

export function generateStaticParams() {
  return ARTIFACTS.map((a) => ({ id: a.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const a = ARTIFACTS.find((x) => x.id === params.id);
  if (!a) return { title: "Artifact" };
  return {
    title: a.name,
    description: `${a.name} — ${a.story} A NAVARN artifact: ${a.heritageSource}`,
  };
}

export default function ArtifactPage({ params }: { params: { id: string } }) {
  const i = ARTIFACTS.findIndex((a) => a.id === params.id);
  if (i === -1) notFound();
  const artifact = ARTIFACTS[i];
  const prev = i > 0 ? { id: ARTIFACTS[i - 1].id, name: ARTIFACTS[i - 1].name } : null;
  const next = i < ARTIFACTS.length - 1 ? { id: ARTIFACTS[i + 1].id, name: ARTIFACTS[i + 1].name } : null;

  return (
    <SmoothScroll>
      <MuseumAtmosphere />
      <HouseHeader />
      <div className="lux-enter relative z-10">
        <ArtifactDetail artifact={artifact} prev={prev} next={next} />
      </div>
      <HouseFooter />
    </SmoothScroll>
  );
}
