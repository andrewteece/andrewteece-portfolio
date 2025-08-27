import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { Mail, ArrowUp, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
// If you already have SocialLinks, keep it. Otherwise comment this out.
/* import SocialLinks from '../SocialLinks'; */

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ultra-slow, luxe motion (very gentle)
  const driftTransition: Transition = {
    duration: 30,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: 'easeInOut',
  };

  const driftPath = prefersReducedMotion
    ? undefined
    : { x: [0, 20, -12, 0], y: [0, -14, 10, 0] };

  return (
    <motion.footer
      ref={sectionRef}
      id='contact'
      role='contentinfo'
      className='relative px-6 pt-10 pb-12 overflow-hidden border-t md:px-8'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* ——— Ambient background (subtle, theme-aware) ——— */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {/* top-left brand glow */}
        <motion.div
          aria-hidden
          className='absolute w-64 h-64 rounded-full -top-24 -left-24 md:h-80 md:w-80 mix-blend-screen'
          style={{
            opacity: 0.42,
            filter: 'blur(120px)',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-brand), transparent 65%)',
          }}
          animate={driftPath}
          transition={prefersReducedMotion ? undefined : driftTransition}
        />
        {/* right-side warm accent glow */}
        <motion.div
          aria-hidden
          className='absolute top-1/3 -right-28 h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full mix-blend-screen'
          style={{
            opacity: 0.38,
            filter: 'blur(120px)',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-accent), transparent 65%)',
          }}
          animate={driftPath}
          transition={
            prefersReducedMotion ? undefined : { ...driftTransition, delay: 2 }
          }
        />
        {/* bottom-center cool glow */}
        <motion.div
          aria-hidden
          className='absolute left-1/2 bottom-[-6rem] -translate-x-1/2 h-52 w-52 md:h-64 md:w-64 rounded-full mix-blend-screen'
          style={{
            opacity: 0.33,
            filter: 'blur(120px)',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-accent-alt), transparent 65%)',
          }}
          animate={driftPath}
          transition={
            prefersReducedMotion ? undefined : { ...driftTransition, delay: 4 }
          }
        />
        {/* faint top hairline highlight */}
        <div className='absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-gradient-to-r from-brand/25 via-transparent to-accent/25' />
      </div>

      {/* ——— Content ——— */}
      <div className='relative z-10 grid max-w-6xl gap-8 mx-auto sm:grid-cols-3 sm:gap-10'>
        {/* Brand + contact */}
        <div className='space-y-3 text-center sm:text-left'>
          <h3 className='text-lg font-semibold text-[var(--color-text)]'>
            Andrew Teece
          </h3>
          <address className='not-italic text-sm text-[var(--color-text)]/80'>
            <a
              href='mailto:andrew@andrewteece.com'
              className='underline hover:text-[var(--color-brand)] transition-colors'
            >
              andrew@andrewteece.com
            </a>
          </address>
          {/* If you have a SocialLinks component, show it here */}
          {/* <SocialLinks className="justify-center gap-4 sm:justify-start" /> */}
          <div className='flex items-center justify-center gap-4 mt-2 sm:justify-start opacity-90'>
            <a
              href='https://github.com/andrewteece'
              aria-label='GitHub'
              className='hover:opacity-80'
            >
              <svg
                className='w-6 h-6 fill-current text-brand'
                viewBox='0 0 24 24'
              >
                <path d='M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.42-1.35-1.8-1.35-1.8-1.1-.75.09-.73.09-.73 1.22.09 1.86 1.26 1.86 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.63-2.67-.31-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.25-.12-.31-.54-1.57.12-3.28 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6 0c2.28-1.56 3.29-1.24 3.29-1.24.66 1.71.24 2.97.12 3.28.77.85 1.23 1.93 1.23 3.25 0 4.63-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z' />
              </svg>
            </a>
            <a
              href='https://www.linkedin.com/in/andrewteece/'
              aria-label='LinkedIn'
              className='hover:opacity-80'
            >
              <svg
                className='w-6 h-6 fill-current text-brand'
                viewBox='0 0 24 24'
              >
                <path d='M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5H4.5V23H.5V8.5zM8.5 8.5h3.8v1.98h.05c.53-1 1.82-2.06 3.75-2.06 4.01 0 4.75 2.64 4.75 6.08V23h-4V15.5c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.94-2.87 3.96V23h-4V8.5z' />
              </svg>
            </a>
            <a
              href='https://x.com/andrewteece'
              aria-label='X'
              className='hover:opacity-80'
            >
              <svg
                className='w-6 h-6 fill-current text-brand'
                viewBox='0 0 24 24'
              >
                <path d='M17.53 3H20.5l-6.37 7.29L21.5 21h-5.82l-4.56-5.41L5.82 21H2.85l6.85-7.86L2 3h5.9l4.17 4.95L17.53 3Zm-1.03 16h1.7L7.61 5H5.83L16.5 19Z' />
              </svg>
            </a>
          </div>
        </div>

        {/* Mini sitemap */}
        <nav aria-label='Footer' className='text-center sm:text-left'>
          <ul className='inline-grid grid-cols-2 text-sm gap-x-10 gap-y-2'>
            <li>
              <a className='hover:text-[var(--color-brand)]' href='/blog'>
                Blog
              </a>
            </li>
            <li>
              <a className='hover:text-[var(--color-brand)]' href='#projects'>
                Projects
              </a>
            </li>
            <li>
              <a className='hover:text-[var(--color-brand)]' href='#techstack'>
                Tech Stack
              </a>
            </li>
            <li>
              <a className='hover:text-[var(--color-brand)]' href='/about'>
                About
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className='flex flex-col items-center gap-3 sm:items-end'>
          <a
            href='/resume.pdf'
            download
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)]/70 bg-white/0 px-4 py-1.5 rounded-md hover:bg-white/10 transition-colors shadow-sm'
          >
            <Download className='w-4 h-4' />
            Download Résumé
          </a>
          <a
            href='mailto:andrew@andrewteece.com'
            className='inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-md border border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white transition-colors shadow-sm'
          >
            <Mail className='w-4 h-4' />
            Let&apos;s Connect
          </a>
        </div>
      </div>

      {/* Badges & copyright */}
      <div className='relative z-10 flex flex-col items-center max-w-6xl gap-2 mx-auto mt-8 text-center'>
        <div className='flex flex-wrap items-center justify-center gap-2 opacity-90'>
          <img
            src='https://github.com/andrewteece/andrewteece-portfolio/actions/workflows/test.yml/badge.svg'
            alt='Vitest status'
            className='h-5'
          />
          <img
            src='https://codecov.io/gh/andrewteece/andrewteece-portfolio/branch/main/graph/badge.svg'
            alt='Codecov'
            className='h-5'
          />
        </div>
        <p className='text-sm text-[var(--color-text)]/75'>
          © {new Date().getFullYear()} Andrew Teece. All rights reserved.
        </p>
      </div>

      {/* Back to top */}
      <a
        href='#home'
        className={`fixed bottom-6 right-6 z-50 p-2 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:bg-opacity-80 transition-opacity ${
          showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label='Back to top'
      >
        <ArrowUp size={20} />
      </a>
    </motion.footer>
  );
}
