import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useActiveSection } from '../../context/ActiveSectionContext';

interface NavLinksProps {
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

function ItemLink({
  to,
  label,
  active,
  onClick,
}: {
  to: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        // darker base color + larger type (up from base/md:sm)
        'group relative inline-block px-1 py-2 text-[var(--color-text)] text-[17px] md:text-[18px] transition-colors duration-200',
        'hover:text-[var(--color-brand)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]/40 rounded',
        active ? 'text-[var(--color-brand)] font-semibold' : ''
      )}
    >
      <span className='relative z-10'>{label}</span>

      {/* animated underline */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-1 right-1 -bottom-1 h-[2px] rounded',
          'bg-[var(--color-brand)] transform-gpu origin-left will-change-transform',
          'transition-transform duration-300 motion-reduce:transition-none',
          active
            ? 'scale-x-100'
            : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
        )}
      />
    </Link>
  );
}

export default function NavLinks({ onClick }: NavLinksProps) {
  const { activeSection } = useActiveSection();
  const location = useLocation();
  const isBlogRoute = location.pathname.startsWith('/blog');

  return (
    <motion.ul
      // remove inherited size; spacing a touch wider for larger text
      className='flex flex-col items-center gap-4 md:flex-row md:gap-7 lg:gap-8'
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* Blog */}
      <motion.li
        key='blog'
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <ItemLink
          to='/blog'
          label='Blog'
          active={isBlogRoute}
          onClick={onClick}
        />
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
          <ItemLink
            to={`/?scrollTo=${href}`}
            label={label}
            active={activeSection === href}
            onClick={onClick}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
