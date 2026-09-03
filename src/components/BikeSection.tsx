import {
  Battery,
  Gauge,
  Disc,
  Waves,
  CircleDot,
  Monitor,
  Zap,
  Mountain,
} from "lucide-react";
import { useGiveaway, useSettings } from "../hooks/useSiteData";
import { MessageCircle } from "lucide-react";

const specIcons = [Gauge, Battery, Zap, Disc, Waves, CircleDot, Monitor, Mountain];

export default function BikeSection() {
  const { giveaway } = useGiveaway();
  const { settings } = useSettings();

  const handleEnter = () => {
    const wa = settings.whatsappNumber?.replace(/\D/g, "");
    const msg = encodeURIComponent(
      settings.whatsappMessage || "Hi! I want to enter the 2026 Surronster Giveaway."
    );
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${msg}`, "_blank");
    } else if (settings.contactEmail) {
      window.location.href = `mailto:${settings.contactEmail}`;
    }
  };

  return (
    <section id="bike" className="section-padding bg-[#0F172A] text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,58,138,0.3)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(249,115,22,0.1)_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#F97316] font-semibold tracking-widest text-xs uppercase mb-2 block">
            THE PRIZE
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            {giveaway.prizeName}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            {giveaway.prizeDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bike image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={giveaway.prizeImage}
                alt={giveaway.prizeName}
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent rounded-2xl" />
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-[#1E3A8A]/20 rounded-3xl blur-xl -z-10" />
          </div>

          {/* Specs */}
          <div>
            <h3 className="font-display text-xl text-white/90 mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#F97316]" />
              Key Specifications
            </h3>

            <ul className="space-y-3 mb-8">
              {giveaway.prizeSpecs.map((spec, i) => {
                const Icon = specIcons[i % specIcons.length];
                return (
                  <li
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#1E3A8A] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-white/90 font-medium text-sm">{spec}</span>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={handleEnter}
              className="btn-action inline-flex items-center gap-2"
              aria-label="Win this bike — enter the giveaway"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              WIN THIS BIKE
            </button>

            <p className="mt-4 text-white/30 text-xs leading-relaxed">
              Specifications shown are illustrative. Final prize model and exact specs are confirmed in the official rules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
