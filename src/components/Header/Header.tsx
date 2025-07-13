import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header
      className='sticky top-0 z-50 border-b shadow-sm transition-colors
      bg-[var(--color-bg)] text-[var(--color-text)]'
    >
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold text-[var(--color-brand)]'>
          Andrew Teece
        </h1>

        <nav className='flex items-center gap-6 text-sm'>
          <a href='#about' className='hover:underline'>
            About
          </a>
          <a href='#projects' className='hover:underline'>
            Projects
          </a>
          <a href='#contact' className='hover:underline'>
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
