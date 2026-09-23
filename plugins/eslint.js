import eslint from '@eslint/js';
import {sourceFiles} from '../common/files.js';
import globals from '../common/globals.js';
import preferEs6 from '../rules/prefer-es6.js';

export default [
  {name: 'shelf/javascript/recommended', files: sourceFiles, ...eslint.configs.recommended},
  {
    name: 'shelf/javascript/policy',
    files: sourceFiles,
    languageOptions: {globals},
    rules: {
      ...preferEs6,
      'no-useless-return': 'error',
      'no-else-return': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': 'error',
      'require-await': 'error',
      'no-var': 'error',
      // Recommended in ESLint 10, but this preset deliberately omits dead-store analysis.
      'no-useless-assignment': 'off',
      'no-extend-native': 'error',
      'no-empty': ['error', {allowEmptyCatch: true}],
    },
  },
];
