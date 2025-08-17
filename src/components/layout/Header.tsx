import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import NavLinks from './NavLinks';

function getInitialDark(): boolean {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
  } catch {
    return true;
  }
}

export default function Header() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return getInitialDark();
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastRAF = useRef<number | null>(null);

  // Persist and apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {}
  }, [isDark]);

  // Scroll state (rAF + passive)
  useEffect(() => {
    const onScroll = () => {
      if (lastRAF.current != null) return;
      lastRAF.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        lastRAF.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (lastRAF.current) cancelAnimationFrame(lastRAF.current);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    if (menuOpen) style.overflow = 'hidden';
    return () => {
      style.overflow = prev;
    };
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 motion-reduce:transition-none ${
        scrolled
          ? 'shadow-lg border-b border-[var(--color-accent)/40] backdrop-blur-md bg-[var(--color-bg)/90]'
          : 'border-transparent backdrop-blur-md bg-[var(--color-bg)/70]'
      }`}
    >
      {/* Skip link */}
      <a
        href='#main'
        className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] rounded bg-[var(--color-brand)] px-3 py-2 text-sm font-medium text-white'
      >
        Skip to content
      </a>

      <div className='flex items-center justify-between px-4 py-4 mx-auto max-w-7xl'>
        {/* Brand */}
        <motion.a
          href='#home'
          className='font-[Outfit,sans-serif] text-xl font-extrabold tracking-tight text-[var(--color-brand)]'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label='Go to home'
        >
          Andrew <span className='opacity-80'>Teece</span>
        </motion.a>

        {/* Desktop nav */}
        <nav className='items-center hidden gap-6 text-sm group/nav md:flex'>
          <NavLinks onClick={() => setMenuOpen(false)} />
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </nav>

        {/* Mobile toggles */}
        <div className='flex items-center gap-3 md:hidden'>
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
          <button
            onClick={() => setMenuOpen(true)}
            aria-label='Open menu'
            aria-expanded={menuOpen}
            aria-controls='mobile-menu'
            className='p-1 rounded'
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dimmer */}
            <motion.div
              className='fixed inset-0 z-30 bg-black/50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden='true'
            />

            {/* Sheet */}
            <motion.aside
              id='mobile-menu'
              role='dialog'
              aria-modal='true'
              className='fixed top-[72px] z-40 mx-auto w-[90%] max-w-md rounded-lg bg-[var(--color-bg)]/95 p-6 text-center shadow-xl backdrop-blur-md'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            >
              <div className='flex justify-end w-full mb-4'>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label='Close menu'
                  className='rounded-md p-1 text-[var(--color-accent)] transition-transform duration-200 hover:scale-[1.03] hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40'
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
