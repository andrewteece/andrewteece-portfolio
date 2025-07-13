type NavLinksProps = {
  onClick?: () => void;
};

export default function NavLinks({ onClick }: NavLinksProps) {
  const linkClass = 'hover:underline';
  return (
    <>
      <a href='#about' onClick={onClick} className={linkClass}>
        About
      </a>
      <a href='#projects' onClick={onClick} className={linkClass}>
        Projects
      </a>
      <a href='#contact' onClick={onClick} className={linkClass}>
        Contact
      </a>
    </>
  );
}
