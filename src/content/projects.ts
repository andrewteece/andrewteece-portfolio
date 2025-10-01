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
    title: 'E-commerce Analytics Dashboard',
    tech: 'React 19, TypeScript, Chart.js, REST APIs',
    description: 'Modern analytics dashboard with real-time data visualization, featuring interactive charts, performance metrics, and responsive design. Implemented complex state management, data caching, and optimistic UI updates for seamless user experience.',
    github: 'https://github.com/andrewteece/ecommerce-dashboard',
    demo: 'https://ecommerce-dashboard-demo.vercel.app/',
    image: 'images/dashboard.webp',
    category: 'frontend',
    featured: true,
    techStack: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'REST API'],
    metrics: {
      performance: '98/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '156kb gzipped'
    }
  },
  {
    title: 'Real-time Collaborative Chat',
    tech: 'React, Node.js, WebSockets, PostgreSQL',
    description: 'Full-stack real-time chat application with message persistence, user authentication, and live typing indicators. Built with WebSocket connections, optimistic UI updates, and comprehensive error handling for production reliability.',
    github: 'https://github.com/andrewteece/realtime-chat',
    demo: 'https://chat-app-demo.vercel.app/',
    image: 'images/chat-app.webp',
    category: 'fullstack',
    featured: true,
    techStack: ['React', 'Node.js', 'WebSockets', 'PostgreSQL', 'Express'],
    metrics: {
      performance: '95/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '234kb gzipped'
    }
  },
  {
    title: 'Task Management Pro',
    tech: 'React, Zustand, DnD Kit, PWA',
    description: 'Advanced task management application with drag-and-drop functionality, offline support, and progressive web app features. Implements complex state management, local storage synchronization, and responsive design patterns.',
    github: 'https://github.com/andrewteece/task-manager-pro',
    demo: 'https://task-manager-pro.vercel.app/',
    image: 'images/task-manager.webp',
    category: 'frontend',
    techStack: ['React', 'Zustand', 'DnD Kit', 'PWA', 'IndexedDB'],
    metrics: {
      performance: '96/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '189kb gzipped'
    }
  },
  {
    title: 'Weather Intelligence Hub',
    tech: 'React, TypeScript, Geolocation API, PWA',
    description: 'Sophisticated weather application with geolocation, forecasting, and offline capabilities. Features data visualization, caching strategies, and responsive design optimized for mobile-first experience.',
    github: 'https://github.com/andrewteece/weather-hub',
    demo: 'https://weather-intelligence-hub.vercel.app/',
    image: 'images/weather-app.webp',
    category: 'frontend',
    techStack: ['React', 'TypeScript', 'Weather API', 'PWA', 'Geolocation'],
    metrics: {
      performance: '97/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '167kb gzipped'
    }
  },
  {
    title: 'Storybook v9 Component Library',
    tech: 'Vite, React, TypeScript, Storybook v9',
    description: 'Comprehensive component library showcasing advanced Storybook v9 features including auto-generated documentation, visual testing, and accessibility validation. Demonstrates modern development tooling and design system best practices.',
    github: 'https://github.com/andrewteece/sb9-showcase',
    demo: 'https://sb9-showcase-b6whfr8e5-andrewteeces-projects.vercel.app/',
    image: 'images/Storybook.webp',
    category: 'tools',
    techStack: ['Storybook', 'React', 'TypeScript', 'Vite', 'Chromatic'],
    metrics: {
      performance: '99/100 Lighthouse',
      accessibility: 'WCAG 2.1 AAA',
      bundle: '124kb gzipped'
    }
  },
  {
    title: 'Product Feedback Platform',
    tech: 'Next.js 14, Tailwind CSS, Zustand',
    description: 'Full-featured product feedback management system with user voting, comment threading, and admin dashboard. Implements server-side rendering, optimistic updates, and comprehensive state management for scalable user interactions.',
    github: 'https://github.com/andrewteece/product-feedback-app',
    demo: 'https://product-feedback-pcqy81jhq-andrewteeces-projects.vercel.app/',
    image: 'images/product-feedback.webp',
    category: 'fullstack',
    techStack: ['Next.js', 'Tailwind CSS', 'Zustand', 'TypeScript'],
    metrics: {
      performance: '94/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '201kb gzipped'
    }
  },
  {
    title: 'Senior Developer Portfolio',
    tech: 'React 19, Vite 7, Tailwind CSS v4',
    description: 'Modern, performance-optimized portfolio showcasing advanced React patterns, accessibility features, and real-time performance monitoring. Built with comprehensive testing, CI/CD integration, and progressive enhancement strategies.',
    github: 'https://github.com/andrewteece/andrewteece-portfolio',
    demo: 'https://andrewteece.com',
    image: 'images/portfolio.webp',
    category: 'frontend',
    featured: true,
    techStack: ['React 19', 'Vite 7', 'Tailwind CSS v4', 'Framer Motion', 'Vitest'],
    metrics: {
      performance: '98/100 Lighthouse',
      accessibility: 'WCAG 2.1 AA',
      bundle: '234kb gzipped'
    }
  },
];
