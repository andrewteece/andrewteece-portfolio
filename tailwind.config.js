/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Explicit class-based dark mode
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './src/styles/index.css',
    './src/**/*.stories.@(ts|tsx|mdx)', // Storybook content
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          alt: 'var(--color-accent-alt)',
        },
        bg: {
          DEFAULT: 'var(--color-bg)',
          alt: 'var(--color-bg-alt)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          dark: 'var(--color-border-dark)',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Figtree', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'var(--bg-gradient)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text.DEFAULT'),
            '--tw-prose-headings': theme('colors.brand.DEFAULT'),
            '--tw-prose-links': theme('colors.brand.DEFAULT'),
            '--tw-prose-bold': theme('colors.text.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text.DEFAULT'),
            '--tw-prose-code': theme('colors.accent.DEFAULT'),
            '--tw-prose-hr': theme('colors.border.DEFAULT'),
            a: {
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: { fontWeight: '700', letterSpacing: '-0.02em' },
            h2: { fontWeight: '700', letterSpacing: '-0.02em' },
            h3: { fontWeight: '600' },
            code: {
              backgroundColor: theme('colors.bg.alt'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.text.DEFAULT'),
            '--tw-prose-headings': theme('colors.brand.DEFAULT'),
            '--tw-prose-links': theme('colors.brand.DEFAULT'),
            '--tw-prose-bold': theme('colors.text.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text.DEFAULT'),
            '--tw-prose-code': theme('colors.accent.DEFAULT'),
            '--tw-prose-hr': theme('colors.border.dark'),
            code: {
              backgroundColor: theme('colors.bg.alt'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};
