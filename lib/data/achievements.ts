import type { Achievement } from '@/lib/types';

const CDN = 'https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill';

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Hackathon Asia 2024 — 1st Place',
    type: 'hackathon_win',
    date: '2024-11-18',
    issuer: 'TechForGood Foundation',
    highlight: 'Won 1st place out of 300+ teams for building an AI-powered disaster response system.',
    content: 'Developed DisasterPulse, a real-time coordination platform that connected affected communities with rescue teams using AI-optimized routing.',
    certificateUrl: 'https://example.com/cert/hackathon2024.pdf',
    projectSubmitted: 'DisasterPulse',
    teamInfo: ['Team: CodeForGood (4 members)'],
    keyAchievements: [
      'Best Technical Implementation Award',
      'People\'s Choice Award',
      'Interviewed by local tech news outlet',
    ],
    photos: [
      `${CDN}/samples/landscapes/architecture-signs.jpg`,
      `${CDN}/samples/people/smiling-man.jpg`,
    ],
  },
  {
    id: 'ach-2',
    title: 'AWS Certified Solutions Architect',
    type: 'certificate',
    date: '2024-08-22',
    issuer: 'Amazon Web Services',
    highlight: 'Validated expertise in designing scalable, fault-tolerant, and cost-optimized cloud architectures on AWS.',
    content: 'Passed the AWS SAA-C03 exam covering compute, storage, databases, networking, and security best practices.',
    certificateUrl: 'https://example.com/cert/aws-saa.pdf',
    certificateImage: `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
    photos: [
      `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
    ],
  },
  {
    id: 'ach-3',
    title: 'Google Developer Expert — Web',
    type: 'recognition',
    date: '2024-07-01',
    issuer: 'Google',
    highlight: 'Recognized by Google for contributions to web technologies and developer community.',
    content: 'Awarded GDE status for contributions to accessible web development, open-source projects, and speaking at tech conferences.',
    certificateUrl: 'https://example.com/cert/gde-web.pdf',
    certificateImage: `${CDN}/samples/people/smiling-man.jpg`,
    keyAchievements: [
      'Contributed to Chromium accessibility improvements',
      'Mentored 50+ developers through GDG programs',
      'Published 12 technical articles on web.dev',
    ],
    photos: [
      `${CDN}/samples/people/smiling-man.jpg`,
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
    ],
  },
  {
    id: 'ach-4',
    title: 'Meta Front-End Developer Professional Certificate',
    type: 'certificate',
    date: '2024-03-15',
    issuer: 'Meta (Facebook)',
    highlight: 'Completed comprehensive front-end development program covering React, JavaScript, and modern web practices.',
    content: 'Finished all 9 courses covering HTML, CSS, JavaScript, React, and version control with hands-on capstone projects.',
    certificateUrl: 'https://example.com/cert/meta-frontend.pdf',
    certificateImage: `${CDN}/samples/food/spices.jpg`,
    photos: [
      `${CDN}/samples/food/spices.jpg`,
    ],
  },
  {
    id: 'ach-5',
    title: 'Hackathon Asia 2023 — 3rd Place',
    type: 'hackathon_win',
    date: '2023-10-10',
    issuer: 'TechForGood Foundation',
    highlight: 'Placed 3rd for EcoTrack, a carbon footprint tracking app with AI-powered recommendations.',
    projectSubmitted: 'EcoTrack',
    teamInfo: ['Team: GreenTech (3 members)'],
    keyAchievements: [
      'Best Sustainability Impact Award',
      'Invited to GreenTech Asia showcase',
    ],
    photos: [
      `${CDN}/samples/animals/reindeer.jpg`,
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
      `${CDN}/samples/food/spices.jpg`,
    ],
  },
];
