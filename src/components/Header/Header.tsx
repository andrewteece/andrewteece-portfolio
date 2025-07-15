import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../Header/ThemeToggle';
import NavLinks from '../Header/NavLinks';

export default function Header() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [menuOpen, setMenuOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeSection, setActiveSection] = useState('');

  const menuRef = useRef(null);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] backdrop-blur-md shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='text-xl font-bold text-[var(--color-brand)]'>
          Andrew Teece
        </div>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <NavLinks activeSection={activeSection} />
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </nav>

        {/* Mobile Toggle */}
        <div className='md:hidden flex items-center gap-3'>
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='absolute top-full left-0 w-full bg-[var(--color-bg)] py-6 shadow-md md:hidden'
          >
            <ul className='flex flex-col items-center gap-4'>
              <NavLinks
                activeSection={activeSection}
                onClick={() => setMenuOpen(false)}
              />
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
