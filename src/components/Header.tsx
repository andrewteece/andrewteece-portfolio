import { useLayoutEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <header
      className='sticky top-0 z-50 border-b shadow-sm transition-colors
        bg-[var(--color-bg)] text-[var(--color-text)]'
    >
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-[var(--color-brand)]'>
          Andrew Teece
        </h1>

        <nav className='flex items-center gap-6 text-sm'>
          <a href='#about' className='hover:underline'>
            About
          </a>
          <a href='#projects' className='hover:underline'>
            Projects
          </a>
          <a href='#contact' className='hover:underline'>
            Contact
          </a>

          <button
            onClick={() => setIsDark((prev) => !prev)}
            aria-label='Toggle dark mode'
            className='p-1 rounded transition-colors'
          >
            <AnimatePresence mode='wait'>
              {isDark ? (
                <motion.div
                  key='moon'
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key='sun'
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </div>
    </header>
  );
}
