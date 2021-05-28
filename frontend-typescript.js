const commonExtends = require('./rules/extends-common.json');
const commonPlugins = require('./common/plugins');
const env = require('./common/env');
const importOrder = require('./rules/import-order.json');
const jestRules = require('./rules/jest.json');
const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const preferDestructuring = require('./rules/prefer-destructuring');
const sortImports = require('./rules/sort-imports.json');
const tsParser = require('./common/ts-parser');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');

module.exports = {
  extends: [...commonExtends, 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  globals: {
    DD_LOGS: true,
  },
  plugins: [...commonPlugins, 'react'],
  env: {
    ...env,
    browser: true,
  },
  ...tsParser,
  rules: {
    'prettier/prettier': 'error',
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
    'padding-line-between-statements': paddingLineBetweenStatements,
    ...jestRules,
    ...preferDestructuring,
    'prefer-template': 'error',
    'prefer-object-spread': 'error',
    ...importOrder,
    ...sortImports,
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': 'off',
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
