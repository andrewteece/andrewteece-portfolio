import { Highlight } from 'prism-react-renderer';
import type { Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark.json';

interface CodeBlockProps {
  children: string;
  language?: Language;
}

export default function CodeBlock({
  children,
  language = 'tsx',
}: CodeBlockProps) {
  const code = children.trimEnd();

  return Highlight({
    code,
    language,
    theme: vsDark,
    children: ({ className, style, tokens, getLineProps, getTokenProps }) => (
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
    ),
  });
}
