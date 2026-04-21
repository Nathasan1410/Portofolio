export type FilterType = 'all' | 'hackathon' | 'event' | 'community' | 'work';

export type AchievementFilterType = 'all' | 'certificate' | 'hackathon_win' | 'recognition';

export interface Experience {
  id: string;
  title: string;
  type: 'hackathon' | 'event' | 'community' | 'work';
  date: string;
  kpi: string;
  mainRole: string;
  extraRoles?: string[];
  roles: string[];
  highlight: string;
  content?: string;
  photos: string[];
  reels: string[];
  youtubeVideo?: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'web3' | 'ai' | 'general';
  description: string;
  techStack: string[];
  role: string;
  highlight: string;
  content?: string;
  githubUrl?: string;
  demoUrl?: string;
  photos: string[];
  youtubeUrl?: string;
  thumbnail?: string;
  // Medium Article Modal fields
  tags?: string[];
  showGallery?: boolean;
  galleryImages?: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  type: 'certificate' | 'hackathon_win' | 'recognition';
  date: string;
  issuer?: string;
  highlight: string;
  content?: string;
  certificateUrl?: string;
  certificateImage?: string;
  projectSubmitted?: string;
  teamInfo?: string[];
  keyAchievements?: string[];
  photos: string[];
}