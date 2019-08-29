const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');

module.exports = {
  extends: ['eslint:recommended', 'plugin:jest-formatting/strict', 'prettier'],
  plugins: ['jest-formatting"', 'prettier'],
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
    'padding-line-between-statements': paddingLineBetweenStatements
  }
};
