const commonExtends = require('./common/extends.json');
const commonPlugins = require('./common/plugins');
const tsParser = require('./common/ts-parser');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./common/overrides');
const consistentTypeAssertions = require('./rules/consistent-type-assertions.json');
const consistentTypeImports = require('./rules/consistent-type-imports.json');
const frontendConfig = require('./frontend');
const youDontNeedLodashRules = require('./rules/you-dont-need-lodash.json');
const typescriptRules = require('./rules/typescript');

module.exports = {
  extends: ['./frontend.js', ...commonExtends, 'plugin:you-dont-need-lodash-underscore/compatible'],
  globals: {
    DD_LOGS: true,
  },
  plugins: [...commonPlugins, ...frontendConfig.plugins, 'testing-library'],
  ...tsParser,
  rules: {
    ...frontendConfig.rules,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    // it fail to compile TS on react static class properties (displayName | defaultProps | etc..)
    '@typescript-eslint/explicit-member-accessibility': 0,
    // Often test name starts with component name which are always capitalized
    'jest/lowercase-name': 'off',
    // Don`t needed for typescript files
    '@typescript-eslint/no-empty-function': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    ...consistentTypeAssertions,
    'testing-library/await-async-query': 'error',
    'testing-library/no-await-sync-query': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/consistent-data-testid': [
      2,
      {
        testIdPattern: '^(([a-z])+(-)*)+$',
      },
    ],
    ...typescriptRules,
    ...consistentTypeImports,
    ...youDontNeedLodashRules,
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
