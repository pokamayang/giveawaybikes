import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useFAQs } from "../hooks/useSiteData";

const defaultFaqs = [
  {
    id: "d1",
    question: "Who can enter?",
    answer:
      "Eligibility is defined in the official rules — open to residents aged 16 and over in eligible countries. Geographic restrictions and other conditions apply. See the Giveaway Rules page for full details.",
    order: 1,
  },
  {
    id: "d2",
    question: "Is there an entry fee?",
    answer:
      "No. No purchase is necessary to enter or win where required by law. Any optional participation methods are fully described in the official rules.",
    order: 2,
  },
  {
    id: "d3",
    question: "When does the giveaway end?",
    answer:
      "The closing date is published on this site and in the official rules. All entries must be received before the stated deadline to be eligible.",
    order: 3,
  },
  {
    id: "d4",
    question: "How will the winner be selected?",
    answer:
      "By the method stated in the official rules — typically a random drawing from all eligible entries conducted by the operator under the rules.",
    order: 4,
  },
  {
    id: "d5",
    question: "How will the winner be contacted?",
    answer:
      "Via the contact details provided at entry (email and/or phone). The winner must respond within the timeframe stated in the rules to claim their prize.",
    order: 5,
  },
  {
    id: "d6",
    question: "How is the prize delivered?",
    answer:
      "Prize delivery terms — including shipping arrangements, collection, applicable taxes and duties — are set out in the official rules and confirmed directly with the verified winner.",
    order: 6,
  },
  {
    id: "d7",
    question: "What happens if the winner doesn't respond?",
    answer:
      "If the selected winner fails to respond or complete verification within the stated period, an alternate winner may be selected in accordance with the official rules.",
    order: 7,
  },
];

export default function FAQSection() {
  const { faqs, loading } = useFAQs();
  const list = faqs.length > 0 ? faqs : defaultFaqs;
  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">SUPPORT</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="mt-4 text-slate-600 text-sm">
            Can't find your answer? Reach us via the{" "}
            <a href="/contact" className="text-[#1E3A8A] hover:underline font-medium">
              Contact page
            </a>
            .
          </p>
        </div>

        {loading && faqs.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card p-5 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`card overflow-hidden transition-shadow duration-200 ${isOpen ? "shadow-md" : ""}`}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${
                          isOpen ? "bg-[#1E3A8A] text-white" : "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <span className="font-semibold text-[#0F172A] text-sm md:text-base leading-snug">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1E3A8A] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-200 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pl-14 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
