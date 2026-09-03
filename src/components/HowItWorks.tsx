import { UserPlus, CheckCircle, Trophy, PhoneCall } from "lucide-react";
import { useGiveaway, useSettings } from "../hooks/useSiteData";
import { MessageCircle } from "lucide-react";

const stepIcons = [UserPlus, CheckCircle, Trophy, PhoneCall];
const stepColors = [
  "bg-[#1E3A8A]",
  "bg-[#1E3A8A]",
  "bg-[#1E3A8A]",
  "bg-[#1E3A8A]",
];

export default function HowItWorks() {
  const { giveaway } = useGiveaway();
  const { settings } = useSettings();

  const steps = giveaway.howToEnter?.length
    ? giveaway.howToEnter.map((text, i) => ({
        Icon: stepIcons[i % stepIcons.length],
        num: String(i + 1).padStart(2, "0"),
        title: `Step ${String(i + 1).padStart(2, "0")}`,
        desc: text,
        color: stepColors[i % stepColors.length],
      }))
    : [
        { Icon: UserPlus, num: "01", title: "Register", desc: "Join the community and create your entry profile.", color: "bg-[#1E3A8A]" },
        { Icon: CheckCircle, num: "02", title: "Complete Entry", desc: "Follow the eligible entry method described in the official rules.", color: "bg-[#1E3A8A]" },
        { Icon: Trophy, num: "03", title: "Winner Selected", desc: "Random drawing conducted according to the official rules.", color: "bg-[#1E3A8A]" },
        { Icon: PhoneCall, num: "04", title: "Contacted & Verified", desc: "Winner is notified and must complete verification to claim prize.", color: "bg-[#1E3A8A]" },
      ];

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
    <section id="how-it-works" className="section-padding bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">PROCESS</span>
          <h2 className="section-title">How It Works</h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm md:text-base">
            Entering the giveaway is simple. Follow these steps for your chance to win.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-12 mt-6">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-white rounded-2xl shadow-sm border border-slate-100 pt-10 pb-6 px-6 text-center group hover:shadow-md transition-shadow duration-200">
              {/* Step number badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center shadow-lg ring-4 ring-[#F8FAFC] z-10">
                {i + 1}
              </div>

              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 bg-slate-200 z-10" />
              )}

              <div
                className={`w-16 h-16 mx-auto mb-5 rounded-2xl ${step.color} text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
              >
                <step.Icon className="w-7 h-7" aria-hidden="true" />
              </div>

              <h3 className="font-display text-lg text-[#0F172A] mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={handleEnter}
            className="btn-action inline-flex items-center gap-2 px-10"
            aria-label="Enter the giveaway"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            START NOW — ENTER GIVEAWAY
          </button>
        </div>
      </div>
    </section>
  );
}
