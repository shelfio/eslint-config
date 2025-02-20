import jestFormatting from 'eslint-plugin-jest-formatting';
import jsonFormat from 'eslint-plugin-json-format';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import node from 'eslint-plugin-node';
import {fixupPluginRules} from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';
import tsEslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import shelfNoLodash from 'eslint-plugin-shelf-no-need-lodash-methods';
import env from './common/env.js';
import jestRules from './rules/jest.js';
import paddingLineBetweenStatements from './rules/padding-line-between-statements.js';
import preferEs6 from './rules/prefer-es6.js';
import importOrder from './rules/import-order.js';
import sortImports from './rules/sort-imports.js';
import consistentTypeAssertions from './rules/consistent-type-assertions.js';
import consistentTypeImports from './rules/consistent-type-imports.js';
import youDontNeedLodash from './rules/you-dont-need-lodash.js';
import typescriptRules from './rules/typescript.js';
import restrictedPackagesImport from './rules/restricted-packages-import.js';
import overrides from './common/overrides.js';
import stylisticJs from '@stylistic/eslint-plugin-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('plugin:you-dont-need-lodash-underscore/compatible'),
  ...tsEslint.configs.recommended,
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
  shelfNoLodash.configs.all,
  {
    plugins: {
      'jest-formatting': jestFormatting,
      'json-format': jsonFormat,
      prettier,
      import: fixupPluginRules(_import),
      node,
      '@stylistic/js': stylisticJs,
    },

    languageOptions: {
      globals: {
        ...env,
      },

      parser: tsParser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      'import/internal-regex': '^@shelf/',
    },

    rules: {
      complexity: [
        'warn',
        {
          max: 5,
        },
      ],

      'multiline-ternary': ['error', 'never'],
      curly: 'error',
      'no-nested-ternary': 'error',
      'prettier/prettier': 'error',

      ...paddingLineBetweenStatements,
      ...jestRules,
      ...preferEs6,
      ...importOrder,
      ...sortImports,
      'comma-dangle': 'off',
      ...consistentTypeAssertions,
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreGlobals: true,
          allow: ['hash_key', 'range_key'],
        },
      ],
      eqeqeq: ['error', 'smart'],
      'new-cap': 'error',
      'no-extend-native': 'error',
      'no-use-before-define': 'off',
      ...consistentTypeImports,
      '@stylistic/js/multiline-comment-style': ['error', 'separate-lines'],
      'arrow-body-style': [
        'error',
        'as-needed',
        {
          requireReturnForObjectLiteral: true,
        },
      ],
      'no-unreachable': 'error',
      'require-await': 'error',
      ...youDontNeedLodash,
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      ...typescriptRules,
      ...restrictedPackagesImport,
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-restricted-syntax': [
        'error',
        {
          selector: "ObjectExpression > Property[key.name='accountId'] ~ SpreadElement",
          message: "Danger, this can overwrite 'accountId'. Rearrange the order.",
        },
      ],
    },
  },
  overrides.allowRequireInConfigs,
  overrides.noExplicitsInTests,
  overrides.noCastWithJestMock,
  overrides.noTSRulesWithJSON,
];
