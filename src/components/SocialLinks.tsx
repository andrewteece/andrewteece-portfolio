import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { cn } from '../lib/utils';

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
      {/* <a
        href='https://twitter.com/andrewteece'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Twitter'
        className='hover:text-[var(--color-accent)] transition-colors duration-200'
      >
        <FaTwitter size={35} />
      </a> */}
    </div>
  );
}
