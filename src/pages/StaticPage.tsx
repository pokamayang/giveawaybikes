import { usePageContent } from "../hooks/useSiteData";

const titles: Record<string, string> = {
  about: "About",
  rules: "Giveaway Rules",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
};

const defaults: Record<string, string> = {
  about: `Surronster Giveaway Community 2026 is an independent community platform focused on electric off-road riding and periodic giveaways.

We operate the promotions described on this website. This is not an official Sur-Ron / manufacturer website or promotion unless we have obtained explicit authorization and state so clearly.

Always read the official giveaway rules for eligibility, geographic restrictions, age requirements, no-purchase-necessary language, prize terms, and applicable law.`,
  rules: `OFFICIAL GIVEAWAY RULES (SUMMARY)

1. Sponsor / Operator: As stated on the giveaway page (Surronster Giveaway Community or named operator).
2. Eligibility: Age and residency requirements apply. Void where prohibited. See full rules for geographic restrictions.
3. No Purchase Necessary: Where required by law, no purchase is necessary to enter or win.
4. How to Enter: Follow the methods described on the site and in the full rules. Entry limits apply.
5. Winner Selection: As stated (typically random drawing among eligible entries).
6. Notification: Winner contacted via provided details and must respond within the stated period.
7. Prize: Prize description, approximate retail value, and delivery terms are in the full rules. Taxes, duties, and any shipping restrictions are the responsibility of the winner where applicable.
8. Publicity: By accepting, winner may be required to provide a release for use of name/likeness where lawful.
9. Limitation of Liability & Governing Law: As set out in the full official rules.

This is a summary only. The full official rules control. Have rules reviewed for jurisdictions where you operate.`,
  terms: `TERMS OF USE

By accessing this website you agree to these terms. Content is provided for informational purposes regarding the community and giveaways. We may update content and rules at any time. Use of the site is at your own risk. We do not guarantee uninterrupted access. Intellectual property on the site remains with its owners. Do not misuse the site or attempt unauthorized access.`,
  privacy: `PRIVACY POLICY

We collect information you provide (e.g. when contacting us or entering a promotion) and technical data such as device/browser information. We use data to operate the site, run giveaways, communicate with you, and comply with law. We do not sell personal data. Access is limited to those who need it. Contact us to exercise applicable rights (access, correction, deletion) where available. This policy may be updated; check this page periodically.`,
};

export default function StaticPage({ page }: { page: "about" | "rules" | "terms" | "privacy" }) {
  const { content } = usePageContent();
  const body = content[page] || defaults[page];

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl text-[#0F172A] mb-8">{titles[page]}</h1>
        <div className="card p-6 md:p-8 prose prose-slate max-w-none">
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm md:text-base">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
