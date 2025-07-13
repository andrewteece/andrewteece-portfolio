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
          DEFAULT: '#6366F1', // indigo-500
          dark: '#818CF8', // indigo-400
        },
        accent: {
          light: '#10B981', // emerald-500
          dark: '#34D399', // emerald-400
        },
        bg: {
          light: '#F9FAFB', // gray-50
          dark: '#0F172A', // slate-900
        },
        text: {
          light: '#1E293B', // slate-800
          dark: '#E2E8F0', // slate-200
        },
        border: {
          light: '#CBD5E1', // slate-300
          dark: '#334155', // slate-700
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
