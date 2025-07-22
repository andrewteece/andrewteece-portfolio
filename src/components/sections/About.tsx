// src/components/sections/About.tsx
import { motion } from 'framer-motion';
import { useEffect, useRef, useContext } from 'react';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection('about');
      },
      { threshold: 0.6 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <motion.section
      id='about'
      ref={sectionRef}
      className='relative py-24 px-4 text-center max-w-4xl mx-auto'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-4'>
        About Me
      </h2>
      <p className='text-lg text-[var(--color-text)] mb-10'>
        I'm a seasoned Front-End Web Developer and IT Professional with 20+
        years of hands-on experience delivering responsive, performant, and
        accessible digital experiences. I specialize in building scalable user
        interfaces using modern frameworks like React, Next.js, TypeScript, and
        Tailwind CSS. My focus is on clean code, design systems, and
        collaboration to deliver real business impact.
      </p>

      <div className='border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] mt-10 w-full'></div>
    </motion.section>
  );
}
