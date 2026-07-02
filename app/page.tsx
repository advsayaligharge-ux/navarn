/**
 * NAVARN — The Film (homepage)
 * The six-chapter cinematic descent: darkness → gold, loss → legacy.
 * EXPERIENCE_BLUEPRINT Homepage Storyboard. Commerce is frozen; this is the
 * experience layer awaiting approval before the Shopify catalog is provisioned.
 */

import SmoothScroll from "@/components/experience/SmoothScroll";
import HouseChrome from "@/components/ui/HouseChrome";
import HouseFooter from "@/components/ui/HouseFooter";

import Threshold from "@/components/chapters/Threshold";
import ChapterI from "@/components/chapters/ChapterI";
import ChapterII from "@/components/chapters/ChapterII";
import ChapterIII from "@/components/chapters/ChapterIII";
import ChapterIV from "@/components/chapters/ChapterIV";
import ChapterV from "@/components/chapters/ChapterV";
import ChapterVI from "@/components/chapters/ChapterVI";

export default function Home() {
  return (
    <SmoothScroll>
      <HouseChrome />
      <h1 className="sr-only">
        NAVARN — India&rsquo;s luxury heritage storytelling menswear house
      </h1>
      <main id="main">
        {/* Frame 0 */}
        <Threshold />

        {/* The descent — one continuous film */}
        <ChapterI />
        <ChapterII />
        <ChapterIII />
        <ChapterIV />
        <ChapterV />
        <ChapterVI />
      </main>
      <HouseFooter />
    </SmoothScroll>
  );
}
