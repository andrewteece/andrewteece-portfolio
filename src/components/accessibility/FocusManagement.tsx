import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FocusIndicatorProps {
  children: React.ReactNode;
  className?: string;
}

export function FocusIndicator({
  children,
  className = '',
}: FocusIndicatorProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <div
        className='absolute inset-0 rounded-lg border-2 border-transparent
                      focus-within:border-[var(--color-brand)] focus-within:shadow-[0_0_0_3px_rgba(var(--color-brand-rgb),0.2)]
                      transition-all duration-200 pointer-events-none'
      />
    </div>
  );
}

export function useKeyboardNavigation() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (isKeyboardUser) {
      document.body.classList.add('keyboard-user');
    } else {
      document.body.classList.remove('keyboard-user');
    }
  }, [isKeyboardUser]);

  return isKeyboardUser;
}

export function AccessibilityAnnouncer() {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const handleRouteChange = () => {
      const pageTitle = document.title;
      setAnnouncement(`Navigated to ${pageTitle}`);

      // Clear announcement after screen readers have time to read it
      setTimeout(() => setAnnouncement(''), 1000);
    };

    // Listen for navigation changes
    window.addEventListener('popstate', handleRouteChange);

    // Announce initial page load
    handleRouteChange();

    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      className='sr-only'
      role='status'
    >
      {announcement}
    </div>
  );
}

export function SkipLinks() {
  const links = [
    { href: '#main', label: 'Skip to main content' },
    { href: '#navigation', label: 'Skip to navigation' },
    { href: '#contact', label: 'Skip to contact' },
  ];

  return (
    <div className='sr-only focus-within:not-sr-only'>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className='fixed top-4 left-4 z-[9999] px-4 py-2 bg-[var(--color-brand)] text-white
                     rounded-md font-medium shadow-lg transform -translate-y-12
                     focus:translate-y-0 transition-transform duration-200'
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export function KeyboardNavigationIndicator() {
  const isKeyboardUser = useKeyboardNavigation();
  const [focusedElement, setFocusedElement] = useState<string>('');

  useEffect(() => {
    if (!isKeyboardUser) return;

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const label =
        target.getAttribute('aria-label') ||
        target.getAttribute('title') ||
        target.textContent?.slice(0, 50) ||
        target.tagName.toLowerCase();
      setFocusedElement(label);
    };

    const handleBlur = () => {
      setFocusedElement('');
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, [isKeyboardUser]);

  if (!isKeyboardUser || !focusedElement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className='fixed top-20 right-4 z-50 px-3 py-2 bg-[var(--color-bg)]/95
                   backdrop-blur-sm border border-[var(--color-border)] rounded-lg shadow-lg
                   text-sm text-[var(--color-text)] max-w-xs'
      >
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 bg-[var(--color-brand)] rounded-full animate-pulse' />
          <span className='font-medium'>Focused:</span>
        </div>
        <div className='text-xs text-[var(--color-text)]/70 mt-1 truncate'>
          {focusedElement}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
