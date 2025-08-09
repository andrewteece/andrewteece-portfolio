import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useActiveSection } from '../../context/ActiveSectionContext';

interface NavLinksProps {
  activeSection?: string;
  onClick?: () => void;
}

export type { NavLinksProps };

const navItems = [
  { href: 'home', label: 'Home' },
  { href: 'techstack', label: 'Tech Stack' },
  { href: 'about', label: 'About' },
  { href: 'projects', label: 'Projects' },
  { href: 'contact', label: 'Contact' },
];

export default function NavLinks({ onClick }: NavLinksProps) {
  const { activeSection } = useActiveSection();
  const location = useLocation();
  const isBlogRoute = location.pathname.startsWith('/blog');

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
      {/* Blog link */}
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
          className={cn(
            'relative transition-colors hover:text-[var(--color-brand)]',
            isBlogRoute ? 'text-[var(--color-brand)] font-semibold' : ''
          )}
        >
          Blog
          <span
            className={cn(
              'absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[var(--color-brand)] transition-transform duration-300',
              isBlogRoute && 'scale-x-100'
            )}
          />
        </Link>
      </motion.li>

      {/* Section links */}
      {navItems.map(({ href, label }) => (
        <motion.li
          key={href}
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Link
            to={`/?scrollTo=${href}`}
            onClick={onClick}
            className={cn(
              'relative transition-colors hover:text-[var(--color-brand)]',
              activeSection === href
                ? 'text-[var(--color-brand)] font-semibold'
                : ''
            )}
          >
            {label}
            <span
              className={cn(
                'absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[var(--color-brand)] transition-transform duration-300',
                activeSection === href && 'scale-x-100'
              )}
            />
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
