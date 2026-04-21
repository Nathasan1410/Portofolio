import type { Achievement } from '@/lib/types';

const CDN = 'https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill';

export const achievements: Achievement[] = [
  {
    id: 'ach-2',
    title: 'AWS Certified Solutions Architect',
    type: 'certificate',
    date: '2024-08-22',
    issuer: 'Amazon Web Services',
    highlight: 'Validated expertise in designing scalable, fault-tolerant, and cost-optimized cloud architectures on AWS.',
    content: `Passed the AWS SAA-C03 exam covering compute, storage, databases, networking, and security best practices.

### Exam Topics
- Design resilient architectures
- Define high-performing architectures
- Secure applications and architectures
- Design cost-optimized architectures`,
    certificateUrl: 'https://example.com/cert/aws-saa.pdf',
    certificateImage: `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
    photos: [
      `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
    ],
    tags: ['Certificate', 'AWS', 'Cloud'],
    heroImage: `${CDN}/samples/ecommerce/leather-bag-gray.jpg`,
  },
  {
    id: 'ach-3',
    title: 'Google Developer Expert — Web',
    type: 'recognition',
    date: '2024-07-01',
    issuer: 'Google',
    highlight: 'Recognized by Google for contributions to web technologies and developer community.',
    content: `Awarded GDE status for contributions to accessible web development, open-source projects, and speaking at tech conferences.

### Contributions
- Contributed to Chromium accessibility improvements
- Mentored 50+ developers through GDG programs
- Published 12 technical articles on web.dev`,
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
    tags: ['Recognition', 'Google', 'Web'],
    heroImage: `${CDN}/samples/people/smiling-man.jpg`,
  },
  {
    id: 'ach-4',
    title: 'Meta Front-End Developer Professional Certificate',
    type: 'certificate',
    date: '2024-03-15',
    issuer: 'Meta (Facebook)',
    highlight: 'Completed comprehensive front-end development program covering React, JavaScript, and modern web practices.',
    content: `Finished all 9 courses covering HTML, CSS, JavaScript, React, and version control with hands-on capstone projects.

### Course Highlights
- Advanced React patterns and hooks
- Responsive design with CSS Grid and Flexbox
- Testing with Jest and React Testing Library
- CI/CD basics for front-end deployment`,
    certificateUrl: 'https://example.com/cert/meta-frontend.pdf',
    certificateImage: `${CDN}/samples/food/spices.jpg`,
    photos: [
      `${CDN}/samples/food/spices.jpg`,
    ],
    tags: ['Certificate', 'Meta', 'Frontend'],
    heroImage: `${CDN}/samples/food/spices.jpg`,
  },
  {
    id: 'ach-5',
    title: 'SamaBlockDev Hackathon Winner',
    type: 'hackathon_win',
    date: '2024-06-10',
    issuer: 'SamaBlock',
    highlight: 'First place in a 48-hour blockchain development competition building a decentralized application.',
    content: `Built a DeFi dashboard with wallet integration, swap functionality, and real-time analytics. Won against 50+ teams.

### Tech Stack
- Solidity for smart contracts
- Next.js + Web3.js for frontend
- The Graph for indexing blockchain data`,
    keyAchievements: [
      'First Place - 50+ competing teams',
      'Built full-stack dApp in 48 hours',
      'Integrated Web3 wallet and smart contracts',
    ],
    photos: [
      `${CDN}/samples/people/kitchen-bar.jpg`,
    ],
    tags: ['Hackathon', 'Web3', 'Winner'],
    heroImage: `${CDN}/samples/people/kitchen-bar.jpg`,
  },
  {
    id: 'ach-6',
    title: 'AI Innovators Hackathon - Best AI Integration',
    type: 'hackathon_win',
    date: '2024-04-20',
    issuer: 'TechConf',
    highlight: 'Awarded Best AI Integration for developing an AI-powered code review assistant.',
    content: `Created an AI tool that automates code review using LLMs, integrating with GitHub Actions for continuous feedback.

### Features
- Automated PR comments with suggestions
- Code smell and security vulnerability detection
- Integration with GitHub Actions CI/CD`,
    keyAchievements: [
      'Best AI Integration Award',
      'Processed 1000+ lines of code during demo',
      'Seamless GitHub Actions CI/CD pipeline',
    ],
    photos: [
      `${CDN}/samples/landscapes/nature-mountains.jpg`,
    ],
    tags: ['Hackathon', 'AI/ML', 'Winner'],
    heroImage: `${CDN}/samples/landscapes/nature-mountains.jpg`,
  },
];
