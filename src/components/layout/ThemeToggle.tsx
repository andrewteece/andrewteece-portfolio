import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import type { FC } from 'react';

export type ThemeToggleProps = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <button onClick={toggle} aria-label='Toggle theme' className='p-1'>
      {/* Reserve space so the swap doesn't cause layout shift */}
      <span
        className='inline-flex items-center justify-center'
        style={{ width: 24, height: 24 }}
      >
        <AnimatePresence mode='wait'>
          {isDark ? (
            <motion.span
              key='moon'
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
            >
              <Moon size={20} aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key='sun'
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.25 }}
            >
              <Sun size={20} aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
};

export default ThemeToggle;
