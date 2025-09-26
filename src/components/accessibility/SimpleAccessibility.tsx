import { motion } from 'framer-motion';
import { Eye, EyeOff, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export function useAccessibilityPreferences() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check for saved preferences
    const savedHighContrast =
      localStorage.getItem('accessibility-high-contrast') === 'true';
    setHighContrast(savedHighContrast);

    // Apply high contrast
    if (savedHighContrast) {
      document.documentElement.classList.add('high-contrast');
    }

    // Emergency escape: Press Escape + H to disable high contrast
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && e.shiftKey) {
        setHighContrast(false);
        localStorage.setItem('accessibility-high-contrast', 'false');
        document.documentElement.classList.remove('high-contrast');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('accessibility-high-contrast', String(newValue));

    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return {
    highContrast,
    toggleHighContrast,
  };
}

export function SimpleAccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { highContrast, toggleHighContrast } = useAccessibilityPreferences();

  return (
    <>
      {/* Accessibility Panel Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed top-20 left-4 z-50 p-3 bg-[var(--color-bg)]/90 backdrop-blur-sm
                   border border-[var(--color-border)] rounded-full shadow-lg
                   text-[var(--color-text)] hover:bg-[var(--color-bg)]/95 transition-colors'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label='Accessibility settings'
        title='Accessibility settings'
      >
        <Settings size={20} />
      </motion.button>

      {/* Accessibility Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className='fixed top-32 left-4 z-40 w-80 p-4 bg-[var(--color-bg)]/95 backdrop-blur-md
                     border border-[var(--color-border)] rounded-xl shadow-xl'
        >
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-[var(--color-text)]'>
              Accessibility
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className='text-[var(--color-text)]/60 hover:text-[var(--color-text)]'
              aria-label='Close accessibility panel'
            >
              ✕
            </button>
          </div>

          <div className='space-y-4'>
            {/* High Contrast Toggle */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                {highContrast ? <Eye size={18} /> : <EyeOff size={18} />}
                <div>
                  <label className='text-sm font-medium text-[var(--color-text)]'>
                    High Contrast
                  </label>
                  <p className='text-xs text-[var(--color-text)]/60'>
                    Increase color contrast for better visibility
                  </p>
                </div>
              </div>
              <button
                onClick={toggleHighContrast}
                className={`w-12 h-6 rounded-full transition-colors ${
                  highContrast
                    ? 'bg-[var(--color-brand)]'
                    : 'bg-[var(--color-border)]'
                }`}
                aria-label={`Toggle high contrast ${
                  highContrast ? 'off' : 'on'
                }`}
                title={`Toggle high contrast ${highContrast ? 'off' : 'on'}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Status Indicator */}
            <div className='pt-3 border-t border-[var(--color-border)] space-y-2'>
              <div className='flex items-center gap-2 text-xs text-[var(--color-text)]/60'>
                <div className='w-2 h-2 bg-green-400 rounded-full' />
                Accessibility preferences saved locally
              </div>
              {highContrast && (
                <div className='text-xs text-[var(--color-text)]/60'>
                  💡 Press{' '}
                  <kbd className='px-1 bg-[var(--color-border)] rounded'>
                    Shift + Esc
                  </kbd>{' '}
                  to quickly disable high contrast
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
