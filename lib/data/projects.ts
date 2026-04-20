import type { Project } from '@/lib/types';

const CDN = 'https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'DisasterPulse',
    description: 'Real-time disaster response coordination platform with AI-powered resource routing and crowd-sourced damage reporting.',
    techStack: ['Next.js', 'TypeScript', 'WebSocket', 'PostgreSQL', 'TensorFlow.js'],
    role: 'Lead Developer',
    highlight: 'Processed 10,000+ emergency reports and coordinated 500+ rescue team deployments.',
    content: 'A full-stack platform built during a 48-hour hackathon that uses AI to analyze disaster reports and suggest optimal rescue routes.',
    githubUrl: 'https://github.com/example/disaster-pulse',
    demoUrl: 'https://disaster-pulse-demo.vercel.app',
    photos: [
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
      `${CDN}/samples/landscapes/architecture-signs.jpg`,
    ],
    thumbnail: `${CDN}/samples/landscapes/nature-mountains.jpg`,
  },
  {
    id: 'proj-2',
    title: 'LearnFlow',
    description: 'Personalized learning platform that adapts to individual learning styles using spaced repetition and active recall techniques.',
    techStack: ['React', 'Node.js', 'MongoDB', 'OpenAI API'],
    role: 'Full-Stack Developer',
    highlight: 'Achieved 85% user retention rate over 3 months with personalized study plans.',
    content: 'An AI-powered learning platform that creates adaptive study schedules based on user performance analytics.',
    githubUrl: 'https://github.com/example/learnflow',
    demoUrl: 'https://learnflow-demo.vercel.app',
    photos: [
      `${CDN}/samples/people/smiling-man.jpg`,
      `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
    ],
    thumbnail: `${CDN}/samples/people/smiling-man.jpg`,
  },
  {
    id: 'proj-3',
    title: 'EcoTrack',
    description: 'Carbon footprint tracking app that helps individuals and businesses monitor and reduce their environmental impact.',
    techStack: ['Flutter', 'Firebase', 'TensorFlow Lite', 'Charts.js'],
    role: 'Mobile Developer',
    highlight: 'Featured in GreenTech Asia magazine as one of the top 5 emerging sustainability apps.',
    content: 'A cross-platform mobile app that calculates carbon footprint from daily activities and suggests actionable reduction steps.',
    githubUrl: 'https://github.com/example/ecotrack',
    demoUrl: undefined,
    photos: [
      `${CDN}/samples/food/spices.jpg`,
      `${CDN}/samples/animals/reindeer.jpg`,
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
    ],
    thumbnail: `${CDN}/samples/food/spices.jpg`,
  },
  {
    id: 'proj-4',
    title: 'DevPortfolio',
    description: 'Open-source developer portfolio template with CMS integration, blog support, and GitHub activity feed.',
    techStack: ['Next.js', 'MDX', 'Tailwind CSS', 'GitHub API'],
    role: 'Creator & Maintainer',
    highlight: '2,500+ GitHub stars, used by 800+ developers worldwide.',
    content: 'A highly customizable portfolio template built with modern web technologies and best practices for developer branding.',
    githubUrl: 'https://github.com/example/devportfolio',
    demoUrl: 'https://devportfolio-demo.vercel.app',
    photos: [
      `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
      `${CDN}/samples/landscapes/architecture-signs.jpg`,
    ],
    thumbnail: `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
  },
];
