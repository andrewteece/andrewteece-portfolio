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
