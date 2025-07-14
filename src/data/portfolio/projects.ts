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
    title: 'CoffeeShop Sample Site',
    tech: 'React, MUI',
    description: 'React 19 and Material UI 7',
    github: 'https://github.com/andrewteece/coffeeShop',
    demo: 'https://coffee-shop-5k1rtk0qk-andrewteeces-projects.vercel.app/',
    image: '/images/coffeeShop.png',
  },
  {
    title: 'Todo App',
    tech: 'TypeScript, Clerk',
    description: 'A simple productivity app with authentication.',
    github: 'https://github.com/andrewteece/todo-app',
    demo: 'https://todo.andrewteece.com',
    image: '/images/ToDo.png',
  },
  {
    title: 'Job Board',
    tech: 'Next.js, Tailwind',
    description: 'Job Board with NextJS',
    github: 'https://github.com/andrewteece/job-board',
    demo: 'https://todo.andrewteece.com',
    image: '/images/job.png',
  },
];
