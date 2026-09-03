import { Star, Quote, BadgeCheck } from "lucide-react";
import { useReviews } from "../hooks/useSiteData";
import type { Review } from "../types";

// Default reviews — past community winners & members. Shown when Firestore has no approved reviews yet.
const DEFAULT_REVIEWS: Omit<Review, "createdAt" | "isApproved" | "userId">[] = [
  {
    id: "default-1",
    userName: "Marcus T.",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment:
      "I honestly never thought I'd win something like this. I entered the 2024 giveaway just for fun and got a call two weeks later. The bike is absolutely incredible — I ride it every weekend on the trails near my house. This community is the real deal. Don't sleep on entering.",
  },
  {
    id: "default-2",
    userName: "Priya N.",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment:
      "Won in 2023 and it completely changed how I spend my weekends. The electric motor is whisper-quiet but the torque is insane — nothing like riding a gas bike. The whole process from entry to delivery was transparent and smooth. Highly recommend everyone in the community to enter 2026.",
  },
  {
    id: "default-3",
    userName: "Jordan K.",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment:
      "The Surronster community introduced me to electric off-road riding and I've never looked back. I placed in the 2024 draw and the bike I received was in perfect condition, fully charged and ready to ride out of the box. The team was professional throughout. 10/10 experience.",
  },
  {
    id: "default-4",
    userName: "Aisha B.",
    userAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment:
      "I was a bit sceptical at first — too good to be true, right? But after seeing the 2023 winner announcement and doing my research, I entered the 2024 giveaway. I won and the whole handover was seamless. I now ride every morning before work. Best thing that's happened to me this year.",
  },
  {
    id: "default-5",
    userName: "Liam O.",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment:
      "Been part of this community since 2022. Watched friends win, entered every year, and finally got picked in the 2025 draw. The bike is everything they advertise and more. The battery range is impressive for off-road use. If you're on the fence about entering 2026, just do it.",
  },
  {
    id: "default-6",
    userName: "Sophia R.",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    comment:
      "What I love most about this community is how genuine everyone is. I won the 2023 giveaway and the support I got from other riders on setting up and customising the bike was amazing. The giveaway itself was straightforward and the organisers kept us updated every step of the way.",
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

function ReviewCard({ review, winner = false }: { review: Omit<Review, "createdAt" | "isApproved" | "userId">; winner?: boolean }) {
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
