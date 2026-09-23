import node from 'eslint-plugin-n';
import {fixupPluginRules} from '@eslint/compat';
import testingLibrary from 'eslint-plugin-testing-library';
import tsEslint from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import youDontNeedLodash from '../rules/you-dont-need-lodash.js';
import typescriptRules from '../rules/typescript.js';
import consistentTypeImports from '../rules/consistent-type-imports.js';
import restrictedPackages from '../rules/restricted-packages-import.js';
import preferSWRMutation, {swrMutationPlugin} from '../rules/prefer-swr-mutation.js';
import noTestidOnlyTests, {testidOnlyTestsPlugin} from '../rules/no-testid-only-tests.js';
import env from './env.js';
import {createBaseConfig} from './base.js';
import {lodashConfig, testFiles} from './shared.js';
import overrides from './overrides.js';

export function createFrontendConfig({prettierConfig} = {}) {
  const prettier = Boolean(prettierConfig);

  return [
    lodashConfig,
    ...tsEslint.configs.recommended,
    // React 7 optional rules still use context.getSourceCode()/getFilename().
    {...react.configs.flat.recommended, plugins: {react: fixupPluginRules(react)}},
    reactHooks.configs.flat.recommended,
    sonarjs.configs.recommended,
    ...(prettier ? [eslintConfigPrettier] : []),
    ...createBaseConfig({prettierConfig}),
    {
      rules: {
        ...restrictedPackages,
        'no-console': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'sonarjs/cognitive-complexity': ['error', 18],
        '@stylistic/multiline-comment-style': 'off',
        'no-unreachable': 'error',
        'react/react-in-jsx-scope': 'off',
      },
    },
    {...testingLibrary.configs['flat/react'], files: testFiles},
    {files: testFiles, rules: noTestidOnlyTests},
    {
      plugins: {
        node,
        'testing-library': testingLibrary,
        shelf: {rules: {...swrMutationPlugin.rules, ...testidOnlyTestsPlugin.rules}},
      },

      languageOptions: {
        globals: {
          ...env,
          ...globals.browser,
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },

      settings: {react: {version: 'detect'}},

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
        ...preferSWRMutation,
      },
    },
    overrides.allowRequireInConfigs,
    overrides.noExplicitsInTests,
    overrides.noUnusedVarsInTypes,
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
    ...(!prettier ? [eslintConfigPrettier] : []),
  ];
}
