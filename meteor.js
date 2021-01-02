const paddingLineBetweenStatements = require('./rules/padding-line-between-statements');
const importOrder = require('./rules/import-order.json');

module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier', 'prettier/react'],
  plugins: ['babel', 'react', 'prettier', 'import'],
  env: {
    node: true,
    es6: true,
    browser: true,
    meteor: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  rules: {
    'prettier/prettier': 'error',
    ...importOrder,
    'padding-line-between-statements': paddingLineBetweenStatements,
    'comma-dangle': 'off',
  },
};
