import type { PropsWithChildren, HTMLAttributes } from 'react';
import React from 'react';

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export function H1({
  className,
  ...p
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      className={cx(
        'text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-brand)]',
        className
      )}
      {...p}
    />
  );
}
export function H2({
  className,
  ...p
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h2
      className={cx(
        'text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-brand)]',
        className
      )}
      {...p}
    />
  );
}
export function H3({
  className,
  ...p
}: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3
      className={cx(
        'text-xl md:text-2xl font-semibold tracking-tight text-[var(--color-brand)]',
        className
      )}
      {...p}
    />
  );
}

export function P({
  className,
  ...p
}: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>) {
  return <p className={cx('text-muted leading-relaxed', className)} {...p} />;
}

function Content({
  size = 'readable',
  className,
  ...p
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & { size?: 'readable' | 'wide' }
>) {
  const width = size === 'wide' ? 'max-w-6xl' : 'max-w-3xl';
  return <div className={cx('mx-auto px-4', width, className)} {...p} />;
}

export function Stack({
  className,
  space = 'md',
  ...p
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & { space?: 'sm' | 'md' | 'lg' }
>) {
  const gap =
    space === 'lg' ? 'space-y-8' : space === 'sm' ? 'space-y-3' : 'space-y-6';
  return <div className={cx(gap, className)} {...p} />;
}

type SectionVariant = 'plain' | 'subtle' | 'panel';

/* ---------- Type guards for React elements with className/children ---------- */
type WithChildrenClass = { className?: string; children?: React.ReactNode };
function isElement(
  n: React.ReactNode
): n is React.ReactElement<WithChildrenClass> {
  return React.isValidElement<WithChildrenClass>(n);
}

/** Center ALL <P> and native <p> elements inside a node tree. */
function centerAllParagraphs(node: React.ReactNode): React.ReactNode {
  if (!isElement(node)) return node;

  const isPara = node.type === P || node.type === 'p';
  const nextClass = isPara
    ? [node.props.className, 'text-center mx-auto'].filter(Boolean).join(' ')
    : node.props.className;

  const nextChildren = React.Children.map(node.props.children, (child) =>
    centerAllParagraphs(child)
  );

  // Clone only if we added a class or changed children
  const classChanged = nextClass !== node.props.className;
  const childrenChanged = nextChildren !== node.props.children;

  return classChanged || childrenChanged
    ? React.cloneElement(node, { className: nextClass, children: nextChildren })
    : node;
}

export function Section({
  id,
  title,
  eyebrow,
  children,
  className,
  size = 'readable',
  align = 'left',
  variant = 'plain',
}: PropsWithChildren<{
  id?: string;
  title?: string;
  eyebrow?: string;
  className?: string;
  size?: 'readable' | 'wide';
  align?: 'left' | 'center';
  variant?: SectionVariant;
}>) {
  const Header =
    eyebrow || title ? (
      <div
        className={cx(
          'flex items-center gap-3',
          align === 'center' && 'justify-center text-center'
        )}
      >
        {/* left rule */}
        <div
          className={cx(
            'h-px rounded-full',
            'bg-[rgb(var(--text-rgb)/0.20)] dark:bg-[rgb(var(--text-rgb)/0.28)]',
            align === 'center' ? 'flex-1' : 'w-8'
          )}
        />
        <div>
          {eyebrow && (
            <p className='text-[10px] font-medium uppercase tracking-[0.18em] text-muted'>
              {eyebrow}
            </p>
          )}
          {title && <H2 className='mt-1'>{title}</H2>}
        </div>
        {/* right rule */}
        <div className='h-px flex-1 rounded-full bg-[rgb(var(--text-rgb)/0.20)] dark:bg-[rgb(var(--text-rgb)/0.28)]' />
      </div>
    ) : null;

  const chromeClasses =
    variant === 'panel'
      ? 'rounded-2xl bg-surface border border-subtle shadow-sm p-6 sm:p-8'
      : variant === 'subtle'
      ? 'rounded-2xl bg-surface p-6 sm:p-8'
      : '';

  const contentChildren =
    align === 'center' ? centerAllParagraphs(children) : children;

  return (
    <section
      id={id}
      className={cx('py-12 sm:py-16 text-[var(--color-text)]', className)}
    >
      <Content size={size}>
        {variant === 'plain' ? (
          <Stack space='md'>
            {Header}
            {contentChildren}
          </Stack>
        ) : (
          <div className={chromeClasses}>
            <Stack space='md'>
              {Header}
              {contentChildren}
            </Stack>
          </div>
        )}
      </Content>
    </section>
  );
}
