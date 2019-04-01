const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    node: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'padding-line-between-statements': paddingLineBetweenStatements,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': 0
  }
};
