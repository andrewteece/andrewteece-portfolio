// src/components/sections/About.tsx
import { motion } from 'framer-motion';
import ScrollToTop from '../components/ui/ScrollToTop';

export default function About() {
  return (
    <motion.section
      id='about'
      className='relative py-20 px-4 text-center max-w-4xl mx-auto'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-6'>
        About Me
      </h2>
      <p className='text-lg text-[var(--color-text)] mb-10'>
        I'm a seasoned frontend developer with over 20 years of experience
        delivering scalable, user-focused applications. I specialize in React,
        TypeScript, and design systems that drive performance, accessibility,
        and maintainability.
      </p>

      <ScrollToTop />
    </motion.section>
  );
}
