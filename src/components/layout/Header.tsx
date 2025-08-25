import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import NavLinks from './NavLinks';

const THEME_KEY = 'theme';

function applyTheme(next: 'light' | 'dark', suppressTransitions = false) {
  const root = document.documentElement;

  if (suppressTransitions) root.classList.add('disable-transitions');

  requestAnimationFrame(() => {
    root.classList.toggle('dark', next === 'dark');
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore write errors (e.g., private mode)
    }

    // keep <meta name="theme-color"> in sync
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (meta) meta.content = next === 'dark' ? '#0f172a' : '#ffffff';

    // optional dual favicon sync
    const iconLight = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][data-theme="light"]'
    );
    const iconDark = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][data-theme="dark"]'
    );
    if (iconLight && iconDark) {
      iconLight.media = next === 'dark' ? 'not all' : 'all';
      iconDark.media = next === 'dark' ? 'all' : 'not all';
    }

    requestAnimationFrame(() => {
      root.classList.remove('disable-transitions');
    });
  });
}

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Apply theme whenever isDark changes
  useEffect(() => {
    applyTheme(isDark ? 'dark' : 'light', true);
  }, [isDark]);

  // Scroll shadow handling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
      <div className='flex items-center justify-between px-4 py-4 mx-auto max-w-7xl'>
        <motion.div
          className='text-xl font-extrabold tracking-tight text-[var(--color-brand)] font-[Outfit,sans-serif]'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Andrew <span className='opacity-80'>Teece</span>
        </motion.div>

        {/* Desktop nav */}
        <nav className='items-center hidden gap-6 text-sm md:flex'>
          <NavLinks onClick={() => setMenuOpen(false)} />
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </nav>

        {/* Mobile controls */}
        <div className='flex items-center gap-3 md:hidden'>
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
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 z-30 bg-black/50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Mobile nav */}
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
