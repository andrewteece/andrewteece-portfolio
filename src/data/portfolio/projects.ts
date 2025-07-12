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
    title: 'Portfolio Website',
    tech: 'React, Tailwind',
    description: 'A modern portfolio site built to showcase my work.',
    github: 'https://github.com/yourname/portfolio',
    demo: 'https://andrewteece.com',
    image: '/assets/portfolio.png',
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
