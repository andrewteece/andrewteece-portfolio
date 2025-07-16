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
    image: 'images/coffeeShop.webp',
  },
  {
    title: 'Todo App',
    tech: 'TypeScript, Clerk',
    description: 'A simple productivity app with authentication.',
    github: 'https://github.com/andrewteece/todo-app',
    demo: 'https://todo.andrewteece.com',
    image: 'images/ToDo.webp',
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
