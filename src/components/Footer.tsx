import SocialLinks from '../components/SocialLinks';

export default function Footer() {
  return (
    <footer
      id='contact'
      className='border-t border-[var(--color-divider)] py-10 px-4 text-sm text-[var(--color-text-muted)] text-center'
    >
      <div className='mb-4 flex justify-center'>
        <SocialLinks />
      </div>
      <p>
        © {new Date().getFullYear()} Andrew Teece •{' '}
        <a
          href='mailto:andrewteece@gmail.com'
          className='underline hover:text-[var(--color-accent)]'
        >
          Email Me
        </a>
      </p>
    </footer>
  );
}
