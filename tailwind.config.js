/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Explicit class-based dark mode
  content: ['./index.html', './src/**/*.{ts,tsx}', './src/styles/index.css'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand, #6366f1)',
        },
        accent: {
          DEFAULT: 'var(--color-accent, #f59e0b)',
          alt: 'var(--color-accent-alt, #fbbf24)',
        },
        bg: {
          DEFAULT: 'var(--color-bg, #ffffff)',
          alt: 'var(--color-bg-alt, #f9fafb)',
        },
        text: {
          DEFAULT: 'var(--color-text, #1f2937)',
        },
        border: {
          DEFAULT: 'var(--color-border, #e5e7eb)',
          dark: 'var(--color-border-dark, #374151)',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Figtree', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'var(--bg-gradient)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addComponents }) {
      addComponents({
        '.btn-primary': {
          '@apply px-6 py-2 bg-brand text-white rounded-xl font-medium hover:bg-opacity-90 transition-colors':
            {},
        },
        '.btn-outline': {
          '@apply px-6 py-2 border border-brand text-brand rounded-xl font-medium hover:bg-brand hover:text-white transition-colors':
            {},
        },
      });
    },
  ],
};
