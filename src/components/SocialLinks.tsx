import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { cn } from '../lib/utils';

// Minimal Twitter/X logo
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    width='1em'
    height='1em'
    fill='currentColor'
    aria-hidden='true'
    {...props}
  >
    <path d='M18.244 2.25h3.558l-7.77 8.873L24 21.75h-7.41l-5.79-7.099-6.62 7.099H.62l8.34-9.093L0 2.25h7.59l5.23 6.58 5.424-6.58z' />
  </svg>
);

interface SocialLinksProps {
  className?: string;
}

export default function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div
      className={cn(
        'flex items-center space-x-4 text-[var(--color-brand)]',
        className
      )}
    >
      <a
        href='https://github.com/andrewteece'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='GitHub'
        className='hover:text-[var(--color-accent)] transition-colors duration-200'
      >
        <FaGithub size={35} />
      </a>
      <a
        href='https://www.linkedin.com/in/andrew-teece/'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='LinkedIn'
        className='hover:text-[var(--color-accent)] transition-colors duration-200'
      >
        <FaLinkedin size={35} />
      </a>
      <a
        href='https://x.com/AndrewTeec43111'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Twitter / X'
        className='hover:text-[var(--color-accent)] transition-colors duration-200'
      >
        <XIcon className='w-[30px] h-[30px]' />
      </a>
    </div>
  );
}
