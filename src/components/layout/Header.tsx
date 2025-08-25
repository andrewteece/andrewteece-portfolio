import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import NavLinks from './NavLinks';

const THEME_KEY = 'theme';

type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

function getInitialDark(): boolean {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

/** Smoothly apply theme; uses View Transitions when available */
async function applyTheme(next: 'light' | 'dark') {
  const run = () => {
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }

    // keep <meta name="theme-color"> in sync
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (meta) meta.content = next === 'dark' ? '#0f172a' : '#ffffff';

    // dual favicons (optional)
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
  };

  const motionOk = matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
  const doc = document as DocumentWithVT;

  if (doc.startViewTransition && motionOk) {
    await doc.startViewTransition(run).finished;
  } else {
    run();
  }
}

export default function Header() {
  const [isDark, setIsDark] = useState<boolean>(() => getInitialDark());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // apply theme on toggle
  useEffect(() => {
    void applyTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  // header shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 surface-1 border-b hairline backdrop-blur-sm transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className='flex items-center justify-between py-4 container-base'>
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
              className='fixed inset-x-4 top-[72px] mx-auto w-[90%] max-w-md surface-1 backdrop-blur-md shadow-xl z-40 p-6 flex flex-col gap-6 items-center text-center rounded-lg border hairline'
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
