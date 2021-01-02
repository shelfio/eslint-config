const importOrder = require('./rules/import-order');
const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const jestRules = require('./rules/jest');
const commonPlugins = require('./common/plugins');
const sortImports = require('./rules/sort-imports');
const commonExtends = require('./rules/extends-common');
const preferDestructuring = require('./rules/prefer-destructuring');
const tsParser = require('./common/ts-parser');
const env = require('./common/env');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');

module.exports = {
  extends: [...commonExtends, 'plugin:react/recommended', 'prettier/react'],
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
    'sort-imports': sortImports,
    'prefer-template': 'error',
    'prefer-object-spread': 'error',
    ...importOrder,
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': 'off',
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
