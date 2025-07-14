import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function TechStack() {
  return (
    <motion.section
      id='techstack'
      className='relative py-20 px-4 text-center max-w-6xl mx-auto'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-6'>
        Tech Stack
      </h2>
      <p className='text-lg text-[var(--color-text)] mb-10'>
        Tools and technologies I use to build fast, accessible, and scalable web
        applications.
      </p>

      {/* Insert tech badges or icons here */}
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center'>
        {/* Badge placeholders */}
        <span className='text-sm text-[var(--color-text)]'>HTML5</span>
        <span className='text-sm text-[var(--color-text)]'>CSS3</span>
        <span className='text-sm text-[var(--color-text)]'>React</span>
        <span className='text-sm text-[var(--color-text)]'>TypeScript</span>
        <span className='text-sm text-[var(--color-text)]'>Tailwind</span>
        <span className='text-sm text-[var(--color-text)]'>Next.js</span>
      </div>

      {/* Scroll cue to next section */}
      <a
        href='#projects'
        className='absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-brand)] dark:text-[var(--color-accent)] animate-bounce'
        aria-label='Scroll to projects'
      >
        <ChevronDown size={28} />
      </a>
    </motion.section>
  );
}
