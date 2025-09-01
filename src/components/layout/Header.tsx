import { useEffect, useState } from 'react';
import { IconMenu, IconX } from '../icons';
import NavLinks from './NavLinks';
import ThemeToggle from './ThemeToggle';

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow ${
        scrolled ? 'shadow-sm' : ''
      }`}
    >
      <div
        className={[
          'container-base flex items-center justify-between py-4',
          scrolled
            ? 'bg-[var(--color-bg)]/95 border-b hairline backdrop-blur-md'
            : 'bg-[var(--color-bg)]/70',
        ].join(' ')}
      >
        <div className='text-xl font-extrabold tracking-tight text-[var(--color-brand)] font-[Outfit,sans-serif]'>
          Andrew <span className='opacity-80'>Teece</span>
        </div>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-6 text-sm'>
          <NavLinks onClick={() => setMenuOpen(false)} />
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
        </nav>

        {/* Mobile controls */}
        <div className='md:hidden flex items-center gap-3'>
          <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls='mobile-menu'
            aria-label='Toggle menu'
            className='p-1'
          >
            {menuOpen ? (
              <IconX width={24} height={24} />
            ) : (
              <IconMenu width={24} height={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile sheet */}
      <aside
        id='mobile-menu'
        className={[
          'fixed inset-x-4 top-[72px] mx-auto w-[90%] max-w-md',
          'surface-1 border hairline rounded-lg p-6 z-50',
          'bg-[var(--color-bg)]/95',
          'transition-all duration-300',
          menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        <div className='flex justify-end w-full'>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label='Close menu'
            className='p-1 text-[var(--color-accent)]'
          >
            <IconX width={24} height={24} />
          </button>
        </div>

        <div className='flex flex-col gap-4 mt-2 items-center text-center'>
          <NavLinks onClick={() => setMenuOpen(false)} />
        </div>
      </aside>
    </header>
  );
}
