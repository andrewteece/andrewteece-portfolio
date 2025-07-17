import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useActiveSection } from '../../context/ActiveSectionContext';

interface NavLinksProps {
  onClick?: () => void;
}

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#techstack', label: 'Tech Stack' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#footer', label: 'Contact' },
];

export default function NavLinks({ onClick }: NavLinksProps) {
  const { activeSection } = useActiveSection();

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
      {/* Blog link using react-router-dom */}
      <motion.li
        key='blog'
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <Link
          to='/blog'
          onClick={onClick}
          className='transition-colors hover:text-[var(--color-brand)]'
        >
          Blog
        </Link>
      </motion.li>

      {/* Anchor links using hash navigation */}
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
              activeSection === href.slice(1)
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
