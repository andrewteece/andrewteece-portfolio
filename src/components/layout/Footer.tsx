import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { Download } from 'lucide-react';
import SocialLinks from '../SocialLinks';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState, useRef, useContext } from 'react';

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection('footer');
      },
      { threshold: 0.4 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [setActiveSection]);

  return (
    <>
      <Helmet>
        <link rel='preload' as='image' href='/images/bg-waves.webp' />
      </Helmet>
      <motion.footer
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id='contact'
        className='relative overflow-hidden py-14 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-bg dark:from-brand/20 dark:to-bg'
      >
        {/* Background mesh gradient image */}
        <div className='absolute inset-0'>
          <img
            src='images/bg-waves.webp'
            alt='Footer mesh background'
            className='w-full h-full object-cover opacity-20 dark:opacity-10 z-0'
            loading='eager'
            decoding='async'
            aria-hidden
          />
        </div>

        <div className='relative z-10 flex flex-col items-center gap-10 text-center max-w-4xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='space-y-3'
          >
            <p className='text-base font-medium text-[var(--color-text)]'>
              Contact me at{' '}
              <a
                href='mailto:andrew@andrewteece.com'
                className='underline hover:text-[var(--color-brand)] transition-colors'
              >
                andrew@andrewteece.com
              </a>
            </p>
            <p className='text-sm text-muted'>
              © {new Date().getFullYear()} Andrew Teece. All rights reserved.
            </p>
            <div className='mt-2 flex flex-col sm:flex-row items-center justify-center gap-2'>
              <a
                href='https://github.com/andrewteece/andrewteece-portfolio/actions'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src='https://github.com/andrewteece/andrewteece-portfolio/actions/workflows/test.yml/badge.svg'
                  alt='Test Status'
                  className='h-5'
                />
              </a>
              <a
                href='https://codecov.io/gh/andrewteece/andrewteece-portfolio'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  src='https://codecov.io/gh/andrewteece/andrewteece-portfolio/branch/main/graph/badge.svg'
                  alt='Code coverage badge'
                  className='h-5'
                />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className='flex flex-col sm:flex-row items-center justify-center flex-wrap gap-4 pt-4'
          >
            <SocialLinks className='justify-center gap-4' />
            <a
              href='/resume.pdf'
              download
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] bg-white/30 dark:bg-white/10 backdrop-blur px-4 py-1.5 rounded-md hover:bg-white/40 dark:hover:bg-white/20 transition-colors shadow-sm'
            >
              <motion.span
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Download className='w-4 h-4' />
              </motion.span>
              Download Résumé
            </a>
            <a
              href='mailto:andrew@andrewteece.com'
              onClick={() =>
                toast.success('Opening email app...', {
                  style: {
                    background: 'var(--color-bg-alt)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                  },
                  icon: '✅',
                  className:
                    'dark:bg-[var(--color-bg-alt)] dark:text-[var(--color-text)] dark:border dark:border-[var(--color-border)]',
                })
              }
              className='inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-md border border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white transition-all shadow-sm backdrop-blur dark:bg-white/10 dark:hover:bg-[var(--color-brand)/30]'
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className='w-4 h-4' />
              </motion.span>
              Let's Connect
            </a>
          </motion.div>
        </div>

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
    </>
  );
}
