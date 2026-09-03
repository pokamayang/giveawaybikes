import { useWinners } from "../hooks/useSiteData";
import { Trophy, Star } from "lucide-react";

export default function WinnersSection() {
  const { winners, loading } = useWinners();
  const published = winners.filter((w) => w.isPublished);

  return (
    <section id="winners" className="section-padding bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">CELEBRATION</span>
          <h2 className="section-title mb-3">2026 Winners</h2>
          <p className="text-slate-600 text-sm">
            Real winners, shown only with their permission. No fictional entries.
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-8 text-center animate-pulse">
                <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-4" />
                <div className="h-5 bg-slate-100 rounded w-1/2 mx-auto mb-2" />
                <div className="h-4 bg-slate-100 rounded w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : published.length === 0 ? (
          <div className="card p-16 text-center text-slate-500 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-[#1E3A8A]/40" aria-hidden="true" />
            </div>
            <p className="font-display text-lg text-[#0F172A] mb-2">No winners yet</p>
            <p className="text-sm">
              Winners will be announced here after each draw. Enter the giveaway for your chance!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {published.map((w) => (
              <div
                key={w.id}
                className="card p-7 text-center group hover:shadow-md transition-shadow duration-200"
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-200 border-4 border-[#1E3A8A]/20 group-hover:border-[#F97316]/40 transition-colors duration-200">
                    {w.photoUrl ? (
                      <img
                        src={w.photoUrl}
                        alt={w.displayName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-3xl text-[#1E3A8A]">
                        {w.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  {/* Trophy badge */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shadow-md">
                    <Trophy className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-display text-xl text-[#0F172A] mb-1">{w.displayName}</h3>
                <p className="text-[#F97316] font-semibold text-sm mb-1">{w.prizeWon}</p>
                <p className="text-slate-400 text-xs mb-4">{w.announcementDate}</p>

                {/* Stars */}
                <div className="flex justify-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F97316] text-[#F97316]" aria-hidden="true" />
                  ))}
                </div>

                {/* Testimonial */}
                {w.testimonial && (
                  <blockquote className="text-slate-600 text-sm italic leading-relaxed border-t border-slate-100 pt-4">
                    "{w.testimonial}"
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
