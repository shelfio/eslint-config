import {fixupPluginRules} from '@eslint/compat';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import jestFormatting from 'eslint-plugin-jest-formatting';
import stylistic from '@stylistic/eslint-plugin';
import lodash from 'eslint-plugin-you-dont-need-lodash-underscore';
import paddingLineRules from '../rules/padding-line-between-statements.js';
import jestRules from '../rules/jest.js';
import preferEs6 from '../rules/prefer-es6.js';
import importOrder from '../rules/import-order.js';
import sortImports from '../rules/sort-imports.js';

export const testFiles = ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'];

// jest-formatting 3 still uses context.getSourceCode(), removed in ESLint 10.
const jestFormattingCompat = fixupPluginRules(jestFormatting);

export const jestConfig = [
  {
    name: 'shelf/jest-formatting',
    ...jestFormatting.configs.strict.overrides[0],
    plugins: {'jest-formatting': jestFormattingCompat},
  },
  jestPlugin.configs['flat/recommended'],
  jestPlugin.configs['flat/style'],
];

// This plugin only exports legacy presets; its rules work directly in flat config.
export const lodashConfig = {
  name: 'shelf/native-lodash',
  plugins: {'you-dont-need-lodash-underscore': lodash},
  rules: lodash.configs.compatible.rules,
};

// import 2 still reads context.parserOptions, removed in ESLint 10.
export const commonPlugins = {import: fixupPluginRules(importPlugin), '@stylistic': stylistic};

export const commonRules = {
  ...paddingLineRules,
  ...jestRules,
  ...preferEs6,
  ...importOrder,
  ...sortImports,
  'comma-dangle': 'off',
  eqeqeq: ['error', 'smart'],
  'new-cap': 'error',
  'no-extend-native': 'error',
  '@stylistic/multiline-comment-style': ['error', 'separate-lines'],
  'require-await': 'error',
};
