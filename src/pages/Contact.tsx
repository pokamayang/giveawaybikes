import { Mail, MessageCircle, MapPin } from "lucide-react";
import { useSettings } from "../hooks/useSiteData";

export default function Contact() {
  const { settings } = useSettings();

  const wa = settings.whatsappNumber?.replace(/\D/g, "");
  const msg = encodeURIComponent(settings.whatsappMessage || "Hello from the website");

  return (
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl text-[#0F172A] mb-3">Contact Us</h1>
          <p className="text-slate-600">Questions about the giveaway or community? Reach out.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <a
            href={`mailto:${settings.contactEmail}`}
            className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A]/10 flex items-center justify-center mb-4">
              <Mail className="w-7 h-7 text-[#1E3A8A]" />
            </div>
            <h3 className="font-semibold text-[#0F172A]">Email</h3>
            <p className="text-slate-600 text-sm mt-1 break-all">{settings.contactEmail}</p>
          </a>

          {wa && (
            <a
              href={`https://wa.me/${wa}?text=${msg}`}
              target="_blank"
              rel="noreferrer"
              className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-[#0F172A]">WhatsApp</h3>
              <p className="text-slate-600 text-sm mt-1">Chat with us</p>
            </a>
          )}
        </div>

        <div className="card p-6 text-center text-slate-500 text-sm">
          <MapPin className="w-5 h-5 mx-auto mb-2 opacity-50" />
          <p>For official rules, eligibility, and prize terms, please review the Giveaway Rules page.</p>
        </div>
      </div>
    </div>
  );
}
