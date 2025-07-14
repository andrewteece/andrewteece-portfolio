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
    tech: 'React, Tailwind',
    description: 'React 19 and Material UI 7',
    github: 'https://github.com/andrewteece/coffeeShop',
    demo: 'https://coffee-shop-5k1rtk0qk-andrewteeces-projects.vercel.app/',
    image: '/src/assets/coffeeShop.png',
  },
  {
    title: 'Todo App',
    tech: 'TypeScript, Clerk',
    description: 'A simple productivity app with authentication.',
    github: 'https://github.com/yourname/todo-app',
    demo: 'https://todo.andrewteece.com',
    image: '/assets/todo.png',
  },
];
