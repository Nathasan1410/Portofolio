"use client"

import { motion } from "framer-motion"
import { FaYoutube, FaTiktok, FaGithub, FaDiscord, FaInstagram } from "react-icons/fa"
import { socials } from "@/lib/data/socials"

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const socialItems = [
  { href: socials.youtube, icon: FaYoutube, label: 'YouTube', color: '#FF0000' },
  { href: socials.tiktok, icon: FaTiktok, label: 'TikTok', color: '#00f2ea' },
  { href: socials.twitter, icon: XIcon, label: 'X', color: '#000000' },
  { href: socials.instagram, icon: FaInstagram, label: 'Instagram', color: '#E4405F' },
  { href: socials.github, icon: FaGithub, label: 'GitHub', color: '#181717' },
  { href: socials.discord, icon: FaDiscord, label: 'Discord', color: '#5865F2' },
]

export function SocialHighlightsBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      {/* macOS Dock Container */}
      <div className="flex justify-center">
        <motion.div
          className="flex items-end gap-2 px-3 py-2 rounded-2xl bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
        >
          {socialItems.map(({ href, icon: Icon, label, color }, index) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1"
              initial={{ y: 0 }}
              whileHover={{
                scale: 1.2,
                y: -8
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
                mass: 0.5
              }}
            >
              {/* Icon Container - Rounded Square */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${color}DD, ${color})`,
                }}
              >
                <Icon className="h-6 w-6 text-white drop-shadow-md" />
              </div>
              {/* Label - Hidden by default, shows on dock hover */}
              <motion.span
                className="text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
