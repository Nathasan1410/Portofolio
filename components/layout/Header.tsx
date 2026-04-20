import { FaYoutube, FaTiktok, FaTwitter, FaInstagram } from "react-icons/fa";
import { socials } from "@/lib/data/socials";

const socialLinks = [
  { href: socials.youtube, icon: FaYoutube, label: "YouTube", hoverColor: "hover:text-red-500" },
  { href: socials.tiktok, icon: FaTiktok, label: "TikTok", hoverColor: "hover:text-white" },
  { href: socials.twitter, icon: FaTwitter, label: "Twitter/X", hoverColor: "hover:text-sky-400" },
  { href: socials.instagram, icon: FaInstagram, label: "Instagram", hoverColor: "hover:text-pink-500" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <span className="font-display font-bold text-lg">Portfolio</span>
        <nav className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label, hoverColor }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`text-muted-foreground transition-colors duration-200 ${hoverColor}`}
            >
              <Icon size={20} />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
