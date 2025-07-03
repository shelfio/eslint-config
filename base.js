import jestFormatting from 'eslint-plugin-jest-formatting';
import prettier from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylisticJs from '@stylistic/eslint-plugin-js';
import env from './common/env.js';
import paddingLineBetweenStatements from './rules/padding-line-between-statements.js';
import jestRules from './rules/jest.js';
import preferEs6 from './rules/prefer-es6.js';
import importOrder from './rules/import-order.js';
import sortImports from './rules/sort-imports.js';
import comments from './rules/comments.js';

export default [
  {
    files: jestFormatting.configs.strict.overrides[0].files,
    rules: jestFormatting.configs.strict.overrides[0].rules,
    plugins: {
      'jest-formatting': jestFormatting,
    },
  },
  jestPlugin.configs['flat/recommended'],
  jestPlugin.configs['flat/style'],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      prettier,
      '@stylistic/js': stylisticJs,
    },

    languageOptions: {
      globals: {
        ...env,
      },
    },

    rules: {
      'prettier/prettier': 'error',
      ...paddingLineBetweenStatements,
      ...jestRules,
      ...preferEs6,
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      ...importOrder,
      ...sortImports,
      ...comments,
      'comma-dangle': 'off',
      camelcase: 'error',
      eqeqeq: ['error', 'smart'],
      'new-cap': 'error',
      'no-extend-native': 'error',
      'no-use-before-define': ['error', 'nofunc'],
      '@stylistic/js/multiline-comment-style': ['error', 'separate-lines'],
      'require-await': 'error',
    },
  },
];
