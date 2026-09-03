import { useState, type FormEvent } from "react";
import { useReviews } from "../hooks/useSiteData";
import { Star, Send, CheckCircle } from "lucide-react";

export default function SubmitReview() {
  const { addReview } = useReviews(true);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");

    if (!userName.trim() || !comment.trim()) {
      setErr("Please fill in your name and review before submitting.");
      return;
    }
    if (comment.trim().length < 10) {
      setErr("Your review is too short. Please write at least 10 characters.");
      return;
    }

    setLoading(true);
    try {
      await addReview({
        userName: userName.trim(),
        userAvatar: "",
        rating,
        comment: comment.trim(),
        isApproved: false,
      });
      setSuccess(true);
      setUserName("");
      setComment("");
      setRating(5);
    } catch {
      setErr("Could not submit your review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="section-label">SHARE YOUR EXPERIENCE</span>
          <h2 className="font-display text-2xl md:text-3xl text-[#0F172A]">Leave a Review</h2>
          <p className="text-slate-500 text-sm mt-2">
            Your review will appear after admin approval.
          </p>
        </div>

        {success ? (
          <div className="card p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
            </div>
            <h3 className="font-display text-xl text-[#0F172A] mb-2">Thanks for your review!</h3>
            <p className="text-slate-500 text-sm mb-6">
              Your review has been submitted and will appear once approved by our team.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="btn-outline text-sm px-6 py-2.5"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="review-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Your Name *
              </label>
              <input
                id="review-name"
                className="input-field"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Display name shown with your review"
                maxLength={60}
                required
              />
            </div>

            {/* Rating */}
            <div>
              <span className="block text-sm font-medium text-slate-700 mb-1.5">Rating *</span>
              <div className="flex gap-1" role="group" aria-label="Rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHovered(i + 1)}
                    onMouseLeave={() => setHovered(0)}
                    className="p-1 transition-transform hover:scale-110"
                    aria-label={`Rate ${i + 1} star${i !== 0 ? "s" : ""}`}
                    aria-pressed={rating === i + 1}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        i < (hovered || rating)
                          ? "fill-[#F97316] text-[#F97316]"
                          : "text-slate-200"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="review-comment" className="block text-sm font-medium text-slate-700 mb-1.5">
                Your Review *
              </label>
              <textarea
                id="review-comment"
                className="input-field min-h-[120px] resize-y"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with the community…"
                maxLength={500}
                required
              />
              <p className="text-xs text-slate-400 mt-1 text-right">{comment.length}/500</p>
            </div>

            {err && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl" role="alert">
                {err}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-action w-full inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              {loading ? "Submitting…" : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
