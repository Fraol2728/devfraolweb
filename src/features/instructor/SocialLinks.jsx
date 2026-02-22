import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const socialPlatforms = [
  { name: "GitHub", href: "https://github.com/devfraol", Icon: FaGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/devfraol", Icon: FaLinkedin },
  { name: "Twitter X", href: "https://x.com/devfraol", Icon: FaXTwitter },
  { name: "Instagram", href: "https://instagram.com/devfraol", Icon: FaInstagram },
];

export const SocialLinks = ({ className = "", iconClassName = "", iconOnly = false }) => {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>
      {socialPlatforms.map(({ name, href, Icon }) => (
        <li key={name}>
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Dev Fraol on ${name}`}
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileFocus={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:text-[#FF3B30] ${iconClassName}`.trim()}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {!iconOnly && <span>{name}</span>}
          </motion.a>
        </li>
      ))}
    </ul>
  );
};
