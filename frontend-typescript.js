const commonExtends = require('./common/extends.json');
const commonPlugins = require('./common/plugins');
const tsParser = require('./common/ts-parser');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./common/overrides');
const consistentTypeImports = require('./rules/consistent-type-imports.json');
const frontendConfig = require('./frontend');
const typescriptRules = require('./rules/typescript');
const restrictedPackagesImportRules = require('./rules/restricted-packages-import.json');

module.exports = {
  extends: ['./frontend.js', ...commonExtends, 'plugin:you-dont-need-lodash-underscore/compatible'],
  globals: {
    DD_LOGS: true,
  },
  plugins: [...commonPlugins, ...frontendConfig.plugins, 'testing-library'],
  ...tsParser,
  rules: {
    ...frontendConfig.rules,
    // Often test name starts with component name which are always capitalized
    'jest/lowercase-name': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'warn',
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-wait-for-empty-callback': 'error',
    // It's enabled in overrides
    'testing-library/no-debugging-utils': 'off',
    'testing-library/consistent-data-testid': [
      2,
      {
        testIdPattern: '^(([a-z])+(-)*)+$',
      },
    ],
    ...consistentTypeImports,
    'you-dont-need-lodash-underscore/get': 'error',
    // it fail to compile TS on react static class properties (displayName | defaultProps | etc..)
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/consistent-type-assertions': 'warn',
    // Don`t need for typescript files
    '@typescript-eslint/no-empty-function': 'off',
    ...restrictedPackagesImportRules,
    ...typescriptRules,
    '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],
  },
  overrides: [
    allowRequireInConfigs,
    noExplicitReturnTypeInTests,
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['*.test.{ts,tsx,js}', 'mocks.ts', 'mock.js'],
      rules: {
        camelcase: 'off',
        'sonarjs/no-duplicate-string': 'off',
        'testing-library/no-debugging-utils': 'error',
      },
    },
    {
      files: ['*.styled.{ts,tsx}'],
      rules: {
        'sonarjs/no-nested-template-literals': 'off',
      },
    },
  ],
};
