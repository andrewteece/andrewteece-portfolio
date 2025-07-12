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
          DEFAULT: '#1A1A40',
          light: '#343463',
          accent: '#fff6b6b',
        },
        sky: {
          light: '#e0f2ff',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
