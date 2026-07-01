/**
 * NAVARN — The House (footer)
 * Utility, kept dignified (EXPERIENCE_BLUEPRINT sitemap). Commerce is frozen;
 * links are placeholders until the House is built in a later phase.
 */
import Seal from "./Seal";

export default function HouseFooter() {
  const cols: { title: string; items: string[] }[] = [
    { title: "The House", items: ["The Film", "The Collections", "The Making", "The Heritage"] },
    { title: "The Keepers", items: ["Become a Keeper", "Keepers' Voices", "Your Archive"] },
    { title: "Concierge", items: ["Contact", "Care & Craft", "Shipping & Keeping"] },
  ];

  return (
    <footer className="border-t border-white/5 bg-charcoal px-6 py-20 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <Seal size={44} />
            <div>
              <p className="font-body text-lg uppercase tracking-[0.34em] text-ivory">
                NAVARN
              </p>
              <p className="caption mt-1 text-stone">The ancient, made new</p>
            </div>
          </div>
          <p className="max-w-reading font-editorial text-xl italic text-stone">
            &ldquo;We preserve stories through luxury fashion.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-12 md:grid-cols-3">
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="caption mb-5 text-brass">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="font-body text-sm font-light text-stone/80 transition-colors duration-micro hover:text-champagne"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="caption text-stone/50">
          © {new Date().getFullYear()} NAVARN · Made in India · Phase 1 — India first
        </p>
      </div>
    </footer>
  );
}
