import * as React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { Highlight } from 'prism-react-renderer';
import type { PrismTheme, Language } from 'prism-react-renderer';
import { Clipboard, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeProvider';

type CodeProps = { className?: string; children?: ReactNode };

/* ---------- Minimal, typed themes (no deep imports) ---------- */
const THEME_LIGHT: PrismTheme = {
  plain: { color: '#24292e', backgroundColor: 'transparent' },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6a737d' },
    },
    { types: ['punctuation'], style: { color: '#24292e' } },
    {
      types: [
        'property',
        'tag',
        'boolean',
        'number',
        'constant',
        'symbol',
        'deleted',
      ],
      style: { color: '#d73a49' },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: { color: '#032f62' },
    },
    { types: ['operator', 'entity', 'url'], style: { color: '#005cc5' } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#22863a' } },
    { types: ['function', 'class-name'], style: { color: '#6f42c1' } },
    { types: ['regex', 'important', 'variable'], style: { color: '#e36209' } },
  ],
};

const THEME_DARK: PrismTheme = {
  plain: { color: '#d4d4d4', backgroundColor: 'transparent' },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#6a9955' },
    },
    { types: ['punctuation'], style: { color: '#d4d4d4' } },
    {
      types: [
        'property',
        'tag',
        'boolean',
        'number',
        'constant',
        'symbol',
        'deleted',
      ],
      style: { color: '#ce9178' },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'],
      style: { color: '#b5cea8' },
    },
    { types: ['operator', 'entity', 'url'], style: { color: '#d7ba7d' } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#c586c0' } },
    { types: ['function', 'class-name'], style: { color: '#4fc1ff' } },
    { types: ['regex', 'important', 'variable'], style: { color: '#9cdcfe' } },
  ],
};

/* ---------- Helpers ---------- */
const KNOWN_LANGS = [
  'tsx',
  'ts',
  'jsx',
  'js',
  'css',
  'scss',
  'html',
  'markup',
  'json',
  'bash',
  'sh',
  'shell',
  'md',
  'markdown',
  'yaml',
  'yml',
  'graphql',
  'sql',
  'py',
  'python',
] as const;
type KnownLanguage = (typeof KNOWN_LANGS)[number];

function isKnownLanguage(v: string): v is KnownLanguage {
  return (KNOWN_LANGS as readonly string[]).includes(v);
}
function parseLanguage(cls?: string): KnownLanguage {
  const match = /language-([a-z0-9+-]+)$/i.exec(cls ?? '');
  const raw = (match?.[1] ?? 'tsx').toLowerCase();
  return isKnownLanguage(raw) ? raw : 'tsx';
}
function getText(n: ReactNode): string {
  if (typeof n === 'string' || typeof n === 'number') return String(n);
  if (Array.isArray(n)) return n.map(getText).join('');
  if (React.isValidElement<{ children?: ReactNode }>(n))
    return getText(n.props.children);
  return '';
}

/* ---------- Component ---------- */
export default function CodeBlock(preProps: ComponentProps<'pre'>) {
  const [copied, setCopied] = React.useState(false);
  const { isDark } = useTheme();

  // Narrow child to <code> before touching props
  const node = React.Children.only(preProps.children);
  if (!React.isValidElement<CodeProps>(node) || node.type !== 'code') {
    return <pre {...preProps} />;
  }

  const codeClass = node.props.className ?? '';
  const lang = parseLanguage(codeClass);
  const raw = getText(node.props.children).trimEnd();
  const theme: PrismTheme = isDark ? THEME_DARK : THEME_LIGHT;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(raw);
      } else {
        const ta = document.createElement('textarea');
        ta.value = raw;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <Highlight code={raw} language={lang as Language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <figure className='my-6 overflow-hidden border not-prose rounded-xl border-subtle bg-surface'>
          <div className='flex items-center justify-between px-3 py-2 text-xs border-b border-subtle text-muted'>
            <span
              className='font-medium tracking-wide'
              aria-label={`Language: ${lang.toUpperCase()}`}
            >
              {lang.toUpperCase()}
            </span>
            <button
              type='button'
              onClick={() => {
                void handleCopy();
              }}
              className='rounded-md px-2 py-1 text-[var(--color-brand)] hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--brand-rgb)/0.45)]'
              aria-live='polite'
            >
              <span className='inline-flex items-center gap-1'>
                {copied ? <Check size={14} /> : <Clipboard size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>

          <pre
            className={`${className} max-h-[60vh] overflow-auto p-4 text-sm leading-relaxed`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, j) => (
                  <span key={j} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </figure>
      )}
    </Highlight>
  );
}
