import { motion } from 'framer-motion';

export default function StyleGuide() {
  return (
    <motion.section
      id='style-guide'
      className='prose prose-lg dark:prose-invert max-w-4xl mx-auto px-4 py-16'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1>✨ Portfolio UI Style Guide</h1>

      <h2>🎨 Color System</h2>
      <ul>
        <li>
          <strong>Primary Brand:</strong> <code>--color-brand</code>
        </li>
        <li>
          <strong>Accent:</strong> <code>--color-accent</code>
        </li>
        <li>
          <strong>Text:</strong> <code>--color-text</code>
        </li>
        <li>
          <strong>Background:</strong> <code>--color-bg</code>
        </li>
        <li>
          <strong>Border:</strong> <code>--color-border</code>
        </li>
        <li>
          <strong>Highlight:</strong> <code>--color-highlight</code> (for focus)
        </li>
      </ul>

      <h2>🔠 Typography</h2>
      <ul>
        <li>
          <strong>Primary Font:</strong> Outfit
        </li>
        <li>
          <strong>Display Font:</strong> Figtree
        </li>
        <li>
          <code>h1</code>: text-4xl
        </li>
        <li>
          <code>h2</code>: text-3xl
        </li>
        <li>
          <code>h3</code>: text-2xl
        </li>
        <li>
          <code>p</code>: text-base or text-lg
        </li>
      </ul>

      <h2>🧱 Buttons</h2>
      <p>
        <strong>Primary Button</strong>
      </p>
      <code className='block'>class="btn-primary"</code>
      <p>
        <strong>Outline Button</strong>
      </p>
      <code className='block'>class="btn-outline"</code>

      <h2>🧭 Navigation</h2>
      <p>
        Links: <code>hover:text-[var(--color-brand)]</code>
      </p>
      <p>
        Active: <code>text-[var(--color-brand)] font-semibold</code>
      </p>

      <h2>📦 Component Utilities</h2>
      <ul>
        <li>
          Scrollbar:{' '}
          <code>scrollbar-thin scrollbar-thumb-[var(--color-brand)]</code>
        </li>
        <li>
          Gradient: <code>bg-hero-gradient</code>
        </li>
      </ul>

      <h2>📱 Responsive Breakpoints</h2>
      <ul>
        <li>
          <code>sm</code>: ≥ 640px
        </li>
        <li>
          <code>md</code>: ≥ 768px
        </li>
        <li>
          <code>lg</code>: ≥ 1024px
        </li>
        <li>
          <code>xl</code>: ≥ 1280px
        </li>
        <li>
          <code>2xl</code>: ≥ 1536px
        </li>
      </ul>

      <h2>🔒 Accessibility</h2>
      <ul>
        <li>
          Focus ring: <code>outline: 2px solid var(--color-highlight)</code>
        </li>
        <li>
          Active scale: <code>transform: scale(0.98)</code>
        </li>
        <li>Good contrast in dark mode</li>
      </ul>
    </motion.section>
  );
}
