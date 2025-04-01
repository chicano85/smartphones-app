import js from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      'next.config.js',
      'next-env.d.ts',
      '**/*.generated.*',
      '**/*.d.ts',
      '**/*.js.map',
      '**/*.hot-update.js',
      '**/*.bundle.js',
      '**/_buildManifest.js',
      '**/_ssgManifest.js',
      '**/polyfills.js',
      '**/webpack.js',
      '**/vendor-chunks/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: true,
        JSX: true,
        console: true,
        module: true,
        require: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(error|err)$',
        },
      ],
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-this-alias': 'off',
      'no-empty': 'warn',
      'no-prototype-builtins': 'off',
      'no-control-regex': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        React: true,
        jest: true,
      },
    },
  },
];
