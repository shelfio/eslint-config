import node from 'eslint-plugin-n';
import tsEslint from 'typescript-eslint';
import shelfNoLodash from 'eslint-plugin-shelf-no-need-lodash-methods';
import eslintConfigPrettier from 'eslint-config-prettier';
import typeAssertionRules from '../rules/consistent-type-assertions.js';
import consistentTypeImports from '../rules/consistent-type-imports.js';
import youDontNeedLodash from '../rules/you-dont-need-lodash.js';
import typescriptRules from '../rules/typescript.js';
import restrictedPackages from '../rules/restricted-packages-import.js';
import {commonPlugins, commonRules, jestConfig, lodashConfig} from './shared.js';
import env from './env.js';
import overrides from './overrides.js';

export function createTypescriptConfig({prettierConfig} = {}) {
  const prettier = Boolean(prettierConfig);

  return [
    lodashConfig,
    ...tsEslint.configs.recommended,
    ...jestConfig,
    ...(prettier ? [prettierConfig] : []),
    shelfNoLodash.configs.all,
    {
      plugins: {
        ...commonPlugins,
        node,
      },

      languageOptions: {
        globals: {
          ...env,
        },

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
        ...commonRules,
        complexity: [
          'warn',
          {
            max: 5,
          },
        ],

        'multiline-ternary': ['error', 'never'],
        curly: 'error',
        'no-nested-ternary': 'error',

        ...typeAssertionRules,
        camelcase: [
          'error',
          {
            properties: 'never',
            ignoreGlobals: true,
            allow: ['hash_key', 'range_key'],
          },
        ],
        'no-use-before-define': 'off',
        ...consistentTypeImports,
        'arrow-body-style': [
          'error',
          'as-needed',
          {
            requireReturnForObjectLiteral: true,
          },
        ],
        'id-length': [
          'warn',
          {
            min: 1,
            max: 22,
            properties: 'never',
          },
        ],
        'no-unreachable': 'error',
        ...youDontNeedLodash,
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'off',
        ...typescriptRules,
        ...restrictedPackages,
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
    ...(!prettier ? [eslintConfigPrettier] : []),
    overrides.allowRequireInConfigs,
    overrides.noExplicitsInTests,
    overrides.noUnusedVarsInTypes,
    overrides.noCastWithJestMock,
    overrides.noTSRulesWithJSON,
  ];
}
