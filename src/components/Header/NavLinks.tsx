type NavLinksProps = {
  onClick?: () => void;
  activeSection?: string;
};

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function NavLinks({ onClick, activeSection }: NavLinksProps) {
  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClick}
          className={`
            relative text-sm transition-colors duration-300
            after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[var(--color-accent)]
            after:transition-all after:duration-300 hover:after:w-full
            ${
              activeSection === link.href
                ? 'text-[var(--color-accent)] font-medium after:w-full'
                : ''
            }
          `}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}
