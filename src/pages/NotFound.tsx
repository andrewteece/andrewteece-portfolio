export default function NotFound() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center text-center px-4 py-24'>
      <h1 className='text-5xl font-bold text-[var(--color-brand)] mb-4'>404</h1>
      <p className='text-xl text-[var(--color-text)] mb-6'>Page not found.</p>
      <a
        href='/'
        className='inline-block px-4 py-2 bg-[var(--color-brand)] text-white rounded-md hover:bg-opacity-90 transition'
      >
        Go back home
      </a>
    </main>
  );
}
