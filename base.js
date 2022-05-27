const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const preferDestructuring = require('./rules/prefer-destructuring');
const sortImports = require('./rules/sort-imports.json');
const importOrder = require('./rules/import-order.json');
const jestRules = require('./rules/jest.json');
const env = require('./common/env');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:jest-formatting/strict',
    'plugin:jest/style',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest-formatting', 'jest', 'json-format', 'prettier'],
  env,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'padding-line-between-statements': paddingLineBetweenStatements,
    ...jestRules,
    ...preferDestructuring,
    'no-empty': ['error', {allowEmptyCatch: true}],
    ...importOrder,
    ...sortImports,
    'prefer-template': 'error',
    'prefer-object-spread': 'error',
    'comma-dangle': 'off',
    camelcase: 'error',
    eqeqeq: ['error', 'smart'],
    'new-cap': 'error',
    'no-extend-native': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'multiline-comment-style': ['error', 'separate-lines'],
    'require-await': 'error',
  },
};
