/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './src/style/index.css',
    // include TS/TSX
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4b4efc', // light mode brand
          dark: '#1a1a40', // dark mode brand
        },
        accent: {
          light: '#ff6b6b',
          dark: '#fbbf24',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
