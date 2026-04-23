export const heroMedia = {
  desktop: {
    src: "",
    recommendedSize: "2560x1440 PNG or JPG",
    aspectRatio: "16:9 landscape",
  },
  mobile: {
    src: "",
    recommendedSize: "1440x1800 PNG or JPG",
    aspectRatio: "4:5 portrait crop",
  },
  alt: "Hero background for Nathanael Santoso portfolio",
  focalGuidance:
    "Keep the subject in the upper-middle and leave the bottom 30% free of critical detail.",
} as const;

export const heroCopy = {
  primaryAction: "View Experience",
  secondaryAction: "Check My CV",
  connectAction: "Connect",
  placeholderTitle: "Hero Background Image",
  placeholderBody:
    "Use one master artwork, then export desktop and mobile crops from the same source.",
} as const;

export const hasHeroMedia =
  heroMedia.desktop.src.length > 0 || heroMedia.mobile.src.length > 0;
