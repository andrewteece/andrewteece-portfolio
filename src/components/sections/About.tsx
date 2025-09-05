import { motion } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';
import { P, Section, Stack } from '../shared/Section';

export default function About() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActiveSection('about'),
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [setActiveSection]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Section id='about' title='About Me' align='center'>
        {/* Bump paragraph sizing for all <P> children here */}
        <Stack className='[&>p]:text-lg [&>p]:md:text-xl [&>p]:leading-relaxed'>
          <P>
            I&apos;m a seasoned Front-End Web Developer and IT Professional with
            20+ years of hands-on experience delivering responsive, performant,
            and accessible digital experiences.
          </P>
          <P>
            I specialize in building scalable user interfaces using modern
            frameworks like React, Next.js, TypeScript, and Tailwind CSS. My
            focus is on clean code, design systems, and collaboration to deliver
            real business impact.
          </P>
        </Stack>
      </Section>
    </motion.div>
  );
}
