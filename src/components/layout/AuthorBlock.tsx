// src/components/layout/AuthorBlock.tsx
import { Link } from 'react-router-dom';

export default function AuthorBlock() {
  return (
    <div
      className='mt-16 flex items-start gap-4 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-text)]/75'
      itemScope
      itemType='https://schema.org/Person'
    >
      <img
        src='/images/andrew-avatar.webp'
        alt='Portrait of Andrew Teece, Front-End Developer'
        className='h-12 w-12 rounded-full border border-[var(--color-border)]'
        itemProp='image'
        loading='lazy'
        decoding='async'
        width={48}
        height={48}
      />
      <div>
        <p className='font-medium text-[var(--color-text)]' itemProp='name'>
          Andrew Teece
        </p>
        <p itemProp='jobTitle'>
          Front-end Developer. Clean code advocate. Coffee-powered.
        </p>

        <div className='flex flex-wrap gap-3 mt-1'>
          <Link
            to='/'
            className='inline-block text-[var(--color-brand)] underline-offset-4 hover:underline'
            itemProp='url'
          >
            andrewteece.com →
          </Link>
          <a
            href='https://github.com/andrewteece'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-[var(--color-brand)] underline-offset-4 hover:underline'
            itemProp='sameAs'
          >
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/andrew-teece/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-[var(--color-brand)] underline-offset-4 hover:underline'
            itemProp='sameAs'
          >
            LinkedIn
          </a>
          <a
            href='https://x.com/AndrewTeec43111'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-[var(--color-brand)] underline-offset-4 hover:underline'
            itemProp='sameAs'
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
