// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import youDontNeedLodash from './plugins/you-dont-need-lodash.js';
import imports from './plugins/imports.js';
import jest from './plugins/jest.js';
import globals from './common/globals.js';
import overrides from './common/overrides.js';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  youDontNeedLodash,
  {
    name: 'shelf-globals',
    languageOptions: {
      globals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  imports,
  jest,
  overrides.allowRequireInConfigs,
  overrides.disableExplicitsInTests,
);
