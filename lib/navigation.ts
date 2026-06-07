import { FiBriefcase, FiFolder, FiUser } from "react-icons/fi";
import type { IconType } from "react-icons";

export const TAB_NAV_SECTION_ID = "tab-nav";
export const EXPERIENCE_SECTION_ID = "experience-section";

export const sectionOrder = [
  "about",
  "experience",
  "projects",
] as const;

export type SectionId = (typeof sectionOrder)[number];

export interface SectionNavItemConfig {
  value: SectionId;
  label: string;
  mobileLabel: string;
  icon: IconType;
  hash: `#${SectionId}`;
}

export const sectionNavItems: SectionNavItemConfig[] = [
  {
    value: "about",
    label: "About Me",
    mobileLabel: "About",
    icon: FiUser,
    hash: "#about",
  },
  {
    value: "experience",
    label: "Experience",
    mobileLabel: "Experience",
    icon: FiBriefcase,
    hash: "#experience",
  },
  {
    value: "projects",
    label: "Projects",
    mobileLabel: "Projects",
    icon: FiFolder,
    hash: "#projects",
  },
];

export function isSectionId(value: string): value is SectionId {
  return sectionOrder.includes(value as SectionId);
}

export function getSectionHash(section: SectionId): `#${SectionId}` {
  return `#${section}`;
}

export function getSectionFromHash(hash: string): SectionId | null {
  const normalized = hash.replace(/^#/, "");
  return isSectionId(normalized) ? normalized : null;
}
