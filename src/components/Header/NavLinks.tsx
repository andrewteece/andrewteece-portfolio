import { motion } from 'framer-motion';
import { cn } from '../../lib/utils'; // Or replace with basic utility below

interface NavLinksProps {
  activeSection?: string;
  onClick?: () => void;
}

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#techstack', label: 'Tech Stack' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#footer', label: 'Contact' },
];

export default function NavLinks({ activeSection, onClick }: NavLinksProps) {
  return (
    <motion.ul
      className='flex flex-col items-center gap-4 text-lg md:flex-row md:gap-6'
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {navItems.map(({ href, label }) => (
        <motion.li
          key={href}
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <a
            href={href}
            onClick={onClick}
            className={cn(
              'transition-colors hover:text-[var(--color-brand)]',
              activeSection === href
                ? 'text-[var(--color-brand)] font-semibold'
                : ''
            )}
          >
            {label}
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
