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
      <Section id='about' title='Owner, Operator, Marketer & Developer' align='center'>
        {/* Bump paragraph sizing for all <P> children here */}
        <Stack className='[&>p]:text-lg [&>p]:md:text-xl [&>p]:leading-relaxed'>
          <P>
            I&apos;m a former restaurant owner who spent 21 years running a
            multi-brand restaurant group before bringing that operator&apos;s
            perspective to websites and digital marketing. I understand the
            pressure of margins, staffing, repeat business, and making every
            marketing dollar work.
          </P>
          <P>
            I combine 20+ years of web experience with hands-on ownership,
            operations, and marketing. I serve restaurants and businesses in
            Naples and Southwest Florida—including Fort Myers and Bonita
            Springs—as well as the Wisconsin Northwoods. I also subcontract
            senior Next.js and headless WordPress development for agencies.
          </P>
        </Stack>
      </Section>
    </motion.div>
  );
}
