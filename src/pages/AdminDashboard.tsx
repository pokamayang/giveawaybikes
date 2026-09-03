import { useState, type FormEvent, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  useSettings,
  useGiveaway,
  useReviews,
  useWinners,
  useCommunityPosts,
  useFAQs,
  usePageContent,
} from "../hooks/useSiteData";
import type { SiteSettings, Giveaway, Review, Winner, CommunityPost, FAQItem } from "../types";
import {
  LayoutDashboard,
  Settings,
  Gift,
  MessageSquare,
  Trophy,
  Users,
  HelpCircle,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Save,
  Star,
  ExternalLink,
  Pencil,
  X,
  Menu,
  Check,
  ChevronRight,
  Zap,
} from "lucide-react";

type Tab =
  | "overview"
  | "settings"
  | "giveaway"
  | "reviews"
  | "winners"
  | "community"
  | "faqs"
  | "pages"
  | "account";

export default function AdminDashboard() {
  const { user, isAdmin, loading, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-5 h-5 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
          <span>Loading…</span>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const tabs: { id: Tab; label: string; icon: typeof Settings }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "settings", label: "Site Settings", icon: Settings },
    { id: "giveaway", label: "Giveaway", icon: Gift },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
    { id: "winners", label: "Winners", icon: Trophy },
    { id: "community", label: "Community", icon: Users },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "pages", label: "Pages", icon: FileText },
    { id: "account", label: "Account", icon: Settings },
  ];

  const handleTabClick = (id: Tab) => {
    setTab(id);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen md:h-auto md:min-h-screen w-64 bg-[#0F172A] text-white shrink-0 z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 font-display text-base mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Admin Panel
            </div>
            <p className="text-white/50 text-xs truncate max-w-[170px]">{user.email}</p>
          </div>
          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabClick(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                tab === t.id
                  ? "bg-[#F97316] text-white shadow-md"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              <t.icon className="w-4 h-4 shrink-0" />
              {t.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-white/8 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            View Live Site
          </a>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-[#0F172A]" />
          </button>
          <span className="font-display text-sm text-[#0F172A]">
            {tabs.find((t) => t.id === tab)?.label}
          </span>
          <div className="w-9" />
        </div>

        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {tab === "overview" && <Overview setTab={setTab} />}
            {tab === "settings" && <SettingsTab />}
            {tab === "giveaway" && <GiveawayTab />}
            {tab === "reviews" && <ReviewsTab />}
            {tab === "winners" && <WinnersTab />}
            {tab === "community" && <CommunityTab />}
            {tab === "faqs" && <FAQsTab />}
            {tab === "pages" && <PagesTab />}
            {tab === "account" && (
              <AccountTab email={user.email || ""} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Overview ─────────────────────────────────────────────────── */
function Overview({ setTab }: { setTab: (t: Tab) => void }) {
  const cards = [
    { label: "Site Settings", tab: "settings" as Tab, desc: "Contact info, WhatsApp, social links, hero image", icon: Settings, color: "text-[#1E3A8A] bg-[#1E3A8A]/10" },
    { label: "Giveaway", tab: "giveaway" as Tab, desc: "Prize, dates, eligibility, sponsor details", icon: Gift, color: "text-[#F97316] bg-orange-50" },
    { label: "Reviews", tab: "reviews" as Tab, desc: "Approve, set avatars, edit & delete reviews", icon: MessageSquare, color: "text-purple-600 bg-purple-50" },
    { label: "Winners", tab: "winners" as Tab, desc: "Add/edit winners with photos & testimonials", icon: Trophy, color: "text-yellow-600 bg-yellow-50" },
    { label: "Community", tab: "community" as Tab, desc: "Posts, builds, events, announcements", icon: Users, color: "text-green-700 bg-green-50" },
    { label: "FAQs & Pages", tab: "faqs" as Tab, desc: "FAQ items and legal page content", icon: HelpCircle, color: "text-slate-600 bg-slate-100" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-[#0F172A]">Welcome back 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Manage every aspect of your giveaway site from here.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <button
            key={c.tab}
            onClick={() => setTab(c.tab)}
            className="card p-5 text-left hover:shadow-lg hover:border-[#1E3A8A]/20 transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${c.color}`}>
                <c.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors">{c.label}</h3>
                <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{c.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1E3A8A] ml-auto shrink-0 mt-0.5 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Settings ─────────────────────────────────────────────────── */
function SettingsTab() {
  const { settings, saveSettings } = useSettings();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(settings); }, [settings]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      await saveSettings(form);
      setMsg("✓ Settings saved successfully.");
    } catch {
      setMsg("✗ Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Site Settings" subtitle="Control every setting that appears across the website." />
      <form onSubmit={handleSave} className="space-y-6">
        <SectionCard title="General">
          <Field label="Site Name" value={form.siteName} onChange={(v) => setForm({ ...form, siteName: v })} />
          <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
          <Field label="Hero Image URL" value={form.heroImage} onChange={(v) => setForm({ ...form, heroImage: v })} hint="Paste any image URL for the homepage background" />
          {form.heroImage && (
            <div className="rounded-xl overflow-hidden h-36">
              <img src={form.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
            </div>
          )}
        </SectionCard>

        <SectionCard title="Contact & Entry Links">
          <Field label="Contact Email" value={form.contactEmail} onChange={(v) => setForm({ ...form, contactEmail: v })} type="email" />
          <Field label="WhatsApp Number (with country code)" value={form.whatsappNumber} onChange={(v) => setForm({ ...form, whatsappNumber: v })} placeholder="+1234567890" />
          <Field label="Default WhatsApp Message (for giveaway link)" value={form.whatsappMessage} onChange={(v) => setForm({ ...form, whatsappMessage: v })} />
        </SectionCard>

        <SectionCard title="Social Media Platforms">
          <p className="text-xs text-slate-500 mb-3">Paste the full URL for each platform. Leave blank to hide.</p>
          {(["facebook", "instagram", "twitter", "youtube", "tiktok"] as const).map((k) => (
            <Field
              key={k}
              label={k === "twitter" ? "X / Twitter" : k.charAt(0).toUpperCase() + k.slice(1)}
              value={form.socialLinks?.[k] || ""}
              onChange={(v) => setForm({ ...form, socialLinks: { ...form.socialLinks, [k]: v } })}
              placeholder={`https://${k === "twitter" ? "x.com" : k + ".com"}/yourhandle`}
            />
          ))}
        </SectionCard>

        {msg && <StatusMsg msg={msg} />}
        <SaveButton saving={saving} />
      </form>
    </div>
  );
}

/* ─── Giveaway ─────────────────────────────────────────────────── */
function GiveawayTab() {
  const { giveaway, saveGiveaway } = useGiveaway();
  const [form, setForm] = useState<Giveaway>(giveaway);
  const [specsText, setSpecsText] = useState(giveaway.prizeSpecs.join("\n"));
  const [stepsText, setStepsText] = useState(giveaway.howToEnter.join("\n"));
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(giveaway);
    setSpecsText(giveaway.prizeSpecs.join("\n"));
    setStepsText(giveaway.howToEnter.join("\n"));
  }, [giveaway]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      await saveGiveaway({
        ...form,
        prizeSpecs: specsText.split("\n").map((s) => s.trim()).filter(Boolean),
        howToEnter: stepsText.split("\n").map((s) => s.trim()).filter(Boolean),
      });
      setMsg("✓ Giveaway saved.");
    } catch {
      setMsg("✗ Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader title="Giveaway Content" subtitle="Configure the prize, dates, rules, and entry details." />
      <form onSubmit={handleSave} className="space-y-6">
        <SectionCard title="Prize Details">
          <Field label="Giveaway Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field label="Prize Name" value={form.prizeName} onChange={(v) => setForm({ ...form, prizeName: v })} />
          <TextArea label="Prize Description" value={form.prizeDescription} onChange={(v) => setForm({ ...form, prizeDescription: v })} />
          <Field label="Prize Image URL" value={form.prizeImage} onChange={(v) => setForm({ ...form, prizeImage: v })} hint="Paste any image URL (Google, Pinterest, etc.)" />
          {form.prizeImage && (
            <div className="rounded-xl overflow-hidden h-40">
              <img src={form.prizeImage} alt="Prize preview" className="w-full h-full object-cover" />
            </div>
          )}
          <TextArea label="Specifications (one per line)" value={specsText} onChange={setSpecsText} rows={6} hint="Each line becomes a spec bullet point" />
        </SectionCard>

        <SectionCard title="Dates & Selection">
          <Field label="Closing Date (e.g. December 31, 2026)" value={form.closingDate} onChange={(v) => setForm({ ...form, closingDate: v })} />
          <Field label="Announcement Date" value={form.announcementDate} onChange={(v) => setForm({ ...form, announcementDate: v })} />
          <Field label="Max Entries per Person" value={String(form.maxEntries)} onChange={(v) => setForm({ ...form, maxEntries: Number(v) || 1 })} type="number" />
          <TextArea label="Selection Method" value={form.selectionMethod} onChange={(v) => setForm({ ...form, selectionMethod: v })} />
        </SectionCard>

        <SectionCard title="Eligibility & Entry Steps">
          <TextArea label="Eligibility Requirements" value={form.eligibility} onChange={(v) => setForm({ ...form, eligibility: v })} rows={3} />
          <TextArea label="How to Enter (one step per line)" value={stepsText} onChange={setStepsText} rows={5} />
        </SectionCard>

        <SectionCard title="Sponsor / Operator">
          <Field label="Sponsor / Operator Name" value={form.sponsorName} onChange={(v) => setForm({ ...form, sponsorName: v })} />
          <TextArea label="Sponsor Disclaimer Note" value={form.sponsorNote} onChange={(v) => setForm({ ...form, sponsorNote: v })} rows={3} />
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 rounded accent-[#1E3A8A]"
            />
            Giveaway is currently active
          </label>
        </SectionCard>

        {msg && <StatusMsg msg={msg} />}
        <SaveButton saving={saving} />
      </form>
    </div>
  );
}

/* ─── Reviews ─────────────────────────────────────────────────── */
function ReviewsTab() {
  const { reviews, addReview, updateReview, deleteReview } = useReviews(false);
  const [msg, setMsg] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Review>>({});
  const [avatarInputs, setAvatarInputs] = useState<Record<string, string>>({});
  const [addForm, setAddForm] = useState({ userName: "", comment: "", rating: 5, userAvatar: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const startEdit = (r: Review) => {
    setEditId(r.id);
    setEditData({ userName: r.userName, comment: r.comment, rating: r.rating, userAvatar: r.userAvatar, isApproved: r.isApproved });
  };

  const saveEdit = async (id: string) => {
    await updateReview(id, editData);
    setEditId(null);
    flash("✓ Review updated.");
  };

  const handleSetAvatar = async (id: string) => {
    const url = avatarInputs[id]?.trim();
    if (!url) return;
    await updateReview(id, { userAvatar: url });
    setAvatarInputs((p) => ({ ...p, [id]: "" }));
    flash("✓ Avatar updated.");
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    await addReview({ ...addForm, isApproved: true });
    setAddForm({ userName: "", comment: "", rating: 5, userAvatar: "" });
    setShowAdd(false);
    flash("✓ Review added.");
  };

  const handleDelete = async (id: string) => {
    await deleteReview(id);
    setConfirmDelete(null);
    flash("✓ Review deleted.");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Manage Reviews" subtitle="Approve, edit, set avatars, and delete community reviews." />
        <button onClick={() => setShowAdd(!showAdd)} className="btn-action inline-flex items-center gap-2 text-sm px-4 py-2.5 shrink-0">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {msg && <StatusMsg msg={msg} />}

      {showAdd && (
        <form onSubmit={handleAdd} className="card p-5 mb-6 space-y-3">
          <p className="font-semibold text-sm text-[#0F172A]">Add Review (Admin)</p>
          <Field label="Display Name" value={addForm.userName} onChange={(v) => setAddForm({ ...addForm, userName: v })} />
          <Field label="Avatar URL (optional)" value={addForm.userAvatar} onChange={(v) => setAddForm({ ...addForm, userAvatar: v })} />
          <TextArea label="Comment" value={addForm.comment} onChange={(v) => setAddForm({ ...addForm, comment: v })} />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setAddForm({ ...addForm, rating: n })} className="p-1">
                  <Star className={`w-6 h-6 ${n <= addForm.rating ? "fill-[#F97316] text-[#F97316]" : "text-slate-300"}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-action text-sm px-4 py-2 inline-flex items-center gap-2"><Check className="w-4 h-4" /> Save</button>
            <button type="button" onClick={() => setShowAdd(false)} className="btn-outline text-sm px-4 py-2">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 && <EmptyState icon={MessageSquare} text="No reviews yet." />}
        {reviews.map((r) => (
          <div key={r.id} className={`card p-5 ${!r.isApproved ? "border-l-4 border-yellow-400" : "border-l-4 border-green-400"}`}>
            {editId === r.id ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm">Editing Review</p>
                  <button onClick={() => setEditId(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                </div>
                <Field label="Name" value={editData.userName || ""} onChange={(v) => setEditData({ ...editData, userName: v })} />
                <TextArea label="Comment" value={editData.comment || ""} onChange={(v) => setEditData({ ...editData, comment: v })} />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button type="button" key={n} onClick={() => setEditData({ ...editData, rating: n })} className="p-1">
                        <Star className={`w-5 h-5 ${n <= (editData.rating || 0) ? "fill-[#F97316] text-[#F97316]" : "text-slate-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={!!editData.isApproved} onChange={(e) => setEditData({ ...editData, isApproved: e.target.checked })} className="w-4 h-4 rounded accent-[#1E3A8A]" />
                  Approved
                </label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => saveEdit(r.id)} className="btn-action text-sm px-4 py-2 inline-flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                  <button type="button" onClick={() => setEditId(null)} className="btn-outline text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 items-start">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-slate-100">
                  {r.userAvatar ? (
                    <img src={r.userAvatar} alt={r.userName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-[#1E3A8A] font-bold text-xl">
                      {(r.userName || "?")[0].toUpperCase()}
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-[#0F172A]">{r.userName}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {r.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`w-3.5 h-3.5 ${n <= r.rating ? "fill-[#F97316] text-[#F97316]" : "text-slate-200"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">{r.comment}</p>

                  {/* Avatar URL input */}
                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <input
                      type="url"
                      placeholder="Paste image URL to set/change avatar…"
                      className="input-field text-xs flex-1 min-w-[200px] py-2"
                      value={avatarInputs[r.id] || ""}
                      onChange={(e) => setAvatarInputs((p) => ({ ...p, [r.id]: e.target.value }))}
                    />
                    <button
                      type="button"
                      className="text-xs px-3 py-2 rounded-lg bg-[#1E3A8A] text-white hover:bg-[#162d6e] transition whitespace-nowrap"
                      onClick={() => handleSetAvatar(r.id)}
                    >
                      Set Avatar
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="text-xs px-3 py-1.5 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] hover:bg-[#1E3A8A]/20 transition inline-flex items-center gap-1"
                      onClick={() => updateReview(r.id, { isApproved: !r.isApproved })}
                    >
                      {r.isApproved ? "Unapprove" : "Approve"}
                    </button>
                    <button
                      type="button"
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition inline-flex items-center gap-1"
                      onClick={() => startEdit(r)}
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    {confirmDelete === r.id ? (
                      <span className="flex items-center gap-1 text-xs">
                        <span className="text-red-600">Confirm?</span>
                        <button type="button" className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => handleDelete(r.id)}>Yes</button>
                        <button type="button" className="px-2 py-1 rounded bg-slate-100" onClick={() => setConfirmDelete(null)}>No</button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition inline-flex items-center gap-1"
                        onClick={() => setConfirmDelete(r.id)}
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Winners ─────────────────────────────────────────────────── */
function WinnersTab() {
  const { winners, addWinner, updateWinner, deleteWinner } = useWinners();
  const blank = { displayName: "", prizeWon: "", announcementDate: "", photoUrl: "", testimonial: "", isPublished: true };
  const [form, setForm] = useState<Omit<Winner, "id">>(blank);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<Winner, "id">>(blank);
  const [msg, setMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.displayName.trim()) return;
    await addWinner(form);
    setForm(blank);
    flash("✓ Winner added.");
  };

  const startEdit = (w: Winner) => {
    setEditId(w.id);
    setEditData({ displayName: w.displayName, prizeWon: w.prizeWon, announcementDate: w.announcementDate, photoUrl: w.photoUrl, testimonial: w.testimonial, isPublished: w.isPublished });
  };

  const saveEdit = async (id: string) => {
    await updateWinner(id, editData);
    setEditId(null);
    flash("✓ Winner updated.");
  };

  const handleDelete = async (id: string) => {
    await deleteWinner(id);
    setConfirmDelete(null);
    flash("✓ Winner deleted.");
  };

  return (
    <div>
      <PageHeader title="Winners" subtitle="Add or edit winners. Only published entries appear on the site." />
      {msg && <StatusMsg msg={msg} />}

      {/* Add form */}
      <form onSubmit={handleAdd} className="card p-6 space-y-3 mb-8">
        <p className="font-semibold text-sm text-[#0F172A]">Add New Winner</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Display Name *" value={form.displayName} onChange={(v) => setForm({ ...form, displayName: v })} />
          <Field label="Prize Won" value={form.prizeWon} onChange={(v) => setForm({ ...form, prizeWon: v })} />
          <Field label="Announcement Date" value={form.announcementDate} onChange={(v) => setForm({ ...form, announcementDate: v })} placeholder="e.g. January 15, 2027" />
          <Field label="Photo URL (Google, Pinterest, etc.)" value={form.photoUrl} onChange={(v) => setForm({ ...form, photoUrl: v })} />
        </div>
        <TextArea label="Testimonial (with winner's permission)" value={form.testimonial} onChange={(v) => setForm({ ...form, testimonial: v })} />
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 rounded accent-[#1E3A8A]" />
          Publish immediately
        </label>
        <button type="submit" className="btn-action inline-flex items-center gap-2 text-sm px-4 py-2.5">
          <Plus className="w-4 h-4" /> Add Winner
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {winners.length === 0 && <EmptyState icon={Trophy} text="No winners added yet." />}
        {winners.map((w) => (
          <div key={w.id} className="card p-5">
            {editId === w.id ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">Editing Winner</p>
                  <button onClick={() => setEditId(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Display Name" value={editData.displayName} onChange={(v) => setEditData({ ...editData, displayName: v })} />
                  <Field label="Prize Won" value={editData.prizeWon} onChange={(v) => setEditData({ ...editData, prizeWon: v })} />
                  <Field label="Announcement Date" value={editData.announcementDate} onChange={(v) => setEditData({ ...editData, announcementDate: v })} />
                  <Field label="Photo URL" value={editData.photoUrl} onChange={(v) => setEditData({ ...editData, photoUrl: v })} />
                </div>
                {editData.photoUrl && (
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100">
                    <img src={editData.photoUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <TextArea label="Testimonial" value={editData.testimonial} onChange={(v) => setEditData({ ...editData, testimonial: v })} />
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={editData.isPublished} onChange={(e) => setEditData({ ...editData, isPublished: e.target.checked })} className="w-4 h-4 rounded accent-[#1E3A8A]" />
                  Published
                </label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => saveEdit(w.id)} className="btn-action text-sm px-4 py-2 inline-flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                  <button type="button" onClick={() => setEditId(null)} className="btn-outline text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-slate-100">
                    {w.photoUrl ? (
                      <img src={w.photoUrl} alt={w.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display text-[#1E3A8A] font-bold">
                        {(w.displayName || "?")[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0F172A]">{w.displayName}</p>
                    <p className="text-xs text-slate-500">{w.prizeWon} · {w.announcementDate}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${w.isPublished ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {w.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => startEdit(w)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition inline-flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                  <button type="button" onClick={() => updateWinner(w.id, { isPublished: !w.isPublished })} className={`text-xs px-3 py-1.5 rounded-lg transition ${w.isPublished ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}`}>
                    {w.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  {confirmDelete === w.id ? (
                    <span className="flex items-center gap-1 text-xs">
                      <span className="text-red-600">Confirm?</span>
                      <button type="button" className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => handleDelete(w.id)}>Yes</button>
                      <button type="button" className="px-2 py-1 rounded bg-slate-100" onClick={() => setConfirmDelete(null)}>No</button>
                    </span>
                  ) : (
                    <button type="button" onClick={() => setConfirmDelete(w.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition inline-flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Community ─────────────────────────────────────────────────── */
function CommunityTab() {
  const { posts, addPost, updatePost, deletePost } = useCommunityPosts();
  const blank = { title: "", content: "", imageUrl: "", type: "announcement" as CommunityPost["type"], author: "Admin", isPublished: true };
  const [form, setForm] = useState<Omit<CommunityPost, "id" | "createdAt">>(blank);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Omit<CommunityPost, "id" | "createdAt">>(blank);
  const [msg, setMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    await addPost(form);
    setForm(blank);
    flash("✓ Post added.");
  };

  const startEdit = (p: CommunityPost) => {
    setEditId(p.id);
    setEditData({ title: p.title, content: p.content, imageUrl: p.imageUrl, type: p.type, author: p.author, isPublished: p.isPublished });
  };

  const saveEdit = async (id: string) => {
    await updatePost(id, editData);
    setEditId(null);
    flash("✓ Post updated.");
  };

  const handleDelete = async (id: string) => {
    await deletePost(id);
    setConfirmDelete(null);
    flash("✓ Post deleted.");
  };

  const typeOptions: CommunityPost["type"][] = ["announcement", "story", "build", "event"];

  return (
    <div>
      <PageHeader title="Community Posts" subtitle="Manage announcements, stories, builds, and events." />
      {msg && <StatusMsg msg={msg} />}

      {/* Add form */}
      <form onSubmit={handleAdd} className="card p-6 space-y-3 mb-8">
        <p className="font-semibold text-sm text-[#0F172A]">Add New Post</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <Field label="Author" value={form.author} onChange={(v) => setForm({ ...form, author: v })} />
          <Field label="Image URL (optional)" value={form.imageUrl} onChange={(v) => setForm({ ...form, imageUrl: v })} />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
            <select className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as typeof form.type })}>
              {typeOptions.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <TextArea label="Content" value={form.content} onChange={(v) => setForm({ ...form, content: v })} rows={4} />
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 rounded accent-[#1E3A8A]" />
          Publish immediately
        </label>
        <button type="submit" className="btn-action inline-flex items-center gap-2 text-sm px-4 py-2.5">
          <Plus className="w-4 h-4" /> Add Post
        </button>
      </form>

      {/* List */}
      <div className="space-y-3">
        {posts.length === 0 && <EmptyState icon={Users} text="No posts yet." />}
        {posts.map((p) => (
          <div key={p.id} className="card p-5">
            {editId === p.id ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">Editing Post</p>
                  <button onClick={() => setEditId(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Title" value={editData.title} onChange={(v) => setEditData({ ...editData, title: v })} />
                  <Field label="Author" value={editData.author} onChange={(v) => setEditData({ ...editData, author: v })} />
                  <Field label="Image URL" value={editData.imageUrl} onChange={(v) => setEditData({ ...editData, imageUrl: v })} />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                    <select className="input-field" value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value as CommunityPost["type"] })}>
                      {typeOptions.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <TextArea label="Content" value={editData.content} onChange={(v) => setEditData({ ...editData, content: v })} rows={4} />
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={editData.isPublished} onChange={(e) => setEditData({ ...editData, isPublished: e.target.checked })} className="w-4 h-4 rounded accent-[#1E3A8A]" />
                  Published
                </label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => saveEdit(p.id)} className="btn-action text-sm px-4 py-2 inline-flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                  <button type="button" onClick={() => setEditId(null)} className="btn-outline text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0F172A] truncate">{p.title}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">{p.type} · {p.author} · <span className={p.isPublished ? "text-green-600" : "text-yellow-600"}>{p.isPublished ? "Published" : "Draft"}</span></p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button type="button" onClick={() => startEdit(p)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                  <button type="button" onClick={() => updatePost(p.id, { isPublished: !p.isPublished })} className={`text-xs px-3 py-1.5 rounded-lg ${p.isPublished ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"}`}>
                    {p.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  {confirmDelete === p.id ? (
                    <span className="flex items-center gap-1 text-xs">
                      <span className="text-red-600">Confirm?</span>
                      <button type="button" className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => handleDelete(p.id)}>Yes</button>
                      <button type="button" className="px-2 py-1 rounded bg-slate-100" onClick={() => setConfirmDelete(null)}>No</button>
                    </span>
                  ) : (
                    <button type="button" onClick={() => setConfirmDelete(p.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FAQs ─────────────────────────────────────────────────── */
function FAQsTab() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useFAQs();
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ question: string; answer: string }>({ question: "", answer: "" });
  const [msg, setMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim() || !a.trim()) return;
    await addFAQ({ question: q.trim(), answer: a.trim(), order: faqs.length + 1 });
    setQ(""); setA("");
    flash("✓ FAQ added.");
  };

  const startEdit = (f: FAQItem) => {
    setEditId(f.id);
    setEditData({ question: f.question, answer: f.answer });
  };

  const saveEdit = async (id: string) => {
    await updateFAQ(id, editData);
    setEditId(null);
    flash("✓ FAQ updated.");
  };

  const handleDelete = async (id: string) => {
    await deleteFAQ(id);
    setConfirmDelete(null);
    flash("✓ FAQ deleted.");
  };

  return (
    <div>
      <PageHeader title="FAQs" subtitle="Add, edit, or remove frequently asked questions." />
      {msg && <StatusMsg msg={msg} />}

      <form onSubmit={handleAdd} className="card p-6 space-y-3 mb-8">
        <p className="font-semibold text-sm text-[#0F172A]">Add New FAQ</p>
        <Field label="Question *" value={q} onChange={setQ} />
        <TextArea label="Answer *" value={a} onChange={setA} rows={3} />
        <button type="submit" className="btn-action inline-flex items-center gap-2 text-sm px-4 py-2.5">
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </form>

      <div className="space-y-3">
        {faqs.length === 0 && <EmptyState icon={HelpCircle} text="No FAQs yet. Add some above." />}
        {faqs.map((f, i) => (
          <div key={f.id} className="card p-5">
            {editId === f.id ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">Editing FAQ #{i + 1}</p>
                  <button onClick={() => setEditId(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                </div>
                <Field label="Question" value={editData.question} onChange={(v) => setEditData({ ...editData, question: v })} />
                <TextArea label="Answer" value={editData.answer} onChange={(v) => setEditData({ ...editData, answer: v })} rows={3} />
                <div className="flex gap-2">
                  <button type="button" onClick={() => saveEdit(f.id)} className="btn-action text-sm px-4 py-2 inline-flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                  <button type="button" onClick={() => setEditId(null)} className="btn-outline text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0F172A] mb-1">{f.question}</p>
                    <p className="text-sm text-slate-600">{f.answer}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button type="button" onClick={() => startEdit(f)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 inline-flex items-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                    {confirmDelete === f.id ? (
                      <span className="flex items-center gap-1 text-xs">
                        <button type="button" className="px-2 py-1 rounded bg-red-600 text-white" onClick={() => handleDelete(f.id)}>Yes</button>
                        <button type="button" className="px-2 py-1 rounded bg-slate-100" onClick={() => setConfirmDelete(null)}>No</button>
                      </span>
                    ) : (
                      <button type="button" onClick={() => setConfirmDelete(f.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Pages ─────────────────────────────────────────────────── */
function PagesTab() {
  const { content, savePageContent } = usePageContent();
  const [form, setForm] = useState(content);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { setForm(content); }, [content]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      await savePageContent(form);
      setMsg("✓ Pages saved successfully.");
    } catch {
      setMsg("✗ Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const pageLabels: Record<string, string> = {
    about: "About Us",
    rules: "Giveaway Rules",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
  };

  return (
    <div>
      <PageHeader title="Legal & Static Pages" subtitle="Edit the content for About, Rules, Terms, and Privacy pages." />
      <form onSubmit={handleSave} className="space-y-5">
        {(["about", "rules", "terms", "privacy"] as const).map((key) => (
          <div key={key} className="card p-5">
            <label className="block font-semibold text-[#0F172A] mb-1">{pageLabels[key]}</label>
            <p className="text-xs text-slate-500 mb-2">Accessible at /{key === "about" ? "about" : key === "rules" ? "rules" : key === "terms" ? "terms" : "privacy"}</p>
            <textarea
              className="input-field min-h-[160px] font-mono text-sm"
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        {msg && <StatusMsg msg={msg} />}
        <SaveButton saving={saving} />
      </form>
    </div>
  );
}

/* ─── Account ─────────────────────────────────────────────────── */
function AccountTab({ email }: { email: string }) {
  const { updateAdminEmail, updateAdminPassword } = useAuth();
  const [newEmail, setNewEmail] = useState(email);
  const [emailPass, setEmailPass] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPass, setSavingPass] = useState(false);

  const saveEmail = async (e: FormEvent) => {
    e.preventDefault();
    setErr(""); setMsg("");
    setSavingEmail(true);
    try {
      await updateAdminEmail(newEmail, emailPass);
      setMsg("✓ Verification email sent to new address. Please verify it to complete the change.");
      setEmailPass("");
    } catch (ex: unknown) {
      setErr(ex instanceof Error ? ex.message : "Failed to update email");
    } finally {
      setSavingEmail(false);
    }
  };

  const savePass = async (e: FormEvent) => {
    e.preventDefault();
    setErr(""); setMsg("");
    if (newPass !== confirmPass) { setErr("New passwords do not match."); return; }
    if (newPass.length < 8) { setErr("Password must be at least 8 characters."); return; }
    setSavingPass(true);
    try {
      await updateAdminPassword(currPass, newPass);
      setMsg("✓ Password updated successfully.");
      setCurrPass(""); setNewPass(""); setConfirmPass("");
    } catch (ex: unknown) {
      setErr(ex instanceof Error ? ex.message : "Failed to update password");
    } finally {
      setSavingPass(false);
    }
  };

  return (
    <div>
      <PageHeader title="Account & Credentials" subtitle="Update your admin login email and password." />
      {msg && <StatusMsg msg={msg} />}
      {err && <StatusMsg msg={err} error />}

      <div className="space-y-6">
        <form onSubmit={saveEmail} className="card p-6 space-y-4">
          <p className="font-semibold text-[#0F172A]">Change Login Email</p>
          <p className="text-xs text-slate-500">A verification email will be sent to the new address. The change takes effect after verification.</p>
          <Field label="New Email" value={newEmail} onChange={setNewEmail} type="email" />
          <Field label="Current Password (to confirm)" value={emailPass} onChange={setEmailPass} type="password" />
          <button type="submit" disabled={savingEmail} className="btn-action inline-flex items-center gap-2 disabled:opacity-60">
            {savingEmail ? "Sending…" : "Update Email"}
          </button>
        </form>

        <form onSubmit={savePass} className="card p-6 space-y-4">
          <p className="font-semibold text-[#0F172A]">Change Password</p>
          <Field label="Current Password" value={currPass} onChange={setCurrPass} type="password" />
          <Field label="New Password (min 8 characters)" value={newPass} onChange={setNewPass} type="password" />
          <Field label="Confirm New Password" value={confirmPass} onChange={setConfirmPass} type="password" />
          <button type="submit" disabled={savingPass} className="btn-action inline-flex items-center gap-2 disabled:opacity-60">
            {savingPass ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Shared sub-components ─────────────────────────────────────── */
function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl text-[#0F172A]">{title}</h1>
      {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-[#0F172A] text-sm mb-4 pb-3 border-b border-slate-100">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <textarea
        className="input-field"
        style={{ minHeight: `${rows * 40}px` }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function StatusMsg({ msg, error = false }: { msg: string; error?: boolean }) {
  return (
    <p className={`text-sm px-4 py-3 rounded-xl border ${error ? "text-red-700 bg-red-50 border-red-100" : "text-green-700 bg-green-50 border-green-100"}`}>
      {msg}
    </p>
  );
}

function SaveButton({ saving }: { saving: boolean }) {
  return (
    <button type="submit" disabled={saving} className="btn-action inline-flex items-center gap-2 disabled:opacity-60">
      <Save className="w-4 h-4" />
      {saving ? "Saving…" : "Save Changes"}
    </button>
  );
}

function EmptyState({ icon: Icon, text }: { icon: typeof Users; text: string }) {
  return (
    <div className="card p-12 text-center text-slate-400">
      <Icon className="w-10 h-10 mx-auto mb-3 opacity-30" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
