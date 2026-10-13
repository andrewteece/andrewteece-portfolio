import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeProvider';
import NavLinks from './NavLinks';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-xl border-b border-[var(--color-accent)/20] backdrop-blur-xl bg-[var(--color-bg)]/85 supports-[backdrop-filter]:bg-[var(--color-bg)]/60'
          : 'border-transparent backdrop-blur-sm bg-[var(--color-bg)]/40'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Reserve height to avoid layout shift */}
      <div className='h-16'>
        <div className='max-w-7xl mx-auto px-4 h-full flex justify-between items-center'>
          <motion.div
            className='shrink-0 whitespace-nowrap text-xl font-extrabold tracking-tight text-[var(--color-brand)] font-[Outfit,sans-serif]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            Andrew <span className='opacity-80'>Teece</span>
          </motion.div>

          <nav className='hidden lg:flex items-center gap-3 text-sm'>
            <NavLinks onClick={() => setMenuOpen(false)} />
            <a
              href='mailto:andrew@andrewteece.com?subject=Book%20a%2020-minute%20call'
              className='whitespace-nowrap rounded-md bg-[var(--color-brand)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90'
            >
              Book a 20-minute call
            </a>
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </nav>

          <div className='lg:hidden flex items-center gap-3'>
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label='Toggle menu'
              className='p-1'
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className='fixed inset-0 bg-black/50 z-30'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className='fixed inset-x-4 top-[72px] mx-auto w-[90%] max-w-md bg-[var(--color-bg)]/95 backdrop-blur-md shadow-xl z-40 p-6 flex flex-col gap-6 items-center text-center rounded-lg'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            >
              <div className='flex justify-end w-full'>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label='Close menu'
                  className='p-1 text-[var(--color-accent)]'
                >
                  <X size={24} />
                </button>
              </div>

              <motion.div
                className='flex flex-col gap-4 mt-2'
                initial='hidden'
                animate='visible'
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                <NavLinks onClick={() => setMenuOpen(false)} />
              </motion.div>
              <a
                href='mailto:andrew@andrewteece.com?subject=Book%20a%2020-minute%20call'
                className='rounded-md bg-[var(--color-brand)] px-4 py-2 font-semibold text-white'
              >
                Book a 20-minute call
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
