import type { Project } from '@/lib/types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Personal Portfolio & Digital Namecard',
    type: 'general',
    description:
      'A personal website that combines a portfolio with a digital namecard for public links, identity, and a cleaner overview of work across product, Web3, AI, and community-facing activity.',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'Cloudinary'],
    role: 'Designer & Developer',
    highlight:
      'Built as a single identity surface that brings together public links, project framing, and a more intentional presentation of personal work.',
    content: `## About this project

This repository is the current home of Nathanael Santoso's personal website. It is designed as a dual-purpose surface: a portfolio for selected work and a digital namecard for quick public context.

### Why it exists

- To present work without relying on scattered social links alone
- To create one place for product work, public identity, and contact routing
- To make the portfolio feel more intentional than a generic profile page

### What the framework already covers

- Section-based portfolio navigation
- Responsive content surfaces for experience and projects
- Article-style viewers for deeper writeups
- A visual language tuned for a Web3 / AI / community-facing profile

### Current direction

The site is still being filled with audited content, but the framework is already being shaped around clarity, consistency, and a more deliberate personal brand.`,
    githubUrl: 'https://github.com/Nathasan1410/Portofolio',
    demoUrl: undefined,
    photos: [],
    tags: ['Portfolio', 'Digital Namecard', 'Open Source'],
    links: {
      github: 'https://github.com/Nathasan1410/Portofolio',
    },
  },
];
