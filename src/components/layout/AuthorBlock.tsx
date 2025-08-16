// src/components/layout/AuthorBlock.tsx
import { Link } from 'react-router-dom';

export default function AuthorBlock() {
  return (
    <div
      className='flex items-start gap-4 pt-8 mt-16 text-sm border-t text-muted-foreground'
      itemScope
      itemType='https://schema.org/Person'
    >
      <img
        src='/images/andrew-avatar.webp'
        alt='Portrait of Andrew Teece, Front-End Developer'
        className='w-12 h-12 border rounded-full'
        itemProp='image'
      />
      <div>
        <p className='font-medium text-foreground' itemProp='name'>
          Andrew Teece
        </p>
        <p itemProp='jobTitle'>
          Front-end Developer. Clean code advocate. Coffee-powered.
        </p>

        <div className='flex flex-wrap gap-3 mt-1'>
          <Link
            to='/'
            className='inline-block text-primary hover:underline underline-offset-4'
            itemProp='url'
          >
            andrewteece.com →
          </Link>
          <a
            href='https://github.com/andrewteece'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-primary hover:underline underline-offset-4'
            itemProp='sameAs'
          >
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/andrew-teece/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-primary hover:underline underline-offset-4'
            itemProp='sameAs'
          >
            LinkedIn
          </a>
          <a
            href='https://x.com/AndrewTeec43111'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block text-primary hover:underline underline-offset-4'
            itemProp='sameAs'
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
