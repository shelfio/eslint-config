const paddingLineBetweenStatements = require('./rules/padding-line-between-statements.json');
const importOrder = require('./rules/import-order.json');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['babel', 'react', 'prettier', 'import'],
  env: {
    node: true,
    es6: true,
    browser: true,
    meteor: true,
  },
  parser: '@babel/eslint-parser',
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
    ...paddingLineBetweenStatements,
    'comma-dangle': 'off',
    camelcase: 'error',
    eqeqeq: ['error', 'smart'],
    'new-cap': 'error',
    'no-extend-native': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'multiline-comment-style': ['error', 'separate-lines'],
    'no-unreachable': 'error',
    'require-await': 'error',
  },
};
