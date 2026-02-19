export type Project = {
  title: string;
  tech: string;
  description: string;
  github?: string;
  demo?: string;
  image?: string;
  category?: 'frontend' | 'fullstack' | 'tools' | 'api';
  featured?: boolean;
  techStack?: string[];
  metrics?: {
    performance?: string;
    accessibility?: string;
    bundle?: string;
  };
};

export const projects: Project[] = [
  {
    title: 'BAPI Headless WordPress Migration',
    tech: 'Next.js 16, WordPress/WooCommerce, WPGraphQL, TypeScript',
    description:
      'Enterprise headless CMS migration transforming a 16-year-old WordPress/WooCommerce site into modern architecture. Serving 608 products across 11 languages and 12 regions with 95% performance improvement, full type safety, and comprehensive e-commerce integration. Launching April 10, 2026.',
    demo: 'https://bapi-headless.vercel.app/en',
    image: 'images/blog/bapi-headless.png',
    category: 'fullstack',
    featured: true,
    techStack: [
      'Next.js 16',
      'WordPress 6.8',
      'WooCommerce',
      'WPGraphQL',
      'TypeScript',
      'GraphQL Codegen',
      'Stripe',
      'Zustand',
    ],
    metrics: {
      performance: '95+ Lighthouse (staging)',
      accessibility: 'WCAG 2.1 AA',
      bundle: '248kb gzipped',
    },
  },
  {
    title: 'AI-Assisted Analytics Dashboard',
    tech: 'Next.js 15, TypeScript, Tailwind v4, Zustand',
    description:
      'Modern AI-powered dashboard with draggable widgets, real-time data visualization, and intelligent assistant integration. Features advanced drag-and-drop functionality using dnd-kit, persistent state management with Zustand, and comprehensive testing with accessibility validation.',
    github: 'https://github.com/andrewteece/ai-dashboard',
    demo: 'https://ai-dashboard-sigma-jet.vercel.app/',
    image: 'images/ai-dashboard.webp',
    category: 'fullstack',
    featured: true,
    techStack: [
      'Next.js 15',
      'TypeScript',
      'Tailwind v4',
      'Zustand',
      'Radix UI',
      'Recharts',
    ],
    metrics: {
      performance: '98/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '156kb gzipped',
    },
  },
  {
    title: 'AI-Powered Job Prep Platform',
    tech: 'Next.js 15, TypeScript, PostgreSQL, Clerk Auth',
    description:
      'Comprehensive SaaS platform for job interview preparation with AI assistance, résumé analysis, and technical Q&A. Built with modern architecture including Drizzle ORM, shadcn/ui components, robust authentication via Clerk, and comprehensive CI/CD pipeline.',
    github: 'https://github.com/andrewteece/ai-powered-job-prep',
    demo: 'https://ai-powered-job-prep-wine.vercel.app/',
    image: 'images/job.webp',
    category: 'fullstack',
    featured: true,
    techStack: [
      'Next.js 15',
      'TypeScript',
      'PostgreSQL',
      'Drizzle ORM',
      'Clerk',
      'shadcn/ui',
    ],
    metrics: {
      performance: '95/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '234kb gzipped',
    },
  },
  {
    title: 'LinkedIn Professional Clone',
    tech: 'React, TypeScript, Vite, Zustand',
    description:
      'Professional social networking platform clone featuring responsive design, user authentication, post interactions, and real-time social feed. Built with modern React patterns, comprehensive state management, and optimized for performance and accessibility.',
    github: 'https://github.com/andrewteece/linkedin-clone',
    demo: 'https://linkedin-clone-demo.vercel.app/',
    image: 'images/linkedin-clone.webp',
    category: 'frontend',
    techStack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Tailwind CSS'],
    metrics: {
      performance: '96/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '189kb gzipped',
    },
  },
  {
    title: 'Storybook v9 Component Library',
    tech: 'Vite, React, TypeScript, Storybook v9',
    description:
      'Comprehensive component library showcasing advanced Storybook v9 features including auto-generated documentation, visual testing, and accessibility validation. Demonstrates modern development tooling and design system best practices.',
    github: 'https://github.com/andrewteece/sb9-showcase',
    demo: 'https://sb9-showcase-b6whfr8e5-andrewteeces-projects.vercel.app/',
    image: 'images/Storybook.webp',
    category: 'tools',
    techStack: ['Storybook', 'React', 'TypeScript', 'Vite', 'Chromatic'],
    metrics: {
      performance: '99/100 Lighthouse',
      accessibility: 'WCAG 2.1 AAA',
      bundle: '124kb gzipped',
    },
  },
  {
    title: 'Product Feedback Platform',
    tech: 'Next.js 14, Tailwind CSS, Zustand',
    description:
      'Full-featured product feedback management system with user voting, comment threading, and admin dashboard. Implements server-side rendering, optimistic updates, and comprehensive state management for scalable user interactions.',
    github: 'https://github.com/andrewteece/product-feedback-app',
    demo: 'https://product-feedback-pcqy81jhq-andrewteeces-projects.vercel.app/',
    image: 'images/product-feedback.webp',
    category: 'fullstack',
    techStack: ['Next.js', 'Tailwind CSS', 'Zustand', 'TypeScript'],
    metrics: {
      performance: '94/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '201kb gzipped',
    },
  },
  {
    title: 'Senior Developer Portfolio',
    tech: 'React 19, Vite 7, Tailwind CSS v4',
    description:
      'Modern, performance-optimized portfolio showcasing advanced React patterns, accessibility features, and real-time performance monitoring. Built with comprehensive testing, CI/CD integration, and progressive enhancement strategies.',
    github: 'https://github.com/andrewteece/andrewteece-portfolio',
    demo: 'https://andrewteece.com',
    image: 'images/portfolio.webp',
    category: 'frontend',
    featured: true,
    techStack: [
      'React 19',
      'Vite 7',
      'Tailwind CSS v4',
      'Framer Motion',
      'Vitest',
    ],
    metrics: {
      performance: '98/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '234kb gzipped',
    },
  },
];
