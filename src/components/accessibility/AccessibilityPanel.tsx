import { motion, useReducedMotion } from 'framer-motion';
import { Eye, EyeOff, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export function useAccessibilityPreferences() {
  const prefersReducedMotion = useReducedMotion();
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    prefersReducedMotion || false
  );

  useEffect(() => {
    // Check for saved preferences
    const savedHighContrast =
      localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedReducedMotion =
      localStorage.getItem('accessibility-reduced-motion') === 'true';

    setHighContrast(savedHighContrast);
    setReducedMotion(savedReducedMotion || prefersReducedMotion || false);

    // Apply high contrast
    if (savedHighContrast) {
      document.documentElement.classList.add('high-contrast');
    }
  }, [prefersReducedMotion]);

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

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    localStorage.setItem('accessibility-reduced-motion', String(newValue));
  };

  return {
    highContrast,
    reducedMotion,
    toggleHighContrast,
    toggleReducedMotion,
    prefersReducedMotion: prefersReducedMotion || reducedMotion,
  };
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    highContrast,
    reducedMotion,
    toggleHighContrast,
    toggleReducedMotion,
  } = useAccessibilityPreferences();

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
        aria-expanded={isOpen}
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
                aria-checked={highContrast ? 'true' : 'false'}
                aria-label={`Toggle high contrast ${
                  highContrast ? 'off' : 'on'
                }`}
                role='switch'
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <motion.div
                  animate={reducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Settings size={18} />
                </motion.div>
                <div>
                  <label className='text-sm font-medium text-[var(--color-text)]'>
                    Reduce Motion
                  </label>
                  <p className='text-xs text-[var(--color-text)]/60'>
                    Minimize animations and transitions
                  </p>
                </div>
              </div>
              <button
                onClick={toggleReducedMotion}
                className={`w-12 h-6 rounded-full transition-colors ${
                  reducedMotion
                    ? 'bg-[var(--color-brand)]'
                    : 'bg-[var(--color-border)]'
                }`}
                aria-checked={reducedMotion ? 'true' : 'false'}
                aria-label={`Toggle reduced motion ${
                  reducedMotion ? 'off' : 'on'
                }`}
                role='switch'
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Status Indicator */}
            <div className='pt-3 border-t border-[var(--color-border)]'>
              <div className='flex items-center gap-2 text-xs text-[var(--color-text)]/60'>
                <div className='w-2 h-2 bg-green-400 rounded-full' />
                Accessibility preferences saved locally
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
