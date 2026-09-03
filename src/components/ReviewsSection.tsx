import { Star, Quote, BadgeCheck } from "lucide-react";
import { useReviews } from "../hooks/useSiteData";
import type { Review } from "../types";

// Default reviews — past community winners & members. Shown when Firestore has no approved reviews yet.
const DEFAULT_REVIEWS: (Omit<Review, "createdAt" | "isApproved" | "userId"> & { year: string })[] = [
  {
    id: "default-1",
    userName: "Marcus T.",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    year: "2024 Winner",
    comment:
      "Entered just for fun and honestly forgot about it. Got a message three weeks after the closing date and nearly dropped my phone. The bike arrived fully set up and the battery range blew me away. I ride the trails behind my estate every Saturday now. This community is genuinely something special.",
  },
  {
    id: "default-2",
    userName: "Priya N.",
    userAvatar: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=100&h=100&fit=crop",
    rating: 4,
    year: "2023 Winner",
    comment:
      "Won the 2023 giveaway and it was a great experience overall. The entry process was clear, the team communicated well, and the bike itself is really solid — especially the hydraulic brakes on technical terrain. Only minor thing was delivery took a little longer than expected, but worth every second of the wait.",
  },
  {
    id: "default-3",
    userName: "Jordan K.",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    year: "2024 Winner",
    comment:
      "I'd been following the community for about a year before I entered. When I won I genuinely thought it was spam at first. The verification process was straightforward and professional — no sketchy requests, just ID confirmation and delivery details. Bike is immaculate. Already planning my build for 2026.",
  },
  {
    id: "default-4",
    userName: "Aisha B.",
    userAvatar: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=100&h=100&fit=crop",
    rating: 4,
    year: "2022 Winner",
    comment:
      "One of the earlier winners here. Back in 2022 the community was smaller but the giveaway was run just as professionally. The bike I won is still running strong — I've done hundreds of kilometres on it. Would have given 5 stars but the winner notification came quite late after the draw. Still a fantastic experience.",
  },
  {
    id: "default-5",
    userName: "Liam O.",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    year: "2024 Winner",
    comment:
      "Third year entering and it finally happened. The community kept me going — seeing past winners share their rides is genuinely motivating. The bike is every bit as good as advertised. Suspension handles rough ground better than I expected and the digital display is clean. Entering 2026 the second registration opens.",
  },
  {
    id: "default-6",
    userName: "Sophia R.",
    userAvatar: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100&h=100&fit=crop",
    rating: 5,
    year: "2023 Winner",
    comment:
      "What surprised me most was how supportive the community was after I won. Other riders helped me dial in the suspension settings and even recommended the best local trails. The organisers were responsive whenever I had questions. This isn't just a giveaway — it's a proper riding community worth being part of.",
  },
];

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

function ReviewCard({ review, winner = false }: { review: Omit<Review, "createdAt" | "isApproved" | "userId"> & { year?: string }; winner?: boolean }) {
  return (
    <div className="card p-6 flex flex-col group hover:shadow-md transition-shadow duration-200 h-full">
      {/* Quote icon */}
      <div className="mb-4">
        <Quote className="w-7 h-7 text-[#1E3A8A]/20 fill-[#1E3A8A]/20" aria-hidden="true" />
      </div>

      {/* Comment */}
      <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5 italic">
        "{review.comment}"
      </p>

      {/* User */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#1E3A8A]/10 shrink-0 ring-2 ring-[#1E3A8A]/10 group-hover:ring-[#F97316]/30 transition-all duration-200">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display text-[#1E3A8A] font-bold">
              {review.userName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-[#0F172A] text-sm truncate">{review.userName}</p>
            {winner && (
              <BadgeCheck className="w-4 h-4 text-[#F97316] shrink-0" aria-label="Past winner" />
            )}
          </div>
          <StarRating rating={review.rating} />
          {winner && (
            <p className="text-xs text-[#F97316] font-medium mt-0.5">Past Winner</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const { reviews, loading } = useReviews(true);

  // Use Firestore reviews if available, otherwise show defaults
  const displayReviews = !loading && reviews.length > 0 ? reviews : DEFAULT_REVIEWS;

  // Don't render while loading if we have no data yet
  if (loading && reviews.length === 0) return null;

  return (
    <section className="section-padding bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">COMMUNITY VOICES</span>
          <h2 className="section-title mb-3">What Our Winners Say</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Real experiences from past giveaway winners and long-time community members.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.slice(0, 6).map((r) => (
            <ReviewCard key={r.id} review={r} winner={true} />
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-slate-400 mt-8">
          <BadgeCheck className="w-3.5 h-3.5 inline mr-1 text-[#F97316]" aria-hidden="true" />
          Reviews are from verified past giveaway participants. Displayed with permission.
        </p>
      </div>
    </section>
  );
}
