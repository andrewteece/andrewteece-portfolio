import { Link } from 'react-router-dom';

export default function AuthorBlock() {
  return (
    <div className='mt-16 border-t pt-8 text-sm text-muted-foreground flex items-start gap-4'>
      <img
        src='/images/andrew-avatar.webp' // Replace with actual headshot if available
        alt='Andrew Teece'
        className='w-12 h-12 rounded-full border'
      />
      <div>
        <p className='font-medium text-foreground'>Andrew Teece</p>
        <p>Front-end Developer. Clean code advocate. Coffee-powered.</p>
        <Link
          to='/'
          className='text-primary hover:underline underline-offset-4 mt-1 inline-block'
        >
          andrewteece.com →
        </Link>
      </div>
    </div>
  );
}
