// eslint.config.js — ESLint v9 flat config
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignore build outputs & vendor
  { ignores: ['dist', 'coverage', '.vercel', 'node_modules'] },

  // Base JS rules (applies everywhere)
  js.configs.recommended,

  // Plain JS/JSX — never run TS-typed rules here
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'off',
    },
  },

  // Type-aware TypeScript — ONLY on TS/TSX in app + tests
  ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
    ...cfg,
    files: ['src/**/*.{ts,tsx}', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    languageOptions: {
      ...cfg.languageOptions,
      parser: tseslint.parser,
      parserOptions: {
        // Dedicated project so ESLint has type info (incl. vitest/jest-dom)
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      ...cfg.plugins,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...cfg.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  })),

  // Tests: if types ever hiccup, don't block CI on "unsafe" in tests
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },

  // Keep typed rules off config/build scripts explicitly
  {
    files: [
      'eslint.config.*',
      'postcss.config.*',
      'tailwind.config.*',
      'vite.config.*',
      '*.config.*',
      'scripts/**/*.*',
    ],
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
    },
  },
];
