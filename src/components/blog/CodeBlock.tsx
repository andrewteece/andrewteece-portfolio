import { PropsWithChildren } from 'react';

/**
 * CodeBlock
 * A tiny presentational wrapper for code samples inside MDX posts.
 * - Works with MDX fenced code blocks placed between <CodeBlock> ... </CodeBlock>
 * - Optional `title` renders a small caption above the block
 * - Optional `lang` is informational (useful if you add a language pill later)
 */
type CodeBlockProps = {
  lang?: string; // e.g. "tsx", "bash"
  title?: string; // small caption above the block
};

export default function CodeBlock({
  lang = 'text',
  title,
  children,
}: PropsWithChildren<CodeBlockProps>) {
  return (
    <figure className='my-6'>
      {title ? (
        <figcaption className='mb-2 text-sm text-[var(--color-text)]/80'>
          {title}
        </figcaption>
      ) : null}

      <div className='not-prose overflow-x-auto rounded-xl border border-[var(--color-border)] bg-black/80 p-4 dark:bg-black/60'>
        {/* MDX will pass <pre><code>…</code></pre> here */}
        {children}
      </div>

      {/* Visually-hidden label for screen readers */}
      <span className='sr-only'>Code language: {lang}</span>
    </figure>
  );
}
