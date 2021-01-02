const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const jestRules = require('./rules/jest');
const importOrder = require('./rules/import-order');
const sortImports = require('./rules/sort-imports');
const commonPlugins = require('./rules/plugins-common');
const commonExtends = require('./rules/extends-common');
const {allowRequireInConfigs, noExplicitReturnTypeInTests} = require('./rules/overrides');

module.exports = {
  extends: commonExtends,
  plugins: commonPlugins,
  env: {
    node: true,
    jest: true,
    es6: true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0,
    'padding-line-between-statements': paddingLineBetweenStatements,
    ...jestRules,
    'prefer-destructuring': [
      'error',
      {array: false, object: true},
      {enforceForRenamedProperties: false},
    ],
    'sort-imports': sortImports,
    'prefer-template': 'error',
    'prefer-object-spread': 'error',
    'import/order': importOrder,
    '@typescript-eslint/no-unused-vars': 'error',
    'comma-dangle': 'off',
  },
  overrides: [allowRequireInConfigs, noExplicitReturnTypeInTests],
};
