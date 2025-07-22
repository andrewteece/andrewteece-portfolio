import { motion } from 'framer-motion';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Hero() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <Helmet>
        <link rel='preload' as='image' href='/images/bg-waves.webp' />
      </Helmet>
      <motion.section
        id='home'
        className='relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-bg dark:from-brand/20 dark:to-bg'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background SVG Texture */}
        <div className='absolute inset-0'>
          <img
            src='images/bg-waves.webp'
            alt='Big blue waves background'
            width={1600}
            height={900}
            style={{ width: '100%', height: 'auto' }}
            className='w-full h-full object-cover opacity-20 dark:opacity-10 z-0'
            loading='eager'
            decoding='async'
            aria-hidden
          />
        </div>

        <div className='relative z-10 max-w-4xl w-full flex flex-col items-center space-y-6'>
          <motion.h1
            className='text-4xl md:text-6xl font-bold text-[var(--color-brand)]'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Andrew Teece
          </motion.h1>

          <motion.h2
            className='text-xl md:text-2xl font-medium text-[var(--color-text)]'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Front-End Web Developer focused on clean code and user-centric
            design.
          </motion.h2>

          <motion.p
            className='text-lg md:text-xl max-w-2xl text-[var(--color-text)] text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Delivering responsive, performant, and accessible digital
            experiences using modern tools like <strong>React</strong>,{' '}
            <strong>Next.js</strong>, <strong>TypeScript</strong>, and{' '}
            <strong>Tailwind CSS</strong>.
          </motion.p>

          <motion.div
            className='flex flex-wrap justify-center gap-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a href='#projects' className='btn-primary'>
              View Work
            </a>
            <a href='#contact' className='btn-outline'>
              Contact
            </a>
          </motion.div>
        </div>

        {/* Scroll cue to next section */}
        <a
          href='#techstack'
          className='absolute bottom-6 text-[var(--color-brand)] dark:text-[var(--color-accent)] animate-bounce'
          aria-label='Scroll to tech stack'
        >
          <ChevronDown size={28} />
        </a>

        {/* Back to top button */}
        <a
          href='#home'
          className='fixed bottom-6 right-6 bg-[var(--color-brand)] text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity'
          aria-label='Back to top'
        >
          <ArrowUp size={20} />
        </a>
      </motion.section>
    </>
  );
}
