import { Link } from "react-router-dom";
import {
  Zap,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MessageCircle,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useSettings } from "../hooks/useSiteData";

// TikTok SVG icon (not in Lucide)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.77a8.17 8.17 0 0 0 4.78 1.54V6.85a4.85 4.85 0 0 1-1.01-.16z" />
    </svg>
  );
}

export default function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  const wa = settings.whatsappNumber?.replace(/\D/g, "");
  const waMsg = encodeURIComponent(
    settings.whatsappMessage || "Hi! I want to enter the 2026 Surronster Giveaway."
  );

  const socialLinks = [
    { icon: Facebook, href: settings.socialLinks?.facebook, label: "Facebook" },
    { icon: Instagram, href: settings.socialLinks?.instagram, label: "Instagram" },
    { icon: Twitter, href: settings.socialLinks?.twitter, label: "X / Twitter" },
    { icon: Youtube, href: settings.socialLinks?.youtube, label: "YouTube" },
  ];

  const tiktokHref = settings.socialLinks?.tiktok;

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/#giveaway", label: "Giveaway" },
    { to: "/#bike", label: "The Bike" },
    { to: "/#how-it-works", label: "How It Works" },
    { to: "/#winners", label: "Winners" },
    { to: "/#community", label: "Community" },
    { to: "/#faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { to: "/about", label: "About Us" },
    { to: "/rules", label: "Giveaway Rules" },
    { to: "/terms", label: "Terms & Conditions" },
    { to: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-[#1E3A8A] via-[#F97316] to-[#1E3A8A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-display text-xl mb-4"
              aria-label="Surronster Giveaway Community — Home"
            >
              <div className="w-9 h-9 rounded-xl bg-[#F97316] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              SURRONSTER
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {settings.tagline || "Your Next Ride Could Be Electric."}
            </p>

            <p className="text-white/35 text-xs leading-relaxed">
              Independent giveaway community platform. Not an official Sur-Ron / manufacturer promotion unless explicitly stated and authorized.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) =>
                href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/8 hover:bg-[#F97316] flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : null
              )}
              {tiktokHref && (
                <a
                  href={tiktokHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-[#F97316] flex items-center justify-center transition-colors duration-200"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm tracking-widest text-white/50 uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-[#F97316] transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <ChevronRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-display text-sm tracking-widest text-white/50 uppercase mb-5">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 hover:text-[#F97316] transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <ChevronRight
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm tracking-widest text-white/50 uppercase mb-5">
              Contact
            </h3>
            <div className="space-y-3">
              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-[#F97316] transition-colors duration-150 group"
                  aria-label={`Email us at ${settings.contactEmail}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/8 group-hover:bg-[#F97316]/20 flex items-center justify-center transition-colors shrink-0">
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <span className="truncate">{settings.contactEmail}</span>
                </a>
              )}

              {wa && (
                <a
                  href={`https://wa.me/${wa}?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-[#F97316] transition-colors duration-150 group"
                  aria-label="Chat with us on WhatsApp"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/8 group-hover:bg-[#F97316]/20 flex items-center justify-center transition-colors shrink-0">
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <span>WhatsApp</span>
                </a>
              )}

              <a
                href="/contact"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-[#F97316] transition-colors duration-150 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/8 group-hover:bg-[#F97316]/20 flex items-center justify-center transition-colors shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <span>Contact Page</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/35">
          <p>© {year} Surronster Giveaway Community. All rights reserved.</p>
          <p className="text-right">
            Giveaway rules vary by jurisdiction. See{" "}
            <Link to="/rules" className="underline hover:text-white/60 transition-colors">
              official rules
            </Link>{" "}
            for full eligibility &amp; restrictions.
          </p>
        </div>
      </div>
    </footer>
  );
}
