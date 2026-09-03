import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap, MessageCircle, Mail } from "lucide-react";
import { useSettings } from "../hooks/useSiteData";

const navLinks = [
  { to: "/", label: "HOME", scroll: null },
  { to: "/#giveaway", label: "GIVEAWAY", scroll: "giveaway" },
  { to: "/#bike", label: "THE BIKE", scroll: "bike" },
  { to: "/#how-it-works", label: "HOW IT WORKS", scroll: "how-it-works" },
  { to: "/#winners", label: "WINNERS", scroll: "winners" },
  { to: "/#community", label: "COMMUNITY", scroll: "community" },
  { to: "/#faq", label: "FAQ", scroll: "faq" },
  { to: "/contact", label: "CONTACT", scroll: null },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSettings();
  const location = useLocation();

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleGiveawayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const wa = settings.whatsappNumber?.replace(/\D/g, "");
    const msg = encodeURIComponent(
      settings.whatsappMessage || "Hi! I want to enter the 2026 Surronster Giveaway."
    );
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${msg}`, "_blank");
    } else if (settings.contactEmail) {
      window.location.href = `mailto:${settings.contactEmail}?subject=Enter%20Giveaway&body=${msg}`;
    }
    setOpen(false);
  };

  const scrollTo = (hash: string | null) => {
    setOpen(false);
    if (!hash) return; // handled by Link

    if (location.pathname !== "/") {
      window.location.href = "/" + `#${hash}`;
      return;
    }
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-[#1E3A8A] text-white transition-shadow duration-300 ${
        scrolled ? "shadow-xl shadow-[#0F172A]/30" : ""
      }`}
    >
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-[#1E3A8A] via-[#F97316] to-[#1E3A8A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-lg md:text-xl tracking-wide shrink-0"
            aria-label="Surronster Giveaway Community 2026 — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="hidden sm:inline">SURRONSTER</span>
            <span className="sm:hidden">SGC</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 text-xs font-semibold tracking-wider" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.scroll ? (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.scroll)}
                  className="px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleGiveawayClick}
              className="hidden sm:inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-xs tracking-wider px-5 py-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              aria-label="Enter the giveaway"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              ENTER GIVEAWAY
            </button>

            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden border-t border-white/10 bg-[#1E3A8A] overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) =>
            link.scroll ? (
              <button
                key={link.label}
                onClick={() => scrollTo(link.scroll)}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-white/10 text-sm font-semibold tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}

          {/* Mobile CTAs */}
          <div className="pt-3 space-y-2 border-t border-white/10">
            <button
              onClick={handleGiveawayClick}
              className="w-full flex items-center justify-center gap-2 bg-[#F97316] text-white font-bold py-3.5 rounded-full text-sm tracking-wider transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              ENTER GIVEAWAY
            </button>

            {settings.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="w-full flex items-center justify-center gap-2 border border-white/30 text-white/80 hover:text-white py-3 rounded-full text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email Us
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
