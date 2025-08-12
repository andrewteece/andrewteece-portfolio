export type Project = {
  title: string;
  tech: string;
  description: string;
  github?: string;
  demo?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    title: 'Storybook v9 Showcase',
    tech: 'Vite, React(TS), Storybook',
    description: 'Storybook v9 Showcase',
    github: 'https://github.com/andrewteece/sb9-showcase',
    demo: 'https://sb9-showcase-b6whfr8e5-andrewteeces-projects.vercel.app/',
    image: 'images/Storybook.webp',
  },
  {
    title: 'Product-Feedback App',
    tech: 'Next.js, Tailwind, Zustand',
    description: 'Product-Feedback',
    github: 'https://github.com/andrewteece/product-feedback-app',
    demo: 'https://product-feedback-pcqy81jhq-andrewteeces-projects.vercel.app/',
    image: 'images/product-feedback.webp',
  },
  {
    title: 'Portfolio',
    tech: 'React, TS, Tailwind',
    description: 'Personal Portfolio with React',
    github: 'https://github.com/andrewteece/andrewteece-portfolio',
    demo: 'https://andrewteece.com',
    image: 'images/portfolio.webp',
  },
];
