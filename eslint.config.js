// eslint.config.js — ESLint v9 (flat)
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import { globalIgnores } from 'eslint/config';

export default [
  // Ignore build outputs
  globalIgnores(['dist', 'coverage', '.vercel', 'node_modules']),

  // Base JS rules for all files
  js.configs.recommended,

  // JS / MJS / CJS files — standard JS parser (no TS type info here)
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    // Make sure TS-only rules never run on JS
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },

  // Type-aware TypeScript rules — scope to app sources only
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        // Type-aware without listing every tsconfig; keeps perf & avoids “not found by project service” on non-TS files
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      storybook,
    },
    rules: {
      // Hooks hygiene
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Dev-only rule (disable if noisy)
      'react-refresh/only-export-components': 'off',

      // TS hygiene
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Keep typed rules off config/build scripts explicitly
  {
    ignores: ['eslint.config.js', 'vite.config.*', 'scripts/**/*.*'],
  },
];
