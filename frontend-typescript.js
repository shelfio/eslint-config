const commonExtends = require('./rules/extends-common.json');
const commonPlugins = require('./common/plugins');
const tsParser = require('./common/ts-parser');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');
const consistentTypeAssertions = require('./rules/consistent-type-assertions.json');
const consistentTypeImports = require('./rules/consistent-type-imports.json');
const frontendConfig = require('./frontend');

module.exports = {
  extends: ['./frontend.js', ...commonExtends],
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
    'testing-library/no-debug': 'warn',
    'testing-library/consistent-data-testid': [
      2,
      {
        testIdPattern: '^(([a-z])+(-)*)+$',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    ...consistentTypeImports,
  },
  overrides: [
    allowRequireInConfigs,
    noExplicitReturnTypeInTests,
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
