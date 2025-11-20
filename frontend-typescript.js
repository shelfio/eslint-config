import path from 'node:path';
import {fileURLToPath} from 'node:url';
import node from 'eslint-plugin-n';
import testingLibrary from 'eslint-plugin-testing-library';
import {fixupConfigRules, fixupPluginRules} from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';
import tsEslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import _import from 'eslint-plugin-import';
import globals from 'globals';
import overrides from './common/overrides.js';
import youDontNeedLodash from './rules/you-dont-need-lodash.js';
import typescriptRules from './rules/typescript.js';
import consistentTypeImports from './rules/consistent-type-imports.js';
import baseConfig from './base.js';
import env from './common/env.js';
import restrictedPackagesImport from './rules/restricted-packages-import.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const testingLibraryReact = {
  rules: compat.extends('plugin:testing-library/react')[0].rules,
  files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};

export default [
  ...compat.extends('plugin:you-dont-need-lodash-underscore/compatible'),
  ...tsEslint.configs.recommended,
  ...fixupConfigRules(compat.extends('plugin:react/recommended', 'plugin:react-hooks/recommended')),
  sonarjs.configs.recommended,
  eslintConfigPrettier,
  ...baseConfig,
  {
    rules: {
      ...restrictedPackagesImport,
      'no-console': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'sonarjs/cognitive-complexity': ['error', 18],
      '@stylistic/multiline-comment-style': 'off',
      'no-unreachable': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
  testingLibraryReact,
  {
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      import: fixupPluginRules(_import),
      '@typescript-eslint': tsEslint.plugin,
      node,
      'testing-library': fixupPluginRules(testingLibrary),
    },

    languageOptions: {
      globals: {
        ...env,
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      // Often test name starts with component name which are always capitalized
      'jest/lowercase-name': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'warn',
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      // 'testing-library/no-wait-for-empty-callback': 'error',
      // It's enabled in overrides
      'testing-library/no-debugging-utils': 'off',
      'testing-library/consistent-data-testid': [
        2,
        {
          testIdPattern: '^(([a-z])+(-)*)+$',
        },
      ],
      ...consistentTypeImports,
      // it fail to compile TS on react static class properties (displayName | defaultProps | etc..)
      '@typescript-eslint/explicit-member-accessibility': 0,
      '@typescript-eslint/consistent-type-assertions': 'warn',
      // Don`t need for typescript files
      '@typescript-eslint/no-empty-function': 'off',
      ...typescriptRules,
      '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],
      ...youDontNeedLodash,
    },
  },
  overrides.allowRequireInConfigs,
  overrides.noExplicitsInTests,
  overrides.noCastWithJestMock,
  overrides.noTSRulesWithJSON,
  {
    files: ['**/*.test.{ts,tsx,js}', '**/mocks.ts', '**/mock.js'],
    rules: {
      camelcase: 'off',
      'sonarjs/no-duplicate-string': 'off',
      'testing-library/no-debugging-utils': 'error',
    },
  },
  {
    files: ['**/*.styled.{ts,tsx}'],
    rules: {
      'sonarjs/no-nested-template-literals': 'off',
    },
  },
];
