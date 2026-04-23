import {
  FiGithub,
  FiFileText,
  FiInstagram,
  FiLinkedin,
  FiMessageCircle,
} from "react-icons/fi";
import { FaTiktok, FaYoutube } from "react-icons/fa";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const socials = {
  youtube: "https://youtube.com/@nathanaelsantoso",
  tiktok: "https://tiktok.com/@nathanaelsantoso",
  twitter: "https://x.com/nathanaelsantoso",
  instagram: "https://instagram.com/nathanaelsantoso",
  github: "https://github.com/Nathasan1410",
  linkedin: "https://linkedin.com/in/nathanaelsantoso",
  discord: "https://discord.com/users/nathanaelsantoso",
  resume: "https://drive.google.com/file/d/YOUR_FILE_ID/view",
} as const;

export const socialLinks = [
  { id: "youtube", label: "YouTube", href: socials.youtube, group: "social", icon: FaYoutube },
  { id: "tiktok", label: "TikTok", href: socials.tiktok, group: "social", icon: FaTiktok },
  { id: "twitter", label: "X", href: socials.twitter, group: "social", icon: XIcon },
  { id: "instagram", label: "Instagram", href: socials.instagram, group: "social", icon: FiInstagram },
  { id: "github", label: "GitHub", href: socials.github, group: "professional", icon: FiGithub },
  { id: "linkedin", label: "LinkedIn", href: socials.linkedin, group: "professional", icon: FiLinkedin },
  { id: "discord", label: "Discord", href: socials.discord, group: "social", icon: FiMessageCircle },
  { id: "resume", label: "Resume", href: socials.resume, group: "professional", icon: FiFileText },
] as const;

export type SocialLink = (typeof socialLinks)[number];
export type SocialLinkId = SocialLink["id"];
export type SocialLinkGroup = SocialLink["group"];

// Icon component type
export type SocialIconComponent = React.ComponentType<{ className?: string }>;
