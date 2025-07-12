// import { useState } from 'react';
import './index.css';

import { motion } from 'framer-motion';

export default function App() {
  return (
    <div className='min-h-screen bg-white text-gray-900'>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}

function Header(): JSX.Element {
  return (
    <header className='sticky top-0 bg-white border-b shadow-sm z-50'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Andrew Teece</h1>
        <nav className='space-x-6 text-sm'>
          <a href='#about' className='hover:underline'>
            About
          </a>
          <a href='#projects' className='hover:underline'>
            Projects
          </a>
          <a href='#contact' className='hover:underline'>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero(): JSX.Element {
  return (
    <section className='min-h-[85vh] flex flex-col justify-center items-center text-center px-4'>
      <motion.h2
        className='text-4xl md:text-6xl font-bold'
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frontend Developer
      </motion.h2>
      <p className='mt-4 text-lg max-w-xl text-gray-600'>
        I build fast, responsive websites using modern web technologies like
        React, TypeScript, and Tailwind CSS.
      </p>
      <div className='mt-6 space-x-4'>
        <a
          href='#projects'
          className='px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700'
        >
          View Work
        </a>
        <a
          href='#contact'
          className='px-6 py-2 border border-gray-900 rounded-xl hover:bg-gray-100'
        >
          Contact
        </a>
      </div>
    </section>
  );
}

function About(): JSX.Element {
  return (
    <section id='about' className='py-20 px-4 max-w-4xl mx-auto text-center'>
      <h3 className='text-3xl font-semibold mb-4'>About Me</h3>
      <p className='text-gray-600'>
        I'm a frontend developer with experience in building responsive,
        high-performance interfaces. I enjoy working with React and crafting
        clean, accessible UI components.
      </p>
    </section>
  );
}

function Projects(): JSX.Element {
  return (
    <section id='projects' className='py-20 px-4 max-w-6xl mx-auto'>
      <h3 className='text-3xl font-semibold text-center mb-10'>Projects</h3>
      <div className='grid md:grid-cols-2 gap-8'>
        <ProjectCard
          title='Portfolio Website'
          tech='React, Tailwind'
          description='A modern portfolio site built to showcase my work.'
        />
        <ProjectCard
          title='Todo App'
          tech='TypeScript, Clerk'
          description='A simple productivity app with authentication.'
        />
      </div>
    </section>
  );
}

type ProjectCardProps = {
  title: string;
  tech: string;
  description: string;
};

function ProjectCard({
  title,
  tech,
  description,
}: ProjectCardProps): JSX.Element {
  return (
    <div className='border rounded-xl p-6 hover:shadow-lg transition'>
      <h4 className='text-xl font-bold mb-1'>{title}</h4>
      <p className='text-sm text-gray-500 mb-2'>{tech}</p>
      <p className='text-gray-700 text-sm'>{description}</p>
    </div>
  );
}

function Footer(): JSX.Element {
  return (
    <footer id='contact' className='text-center py-10 text-sm text-gray-500'>
      <p>
        © {new Date().getFullYear()} Andrew Teece •{' '}
        <a href='mailto:andrew@example.com' className='underline'>
          Email Me
        </a>
      </p>
    </footer>
  );
}
