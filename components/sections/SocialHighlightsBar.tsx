"use client"

import { motion } from "framer-motion"
import { FaYoutube, FaTiktok, FaGithub, FaDiscord, FaInstagram } from "react-icons/fa"
import { socials } from "@/lib/data/socials"
import { cn } from "@/lib/utils"

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const socialItems = [
  { href: socials.youtube, icon: FaYoutube, label: 'YouTube' },
  { href: socials.tiktok, icon: FaTiktok, label: 'TikTok' },
  { href: socials.twitter, icon: XIcon, label: 'X' },
  { href: socials.instagram, icon: FaInstagram, label: 'Instagram' },
  { href: socials.github, icon: FaGithub, label: 'GitHub' },
  { href: socials.discord, icon: FaDiscord, label: 'Discord' },
]

export function SocialHighlightsBar() {
  return (
    <motion.section
      className="py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-6">
        {socialItems.map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-200 border border-border/50">
              <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.section>
  )
}
