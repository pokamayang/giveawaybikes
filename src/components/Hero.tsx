import { MessageCircle, ArrowDown, Play } from "lucide-react";
import { useSettings, useGiveaway } from "../hooks/useSiteData";

export default function Hero() {
  const { settings } = useSettings();
  const { giveaway } = useGiveaway();

  const handleEnter = () => {
    const wa = settings.whatsappNumber?.replace(/\D/g, "");
    const msg = encodeURIComponent(
      settings.whatsappMessage || "Hi! I want to enter the 2026 Surronster Giveaway."
    );
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${msg}`, "_blank");
    } else if (settings.contactEmail) {
      window.location.href = `mailto:${settings.contactEmail}?subject=Enter%20Giveaway&body=${msg}`;
    }
  };

  const scrollToGiveaway = () => {
    const el = document.getElementById("giveaway");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0F172A]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${settings.heroImage || giveaway.prizeImage || "https://images.unsplash.com/photo-1558981852-426c6c22b8d8?w=1600&q=80"})`,
        }}
        role="img"
        aria-label="Electric off-road bike"
      />

      {/* Layered gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/97 via-[#0F172A]/80 to-[#0F172A]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-[#0F172A]/20" />

      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E3A8A] via-[#F97316] to-[#1E3A8A]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F97316]/15 border border-[#F97316]/30 text-[#F97316] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse-slow" />
            {settings.siteName || "SURRONSTER GIVEAWAY COMMUNITY 2026"}
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.0] mb-6">
            WIN YOUR NEXT
            <br />
            <span className="text-[#F97316] relative inline-block">
              ELECTRIC RIDE
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#F97316]/40 rounded-full" />
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
            Join the 2026 Surronster Giveaway Community and participate for a chance to win an electric off-road bike.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleEnter}
              className="btn-action inline-flex items-center justify-center gap-2.5 text-base px-8 py-4 glow-orange"
              aria-label="Enter the giveaway via WhatsApp or email"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              ENTER GIVEAWAY
            </button>
            <button
              onClick={scrollToGiveaway}
              className="btn-white inline-flex items-center justify-center gap-2 text-base px-8 py-4"
              aria-label="Learn more about the giveaway"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              LEARN MORE
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-white/50 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Free to Enter
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
              No Purchase Necessary
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A]" />
              Official Giveaway Rules Apply
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToGiveaway}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition flex flex-col items-center gap-1"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  );
}
