import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';

export type ThemeToggleProps = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeToggle: FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <button onClick={toggle} aria-label='Toggle theme' className='p-1'>
      <AnimatePresence mode='wait'>
        {isDark ? (
          <motion.div
            key='moon'
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Moon size={20} />
          </motion.div>
        ) : (
          <motion.div
            key='sun'
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
