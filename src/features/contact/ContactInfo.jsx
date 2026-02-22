import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "@/features/instructor/SocialLinks";

const contactDetails = [
  { icon: Mail, label: "Email", value: "hello@devfraol.academy", href: "mailto:hello@devfraol.academy" },
  { icon: Phone, label: "Phone", value: "+1 (555) 867-5309", href: "tel:+15558675309" },
  { icon: MapPin, label: "Location", value: "Remote-first · Serving globally", href: null },
];

export const ContactInfo = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-md"
    >
      <h2 className="text-2xl font-semibold text-white">Quick contact info</h2>
      <ul className="mt-5 space-y-4">
        {contactDetails.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="mt-0.5 rounded-lg border border-white/10 bg-black/30 p-2 text-[#FF3B30]">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm text-zinc-400">{label}</p>
              {href ? (
                <a href={href} className="text-zinc-100 transition hover:text-[#FF3B30]">
                  {value}
                </a>
              ) : (
                <p className="text-zinc-100">{value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="mb-3 text-sm text-zinc-400">Follow Dev Fraol Academy</p>
        <SocialLinks className="gap-2" iconClassName="bg-black/30 border-white/10 text-zinc-200 hover:text-[#FF3B30]" iconOnly />
      </div>
    </motion.article>
  );
};
