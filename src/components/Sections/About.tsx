// src/components/sections/About.tsx
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id='about'
      className='relative px-4 py-20 max-w-4xl mx-auto text-[var(--color-text)] text-center'
    >
      <motion.h2
        className='text-3xl md:text-4xl font-semibold mb-6'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <motion.div
        className='text-lg space-y-6 leading-relaxed'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p>
          I'm <strong>Andrew Teece</strong>, a Front-End Web Developer based in
          Woodruff, WI, with over 20 years of experience crafting clean,
          performant, and accessible websites.
        </p>
        <div className='w-12 h-px mx-auto bg-white/10 dark:bg-white/5' />
        <p>
          I specialize in <strong>React</strong>, <strong>Next.js</strong>,{' '}
          <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>, and
          enjoy building digital products that align user needs with business
          goals.
        </p>
        <div className='w-12 h-px mx-auto bg-white/10 dark:bg-white/5' />
        <p>
          My background includes leading digital strategy for restaurant groups,
          building scalable component libraries, modernizing legacy systems, and
          delivering full-stack freelance solutions using{' '}
          <strong>Prisma</strong>, <strong>PostgreSQL</strong>, and{' '}
          <strong>MongoDB</strong>.
        </p>
        <div className='w-12 h-px mx-auto bg-white/10 dark:bg-white/5' />
        <p>
          I'm currently expanding my knowledge through the{' '}
          <strong>Meta Front-End Developer Professional Certificate</strong> and
          always exploring new technologies to stay sharp.
        </p>
        <div className='w-12 h-px mx-auto bg-white/10 dark:bg-white/5' />
        <p>
          Whether you're hiring for a project or a long-term collaboration, I'm
          ready to help build something exceptional.
        </p>
      </motion.div>
    </section>
  );
}
