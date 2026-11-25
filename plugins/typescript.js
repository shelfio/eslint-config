import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';
import {sourceFiles, testFiles} from '../common/files.js';
import consistentTypeImports from '../rules/consistent-type-imports.js';

export default defineConfig(
  {name: 'shelf/typescript/recommended', files: sourceFiles, extends: tseslint.configs.recommended},
  {
    name: 'shelf/typescript/policy',
    files: sourceFiles,
    rules: {
      ...consistentTypeImports,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-assertions': 'warn',
      // These syntax-only replacements own the checks in JS and TS files alike.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],
      '@typescript-eslint/max-params': ['error', {max: 4}],
      // The TypeScript preset turns this off for TS files, but `tsc` reports it only as a suggestion.
      'no-unreachable': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    name: 'shelf/typescript/test-types',
    files: testFiles,
    rules: {'@typescript-eslint/no-explicit-any': 'off'},
  },
  {
    name: 'shelf/typescript/commonjs-configs',
    files: ['**/*.cjs', '**/*.cts', '**/*.config.js', '**/draft.js'],
    rules: {'@typescript-eslint/no-require-imports': 'off'},
  }
);
