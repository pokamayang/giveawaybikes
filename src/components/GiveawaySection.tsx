import {
  Calendar,
  Users,
  Trophy,
  FileText,
  Shield,
  MessageCircle,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useGiveaway, useSettings } from "../hooks/useSiteData";
import { Link } from "react-router-dom";

export default function GiveawaySection() {
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

  const formatDate = (d: string) => {
    if (!d) return "TBA";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return d;
    }
  };

  const details = [
    {
      icon: Calendar,
      label: "Giveaway Closes",
      value: formatDate(giveaway.closingDate),
      accent: false,
    },
    {
      icon: Trophy,
      label: "Winner Announced",
      value: formatDate(giveaway.announcementDate),
      accent: false,
    },
    {
      icon: Users,
      label: "Eligibility",
      value: giveaway.eligibility,
      accent: false,
    },
    {
      icon: Clock,
      label: "Entries & Selection",
      value: `Max ${giveaway.maxEntries} entr${giveaway.maxEntries === 1 ? "y" : "ies"} per person. ${giveaway.selectionMethod}`,
      accent: false,
    },
    {
      icon: FileText,
      label: "Official Rules",
      value: null,
      accent: false,
      isLink: true,
    },
    {
      icon: Shield,
      label: giveaway.sponsorName || "Operator",
      value: giveaway.sponsorNote,
      accent: true,
    },
  ];

  return (
    <section id="giveaway" className="section-padding bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">{giveaway.title}</span>
          <h2 className="section-title">Enter for a Chance to Win</h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            One lucky winner takes home an electric off-road machine. Here's everything you need to know.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Prize card — takes 2 cols */}
          <div className="lg:col-span-2 card group">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src={giveaway.prizeImage}
                alt={giveaway.prizeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#F97316] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  2026 Prize
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl text-[#0F172A] mb-2">{giveaway.prizeName}</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">{giveaway.prizeDescription}</p>
              <button
                onClick={handleEnter}
                className="btn-action w-full inline-flex items-center justify-center gap-2"
                aria-label="Enter the giveaway"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                ENTER NOW
              </button>
            </div>
          </div>

          {/* Details — takes 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            {details.map((d, i) => (
              <div
                key={i}
                className={`card p-5 flex gap-4 ${d.accent ? "border-l-4 border-[#F97316]" : ""}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    d.accent
                      ? "bg-orange-50 text-[#F97316]"
                      : "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                  }`}
                >
                  <d.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#0F172A] text-sm">{d.label}</h4>
                  {d.isLink ? (
                    <Link
                      to="/rules"
                      className="inline-flex items-center gap-1 text-[#1E3A8A] text-sm mt-1 hover:underline font-medium"
                    >
                      View Official Giveaway Rules
                      <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  ) : (
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
