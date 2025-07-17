import { Highlight } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark.json';
import vsLight from 'prism-react-renderer/themes/vsLight.json';
import { useTheme } from '../../context/ThemeProvider';
import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: Language;
}

export default function CodeBlock({
  children,
  language = 'tsx',
}: CodeBlockProps) {
  const code = children.trimEnd();
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return Highlight({
    code,
    language,
    theme: isDark ? vsDark : vsLight,
    children: ({ className, style, tokens, getLineProps, getTokenProps }) => (
      <div className='relative group'>
        <button
          onClick={handleCopy}
          className='absolute top-2 right-2 z-10 flex items-center gap-1 rounded px-2 py-1 text-xs font-medium bg-[var(--color-bg)] border border-[var(--color-border)] hover:bg-[var(--color-brand)] hover:text-white transition-opacity opacity-0 group-hover:opacity-100'
          aria-label='Copy code to clipboard'
        >
          {copied ? <Check size={14} /> : <Clipboard size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <pre
          className={`${className} p-4 rounded-md overflow-x-auto text-sm`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      </div>
    ),
  });
}
