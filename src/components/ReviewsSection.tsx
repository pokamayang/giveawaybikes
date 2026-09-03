import { Star, Quote } from "lucide-react";
import { useReviews } from "../hooks/useSiteData";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-[#F97316] text-[#F97316]" : "text-slate-200"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { reviews, loading } = useReviews(true);

  if (loading || reviews.length === 0) return null;

  return (
    <section className="section-padding bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">VOICES</span>
          <h2 className="section-title">Community Reviews</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((r) => (
            <div key={r.id} className="card p-6 flex flex-col group hover:shadow-md transition-shadow duration-200">
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-7 h-7 text-[#1E3A8A]/20 fill-[#1E3A8A]/20" aria-hidden="true" />
              </div>

              {/* Comment */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5 italic">
                "{r.comment}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1E3A8A]/10 shrink-0">
                  {r.userAvatar ? (
                    <img
                      src={r.userAvatar}
                      alt={r.userName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-[#1E3A8A] font-bold">
                      {r.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">{r.userName}</p>
                  <StarRating rating={r.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
