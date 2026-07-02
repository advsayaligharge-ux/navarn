/**
 * NAVARN — MuseumAtmosphere
 * A fixed, pointer-transparent overlay giving non-film pages the gallery feel:
 * a soft warm key light from above and a fine film grain. Subtle by design —
 * the room, not the spectacle.
 */

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function MuseumAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[45]">
      {/* Warm museum key light from above */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 70% at 50% -5%, rgba(169,130,60,0.08), transparent 55%)" }}
      />
      {/* Fine film grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: "140px 140px" }}
      />
      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px 40px rgba(0,0,0,0.55)" }}
      />
    </div>
  );
}
