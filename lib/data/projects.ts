import type { Project } from '@/lib/types';

const CDN = 'https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'DisasterPulse',
    type: 'ai',
    description: 'Real-time disaster response coordination platform with AI-powered resource routing and crowd-sourced damage reporting.',
    techStack: ['Next.js', 'TypeScript', 'WebSocket', 'PostgreSQL', 'TensorFlow.js'],
    role: 'Lead Developer',
    highlight: 'Processed 10,000+ emergency reports and coordinated 500+ rescue team deployments.',
    content: `## About DisasterPulse

A full-stack platform built during a 48-hour hackathon that uses AI to analyze disaster reports and suggest optimal rescue routes.

### Key Features

- **Real-time incident reporting** with geolocation
- **AI-powered resource allocation** using TensorFlow.js
- **Live team coordination** via WebSocket
- **Damage assessment analytics** with visual dashboards

### Technical Challenges

The biggest challenge was handling high-concurrency WebSocket connections while maintaining sub-second latency for emergency alerts. We solved this by implementing a Redis-backed message queue system.`,
    githubUrl: 'https://github.com/example/disaster-pulse',
    demoUrl: 'https://disaster-pulse-demo.vercel.app',
    photos: [
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
      `${CDN}/samples/landscapes/architecture-signs.jpg`,
    ],
    thumbnail: `${CDN}/samples/landscapes/nature-mountains.jpg`,
    tags: ['Hackathon Winner', 'AI/ML', 'Real-time'],
    showGallery: true,
    galleryImages: [
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
      `${CDN}/samples/landscapes/architecture-signs.jpg`,
      `${CDN}/samples/people/smiling-man.jpg`,
    ],
    links: {
      demo: 'https://disaster-pulse-demo.vercel.app',
      github: 'https://github.com/example/disaster-pulse',
    },
  },
  {
    id: 'proj-2',
    title: 'LearnFlow',
    type: 'ai',
    description: 'Personalized learning platform that adapts to individual learning styles using spaced repetition and active recall techniques.',
    techStack: ['React', 'Node.js', 'MongoDB', 'OpenAI API'],
    role: 'Full-Stack Developer',
    highlight: 'Achieved 85% user retention rate over 3 months with personalized study plans.',
    content: `## About LearnFlow

An AI-powered learning platform that creates adaptive study schedules based on user performance analytics.

### How It Works

LearnFlow uses a proprietary algorithm to analyze your learning patterns and optimize study sessions for maximum retention.

### Results

Users reported **40% faster learning** and **60% better retention** compared to traditional study methods.`,
    githubUrl: 'https://github.com/example/learnflow',
    demoUrl: 'https://learnflow-demo.vercel.app',
    photos: [
      `${CDN}/samples/people/smiling-man.jpg`,
      `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
    ],
    thumbnail: `${CDN}/samples/people/smiling-man.jpg`,
    tags: ['EdTech', 'AI/ML', 'SaaS'],
    links: {
      demo: 'https://learnflow-demo.vercel.app',
      github: 'https://github.com/example/learnflow',
    },
  },
  {
    id: 'proj-3',
    title: 'EcoTrack',
    type: 'general',
    description: 'Carbon footprint tracking app that helps individuals and businesses monitor and reduce their environmental impact.',
    techStack: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Charts.js'],
    role: 'Mobile Developer',
    highlight: 'Featured in GreenTech Asia magazine as one of the top 5 emerging sustainability apps.',
    content: `## About EcoTrack

A cross-platform mobile app that calculates carbon footprint from daily activities and suggests actionable reduction steps.

### Features

- **Activity tracking** with automatic categorization
- **Carbon calculations** based on scientific data
- **Personalized recommendations** for reduction
- **Progress visualization** with charts and badges

### Impact

Over 50,000 downloads in the first month with an average 4.8-star rating.`,
    githubUrl: 'https://github.com/example/ecotrack',
    demoUrl: undefined,
    photos: [
      `${CDN}/samples/food/spices.jpg`,
      `${CDN}/samples/animals/reindeer.jpg`,
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
    ],
    thumbnail: `${CDN}/samples/food/spices.jpg`,
    tags: ['Mobile', 'Sustainability', 'Community'],
    showGallery: true,
    galleryImages: [
      `${CDN}/samples/food/spices.jpg`,
      `${CDN}/samples/animals/reindeer.jpg`,
    ],
    links: {
      github: 'https://github.com/example/ecotrack',
    },
  },
  {
    id: 'proj-4',
    title: 'DevPortfolio',
    type: 'web3',
    description: 'Open-source developer portfolio template with CMS integration, blog support, and GitHub activity feed.',
    techStack: ['Next.js', 'MDX', 'Tailwind CSS', 'GitHub API'],
    role: 'Creator & Maintainer',
    highlight: '2,500+ GitHub stars, used by 800+ developers worldwide.',
    content: `## About DevPortfolio

A highly customizable portfolio template built with modern web technologies and best practices for developer branding.

### Features

- **MDX-based blog** with syntax highlighting
- **GitHub integration** for activity feed
- **SEO optimized** with Open Graph support
- **Dark mode** out of the box

### Community

Maintained by a growing community of contributors with regular updates and improvements.`,
    githubUrl: 'https://github.com/example/devportfolio',
    demoUrl: 'https://devportfolio-demo.vercel.app',
    photos: [
      `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
      `${CDN}/samples/landscapes/architecture-signs.jpg`,
    ],
    thumbnail: `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
    tags: ['Open Source', 'Developer Tools', 'Web3'],
    links: {
      demo: 'https://devportfolio-demo.vercel.app',
      github: 'https://github.com/example/devportfolio',
    },
  },
];
