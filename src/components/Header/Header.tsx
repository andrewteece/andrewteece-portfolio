import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '../Header/ThemeToggle';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => {
          const el = document.querySelector(item.href);
          return el
            ? {
                id: item.href,
                top: el.getBoundingClientRect().top + window.scrollY,
              }
            : null;
        })
        .filter(Boolean);

      const scrollPos = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPos >= section.top) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 border-b bg-[var(--color-bg)] text-[var(--color-text)] transition-colors backdrop-blur-md'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-[var(--color-brand)]'>
          Andrew Teece
        </h1>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-6 text-sm'>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`hover:underline ${
                activeSection === item.href
                  ? 'text-[var(--color-accent)] font-medium'
                  : ''
              }`}
            >
              {item.label}
            </a>
          ))}
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

      {/* Mobile Drawer Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className='fixed inset-0 bg-[var(--color-bg)] bg-opacity-95 backdrop-blur-md p-6 md:hidden z-40 flex flex-col gap-6'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`text-lg ${
                  activeSection === item.href
                    ? 'text-[var(--color-accent)] font-medium'
                    : 'text-[var(--color-text)]'
                } hover:underline`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
