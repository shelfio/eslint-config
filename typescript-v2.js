// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import testingLibrary from 'eslint-plugin-testing-library';
import youDontNeedLodash from './plugins/you-dont-need-lodash.js';
import imports from './plugins/imports.js';
import jest from './plugins/jest.js';
import globals from './common/globals.js';
import overrides from './common/overrides.js';
import tsRules from './rules/typescript.js';
import preferEs6 from './rules/prefer-es6.js';
import sortImports from './rules/sort-imports.js';

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
  {rules: tsRules},
  {rules: preferEs6},
  {rules: sortImports},
  testingLibrary.configs['flat/react'],
);
