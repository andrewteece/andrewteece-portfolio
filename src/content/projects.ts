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
    title: 'ProShop',
    tech: 'NextJS, PostgreSQL, ShadCN',
    description: 'NextJS eCommerce',
    github: 'https://github.com/andrewteece/prostore',
    demo: 'https://prostore-navy-ten.vercel.app/',
    image: 'images/proShop.webp',
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
