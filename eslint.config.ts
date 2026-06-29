import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
  { ignores: ['dist/**', '.astro/**', 'node_modules/**'] },

  // Base JS rules
  js.configs.recommended,

  // TypeScript syntax rules (no type info needed) — .ts and .astro script blocks
  tseslint.configs.recommended,

  // Astro-specific rules
  astro.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['src/**/*.ts'],
  })),
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      eqeqeq: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Service worker
  {
    files: ['public/sw.js'],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'script',
      globals: globals.serviceworker,
    },
  },

  {
    files: ['scripts/**/*.ts'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'off',
      eqeqeq: ['error', 'always'],
    },
  },

  // Prettier compatibility — must be last
  prettierConfig,
);
