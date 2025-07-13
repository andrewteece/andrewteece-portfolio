import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import NavLinks from '../Header/NavLinks';
import ThemeToggle from '../Header/ThemeToggle';

export default function Header() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <header className='sticky top-0 z-50 border-b bg-[var(--color-bg)] text-[var(--color-text)] transition-colors'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-[var(--color-brand)]'>
          Andrew Teece
        </h1>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <NavLinks />
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </nav>

        {/* Mobile Toggle Button */}
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

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className='md:hidden px-4 pb-4 flex flex-col gap-3 bg-[var(--color-bg)] text-[var(--color-text)] border-t'
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <NavLinks onClick={() => setMenuOpen(false)} />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
