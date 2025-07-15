import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '../Header/ThemeToggle';
import NavLinks from '../Header/NavLinks';

export default function Header() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'shadow-lg border-b border-[var(--color-accent)/40] backdrop-blur-md bg-[var(--color-bg)/90]'
          : 'border-transparent backdrop-blur-md bg-[var(--color-bg)/70]'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <motion.div
          className='text-xl font-extrabold tracking-tight text-[var(--color-brand)] font-[Outfit,sans-serif]'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Andrew <span className='opacity-80'>Teece</span>
        </motion.div>

        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <NavLinks onClick={() => setMenuOpen(false)} />
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </nav>

        <div className='md:hidden flex items-center gap-3'>
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
            className='p-1'
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              className='fixed inset-x-4 top-[72px] mx-auto w-[90%] max-w-md bg-[var(--color-bg)]/95 backdrop-blur-md shadow-xl z-40 p-6 flex flex-col gap-6 items-center text-center rounded-lg'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            >
              <motion.div
                className='flex justify-end w-full'
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label='Close menu'
                  className='p-1 text-[var(--color-accent)]'
                >
                  <X size={24} />
                </button>
              </motion.div>

              <motion.div
                className='flex flex-col gap-4 mt-2'
                initial='hidden'
                animate='visible'
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <NavLinks onClick={() => setMenuOpen(false)} />
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
