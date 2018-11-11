const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');

module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'prettier/react'],
  plugins: ['babel', 'react', 'prettier'],
  env: {
    node: true,
    es6: true,
    browser: true,
    meteor: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    allowImportExportEverywhere: false,
    codeFrame: false
  },
  rules: {
    'prettier/prettier': 'error',
    'padding-line-between-statements': paddingLineBetweenStatements
  }
};
