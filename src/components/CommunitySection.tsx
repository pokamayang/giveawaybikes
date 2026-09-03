import { useCommunityPosts } from "../hooks/useSiteData";
import { Calendar, Megaphone, Wrench, BookOpen, PartyPopper, Users } from "lucide-react";

const typeConfig: Record<
  string,
  { label: string; Icon: typeof Megaphone; color: string; bg: string }
> = {
  announcement: { label: "Announcement", Icon: Megaphone, color: "text-[#1E3A8A]", bg: "bg-[#1E3A8A]/10" },
  story: { label: "Story", Icon: BookOpen, color: "text-[#F97316]", bg: "bg-orange-50" },
  build: { label: "Build", Icon: Wrench, color: "text-green-700", bg: "bg-green-50" },
  event: { label: "Event", Icon: PartyPopper, color: "text-purple-700", bg: "bg-purple-50" },
};

export default function CommunitySection() {
  const { posts, loading } = useCommunityPosts();
  const published = posts.filter((p) => p.isPublished);

  return (
    <section id="community" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">COMMUNITY</span>
          <h2 className="section-title mb-4">Welcome to the Community</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Connect with fellow electric-bike enthusiasts, discover new riding experiences, share your builds, and follow the latest giveaway updates.
          </p>
        </div>

        {/* Empty states */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="aspect-[16/10] bg-slate-100" />
                <div className="p-5 space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-1/4" />
                  <div className="h-5 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : published.length === 0 ? (
          <div className="card p-16 text-center text-slate-500 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#1E3A8A]/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#1E3A8A]/50" aria-hidden="true" />
            </div>
            <p className="font-medium text-[#0F172A] mb-1">Community stories coming soon</p>
            <p className="text-sm">Events, builds, and updates will appear here. Check back soon!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.slice(0, 6).map((post) => {
              const cfg = typeConfig[post.type] ?? typeConfig.announcement;
              return (
                <article key={post.id} className="card-hover group flex flex-col">
                  {post.imageUrl ? (
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-[#1E3A8A]/10 to-[#F97316]/10 flex items-center justify-center">
                      <cfg.Icon className="w-12 h-12 text-[#1E3A8A]/30" aria-hidden="true" />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${cfg.color} mb-2`}>
                      <cfg.Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      {cfg.label}
                    </div>
                    <h3 className="font-display text-lg text-[#0F172A] mb-2 leading-snug">{post.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-3 flex-1 leading-relaxed">{post.content}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-50 pt-4">
                      <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        {post.createdAt?.toDate
                          ? post.createdAt.toDate().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Recently"}
                      </span>
                      {post.author && (
                        <>
                          <span>·</span>
                          <span className="truncate">{post.author}</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
