export default function Header() {
  return (
    <header className='sticky top-0 bg-white border-b shadow-sm z-50'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Andrew Teece</h1>
        <nav className='space-x-6 text-sm'>
          <a href='#about' className='hover:underline'>
            About
          </a>
          <a href='#projects' className='hover:underline'>
            Projects
          </a>
          <a href='#contact' className='hover:underline'>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
